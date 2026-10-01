import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ subsets
  {
    id: "subsets",
    summary:
      "You are given a list of unique numbers `nums`. Return all possible **subsets** (the power set), including the empty set and the full list itself. The solution set must not contain duplicate subsets, and you may return the subsets in any order.",
    constraints: [
      "1 ≤ len(nums) ≤ 10",
      "-10 ≤ nums[i] ≤ 10",
      "All elements in nums are unique",
    ],
    pattern: "Backtracking: Include or Exclude each element (Binary Decision Tree)",
    timeComplexity: {
      bruteForce: "O(n · 2ⁿ)",
      optimal: "O(n · 2ⁿ)",
      explanation:
        "For each of the n numbers, we make two decisions: either include it in the subset or exclude it. This produces a binary recursion tree with 2ⁿ leaf nodes (one for each subset). Copying each subset of length up to n takes O(n) time, resulting in O(n · 2ⁿ) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree reaches a maximum depth of n (one call per number in the list). The call stack and the current subset list each take O(n) auxiliary space (excluding the output list).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "list.append() and list.pop()",
        plainEnglishExplanation:
          "`append` adds an element to the end of a list. `pop` removes and returns the last element. In backtracking, we append an item to choose it, explore further with a recursive call, and then pop it to undo that choice before trying the alternative.",
        exampleSnippet:
          "path = [1]\npath.append(2)\nprint('After append:', path)\npath.pop()\nprint('After pop:', path)",
        whyWeUseItHere:
          "We append the current number to explore subsets that include it, and pop it to backtrack and explore subsets that exclude it.",
      },
      {
        keywordOrMethod: "list(current)  (making a copy)",
        plainEnglishExplanation:
          "Writing `list(some_list)` creates a fresh, independent copy of `some_list`. In Python, lists are passed and stored by reference. If you wrote `result.append(current)`, you would store a pointer to the single `current` list that changes later, leaving your results full of empty or modified lists.",
        exampleSnippet:
          "original = [1, 2]\ncopy_list = list(original)\noriginal.append(3)\nprint('original:', original)\nprint('copy:', copy_list)",
        whyWeUseItHere:
          "We snapshot the current subset so later appends and pops don't alter subsets already saved in `result`.",
      },
      {
        keywordOrMethod: "def backtrack(index):  (nested helper function)",
        plainEnglishExplanation:
          "In Python, a function can be defined inside another function. The inner helper can freely access variables from the enclosing function (like `result` and `current`) without passing them around, and it can call itself recursively.",
        exampleSnippet:
          "def outer():\n    total = 0\n    def add(x):\n        nonlocal total\n        total += x\n    add(5)\n    print('Total is:', total)\nouter()",
        whyWeUseItHere:
          "We define `backtrack` inside `subsets` so it can access `nums`, `result`, and `current` directly while tracking the current position with `index`.",
      },
      {
        keywordOrMethod: "if index == len(nums): return  (base case)",
        plainEnglishExplanation:
          "A base case is the stopping condition for a recursive function. When the condition is met, the function returns immediately rather than making more recursive calls, preventing infinite recursion.",
        exampleSnippet:
          "def countdown(n):\n    if n == 0:\n        print('Liftoff!')\n        return\n    print(n)\n    countdown(n - 1)\ncountdown(3)",
        whyWeUseItHere:
          "When `index` reaches `len(nums)`, we have decided on every number in the input list, so we save the subset and return.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { nums: [1, 2] },
      focus: ["index", "current", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine packing a bag for a trip. For every single item on your bed, you face a simple yes-or-no question: 'Do I put this item into my bag, or leave it behind?' If you have 3 items, you make 3 binary decisions. Tracing every combination of yes/no choices creates a decision tree with 2³ = 8 branches, where each branch corresponds to one unique subset. Backtracking is the disciplined way to explore this tree: say 'yes' to the item, explore all future choices, and then unpack the item ('backtrack') so you can say 'no' to it instead.",
      edgeCases: [
        "A single element list `[0]`: produces two subsets, `[[]]` and `[[0]]`.",
        "Negative numbers: since all numbers are unique, negatives are treated identically to positive numbers.",
        "The empty subset `[]` is always present in every power set.",
      ],
      stepByStepWalkthrough: [
        "Initialize `result = []` to store all generated subsets and `current = []` to hold the subset currently being built.",
        "Define a recursive helper `backtrack(index)` where `index` represents the item in `nums` we are deciding on.",
        "Base case: if `index == len(nums)`, we have made a decision for every number in the list. Append a copy `list(current)` to `result` and return.",
        "Decision 1 (Include): add `nums[index]` to `current`, then call `backtrack(index + 1)` to decide on the next number.",
        "Backtrack: remove `nums[index]` from `current` with `current.pop()` to restore the list to its previous state.",
        "Decision 2 (Exclude): call `backtrack(index + 1)` without adding `nums[index]`.",
        "Kick off the process by calling `backtrack(0)`, and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "For each number in the list, you have exactly two choices: include it in your subset or leave it out. How can you explore all 2ⁿ combinations of these yes/no choices?",
      structural:
        "Write a helper `backtrack(index)`. When `index == len(nums)`, append `list(current)` to `result`. Otherwise, append `nums[index]`, recurse on `index + 1`, pop it back off, and recurse on `index + 1` again.",
    },
    commonMistakes: [
      "Writing `result.append(current)` instead of `result.append(list(current))`. In Python, appending a list adds a reference to it; when `current` is later emptied by backtracking, every saved subset becomes empty!",
      "Forgetting to call `current.pop()` after the first recursive call, which leaves included elements trapped in `current` when exploring the exclude branch.",
      "Incrementing `index` by more than 1 or forgetting the base case, leading to index errors or recursion depth limits.",
    ],
    starterCode: `def subsets(nums: list[int]) -> list[list[int]]:
    # Generate all possible subsets (the power set) of nums.
    # At each index, decide whether to include or exclude nums[index].
    pass
`,
    optimalSolution: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    current = []

    def backtrack(index: int) -> None:
        # Base case: we have made a decision for every number
        if index == len(nums):
            # Append a copy so future changes to current don't mutate this subset
            result.append(list(current))
            return

        # Choice 1: Include nums[index]
        current.append(nums[index])
        backtrack(index + 1)

        # Undo the choice (backtrack) to explore the alternative
        current.pop()

        # Choice 2: Exclude nums[index]
        backtrack(index + 1)

    # Start recursion from the first element
    backtrack(0)
    return result
`,
    bruteForceSolution: `def subsets(nums: list[int]) -> list[list[int]]:
    # Iterative approach: start with the empty set, and for each number,
    # duplicate all existing subsets and add the new number to them.
    result = [[]]
    for num in nums:
        new_subsets = []
        for subset in result:
            new_subsets.append(subset + [num])
        result.extend(new_subsets)
    return result
`,
    harness: { kind: "function", entry: "subsets", compare: "unordered-nested" },
    testCases: [
      {
        input: { nums: [1, 2, 3] },
        expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
        description: "Three distinct numbers generate 2³ = 8 distinct subsets.",
      },
      {
        input: { nums: [0] },
        expected: [[], [0]],
        description: "A single element produces the empty set and the single-element set.",
      },
      {
        input: { nums: [1, 2] },
        expected: [[], [1], [2], [1, 2]],
        description: "Two numbers produce 4 subsets.",
      },
      {
        input: { nums: [-1, 1] },
        expected: [[], [-1], [1], [-1, 1]],
      },
      {
        input: { nums: [9] },
        expected: [[], [9]],
      },
      {
        input: { nums: [3, 2, 1] },
        expected: [[], [3], [2], [1], [3, 2], [3, 1], [2, 1], [3, 2, 1]],
      },
      {
        input: { nums: [4, 5, 6, 7] },
        expected: [
          [], [4], [5], [6], [7],
          [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7],
          [4, 5, 6], [4, 5, 7], [4, 6, 7], [5, 6, 7],
          [4, 5, 6, 7],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ combination-sum
  {
    id: "combination-sum",
    summary:
      "You are given a list of distinct integers `candidates` and a target integer `target`. Return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may use the same candidate number an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different. You may return the combinations in any order.",
    constraints: [
      "1 ≤ len(candidates) ≤ 30",
      "2 ≤ candidates[i] ≤ 40",
      "All elements of candidates are distinct",
      "1 ≤ target ≤ 40",
    ],
    pattern: "Backtracking: Reuse current candidate OR advance to next candidate",
    timeComplexity: {
      bruteForce: "O(2^target)",
      optimal: "O(2^(target / min_candidate))",
      explanation:
        "In the worst case, the recursion tree has a depth proportional to target / min(candidates) (repeatedly choosing the smallest candidate). At each step we either reuse the candidate or move to the next. Pruning when total exceeds target stops invalid branches early.",
    },
    spaceComplexity: {
      optimal: "O(target / min_candidate)",
      explanation:
        "The maximum recursion depth occurs when repeatedly picking the smallest candidate until reaching target. The call stack and active combination list take O(target / min_candidate) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def combination_sum(candidates: list[int], target: int) -> list[list[int]]:",
        plainEnglishExplanation:
          "`def` defines a function with two parameters. The type hints state that `candidates` is a list of integers, `target` is an integer, and the return value is a list of lists of integers.",
        exampleSnippet:
          "def add(a: int, b: int) -> int:\n    return a + b\nprint(add(3, 4))",
        whyWeUseItHere:
          "This is the entry point called by the platform test harness.",
      },
      {
        keywordOrMethod: "current.append() and current.pop()",
        plainEnglishExplanation:
          "`append` adds a candidate to our running combination. `pop` removes the last candidate added, effectively undoing the decision so we can try alternative paths.",
        exampleSnippet:
          "combo = [2]\ncombo.append(3)\nprint('Combo:', combo)\ncombo.pop()\nprint('After pop:', combo)",
        whyWeUseItHere:
          "We add a candidate to see if it leads to `target`, and pop it when backtracking.",
      },
      {
        keywordOrMethod: "if total > target or index >= len(candidates): return",
        plainEnglishExplanation:
          "`or` allows checking multiple failure conditions at once. If our current sum has already exceeded `target`, or if we have run out of candidates to consider, there is no way to form a valid sum down this path.",
        exampleSnippet:
          "x, limit = 10, 8\nif x > limit:\n    print('Exceeded limit!')",
        whyWeUseItHere:
          "This prunes the search space immediately, preventing unnecessary recursion.",
      },
      {
        keywordOrMethod: "list(current)  (copying lists)",
        plainEnglishExplanation:
          "`list(current)` creates an independent shallow copy of the `current` list. Appending `current` directly would store a mutable reference that changes as recursion continues.",
        exampleSnippet:
          "path = [2, 2, 3]\nsaved = list(path)\npath.clear()\nprint('Saved combo:', saved)",
        whyWeUseItHere:
          "Snapshots the successful combination when `total == target` before future pops alter it.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { candidates: [2, 3], target: 5 },
      focus: ["index", "total", "current", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of paying exact change at a vending machine that costs `target` cents using an unlimited supply of specific coins from `candidates`. When considering a coin, you have two choices: insert that coin into the machine (and you are allowed to insert that exact same coin again right after), or decide you are done using this coin denomination and move on to the next one. If your running total hits `target` exactly, you found a valid combination! If your total overshoots `target`, that path is a dead end and you stop.",
      edgeCases: [
        "Target cannot be formed: candidates `[2]`, target `1` returns `[]`.",
        "Target equals a candidate directly: candidates `[2, 3, 6, 7]`, target `7` produces `[[7]]` alongside combinations of smaller numbers.",
        "Candidate divides target evenly: candidates `[2]`, target `4` produces `[[2, 2]]`.",
      ],
      stepByStepWalkthrough: [
        "Initialize `result = []` to store valid combinations and `current = []` for the active path.",
        "Define `backtrack(index, total)` where `index` is the candidate currently being considered and `total` is the running sum of elements in `current`.",
        "Check success: if `total == target`, append `list(current)` to `result` and return.",
        "Check failure: if `total > target` or `index >= len(candidates)`, return immediately (dead end).",
        "Choice 1 (reuse candidate): append `candidates[index]` to `current`, call `backtrack(index, total + candidates[index])` (staying at the same `index` allows reuse), and then `current.pop()`.",
        "Choice 2 (skip candidate): call `backtrack(index + 1, total)` to move to the next candidate without adding anything.",
        "Start recursion with `backtrack(0, 0)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "Because each number can be reused an unlimited number of times, when you choose to include a number, you don't necessarily have to advance to the next number.",
      structural:
        "Define `backtrack(index, total)`. Base cases: if `total == target`, save `list(current)`; if `total > target` or `index == len(candidates)`, return. Otherwise, branch into choosing `candidates[index]` (recurse with same `index`) and skipping to `index + 1`.",
    },
    commonMistakes: [
      "Calling `backtrack(index + 1, ...)` when choosing a candidate, which mistakenly prevents using the same candidate more than once.",
      "Starting a loop from index 0 on every call, which produces duplicate combinations that are just different permutations of each other (like `[2, 3]` and `[3, 2]`).",
      "Missing the pruning condition `total > target`, which causes infinite loops when elements can be reused indefinitely.",
    ],
    starterCode: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    # Return all unique combinations of candidates that sum to target.
    # Candidates may be reused unlimited times.
    pass
`,
    optimalSolution: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result = []
    current = []

    def backtrack(index: int, total: int) -> None:
        # Base case 1: Found a valid combination
        if total == target:
            result.append(list(current))
            return

        # Base case 2: Exceeded target or exhausted all candidates
        if total > target or index >= len(candidates):
            return

        # Choice 1: Include candidates[index] and allow reusing it
        current.append(candidates[index])
        backtrack(index, total + candidates[index])

        # Backtrack: remove candidate before exploring the skip choice
        current.pop()

        # Choice 2: Skip candidates[index] and move to the next candidate
        backtrack(index + 1, total)

    backtrack(0, 0)
    return result
`,
    bruteForceSolution: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result = []

    def search(start: int, current_combo: list[int], current_sum: int) -> None:
        if current_sum == target:
            result.append(list(current_combo))
            return
        if current_sum > target:
            return

        for i in range(start, len(candidates)):
            current_combo.append(candidates[i])
            search(i, current_combo, current_sum + candidates[i])
            current_combo.pop()

    search(0, [], 0)
    return result
`,
    harness: { kind: "function", entry: "combination_sum", compare: "unordered-nested" },
    testCases: [
      {
        input: { candidates: [2, 3, 6, 7], target: 7 },
        expected: [[2, 2, 3], [7]],
        description: "2 + 2 + 3 = 7 and 7 = 7 are the two unique combinations.",
      },
      {
        input: { candidates: [2, 3, 5], target: 8 },
        expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
        description: "Three combinations sum to 8 using repeated elements.",
      },
      {
        input: { candidates: [2], target: 1 },
        expected: [],
        description: "The smallest candidate (2) is greater than the target (1), so no combinations exist.",
      },
      {
        input: { candidates: [2], target: 4 },
        expected: [[2, 2]],
      },
      {
        input: { candidates: [3, 5, 7], target: 10 },
        expected: [[3, 7], [5, 5]],
      },
      {
        input: { candidates: [2, 4], target: 6 },
        expected: [[2, 2, 2], [2, 4]],
      },
      {
        input: { candidates: [8, 7, 4, 3], target: 11 },
        expected: [[8, 3], [7, 4], [4, 4, 3]],
      },
    ],
  },

  // ------------------------------------------------------------------ permutations
  {
    id: "permutations",
    summary:
      "You are given a list `nums` of distinct integers. Return all possible **permutations** of the list in any order. A permutation is an arrangement of all elements into a specific sequence.",
    constraints: [
      "1 ≤ len(nums) ≤ 6",
      "-10 ≤ nums[i] ≤ 10",
      "All integers in nums are unique",
    ],
    pattern: "Backtracking: Permutations using a visited set to track placed items",
    timeComplexity: {
      bruteForce: "O(n · n!)",
      optimal: "O(n · n!)",
      explanation:
        "There are n! possible permutations for a list of length n. At each of the n! leaf nodes in the recursion tree, creating a copy of the permutation of length n takes O(n) time, yielding O(n · n!) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree depth is n (one level per placed element). The `current` path list and the `visited` set each use O(n) auxiliary space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "visited = set()  (Python sets)",
        plainEnglishExplanation:
          "A `set` is an unordered collection of unique values with O(1) average lookup time. Adding an element with `.add()` or removing it with `.remove()` takes constant time.",
        exampleSnippet:
          "s = set()\ns.add(10)\nprint('Is 10 in set?', 10 in s)\ns.remove(10)\nprint('After remove:', 10 in s)",
        whyWeUseItHere:
          "We use a set to instantly check whether a number has already been placed in the current permutation.",
      },
      {
        keywordOrMethod: "if num in visited: continue",
        plainEnglishExplanation:
          "`continue` skips the rest of the current loop iteration and jumps straight to the next element. If `num` has already been chosen in this permutation, we skip it.",
        exampleSnippet:
          "for x in [1, 2, 3]:\n    if x == 2:\n        continue\n    print('Kept:', x)",
        whyWeUseItHere:
          "Permutations require using each element from `nums` exactly once, so we skip numbers already placed.",
      },
      {
        keywordOrMethod: "len(current) == len(nums)",
        plainEnglishExplanation:
          "`len(seq)` returns the count of items in a list or sequence. Comparing two lengths checks whether our built permutation contains all original numbers.",
        exampleSnippet:
          "path = [1, 2, 3]\nprint('Full?', len(path) == 3)",
        whyWeUseItHere:
          "This serves as the base case: once `len(current) == len(nums)`, a complete permutation is ready to be recorded.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { nums: [1, 2] },
      focus: ["current", "visited", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine placing n distinct books onto a shelf that has n slots. For the first slot, you have n available choices. Once you place that book, for the second slot you have n - 1 remaining choices, then n - 2 for the third, and so on until the last slot has only 1 book left. Backtracking simulates this shelf filling: pick an unused book, place it, recursively fill the remaining slots, and then remove the book ('backtrack') so you can try a different book in that slot.",
      edgeCases: [
        "A single element list `[1]`: only 1 permutation exists, `[[1]]`.",
        "Two elements `[0, 1]`: produces `[[0, 1], [1, 0]]`.",
        "Negative numbers: since all numbers are unique, negatives behave identically to positive numbers.",
      ],
      stepByStepWalkthrough: [
        "Initialize `result = []` to store all permutations, `current = []` for the permutation being built, and `visited = set()` to track placed numbers.",
        "Define `backtrack()`: if `len(current) == len(nums)`, all numbers have been placed. Append `list(current)` to `result` and return.",
        "Loop through each `num` in `nums`.",
        "If `num` is already in `visited`, skip it using `continue`.",
        "Choose `num`: add `num` to `visited`, append `num` to `current`, and recursively call `backtrack()`.",
        "Backtrack: pop `num` from `current` and remove `num` from `visited` so other branches can use it.",
        "Call `backtrack()` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "Every position in a permutation can be filled by any number that hasn't already been used in an earlier position. How can you keep track of which numbers are currently placed?",
      structural:
        "Use a recursive function `backtrack()`. Loop over all numbers in `nums`. Keep a set `visited`. If `num not in visited`, add it to `visited`, append to `current`, recurse, and then remove from both.",
    },
    commonMistakes: [
      "Forgetting to remove `num` from `visited` after the recursive call, which prevents other permutations from using that number.",
      "Confusing combinations with permutations: combinations do not care about order (so loops start at `i`), whereas permutations care about order (so every step loops over all elements of `nums`).",
      "Appending `current` directly instead of a copy `list(current)`.",
    ],
    starterCode: `def permute(nums: list[int]) -> list[list[int]]:
    # Return all possible permutations of the distinct numbers in nums.
    # Try placing each unused number in the next available position.
    pass
`,
    optimalSolution: `def permute(nums: list[int]) -> list[list[int]]:
    result = []
    current = []
    visited = set()

    def backtrack() -> None:
        # Base case: full permutation formed
        if len(current) == len(nums):
            result.append(list(current))
            return

        for num in nums:
            # Skip numbers already used in the current permutation
            if num in visited:
                continue

            # Choose: mark visited and append to path
            visited.add(num)
            current.append(num)

            backtrack()

            # Backtrack: unchoose so other branches can use this number
            current.pop()
            visited.remove(num)

    backtrack()
    return result
`,
    bruteForceSolution: `def permute(nums: list[int]) -> list[list[int]]:
    # Recursive reduction: permute remaining elements
    if len(nums) <= 1:
        return [nums]
    result = []
    for i in range(len(nums)):
        val = nums[i]
        rest = nums[:i] + nums[i + 1:]
        for p in permute(rest):
            result.append([val] + p)
    return result
`,
    harness: { kind: "function", entry: "permute", compare: "unordered" },
    testCases: [
      {
        input: { nums: [1, 2, 3] },
        expected: [
          [1, 2, 3], [1, 3, 2], [2, 1, 3],
          [2, 3, 1], [3, 1, 2], [3, 2, 1],
        ],
        description: "Three distinct numbers generate 3! = 6 unique permutations.",
      },
      {
        input: { nums: [0, 1] },
        expected: [[0, 1], [1, 0]],
        description: "Two numbers generate 2! = 2 permutations.",
      },
      {
        input: { nums: [1] },
        expected: [[1]],
        description: "A single element has exactly 1 permutation.",
      },
      {
        input: { nums: [-1, 2] },
        expected: [[-1, 2], [2, -1]],
      },
      {
        input: { nums: [5, 4, 6] },
        expected: [
          [5, 4, 6], [5, 6, 4], [4, 5, 6],
          [4, 6, 5], [6, 5, 4], [6, 4, 5],
        ],
      },
      {
        input: { nums: [1, 2, 3, 4] },
        expected: [
          [1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2], [1, 4, 2, 3], [1, 4, 3, 2],
          [2, 1, 3, 4], [2, 1, 4, 3], [2, 3, 1, 4], [2, 3, 4, 1], [2, 4, 1, 3], [2, 4, 3, 1],
          [3, 1, 2, 4], [3, 1, 4, 2], [3, 2, 1, 4], [3, 2, 4, 1], [3, 4, 1, 2], [3, 4, 2, 1],
          [4, 1, 2, 3], [4, 1, 3, 2], [4, 2, 1, 3], [4, 2, 3, 1], [4, 3, 1, 2], [4, 3, 2, 1],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ subsets-ii
  {
    id: "subsets-ii",
    summary:
      "You are given a list of integers `nums` that **may contain duplicates**. Return all possible **subsets** (the power set). The solution set must not contain duplicate subsets. You may return the subsets in any order.",
    constraints: [
      "1 ≤ len(nums) ≤ 10",
      "-10 ≤ nums[i] ≤ 10",
    ],
    pattern: "Backtracking: Sort first, skip duplicate elements at the same tree level",
    timeComplexity: {
      bruteForce: "O(n · 2ⁿ)",
      optimal: "O(n · 2ⁿ)",
      explanation:
        "Sorting `nums` takes O(n log n). There are at most 2ⁿ subsets. Copying each subset of length up to n takes O(n) time, resulting in O(n · 2ⁿ) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree depth is at most n, and `current` holds at most n elements. Auxiliary space is O(n).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "nums.sort()  (sorting in place)",
        plainEnglishExplanation:
          "`list.sort()` sorts the list in ascending order directly in place without creating a new list. Sorting brings all duplicate elements together side-by-side.",
        exampleSnippet:
          "arr = [2, 1, 2]\narr.sort()\nprint('Sorted:', arr)",
        whyWeUseItHere:
          "Sorting is essential so we can detect duplicate values by comparing adjacent elements `nums[i] == nums[i - 1]`.",
      },
      {
        keywordOrMethod: "if i > start and nums[i] == nums[i - 1]: continue",
        plainEnglishExplanation:
          "When looping through candidates for the current position, `i > start` means this is not the first candidate we are considering at this level. If `nums[i] == nums[i - 1]`, picking this element would produce the exact same subsets as picking the previous identical element.",
        exampleSnippet:
          "nums = [1, 2, 2, 3]\nstart = 1\nfor i in range(start, len(nums)):\n    if i > start and nums[i] == nums[i - 1]:\n        print('Skipping duplicate:', nums[i])",
        whyWeUseItHere:
          "This skips duplicate decisions at the same recursion depth while still allowing duplicate numbers to be picked at deeper levels (e.g. `[2, 2]`).",
      },
      {
        keywordOrMethod: "for i in range(start, len(nums)):",
        plainEnglishExplanation:
          "`range(start, end)` produces indices starting at `start`. By only considering indices from `start` onward, we ensure subsets are formed without considering earlier elements again.",
        exampleSnippet:
          "items = ['a', 'b', 'c']\nfor i in range(1, len(items)):\n    print(items[i])",
        whyWeUseItHere:
          "Controls the search window so that each number is only paired with numbers that appear after it.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { nums: [1, 2, 2] },
      focus: ["start", "current", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you have a bag of marbles, some of which are identical (for example, one red marble and two identical blue marbles). If you want to pick a collection of marbles, choosing the first blue marble produces a subset `[blue]`. If you then consider choosing the second blue marble instead, it would also produce `[blue]`, creating a duplicate! However, choosing the first blue marble AND THEN choosing the second blue marble produces `[blue, blue]`, which is valid. To prevent duplicate subsets, sort the marbles first so identical colors are adjacent. At any decision point, if a marble is identical to the one just considered at that same step, skip it.",
      edgeCases: [
        "All elements identical `[2, 2, 2]`: generates subsets of length 0, 1, 2, and 3: `[[], [2], [2, 2], [2, 2, 2]]`.",
        "No duplicates: behaves identically to standard Subsets.",
        "Single element `[0]`: produces `[[], [0]]`.",
      ],
      stepByStepWalkthrough: [
        "Sort `nums` in ascending order so duplicate values sit next to each other.",
        "Initialize `result = []` and `current = []`.",
        "Define `backtrack(start)`: every state in the recursion tree represents a valid subset, so append `list(current)` to `result` immediately.",
        "Loop `i` from `start` to `len(nums) - 1`.",
        "If `i > start` and `nums[i] == nums[i - 1]`, skip `nums[i]` using `continue` to avoid duplicate subsets at this level.",
        "Otherwise, append `nums[i]` to `current`, call `backtrack(i + 1)` to continue building the subset, and backtrack with `current.pop()`.",
        "Call `backtrack(0)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "If you have two identical numbers, picking the first and ignoring the second creates the same subset as ignoring the first and picking the second. How can sorting help group duplicates together so you can skip them?",
      structural:
        "Sort `nums` first. In `backtrack(start)`, append `list(current)` to `result`. Then loop `for i in range(start, len(nums)):`. If `i > start and nums[i] == nums[i - 1]: continue`. Recurse with `i + 1`.",
    },
    commonMistakes: [
      "Writing `if nums[i] == nums[i - 1]` without `i > start`. That would mistakenly skip valid subsets like `[2, 2]` where the duplicate is chosen at a deeper level!",
      "Forgetting to sort `nums` before backtracking; if duplicates are not adjacent, `nums[i] == nums[i - 1]` fails to detect them.",
      "Using a global set of tuples to filter duplicates at the end instead of pruning during recursion, which wastes time and memory.",
    ],
    starterCode: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    # Return all unique subsets of nums, which may contain duplicates.
    # Sort first, then skip duplicate elements at the same recursion level.
    pass
`,
    optimalSolution: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    # Sort so duplicate elements are next to each other
    nums.sort()
    result = []
    current = []

    def backtrack(start: int) -> None:
        # Every state in the recursion tree represents a valid subset
        result.append(list(current))

        for i in range(start, len(nums)):
            # If this number is the same as the previous one at this level, skip it
            if i > start and nums[i] == nums[i - 1]:
                continue

            # Include nums[i] in the current subset
            current.append(nums[i])
            backtrack(i + 1)

            # Undo choice to try the next option
            current.pop()

    backtrack(0)
    return result
`,
    bruteForceSolution: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    nums.sort()
    seen = set()
    result = []

    def dfs(index: int, path: list[int]) -> None:
        if index == len(nums):
            key = tuple(path)
            if key not in seen:
                seen.add(key)
                result.append(list(path))
            return
        # Include
        path.append(nums[index])
        dfs(index + 1, path)
        path.pop()
        # Exclude
        dfs(index + 1, path)

    dfs(0, [])
    return result
`,
    harness: { kind: "function", entry: "subsets_with_dup", compare: "unordered-nested" },
    testCases: [
      {
        input: { nums: [1, 2, 2] },
        expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
        description: "The duplicate '2' produces subsets with one 2 and subsets with two 2s without duplication.",
      },
      {
        input: { nums: [0] },
        expected: [[], [0]],
        description: "A single zero produces empty set and [0].",
      },
      {
        input: { nums: [2, 2, 2] },
        expected: [[], [2], [2, 2], [2, 2, 2]],
        description: "All duplicate elements produce subsets of length 0 through 3.",
      },
      {
        input: { nums: [1, 2, 3] },
        expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
      },
      {
        input: { nums: [-1, -1] },
        expected: [[], [-1], [-1, -1]],
      },
      {
        input: { nums: [1, 1, 2, 2] },
        expected: [
          [], [1], [1, 1], [2], [1, 2], [1, 1, 2],
          [2, 2], [1, 2, 2], [1, 1, 2, 2],
        ],
      },
      {
        input: { nums: [4, 4, 4, 1, 4] },
        expected: [
          [], [1], [4], [1, 4], [4, 4], [1, 4, 4],
          [4, 4, 4], [1, 4, 4, 4], [4, 4, 4, 4], [1, 4, 4, 4, 4],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ combination-sum-ii
  {
    id: "combination-sum-ii",
    summary:
      "You are given a collection of candidate numbers `candidates` (which **may contain duplicates**) and a target number `target`. Find all **unique combinations** in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used **once** in the combination. The solution set must not contain duplicate combinations. Return the combinations in any order.",
    constraints: [
      "1 ≤ len(candidates) ≤ 100",
      "1 ≤ candidates[i] ≤ 50",
      "1 ≤ target ≤ 30",
    ],
    pattern: "Backtracking: Sort, skip duplicates at same level, each number used once",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(2ⁿ)",
      explanation:
        "Sorting takes O(n log n). In the worst case, every element can be included or excluded, leading to O(2ⁿ) states. Because candidates are sorted, breaking early when `candidates[i] > remaining` dramatically prunes the search space.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree depth is at most n (the number of candidates), and `current` holds at most n elements.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "if candidates[i] > remaining: break  (early loop break)",
        plainEnglishExplanation:
          "`break` immediately terminates the entire `for` loop. Because `candidates` is sorted in ascending order, if the current candidate is already larger than `remaining`, every candidate after it will be even larger, so none can possibly fit.",
        exampleSnippet:
          "for x in [2, 3, 5, 8, 10]:\n    if x > 6:\n        break\n    print('Fits:', x)",
        whyWeUseItHere:
          "Pruning with `break` avoids thousands of fruitless recursive calls, keeping the solution fast.",
      },
      {
        keywordOrMethod: "if i > start and candidates[i] == candidates[i - 1]: continue",
        plainEnglishExplanation:
          "Skips duplicate candidate values at the current recursion level. If two identical numbers are available at the same decision step, trying the second one would only recreate combinations already found with the first.",
        exampleSnippet:
          "c = [1, 1, 2]\nfor i in range(1, len(c)):\n    if c[i] == c[i - 1]:\n        print('Skip dupe at index:', i)",
        whyWeUseItHere:
          "Prevents duplicate combinations from appearing in `result` without needing an expensive post-processing set.",
      },
      {
        keywordOrMethod: "backtrack(i + 1, remaining - candidates[i])",
        plainEnglishExplanation:
          "Advances the index to `i + 1` so the current element is not reused, and subtracts the candidate's value from the remaining target amount.",
        exampleSnippet:
          "def pay(rem, coin):\n    return rem - coin\nprint('Remaining:', pay(10, 3))",
        whyWeUseItHere:
          "Enforces that each candidate number can only be used at most once per combination.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { candidates: [1, 2, 2], target: 3 },
      focus: ["start", "remaining", "current", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you have a wallet with various coins, including some identical coins (like three $1 coins and two $2 coins). You need to assemble exact change for `target`, and each physical coin can only be spent once. If you decide to spend a $1 coin first, it does not matter which of the three identical $1 coins you pull out—they all result in the same combination! To prevent duplicates, sort the coins first. At each decision point, if a coin has the same value as the coin you just considered at that step, skip it. Furthermore, because coins are sorted, as soon as a coin is larger than the remaining amount you need, you can stop checking all subsequent coins immediately.",
      edgeCases: [
        "Candidates cannot sum to target: candidates `[1, 2]`, target `4` returns `[]`.",
        "Multiple identical elements needed to reach target: candidates `[1, 1, 1, 1]`, target `2` correctly returns `[[1, 1]]`.",
        "All candidates must be used: candidates `[1, 1, 1, 1]`, target `4` returns `[[1, 1, 1, 1]]`.",
      ],
      stepByStepWalkthrough: [
        "Sort `candidates` in ascending order.",
        "Initialize `result = []` and `current = []`.",
        "Define `backtrack(start, remaining)`.",
        "If `remaining == 0`: exact change found! Append `list(current)` to `result` and return.",
        "Loop `i` from `start` to `len(candidates) - 1`.",
        "If `candidates[i] > remaining`: because the list is sorted, no subsequent number can fit either, so `break` the loop.",
        "If `i > start` and `candidates[i] == candidates[i - 1]`: skip this duplicate number with `continue`.",
        "Choose `candidates[i]`: append to `current`, recurse with `backtrack(i + 1, remaining - candidates[i])`, and backtrack with `current.pop()`.",
        "Call `backtrack(0, target)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "Each number may only be used once, and duplicate numbers in different positions must not produce duplicate combinations. How does sorting help you skip duplicate branches and stop early?",
      structural:
        "Sort `candidates`. In `backtrack(start, remaining)`, loop `for i in range(start, len(candidates)):`. If `candidates[i] > remaining`, `break`. If `i > start and candidates[i] == candidates[i - 1]`, `continue`. Recurse with `i + 1` and `remaining - candidates[i]`.",
    },
    commonMistakes: [
      "Calling `backtrack(i, ...)` instead of `backtrack(i + 1, ...)`, which would mistakenly allow reusing the same candidate element multiple times.",
      "Using `continue` instead of `break` when `candidates[i] > remaining`. Since candidates are sorted, every subsequent number is also greater, so `break` saves substantial time.",
      "Omitting the check `i > start` before comparing `candidates[i] == candidates[i - 1]`, which prevents using duplicate values at different depths (e.g. `1 + 1 = 2`).",
    ],
    starterCode: `def combination_sum2(candidates: list[int], target: int) -> list[list[int]]:
    # Find all unique combinations of candidates summing to target.
    # Each candidate may be used once; skip duplicate values at each level.
    pass
`,
    optimalSolution: `def combination_sum2(candidates: list[int], target: int) -> list[list[int]]:
    # Sort candidates so duplicates are adjacent and we can prune early
    candidates.sort()
    result = []
    current = []

    def backtrack(start: int, remaining: int) -> None:
        # Base case: reached exact target
        if remaining == 0:
            result.append(list(current))
            return

        for i in range(start, len(candidates)):
            # Prune: since candidates are sorted, all subsequent numbers are also too large
            if candidates[i] > remaining:
                break

            # Skip duplicate numbers at the same decision level
            if i > start and candidates[i] == candidates[i - 1]:
                continue

            # Choose this candidate
            current.append(candidates[i])

            # Recurse with i + 1 because each element can be used only once
            backtrack(i + 1, remaining - candidates[i])

            # Backtrack
            current.pop()

    backtrack(0, target)
    return result
`,
    bruteForceSolution: `def combination_sum2(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    seen = set()
    result = []

    def dfs(index: int, total: int, path: list[int]) -> None:
        if total == target:
            key = tuple(path)
            if key not in seen:
                seen.add(key)
                result.append(list(path))
            return
        if total > target or index == len(candidates):
            return

        # Pick candidate
        path.append(candidates[index])
        dfs(index + 1, total + candidates[index], path)
        path.pop()

        # Skip candidate
        dfs(index + 1, total, path)

    dfs(0, 0, [])
    return result
`,
    harness: { kind: "function", entry: "combination_sum2", compare: "unordered-nested" },
    testCases: [
      {
        input: { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8 },
        expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]],
        description: "Four unique combinations sum to 8 without reusing elements.",
      },
      {
        input: { candidates: [2, 5, 2, 1, 2], target: 5 },
        expected: [[1, 2, 2], [5]],
        description: "1 + 2 + 2 = 5 and 5 = 5. Duplicate 2s are grouped cleanly.",
      },
      {
        input: { candidates: [3, 1, 3, 5, 1], target: 8 },
        expected: [[1, 1, 3, 3], [3, 5]],
        description: "1 + 1 + 3 + 3 = 8 and 3 + 5 = 8.",
      },
      {
        input: { candidates: [1, 2], target: 4 },
        expected: [],
      },
      {
        input: { candidates: [1, 1, 1, 1], target: 2 },
        expected: [[1, 1]],
      },
      {
        input: { candidates: [1, 1, 1, 1], target: 4 },
        expected: [[1, 1, 1, 1]],
      },
      {
        input: { candidates: [2, 3, 6, 7], target: 7 },
        expected: [[7]],
      },
    ],
  },

  // ------------------------------------------------------------------ word-search
  {
    id: "word-search",
    summary:
      "You are given an `m x n` grid of characters `board` and a string `word`. Return `True` if `word` exists in the grid, or `False` otherwise. The word can be constructed from sequentially adjacent cells (horizontally or vertically neighboring). The same letter cell may **not be used more than once** in a single word path.",
    constraints: [
      "m == len(board)",
      "n == len(board[i])",
      "1 ≤ m, n ≤ 6",
      "1 ≤ len(word) ≤ 15",
      "board and word consist of only lowercase and uppercase English letters",
    ],
    pattern: "Backtracking / DFS on Grid: Mark visited in-place with '#' and restore",
    timeComplexity: {
      bruteForce: "O(m · n · 4^L)",
      optimal: "O(m · n · 4^L)",
      explanation:
        "There are m · n potential starting cells. From each cell, we can explore up to 4 directions at each of the L characters in `word`. Pruning whenever the cell does not match `word[index]` makes the practical runtime much faster than the worst-case bound.",
    },
    spaceComplexity: {
      optimal: "O(L)",
      explanation:
        "The maximum recursion depth equals the length of the word L (at most 15). Modifying the board in-place uses O(1) extra space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "board[r][c] = '#'  (in-place visited marking)",
        plainEnglishExplanation:
          "Instead of allocating a separate visited set, we temporarily overwrite the cell's character with `'#'` before making recursive calls. When backtracking, we restore the original character.",
        exampleSnippet:
          "grid = [['A', 'B'], ['C', 'D']]\nold = grid[0][0]\ngrid[0][0] = '#'\nprint('Marked:', grid[0][0])\ngrid[0][0] = old\nprint('Restored:', grid[0][0])",
        whyWeUseItHere:
          "Prevents the word path from looping back on itself, using zero extra memory.",
      },
      {
        keywordOrMethod: "0 <= r < rows and 0 <= c < cols",
        plainEnglishExplanation:
          "Chained comparisons in Python verify that row index `r` and column index `c` fall strictly within the boundaries of the grid.",
        exampleSnippet:
          "r, rows = 2, 3\nprint('In bounds?', 0 <= r < rows)",
        whyWeUseItHere:
          "Protects against `IndexError` when checking neighboring cells.",
      },
      {
        keywordOrMethod: "dfs(...) or dfs(...)  (short-circuit evaluation)",
        plainEnglishExplanation:
          "Python's `or` operator evaluates expressions from left to right and stops immediately as soon as one returns `True`.",
        exampleSnippet:
          "def check(x):\n    return x == 2\nprint(check(1) or check(2) or check(3))",
        whyWeUseItHere:
          "Explores up, down, left, and right, halting exploration as soon as any direction finds a match.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { board: [["A", "B"], ["C", "D"]], word: "ABD" },
      gridPointers: { board: [["r", "c"]] },
      focus: ["r", "c", "index", "word"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine walking through a maze of tiled rooms where each tile has a letter painted on it. You want to spell out `word` letter by letter. First, you search the grid for any tile matching the first letter of `word`. Once you step on it, you leave a temporary marker on the tile so you don't step on your own footprints. From that tile, you peek at the four neighboring rooms (up, down, left, right) to find the second letter. If a neighbor matches, you step into it and repeat the process. If you hit a dead end, you pick up your marker ('backtrack') and try a different neighbor or a different starting tile.",
      edgeCases: [
        "A 1x1 board matching a 1-character word: returns `True` immediately.",
        "Word longer than total number of grid cells: cannot possibly be formed, returns `False`.",
        "Paths that would need to reuse a cell (like spelling 'ABCB' using a 1x2 board): forbidden, returns `False`.",
      ],
      stepByStepWalkthrough: [
        "Determine grid dimensions: `rows = len(board)` and `cols = len(board[0])`.",
        "Define `dfs(r, c, index)` where `(r, c)` is the current cell and `index` is the character in `word` we are trying to match.",
        "Base case: if `index == len(word)`, all letters in the word have been matched. Return `True`.",
        "Boundary & match check: if `r` or `c` is out of bounds, or `board[r][c] != word[index]`, return `False`.",
        "Mark cell as visited: save `temp = board[r][c]`, set `board[r][c] = '#'`. ",
        "Explore all 4 directions: recursively call `dfs` on `(r + 1, c)`, `(r - 1, c)`, `(r, c + 1)`, and `(r, c - 1)` with `index + 1`.",
        "Backtrack: restore `board[r][c] = temp`.",
        "Iterate over every cell in `board`. If `dfs(r, c, 0)` returns `True` from any starting cell, return `True`. If no cell starts a valid path, return `False`.",
      ],
    },
    hints: {
      conceptual:
        "Scan the board to find cells matching the first letter. From each match, explore all 4 adjacent neighbors recursively. How can you ensure a cell isn't visited twice in the same path?",
      structural:
        "Write a helper `dfs(r, c, index)`. Check bounds and `board[r][c] == word[index]`. Temporarily replace `board[r][c]` with `'#'` before recursing on adjacent cells, and restore it before returning.",
    },
    commonMistakes: [
      "Forgetting to restore `board[r][c] = temp` when backtracking, which permanently destroys board letters for other search attempts.",
      "Accessing `board[r][c]` before verifying that `r` and `c` are within grid boundaries, causing `IndexError`.",
      "Checking `index == len(word)` after accessing `board[r][c]`, causing an out-of-bounds error on `word`.",
    ],
    starterCode: `def exist(board: list[list[str]], word: str) -> bool:
    # Return True if word can be formed by sequentially adjacent cells in board.
    # The same cell may not be used more than once per word.
    pass
`,
    optimalSolution: `def exist(board: list[list[str]], word: str) -> bool:
    rows = len(board)
    cols = len(board[0])

    def dfs(r: int, c: int, index: int) -> bool:
        # Base case: matched all characters in word
        if index == len(word):
            return True

        # Check boundaries and whether current cell matches current letter
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[index]:
            return False

        # Temporarily mark cell as visited so it isn't reused in this path
        temp = board[r][c]
        board[r][c] = "#"

        # Explore all 4 adjacent directions: up, down, left, right
        found = (
            dfs(r + 1, c, index + 1)
            or dfs(r - 1, c, index + 1)
            or dfs(r, c + 1, index + 1)
            or dfs(r, c - 1, index + 1)
        )

        # Backtrack: restore the cell's original character
        board[r][c] = temp
        return found

    # Try starting the search from every cell in the board
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True

    return False
`,
    bruteForceSolution: `def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])
    visited = set()

    def search(r: int, c: int, k: int) -> bool:
        if k == len(word):
            return True
        if not (0 <= r < rows and 0 <= c < cols):
            return False
        if (r, c) in visited or board[r][c] != word[k]:
            return False

        visited.add((r, c))
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            if search(r + dr, c + dc, k + 1):
                visited.remove((r, c))
                return True
        visited.remove((r, c))
        return False

    for r in range(rows):
        for c in range(cols):
            if search(r, c, 0):
                return True
    return False
`,
    harness: { kind: "function", entry: "exist" },
    testCases: [
      {
        input: {
          board: [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          word: "ABCCED",
        },
        expected: true,
        description: "The path follows A -> B -> C -> C -> E -> D.",
      },
      {
        input: {
          board: [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          word: "SEE",
        },
        expected: true,
        description: "The path follows S -> E -> E.",
      },
      {
        input: {
          board: [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          word: "ABCB",
        },
        expected: false,
        description: "Cannot reuse the 'B' tile already visited.",
      },
      {
        input: { board: [["a"]], word: "a" },
        expected: true,
      },
      {
        input: { board: [["a"]], word: "b" },
        expected: false,
      },
      {
        input: {
          board: [
            ["A", "B"],
            ["C", "D"],
          ],
          word: "ABCD",
        },
        expected: false,
      },
      {
        input: {
          board: [
            ["A", "B"],
            ["C", "D"],
          ],
          word: "CABD",
        },
        expected: true,
      },
    ],
  },

  // ------------------------------------------------------------------ palindrome-partitioning
  {
    id: "palindrome-partitioning",
    summary:
      "You are given a string `s`. Partition `s` such that every substring in the partition is a **palindrome** (reads the exact same forwards and backwards). Return all possible palindrome partitionings of `s`. You may return the partitions in any order.",
    constraints: [
      "1 ≤ len(s) ≤ 16",
      "s contains only lowercase English letters",
    ],
    pattern: "Backtracking: Cut palindrome prefixes and recurse on remaining suffix",
    timeComplexity: {
      bruteForce: "O(n · 2ⁿ)",
      optimal: "O(n · 2ⁿ)",
      explanation:
        "There are 2^(n-1) ways to cut a string of length n into pieces. For each valid partition, checking palindrome substrings and copying strings of length up to n takes O(n) time, yielding O(n · 2ⁿ) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree depth is at most n (in the case of single-character cuts like ['a', 'a', 'a']). Auxiliary space is O(n).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "sub == sub[::-1]  (palindrome check via slicing)",
        plainEnglishExplanation:
          "`sub[::-1]` produces a reversed copy of the string using Python's slice syntax with a step of `-1`. A string is a palindrome if it equals its reverse.",
        exampleSnippet:
          "w = 'racecar'\nprint('Is racecar a palindrome?', w == w[::-1])",
        whyWeUseItHere:
          "Checks whether a chosen prefix reads identically backwards and forwards.",
      },
      {
        keywordOrMethod: "s[start:end]  (string slicing)",
        plainEnglishExplanation:
          "Extracts a substring from index `start` up to but not including `end`.",
        exampleSnippet:
          "s = 'abcdef'\nprint('Slice [1:4]:', s[1:4])",
        whyWeUseItHere:
          "Cuts candidate prefixes of length 1, 2, 3... from the remaining string.",
      },
      {
        keywordOrMethod: "for end in range(start + 1, len(s) + 1):",
        plainEnglishExplanation:
          "Generates all possible end positions for the slice. Because slice endpoints are non-inclusive, `end` must go up to `len(s) + 1` to include the final character.",
        exampleSnippet:
          "s = 'cat'\nfor end in range(1, len(s) + 1):\n    print(s[0:end])",
        whyWeUseItHere:
          "Tries every possible prefix length starting from the current index `start`.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { s: "aab" },
      focus: ["start", "current", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine placing dividers between letters in a word. You want to make sure every chunk between dividers reads identically backwards and forwards. Starting from the beginning of the word, you test every possible prefix: 'Is this 1-letter prefix a palindrome? What about this 2-letter prefix?' Whenever you find a prefix that is a palindrome, you cut it off, save it, and hand the rest of the string to a recursive helper: 'Can you partition the remainder into palindromes?' If the helper successfully cuts all the way to the end of the word, you've found a complete valid partition. Then you backtrack, remove that prefix, and try a longer palindrome prefix.",
      edgeCases: [
        "A single character string `'a'`: only one partition `[['a']]`.",
        "All identical characters `'aaa'`: has multiple valid partitions: `[['a','a','a'], ['a','aa'], ['aa','a'], ['aaa']]`.",
        "No multi-character palindromes (e.g. `'ab'`): only individual character pieces `[['a', 'b']]`.",
      ],
      stepByStepWalkthrough: [
        "Initialize `result = []` to store complete partitions and `current = []` for the partition currently being constructed.",
        "Define `backtrack(start)` where `start` is the index where the remaining unpartitioned suffix begins.",
        "Base case: if `start == len(s)`, we have reached the end of the string. Append `list(current)` to `result` and return.",
        "Loop `end` from `start + 1` to `len(s) + 1`.",
        "Extract `substring = s[start:end]`.",
        "If `substring` is a palindrome (`substring == substring[::-1]`):",
        "Append `substring` to `current`.",
        "Call `backtrack(end)` to partition the remaining suffix.",
        "Backtrack: pop `substring` from `current`.",
        "Start with `backtrack(0)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "At each position, look at every possible prefix. If that prefix is a palindrome, you can cut there and recursively partition the rest of the string.",
      structural:
        "Define `backtrack(start)`. When `start == len(s)`, append `list(current)` to `result`. Loop `end` from `start + 1` to `len(s) + 1`. If `s[start:end]` is a palindrome, append it, call `backtrack(end)`, and pop it off.",
    },
    commonMistakes: [
      "Using `range(start + 1, len(s))` instead of `range(start + 1, len(s) + 1)`. Since slice endpoints are exclusive, stopping at `len(s)` misses the full remaining substring!",
      "Forgetting to make a copy `list(current)` when appending to `result`.",
      "Not removing the substring with `current.pop()` when backtracking, leaving pieces from earlier branches.",
    ],
    starterCode: `def partition(s: str) -> list[list[str]]:
    # Return all possible palindrome partitionings of string s.
    # At each step, cut a palindrome prefix and recurse on the remainder.
    pass
`,
    optimalSolution: `def partition(s: str) -> list[list[str]]:
    result = []
    current = []

    def is_palindrome(sub: str) -> bool:
        # A string is a palindrome if it reads the same backwards
        return sub == sub[::-1]

    def backtrack(start: int) -> None:
        # Base case: reached the end of the string
        if start == len(s):
            result.append(list(current))
            return

        # Try every possible cut point
        for end in range(start + 1, len(s) + 1):
            substring = s[start:end]

            # Only proceed if the prefix is a valid palindrome
            if is_palindrome(substring):
                current.append(substring)
                # Recurse on the remaining suffix
                backtrack(end)
                # Backtrack to try a different cut
                current.pop()

    backtrack(0)
    return result
`,
    bruteForceSolution: `def partition(s: str) -> list[list[str]]:
    result = []
    n = len(s)

    def dfs(index: int, pieces: list[str]) -> None:
        if index == n:
            if all(p == p[::-1] for p in pieces):
                result.append(list(pieces))
            return
        for next_index in range(index + 1, n + 1):
            dfs(next_index, pieces + [s[index:next_index]])

    dfs(0, [])
    return result
`,
    harness: { kind: "function", entry: "partition", compare: "unordered" },
    testCases: [
      {
        input: { s: "aab" },
        expected: [["a", "a", "b"], ["aa", "b"]],
        description: "Can be partitioned into ['a', 'a', 'b'] or ['aa', 'b'].",
      },
      {
        input: { s: "a" },
        expected: [["a"]],
        description: "A single letter is already a palindrome.",
      },
      {
        input: { s: "ab" },
        expected: [["a", "b"]],
        description: "Only single-letter palindromes exist.",
      },
      {
        input: { s: "aaa" },
        expected: [["a", "a", "a"], ["a", "aa"], ["aa", "a"], ["aaa"]],
      },
      {
        input: { s: "bb" },
        expected: [["b", "b"], ["bb"]],
      },
      {
        input: { s: "racecar" },
        expected: [
          ["r", "a", "c", "e", "c", "a", "r"],
          ["r", "a", "cec", "a", "r"],
          ["r", "aceca", "r"],
          ["racecar"],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ letter-combinations-of-a-phone-number
  {
    id: "letter-combinations-of-a-phone-number",
    summary:
      "You are given a string containing digits from `2-9` inclusive. Return all possible **letter combinations** that the number could represent based on classic telephone keypad buttons. If the input string is empty, return an empty list `[]`. You may return the combinations in any order.",
    constraints: [
      "0 ≤ len(digits) ≤ 4",
      "digits[i] is a digit in the range ['2', '9']",
    ],
    pattern: "Backtracking / Combinations: Cartesian product of digit letter mappings",
    timeComplexity: {
      bruteForce: "O(4ⁿ)",
      optimal: "O(4ⁿ)",
      explanation:
        "Each digit maps to at most 4 letters (e.g. 7 and 9 have 4 letters). For n digits, there are at most 4ⁿ combinations. Assembling each string of length n takes O(n) time, yielding O(n · 4ⁿ) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree depth equals the number of digits n (at most 4). Auxiliary space is O(n).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "KEYPAD = {'2': 'abc', ...}  (dictionary mapping)",
        plainEnglishExplanation:
          "A dictionary maps keys to values. Looking up `KEYPAD['2']` instantly gives the string `'abc'` representing letters on key 2.",
        exampleSnippet:
          "pad = {'2': 'abc', '3': 'def'}\nprint('Letters for 2:', pad['2'])",
        whyWeUseItHere:
          "Provides the set of letters corresponding to each phone number digit.",
      },
      {
        keywordOrMethod: "''.join(current)  (joining characters into a string)",
        plainEnglishExplanation:
          "`''.join(list_of_strings)` glues together all strings in a list into one single string with no separator between them.",
        exampleSnippet:
          "chars = ['a', 'd']\nprint('Joined:', ''.join(chars))",
        whyWeUseItHere:
          "Combines the chosen character list into the final combination string.",
      },
      {
        keywordOrMethod: "if not digits: return []  (handling empty string)",
        plainEnglishExplanation:
          "In Python, an empty string `''` evaluates to `False`. The check `if not digits:` detects an empty string input.",
        exampleSnippet:
          "d = ''\nif not d:\n    print('Empty input!')",
        whyWeUseItHere:
          "Ensures we return `[]` when `digits` is empty instead of returning `['']`.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { digits: "23" },
      focus: ["index", "current", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of an old-school telephone where key '2' has letters ABC and key '3' has letters DEF. If you type '23', you are making two sequential decisions: first choose one of the 3 letters on button '2', then choose one of the 3 letters on button '3'. The total number of outcomes is 3 × 3 = 9. Backtracking walks through the digits from left to right: for each digit, it branches on every letter mapped to that digit, and records the complete string once every digit has contributed one letter.",
      edgeCases: [
        "Empty string `digits = ''`: must return `[]`, NOT `['']`.",
        "Single digit `digits = '2'`: returns `['a', 'b', 'c']`.",
        "Digits with 4 letters like '7' (pqrs) and '9' (wxyz): handled naturally by the dictionary mapping.",
      ],
      stepByStepWalkthrough: [
        "If `digits` is empty, return `[]` immediately.",
        "Define the phone keypad dictionary mapping digits `'2'` through `'9'` to their corresponding letters.",
        "Initialize `result = []` and `current = []`.",
        "Define `backtrack(index)` where `index` is the digit currently being processed.",
        "Base case: if `index == len(digits)`, we have chosen a letter for every digit. Append `''.join(current)` to `result` and return.",
        "Retrieve the mapped letters for `digits[index]`.",
        "For each `char` in those letters: append `char` to `current`, call `backtrack(index + 1)`, and backtrack with `current.pop()`.",
        "Call `backtrack(0)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "Store the letter options for each digit in a dictionary. For each digit in the input, branch on every possible letter it can represent.",
      structural:
        "Check if `not digits` and return `[]`. In `backtrack(index)`, if `index == len(digits)`, append `''.join(current)`. Otherwise, loop through `KEYPAD[digits[index]]`, append to `current`, recurse on `index + 1`, and pop.",
    },
    commonMistakes: [
      "Returning `['']` instead of `[]` for an empty input string `''`.",
      "Forgetting that digits 7 and 9 have 4 letters (`'pqrs'` and `'wxyz'`) instead of 3.",
      "Accidentally looping through all digits inside each call instead of only processing `digits[index]` and advancing to `index + 1`.",
    ],
    starterCode: `def letter_combinations(digits: str) -> list[str]:
    # Return all possible letter combinations for the phone number digits.
    # Map each digit to its keypad letters and branch recursively.
    pass
`,
    optimalSolution: `def letter_combinations(digits: str) -> list[str]:
    # Edge case: empty input produces no combinations
    if not digits:
        return []

    # Map each digit to its corresponding phone keypad letters
    KEYPAD = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    }

    result = []
    current = []

    def backtrack(index: int) -> None:
        # Base case: chosen a letter for every digit
        if index == len(digits):
            result.append("".join(current))
            return

        # Try every letter corresponding to the current digit
        for char in KEYPAD[digits[index]]:
            current.append(char)
            backtrack(index + 1)
            current.pop()

    backtrack(0)
    return result
`,
    bruteForceSolution: `def letter_combinations(digits: str) -> list[str]:
    if not digits:
        return []
    KEYPAD = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    result = [""]
    for d in digits:
        new_result = []
        for combo in result:
            for char in KEYPAD[d]:
                new_result.append(combo + char)
        result = new_result
    return result
`,
    harness: { kind: "function", entry: "letter_combinations", compare: "unordered" },
    testCases: [
      {
        input: { digits: "23" },
        expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        description: "2 maps to 'abc' and 3 maps to 'def', generating 3 x 3 = 9 combinations.",
      },
      {
        input: { digits: "" },
        expected: [],
        description: "Empty input yields an empty list.",
      },
      {
        input: { digits: "2" },
        expected: ["a", "b", "c"],
        description: "A single digit maps directly to its 3 letters.",
      },
      {
        input: { digits: "7" },
        expected: ["p", "q", "r", "s"],
      },
      {
        input: { digits: "79" },
        expected: [
          "pw", "px", "py", "pz", "qw", "qx", "qy", "qz",
          "rw", "rx", "ry", "rz", "sw", "sx", "sy", "sz",
        ],
      },
      {
        input: { digits: "234" },
        expected: [
          "adg", "adh", "adi", "aeg", "aeh", "aei", "afg", "afh", "afi",
          "bdg", "bdh", "bdi", "beg", "beh", "bei", "bfg", "bfh", "bfi",
          "cdg", "cdh", "cdi", "ceg", "ceh", "cei", "cfg", "cfh", "cfi",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ n-queens
  {
    id: "n-queens",
    summary:
      "The **n-queens** puzzle asks you to place `n` chess queens on an `n x n` chessboard such that no two queens attack each other (no two queens share the same row, column, or diagonal). Given an integer `n`, return all distinct solutions. Each solution is a grid representation where `'Q'` indicates a queen and `'.'` indicates an empty square.",
    constraints: [
      "1 ≤ n ≤ 9",
    ],
    pattern: "Backtracking: Place queen row-by-row tracking columns and diagonals",
    timeComplexity: {
      bruteForce: "O(nⁿ)",
      optimal: "O(n!)",
      explanation:
        "Because each row must contain exactly one queen, the first row has n choices, the second row has at most n - 1 choices, the third at most n - 2, and so on. Pruning invalid attacks limits the search space to O(n!). Formatting the n x n board for each valid solution takes O(n²).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree depth is n. The sets tracking occupied columns and diagonals each contain at most n elements.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "(r + c) and (r - c)  (diagonal formulas)",
        plainEnglishExplanation:
          "On a 2D grid, all squares on any positive diagonal (bottom-left to top-right) share the same value of `r + c`. All squares on any negative diagonal (top-left to bottom-right) share the same value of `r - c`.",
        exampleSnippet:
          "for r in range(3):\n    for c in range(3):\n        if r + c == 2:\n            print(f'({r}, {c}) on anti-diagonal 2')",
        whyWeUseItHere:
          "Allows O(1) checks to see if any queen already placed threatens the current square diagonally.",
      },
      {
        keywordOrMethod: "[['.'] * n for _ in range(n)]  (2D board initialization)",
        plainEnglishExplanation:
          "A list comprehension creates an `n x n` grid of independent lists. Never use `[['.'] * n] * n`, which creates n references to the exact same list in memory!",
        exampleSnippet:
          "board = [['.'] * 3 for _ in range(3)]\nboard[0][0] = 'Q'\nfor row in board:\n    print(''.join(row))",
        whyWeUseItHere:
          "Initializes the empty chessboard before placing queens.",
      },
      {
        keywordOrMethod: "cols.add(c) and cols.remove(c)",
        plainEnglishExplanation:
          "`add` inserts an element into a set; `remove` deletes it. In backtracking, we add column and diagonal identifiers when placing a queen, and remove them when removing the queen.",
        exampleSnippet:
          "cols = set()\ncols.add(2)\nprint('Occupied?', 2 in cols)\ncols.remove(2)\nprint('After backtrack:', 2 in cols)",
        whyWeUseItHere:
          "Tracks occupied columns and diagonals in O(1) time.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { n: 4 },
      gridPointers: { board: [["r", "c"]] },
      focus: ["r", "c", "board", "result"],
      maxSteps: 450,
    },
    intuitiveExplanation: {
      intuition:
        "In chess, a queen attacks any piece in the same row, same column, or along either diagonal. Because no two queens can share a row, an n x n board with n queens must have exactly one queen in every row. This allows us to place queens row by row from top to bottom (row 0, then row 1, ..., row n - 1). In row `r`, we scan each column `c`. A square `(r, c)` is safe if no queen has already been placed in column `c`, positive diagonal `r + c`, or negative diagonal `r - c`. If it's safe, we place a queen and move to the next row. If we successfully place queens in all n rows, we record the board!",
      edgeCases: [
        "`n = 1`: one queen on a 1x1 board `[['Q']]`.",
        "`n = 2` and `n = 3`: impossible to place queens without attacks, returns `[]`.",
        "`n = 4`: smallest non-trivial board with solutions, producing 2 distinct configurations.",
      ],
      stepByStepWalkthrough: [
        "Initialize `result = []` and create an `n x n` board of `'.'` characters.",
        "Create sets `cols = set()`, `pos_diag = set()` (values of `r + c`), and `neg_diag = set()` (values of `r - c`).",
        "Define `backtrack(r)` where `r` is the row currently being placed.",
        "Base case: if `r == n`, all n queens are safely placed! Convert each row of characters into a string and append the board to `result`.",
        "Loop `c` through columns `0` to `n - 1`.",
        "Check safety: if `c in cols or (r + c) in pos_diag or (r - c) in neg_diag`, this square is under attack, so skip it.",
        "Place queen: add `c` to `cols`, `r + c` to `pos_diag`, `r - c` to `neg_diag`, and set `board[r][c] = 'Q'`.",
        "Recurse to the next row: `backtrack(r + 1)`.",
        "Backtrack: remove `c`, `r + c`, and `r - c` from their sets, and reset `board[r][c] = '.'`.",
        "Call `backtrack(0)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "Since each row must have exactly one queen, place one queen per row from top to bottom. How can you mathematically identify which squares share the same diagonal?",
      structural:
        "Recurse row by row `backtrack(r)`. Track attacked columns with a set `cols`, anti-diagonals with `r + c`, and main diagonals with `r - c`. When `r == n`, format the board into strings and add it to `result`.",
    },
    commonMistakes: [
      "Checking row attacks: unnecessary because we place exactly one queen per row by advancing `r + 1`.",
      "Forgetting to remove `(r + c)` or `(r - c)` from diagonal sets during backtracking, preventing valid placements in later branches.",
      "Creating the board with `[['.'] * n] * n`, where mutating one row accidentally changes every row in the board.",
    ],
    starterCode: `def solve_n_queens(n: int) -> list[list[str]]:
    # Return all distinct solutions to the n-queens puzzle.
    # Place one queen per row, tracking occupied columns and diagonals.
    pass
`,
    optimalSolution: `def solve_n_queens(n: int) -> list[list[str]]:
    result = []
    # Create an n x n board of empty squares '.'
    board = [["."] * n for _ in range(n)]

    # Track columns and diagonals occupied by placed queens
    cols, pos_diag, neg_diag = set(), set(), set()

    def backtrack(r: int) -> None:
        # Base case: successfully placed queens in all n rows
        if r == n:
            # Convert list of char lists into list of strings
            result.append(["".join(row) for row in board])
            return

        for c in range(n):
            # Check if this square is attacked by an existing queen
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue

            # Place queen at (r, c)
            cols.add(c)
            pos_diag.add(r + c)
            neg_diag.add(r - c)
            board[r][c] = "Q"

            # Recurse to the next row
            backtrack(r + 1)

            # Backtrack: remove queen and restore state
            cols.remove(c)
            pos_diag.remove(r + c)
            neg_diag.remove(r - c)
            board[r][c] = "."

    backtrack(0)
    return result
`,
    bruteForceSolution: `def solve_n_queens(n: int) -> list[list[str]]:
    result = []
    board = [["."] * n for _ in range(n)]

    def is_safe(r: int, c: int) -> bool:
        for i in range(r):
            for j in range(n):
                if board[i][j] == "Q":
                    if j == c or abs(i - r) == abs(j - c):
                        return False
        return True

    def place(r: int) -> None:
        if r == n:
            result.append(["".join(row) for row in board])
            return
        for c in range(n):
            if is_safe(r, c):
                board[r][c] = "Q"
                place(r + 1)
                board[r][c] = "."

    place(0)
    return result
`,
    harness: { kind: "function", entry: "solve_n_queens", compare: "unordered" },
    testCases: [
      {
        input: { n: 4 },
        expected: [
          [".Q..", "...Q", "Q...", "..Q."],
          ["..Q.", "Q...", "...Q", ".Q.."],
        ],
        description: "A 4x4 board has 2 distinct non-attacking queen configurations.",
      },
      {
        input: { n: 1 },
        expected: [["Q"]],
        description: "A 1x1 board has 1 trivial solution.",
      },
      {
        input: { n: 2 },
        expected: [],
        description: "Impossible to place 2 queens on a 2x2 board without attacking each other.",
      },
      {
        input: { n: 3 },
        expected: [],
      },
      {
        input: { n: 5 },
        expected: [
          ["Q....", "..Q..", "....Q", ".Q...", "...Q."],
          ["Q....", "...Q.", ".Q...", "....Q", "..Q.."],
          [".Q...", "...Q.", "Q....", "..Q..", "....Q"],
          [".Q...", "....Q", "..Q..", "Q....", "...Q."],
          ["..Q..", "Q....", "...Q.", ".Q...", "....Q"],
          ["..Q..", "....Q", ".Q...", "...Q.", "Q...."],
          ["...Q.", "Q....", "..Q..", "....Q", ".Q..."],
          ["...Q.", ".Q...", "....Q", "..Q..", "Q...."],
          ["....Q", ".Q...", "...Q.", "Q....", "..Q.."],
          ["....Q", "..Q..", "Q....", "...Q.", ".Q..."],
        ],
      },
      {
        input: { n: 6 },
        expected: [
          [".Q....", "...Q..", ".....Q", "Q.....", "..Q...", "....Q."],
          ["..Q...", ".....Q", ".Q....", "....Q.", "Q.....", "...Q.."],
          ["...Q..", "Q.....", "....Q.", ".Q....", ".....Q", "..Q..."],
          ["....Q.", "..Q...", "Q.....", ".....Q", "...Q..", ".Q...."],
        ],
      },
    ],
  },
];

export default problems;
