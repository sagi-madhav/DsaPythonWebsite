"use client";

import { useCallback, useSyncExternalStore } from "react";

import { getPythonRunner } from "@/lib/pyodide/client";
import type { RunTestsPayload, RunnerStatus, TestResult, TracePayload } from "@/lib/pyodide/types";

const noopSubscribe = () => () => {};

/**
 * React access to the in-browser Python runner.
 * `status` drives loading indicators; the methods queue work on the shared worker.
 */
export function usePyodide() {
  const status = useSyncExternalStore<RunnerStatus>(
    typeof window === "undefined" ? noopSubscribe : getPythonRunner().subscribe,
    () => getPythonRunner().getStatus(),
    () => "idle",
  );

  const preload = useCallback(() => getPythonRunner().preload().catch(() => {}), []);
  const runTests = useCallback(
    (payload: RunTestsPayload, onResult?: (r: TestResult) => void) =>
      getPythonRunner().runTests(payload, onResult),
    [],
  );
  const runScript = useCallback((source: string) => getPythonRunner().runScript(source), []);
  const trace = useCallback((payload: TracePayload) => getPythonRunner().trace(payload), []);

  return { status, preload, runTests, runScript, trace };
}
