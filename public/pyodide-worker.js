/* eslint-disable */
/**
 * Runs learners' Python off the main thread, so a slow or infinite loop never
 * freezes the page. Pyodide is CPython compiled to WebAssembly; we load it from
 * the jsDelivr CDN and then load our judge (public/python/dsa_runtime.py).
 *
 * This is a plain classic worker (not bundled) so it can importScripts() the
 * CDN build directly. Protocol (see src/lib/pyodide/types.ts):
 *   in:  { id, type: "init" | "run-tests" | "run-script" | "trace", payload }
 *   out: { id, type: "progress", data } | { id, type: "result", data } | { id, type: "error", error }
 */

const params = new URL(self.location.href).searchParams;
const PYODIDE_VERSION = params.get("pyodide") || "314.0.7";
const RUNTIME_VERSION = params.get("v") || "dev";
const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v" + PYODIDE_VERSION + "/full/";

let booting = null;

function boot() {
  if (!booting) {
    booting = (async () => {
      importScripts(INDEX_URL + "pyodide.js");
      const pyodide = await loadPyodide({ indexURL: INDEX_URL });
      const url = new URL("python/dsa_runtime.py?v=" + RUNTIME_VERSION, self.location.href);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Couldn't download the Python judge (HTTP " + response.status + ")");
      pyodide.FS.writeFile("/home/pyodide/dsa_runtime.py", await response.text());
      pyodide.runPython("import sys\nif '/home/pyodide' not in sys.path: sys.path.insert(0, '/home/pyodide')");
      const runtime = pyodide.pyimport("dsa_runtime");
      return { pyodide, runtime };
    })();
    booting.catch(() => {
      booting = null; // allow a retry after e.g. a network failure
    });
  }
  return booting;
}

self.onmessage = async (event) => {
  const { id, type, payload } = event.data;
  try {
    const { pyodide, runtime } = await boot();
    if (type === "init") {
      self.postMessage({ id, type: "result", data: { ok: true } });
      return;
    }

    if (payload && payload.source) {
      // Fetches any non-standard-library package the code imports (most code needs none).
      try {
        await pyodide.loadPackagesFromImports(payload.source);
      } catch (_) {
        /* the import error will surface when the code runs */
      }
    }

    const json = JSON.stringify(payload);
    let out;
    if (type === "run-tests") {
      out = runtime.run_tests_json(json, (resultJson) => {
        self.postMessage({ id, type: "progress", data: JSON.parse(resultJson) });
      });
    } else if (type === "run-script") {
      out = runtime.run_script_json(json);
    } else if (type === "trace") {
      out = runtime.trace_json(json);
    } else {
      throw new Error("Unknown request type: " + type);
    }
    self.postMessage({ id, type: "result", data: JSON.parse(out) });
  } catch (err) {
    self.postMessage({ id, type: "error", error: String((err && err.message) || err) });
  }
};
