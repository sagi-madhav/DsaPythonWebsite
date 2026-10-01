import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ maximum-subarray
  {
    id: "maximum-subarray",
    summary:
      "You are given an integer list `nums`. A **subarray** is a continuous sequence of elements inside the list. Find the contiguous subarray (containing at least one number) that has the largest sum, and return that **maximum sum**.",
    constraints: [
      "1 ≤ len(nums) ≤ 100,000",
      "-10,000 ≤ nums[i] ≤ 10,000",
    ],
    pattern: "Kadane's algorithm (reset running sum when negative)",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force checks every possible starting and ending position for a subarray, taking O(n²) time. Kadane's algorithm makes a single pass through the list of length n, doing O(1) constant work per number, taking O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only track two integer variables (`max_sum` and `curr_sum`) as we scan through the list, using no extra storage.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "nums[0]",
        plainEnglishExplanation:
          "Square brackets with an index access an element by position. Python lists are 0-indexed, so `nums[0]` fetches the very first item in the list.",
        exampleSnippet: "numbers = [10, 20, 30]\nprint(numbers[0])",
        whyWeUseItHere:
          "We initialize our running maximum with the first element of the list, ensuring our maximum starts with a valid value even if all numbers are negative.",
      },
      {
        keywordOrMethod: "for i, num in enumerate(nums):",
        plainEnglishExplanation:
          "A standard `for num in nums:` loop yields each value. `enumerate` provides both the 0-based position `i` and the value `num` at that position during each iteration.",
        exampleSnippet:
          "scores = [85, 92, 78]\nfor i, score in enumerate(scores):\n    print(i, score)",
        whyWeUseItHere:
          "We use `enumerate` so we can inspect each number while keeping an index pointer for the step-by-step visualizer.",
      },
      {
        keywordOrMethod: "curr_sum += num",
        plainEnglishExplanation:
          "`curr_sum += num` is shorthand for `curr_sum = curr_sum + num`. It adds `num` to the existing value of `curr_sum` and stores the result back in `curr_sum`.",
        exampleSnippet: "total = 10\ntotal += 5\nprint(total)",
        whyWeUseItHere:
          "We add each new number in the list to our ongoing subarray sum.",
      },
      {
        keywordOrMethod: "max()",
        plainEnglishExplanation:
          "`max(a, b)` compares two values and returns whichever one is larger.",
        exampleSnippet: "record = 5\nprint(max(record, 12))",
        whyWeUseItHere:
          "We compare our best sum so far with the current running sum to keep the larger one.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      pointers: { nums: ["i"] },
      focus: ["max_sum", "curr_sum", "num"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine walking along a path where you collect or lose coins at each step. You want to walk away with the heaviest pocket of coins from any continuous segment. If your pocket ever becomes negative, carrying that deficit into future steps will only drag down any future gains! The smartest move when your balance drops below zero is to dump the debt, reset your pocket to zero, and start a fresh subarray from the next coin. Meanwhile, you write down on a scorecard the highest coin count your pocket ever reached.",
      edgeCases: [
        "All numbers are negative (e.g., `[-5, -2, -3]`): resetting before adding would give 0 if not careful. By initializing `max_sum` to `nums[0]` and resetting `curr_sum` before adding, we correctly pick `-2`.",
        "A single element array (e.g., `[7]`): the loop runs once and immediately returns that single element.",
        "All positive numbers: the running sum never drops below zero and simply grows until the end, summing the whole list.",
      ],
      stepByStepWalkthrough: [
        "Initialize `max_sum` to `nums[0]` so we have a valid baseline.",
        "Initialize `curr_sum` to `0` to track the sum of the current subarray.",
        "Iterate through each number in `nums`.",
        "If `curr_sum` is less than 0, reset `curr_sum` to 0 because starting fresh is better than carrying a deficit.",
        "Add the current number to `curr_sum`.",
        "Update `max_sum` to be the maximum of `max_sum` and `curr_sum`.",
        "After looking at all numbers, return `max_sum`.",
      ],
    },
    hints: {
      conceptual:
        "If you are extending a subarray and its accumulated sum becomes negative, can adding that sum to future numbers ever help them become larger?",
      structural:
        "Use a single `for` loop over `nums`. Maintain `max_sum = nums[0]` and `curr_sum = 0`. If `curr_sum < 0`, reset it to 0 before adding the current element, then update `max_sum`.",
    },
    commonMistakes: [
      "Initializing `max_sum = 0`. If all numbers in `nums` are negative (like `[-3, -1, -2]`), the function would wrongly return 0 instead of `-1`.",
      "Resetting `curr_sum` AFTER updating `max_sum` when `max_sum` starts at 0, which can lead to returning 0 for all-negative arrays.",
      "Trying to generate all subarrays with nested loops, which causes Time Limit Exceeded on arrays with 100,000 numbers.",
    ],
    starterCode: `def max_sub_array(nums: list[int]) -> int:
    # Find the contiguous subarray with the largest sum and return that sum.
    # Tip: if your running sum becomes negative, it's better to restart fresh.
    pass
`,
    optimalSolution: `def max_sub_array(nums: list[int]) -> int:
    # Initialize the best sum found so far with the first element
    max_sum = nums[0]
    # Track the running sum of our current contiguous subarray
    curr_sum = 0

    # Iterate through each number in the array
    for i, num in enumerate(nums):
        # If the accumulated sum has dropped below zero, discard it and restart
        if curr_sum < 0:
            curr_sum = 0

        # Add the current number to our running subarray sum
        curr_sum += num

        # Record a new high score if our running sum beats the record
        if curr_sum > max_sum:
            max_sum = curr_sum

    # Return the maximum subarray sum found
    return max_sum
`,
    bruteForceSolution: `def max_sub_array(nums: list[int]) -> int:
    # Track the maximum sum found among all possible subarrays
    max_sum = nums[0]

    # Try every possible starting position
    for i in range(len(nums)):
        curr_sum = 0
        # Try every possible ending position starting from i
        for j in range(i, len(nums)):
            curr_sum += nums[j]
            if curr_sum > max_sum:
                max_sum = curr_sum

    return max_sum
`,
    harness: { kind: "function", entry: "max_sub_array" },
    testCases: [
      {
        input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        expected: 6,
        description: "The contiguous subarray [4, -1, 2, 1] has the largest sum of 6.",
      },
      {
        input: { nums: [1] },
        expected: 1,
        description: "A single-element array only has one possible subarray.",
      },
      {
        input: { nums: [5, 4, -1, 7, 8] },
        expected: 23,
        description: "All elements together form the maximum subarray with sum 23.",
      },
      { input: { nums: [-1] }, expected: -1 },
      { input: { nums: [-5, -2, -3] }, expected: -2 },
      { input: { nums: [1, 2, 3, 4, 5] }, expected: 15 },
      { input: { nums: [-2, -3, 4, -1, -2, 1, 5, -3] }, expected: 7 },
      { input: { nums: [0, 0, 0] }, expected: 0 },
    ],
  },

  // ------------------------------------------------------------------ jump-game
  {
    id: "jump-game",
    summary:
      "You are given an integer list `nums`. You start at the very first index (index 0). Each element `nums[i]` indicates the **maximum jump length** from that position. Return `True` if you can reach the **last index**, or `False` otherwise.",
    constraints: [
      "1 ≤ len(nums) ≤ 10,000",
      "0 ≤ nums[i] ≤ 100,000",
    ],
    pattern: "Greedy backwards goalpost",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force checks every possible jump path recursively, taking O(n²) with memoization or exponential time without. The greedy approach walks backwards from the last index to the first in a single pass of length n, checking each index in O(1) time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only update a single integer variable `goal` as we walk backwards.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "-> bool",
        plainEnglishExplanation:
          "A type hint indicating the function returns a boolean value: either `True` or `False`.",
        exampleSnippet:
          "def is_positive(n: int) -> bool:\n    return n > 0\n\nprint(is_positive(5))",
        whyWeUseItHere:
          "The question asks whether it is possible to reach the end: a yes/no question represented as `True` or `False`.",
      },
      {
        keywordOrMethod: "len() - 1",
        plainEnglishExplanation:
          "`len(nums)` gives the count of items in the list. Because indexing starts at 0, the last element is always at index `len(nums) - 1`.",
        exampleSnippet: "items = ['a', 'b', 'c']\nprint(len(items) - 1)",
        whyWeUseItHere:
          "Our target at the start is to reach the final index of the array.",
      },
      {
        keywordOrMethod: "range(start, stop, step)",
        plainEnglishExplanation:
          "With three arguments, `range` starts at `start`, stops right before `stop`, and changes by `step` each time. A step of `-1` counts backwards.",
        exampleSnippet: "for i in range(3, -1, -1):\n    print(i)",
        whyWeUseItHere:
          "We step backwards through the array from right to left, checking if each index can jump to the current goal.",
      },
      {
        keywordOrMethod: "==",
        plainEnglishExplanation:
          "`==` tests if two values are equal and produces `True` or `False`. Returning the result of `goal == 0` returns `True` if the goal shifted all the way to index 0.",
        exampleSnippet: "x = 0\nprint(x == 0)",
        whyWeUseItHere:
          "If index 0 can reach the goal, we have proven we can reach the end from the start.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [2, 3, 1, 0, 4] },
      pointers: { nums: ["i", "goal"] },
      focus: ["goal", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine trying to reach a finish line at the end of a row of stepping stones. Instead of guessing forward which jumps to take, stand at the finish line and look backwards! Ask: 'Can the stone just before the finish line jump far enough to reach me?' If yes, then getting to that stone is just as good as getting to the finish line! You move your goalpost left to that stone. You repeat this question stone by stone heading backwards. If your goalpost successfully shifts all the way back to the starting stone (index 0), then a valid path from start to finish is guaranteed.",
      edgeCases: [
        "A single element list (e.g., `[0]`): you start at index 0 and the last index is 0, so you are already at the finish line. Returns `True`.",
        "A list containing zeros that block passage (e.g., `[3, 2, 1, 0, 4]`): jumping from any index before 3 lands at or before 3, where the jump length is 0. The goalpost never shifts past index 3, returning `False`.",
        "Zeros that can be jumped over (e.g., `[2, 0, 0]`): index 0 has jump 2, which lands directly at index 2, bypassing index 1. Returns `True`.",
      ],
      stepByStepWalkthrough: [
        "Set `goal` to the last index: `len(nums) - 1`.",
        "Loop backwards from the second-to-last index down to index 0.",
        "At each index `i`, check if `i + nums[i] >= goal`. This means: starting at index `i`, can we jump far enough to reach or pass `goal`?",
        "If yes, shift `goal` to `i`, because reaching `i` is now sufficient to reach the end.",
        "If no, `goal` stays where it is.",
        "After checking index 0, return `True` if `goal == 0`, else `False`.",
      ],
    },
    hints: {
      conceptual:
        "Instead of searching forwards and exploring many branching paths, what happens if you work backwards from the target?",
      structural:
        "Set `goal = len(nums) - 1`. Loop backwards with `for i in range(len(nums) - 2, -1, -1):`. If `i + nums[i] >= goal`, update `goal = i`. Finally return `goal == 0`.",
    },
    commonMistakes: [
      "Using a greedy forward approach that always takes the biggest jump `nums[i]`. Taking the largest jump might land you on a 0, whereas a smaller jump might land on a 5.",
      "Handling single-element arrays like `[0]` incorrectly by assuming 0 always means impossible to jump. But at index 0 you are already at the goal!",
      "Writing an unmemoized recursion that branches on every possible jump length, leading to Time Limit Exceeded (exponential O(2ⁿ)).",
    ],
    starterCode: `def can_jump(nums: list[int]) -> bool:
    # Determine if you can reach the last index from index 0.
    # Tip: working backwards from the last index can simplify the decision.
    pass
`,
    optimalSolution: `def can_jump(nums: list[int]) -> bool:
    # The initial target we need to reach is the final index
    goal = len(nums) - 1

    # Walk backwards from the second-to-last index to index 0
    for i in range(len(nums) - 2, -1, -1):
        # Can we jump from index i to reach or exceed our current goal?
        if i + nums[i] >= goal:
            # Yes! Reaching index i is now enough to reach the end
            goal = i

    # If the goal moved all the way back to the start, the journey is possible
    return goal == 0
`,
    bruteForceSolution: `def can_jump(nums: list[int]) -> bool:
    # Try all jump lengths recursively with memoization
    memo = {}

    def dfs(i: int) -> bool:
        # If we have reached or passed the last index, success
        if i >= len(nums) - 1:
            return True
        if i in memo:
            return memo[i]

        # Try every jump distance from 1 up to nums[i]
        for jump in range(1, nums[i] + 1):
            if dfs(i + jump):
                memo[i] = True
                return True

        memo[i] = False
        return False

    return dfs(0)
`,
    harness: { kind: "function", entry: "can_jump" },
    testCases: [
      {
        input: { nums: [2, 3, 1, 1, 4] },
        expected: true,
        description: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: { nums: [3, 2, 1, 0, 4] },
        expected: false,
        description: "Every path lands on index 3 with jump 0, making it impossible to reach index 4.",
      },
      {
        input: { nums: [0] },
        expected: true,
        description: "Already at the last index from the beginning.",
      },
      { input: { nums: [2, 0, 0] }, expected: true },
      { input: { nums: [1, 2, 3] }, expected: true },
      { input: { nums: [0, 2, 3] }, expected: false },
      { input: { nums: [1, 0, 1, 0] }, expected: false },
      { input: { nums: [2, 5, 0, 0] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ jump-game-ii
  {
    id: "jump-game-ii",
    summary:
      "You are given a 0-indexed list of integers `nums`. Each element `nums[i]` represents the maximum jump length from that position. You start at index 0 and are guaranteed that you can reach the last index. Return the **minimum number of jumps** needed to reach the **last index**.",
    constraints: [
      "1 ≤ len(nums) ≤ 10,000",
      "0 ≤ nums[i] ≤ 1,000",
      "It is guaranteed that you can reach nums[len(nums) - 1]",
    ],
    pattern: "Greedy BFS level-by-level window",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force checks every possible jump from every index, taking O(n²) time. The greedy BFS window advances [l, r] across the array such that each index is processed exactly once, taking O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only use a few integer variables (`jumps`, `l`, `r`, `farthest`, `i`) with no extra lists or recursion stack.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "while",
        plainEnglishExplanation:
          "A `while condition:` loop repeatedly executes its code block as long as `condition` remains `True`.",
        exampleSnippet:
          "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
        whyWeUseItHere:
          "We keep jumping until our current reachable window `[l, r]` covers or reaches the last index.",
      },
      {
        keywordOrMethod: "range(l, r + 1)",
        plainEnglishExplanation:
          "`range(start, end)` produces numbers up to `end - 1`. Adding `+ 1` to `r` ensures the loop includes `r` itself.",
        exampleSnippet: "for i in range(2, 5):\n    print(i)",
        whyWeUseItHere:
          "We scan every index in our current jump level from `l` to `r` inclusive.",
      },
      {
        keywordOrMethod: ">",
        plainEnglishExplanation:
          "`a > b` evaluates whether `a` is strictly greater than `b`. Here we check if jumping from position `i` reaches beyond our recorded `farthest` index.",
        exampleSnippet:
          "farthest = 4\nreach = 6\nif reach > farthest:\n    farthest = reach\nprint(farthest)",
        whyWeUseItHere:
          "Within the current jump level, we determine the furthest index any position can reach.",
      },
      {
        keywordOrMethod: "+= 1",
        plainEnglishExplanation:
          "Increments an integer variable by 1.",
        exampleSnippet: "jumps = 0\njumps += 1\nprint(jumps)",
        whyWeUseItHere:
          "Each time we advance our reachable window to the next level, we have made one more jump.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [2, 3, 1, 1, 4] },
      pointers: { nums: ["l", "r"] },
      focus: ["jumps", "farthest", "l", "r"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of this like ripples expanding from a stone dropped in water, or levels in a Breadth-First Search (BFS). At jump 0, you can only be at index 0: your window is `[0, 0]`. From that window, you look at every stone you could possibly reach on jump 1, finding the furthest point. That creates your next window `[1, farthest]`. On jump 2, you inspect every stone in this new window to see how much further you can reach on jump 2. Each window expansion represents exactly one additional jump. As soon as the right edge of your window reaches or passes the final index, you know the minimum jump count.",
      edgeCases: [
        "A single element array (e.g., `[0]` or `[1]`): `r` starts at 0 and the last index is 0. The while condition `r < len(nums) - 1` is immediately `False`, returning 0 jumps.",
        "Large initial jump (e.g., `[5, 1, 1, 1, 1, 1]`): the first jump reaches the end immediately, taking only 1 jump.",
        "Array where multiple paths exist: the BFS window naturally explores all reachable stones at jump k before moving to jump k + 1, guaranteeing the minimum.",
      ],
      stepByStepWalkthrough: [
        "Initialize `jumps = 0` to count jumps.",
        "Set `l = 0` and `r = 0` to represent the window of indices reachable in the current number of jumps.",
        "While `r` is less than `len(nums) - 1` (the last index):",
        "Set `farthest = 0`.",
        "Loop `i` from `l` to `r`, updating `farthest = max(farthest, i + nums[i])`.",
        "Update `l = r + 1` and `r = farthest` for the next level.",
        "Increment `jumps += 1`.",
        "Return `jumps`.",
      ],
    },
    hints: {
      conceptual:
        "Think about this as a Breadth-First Search: what is the range of indices you can reach in 1 jump? What about 2 jumps?",
      structural:
        "Maintain a window `[l, r]` initially `[0, 0]`. Use a `while r < len(nums) - 1:` loop. Inside, find the maximum `i + nums[i]` for `i` in `range(l, r + 1)`. Set `l = r + 1`, `r = farthest`, and increment `jumps`.",
    },
    commonMistakes: [
      "Greedily picking the index with the largest value `nums[i]` instead of the index that maximizes `i + nums[i]`. A stone with value 3 at index 4 reaches index 7, which beats a stone with value 4 at index 1 (which only reaches 5).",
      "Looping until `r <= len(nums) - 1` instead of `r < len(nums) - 1`. If `r` is already at the last index, no more jumps are needed.",
      "Using an O(n²) dynamic programming table when a two-pointer BFS window solves it in O(n) time.",
    ],
    starterCode: `def jump(nums: list[int]) -> int:
    # Return the minimum number of jumps to reach the last index.
    # Tip: think of each jump as expanding a window of reachable indices.
    pass
`,
    optimalSolution: `def jump(nums: list[int]) -> int:
    # Total jumps taken
    jumps = 0
    # Current window of reachable indices [l, r]
    l = 0
    r = 0

    # Continue expanding until the right boundary reaches or passes the last index
    while r < len(nums) - 1:
        # Track the furthest index reachable on the next jump
        farthest = 0
        # Scan every position reachable with the current number of jumps
        for i in range(l, r + 1):
            # Update the furthest index reachable from this window
            if i + nums[i] > farthest:
                farthest = i + nums[i]

        # Advance window boundaries to the newly reachable range
        l = r + 1
        r = farthest
        # Increment the jump counter for this level
        jumps += 1

    # Return the minimum number of jumps required to reach the end
    return jumps
`,
    bruteForceSolution: `def jump(nums: list[int]) -> int:
    # Dynamic programming: find the minimum jumps to reach each index
    n = len(nums)
    dp = [float("inf")] * n
    dp[0] = 0

    for i in range(n):
        for step in range(1, nums[i] + 1):
            if i + step < n:
                if dp[i] + 1 < dp[i + step]:
                    dp[i + step] = dp[i] + 1

    return int(dp[-1])
`,
    harness: { kind: "function", entry: "jump" },
    testCases: [
      {
        input: { nums: [2, 3, 1, 1, 4] },
        expected: 2,
        description: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: { nums: [2, 3, 0, 1, 4] },
        expected: 2,
        description: "Jump from index 0 to 1, then 3 steps from index 1 to the end.",
      },
      {
        input: { nums: [1] },
        expected: 0,
        description: "Already at the last index, requiring 0 jumps.",
      },
      { input: { nums: [1, 2] }, expected: 1 },
      { input: { nums: [1, 1, 1, 1] }, expected: 3 },
      { input: { nums: [3, 4, 3, 2, 5, 4, 3] }, expected: 3 },
      {
        input: { nums: [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3] },
        expected: 2,
      },
      {
        input: { nums: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0] },
        expected: 2,
      },
    ],
  },

  // ------------------------------------------------------------------ gas-station
  {
    id: "gas-station",
    summary:
      "There are `n` gas stations arranged along a circular route. You are given two integer lists: `gas[i]` is the fuel available at station `i`, and `cost[i]` is the fuel required to travel from station `i` to the next station `(i + 1)`. Starting with an empty tank, return the **starting station index** from which you can complete one full clockwise circuit, or `-1` if no such station exists. If a solution exists, it is guaranteed to be unique.",
    constraints: [
      "len(gas) == len(cost)",
      "1 ≤ len(gas) ≤ 100,000",
      "0 ≤ gas[i], cost[i] ≤ 10,000",
    ],
    pattern: "Greedy running tank reset",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force simulates driving from every possible starting station, which takes O(n²) time in the worst case. The greedy approach makes a single pass through the stations in O(n) time, using total fuel balance to verify solvability.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a few scalar integer variables are tracked (`curr_tank`, `start_station`, `i`).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "sum()",
        plainEnglishExplanation:
          "`sum(list)` calculates and returns the sum of all elements in the list.",
        exampleSnippet: "nums = [1, 2, 3, 4]\nprint(sum(nums))",
        whyWeUseItHere:
          "If total gas provided is strictly less than total gas required to travel around the entire circle, completing the trip is impossible from any starting point.",
      },
      {
        keywordOrMethod: "range(len())",
        plainEnglishExplanation:
          "Generates integer indices from `0` to `len(gas) - 1` to access corresponding elements of multiple lists at the same position.",
        exampleSnippet:
          "letters = ['a', 'b', 'c']\nfor i in range(len(letters)):\n    print(i, letters[i])",
        whyWeUseItHere:
          "We use index `i` to access both `gas[i]` and `cost[i]` simultaneously.",
      },
      {
        keywordOrMethod: "+=",
        plainEnglishExplanation:
          "Adds the net fuel gained at station `i` (which is `gas[i] - cost[i]`, positive or negative) to our current tank.",
        exampleSnippet: "tank = 0\ntank += 5 - 2\nprint(tank)",
        whyWeUseItHere:
          "Tracks fuel accumulated from the current candidate starting station.",
      },
      {
        keywordOrMethod: "i + 1",
        plainEnglishExplanation:
          "Evaluates the index of the next station. Here `i + 1` designates the next station as the new candidate starting point.",
        exampleSnippet: "curr = 2\nnext_start = curr + 1\nprint(next_start)",
        whyWeUseItHere:
          "If we run out of gas at station `i`, no station from our previous start up to `i` can work, so we try `i + 1` next.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] },
      pointers: { gas: ["i", "start_station"] },
      focus: ["curr_tank", "start_station", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine driving a car around a circular track. First, check if total gas available on the whole circuit is at least total gas needed: `sum(gas) >= sum(cost)`. If not, no matter where you start, you will run dry somewhere, so return `-1`. But if total gas is enough, a valid start is guaranteed! Why? If you start at station A and run out of gas before or at station B, then *no station between A and B could possibly work either* (because starting at A gave you non-negative gas arriving at those intermediate stations, and you still failed). So you can greedily skip all stations up to B and test B + 1 as your next candidate start!",
      edgeCases: [
        "Total gas is less than total cost (e.g. `gas = [2, 3, 4], cost = [3, 4, 3]`): impossible to complete circuit, returns `-1`.",
        "A single station (e.g. `gas = [2], cost = [2]`): you start at station 0, gain 2, spend 2 to return to station 0, returns `0`.",
        "A single station with insufficient gas (e.g. `gas = [2], cost = [3]`): returns `-1`.",
      ],
      stepByStepWalkthrough: [
        "Check if `sum(gas) < sum(cost)`. If so, return `-1` immediately.",
        "Initialize `curr_tank = 0` and `start_station = 0`.",
        "Loop through all stations `i` from `0` to `len(gas) - 1`.",
        "Add `gas[i] - cost[i]` to `curr_tank`.",
        "If `curr_tank < 0`, that means we cannot reach station `i + 1` from `start_station`.",
        "Reset `start_station = i + 1` and reset `curr_tank = 0`.",
        "After checking all stations, return `start_station`.",
      ],
    },
    hints: {
      conceptual:
        "If total gas across all stations is less than total cost, can you ever make the trip? If you run out of gas between station A and station B, could any station between A and B have been a valid start?",
      structural:
        "First check `if sum(gas) < sum(cost): return -1`. Then loop `for i in range(len(gas)):`, maintain `curr_tank += gas[i] - cost[i]`. If `curr_tank < 0`, reset `start_station = i + 1` and `curr_tank = 0`.",
    },
    commonMistakes: [
      "Simulating circular wrap-around inside the loop for every starting station, resulting in an O(n²) solution that times out.",
      "Forgetting the global check `sum(gas) < sum(cost)`: without it, the code might return a start station that cannot actually complete the whole loop.",
      "Resetting `start_station` to `i` instead of `i + 1` when `curr_tank < 0`.",
    ],
    starterCode: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    # Return the starting gas station index that allows completing the circuit.
    # Tip: if total gas is less than total cost, completing the circuit is impossible.
    pass
`,
    optimalSolution: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    # If total gas available is less than total fuel needed, it's impossible
    if sum(gas) < sum(cost):
        return -1

    # Track fuel in our tank from the current candidate start station
    curr_tank = 0
    # Candidate starting station index
    start_station = 0

    # Test each station in order as we drive around the circular route
    for i in range(len(gas)):
        # Gain gas at station i and spend cost to travel to station i + 1
        curr_tank += gas[i] - cost[i]

        # If tank dips below zero, we cannot reach station i + 1 from start_station
        if curr_tank < 0:
            # No station from start_station up to i can work, so try i + 1 next
            start_station = i + 1
            # Reset the tank for the fresh candidate start
            curr_tank = 0

    # Return the validated starting station index
    return start_station
`,
    bruteForceSolution: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    # Try starting at each station and simulate the circular trip
    n = len(gas)

    for start in range(n):
        tank = 0
        possible = True
        for step in range(n):
            station = (start + step) % n
            tank += gas[station] - cost[station]
            if tank < 0:
                possible = False
                break
        if possible:
            return start

    return -1
`,
    harness: { kind: "function", entry: "can_complete_circuit" },
    testCases: [
      {
        input: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] },
        expected: 3,
        description: "Starting at index 3 provides enough fuel to complete the circular journey.",
      },
      {
        input: { gas: [2, 3, 4], cost: [3, 4, 3] },
        expected: -1,
        description: "Total gas (9) is strictly less than total cost (10), so no solution exists.",
      },
      {
        input: { gas: [5, 1, 2, 3, 4], cost: [4, 4, 1, 5, 1] },
        expected: 4,
        description: "Station 4 accumulates sufficient surplus to clear the heavy cost at station 1.",
      },
      { input: { gas: [2], cost: [2] }, expected: 0 },
      { input: { gas: [2], cost: [3] }, expected: -1 },
      { input: { gas: [3, 1, 1], cost: [1, 2, 2] }, expected: 0 },
      { input: { gas: [1, 2, 3, 4, 5], cost: [1, 2, 3, 4, 5] }, expected: 0 },
      { input: { gas: [5, 8, 2, 8], cost: [6, 5, 6, 6] }, expected: 3 },
    ],
  },

  // ------------------------------------------------------------------ hand-of-straights
  {
    id: "hand-of-straights",
    summary:
      "You are given an integer list `hand` where each element represents the value of a card, and an integer `group_size`. Return `True` if you can rearrange all the cards into groups such that each group has size `group_size` and consists of **consecutive cards**, or `False` otherwise.",
    constraints: [
      "1 ≤ len(hand) ≤ 10,000",
      "0 ≤ hand[i] ≤ 1,000,000,000",
      "1 ≤ group_size ≤ len(hand)",
    ],
    pattern: "Frequency map with greedy smallest-first group building",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n log n)",
      explanation:
        "Brute force sorts and repeatedly searches/removes cards with `list.remove()`, which costs O(n) per card for an O(n²) total. The optimal approach counts frequencies with `Counter` in O(n) time, sorts unique keys in O(u log u) time, and consumes consecutive cards in O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The `Counter` dictionary stores counts for at most n unique card values.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "Counter",
        plainEnglishExplanation:
          "A specialized dictionary from `collections` that counts occurrences of each item in a collection. Accessing a missing key returns `0` instead of raising an error.",
        exampleSnippet:
          "from collections import Counter\ncounts = Counter(['a', 'b', 'a'])\nprint(counts['a'])\nprint(counts['c'])",
        whyWeUseItHere:
          "We quickly count how many copies of each card Alice has in her hand.",
      },
      {
        keywordOrMethod: "% (modulo)",
        plainEnglishExplanation:
          "`a % b` computes the remainder when `a` is divided by `b`. If `len(hand) % group_size != 0`, the total number of cards cannot be divided evenly into groups of `group_size`.",
        exampleSnippet: "print(10 % 3)\nprint(9 % 3)",
        whyWeUseItHere:
          "If total cards cannot be divided evenly into groups of `group_size`, it is immediately impossible.",
      },
      {
        keywordOrMethod: "sorted()",
        plainEnglishExplanation:
          "`sorted(dictionary)` returns a new list of all the dictionary's keys arranged in ascending order.",
        exampleSnippet: "d = {5: 'a', 2: 'b', 8: 'c'}\nprint(sorted(d))",
        whyWeUseItHere:
          "We must always start forming consecutive groups from the smallest available card value.",
      },
      {
        keywordOrMethod: "-=",
        plainEnglishExplanation:
          "Subtracts `count` from the frequency recorded for `next_card` in the dictionary.",
        exampleSnippet:
          "from collections import Counter\nc = Counter([1, 1, 2])\nc[1] -= 2\nprint(c[1])",
        whyWeUseItHere:
          "Deducts cards that have been successfully paired into consecutive groups.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { hand: [1, 2, 3, 2, 3, 4], group_size: 3 },
      focus: ["counts", "card", "count", "next_card"],
    },
    intuitiveExplanation: {
      intuition:
        "Suppose you have a pile of numbered cards. Find the smallest card on the table: say it's a 1. Because 1 is the smallest card remaining, it cannot be the middle or end of any consecutive sequence — it MUST be the very start of a group! So if your group size is 3, that card 1 forces you to find a 2 and a 3. If there are two 1s, you must form two groups starting with 1, which requires two 2s and two 3s. Once those groups are formed and removed, you look for the next smallest available card and repeat. If at any point you are missing the consecutive cards you need, it's impossible!",
      edgeCases: [
        "`group_size == 1`: each card forms its own group trivially. Always returns `True`.",
        "`len(hand) % group_size != 0`: impossible to divide cards evenly, immediately returns `False`.",
        "Duplicate cards (e.g. `[1, 1, 2, 2, 3, 3]` with size 3): the two 1s require two 2s and two 3s, which match perfectly into two `[1, 2, 3]` groups.",
      ],
      stepByStepWalkthrough: [
        "Check if `len(hand) % group_size != 0`. If so, return `False`.",
        "Count the frequency of each card value using `counts = Counter(hand)`.",
        "Iterate through the distinct card values in ascending order using `for card in sorted(counts):`.",
        "If `counts[card] > 0`, this card must start `count = counts[card]` groups.",
        "For each offset from `0` to `group_size - 1`, let `next_card = card + offset`.",
        "Check if `counts[next_card] < count`. If there are not enough copies of `next_card`, return `False`.",
        "Otherwise, subtract `count` from `counts[next_card]`.",
        "If all groups are formed without issue, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "What card must the smallest available card belong to? Can it ever be in the middle or end of a group?",
      structural:
        "Use `counts = Counter(hand)`. Sort the unique cards with `sorted(counts)`. For each card where `counts[card] > 0`, loop through `next_card in range(card, card + group_size)` and ensure each has at least `counts[card]` copies before subtracting.",
    },
    commonMistakes: [
      "Forgetting to check `len(hand) % group_size != 0` up front.",
      "Iterating through `hand` instead of `sorted(counts)`: iterating through the raw unsorted list might try to use a larger card as a starting card before its smaller predecessors.",
      "Using `list.remove()` repeatedly on a list: `remove()` is O(n), turning the whole algorithm into an O(n²) timeout.",
    ],
    starterCode: `from collections import Counter

def is_n_straight_hand(hand: list[int], group_size: int) -> bool:
    # Determine if hand can be rearranged into groups of consecutive cards.
    # Tip: the smallest available card must always be the start of a group.
    pass
`,
    optimalSolution: `from collections import Counter

def is_n_straight_hand(hand: list[int], group_size: int) -> bool:
    # If cards cannot be evenly split into groups of group_size, impossible
    if len(hand) % group_size != 0:
        return False

    # Count the frequency of each card
    counts = Counter(hand)

    # Process cards starting from the smallest value
    for card in sorted(counts):
        # Number of remaining copies of the current card
        count = counts[card]
        # If this card has already been fully used in earlier groups, skip it
        if count > 0:
            # Form 'count' groups of consecutive cards starting with 'card'
            for next_card in range(card, card + group_size):
                # If we lack enough copies of the next consecutive card, fail
                if counts[next_card] < count:
                    return False
                # Deduct the used cards from our frequency map
                counts[next_card] -= count

    # All cards were successfully formed into consecutive groups
    return True
`,
    bruteForceSolution: `def is_n_straight_hand(hand: list[int], group_size: int) -> bool:
    # If cards cannot be evenly divided into groups of group_size, return False
    if len(hand) % group_size != 0:
        return False

    # Sort cards in ascending order
    hand.sort()

    # Repeatedly remove consecutive groups starting with the smallest card
    while hand:
        first = hand[0]
        for offset in range(group_size):
            card = first + offset
            if card in hand:
                hand.remove(card)
            else:
                return False

    return True
`,
    harness: { kind: "function", entry: "is_n_straight_hand" },
    testCases: [
      {
        input: { hand: [1, 2, 3, 6, 2, 3, 4, 7, 8], group_size: 3 },
        expected: true,
        description: "Cards can be grouped into [1, 2, 3], [2, 3, 4], and [6, 7, 8].",
      },
      {
        input: { hand: [1, 2, 3, 4, 5], group_size: 4 },
        expected: false,
        description: "5 cards cannot be split into groups of 4.",
      },
      {
        input: { hand: [8, 10, 10, 2, 8, 2, 2, 9, 9, 10], group_size: 5 },
        expected: false,
        description: "Values cannot be formed into consecutive groups of length 5.",
      },
      { input: { hand: [1, 2, 3, 4], group_size: 1 }, expected: true },
      {
        input: { hand: [1, 1, 2, 2, 3, 3], group_size: 3 },
        expected: true,
      },
      {
        input: { hand: [1, 2, 4], group_size: 3 },
        expected: false,
      },
      { input: { hand: [5, 6, 7], group_size: 3 }, expected: true },
      { input: { hand: [1], group_size: 1 }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ merge-triplets-to-form-target-triplet
  {
    id: "merge-triplets-to-form-target-triplet",
    summary:
      "You are given a 2D integer list `triplets`, where each element is a list of three integers `[a, b, c]`, and a 1D target triplet `target = [x, y, z]`. You can merge any two triplets by taking the maximum value at each position: `[max(a1, a2), max(b1, b2), max(c1, c2)]`. You may merge triplets any number of times. Return `True` if it is possible to obtain `target`, or `False` otherwise.",
    constraints: [
      "1 ≤ len(triplets) ≤ 100,000",
      "len(triplets[i]) == 3, len(target) == 3",
      "1 ≤ ai, bi, ci, x, y, z ≤ 1,000",
    ],
    pattern: "Greedy filtering of invalid triplets",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "We iterate through the n triplets in `triplets` once. For each triplet, we perform a fixed 3 comparisons, taking O(1) time per triplet and O(n) time overall.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We store a set `matched` containing at most 3 indices ({0, 1, 2}), which uses constant O(1) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "set()",
        plainEnglishExplanation:
          "Creates an empty set: an unordered collection of unique elements with fast O(1) membership checking and insertion.",
        exampleSnippet: "s = set()\ns.add(1)\ns.add(1)\nprint(s)",
        whyWeUseItHere:
          "We track which target positions (0, 1, or 2) have found a matching value in at least one valid triplet.",
      },
      {
        keywordOrMethod: "continue",
        plainEnglishExplanation:
          "Skips the rest of the current loop iteration and moves immediately to the next item in the loop.",
        exampleSnippet:
          "for i in range(5):\n    if i == 2:\n        continue\n    print(i)",
        whyWeUseItHere:
          "If any component of a triplet exceeds the corresponding target value, that triplet is dangerous and must be ignored.",
      },
      {
        keywordOrMethod: "range(3)",
        plainEnglishExplanation:
          "Generates the integer sequence `0, 1, 2` to index the three positions of a triplet.",
        exampleSnippet:
          "triplet = [10, 20, 30]\nfor idx in range(3):\n    print(idx, triplet[idx])",
        whyWeUseItHere:
          "Checks whether the current triplet matches target at position 0, 1, or 2.",
      },
      {
        keywordOrMethod: "len(set)",
        plainEnglishExplanation:
          "Returns how many unique items are stored in the set.",
        exampleSnippet: "items = {0, 1, 2}\nprint(len(items) == 3)",
        whyWeUseItHere:
          "If `matched` has size 3, all three positions (0, 1, and 2) are satisfied.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: {
        triplets: [
          [2, 5, 3],
          [1, 8, 4],
          [1, 7, 5],
        ],
        target: [2, 7, 5],
      },
      pointers: { triplets: ["i"] },
      focus: ["matched", "t", "i", "target"],
    },
    intuitiveExplanation: {
      intuition:
        "Merging two triplets takes the maximum of each slot. Notice something critical: a maximum can only make a value stay the same or grow larger; it can NEVER make a value shrink! Therefore, if a candidate triplet has ANY number that is strictly larger than the target in that slot (e.g., target is `[2, 7, 5]` but the triplet has `8` in the middle), merging that triplet would permanently ruin the middle slot! We can NEVER use such a triplet. On the other hand, ANY triplet that is less than or equal to the target in all three slots is completely safe to merge. Can we reach `target`? Yes, if and only if among the safe triplets, at least one has `target[0]`, at least one has `target[1]`, and at least one has `target[2]`!",
      edgeCases: [
        "A single triplet equal to target (e.g., `[[1, 2, 3]]` with target `[1, 2, 3]`): matches all 3 positions immediately, returns `True`.",
        "Triplets with components that exceed target: must be filtered out, otherwise they falsely contribute matching values in other slots.",
        "No valid triplets match a specific target component: e.g. target middle is 2, but all valid triplets have middle 1, returns `False`.",
      ],
      stepByStepWalkthrough: [
        "Create an empty set `matched = set()` to record which target indices (0, 1, 2) can be matched.",
        "Loop through each triplet `t` in `triplets`.",
        "Check if `t[0] > target[0] or t[1] > target[1] or t[2] > target[2]`. If so, skip this triplet with `continue`.",
        "For each index `idx` in `0, 1, 2`, if `t[idx] == target[idx]`, add `idx` to `matched`.",
        "If `len(matched) == 3`, all three target slots can be reached, so return `True` early.",
        "After examining all triplets, return `len(matched) == 3`.",
      ],
    },
    hints: {
      conceptual:
        "Because merging takes the largest value in each slot, a number can never decrease. What does that tell you about any triplet that has a value strictly greater than the target in any position?",
      structural:
        "Ignore any triplet where `t[0] > target[0] or t[1] > target[1] or t[2] > target[2]`. For safe triplets, use a set `matched` and add `idx` whenever `t[idx] == target[idx]`. Return `len(matched) == 3`.",
    },
    commonMistakes: [
      "Using triplets that exceed the target in one slot just because they match the target in another slot. Doing so corrupts the exceeded slot.",
      "Trying to simulate all subset merges, which is an exponential O(2ⁿ) combinatorial search.",
      "Forgetting to check all 3 dimensions.",
    ],
    starterCode: `def merge_triplets(triplets: list[list[int]], target: list[int]) -> bool:
    # Determine if you can merge triplets to obtain the target triplet.
    # Tip: any triplet with a value strictly greater than target can never be used.
    pass
`,
    optimalSolution: `def merge_triplets(triplets: list[list[int]], target: list[int]) -> bool:
    # Track which target positions (0, 1, or 2) have been matched by safe triplets
    matched = set()

    # Check each candidate triplet
    for i, t in enumerate(triplets):
        # Skip any triplet that exceeds target at ANY position: merging it would overshoot
        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:
            continue

        # Check which target coordinates this safe triplet satisfies
        for idx in range(3):
            # If this coordinate matches target, record that this position is satisfied
            if t[idx] == target[idx]:
                matched.add(idx)

        # Early exit: if all three target coordinates are matched, we are done
        if len(matched) == 3:
            return True

    # Return True if all three coordinates were matched, False otherwise
    return len(matched) == 3
`,
    bruteForceSolution: `def merge_triplets(triplets: list[list[int]], target: list[int]) -> bool:
    # Merge all safe triplets together by taking the component-wise maximum
    current = [0, 0, 0]

    for t in triplets:
        # A triplet is safe only if none of its components exceed the target
        if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
            current[0] = max(current[0], t[0])
            current[1] = max(current[1], t[1])
            current[2] = max(current[2], t[2])

    return current == target
`,
    harness: { kind: "function", entry: "merge_triplets" },
    testCases: [
      {
        input: {
          triplets: [
            [2, 5, 3],
            [1, 8, 4],
            [1, 7, 5],
          ],
          target: [2, 7, 5],
        },
        expected: true,
        description: "Triplets [2, 5, 3] and [1, 7, 5] merge to produce [max(2,1), max(5,7), max(3,5)] = [2, 7, 5].",
      },
      {
        input: {
          triplets: [
            [3, 4, 5],
            [4, 5, 6],
          ],
          target: [3, 2, 5],
        },
        expected: false,
        description: "No triplet has a middle component of 2.",
      },
      {
        input: {
          triplets: [
            [2, 5, 3],
            [2, 3, 4],
            [1, 2, 5],
            [5, 2, 3],
          ],
          target: [5, 5, 5],
        },
        expected: true,
        description: "Merging [2, 5, 3], [1, 2, 5], and [5, 2, 3] forms [5, 5, 5].",
      },
      { input: { triplets: [[1, 1, 1]], target: [1, 1, 1] }, expected: true },
      { input: { triplets: [[2, 2, 2]], target: [1, 1, 1] }, expected: false },
      {
        input: {
          triplets: [
            [1, 2, 3],
            [3, 2, 1],
          ],
          target: [3, 2, 3],
        },
        expected: true,
      },
      {
        input: {
          triplets: [
            [2, 5, 6],
            [5, 2, 6],
            [5, 6, 2],
          ],
          target: [5, 5, 5],
        },
        expected: false,
      },
      {
        input: {
          triplets: [
            [1, 3, 1],
            [3, 1, 1],
          ],
          target: [3, 3, 1],
        },
        expected: true,
      },
    ],
  },

  // ------------------------------------------------------------------ partition-labels
  {
    id: "partition-labels",
    summary:
      "You are given a string `s`. You want to partition `s` into as many substrings as possible such that each letter appears in **at most one part**. Return a list of integers representing the **size of each partition** in order from left to right.",
    constraints: [
      "1 ≤ len(s) ≤ 500",
      "s consists of lowercase English letters",
    ],
    pattern: "Greedy interval expansion using last occurrences",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force searches for first and last occurrences of every character using string scans taking O(n²) time. The optimal approach records the last occurrence of each character in one pass of length n, then walks the string a second time to cut partitions, taking O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The dictionary `last_index` stores at most 26 entries (one for each lowercase English letter), which is O(1) constant auxiliary space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "{}",
        plainEnglishExplanation:
          "Creates an empty dictionary (hash map) to store key-value pairs.",
        exampleSnippet: "d = {}\nd['a'] = 0\nprint(d)",
        whyWeUseItHere:
          "We record each character's final position in the string: `{char: last_index}`.",
      },
      {
        keywordOrMethod: "enumerate()",
        plainEnglishExplanation:
          "Loops over a string or list, giving both the position `i` (index) and the character `char` at that position.",
        exampleSnippet: "for i, ch in enumerate('cat'):\n    print(i, ch)",
        whyWeUseItHere:
          "We need both the character and its index to find and update its positions.",
      },
      {
        keywordOrMethod: ">",
        plainEnglishExplanation:
          "Expands the current partition's end boundary to encompass the furthest occurrence of any letter seen so far.",
        exampleSnippet:
          "end = 2\npos = 5\nif pos > end:\n    end = pos\nprint(end)",
        whyWeUseItHere:
          "If a letter in the current partition appears later down the string, the partition MUST stretch to at least that position.",
      },
      {
        keywordOrMethod: "list.append()",
        plainEnglishExplanation:
          "Adds a new element to the end of a list. Here `end - start + 1` calculates the number of characters in the partition.",
        exampleSnippet: "res = []\nres.append(5 - 2 + 1)\nprint(res)",
        whyWeUseItHere:
          "Saves the size of the completed partition into our output list.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "abaccd" },
      pointers: { s: ["i", "end"] },
      focus: ["last_index", "end", "start", "i", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine dividing a party guest list into separate dinner tables, with the rule that if Alice appears at table 1, every appearance of Alice must be at table 1. As you read the name tags from left to right, you look up when each guest makes their final appearance. When you encounter 'a', you find out 'a' appears as far as index 8. That means your current table must include everything up to index 8! As you walk toward index 8, you might see 'b' which appears up to index 5 (which is within 8, no problem), or 'c' which appears up to index 11 (which extends your boundary to 11!). The moment your current position catches up to your extended boundary, you have safely contained every guest seen so far, and you can cut a partition!",
      edgeCases: [
        "A single character string (e.g. `'a'`): boundary is 0, cuts immediately at index 0 with length 1: `[1]`.",
        "All unique characters (e.g. `'abc'`): each character is its own partition: `[1, 1, 1]`.",
        "A character that spans almost the entire string (e.g. `'eccbbbbdec'`): 'c' is at index 1 and 9, forcing the entire string into one partition: `[10]`.",
      ],
      stepByStepWalkthrough: [
        "Scan `s` once to record each character's last appearance: `last_index[char] = i`.",
        "Initialize `start = 0`, `end = 0`, and an empty `result` list.",
        "Scan `s` a second time with index `i` and character `char`.",
        "Stretch `end = max(end, last_index[char])` to include `char`'s final occurrence.",
        "If `i == end`, we have reached the furthest point required by all characters in the current segment.",
        "Record the length `end - start + 1` in `result`.",
        "Set `start = i + 1` to begin the next partition.",
        "Return `result`.",
      ],
    },
    hints: {
      conceptual:
        "If a partition contains letter 'a', it must also stretch to wherever 'a' appears for the very last time. Can you precompute where each letter appears last?",
      structural:
        "First build a dictionary `last_index = {char: i for i, char in enumerate(s)}`. Then loop over `s`, maintaining `end = max(end, last_index[char])`. When `i == end`, append `end - start + 1` and update `start = i + 1`.",
    },
    commonMistakes: [
      "Calculating partition length as `end - start` instead of `end - start + 1` (off-by-one error since both indices are inclusive).",
      "Forgetting to update `end` when new characters in the partition have even later final occurrences.",
      "Returning the partition strings themselves instead of their integer lengths.",
    ],
    starterCode: `def partition_labels(s: str) -> list[int]:
    # Partition s so that each letter appears in at most one part.
    # Tip: precompute the last index where each character appears.
    pass
`,
    optimalSolution: `def partition_labels(s: str) -> list[int]:
    # Record the last index where each character appears in s
    last_index = {}
    # Map each unique character to its final index in the string
    for i, char in enumerate(s):
        last_index[char] = i

    # Store the length of each partition
    result = []
    # start marks the beginning index of the current partition
    start = 0
    # end marks the furthest required end index of the current partition
    end = 0

    # Scan through the string to determine where each partition ends
    for i, char in enumerate(s):
        # Stretch the current partition to include the last occurrence of char
        if last_index[char] > end:
            end = last_index[char]

        # Once we reach the end boundary, all characters inside are fully contained
        if i == end:
            # The length of this partition is end - start + 1
            result.append(end - start + 1)
            # Next partition starts at the very next character
            start = i + 1

    # Return the list of partition lengths
    return result
`,
    bruteForceSolution: `def partition_labels(s: str) -> list[int]:
    # Find intervals [first_occurrence, last_occurrence] for all unique characters
    intervals = []
    seen = set()

    for char in s:
        if char not in seen:
            seen.add(char)
            first = s.find(char)
            last = s.rfind(char)
            intervals.append([first, last])

    # Merge overlapping intervals
    merged = [intervals[0]]
    for curr in intervals[1:]:
        prev = merged[-1]
        if curr[0] <= prev[1]:
            prev[1] = max(prev[1], curr[1])
        else:
            merged.append(curr)

    # Return the lengths of the merged intervals
    return [end - start + 1 for start, end in merged]
`,
    harness: { kind: "function", entry: "partition_labels" },
    testCases: [
      {
        input: { s: "ababcbacadefegdehijhklij" },
        expected: [9, 7, 8],
        description: "The partitions are 'ababcbaca' (9), 'defegde' (7), and 'hijhklij' (8).",
      },
      {
        input: { s: "eccbbbbdec" },
        expected: [10],
        description: "Character 'c' appears at index 1 and 9, forcing the entire string into one partition.",
      },
      {
        input: { s: "a" },
        expected: [1],
        description: "A single character produces a partition of length 1.",
      },
      { input: { s: "abc" }, expected: [1, 1, 1] },
      { input: { s: "aba" }, expected: [3] },
      { input: { s: "caedbdedda" }, expected: [1, 9] },
      { input: { s: "abaccd" }, expected: [3, 2, 1] },
      { input: { s: "aaaaa" }, expected: [5] },
    ],
  },

  // ------------------------------------------------------------------ valid-parenthesis-string
  {
    id: "valid-parenthesis-string",
    summary:
      "You are given a string `s` containing only the characters `'('`, `')'`, and `'*'`. Return `True` if `s` is **valid**, or `False` otherwise. A string is valid if any open parenthesis `'('` has a matching close parenthesis `')'`, parentheses are closed in the correct order, and each `'*'` can be treated as `'('`, `')'`, or an empty string `''`.",
    constraints: [
      "1 ≤ len(s) ≤ 100",
      "s[i] is '(', ')', or '*'",
    ],
    pattern: "Greedy range of open parenthesis counts [cmin, cmax]",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force explores three branching possibilities for each '*', resulting in O(3ⁿ) paths or O(n²) with memoization. The greedy approach tracks the minimum and maximum possible open bracket counts in a single pass of length n, taking O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only two integer variables `cmin` and `cmax` are maintained.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "elif",
        plainEnglishExplanation:
          "Short for 'else if'. Runs its block if the preceding `if` condition was `False` and this condition is `True`.",
        exampleSnippet:
          "x = 2\nif x == 1:\n    print('one')\nelif x == 2:\n    print('two')",
        whyWeUseItHere: "Distinguishes between `'('`, `')'`, and `'*'`.",
      },
      {
        keywordOrMethod: "if ... < 0:",
        plainEnglishExplanation:
          "Prevents `cmin` from remaining negative. If `cmin` drops below 0, it resets to 0.",
        exampleSnippet: "val = -3\nif val < 0:\n    val = 0\nprint(val)",
        whyWeUseItHere:
          "An open bracket count cannot be negative; an asterisk cannot act as a closing bracket if there is no open bracket to close.",
      },
      {
        keywordOrMethod: "== 0",
        plainEnglishExplanation:
          "Evaluates whether `cmin` equals 0, returning `True` if so and `False` otherwise.",
        exampleSnippet: "count = 0\nprint(count == 0)",
        whyWeUseItHere:
          "A string is balanced if it is possible to end up with exactly 0 unmatched open brackets.",
      },
      {
        keywordOrMethod: "enumerate()",
        plainEnglishExplanation:
          "Loops over a string yielding both the index `i` and the character `char` at that index.",
        exampleSnippet:
          "for i, ch in enumerate('(*)'):\n    print(i, ch)",
        whyWeUseItHere:
          "We inspect each character in the parenthesis string one by one.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "(*))" },
      pointers: { s: ["i"] },
      focus: ["cmin", "cmax", "char", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Without wildcards, checking parentheses is simple: count open brackets +1 for '(' and -1 for ')'. If the count ever drops below 0, or doesn't end at 0, it's invalid. But with '*', it could be +1, -1, or 0. Instead of tracking every single branching number, notice that all possible valid counts form a continuous range: `[cmin, cmax]`, where `cmin` is the minimum open brackets you could have (treating `*` as ')'), and `cmax` is the maximum open brackets you could have (treating `*` as '('). If `cmax < 0`, even the most generous interpretation has too many closing brackets: return `False`. Whenever `cmin < 0`, reset `cmin = 0` because a `*` wouldn't choose to act as ')' if there's no open bracket to match. At the end, if 0 falls in our range (`cmin == 0`), the string can be completely balanced!",
      edgeCases: [
        "Closing bracket first (e.g. `')('`): `cmax` drops below 0 immediately on the first character, returning `False`.",
        "A lone asterisk (e.g. `'*'`): `cmin` is 0 and `cmax` is 1, so `cmin == 0` returns `True` (acts as empty string).",
        "Unmatched opening bracket (e.g. `'('`): `cmin` ends at 1 != 0, returns `False`.",
      ],
      stepByStepWalkthrough: [
        "Initialize `cmin = 0` and `cmax = 0`.",
        "Loop through each character in `s`.",
        "If `char == '('`: both `cmin` and `cmax` increase by 1.",
        "If `char == ')'`: both `cmin` and `cmax` decrease by 1.",
        "If `char == '*'`: `cmin` decreases by 1 (treating `*` as `')'`), and `cmax` increases by 1 (treating `*` as `'('`).",
        "If `cmax < 0`, return `False` because too many `')'` have appeared.",
        "If `cmin < 0`, reset `cmin = 0` because `*` can just be an empty string rather than creating a negative open count.",
        "After processing all characters, return `cmin == 0`.",
      ],
    },
    hints: {
      conceptual:
        "Instead of tracking all branching possibilities for '*', can you track the minimum and maximum possible number of open brackets currently waiting to be closed?",
      structural:
        "Maintain two integers `cmin = 0` and `cmax = 0`. For '(', both increment. For ')', both decrement. For '*', `cmin -= 1` and `cmax += 1`. If `cmax < 0`, return `False`. If `cmin < 0`, reset `cmin = 0`. Return `cmin == 0`.",
    },
    commonMistakes: [
      "Allowing `cmin` to remain negative: an asterisk should never force an impossible negative count when it could simply act as an empty string.",
      "Using a stack that only stores characters: a simple stack cannot easily handle the three branching choices of '*' without backtracking.",
      "Checking only `cmin <= 0 <= cmax` at the end: since `cmin` is clamped to 0 throughout, the final check is simply `cmin == 0`.",
    ],
    starterCode: `def check_valid_string(s: str) -> bool:
    # Determine if the parenthesis string is valid, where '*' can be '(', ')', or ''.
    # Tip: track the range of possible open parenthesis counts [cmin, cmax].
    pass
`,
    optimalSolution: `def check_valid_string(s: str) -> bool:
    # cmin is the minimum possible number of open brackets waiting to be closed
    cmin = 0
    # cmax is the maximum possible number of open brackets waiting to be closed
    cmax = 0

    # Inspect each character in the string from left to right
    for i, char in enumerate(s):
        if char == "(":
            # An open bracket strictly increases both min and max open counts
            cmin += 1
            cmax += 1
        elif char == ")":
            # A closing bracket strictly decreases both min and max open counts
            cmin -= 1
            cmax -= 1
        else:
            # An asterisk '*' can be ')' (cmin - 1), '(' (cmax + 1), or '' (neutral)
            cmin -= 1
            cmax += 1

        # If cmax < 0, even treating every '*' as '(' cannot match the excess ')'
        if cmax < 0:
            return False

        # cmin cannot drop below 0: an asterisk wouldn't act as ')' if no '(' is open
        if cmin < 0:
            cmin = 0

    # The string is valid if 0 open brackets is within the achievable range
    return cmin == 0
`,
    bruteForceSolution: `def check_valid_string(s: str) -> bool:
    # Explore all three interpretations for '*' using recursion with memoization
    memo = {}

    def dfs(i: int, count: int) -> bool:
        if count < 0:
            return False
        if i == len(s):
            return count == 0
        state = (i, count)
        if state in memo:
            return memo[state]

        char = s[i]
        if char == "(":
            ans = dfs(i + 1, count + 1)
        elif char == ")":
            ans = dfs(i + 1, count - 1)
        else:
            # Try '*' as '(', ')', and empty string ''
            ans = (
                dfs(i + 1, count + 1)
                or dfs(i + 1, count - 1)
                or dfs(i + 1, count)
            )

        memo[state] = ans
        return ans

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "check_valid_string" },
    testCases: [
      {
        input: { s: "()" },
        expected: true,
        description: "A standard matching pair of opening and closing parentheses.",
      },
      {
        input: { s: "(*)" },
        expected: true,
        description: "The asterisk can act as an empty string to balance the parentheses.",
      },
      {
        input: { s: "(*))" },
        expected: true,
        description: "The asterisk acts as an opening parenthesis '(' to balance the extra ')'.",
      },
      { input: { s: ")(" }, expected: false },
      { input: { s: "(" }, expected: false },
      { input: { s: "*" }, expected: true },
      { input: { s: "(((**" }, expected: false },
      { input: { s: "(((*)))" }, expected: true },
      {
        input: { s: "(())((())()()(*)(*()(())())())()()((()())((()))(*" },
        expected: false,
      },
    ],
  },
];

export default problems;
