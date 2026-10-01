import type { HarnessConfig, TestCase } from "@/data/types";

/** Shape of a Python exception as reported by dsa_runtime.format_exception. */
export interface PyError {
  type: string;
  message: string;
  line: number | null;
  column: number | null;
  text: string | null;
  traceback: string;
}

export interface TestResult {
  index: number;
  passed: boolean;
  actual: unknown;
  error: PyError | null;
  note: string | null;
  ms: number;
  stdout: string;
}

export interface TestReport {
  /** Set when the file itself couldn't run (syntax error, crash at import time). */
  loadError: PyError | null;
  moduleStdout: string;
  results: TestResult[];
}

export interface ScriptResult {
  stdout: string;
  error: PyError | null;
}

export interface RunTestsPayload {
  source: string;
  harness: HarnessConfig;
  tests: TestCase[];
}

export interface TracePayload {
  source: string;
  /** Omit to trace the whole file as a script. */
  harness?: HarnessConfig;
  input?: Record<string, unknown>;
  maxSteps?: number;
}

export type RunnerStatus = "idle" | "loading" | "ready" | "running" | "error";
