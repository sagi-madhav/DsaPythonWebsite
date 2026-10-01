/**
 * Main-thread client for public/pyodide-worker.js.
 *
 * One worker is shared by the whole app. Requests run one at a time; if a
 * request takes too long (almost always an infinite loop) the worker is killed
 * and a fresh one boots in the background, so the learner can just fix the
 * loop and run again.
 */
import type { Trace } from "@/lib/trace/types";

import type {
  RunTestsPayload,
  RunnerStatus,
  ScriptResult,
  TestReport,
  TestResult,
  TracePayload,
} from "./types";

export const PYODIDE_VERSION = "314.0.7";
/** Bump when public/python/dsa_runtime.py changes, to bust browser caches. */
export const RUNTIME_VERSION = "1";

const BOOT_TIMEOUT_MS = 180_000;

export class PythonTimeoutError extends Error {
  constructor(seconds: number) {
    super(
      `Your code was still running after ${seconds} seconds, so it was stopped. ` +
        "This almost always means an infinite loop: a `while` loop whose condition never " +
        "becomes False, or recursion that never reaches its base case.",
    );
    this.name = "PythonTimeoutError";
  }
}

export class PythonLoadError extends Error {
  constructor(message: string) {
    super(
      `Python couldn't start in your browser: ${message}. Check your internet connection ` +
        "(Python is downloaded once, about 10 MB) and reload the page.",
    );
    this.name = "PythonLoadError";
  }
}

interface Pending {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  onProgress?: (data: unknown) => void;
  timer?: ReturnType<typeof setTimeout>;
}

type WorkerMessage =
  | { id: number; type: "progress"; data: unknown }
  | { id: number; type: "result"; data: unknown }
  | { id: number; type: "error"; error: string };

class PythonRunner {
  private worker: Worker | null = null;
  private booted: Promise<void> | null = null;
  private pending = new Map<number, Pending>();
  private nextId = 1;
  private queue: Promise<unknown> = Promise.resolve();
  private status: RunnerStatus = "idle";
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getStatus = () => this.status;

  private setStatus(status: RunnerStatus) {
    if (this.status === status) return;
    this.status = status;
    this.listeners.forEach((l) => l());
  }

  /** Starts downloading Python in the background. Safe to call many times. */
  preload(): Promise<void> {
    return this.boot();
  }

  private boot(): Promise<void> {
    if (this.booted) return this.booted;
    const worker = new Worker(`/pyodide-worker.js?v=${RUNTIME_VERSION}&pyodide=${PYODIDE_VERSION}`);
    worker.onmessage = (event: MessageEvent<WorkerMessage>) => this.handleMessage(event.data);
    worker.onerror = (event) => {
      event.preventDefault();
      this.failAll(new PythonLoadError(event.message || "the worker crashed"));
    };
    this.worker = worker;
    this.setStatus("loading");
    this.booted = this.post("init", {}, BOOT_TIMEOUT_MS).then(
      () => this.setStatus("ready"),
      (err) => {
        this.setStatus("error");
        this.reset();
        throw err instanceof PythonTimeoutError
          ? new PythonLoadError("the download timed out")
          : new PythonLoadError(err instanceof Error ? err.message : String(err));
      },
    );
    return this.booted;
  }

  private handleMessage(msg: WorkerMessage) {
    const p = this.pending.get(msg.id);
    if (!p) return;
    if (msg.type === "progress") {
      p.onProgress?.(msg.data);
      return;
    }
    clearTimeout(p.timer);
    this.pending.delete(msg.id);
    if (msg.type === "result") p.resolve(msg.data);
    else p.reject(new Error(msg.error));
  }

  private post(
    type: string,
    payload: unknown,
    timeoutMs: number,
    onProgress?: (data: unknown) => void,
    onTimeout?: () => void,
  ): Promise<unknown> {
    const worker = this.worker;
    if (!worker) return Promise.reject(new PythonLoadError("the worker isn't running"));
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new PythonTimeoutError(Math.round(timeoutMs / 1000)));
        onTimeout?.();
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, onProgress, timer });
      worker.postMessage({ id, type, payload });
    });
  }

  private failAll(err: Error) {
    for (const p of this.pending.values()) {
      clearTimeout(p.timer);
      p.reject(err);
    }
    this.pending.clear();
  }

  private reset() {
    this.worker?.terminate();
    this.worker = null;
    this.booted = null;
  }

  /** Kill a stuck worker and boot a fresh one in the background. */
  private restart() {
    this.failAll(new Error("Python was restarted."));
    this.reset();
    this.setStatus("idle");
    this.boot().catch(() => {});
  }

  /** Runs `task` after every earlier request has finished, with its own timeout. */
  private enqueue<T>(type: string, payload: unknown, timeoutMs: number, onProgress?: (d: unknown) => void) {
    const run = async () => {
      await this.boot();
      this.setStatus("running");
      try {
        return (await this.post(type, payload, timeoutMs, onProgress, () => this.restart())) as T;
      } finally {
        if (this.worker) this.setStatus("ready");
      }
    };
    const result = this.queue.then(run, run);
    this.queue = result.catch(() => {});
    return result;
  }

  runTests(payload: RunTestsPayload, onResult?: (r: TestResult) => void, timeoutMs = 12_000) {
    return this.enqueue<TestReport>("run-tests", payload, timeoutMs, onResult as (d: unknown) => void);
  }

  runScript(source: string, timeoutMs = 8_000) {
    return this.enqueue<ScriptResult>("run-script", { source }, timeoutMs);
  }

  trace(payload: TracePayload, timeoutMs = 12_000) {
    return this.enqueue<Trace>("trace", payload, timeoutMs);
  }
}

let runner: PythonRunner | null = null;

/** The shared runner (browser only). */
export function getPythonRunner(): PythonRunner {
  if (typeof window === "undefined") throw new Error("Python only runs in the browser");
  runner ??= new PythonRunner();
  return runner;
}

export type { PythonRunner };
