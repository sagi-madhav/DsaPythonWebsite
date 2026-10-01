"""
dsa_runtime - the Python half of the in-browser judge.

This one module is used in two places, so the browser and the build scripts can
never disagree about what "correct" means:

  * public/pyodide-worker.js loads it into Pyodide (WebAssembly) in the browser.
  * scripts/pycheck.py imports it with regular CPython to validate every
    problem's reference solution and to pre-compute the step-by-step traces.

Public entry points (all take/return JSON strings so JS <-> Python stays simple):
  run_tests_json(payload_json, on_result=None) -> results json
  run_script_json(payload_json)                -> {stdout, error} json
  trace_json(payload_json)                     -> trace json
"""

from __future__ import annotations

import contextlib
import io
import json
import linecache
import math
import sys
import time
import traceback
import types
from collections import deque

SOLUTION_FILE = "solution.py"
MAX_STDOUT = 20_000

# --------------------------------------------------------------------------
# Data-structure classes that LeetCode normally provides for you
# --------------------------------------------------------------------------


class ListNode:
    """A singly linked list node: a value plus a reference to the next node."""

    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __repr__(self):
        vals, node, seen = [], self, set()
        while node is not None and id(node) not in seen and len(vals) < 12:
            seen.add(id(node))
            vals.append(repr(node.val))
            node = node.next
        tail = " -> ..." if node is not None else ""
        return "ListNode(" + " -> ".join(vals) + tail + ")"


class TreeNode:
    """A binary tree node: a value plus references to a left and right child."""

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def __repr__(self):
        return f"TreeNode({self.val!r})"


class GraphNode:
    """Graph node used by Clone Graph. Learners see it as `Node`."""

    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

    def __repr__(self):
        return f"Node({self.val!r})"


class RandomNode:
    """Linked list node with an extra `random` pointer. Learners see it as `Node`."""

    def __init__(self, x=0, next=None, random=None):
        self.val = int(x)
        self.next = next
        self.random = random

    def __repr__(self):
        return f"Node({self.val!r})"


GraphNode.__name__ = GraphNode.__qualname__ = "Node"
RandomNode.__name__ = RandomNode.__qualname__ = "Node"


class JudgeError(Exception):
    """The learner's code ran, but its output can't be judged (e.g. a cycle)."""


# --------------------------------------------------------------------------
# Converting JSON test data <-> Python objects
# --------------------------------------------------------------------------


def build_linked_list(values):
    dummy = ListNode()
    cur = dummy
    for v in values or []:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next


def build_cycle_list(spec):
    values = spec.get("values", []) if isinstance(spec, dict) else spec
    pos = spec.get("pos", -1) if isinstance(spec, dict) else -1
    nodes = [ListNode(v) for v in values]
    for a, b in zip(nodes, nodes[1:]):
        a.next = b
    if nodes and 0 <= pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None


def linked_list_to_list(head, what="returned"):
    if head is not None and not hasattr(head, "next"):
        raise JudgeError(
            f"Expected a ListNode (or None) but your function {what} a {type(head).__name__}: {head!r}"
        )
    out, seen = [], set()
    while head is not None:
        if id(head) in seen:
            raise JudgeError(
                "The linked list you returned loops back on itself (it has a cycle), "
                "so it never ends. Check that the last node's .next is None."
            )
        seen.add(id(head))
        out.append(to_jsonable(head.val))
        head = head.next
    return out


def build_tree(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while queue and i < len(values):
        node = queue.popleft()
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


def tree_to_list(root, what="returned"):
    if root is not None and not hasattr(root, "left"):
        raise JudgeError(
            f"Expected a TreeNode (or None) but your function {what} a {type(root).__name__}: {root!r}"
        )
    out, queue, seen = [], deque([root]), set()
    while queue:
        node = queue.popleft()
        if node is None:
            out.append(None)
            continue
        if id(node) in seen:
            raise JudgeError("Your tree contains a cycle - a node is its own ancestor.")
        seen.add(id(node))
        out.append(to_jsonable(node.val))
        queue.append(node.left)
        queue.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out


def find_tree_node(root, val):
    stack = [root]
    while stack:
        node = stack.pop()
        if node is None:
            continue
        if node.val == val:
            return node
        stack.append(node.left)
        stack.append(node.right)
    return None


def build_graph(adj):
    if not adj:
        return None, []
    nodes = [GraphNode(i + 1) for i in range(len(adj))]
    for i, nbrs in enumerate(adj):
        nodes[i].neighbors = [nodes[j - 1] for j in nbrs]
    return nodes[0], nodes


def graph_to_adj(node, forbidden_ids):
    if node is None:
        return []
    seen = {}
    queue = deque([node])
    while queue:
        cur = queue.popleft()
        if cur.val in seen:
            continue
        if id(cur) in forbidden_ids:
            raise JudgeError(
                f"Node {cur.val} in your answer is one of the ORIGINAL nodes. "
                "A clone must be made of brand-new Node objects."
            )
        seen[cur.val] = cur
        for nb in cur.neighbors:
            if nb.val not in seen:
                queue.append(nb)
    n = max(seen) if seen else 0
    return [[nb.val for nb in seen[v].neighbors] if v in seen else [] for v in range(1, n + 1)]


def build_random_list(pairs):
    nodes = [RandomNode(v) for v, _ in pairs]
    for i, (_, r) in enumerate(pairs):
        if i + 1 < len(nodes):
            nodes[i].next = nodes[i + 1]
        nodes[i].random = nodes[r] if r is not None else None
    return (nodes[0] if nodes else None), nodes


def random_list_to_pairs(head, forbidden_ids):
    nodes, seen = [], {}
    cur = head
    while cur is not None:
        if id(cur) in seen:
            raise JudgeError("Your copied list has a cycle in its .next pointers.")
        if id(cur) in forbidden_ids:
            raise JudgeError(
                "Your answer reuses a node from the ORIGINAL list. Every node in the copy must be new."
            )
        seen[id(cur)] = len(nodes)
        nodes.append(cur)
        cur = cur.next
    out = []
    for node in nodes:
        r = node.random
        if r is not None and id(r) not in seen:
            raise JudgeError(
                f"The random pointer of the node with value {node.val} points outside your copied list."
            )
        out.append([node.val, seen[id(r)] if r is not None else None])
    return out


def to_jsonable(value, _depth=0):
    """Turn whatever the learner returned into plain JSON data for comparison/display."""
    if _depth > 50:
        return repr(value)
    if value is None or isinstance(value, (bool, str)):
        return value
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        if math.isnan(value):
            return "nan"
        if math.isinf(value):
            return "inf" if value > 0 else "-inf"
        return value
    if isinstance(value, (list, tuple, deque)):
        return [to_jsonable(v, _depth + 1) for v in value]
    if isinstance(value, (set, frozenset)):
        items = [to_jsonable(v, _depth + 1) for v in value]
        try:
            return sorted(items)
        except TypeError:
            return sorted(items, key=lambda x: json.dumps(x, sort_keys=True))
    if isinstance(value, dict):
        return {str(k): to_jsonable(v, _depth + 1) for k, v in value.items()}
    return repr(value)


# --------------------------------------------------------------------------
# Comparing answers
# --------------------------------------------------------------------------


def values_equal(actual, expected):
    if isinstance(expected, bool) or isinstance(actual, bool):
        return type(actual) is type(expected) and actual == expected
    if isinstance(actual, (int, float)) and isinstance(expected, (int, float)):
        if isinstance(actual, float) or isinstance(expected, float):
            return math.isclose(actual, expected, rel_tol=1e-5, abs_tol=1e-5)
        return actual == expected
    if isinstance(actual, list) and isinstance(expected, list):
        return len(actual) == len(expected) and all(
            values_equal(a, e) for a, e in zip(actual, expected)
        )
    if isinstance(actual, dict) and isinstance(expected, dict):
        return actual.keys() == expected.keys() and all(
            values_equal(actual[k], expected[k]) for k in actual
        )
    return actual == expected


def _canon(x):
    return json.dumps(x, sort_keys=True)


def _sort_outer(x):
    return sorted(x, key=_canon) if isinstance(x, list) else x


def _sort_nested(x):
    if not isinstance(x, list):
        return x
    inner = [sorted(i, key=_canon) if isinstance(i, list) else i for i in x]
    return sorted(inner, key=_canon)


def _check_topo(actual, expected, inp):
    n = inp.get("numCourses", inp.get("num_courses"))
    prereqs = inp.get("prerequisites", [])
    if expected == []:
        return actual == [], None
    if not isinstance(actual, list) or sorted(actual) != list(range(n)):
        return False, f"An order must contain every course 0..{n - 1} exactly once."
    pos = {c: i for i, c in enumerate(actual)}
    for course, pre in prereqs:
        if pos[pre] > pos[course]:
            return False, f"Course {pre} must come before course {course}."
    return True, None


def _check_alien(actual, expected, inp):
    words = inp.get("words", [])
    if expected == "":
        return actual == "", None
    letters = set("".join(words))
    if not isinstance(actual, str) or len(actual) != len(letters) or set(actual) != letters:
        return False, "The answer must contain every letter that appears in the words exactly once."
    pos = {c: i for i, c in enumerate(actual)}
    for w1, w2 in zip(words, words[1:]):
        for a, b in zip(w1, w2):
            if a != b:
                if pos[a] > pos[b]:
                    return False, f"'{a}' must come before '{b}' (from '{w1}' vs '{w2}')."
                break
    return True, None


def compare(actual, expected, mode, inp):
    """Returns (passed, note). `actual` is already JSON-shaped."""
    mode = mode or "exact"
    if mode == "exact":
        return values_equal(actual, expected), None
    if mode == "unordered":
        return values_equal(_sort_outer(actual), _sort_outer(expected)), None
    if mode == "unordered-nested":
        return values_equal(_sort_nested(actual), _sort_nested(expected)), None
    if mode == "one-of":
        return any(values_equal(actual, e) for e in expected), None
    if mode == "topo-order":
        return _check_topo(actual, expected, inp)
    if mode == "alien-order":
        return _check_alien(actual, expected, inp)
    raise ValueError(f"Unknown compare mode {mode!r}")


# --------------------------------------------------------------------------
# Running the learner's code
# --------------------------------------------------------------------------

_HELPER_NAMES = {"ListNode": ListNode, "TreeNode": TreeNode}


def make_namespace(harness=None):
    ns = {"__name__": "__main__", "__builtins__": __builtins__}
    exec("from typing import *", ns)
    ns.update(_HELPER_NAMES)
    arg_types = set(((harness or {}).get("argTypes") or {}).values())
    return_type = (harness or {}).get("returnType")
    if "random-list" in arg_types or return_type == "random-list":
        ns["Node"] = RandomNode
    else:
        ns["Node"] = GraphNode
    return ns


class _Context:
    def __init__(self):
        self.first_tree = None
        self.input_node_ids = set()


def _convert_in(raw, kind, ctx):
    if kind in (None, "json"):
        return raw
    if kind == "linked-list":
        return build_linked_list(raw)
    if kind == "linked-list-array":
        return [build_linked_list(v) for v in raw]
    if kind == "cycle-list":
        return build_cycle_list(raw)
    if kind == "tree":
        root = build_tree(raw)
        if ctx.first_tree is None:
            ctx.first_tree = root
        return root
    if kind == "tree-node":
        return find_tree_node(ctx.first_tree, raw)
    if kind == "graph":
        node, nodes = build_graph(raw)
        ctx.input_node_ids.update(id(n) for n in nodes)
        return node
    if kind == "random-list":
        head, nodes = build_random_list(raw)
        ctx.input_node_ids.update(id(n) for n in nodes)
        return head
    raise ValueError(f"Unknown argType {kind!r}")


def _convert_out(value, kind, ctx, what="returned"):
    if kind in (None, "json"):
        return to_jsonable(value)
    if kind == "linked-list":
        return linked_list_to_list(value, what)
    if kind == "linked-list-array":
        return [linked_list_to_list(v, what) for v in value]
    if kind == "tree":
        return tree_to_list(value, what)
    if kind == "tree-node-val":
        if value is None:
            return None
        if not hasattr(value, "val"):
            raise JudgeError(f"Expected a TreeNode but your function returned {value!r}")
        return to_jsonable(value.val)
    if kind == "graph":
        return graph_to_adj(value, ctx.input_node_ids)
    if kind == "random-list":
        return random_list_to_pairs(value, ctx.input_node_ids)
    raise ValueError(f"Unknown returnType {kind!r}")


def build_args(harness, inp):
    ctx = _Context()
    arg_types = harness.get("argTypes") or {}
    args = {name: _convert_in(raw, arg_types.get(name, "json"), ctx) for name, raw in inp.items()}
    return args, ctx


def _lookup(ns, name, what):
    obj = ns.get(name)
    if obj is None:
        raise JudgeError(
            f"I couldn't find a {what} named `{name}`. Make sure you didn't rename it "
            f"(the tests call `{name}` exactly)."
        )
    return obj


def invoke(ns, harness, inp):
    """Calls the learner's code for one test case and returns a JSON-shaped answer."""
    kind = harness.get("kind", "function")

    if kind == "function":
        fn = _lookup(ns, harness["entry"], "function")
        args, ctx = build_args(harness, inp)
        result = fn(*args.values())
        in_place = harness.get("inPlace")
        if in_place:
            arg_kind = (harness.get("argTypes") or {}).get(in_place, "json")
            out_kind = {"linked-list": "linked-list", "tree": "tree"}.get(arg_kind, "json")
            return _convert_out(args[in_place], out_kind, ctx, what=f"left `{in_place}` as")
        return _convert_out(result, harness.get("returnType"), ctx)

    if kind == "design":
        cls = _lookup(ns, harness["entry"], "class")
        ops, arguments = inp["operations"], inp["arguments"]
        outputs = [None]
        obj = cls(*arguments[0])
        for op, op_args in zip(ops[1:], arguments[1:]):
            method = getattr(obj, op, None)
            if method is None:
                raise JudgeError(f"Your {harness['entry']} class has no method named `{op}`.")
            outputs.append(to_jsonable(method(*op_args)))
        return outputs

    if kind == "custom":
        runner = harness.get("runner")
        if runner == "encode-decode":
            encode = _lookup(ns, "encode", "function")
            decode = _lookup(ns, "decode", "function")
            strs = list(inp["strs"])
            encoded = encode(list(strs))
            if not isinstance(encoded, str):
                raise JudgeError(f"encode() must return ONE string, but it returned {type(encoded).__name__}.")
            return to_jsonable(decode(encoded))
        if runner == "codec-roundtrip":
            codec_cls = _lookup(ns, harness.get("entry", "Codec"), "class")
            root = build_tree(inp["root"])
            codec = codec_cls()
            data = codec.serialize(root)
            if not isinstance(data, str):
                raise JudgeError(f"serialize() must return a string, but it returned {type(data).__name__}.")
            return tree_to_list(codec_cls().deserialize(data))
        raise ValueError(f"Unknown custom runner {runner!r}")

    raise ValueError(f"Unknown harness kind {kind!r}")


def format_exception(exc):
    if isinstance(exc, SyntaxError):
        return {
            "type": type(exc).__name__,
            "message": exc.msg,
            "line": exc.lineno,
            "column": exc.offset,
            "text": (exc.text or "").rstrip("\n"),
            "traceback": "".join(traceback.format_exception_only(type(exc), exc)),
        }
    frames = [f for f in traceback.extract_tb(exc.__traceback__) if f.filename == SOLUTION_FILE]
    lines = "".join(traceback.format_list(frames)) if frames else ""
    return {
        "type": type(exc).__name__,
        "message": str(exc),
        "line": frames[-1].lineno if frames else None,
        "column": None,
        "text": frames[-1].line if frames else None,
        "traceback": lines + f"{type(exc).__name__}: {exc}",
    }


def _cap(text):
    return text if len(text) <= MAX_STDOUT else text[:MAX_STDOUT] + "\n... (output truncated)"


def _register_source(source):
    """Lets tracebacks quote the learner's lines (linecache can't read a file that doesn't exist)."""
    linecache.cache[SOLUTION_FILE] = (len(source), None, source.splitlines(True), SOLUTION_FILE)


def _load_solution(source, ns):
    """Compile + exec the learner's file. Returns (stdout, error_dict_or_None)."""
    buf = io.StringIO()
    _register_source(source)
    try:
        code = compile(source, SOLUTION_FILE, "exec")
        with contextlib.redirect_stdout(buf):
            exec(code, ns)
    except (Exception, SystemExit) as exc:  # noqa: BLE001 - we report everything
        return _cap(buf.getvalue()), format_exception(exc)
    return _cap(buf.getvalue()), None


def run_tests(source, harness, tests, on_result=None):
    ns = make_namespace(harness)
    module_stdout, load_error = _load_solution(source, ns)
    report = {"loadError": load_error, "moduleStdout": module_stdout, "results": []}
    if load_error:
        return report

    for index, tc in enumerate(tests):
        buf = io.StringIO()
        inp = json.loads(json.dumps(tc["input"]))  # fresh copy - learners may mutate inputs
        res = {"index": index, "passed": False, "actual": None, "error": None, "note": None}
        start = time.perf_counter()
        try:
            with contextlib.redirect_stdout(buf):
                actual = invoke(ns, harness, inp)
            res["actual"] = actual
            res["passed"], res["note"] = compare(actual, tc["expected"], harness.get("compare"), tc["input"])
        except JudgeError as exc:
            res["error"] = {"type": "WrongAnswerShape", "message": str(exc), "line": None,
                            "column": None, "text": None, "traceback": str(exc)}
        except RecursionError as exc:
            res["error"] = format_exception(exc)
            res["error"]["message"] = "maximum recursion depth exceeded (your recursion probably never reaches its base case)"
        except (Exception, SystemExit) as exc:  # noqa: BLE001
            res["error"] = format_exception(exc)
        res["ms"] = round((time.perf_counter() - start) * 1000, 2)
        res["stdout"] = _cap(buf.getvalue())
        report["results"].append(res)
        if on_result is not None:
            on_result(json.dumps(res))
    return report


def run_script(source):
    ns = make_namespace()
    stdout, error = _load_solution(source, ns)
    return {"stdout": stdout, "error": error}


# --------------------------------------------------------------------------
# Step-by-step tracer (a small "Python Tutor")
# --------------------------------------------------------------------------

_SKIP_FRAMES = {"<lambda>", "<genexpr>", "<listcomp>", "<dictcomp>", "<setcomp>"}
_ITEM_LIMIT = 80


class StepLimitReached(BaseException):
    """Raised inside the traced code to stop runaway programs (e.g. infinite loops)."""


class Tracer:
    def __init__(self, max_steps, script_mode, base_names):
        self.max_steps = max_steps
        self.script_mode = script_mode
        self.base_names = base_names
        self.steps = []
        self.truncated = False
        self.stdout = io.StringIO()
        self._obj_ids = {}
        self._keep = []
        self._frame_ids = {}
        self._last_heap = {}

    # -- identity -------------------------------------------------------
    def _ref(self, obj):
        key = id(obj)
        ref = self._obj_ids.get(key)
        if ref is None:
            ref = len(self._obj_ids) + 1
            self._obj_ids[key] = ref
            self._keep.append(obj)  # keep alive so id() is never reused mid-trace
        return ref

    def _frame_id(self, frame):
        key = id(frame)
        fid = self._frame_ids.get(key)
        if fid is None:
            fid = len(self._frame_ids) + 1
            self._frame_ids[key] = fid
            self._keep.append(frame)
        return fid

    # -- encoding -------------------------------------------------------
    def encode(self, value, heap):
        if value is None or isinstance(value, bool):
            return value
        if isinstance(value, int):
            return value if abs(value) < 2**53 else {"big": str(value)}
        if isinstance(value, float):
            if math.isnan(value):
                return {"float": "nan"}
            if math.isinf(value):
                return {"float": "inf" if value > 0 else "-inf"}
            return {"float": repr(value)}
        if isinstance(value, str):
            return value if len(value) <= 300 else value[:300] + "…"
        ref = self._ref(value)
        if ref not in heap:
            heap[ref] = None  # placeholder breaks reference cycles
            heap[ref] = self._encode_object(value, heap)
        return {"ref": ref}

    def _encode_seq(self, items, heap):
        return [self.encode(v, heap) for v in items[:_ITEM_LIMIT]]

    def _encode_object(self, v, heap):
        if isinstance(v, list):
            return {"type": "list", "items": self._encode_seq(v, heap), "len": len(v)}
        if isinstance(v, tuple):
            return {"type": "tuple", "items": self._encode_seq(v, heap), "len": len(v)}
        if isinstance(v, deque):
            return {"type": "deque", "items": self._encode_seq(list(v), heap), "len": len(v)}
        if isinstance(v, dict):
            entries = [[self.encode(k, heap), self.encode(val, heap)] for k, val in list(v.items())[:_ITEM_LIMIT]]
            return {"type": "dict", "cls": type(v).__name__, "entries": entries, "len": len(v)}
        if isinstance(v, (set, frozenset)):
            try:
                items = sorted(v)
            except TypeError:
                items = sorted(v, key=repr)
            return {"type": "set", "items": self._encode_seq(items, heap), "len": len(v)}
        if isinstance(v, (types.FunctionType, types.BuiltinFunctionType, types.MethodType)):
            return {"type": "func", "name": getattr(v, "__name__", "function")}
        if isinstance(v, type):
            return {"type": "class", "name": v.__name__}
        if isinstance(v, types.ModuleType):
            return {"type": "module", "name": v.__name__}
        if isinstance(v, range):
            return {"type": "repr", "repr": repr(v)}
        attrs = None
        if hasattr(v, "__dict__") and not isinstance(v, type):
            attrs = list(vars(v).items())
        elif hasattr(type(v), "__slots__"):
            attrs = [(s, getattr(v, s)) for s in type(v).__slots__ if hasattr(v, s)]
        if attrs is not None:
            return {
                "type": "obj",
                "cls": type(v).__name__,
                "attrs": [[k, self.encode(val, heap)] for k, val in attrs[:_ITEM_LIMIT]],
            }
        return {"type": "repr", "repr": repr(v)[:200]}

    # -- tracing --------------------------------------------------------
    def _user_frame(self, frame):
        code = frame.f_code
        if code.co_filename != SOLUTION_FILE or code.co_name in _SKIP_FRAMES:
            return False
        return self.script_mode or code.co_name != "<module>"

    def global_trace(self, frame, event, arg):
        if not self._user_frame(frame):
            return None
        if frame.f_code.co_name != "<module>":  # a script's "call" step would be empty
            self.record(frame, "call", arg)
        return self.local_trace

    def local_trace(self, frame, event, arg):
        if event in ("line", "return", "exception"):
            self.record(frame, event, arg)
        return self.local_trace

    def _visible(self, frame, name, value):
        if name.startswith("__"):
            return False
        if frame.f_code.co_name == "<module>":
            if name in self.base_names or isinstance(value, types.ModuleType):
                return False
        return True

    def record(self, frame, event, arg):
        if len(self.steps) >= self.max_steps:
            self.truncated = True
            raise StepLimitReached()
        stack = []
        f = frame
        while f is not None:
            if self._user_frame(f):
                stack.append(f)
            f = f.f_back
        stack.reverse()

        heap = {}
        frames_out = []
        for f in stack:
            local_vars = [
                [name, self.encode(value, heap)]
                for name, value in list(f.f_locals.items())
                if self._visible(f, name, value)
            ]
            frames_out.append({
                "id": self._frame_id(f),
                "name": "Global code" if f.f_code.co_name == "<module>" else f.f_code.co_name,
                "line": f.f_lineno,
                "vars": local_vars,
            })
        step = {
            "line": frame.f_lineno,
            "event": event,
            "frames": frames_out,
            "out": len(self.stdout.getvalue()),
        }
        if event == "return":
            step["ret"] = self.encode(arg, heap)
        elif event == "exception":
            exc_type, exc_value = arg[0], arg[1]
            step["exc"] = f"{exc_type.__name__}: {exc_value}"

        delta = {}
        for ref, entry in heap.items():
            blob = json.dumps(entry, separators=(",", ":"))
            if self._last_heap.get(ref) != blob:
                self._last_heap[ref] = blob
                delta[str(ref)] = entry
        step["heap"] = delta
        self.steps.append(step)


def trace(source, harness=None, inp=None, max_steps=600):
    """Run `source` under a tracer.

    If `harness` is given, the file is loaded first (untraced) and then the entry
    function/class is called with `inp`, and only that call is traced. Without a
    harness the whole file is traced as a script.
    """
    script_mode = harness is None
    ns = make_namespace(harness)
    result = {"steps": [], "stdout": "", "truncated": False, "error": None, "returned": None}

    _register_source(source)
    try:
        code = compile(source, SOLUTION_FILE, "exec")
    except SyntaxError as exc:
        result["error"] = format_exception(exc)
        return result

    tracer = Tracer(max_steps, script_mode, set(ns.keys()))
    if not script_mode:
        _, load_error = _load_solution(source, ns)
        if load_error:
            result["error"] = load_error
            return result

    old_trace = sys.gettrace()
    try:
        with contextlib.redirect_stdout(tracer.stdout):
            sys.settrace(tracer.global_trace)
            try:
                if script_mode:
                    exec(code, ns)
                else:
                    result["returned"] = invoke(ns, harness, json.loads(json.dumps(inp)))
            finally:
                sys.settrace(old_trace)
    except StepLimitReached:
        pass
    except JudgeError as exc:
        result["error"] = {"type": "WrongAnswerShape", "message": str(exc), "line": None,
                           "column": None, "text": None, "traceback": str(exc)}
    except (Exception, SystemExit) as exc:  # noqa: BLE001
        result["error"] = format_exception(exc)

    result["steps"] = tracer.steps
    result["stdout"] = _cap(tracer.stdout.getvalue())
    result["truncated"] = tracer.truncated
    return result


# --------------------------------------------------------------------------
# JSON entry points (used by the Web Worker and by scripts/pycheck.py)
# --------------------------------------------------------------------------


def run_tests_json(payload_json, on_result=None):
    p = json.loads(payload_json)
    return json.dumps(run_tests(p["source"], p["harness"], p["tests"], on_result))


def run_script_json(payload_json):
    p = json.loads(payload_json)
    return json.dumps(run_script(p["source"]))


def trace_json(payload_json):
    p = json.loads(payload_json)
    return json.dumps(
        trace(p["source"], p.get("harness"), p.get("input"), p.get("maxSteps", 600)),
        separators=(",", ":"),
    )
