/**
 * Turns one trace step into a "scene": the list of panels the visualizer draws.
 * Pure functions only, so every renderer is a dumb view of this data.
 */
import type { VisualizationConfig, VisualizerType } from "@/data/types";
import { attr, deref, isLinkedNode, isTreeNode, sameValue } from "@/lib/trace/replay";
import { type EncodedValue, type Heap, type HeapEntry, type TraceFrame, type TraceStep, isRef } from "@/lib/trace/types";

export const POINTER_COLORS = ["var(--ptr-1)", "var(--ptr-2)", "var(--ptr-3)", "var(--ptr-4)"];

/** Names that usually mean "an index into a list" when the learner gave no config. */
const AUTO_POINTER_NAMES = [
  "i", "j", "k", "l", "r", "left", "right", "lo", "hi", "low", "high", "mid",
  "start", "end", "slow", "fast", "idx", "index", "p", "q", "m", "n1", "n2",
];

export interface PointerMark {
  name: string;
  index: number;
  color: string;
}

export interface ArrayPanel {
  kind: "array";
  name: string;
  items: EncodedValue[];
  len: number;
  isString: boolean;
  /** "list" | "tuple" | "deque" | "str" */
  container: string;
  pointers: PointerMark[];
  window: [number, number] | null;
  changed: Set<number>;
  isNew: boolean;
}

export interface GridPanel {
  kind: "grid";
  name: string;
  rows: EncodedValue[][];
  marks: { r: number; c: number; label: string; color: string }[];
  changed: Set<string>;
  isNew: boolean;
}

export interface MapPanel {
  kind: "map";
  name: string;
  cls: string;
  entries: [EncodedValue, EncodedValue][];
  len: number;
  changedKeys: Set<string>;
  lookup: { key: EncodedValue; found: boolean; expr: string } | null;
  isNew: boolean;
}

export interface SetPanel {
  kind: "set";
  name: string;
  items: EncodedValue[];
  len: number;
  added: Set<string>;
  lookup: { key: EncodedValue; found: boolean; expr: string } | null;
  isNew: boolean;
}

export interface HeapTreePanel {
  kind: "heap";
  name: string;
  items: EncodedValue[];
}

export interface ObjectPanel {
  kind: "object";
  name: string;
  cls: string;
  attrs: [string, EncodedValue][];
}

export type Panel = ArrayPanel | GridPanel | MapPanel | SetPanel | HeapTreePanel | ObjectPanel;

export interface Scalar {
  name: string;
  value: EncodedValue;
  changed: boolean;
  isNew: boolean;
  /** Points at a node that's drawn in the linked-list / tree diagram. */
  isNodePointer: boolean;
}

export interface Scene {
  panels: Panel[];
  scalars: Scalar[];
  /** Variable name -> node ref, for labelling nodes in the current frame. */
  nodeLabels: Map<number, string[]>;
  /** Node refs held by *outer* frames (the recursion path). */
  activePath: Set<number>;
  linkedRefs: number[];
  treeRoots: number[];
  hasLinked: boolean;
  hasTree: boolean;
}

const keyOf = (v: EncodedValue) => JSON.stringify(v);

function frameVar(frame: TraceFrame | undefined, name: string): EncodedValue | undefined {
  return frame?.vars.find(([n]) => n === name)?.[1];
}

function prevFrameFor(prev: TraceStep | undefined, frame: TraceFrame) {
  return prev?.frames.find((f) => f.id === frame.id);
}

/** All node refs (linked or tree) reachable from `roots`, breadth-first. */
function reachableNodes(roots: EncodedValue[], heap: Heap, limit = 400) {
  const seen = new Set<number>();
  const order: number[] = [];
  const queue: EncodedValue[] = [...roots];
  let visitedObjects = 0;
  const visitedContainers = new Set<number>();
  while (queue.length && order.length < limit && visitedObjects < 2000) {
    const v = queue.shift()!;
    if (!isRef(v)) continue;
    const entry = heap.get(v.ref);
    if (!entry) continue;
    if (isLinkedNode(entry) || isTreeNode(entry)) {
      if (seen.has(v.ref)) continue;
      seen.add(v.ref);
      order.push(v.ref);
      for (const [name, val] of (entry as Extract<HeapEntry, { type: "obj" }>).attrs) {
        if (name === "next" || name === "left" || name === "right" || name === "prev" || name === "random") queue.push(val);
      }
      continue;
    }
    // Look one or two levels into containers/objects (e.g. self.cache, a list of heads).
    if (visitedContainers.has(v.ref)) continue;
    visitedContainers.add(v.ref);
    visitedObjects++;
    if (entry.type === "list" || entry.type === "tuple" || entry.type === "deque" || entry.type === "set") queue.push(...entry.items);
    else if (entry.type === "dict") for (const [, val] of entry.entries) queue.push(val);
    else if (entry.type === "obj") for (const [, val] of entry.attrs) queue.push(val);
  }
  return order;
}

function lookupFromLine(
  lineText: string,
  name: string,
  frame: TraceFrame,
  test: (key: EncodedValue) => boolean,
): { key: EncodedValue; found: boolean; expr: string } | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`([A-Za-z_][\\w]*)\\s+(?:not\\s+)?in\\s+${escaped}\\b`),
    new RegExp(`\\b${escaped}\\[([A-Za-z_][\\w]*)\\]`),
    new RegExp(`\\b${escaped}\\.get\\(\\s*([A-Za-z_][\\w]*)`),
  ];
  for (const re of patterns) {
    const m = lineText.match(re);
    if (!m) continue;
    const key = frameVar(frame, m[1]);
    if (key === undefined || isRef(key)) continue;
    return { key, found: test(key), expr: m[0] };
  }
  return null;
}

function listOfLists(entry: HeapEntry, heap: Heap): EncodedValue[][] | null {
  if (entry.type !== "list" || entry.items.length === 0) return null;
  const rows: EncodedValue[][] = [];
  for (const item of entry.items) {
    const row = deref(item, heap);
    if (!row || (row.type !== "list" && row.type !== "tuple")) return null;
    if (row.items.some((x) => isRef(x))) return null;
    rows.push(row.items);
  }
  // Very ragged lists (e.g. adjacency lists) read better as rows of an array than a grid.
  const widths = rows.map((r) => r.length);
  const maxW = Math.max(...widths);
  if (maxW === 0) return null;
  return rows;
}

export function buildScene(args: {
  step: TraceStep;
  heap: Heap;
  prev?: TraceStep;
  prevHeap?: Heap;
  config?: VisualizationConfig;
  visualizerType?: VisualizerType;
  lineText: string;
}): Scene {
  const { step, heap, prev, prevHeap, config = {}, lineText } = args;
  const frame = step.frames[step.frames.length - 1];
  const scene: Scene = {
    panels: [],
    scalars: [],
    nodeLabels: new Map(),
    activePath: new Set(),
    linkedRefs: [],
    treeRoots: [],
    hasLinked: false,
    hasTree: false,
  };
  if (!frame) return scene;

  const hide = new Set(config.hide ?? []);
  const focus = config.focus ?? [];
  const prevFrame = prevFrameFor(prev, frame);
  const vars = frame.vars.filter(([name]) => !hide.has(name));
  vars.sort((a, b) => {
    const fa = focus.indexOf(a[0]);
    const fb = focus.indexOf(b[0]);
    return (fa === -1 ? 999 : fa) - (fb === -1 ? 999 : fb);
  });

  const intVar = (name: string) => {
    const v = frameVar(frame, name);
    return typeof v === "number" ? v : undefined;
  };

  // --- nodes (linked lists & trees) from every frame, labels from the current one
  const allRoots = step.frames.flatMap((f) => f.vars.map(([, v]) => v));
  const nodeRefs = reachableNodes(allRoots, heap);
  const linkedRefs = nodeRefs.filter((r) => isLinkedNode(heap.get(r)));
  const treeRefs = nodeRefs.filter((r) => isTreeNode(heap.get(r)));
  scene.linkedRefs = linkedRefs;
  scene.hasLinked = linkedRefs.length > 0;
  if (treeRefs.length) {
    const children = new Set<number>();
    for (const r of treeRefs) {
      const e = heap.get(r);
      for (const side of ["left", "right"]) {
        const c = attr(e, side);
        if (c && isRef(c)) children.add(c.ref);
      }
    }
    scene.treeRoots = treeRefs.filter((r) => !children.has(r));
    scene.hasTree = true;
  }
  for (const [name, v] of frame.vars) {
    if (!isRef(v) || hide.has(name)) continue;
    const e = heap.get(v.ref);
    if (isLinkedNode(e) || isTreeNode(e)) {
      const labels = scene.nodeLabels.get(v.ref) ?? [];
      labels.push(name);
      scene.nodeLabels.set(v.ref, labels);
    }
  }
  for (const f of step.frames.slice(0, -1)) {
    for (const [, v] of f.vars) {
      if (isRef(v) && isTreeNode(heap.get(v.ref))) scene.activePath.add(v.ref);
    }
  }

  // --- per-variable panels
  const pointerConfig = config.pointers ?? {};
  const heapNames = new Set(config.heaps ?? []);
  for (const [name, value] of vars) {
    const prevValue = frameVar(prevFrame, name);
    const isNew = prevFrame !== undefined && prevValue === undefined;
    const changedScalar = prevFrame !== undefined && prevValue !== undefined && !sameValue(prevValue, value);

    // Strings with pointers become character arrays.
    if (typeof value === "string" && (pointerConfig[name] || config.windows?.some((w) => w.array === name))) {
      scene.panels.push(
        makeArray(name, [...value], value.length, "str", true, pointerConfig[name], config, intVar, new Set(), isNew),
      );
      continue;
    }

    if (!isRef(value)) {
      scene.scalars.push({ name, value, changed: changedScalar, isNew, isNodePointer: false });
      continue;
    }

    const entry = heap.get(value.ref);
    if (!entry) continue;
    const prevEntry = isRef(prevValue ?? null) ? prevHeap?.get((prevValue as { ref: number }).ref) : undefined;

    if (isLinkedNode(entry) || isTreeNode(entry)) {
      scene.scalars.push({ name, value, changed: changedScalar, isNew, isNodePointer: true });
      continue;
    }

    switch (entry.type) {
      case "list":
      case "tuple":
      case "deque": {
        const grid = entry.type === "list" ? listOfLists(entry, heap) : null;
        if (grid && grid.length > 1 && !pointerConfig[name]) {
          const prevGrid = prevEntry ? listOfLists(prevEntry, prevHeap ?? heap) : null;
          const changed = new Set<string>();
          grid.forEach((row, r) =>
            row.forEach((cell, c) => {
              if (prevGrid && prevGrid[r] && !sameValue(prevGrid[r][c], cell)) changed.add(`${r},${c}`);
            }),
          );
          const marks = (config.gridPointers?.[name] ?? []).flatMap(([rv, cv], idx) => {
            const r = intVar(rv);
            const c = intVar(cv);
            return r === undefined || c === undefined
              ? []
              : [{ r, c, label: `${rv},${cv}`, color: POINTER_COLORS[idx % POINTER_COLORS.length] }];
          });
          scene.panels.push({ kind: "grid", name, rows: grid, marks, changed, isNew });
          break;
        }
        const changed = new Set<number>();
        if (prevEntry && "items" in prevEntry) {
          entry.items.forEach((item, i) => {
            if (!sameValue(prevEntry.items[i], item)) changed.add(i);
          });
        }
        scene.panels.push(
          makeArray(name, entry.items, entry.len, entry.type, false, pointerConfig[name], config, intVar, changed, isNew),
        );
        if (heapNames.has(name)) scene.panels.push({ kind: "heap", name, items: entry.items });
        break;
      }
      case "dict": {
        const prevKeys = new Map<string, EncodedValue>();
        if (prevEntry?.type === "dict") for (const [k, v] of prevEntry.entries) prevKeys.set(keyOf(k), v);
        const changedKeys = new Set<string>();
        if (prevEntry?.type === "dict") {
          for (const [k, v] of entry.entries) {
            const before = prevKeys.get(keyOf(k));
            if (before === undefined || !sameValue(before, v) || nestedChanged(before, v, heap, prevHeap)) {
              changedKeys.add(keyOf(k));
            }
          }
        }
        const keys = new Set(entry.entries.map(([k]) => keyOf(k)));
        scene.panels.push({
          kind: "map",
          name,
          cls: entry.cls,
          entries: entry.entries,
          len: entry.len,
          changedKeys,
          lookup: lookupFromLine(lineText, name, frame, (k) => keys.has(keyOf(k))),
          isNew,
        });
        break;
      }
      case "set": {
        const before = new Set(prevEntry?.type === "set" ? prevEntry.items.map(keyOf) : []);
        const added = new Set(
          prevEntry?.type === "set" ? entry.items.map(keyOf).filter((k) => !before.has(k)) : [],
        );
        const keys = new Set(entry.items.map(keyOf));
        scene.panels.push({
          kind: "set",
          name,
          items: entry.items,
          len: entry.len,
          added,
          lookup: lookupFromLine(lineText, name, frame, (k) => keys.has(keyOf(k))),
          isNew,
        });
        break;
      }
      case "obj":
        scene.panels.push({ kind: "object", name, cls: entry.cls, attrs: entry.attrs });
        break;
      default:
        scene.scalars.push({ name, value, changed: changedScalar, isNew, isNodePointer: false });
    }
  }
  return scene;
}

function nestedChanged(a: EncodedValue, b: EncodedValue, heap: Heap, prevHeap?: Heap) {
  if (!isRef(a) || !isRef(b) || a.ref !== b.ref || !prevHeap) return false;
  return JSON.stringify(prevHeap.get(a.ref)) !== JSON.stringify(heap.get(b.ref));
}

function makeArray(
  name: string,
  items: EncodedValue[],
  len: number,
  container: string,
  isString: boolean,
  configured: string[] | undefined,
  config: VisualizationConfig,
  intVar: (n: string) => number | undefined,
  changed: Set<number>,
  isNew: boolean,
): ArrayPanel {
  const names = configured ?? AUTO_POINTER_NAMES;
  const pointers: PointerMark[] = [];
  names.forEach((p) => {
    const idx = intVar(p);
    if (idx === undefined) return;
    // Auto-detected pointers must land inside the array (or one past the end).
    if (!configured && (idx < 0 || idx > len)) return;
    pointers.push({ name: p, index: idx, color: POINTER_COLORS[pointers.length % POINTER_COLORS.length] });
  });
  if (!configured && pointers.length > 3) pointers.length = 3;
  const win = config.windows?.find((w) => w.array === name);
  let window: [number, number] | null = null;
  if (win) {
    const s = intVar(win.start);
    const e = intVar(win.end);
    if (s !== undefined && e !== undefined && e >= s) window = [s, e];
  }
  return { kind: "array", name, items, len, isString, container, pointers, window, changed, isNew };
}
