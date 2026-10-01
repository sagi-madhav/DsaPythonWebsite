"""
Validates site content with real CPython, using the exact runtime the browser uses.

    python scripts/pycheck.py --content .cache/content.json [--only two-sum,trees] [--write-traces]

Checks, for every problem:
  * the optimal (and brute-force) solution passes every test case
  * the starter code loads, defines the entry point, and does NOT already pass
  * every syntax-primer snippet runs without error
  * the demo trace runs, isn't truncated, and the visualization hints name real variables
For every lesson:
  * code blocks run (or fail, if marked expectError)
  * "predict the output" quizzes print exactly the marked answer
  * exercise solutions pass their tests
With --write-traces, the demo traces are written to public/traces/<id>.json.
"""

import argparse
import hashlib
import json
import os
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "public", "python"))
import dsa_runtime as rt  # noqa: E402

TRACE_DIR = os.path.join(ROOT, "public", "traces")
MAX_TRACE_BYTES = 350_000


def short(value, limit=160):
    text = json.dumps(value)
    return text if len(text) <= limit else text[:limit] + "…"


def describe_failure(tc, res):
    if res["error"]:
        err = res["error"]
        where = f" (line {err['line']})" if err.get("line") else ""
        return f"input={short(tc['input'])} -> {err['type']}: {err['message']}{where}"
    note = f" [{res['note']}]" if res.get("note") else ""
    return f"input={short(tc['input'])} expected={short(tc['expected'])} got={short(res['actual'])}{note}"


def source_hash(source):
    return hashlib.sha1(source.encode("utf-8")).hexdigest()[:12]


def check_problem(p, write_traces):
    errors, warnings = [], []
    pid = p["id"]
    h, tests = p["harness"], p["testCases"]

    if len(tests) < 5:
        warnings.append(f"only {len(tests)} test cases (aim for 6-10 including edge cases)")

    for label in ("optimalSolution", "bruteForceSolution"):
        src = p.get(label)
        if not src:
            continue
        rep = rt.run_tests(src, h, tests)
        if rep["loadError"]:
            e = rep["loadError"]
            errors.append(f"{label} failed to load: {e['type']}: {e['message']} (line {e.get('line')})")
            continue
        for tc, res in zip(tests, rep["results"]):
            if not res["passed"]:
                errors.append(f"{label} failed test {res['index']}: {describe_failure(tc, res)}")
            elif res["ms"] > 2000:
                warnings.append(f"{label} test {res['index']} took {res['ms']:.0f} ms")

    starter = rt.run_tests(p["starterCode"], h, tests)
    if starter["loadError"]:
        e = starter["loadError"]
        errors.append(f"starterCode failed to load: {e['type']}: {e['message']}")
    else:
        if all(r["passed"] for r in starter["results"]):
            errors.append("starterCode already passes every test")
        missing = [r for r in starter["results"] if r["error"] and "couldn't find" in r["error"]["message"]]
        if missing:
            errors.append(f"starterCode doesn't define the entry point: {missing[0]['error']['message']}")

    for sp in p.get("syntaxPrimers", []):
        res = rt.run_script(sp["exampleSnippet"])
        if res["error"]:
            errors.append(f"syntax primer {sp['keywordOrMethod']!r} snippet raised {res['error']['type']}: {res['error']['message']}")
        elif not res["stdout"].strip():
            warnings.append(f"syntax primer {sp['keywordOrMethod']!r} snippet prints nothing")

    vis = p.get("visualization") or {}
    inp = vis.get("input") or tests[0]["input"]
    max_steps = vis.get("maxSteps", 400)
    tr = rt.trace(p["optimalSolution"], h, inp, max_steps)
    if tr["error"]:
        errors.append(f"demo trace raised {tr['error']['type']}: {tr['error']['message']}")
    if not tr["steps"]:
        errors.append("demo trace recorded no steps")
    if tr["truncated"]:
        errors.append(f"demo trace hit the {max_steps}-step cap: use a smaller visualization.input")

    names = {name for s in tr["steps"] for f in s["frames"] for name, _ in f["vars"]}
    referenced = set(vis.get("focus", [])) | set(vis.get("hide", [])) | set(vis.get("heaps", []))
    for arr, ptrs in (vis.get("pointers") or {}).items():
        referenced.add(arr)
        referenced.update(ptrs)
    for w in vis.get("windows") or []:
        referenced.update([w["array"], w["start"], w["end"]])
    for grid, pairs in (vis.get("gridPointers") or {}).items():
        referenced.add(grid)
        for pair in pairs:
            referenced.update(pair)
    unknown = sorted(v for v in referenced if v not in names and v != "self")
    if unknown:
        errors.append(f"visualization names variables that never appear in the trace: {unknown}")

    payload = {
        "id": pid,
        "sourceHash": source_hash(p["optimalSolution"]),
        "input": inp,
        **tr,
    }
    blob = json.dumps(payload, separators=(",", ":"))
    if len(blob) > MAX_TRACE_BYTES:
        errors.append(f"demo trace is {len(blob) // 1000} KB (limit {MAX_TRACE_BYTES // 1000} KB): use a smaller input")

    trace_path = os.path.join(TRACE_DIR, f"{pid}.json")
    if write_traces and not tr["error"]:
        os.makedirs(TRACE_DIR, exist_ok=True)
        with open(trace_path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(blob)
    elif os.path.exists(trace_path):
        with open(trace_path, encoding="utf-8") as fh:
            if json.load(fh).get("sourceHash") != payload["sourceHash"]:
                warnings.append("public/traces file is stale: run `npm run traces`")
    else:
        warnings.append("no trace file yet: run `npm run traces`")

    return errors, warnings, len(tr["steps"]), len(blob)


def check_lesson(lesson):
    errors, warnings = [], []
    for i, block in enumerate(lesson["blocks"]):
        kind = block["kind"]
        where = f"block {i} ({kind})"
        if kind == "code":
            res = rt.run_script(block["code"])
            if block.get("expectError"):
                if not res["error"]:
                    errors.append(f"{where}: marked expectError but ran cleanly")
            elif res["error"]:
                errors.append(f"{where}: raised {res['error']['type']}: {res['error']['message']} (line {res['error'].get('line')})")
            if block.get("visualize"):
                tr = rt.trace(block["code"], None, None, 400)
                if tr["truncated"]:
                    errors.append(f"{where}: visualize trace exceeds 400 steps; shorten the snippet")
        elif kind == "quiz":
            q = block["question"]
            if not 0 <= q["answerIndex"] < len(q["options"]):
                errors.append(f"{where}: answerIndex out of range")
            elif q.get("predictsOutput"):
                res = rt.run_script(q.get("code", ""))
                got = res["stdout"].strip()
                want = q["options"][q["answerIndex"]].strip()
                if res["error"]:
                    errors.append(f"{where}: quiz code raised {res['error']['type']}: {res['error']['message']}")
                elif got != want:
                    errors.append(f"{where}: quiz says output is {want!r} but code prints {got!r}")
                others = [o.strip() for j, o in enumerate(q["options"]) if j != q["answerIndex"]]
                if got in others:
                    errors.append(f"{where}: a wrong option equals the real output")
        elif kind == "exercise":
            ex = block["exercise"]
            rep = rt.run_tests(ex["solution"], ex["harness"], ex["testCases"])
            if rep["loadError"]:
                errors.append(f"{where} {ex['id']}: solution failed to load: {rep['loadError']['message']}")
            else:
                for tc, res in zip(ex["testCases"], rep["results"]):
                    if not res["passed"]:
                        errors.append(f"{where} {ex['id']}: solution failed: {describe_failure(tc, res)}")
            starter = rt.run_tests(ex["starterCode"], ex["harness"], ex["testCases"])
            if starter["loadError"]:
                errors.append(f"{where} {ex['id']}: starter failed to load: {starter['loadError']['message']}")
            elif all(r["passed"] for r in starter["results"]):
                errors.append(f"{where} {ex['id']}: starter already passes")
    return errors, warnings


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--content", required=True)
    ap.add_argument("--only", default="", help="comma-separated problem ids, category slugs, lesson slugs, or 'lessons'")
    ap.add_argument("--write-traces", action="store_true")
    ap.add_argument("--quiet", action="store_true", help="hide warnings")
    args = ap.parse_args()

    with open(args.content, encoding="utf-8") as fh:
        content = json.load(fh)
    only = {s.strip() for s in args.only.split(",") if s.strip()}

    def wanted(*keys):
        return not only or any(k in only for k in keys)

    total_err = total_warn = checked = 0
    started = time.time()

    for issue in content.get("integrity", []):
        print(f"✗ integrity: {issue}")
        total_err += 1

    for p in content["problems"]:
        if not wanted(p["id"], p["category"], "problems"):
            continue
        checked += 1
        try:
            errors, warnings, steps, size = check_problem(p, args.write_traces)
        except Exception as exc:  # noqa: BLE001
            errors, warnings, steps, size = [f"checker crashed: {type(exc).__name__}: {exc}"], [], 0, 0
        status = "✗" if errors else "✓"
        print(f"{status} {p['category']}/{p['id']}  ({len(p['testCases'])} tests, {steps} trace steps, {size // 1000} KB)")
        for e in errors:
            print(f"    ERROR   {e}")
        if not args.quiet:
            for w in warnings:
                print(f"    warning {w}")
        total_err += len(errors)
        total_warn += len(warnings)

    for lesson in content.get("lessons", []):
        if not wanted(lesson["slug"], "lessons"):
            continue
        checked += 1
        errors, warnings = check_lesson(lesson)
        status = "✗" if errors else "✓"
        print(f"{status} lesson/{lesson['slug']}  ({len(lesson['blocks'])} blocks)")
        for e in errors:
            print(f"    ERROR   {e}")
        total_err += len(errors)
        total_warn += len(warnings)

    print(f"\nChecked {checked} items in {time.time() - started:.1f}s: {total_err} errors, {total_warn} warnings")
    sys.exit(1 if total_err else 0)


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.setrecursionlimit(10_000)
    main()
