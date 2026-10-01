import type { PyError } from "@/lib/pyodide/types";

/**
 * A value as recorded by the tracer (dsa_runtime.Tracer.encode):
 * primitives are inline; containers/objects are references into the heap.
 */
export type EncodedValue =
  | null
  | boolean
  | number
  | string
  | { ref: number }
  | { float: string }
  | { big: string };

export type HeapEntry =
  | { type: "list" | "tuple" | "deque" | "set"; items: EncodedValue[]; len: number }
  | { type: "dict"; cls: string; entries: [EncodedValue, EncodedValue][]; len: number }
  | { type: "obj"; cls: string; attrs: [string, EncodedValue][] }
  | { type: "func" | "class" | "module"; name: string }
  | { type: "repr"; repr: string };

export type Heap = Map<number, HeapEntry>;

export interface TraceFrame {
  id: number;
  name: string;
  line: number;
  vars: [string, EncodedValue][];
}

export interface TraceStep {
  line: number;
  event: "call" | "line" | "return" | "exception";
  frames: TraceFrame[];
  /** Length of stdout before this step ran. */
  out: number;
  ret?: EncodedValue;
  exc?: string;
  /** Heap entries that are new or changed since the previous step. */
  heap: Record<string, HeapEntry | null>;
}

export interface Trace {
  steps: TraceStep[];
  stdout: string;
  truncated: boolean;
  error: PyError | null;
  returned: unknown;
  input?: Record<string, unknown>;
  sourceHash?: string;
}

export function isRef(v: EncodedValue): v is { ref: number } {
  return typeof v === "object" && v !== null && "ref" in v;
}
