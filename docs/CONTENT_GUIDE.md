# Content Authoring Guide

How to write problems and lessons for the site. Read `src/data/types.ts` (the schema) and the
exemplar problem in `src/data/problems/arrays-and-hashing.ts` (`two-sum`) before writing anything.

## Who we're writing for

A complete beginner with **zero Python knowledge**. Never assume they know `enumerate`, slicing,
`defaultdict`, `zip`, `heapq`, comprehensions, `lambda`, tuple unpacking, `self`, or references.
Explain every construct in plain English the first time it appears *in that problem*: learners
can land on any problem directly.

Tone: warm, concrete, short sentences. Prefer everyday analogies ("a notebook of numbers you've
seen") over jargon. Say *why*, not just *what*.

## Validation is mandatory

```bash
npm run check -- --only <category-slug-or-problem-id>    # must report 0 errors
npm run traces -- --only <category-slug>                 # writes public/traces/<id>.json
```

The check runs your reference solution (and brute force, if given) against every test case with
real Python, using the exact judge the browser uses (`public/python/dsa_runtime.py`). It also
checks that the starter code loads but does not already pass, that every syntax-primer snippet
runs and prints something, and that the visualizer demo trace is small and names real variables.

A green check is the bar for "done". Never weaken a test to make it pass: fix the solution or
the expected value. Including a `bruteForceSolution` is strongly encouraged: two independent
implementations that agree on every test case is how we know the expected values are right.

## Problems: conventions

- **Summary in your own words.** Never copy LeetCode/NeetCode statement text. Markdown-lite only:
  `` `code` `` and `**bold**`.
- **Functions, not `class Solution`.** The entry point is a plain function with a descriptive
  snake_case name: `contains_duplicate`, `is_anagram`, `group_anagrams`, `top_k_frequent`,
  `max_profit`, `search_matrix`... Parameters are snake_case too.
- **Test `input` keys = parameter names, in parameter order.** The harness calls
  `entry(*input.values())`. Input `{ nums: [...], target: 9 }` ⇒ `def two_sum(nums, target)`.
- **Type hints** in modern syntax: `list[int]`, `dict[str, int]`, `Optional[TreeNode]`.
- **Pre-defined, like on LeetCode** (don't redefine them): `ListNode(val, next)`,
  `TreeNode(val, left, right)`, `Node` (Clone Graph: `val, neighbors`; Copy List with Random
  Pointer: `val, next, random`), and everything from `typing` (`Optional`, `List`, ...). Put the
  class definition in the starter code as a *comment* for reference:
  ```python
  # Definition for a singly-linked list node (already provided for you):
  # class ListNode:
  #     def __init__(self, val=0, next=None):
  #         self.val = val
  #         self.next = next
  ```
- **Explicit imports** in both starter and solution: `from collections import defaultdict`,
  `import heapq`, `from collections import deque`.
- **Design problems** keep LeetCode's PascalCase class name but use snake_case methods. The
  `operations` list uses those names. Use exactly these:
  | Problem | Class | Methods |
  |---|---|---|
  | Min Stack | `MinStack` | `push`, `pop`, `top`, `get_min` |
  | Time Based Key-Value Store | `TimeMap` | `set`, `get` |
  | LRU Cache | `LRUCache` | `get`, `put` |
  | Implement Trie | `Trie` | `insert`, `search`, `starts_with` |
  | Add and Search Words | `WordDictionary` | `add_word`, `search` |
  | Kth Largest in a Stream | `KthLargest` | `add` |
  | Design Twitter | `Twitter` | `post_tweet`, `get_news_feed`, `follow`, `unfollow` |
  | Find Median from Data Stream | `MedianFinder` | `add_num`, `find_median` |
  | Detect Squares | `DetectSquares` | `add`, `count` |
- **Starter code** = signature + 1-3 comment lines nudging toward the approach + `pass`
  (design classes: each method with `pass`). It must load without errors.
- **Optimal solution**: readable over clever. No golfed one-liners, no walrus `:=`. Put a short
  comment *above each meaningful line* explaining why. **These comments are the visualizer's
  narration**: when line N is about to run, the trailing comment on line N (or the comment block
  directly above it) is shown as "what's happening". Two-sum shows the style.
- **Backslashes in TypeScript template literals**: `\n` inside a template literal becomes a real
  newline. If Python code contains a backslash (e.g. `"\n"`), write it as `"\\n"`. The check will
  catch it as a SyntaxError if you forget.
- Long TS expressions are allowed for one or two bigger tests, e.g.
  `{ input: { nums: Array.from({ length: 1000 }, (_, i) => i) }, expected: ... }`, but keep most
  tests small enough to read at a glance.

### Special harnesses (use exactly these)

| Problem | harness |
|---|---|
| Encode and Decode Strings | `{ kind: "custom", entry: "encode", runner: "encode-decode" }`; learner writes `encode(strs)` and `decode(s)`; input `{ strs }`, expected = the same list |
| Serialize and Deserialize Binary Tree | `{ kind: "custom", entry: "Codec", runner: "codec-roundtrip" }`; input `{ root: [...] }`, expected = same list |
| Linked List Cycle | `argTypes: { head: "cycle-list" }`; input `{ head: { values: [3,2,0,-4], pos: 1 } }` |
| Copy List with Random Pointer | `argTypes: { head: "random-list" }, returnType: "random-list"` |
| Clone Graph | `argTypes: { node: "graph" }, returnType: "graph"` |
| Lowest Common Ancestor of a BST | `argTypes: { root: "tree", p: "tree-node", q: "tree-node" }, returnType: "tree-node-val"` |
| Any linked-list input / output | `argTypes: { head: "linked-list" }`, `returnType: "linked-list"`; Merge K Sorted Lists uses `"linked-list-array"` |
| Any tree input / output | `argTypes: { root: "tree" }`, `returnType: "tree"` (LeetCode level-order arrays with `null`) |
| In-place problems | `inPlace: "<param>"`: Reorder List (`head`, with `argTypes: { head: "linked-list" }`), Rotate Image (`matrix`), Set Matrix Zeroes (`matrix`), Surrounded Regions (`board`), Walls and Gates (`rooms`, INF = 2147483647) |
| Course Schedule II | `compare: "topo-order"`, input `{ num_courses, prerequisites }` |
| Alien Dictionary | `compare: "alien-order"`, input `{ words }`, `""` when impossible |
| Answers in any order | `compare: "unordered"` (Two Sum, Top K Frequent, K Closest Points, Permutations, Letter Combinations, Palindrome Partitioning, N-Queens, Word Search II, Pacific Atlantic) or `"unordered-nested"` when inner lists are unordered too (Group Anagrams, 3Sum, Subsets, Subsets II, Combination Sum I/II) |
| Several valid answers | `compare: "one-of"`: then **every** test's `expected` is a list of acceptable answers (Longest Palindromic Substring) |

### Test cases

6–10 per problem. Include the classic examples (re-expressed in your own words), then edge
cases: empty input (if allowed), single element, duplicates, negatives, all-same values,
already-sorted / reverse-sorted, the answer at the very start / end. Give the first 2–3 tests a
`description` explaining *why* that's the answer. Inputs must respect the problem's constraints.

### Explanations

- `syntaxPrimers`: 3–6 per problem, covering every construct in the optimal solution a beginner
  might not know. `exampleSnippet` must be tiny, standalone, and `print` something.
- `intuitiveExplanation.intuition`: an analogy-first paragraph. `stepByStepWalkthrough`: 4–8
  steps. `edgeCases`: 2–4.
- `hints.conceptual` (no code), `hints.structural` (names the Python structure / loop shape).
- `commonMistakes`: 2–4 real beginner mistakes for this problem.
- `timeComplexity` / `spaceComplexity`: Big-O strings like `"O(n log n)"`, and an explanation a
  beginner can follow (count the loops, say what each costs).

### The visualizer (`visualizerType` + `visualization`)

The visualizer replays the optimal solution on `visualization.input` (default: the first test),
recording every local variable at every line. It draws variables by type:

- list/str: a row of indexed cells. `pointers: { nums: ["l", "r"] }` draws labelled arrows
  under the cells at those indices. `windows: [{ array: "s", start: "l", end: "r" }]` shades a
  sliding window.
- 2-D list: a grid. `gridPointers: { grid: [["r", "c"]] }` highlights a cell.
- dict / defaultdict / Counter: a key → value table (changed entries flash). set: chips.
  deque: a queue.
- Objects with `.next`: a linked-list diagram. Objects with `.left/.right`: a tree diagram.
  Variables that point at nodes appear as labels on those nodes.
- `heaps: ["min_heap"]`: also draws that heapq list as a binary tree.
- Any other object (e.g. `TrieNode`): a card listing its attributes.
- Recursion: every active call frame is shown as a stack.
- `focus` puts the most important variables first; `hide` removes noise.

Pick `visualizerType` from: `array-pointers`, `sliding-window`, `hash-map`, `linked-list`,
`tree`, `grid`, `stack`, `heap`, `recursion`. Choose a demo input that shows the interesting
behavior in roughly 30–150 steps (hard cap 400 and 350 KB; the check tells you both).

## Lessons (`src/data/lessons/<slug>.ts`)

Each file default-exports one `Lesson` (see types). Blocks:

- `text`: markdown-lite: paragraphs, `**bold**`, `*italic*`, `` `code` ``, `- ` bullet lists,
  `1. ` numbered lists, `### ` sub-headings, `[links](https://...)`.
- `code`: a runnable snippet with an optional `caption`. Learners can edit and run it.
  `visualize: true` adds a step-by-step replay; use it whenever data changes over time or names
  share an object. `expectError: true` if the snippet deliberately fails (to teach the error).
- `callout`: `tip` / `warning` / `insight` box.
- `table`: e.g. operation → Big-O.
- `quiz`: multiple choice. For "what does this print?" questions set `predictsOutput: true`:
  the check runs `code` and verifies it prints exactly `options[answerIndex]`.
- `exercise`: a tiny auto-graded function (same `harness` / `testCases` format as problems).
- `bigOChart`: the interactive growth-rate chart (Big-O lesson).

Each lesson: a hook paragraph, then small steps that alternate explanation → runnable example →
check (quiz). 10–25 blocks, 2–4 quizzes, 1–2 exercises. End with a short "Where you'll use this"
text block naming NeetCode problems that use the idea.

## Ownership rules (when several people/agents write at once)

- Only edit the files you were assigned. Don't touch shared files (`types.ts`, the runtime,
  scripts). If the schema can't express something, write it down in your final report instead.
- Don't run `npm run build`/`npm run dev`, don't install packages, don't commit.
- If `npm run check` reports that some *other* file failed to import, ignore it: someone is
  mid-edit. Only your own scope matters.
