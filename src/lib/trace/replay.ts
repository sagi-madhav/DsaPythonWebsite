/**
 * Helpers for replaying a trace: rebuilding the full heap at each step from the
 * recorded deltas, formatting values the way Python prints them, and finding the
 * narration comment for a line.
 */
import { type EncodedValue, type Heap, type HeapEntry, type Trace, isRef } from "./types";

/** Full heap snapshot for every step (each step stores only what changed). */
export function buildHeaps(trace: Trace): Heap[] {
  const heaps: Heap[] = [];
  let current: Heap = new Map();
  for (const step of trace.steps) {
    const keys = Object.keys(step.heap);
    if (keys.length) {
      current = new Map(current);
      for (const k of keys) {
        const entry = step.heap[k];
        if (entry) current.set(Number(k), entry);
      }
    }
    heaps.push(current);
  }
  return heaps;
}

export function deref(v: EncodedValue, heap: Heap): HeapEntry | undefined {
  return isRef(v) ? heap.get(v.ref) : undefined;
}

export function isNumberValue(v: EncodedValue): v is number {
  return typeof v === "number";
}

/** Python-style repr, depth-limited so cycles and huge values stay readable. */
export function formatValue(v: EncodedValue, heap: Heap, depth = 0, seen = new Set<number>()): string {
  if (v === null) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return pyStr(v);
  if ("float" in v) {
    if (v.float === "inf") return "inf";
    if (v.float === "-inf") return "-inf";
    return v.float;
  }
  if ("big" in v) return v.big;
  const entry = heap.get(v.ref);
  if (!entry) return "…";
  if (seen.has(v.ref)) return "…";
  if (depth > 3) return entry.type === "list" ? "[…]" : "…";
  const next = new Set(seen).add(v.ref);
  const f = (x: EncodedValue) => formatValue(x, heap, depth + 1, next);
  const more = (shown: number, len: number) => (len > shown ? ", …" : "");
  switch (entry.type) {
    case "list":
      return `[${entry.items.map(f).join(", ")}${more(entry.items.length, entry.len)}]`;
    case "tuple":
      return entry.items.length === 1
        ? `(${f(entry.items[0])},)`
        : `(${entry.items.map(f).join(", ")}${more(entry.items.length, entry.len)})`;
    case "deque":
      return `deque([${entry.items.map(f).join(", ")}${more(entry.items.length, entry.len)}])`;
    case "set":
      return entry.len === 0 ? "set()" : `{${entry.items.map(f).join(", ")}${more(entry.items.length, entry.len)}}`;
    case "dict": {
      const body = entry.entries.map(([k, val]) => `${f(k)}: ${f(val)}`).join(", ") + more(entry.entries.length, entry.len);
      return entry.cls === "dict" ? `{${body}}` : `${entry.cls}({${body}})`;
    }
    case "obj": {
      const val = entry.attrs.find(([name]) => name === "val");
      return val ? `${entry.cls}(${f(val[1])})` : `${entry.cls} object`;
    }
    case "func":
      return `function ${entry.name}`;
    case "class":
      return `class ${entry.name}`;
    case "module":
      return `module ${entry.name}`;
    case "repr":
      return entry.repr;
  }
}

function pyStr(s: string) {
  const quote = s.includes("'") && !s.includes('"') ? '"' : "'";
  const body = s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
  return quote + (quote === "'" ? body.replace(/'/g, "\\'") : body) + quote;
}

/** A short type name for the variable inspector. */
export function typeName(v: EncodedValue, heap: Heap): string {
  if (v === null) return "None";
  if (typeof v === "boolean") return "bool";
  if (typeof v === "number") return "int";
  if (typeof v === "string") return "str";
  if ("float" in v) return "float";
  if ("big" in v) return "int";
  const entry = heap.get(v.ref);
  if (!entry) return "object";
  switch (entry.type) {
    case "dict":
      return entry.cls;
    case "obj":
      return entry.cls;
    case "func":
      return "function";
    case "repr":
      return "object";
    default:
      return entry.type;
  }
}

export function attr(entry: HeapEntry | undefined, name: string): EncodedValue | undefined {
  if (!entry || entry.type !== "obj") return undefined;
  return entry.attrs.find(([n]) => n === name)?.[1];
}

export function isLinkedNode(entry: HeapEntry | undefined) {
  return !!entry && entry.type === "obj" && entry.attrs.some(([n]) => n === "next") && !isTreeNode(entry);
}

export function isTreeNode(entry: HeapEntry | undefined) {
  return (
    !!entry &&
    entry.type === "obj" &&
    entry.attrs.some(([n]) => n === "left") &&
    entry.attrs.some(([n]) => n === "right")
  );
}

/** Two encoded values are the same Python value (or the same object). */
export function sameValue(a: EncodedValue | undefined, b: EncodedValue | undefined): boolean {
  if (a === b) return true;
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * The comment that narrates a line: a trailing `# ...` on the line itself, or the
 * block of comment lines directly above it.
 */
export function narrationFor(lines: string[], lineNo: number): string | null {
  const line = lines[lineNo - 1];
  if (line === undefined) return null;
  const trailing = trailingComment(line);
  if (trailing && line.trim().indexOf("#") !== 0) return trailing;
  const block: string[] = [];
  for (let i = lineNo - 2; i >= 0; i--) {
    const t = lines[i].trim();
    if (!t.startsWith("#")) break;
    block.unshift(t.replace(/^#+\s?/, ""));
  }
  return block.length ? block.join(" ") : null;
}

function trailingComment(line: string): string | null {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = null;
    } else if (ch === "'" || ch === '"') {
      quote = ch;
    } else if (ch === "#") {
      return line.slice(i + 1).trim() || null;
    }
  }
  return null;
}
