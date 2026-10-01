import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ climbing-stairs
  {
    id: "climbing-stairs",
    summary:
      "You're at the bottom of a staircase with `n` steps. Each move, you climb either **1 step** or **2 steps**. Count how many different sequences of moves land you exactly on the top step. For example, with 3 steps you could go 1+1+1, 1+2 or 2+1: that's 3 ways.",
    constraints: [
      "1 ≤ n ≤ 45",
      "For n = 45 the answer is about 1.8 billion, so listing the paths one by one is hopeless",
    ],
    pattern: "1-D DP: each answer is the sum of the two before it (Fibonacci-style)",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n)",
      explanation:
        "Plain recursion splits into two calls at every step, so the number of calls roughly doubles each time n grows by 1: about 2ⁿ calls. Adding a memo (the version shown as the brute-force solution) means each step is worked out once, so it drops to O(n). The bottom-up table is also O(n): one loop from 2 to n, and each pass does one addition.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The `dp` list has n + 1 boxes. (Since each box only looks at the two boxes before it, you could keep just two variables instead and get O(1) space, but the full table is easier to see and to debug.)",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def climb_stairs(n: int) -> int:",
        plainEnglishExplanation:
          "`def` creates a function named `climb_stairs` that takes one input, `n`. The `: int` and `-> int` parts are *type hints*: notes for humans saying 'n is a whole number' and 'this gives back a whole number'. Python doesn't enforce them.",
        exampleSnippet: "def double(x: int) -> int:\n    return x * 2\n\nprint(double(21))",
        whyWeUseItHere: "The tests call `climb_stairs(...)` with different values of `n` and compare what you `return` with the expected count.",
      },
      {
        keywordOrMethod: "dp = [0] * (n + 1)",
        plainEnglishExplanation:
          "`[0]` is a list holding one zero. Multiplying a list by a number repeats it, so `[0] * 4` is `[0, 0, 0, 0]`. The brackets around `n + 1` make Python do the addition first.",
        exampleSnippet: "n = 3\nboxes = [0] * (n + 1)\nprint(boxes)\nprint(len(boxes))",
        whyWeUseItHere:
          "We need one box for every step from 0 up to n. That's n + 1 boxes, numbered 0..n, so `dp[n]` exists.",
      },
      {
        keywordOrMethod: "for i in range(2, n + 1):",
        plainEnglishExplanation:
          "`range(start, stop)` counts from `start` up to, but **not including**, `stop`. So `range(2, 6)` gives 2, 3, 4, 5. The loop runs its body once for each of those numbers, with `i` set to the current one.",
        exampleSnippet: "for i in range(2, 6):\n    print(i)",
        whyWeUseItHere:
          "Steps 0 and 1 are filled in by hand, so we start at 2. We write `n + 1` as the stop so that step n itself is included.",
        },
      {
        keywordOrMethod: "dp[i] = dp[i - 1] + dp[i - 2]",
        plainEnglishExplanation:
          "`dp[i]` means 'the box at position i' (positions start at 0). On the right side of `=` it *reads* a box; on the left side it *overwrites* that box with a new value.",
        exampleSnippet: "boxes = [1, 1, 0]\nboxes[2] = boxes[1] + boxes[0]\nprint(boxes)",
        whyWeUseItHere:
          "This one line is the whole recipe: the ways to reach step i are the ways to reach i - 1 plus the ways to reach i - 2.",
      },
      {
        keywordOrMethod: "memo = {} and if i in memo:",
        plainEnglishExplanation:
          "A *memo* is a dictionary used as a notebook of answers you've already worked out. `memo[i] = value` writes an answer down; `i in memo` asks 'have I written this one down already?' (True or False).",
        exampleSnippet: "memo = {}\nmemo[5] = 8\nprint(5 in memo)\nprint(6 in memo)\nprint(memo[5])",
        whyWeUseItHere:
          "This is the middle rung of the ladder (the brute-force tab): the recursive version stays fast because it looks answers up instead of recomputing them.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { n: 8 },
      pointers: { dp: ["i"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Think about your very last move. To stand on step 5, you either took a 1-step from step 4 or a 2-step from step 3. There's no other way to arrive. So the number of ways to reach step 5 is (ways to reach step 4) + (ways to reach step 3). That one sentence is the entire solution; the only question is how to compute it without redoing work. Plain recursion is like a forgetful friend who recounts the same lower steps again and again. Memoization hands that friend a notebook. The bottom-up table goes one better: start at the bottom and fill a row of boxes, step 0, 1, 2, …, where each box is simply the sum of the two boxes before it.",
      edgeCases: [
        "`n = 1`: only one way (a single 1-step). The list has 2 boxes, so we never touch `dp[2]`.",
        "`n = 2`: two ways (1+1 or 2). This is the first box the loop fills.",
        "`n = 45`: the answer is 1,836,311,903. Python integers never overflow, but plain recursion would need billions of calls here.",
      ],
      stepByStepWalkthrough: [
        "**Plain recursion.** Let `ways(i)` be the number of ways to reach step i. Your last move came from i - 1 or i - 2, so `ways(i) = ways(i - 1) + ways(i - 2)`. Base cases: `ways(0) = 1` (stand still) and `ways(1) = 1`.",
        "**Why it repeats work.** `ways(5)` calls `ways(4)` and `ways(3)`. But `ways(4)` *also* calls `ways(3)`, and each of those calls `ways(2)`... The same questions get asked over and over, and the number of calls roughly doubles with each extra step.",
        "**Memoization.** Keep a dictionary `memo`. Before working out `ways(i)`, check whether it's already in `memo`; after working it out, store it. Now each step is solved exactly once: O(n).",
        "**Bottom-up table.** The recursion always needs the small answers first, so skip the recursion and fill them in order. Make `dp = [0] * (n + 1)`, one box per step.",
        "Set the base cases by hand: `dp[0] = 1` and `dp[1] = 1`.",
        "Loop `i` from 2 to n and set `dp[i] = dp[i - 1] + dp[i - 2]`. Each box only needs the two boxes just filled before it.",
        "Return `dp[n]`, the number of ways to reach the top.",
      ],
    },
    hints: {
      conceptual:
        "Don't think about whole paths. Think only about the final move onto step n: where could you have been standing just before it? If you knew how many ways there were to reach those spots, could you combine them?",
      structural:
        "Make a list `dp` of length n + 1 where `dp[i]` = ways to reach step i. Fill `dp[0]` and `dp[1]`, then loop `for i in range(2, n + 1):` and build each box from the two before it.",
    },
    commonMistakes: [
      "Writing the plain recursion `ways(n - 1) + ways(n - 2)` without a memo. It's correct, but it makes about 2ⁿ calls and times out for n = 45.",
      "Making the list too short: `[0] * n` has positions 0..n-1, so `dp[n]` crashes with an IndexError. You need n + 1 boxes.",
      "Writing `range(2, n)`: the stop value is excluded, so step n never gets filled and you return 0.",
      "Setting `dp[0] = 0`: then every box is built from zeros and the answer comes out wrong. There is exactly 1 way to 'reach' the ground: do nothing.",
    ],
    starterCode: `def climb_stairs(n: int) -> int:
    # Count the distinct ways to reach step n using 1-steps and 2-steps.
    # Tip: your last move came from step n - 1 or step n - 2.
    pass
`,
    optimalSolution: `def climb_stairs(n: int) -> int:
    # dp[i] will hold the number of different ways to reach step i.
    # [0] * (n + 1) makes n + 1 zeros: one box for each step 0..n
    dp = [0] * (n + 1)

    # Base case: there is exactly 1 way to "reach" step 0 (stand still)
    dp[0] = 1
    # Base case: there is exactly 1 way to reach step 1 (a single 1-step)
    dp[1] = 1

    # Fill the boxes from the bottom up: step 2, then 3, ..., up to n
    for i in range(2, n + 1):
        # The last move onto step i came from step i - 1 (a 1-step)
        # or from step i - 2 (a 2-step), so add the ways for both
        dp[i] = dp[i - 1] + dp[i - 2]

    # The last box is the number of ways to reach the top
    return dp[n]
`,
    bruteForceSolution: `def climb_stairs(n: int) -> int:
    # Top-down: plain recursion plus a memo (notebook) of finished answers.
    # Delete the two memo lines and it is still correct, but O(2^n) slow.
    memo = {}

    def ways(i):
        # Step 0 and step 1 can each be reached exactly one way
        if i <= 1:
            return 1
        # Already worked this one out? Just look it up
        if i in memo:
            return memo[i]
        # Last move was a 1-step from i - 1 or a 2-step from i - 2
        memo[i] = ways(i - 1) + ways(i - 2)
        return memo[i]

    return ways(n)
`,
    harness: { kind: "function", entry: "climb_stairs" },
    testCases: [
      { input: { n: 2 }, expected: 2, description: "Two single steps (1+1), or one 2-step." },
      { input: { n: 3 }, expected: 3, description: "1+1+1, 1+2 or 2+1. Notice 3 = (ways for 2) + (ways for 1) = 2 + 1." },
      { input: { n: 1 }, expected: 1, description: "Only one move is possible: a single 1-step." },
      { input: { n: 4 }, expected: 5, description: "The table fills in as 1, 1, 2, 3, 5." },
      { input: { n: 5 }, expected: 8 },
      { input: { n: 10 }, expected: 89 },
      { input: { n: 20 }, expected: 10946 },
      { input: { n: 45 }, expected: 1836311903, description: "The largest allowed input. Plain recursion without a memo would need billions of calls." },
    ],
  },

  // ------------------------------------------------------------------ min-cost-climbing-stairs
  {
    id: "min-cost-climbing-stairs",
    summary:
      "Each step `i` of a staircase has a price `cost[i]` that you pay when you **leave** that step. After paying, you climb either 1 or 2 steps. You may start on step 0 or step 1 without paying anything to get there. The top is the spot just past the last step. Return the **cheapest total** you can pay to reach the top.",
    constraints: ["2 ≤ len(cost) ≤ 1000", "0 ≤ cost[i] ≤ 999"],
    pattern: "1-D DP: cheapest way to stand on each step",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n)",
      explanation:
        "Plain recursion asks for both of the two previous steps at every step, so the calls double as n grows: about 2ⁿ. With a memo (the brute-force tab) or the bottom-up table, each of the n + 1 positions is worked out once with one `min` of two numbers, so it's O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The `dp` list holds n + 1 numbers. (Only the last two are ever read, so two variables would do for O(1) space; the table just makes every step visible.)",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "n = len(cost)",
        plainEnglishExplanation: "`len(...)` gives the number of items in a list (or characters in a string).",
        exampleSnippet: "cost = [10, 15, 20]\nprint(len(cost))",
        whyWeUseItHere: "The number of steps tells us where the top is: position `n`, one past the last step (which is at position n - 1).",
      },
      {
        keywordOrMethod: "dp = [0] * (n + 1)",
        plainEnglishExplanation:
          "Multiplying a list by a number repeats it: `[0] * 4` is `[0, 0, 0, 0]`. It's the quick way to make a row of empty boxes.",
        exampleSnippet: "n = 3\nprint([0] * (n + 1))",
        whyWeUseItHere:
          "One box per position 0..n, including the top. Boxes 0 and 1 stay 0 because starting there is free.",
      },
      {
        keywordOrMethod: "for i in range(2, n + 1):",
        plainEnglishExplanation:
          "`range(2, n + 1)` produces 2, 3, …, n. The stop value is never included, which is why we write `n + 1`.",
        exampleSnippet: "for i in range(2, 5):\n    print(i)",
        whyWeUseItHere: "We fill every position from 2 up to and including the top, n.",
      },
      {
        keywordOrMethod: "dp[i - 1] + cost[i - 1]",
        plainEnglishExplanation:
          "Square brackets read one item by its position. Positions start at 0, and you can do arithmetic inside the brackets: `cost[i - 1]` is the item just before position i.",
        exampleSnippet: "cost = [10, 15, 20]\ni = 2\nprint(cost[i - 1])\nprint(cost[i - 2])",
        whyWeUseItHere:
          "To arrive at position i from i - 1 you pay the toll of step i - 1, so the total is (cheapest way to stand on i - 1) + cost[i - 1].",
      },
      {
        keywordOrMethod: "min(a, b)",
        plainEnglishExplanation: "`min` gives back the smallest of the values you hand it.",
        exampleSnippet: "print(min(25, 15))\nprint(min(3, 9, 1))",
        whyWeUseItHere: "Of the two ways to arrive at position i, we keep the cheaper one.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { cost: [1, 100, 1, 1, 100, 1] },
      pointers: { dp: ["i"], cost: ["i"] },
      focus: ["dp", "from_one_below", "from_two_below"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture each step as a toll booth: you pay its toll when you walk off it. To stand on any position i, you must have just walked off step i - 1 (paying `cost[i - 1]`) or step i - 2 (paying `cost[i - 2]`). If you already know the cheapest way to stand on those two steps, the cheapest way to stand on i is simply the smaller of the two options. So write the cheapest totals in a row of boxes from left to right, each box built from the two before it, and the last box (the top) is your answer.",
      edgeCases: [
        "Only two steps, e.g. `[10, 15]`: start on the cheaper one and jump straight to the top, so the answer is `min(cost[0], cost[1])`.",
        "Costs of 0 are allowed: `[0, 0]` costs nothing.",
        "The best route can skip expensive steps entirely: in `[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]` you hop over every 100.",
      ],
      stepByStepWalkthrough: [
        "**Define the question.** Let `cheapest(i)` be the least money spent to *stand on* position i, where position n = len(cost) is the top. Starting is free, so `cheapest(0) = cheapest(1) = 0`.",
        "**Plain recursion.** You arrive at i from i - 1 or i - 2: `cheapest(i) = min(cheapest(i - 1) + cost[i - 1], cheapest(i - 2) + cost[i - 2])`.",
        "**Why it repeats work.** `cheapest(i - 1)` and `cheapest(i - 2)` both end up calling `cheapest(i - 3)`, and so on down. The calls double at every level: about 2ⁿ of them.",
        "**Memoization.** Store each finished `cheapest(i)` in a dictionary and look it up next time. Every position is solved once: O(n).",
        "**Bottom-up table.** Make `dp = [0] * (n + 1)`. Boxes 0 and 1 are already correct (0).",
        "Loop `i` from 2 to n. Compute `from_one_below = dp[i - 1] + cost[i - 1]` and `from_two_below = dp[i - 2] + cost[i - 2]`, then store the smaller one in `dp[i]`.",
        "Return `dp[n]`: the cheapest way to stand at the top.",
      ],
    },
    hints: {
      conceptual:
        "Ask: what is the cheapest way to *stand on* each step? To stand on a step you must have just left one of the two steps below it. Which toll did you pay on the way?",
      structural:
        "Make `dp = [0] * (len(cost) + 1)` (the extra box is the top). Loop `for i in range(2, n + 1):` and set `dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])`. Return `dp[n]`.",
    },
    commonMistakes: [
      "Returning `dp[n - 1]`: that's the last step, not the top. You still have to pay to leave the last step (or jump over it from the one before).",
      "Adding the cost of the step you *arrive* on instead of the step you *leave*. The toll is paid when you step off.",
      "Charging for the start: setting `dp[1] = cost[0]`. You're allowed to begin on step 1 for free.",
    ],
    starterCode: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    # Return the cheapest total cost to get past the last step.
    # Tip: work out the cheapest way to STAND on each step, from the bottom up.
    pass
`,
    optimalSolution: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    # n steps; the "top" is position n, one past the last step
    n = len(cost)

    # dp[i] = cheapest total paid to STAND on position i.
    # dp[0] and dp[1] stay 0: you may start on step 0 or 1 for free.
    dp = [0] * (n + 1)

    # Fill positions 2, 3, ..., n (the top) from the bottom up
    for i in range(2, n + 1):
        # Option 1: walk off step i - 1 (pay its toll) and climb 1
        from_one_below = dp[i - 1] + cost[i - 1]
        # Option 2: walk off step i - 2 (pay its toll) and climb 2
        from_two_below = dp[i - 2] + cost[i - 2]
        # Keep whichever way of arriving is cheaper
        dp[i] = min(from_one_below, from_two_below)

    # The cheapest way to stand at the top
    return dp[n]
`,
    bruteForceSolution: `def min_cost_climbing_stairs(cost: list[int]) -> int:
    # Top-down: plain recursion plus a memo of finished answers.
    # Without the memo it is still correct, but O(2^n) slow.
    n = len(cost)
    memo = {}

    def cheapest(i):
        # Standing on step 0 or step 1 is free
        if i <= 1:
            return 0
        if i in memo:
            return memo[i]
        # Arrive from one below or two below, paying the toll of the step you leave
        memo[i] = min(cheapest(i - 1) + cost[i - 1], cheapest(i - 2) + cost[i - 2])
        return memo[i]

    return cheapest(n)
`,
    harness: { kind: "function", entry: "min_cost_climbing_stairs" },
    testCases: [
      { input: { cost: [10, 15, 20] }, expected: 15, description: "Start on step 1 for free, pay 15, and climb 2 straight to the top." },
      {
        input: { cost: [1, 100, 1, 1, 100, 1] },
        expected: 4,
        description: "Hop along the 1s and jump over every 100: four tolls of 1.",
      },
      { input: { cost: [0, 0] }, expected: 0, description: "Both steps are free, so the whole climb is free." },
      { input: { cost: [5, 10] }, expected: 5 },
      { input: { cost: [10, 5] }, expected: 5 },
      { input: { cost: [1, 1, 1, 1] }, expected: 2 },
      { input: { cost: [0, 1, 2, 2] }, expected: 2 },
      { input: { cost: [1, 2, 3, 4, 5] }, expected: 6 },
      { input: { cost: Array.from({ length: 1000 }, (_, i) => (i * 37 + 11) % 1000) }, expected: 241155 },
    ],
  },

  // ------------------------------------------------------------------ house-robber
  {
    id: "house-robber",
    summary:
      "A row of houses lines a street and `nums[i]` is the cash inside house `i`. You want to collect as much cash as possible, but an alarm goes off if you take from **two houses that are next to each other**. Return the largest total you can collect without setting off the alarm.",
    constraints: ["1 ≤ len(nums) ≤ 100", "0 ≤ nums[i] ≤ 400"],
    pattern: "1-D DP: take this house or skip it",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n)",
      explanation:
        "Plain recursion asks two questions at every house (skip it? take it?), which doubles the calls each time: about 2ⁿ. With a memo (brute-force tab) or the table, each house is solved once with one `max`, so a single pass over n houses: O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation: "The `dp` list has one box per house. (Two variables would be enough, since each box only reads the two before it.)",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "if n == 1:\n    return nums[0]",
        plainEnglishExplanation:
          "`==` asks 'are these equal?'. `return` hands a value back and stops the function immediately, so nothing below it runs. Handling a tiny case first like this is called an *early return*.",
        exampleSnippet: "def first_or_none(items):\n    if len(items) == 0:\n        return None\n    return items[0]\n\nprint(first_or_none([]))\nprint(first_or_none([7, 8]))",
        whyWeUseItHere: "With one house, `nums[1]` doesn't exist, so we answer right away before the code that needs two houses.",
      },
      {
        keywordOrMethod: "dp = [0] * n",
        plainEnglishExplanation: "Repeating a list with `*` makes a row of boxes: `[0] * 3` is `[0, 0, 0]`.",
        exampleSnippet: "nums = [2, 7, 9]\nprint([0] * len(nums))",
        whyWeUseItHere: "One box per house. `dp[i]` will hold the best total using only houses 0..i.",
      },
      {
        keywordOrMethod: "max(skip, take)",
        plainEnglishExplanation: "`max` gives back the largest of the values you pass in.",
        exampleSnippet: "print(max(11, 10))\nprint(max(4, 9, 2))",
        whyWeUseItHere: "At each house we compare 'skip it' against 'take it' and keep the better plan.",
      },
      {
        keywordOrMethod: "for i in range(2, n):",
        plainEnglishExplanation:
          "`range(2, n)` counts 2, 3, …, n - 1 (the stop value is left out). That's exactly the positions of the houses after the first two.",
        exampleSnippet: "for i in range(2, 5):\n    print(i)",
        whyWeUseItHere: "Houses 0 and 1 are filled in by hand; the loop handles every house after them.",
      },
      {
        keywordOrMethod: "return dp[n - 1]",
        plainEnglishExplanation:
          "A list with n items has positions 0 to n - 1, so `dp[n - 1]` is the last box. (Python also lets you write `dp[-1]` for 'the last item'.)",
        exampleSnippet: "dp = [2, 7, 11, 11, 12]\nprint(dp[len(dp) - 1])\nprint(dp[-1])",
        whyWeUseItHere: "The last box is the best total when every house on the street is available.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [2, 7, 9, 3, 1] },
      pointers: { nums: ["i"], dp: ["i"] },
      focus: ["dp", "skip", "take"],
    },
    intuitiveExplanation: {
      intuition:
        "Walk down the street with a scoreboard. At each house you face one choice: take its cash or skip it. If you skip house i, your best is whatever your scoreboard said for house i - 1. If you take it, you must have skipped house i - 1, so your best is this house's cash plus the scoreboard for house i - 2. Write the better of those two numbers on the scoreboard and move on. By the last house, the scoreboard holds the best possible total.",
      edgeCases: [
        "One house: just take it. The code returns before it ever reads `nums[1]`.",
        "Two houses: they're neighbours, so take the richer one.",
        "The best plan can skip two houses in a row: `[2, 1, 1, 2]` is best as 2 + 2 = 4, which 'every other house' would miss.",
        "Houses with 0 cash are fine: `[0, 0, 0]` gives 0.",
      ],
      stepByStepWalkthrough: [
        "**Define the question.** Let `best(i)` be the most cash you can collect from houses 0..i. Before the street starts (i < 0) you have 0.",
        "**Plain recursion.** Either skip house i (`best(i - 1)`) or take it (`nums[i] + best(i - 2)`): `best(i) = max(best(i - 1), best(i - 2) + nums[i])`.",
        "**Why it repeats work.** `best(i - 1)` itself calls `best(i - 2)`, which we're also calling directly, and so on. The same houses are solved again and again: about 2ⁿ calls.",
        "**Memoization.** Store each `best(i)` in a dictionary the first time, then look it up. Each house is solved once: O(n).",
        "**Bottom-up table.** Make `dp = [0] * n`. Set `dp[0] = nums[0]` and `dp[1] = max(nums[0], nums[1])`.",
        "Loop `i` from 2 to n - 1: `skip = dp[i - 1]`, `take = dp[i - 2] + nums[i]`, and `dp[i] = max(skip, take)`.",
        "Return the last box, `dp[n - 1]`.",
      ],
    },
    hints: {
      conceptual:
        "Look at the last house. Either you rob it or you don't. If you don't, what's left is the same problem on a shorter street. If you do, which house is off-limits, and what's left then?",
      structural:
        "Make a list `dp` with one box per house: `dp[i]` = best total from houses 0..i. Fill `dp[0]` and `dp[1]` by hand, then `for i in range(2, n):` compare `dp[i - 1]` with `dp[i - 2] + nums[i]`.",
    },
    commonMistakes: [
      "Taking 'every other house' (all even positions or all odd positions). `[2, 1, 1, 2]` shows the best plan can skip two in a row.",
      "Forgetting the one-house case: `max(nums[0], nums[1])` crashes with an IndexError when there's only one house.",
      "Setting `dp[1] = nums[1]`: if house 0 is richer, the best plan for houses 0..1 is house 0, so it must be `max(nums[0], nums[1])`.",
    ],
    starterCode: `def rob(nums: list[int]) -> int:
    # Return the most cash you can take without robbing two neighbours.
    # Tip: at each house, compare "skip it" with "take it".
    pass
`,
    optimalSolution: `def rob(nums: list[int]) -> int:
    n = len(nums)
    # Only one house: nothing to choose, just take it
    if n == 1:
        return nums[0]

    # dp[i] = most cash we can take from houses 0..i (no two neighbours)
    dp = [0] * n
    # Using only house 0: take it
    dp[0] = nums[0]
    # Houses 0 and 1 are neighbours, so take the richer of the two
    dp[1] = max(nums[0], nums[1])

    for i in range(2, n):
        # Plan A: skip house i, keep the best from houses 0..i - 1
        skip = dp[i - 1]
        # Plan B: take house i, so house i - 1 is off-limits: best of 0..i - 2 plus this cash
        take = dp[i - 2] + nums[i]
        # Write the better plan on the scoreboard
        dp[i] = max(skip, take)

    # The last box covers the whole street
    return dp[n - 1]
`,
    bruteForceSolution: `def rob(nums: list[int]) -> int:
    # Top-down: plain recursion plus a memo of finished answers.
    # Without the memo it is still correct, but O(2^n) slow.
    memo = {}

    def best(i):
        # Before the first house there is nothing to take
        if i < 0:
            return 0
        if i in memo:
            return memo[i]
        # Skip house i, or take it and jump back two houses
        memo[i] = max(best(i - 1), best(i - 2) + nums[i])
        return memo[i]

    return best(len(nums) - 1)
`,
    harness: { kind: "function", entry: "rob" },
    testCases: [
      { input: { nums: [1, 2, 3, 1] }, expected: 4, description: "Take houses 0 and 2: 1 + 3 = 4." },
      { input: { nums: [2, 7, 9, 3, 1] }, expected: 12, description: "Take houses 0, 2 and 4: 2 + 9 + 1 = 12." },
      { input: { nums: [2, 1, 1, 2] }, expected: 4, description: "Take the first and last houses (2 + 2). Skipping two in a row is sometimes best." },
      { input: { nums: [5] }, expected: 5 },
      { input: { nums: [2, 1] }, expected: 2 },
      { input: { nums: [0, 0, 0] }, expected: 0 },
      { input: { nums: [4, 1, 2, 7, 5, 3, 1] }, expected: 14 },
      { input: { nums: Array.from({ length: 100 }, (_, i) => (i * 37) % 401) }, expected: 10569 },
    ],
  },

  // ------------------------------------------------------------------ house-robber-ii
  {
    id: "house-robber-ii",
    summary:
      "Same idea as House Robber, but now the houses stand in a **circle**, so the first house and the last house are neighbours. `nums[i]` is the cash in house `i`, and you still can't take from two neighbouring houses. Return the largest total you can collect.",
    constraints: ["1 ≤ len(nums) ≤ 100", "0 ≤ nums[i] ≤ 1000"],
    pattern: "Run straight-line House Robber twice: once without the first house, once without the last",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n)",
      explanation:
        "Trying every set of houses (or plain recursion without a memo) is about 2ⁿ. The table version runs straight-line House Robber twice, each a single pass over about n houses, so 2 × O(n) = O(n). Making the two slices also costs O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation: "Each helper call builds a `dp` list (and receives a sliced copy of `nums`) of about n items.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "nums[1:] and nums[:-1]",
        plainEnglishExplanation:
          "Slicing makes a new list from part of an old one. `nums[1:]` means 'from position 1 to the end' (everything except the first item). `nums[:-1]` means 'from the start up to, but not including, the last item' (everything except the last). Negative positions count from the end: -1 is the last item.",
        exampleSnippet: "nums = [2, 7, 9, 3, 1]\nprint(nums[1:])\nprint(nums[:-1])",
        whyWeUseItHere: "These are our two straight streets: one without the first house, one without the last.",
      },
      {
        keywordOrMethod: "def rob_line(houses): ... rob_line(nums[1:])",
        plainEnglishExplanation:
          "You can write more than one function in a file. A *helper* function does a smaller job, and another function calls it by name, possibly several times with different inputs.",
        exampleSnippet: "def total(items):\n    return sum(items)\n\ndef bigger_half(items):\n    return max(total(items[:2]), total(items[2:]))\n\nprint(bigger_half([1, 2, 3, 4]))",
        whyWeUseItHere: "`rob_line` is plain House Robber. `rob` calls it twice and keeps the better result, so we don't write the dp loop twice.",
      },
      {
        keywordOrMethod: "dp = [0] * n",
        plainEnglishExplanation: "Repeating a one-item list with `*` makes a row of boxes: `[0] * 3` is `[0, 0, 0]`.",
        exampleSnippet: "houses = [7, 9, 3]\nprint([0] * len(houses))",
        whyWeUseItHere: "`dp[i]` will hold the best total from houses 0..i of the street we were handed.",
      },
      {
        keywordOrMethod: "max(a, b)",
        plainEnglishExplanation: "`max` gives back the largest of the values passed to it.",
        exampleSnippet: "print(max(11, 10))",
        whyWeUseItHere: "Inside the helper it picks 'skip' vs 'take'; in `rob` it picks the better of the two streets.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [2, 7, 9, 3, 1] },
      pointers: { houses: ["i"], dp: ["i"] },
      focus: ["dp", "houses"],
    },
    intuitiveExplanation: {
      intuition:
        "The circle adds exactly one new rule: you can't take from both the first house and the last house. So in any allowed plan, at least one of those two is left alone. That splits the problem into two cases you already know how to solve. Case A: pretend the last house doesn't exist and solve the straight street `nums[:-1]`. Case B: pretend the first house doesn't exist and solve `nums[1:]`. Each case is ordinary House Robber with its own dp scoreboard. The best plan overall is the better of the two.",
      edgeCases: [
        "One house: it has no neighbours, so take it. (Both slices would be empty, so we handle this first.)",
        "Two houses: they're neighbours both ways round, so take the richer one.",
        "The circle can change the answer: `[2, 7, 9, 3, 1]` is 12 in a straight line (2 + 9 + 1) but 11 in a circle, because houses 0 and 4 now touch.",
      ],
      stepByStepWalkthrough: [
        "**Spot the split.** The first and last houses can't both be taken, so every plan skips at least one of them. Answer = max(best without the last house, best without the first house).",
        "**Each half is House Robber.** For a straight street, `best(i) = max(best(i - 1), best(i - 2) + houses[i])`: skip house i, or take it and step back two.",
        "**Why plain recursion is slow, and the fix.** That recursion asks the same `best(j)` questions over and over (about 2ⁿ calls). A memo dictionary solves each once; the bottom-up table does the same in a simple loop.",
        "Write a helper `rob_line(houses)` that fills `dp` left to right: `dp[0] = houses[0]`, `dp[1] = max(houses[0], houses[1])`, then `dp[i] = max(dp[i - 1], dp[i - 2] + houses[i])`.",
        "In `rob`, handle a single house first.",
        "Return `max(rob_line(nums[:-1]), rob_line(nums[1:]))`.",
      ],
    },
    hints: {
      conceptual:
        "The only difference from the straight street is that the first and last houses touch. In any valid plan, at least one of them is untouched. Could you solve two straight-street problems instead of one circular one?",
      structural:
        "Write a helper `rob_line(houses)` that is plain House Robber with a `dp` list. Then return `max(rob_line(nums[1:]), rob_line(nums[:-1]))`, after an `if len(nums) == 1:` early return.",
    },
    commonMistakes: [
      "Running ordinary House Robber on the whole circle: `[2, 3, 2]` would give 4 by taking both 2s, but they're neighbours in the circle.",
      "Forgetting the single-house case: `nums[1:]` and `nums[:-1]` are both empty, so the helper would crash reading `houses[0]`.",
      "Removing both ends in one go (`nums[1:-1]`): that misses every plan that uses the first house or the last house.",
    ],
    starterCode: `def rob(nums: list[int]) -> int:
    # The houses form a circle: the first and last are neighbours.
    # Tip: solve the straight-street version twice, leaving out a different end each time.
    pass
`,
    optimalSolution: `def rob_line(houses: list[int]) -> int:
    # Plain House Robber on a straight street (no circle)
    n = len(houses)
    if n == 1:
        return houses[0]

    # dp[i] = most cash from houses 0..i of this street
    dp = [0] * n
    dp[0] = houses[0]
    # Houses 0 and 1 are neighbours: take the richer one
    dp[1] = max(houses[0], houses[1])

    for i in range(2, n):
        # Skip house i (keep dp[i - 1]) or take it (dp[i - 2] + its cash)
        dp[i] = max(dp[i - 1], dp[i - 2] + houses[i])

    return dp[n - 1]


def rob(nums: list[int]) -> int:
    # A single house has no neighbours at all
    if len(nums) == 1:
        return nums[0]

    # Case A: leave out the LAST house, so the first one is allowed
    without_last = rob_line(nums[:-1])
    # Case B: leave out the FIRST house, so the last one is allowed
    without_first = rob_line(nums[1:])

    # Every valid plan fits one of the two cases: keep the better one
    return max(without_last, without_first)
`,
    bruteForceSolution: `def rob(nums: list[int]) -> int:
    # Top-down: memoized recursion over a range of houses lo..hi.
    n = len(nums)
    if n == 1:
        return nums[0]

    def best_in_range(lo, hi):
        memo = {}

        def best(i):
            # Most cash from houses lo..i
            if i < lo:
                return 0
            if i in memo:
                return memo[i]
            memo[i] = max(best(i - 1), best(i - 2) + nums[i])
            return memo[i]

        return best(hi)

    # Either house 0 is off-limits, or house n - 1 is
    return max(best_in_range(0, n - 2), best_in_range(1, n - 1))
`,
    harness: { kind: "function", entry: "rob" },
    testCases: [
      { input: { nums: [2, 3, 2] }, expected: 3, description: "The two 2s are first and last, so they touch in the circle. Take the 3 instead." },
      { input: { nums: [1, 2, 3, 1] }, expected: 4, description: "Take houses 0 and 2: 1 + 3 = 4. They aren't neighbours." },
      {
        input: { nums: [2, 7, 9, 3, 1] },
        expected: 11,
        description: "A straight street would allow 2 + 9 + 1 = 12, but houses 0 and 4 touch here. Best is 2 + 9 = 11.",
      },
      { input: { nums: [1, 2, 3] }, expected: 3 },
      { input: { nums: [5] }, expected: 5 },
      { input: { nums: [1, 5] }, expected: 5 },
      { input: { nums: [200, 3, 140, 20, 10] }, expected: 340 },
      { input: { nums: [1, 1, 1, 1] }, expected: 2 },
      { input: { nums: Array.from({ length: 100 }, (_, i) => (i * 37 + 7) % 1001) }, expected: 23736 },
    ],
  },

  // ------------------------------------------------------------------ longest-palindromic-substring
  {
    id: "longest-palindromic-substring",
    summary:
      "Given a string `s`, find and return the **longest substring** that reads the same forwards and backwards (a palindrome). If multiple palindromic substrings share the maximum length, returning any one of them is accepted.",
    constraints: [
      "1 ≤ len(s) ≤ 1000",
      "`s` consists of only digits and English letters",
    ],
    pattern: "Expand around center: test odd and even centers",
    timeComplexity: {
      bruteForce: "O(n³)",
      optimal: "O(n²)",
      explanation:
        "There are O(n²) possible substrings, and checking whether each is a palindrome takes O(n), giving O(n³) for the brute force approach. Expanding outward from each of the 2n - 1 possible centers takes O(n) per center in the worst case, giving O(n²) overall.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only pointer variables and the best substring slice are tracked; no auxiliary table or recursion stack is needed.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "s[l + 1:r]",
        plainEnglishExplanation:
          "Slicing `s[start:stop]` extracts the portion of string `s` from index `start` up to, but not including, `stop`.",
        exampleSnippet: "text = 'racecar'\nprint(text[1:6])",
        whyWeUseItHere:
          "When our outward expansion terminates, indices `l` and `r` sit one step past the valid palindrome, so `s[l + 1:r]` extracts the exact matching substring.",
      },
      {
        keywordOrMethod: "while l >= 0 and r < len(s) and s[l] == s[r]:",
        plainEnglishExplanation:
          "A `while` loop continues running as long as all conditions joined by `and` remain `True`. Python checks them left-to-right and stops early if an earlier condition is `False`.",
        exampleSnippet: "s = 'aba'\nl, r = 1, 1\nwhile l >= 0 and r < len(s) and s[l] == s[r]:\n    l -= 1\n    r += 1\nprint(l, r)",
        whyWeUseItHere:
          "We expand outward one character in each direction as long as pointers remain inside string bounds and characters match.",
      },
      {
        keywordOrMethod: "def expand(l: int, r: int) -> str:",
        plainEnglishExplanation:
          "Defines an inner helper function that takes two integer indices and returns a string slice.",
        exampleSnippet: "def greet(name: str) -> str:\n    return 'Hello ' + name\n\nprint(greet('Sam'))",
        whyWeUseItHere:
          "Packaging the expansion logic into a helper lets us check both single-character centers `(i, i)` and two-character centers `(i, i + 1)` without duplicating code.",
      },
      {
        keywordOrMethod: "len(odd) > len(res)",
        plainEnglishExplanation:
          "`len(x)` returns the length of a string or list. The `>` operator checks if the left value is strictly greater than the right value.",
        exampleSnippet: "a = 'bab'\nb = 'a'\nprint(len(a) > len(b))",
        whyWeUseItHere:
          "Whenever an expanded palindrome is longer than our best recorded palindrome, we update our best result.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "babad" },
      pointers: { s: ["l", "r"] },
      focus: ["res"],
    },
    intuitiveExplanation: {
      intuition:
        "Every palindrome mirrors around its center. Instead of testing all possible start and end positions, place your finger on every potential center and spread outward to both sides one step at a time. A palindrome of odd length (like `'aba'`) centers on a single character. A palindrome of even length (like `'abba'`) centers in the seam between two characters. By checking both types of centers at every position, we discover all maximal palindromes.",
      edgeCases: [
        "A single-character string like `'a'`: length is 1, so the only palindrome is `'a'` itself.",
        "The entire string is a palindrome like `'racecar'`: expansion continues until both boundary limits are reached.",
        "All characters distinct like `'abc'`: no multi-character palindrome exists, so any single character is an acceptable answer.",
      ],
      stepByStepWalkthrough: [
        "**Identify all centers.** In a string of length n, there are 2n - 1 possible centers: n single characters and n - 1 seams between adjacent characters.",
        "**Create an expansion helper.** Given starting indices `l` and `r`, step `l` left and `r` right while `s[l] == s[r]` and pointers stay in bounds.",
        "**Extract the palindrome.** When the loop halts, `s[l]` and `s[r]` no longer match, meaning the valid palindrome spans from index `l + 1` to `r - 1`, represented by the slice `s[l + 1:r]`.",
        "**Track the longest.** Compare the extracted slice's length with `len(res)`. If it is longer, save it.",
        "**Repeat for every center.** Loop `i` from `0` to `n - 1`, testing odd center `(i, i)` and even center `(i, i + 1)`.",
        "**Return the result.** When all centers have been evaluated, `res` holds the longest palindrome.",
      ],
    },
    hints: {
      conceptual:
        "A palindrome is symmetric around its center. Can you pick each possible center position and grow outward to find how far the symmetry extends?",
      structural:
        "Loop `for i in range(len(s)):` and call a helper function `expand(l, r)` twice per iteration: once with `expand(i, i)` for odd palindromes and once with `expand(i, i + 1)` for even palindromes. Keep the longest slice.",
    },
    commonMistakes: [
      "Only checking odd-length palindromes (centers at `i, i`) and forgetting even-length palindromes like `'abba'`.",
      "Returning `s[l:r + 1]` after the while loop instead of `s[l + 1:r]`. The while loop stops *after* stepping onto non-matching indices.",
      "Initializing `res` to `None` instead of `\"\"` or the first letter, causing a type error or failing single-letter inputs.",
    ],
    starterCode: `def longest_palindrome(s: str) -> str:
    # Find and return the longest palindromic substring in s.
    # Tip: expand outward from every center (both odd and even).
    pass
`,
    optimalSolution: `def longest_palindrome(s: str) -> str:
    # Track the longest palindromic substring seen so far
    res = ""

    # Helper function that expands outward from center indices l and r
    def expand(l: int, r: int) -> str:
        # Move outward while within string boundaries and characters match
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        # Loop stopped at non-matching indices, so slice from l + 1 to r
        return s[l + 1:r]

    # Every index is a potential center
    for i in range(len(s)):
        # Check odd-length palindromes centered at character i
        odd = expand(i, i)
        if len(odd) > len(res):
            res = odd

        # Check even-length palindromes centered between i and i + 1
        even = expand(i, i + 1)
        if len(even) > len(res):
            res = even

    return res
`,
    bruteForceSolution: `def longest_palindrome(s: str) -> str:
    # Check all substrings from longest to shortest
    n = len(s)
    for length in range(n, 0, -1):
        for start in range(n - length + 1):
            sub = s[start:start + length]
            # Check if reversed string equals original
            if sub == sub[::-1]:
                return sub
    return ""
`,
    harness: { kind: "function", entry: "longest_palindrome", compare: "one-of" },
    testCases: [
      { input: { s: "babad" }, expected: ["bab", "aba"], description: "Both 'bab' and 'aba' are valid longest palindromes of length 3." },
      { input: { s: "cbbd" }, expected: ["bb"], description: "The longest palindromic substring is 'bb' of length 2." },
      { input: { s: "a" }, expected: ["a"], description: "A single character is trivially a palindrome of length 1." },
      { input: { s: "racecar" }, expected: ["racecar"] },
      { input: { s: "noon" }, expected: ["noon"] },
      { input: { s: "ac" }, expected: ["a", "c"] },
      { input: { s: "abacdfgdcaba" }, expected: ["aba"] },
      { input: { s: "aacabdkalg123454321xyz" }, expected: ["123454321"] },
    ],
  },

  // ------------------------------------------------------------------ palindromic-substrings
  {
    id: "palindromic-substrings",
    summary:
      "Given a string `s`, count how many **palindromic substrings** exist within it. Substrings that have the exact same letters but start or end at different indices are counted separately.",
    constraints: [
      "1 ≤ len(s) ≤ 1000",
      "`s` consists of lowercase English letters",
    ],
    pattern: "Expand around center: accumulate matching expansions",
    timeComplexity: {
      bruteForce: "O(n³)",
      optimal: "O(n²)",
      explanation:
        "Testing all O(n²) substrings by reversing them takes O(n) per check, giving O(n³). Expanding outward from each of the 2n - 1 centers takes at most O(n) per center, resulting in O(n²) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation: "Only integer counters and pointers are used during expansion.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "total += count_around(i, i)",
        plainEnglishExplanation:
          "`+=` adds the value on the right to the variable on the left and reassigns it.",
        exampleSnippet: "total = 3\ntotal += 2\nprint(total)",
        whyWeUseItHere:
          "We accumulate the count of palindromes found by expanding from each center into `total`.",
      },
      {
        keywordOrMethod: "while l >= 0 and r < len(s) and s[l] == s[r]:",
        plainEnglishExplanation:
          "A loop that steps pointers left and right as long as both indices stay within bounds and both characters match.",
        exampleSnippet: "s = 'racecar'\nl, r = 3, 3\nmatches = 0\nwhile l >= 0 and r < len(s) and s[l] == s[r]:\n    matches += 1\n    l -= 1\n    r += 1\nprint(matches)",
        whyWeUseItHere:
          "Each time the loop body executes, one new palindromic substring is discovered.",
      },
      {
        keywordOrMethod: "for i in range(len(s)):",
        plainEnglishExplanation:
          "Loops `i` over every valid index of the string `s` from `0` to `len(s) - 1`.",
        exampleSnippet: "for i in range(3):\n    print(i)",
        whyWeUseItHere:
          "Every index serves as a center for an odd-length palindrome and the left half of an even-length palindrome.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "aaa" },
      pointers: { s: ["l", "r"] },
      focus: ["total"],
    },
    intuitiveExplanation: {
      intuition:
        "Every single match during an outward expansion represents a distinct palindromic substring. If `s[l] == s[r]`, then the substring `s[l:r + 1]` is a palindrome. Stepping `l` one step left and `r` one step right checks whether this palindrome can be extended into a larger one. We simply count every successful step from every possible center.",
      edgeCases: [
        "Single letter: only 1 palindromic substring (the letter itself).",
        "All identical letters like `'aaa'`: every possible contiguous slice is a palindrome, giving n*(n + 1)//2 total.",
        "All distinct letters like `'abc'`: only single-character substrings are palindromes, giving exactly len(s).",
      ],
      stepByStepWalkthrough: [
        "**Initialize a counter.** Set `total = 0` to hold the total count of palindromes.",
        "**Define helper.** `count_around(l, r)` begins with `c = 0`. While `l >= 0` and `r < len(s)` and `s[l] == s[r]`, increment `c += 1`, decrement `l -= 1`, and increment `r += 1`.",
        "**Evaluate all centers.** Loop `i` from `0` to `len(s) - 1`.",
        "**Add odd centers.** Add `count_around(i, i)` to `total` (palindromes centered at character `i`).",
        "**Add even centers.** Add `count_around(i, i + 1)` to `total` (palindromes centered between `i` and `i + 1`).",
        "**Return total.** When all centers have been evaluated, return `total`.",
      ],
    },
    hints: {
      conceptual:
        "Instead of extracting all substrings and checking each, count how many palindromes can be centered at each character and between each pair of characters.",
      structural:
        "Create a helper function `count_around(l, r)` that runs a while loop and returns the number of valid expansions. Loop `for i in range(len(s)):` and accumulate counts for both `(i, i)` and `(i, i + 1)`.",
    },
    commonMistakes: [
      "Forgetting even-length centers, missing palindromes like `'bb'` in `'cbbd'`.",
      "Resetting `total` inside the loop instead of accumulating across all centers.",
      "Off-by-one errors when checking boundary conditions in the while loop.",
    ],
    starterCode: `def count_substrings(s: str) -> int:
    # Count the total number of palindromic substrings in s.
    # Tip: expand from each center and increment count whenever characters match.
    pass
`,
    optimalSolution: `def count_substrings(s: str) -> int:
    # Total count of all palindromic substrings
    total = 0

    # Helper function that counts palindromes expanding from l and r
    def count_around(l: int, r: int) -> int:
        c = 0
        # Expand while pointers are valid and characters match
        while l >= 0 and r < len(s) and s[l] == s[r]:
            c += 1
            l -= 1
            r += 1
        return c

    # Check every possible center in the string
    for i in range(len(s)):
        # Odd-length palindromes (single-character center at i)
        total += count_around(i, i)
        # Even-length palindromes (seam center between i and i + 1)
        total += count_around(i, i + 1)

    return total
`,
    bruteForceSolution: `def count_substrings(s: str) -> int:
    # Check all pairs of (i, j) substrings
    total = 0
    n = len(s)
    for i in range(n):
        for j in range(i, n):
            sub = s[i:j + 1]
            if sub == sub[::-1]:
                total += 1
    return total
`,
    harness: { kind: "function", entry: "count_substrings" },
    testCases: [
      { input: { s: "abc" }, expected: 3, description: "Three palindromic substrings: 'a', 'b', and 'c'." },
      { input: { s: "aaa" }, expected: 6, description: "Six palindromic substrings: 'a', 'a', 'a', 'aa', 'aa', and 'aaa'." },
      { input: { s: "a" }, expected: 1, description: "A single character has exactly 1 palindromic substring." },
      { input: { s: "racecar" }, expected: 10 },
      { input: { s: "abccba" }, expected: 9 },
      { input: { s: "fdsklf" }, expected: 6 },
      { input: { s: "xkjkqlxvgx" }, expected: 11 },
    ],
  },

  // ------------------------------------------------------------------ decode-ways
  {
    id: "decode-ways",
    summary:
      "A message containing letters from A-Z is encoded to numbers using `'A' -> 1, 'B' -> 2, ..., 'Z' -> 26`. Given a digit string `s`, count how many different ways it can be decoded into letters. Any digit sequence that contains an invalid number (like `'0'` alone or `'35'`) cannot be decoded.",
    constraints: [
      "1 ≤ len(s) ≤ 100",
      "`s` contains only digits and may contain leading zeroes",
    ],
    pattern: "1-D DP: check 1-digit and 2-digit transitions",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n)",
      explanation:
        "Plain recursion branches into 1-digit and 2-digit choices at each step, doubling the calls. A 1-D DP table calculates the decode ways for each prefix length from 1 to n in a single pass of O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The `dp` list holds n + 1 numbers, one for each prefix length.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "int(s[i - 2:i])",
        plainEnglishExplanation:
          "Slices two characters from string `s` and converts the sliced string into a whole number integer.",
        exampleSnippet: "s = '226'\nprint(int(s[0:2]))\nprint(int(s[1:3]))",
        whyWeUseItHere:
          "We check if the two-digit group before position `i` forms a valid code between 10 and 26.",
      },
      {
        keywordOrMethod: "10 <= two_digit <= 26",
        plainEnglishExplanation:
          "A chained comparison checking whether `two_digit` is at least 10 and at most 26 in a single concise expression.",
        exampleSnippet: "val = 24\nprint(10 <= val <= 26)\nprint(10 <= 35 <= 26)",
        whyWeUseItHere:
          "Letters A through Z map to integers 1 through 26, so a two-digit code is valid only in the range 10..26.",
      },
      {
        keywordOrMethod: "s[i - 1] != '0'",
        plainEnglishExplanation:
          "Checks if the character at position `i - 1` is not the digit character `'0'`.",
        exampleSnippet: "ch = '5'\nprint(ch != '0')",
        whyWeUseItHere:
          "The digit `'0'` alone has no letter mapping, so it cannot be decoded as a single-digit code.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "226" },
      pointers: { dp: ["i"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of this problem like Climbing Stairs, but with rules on when you can take a 1-step or 2-step. At position `i`, your last decoded letter came from either a single digit `s[i - 1]` or a two-digit pair `s[i - 2:i]`. If the single digit is `'1'` through `'9'`, it contributes all ways to decode the prefix before it (`dp[i - 1]`). If the two-digit pair is between 10 and 26, it adds all ways to decode the prefix two steps back (`dp[i - 2]`).",
      edgeCases: [
        "String starting with `'0'`: impossible to decode, immediately returns 0.",
        "Contains an unpairable zero like `'30'` or `'00'`: returns 0 because `'0'` cannot stand alone and cannot pair with `'3'`.",
        "Single valid digit like `'7'`: exactly 1 way.",
      ],
      stepByStepWalkthrough: [
        "**Check leading zero.** If `s[0] == '0'`, the entire message is invalid; return 0 immediately.",
        "**Allocate DP table.** Create `dp = [0] * (n + 1)` where `dp[i]` represents ways to decode the prefix of length `i`.",
        "**Base cases.** `dp[0] = 1` (an empty prefix has 1 way) and `dp[1] = 1` (since `s[0] != '0'`).",
        "**Loop through prefixes.** Iterate `i` from 2 up to `n`.",
        "**Single-digit check.** If `s[i - 1] != '0'`, add `dp[i - 1]` to `dp[i]`.",
        "**Two-digit check.** Let `two_digit = int(s[i - 2:i])`. If `10 <= two_digit <= 26`, add `dp[i - 2]` to `dp[i]`.",
        "**Return final count.** `dp[n]` gives the ways to decode the full string.",
      ],
    },
    hints: {
      conceptual:
        "At each index, how could the current letter have been formed? It was either decoded from the current single digit, or from the current digit combined with the previous digit.",
      structural:
        "Use a list `dp` of size `len(s) + 1`. Loop `for i in range(2, len(s) + 1):` and check if `s[i - 1] != '0'` (add `dp[i - 1]`) and if `10 <= int(s[i - 2:i]) <= 26` (add `dp[i - 2]`).",
    },
    commonMistakes: [
      "Treating `'0'` as a valid single digit: `'0'` does not map to any letter.",
      "Allowing two-digit codes with a leading zero like `'06'`: `int('06')` is 6, but two-digit codes must be between 10 and 26.",
      "Not handling strings with leading `'0'` like `'06'`, which should immediately return 0.",
    ],
    starterCode: `def num_decodings(s: str) -> int:
    # Count the number of ways to decode digit string s into letters A-Z.
    # Tip: check whether the last 1 digit and last 2 digits form valid codes.
    pass
`,
    optimalSolution: `def num_decodings(s: str) -> int:
    # A message starting with '0' cannot be decoded
    if not s or s[0] == "0":
        return 0

    n = len(s)
    # dp[i] = number of ways to decode prefix of length i
    dp = [0] * (n + 1)
    # Base case: empty prefix has 1 way
    dp[0] = 1
    # First digit is not '0', so exactly 1 way
    dp[1] = 1

    for i in range(2, n + 1):
        # Single-digit check: s[i - 1] must be '1'..'9'
        if s[i - 1] != "0":
            dp[i] += dp[i - 1]

        # Two-digit check: s[i-2:i] must be 10..26
        two_digit = int(s[i - 2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i - 2]

    return dp[n]
`,
    bruteForceSolution: `def num_decodings(s: str) -> int:
    memo = {}

    def dfs(i: int) -> int:
        if i == len(s):
            return 1
        if s[i] == "0":
            return 0
        if i in memo:
            return memo[i]

        res = dfs(i + 1)
        if i + 1 < len(s) and (s[i] == "1" or (s[i] == "2" and s[i + 1] in "0123456")):
            res += dfs(i + 2)

        memo[i] = res
        return res

    return dfs(0)
`,
    harness: { kind: "function", entry: "num_decodings" },
    testCases: [
      { input: { s: "12" }, expected: 2, description: "Can be decoded as 'AB' (1, 2) or 'L' (12)." },
      { input: { s: "226" }, expected: 3, description: "Can be decoded as 'BZ' (2, 26), 'VF' (22, 6), or 'BBF' (2, 2, 6)." },
      { input: { s: "06" }, expected: 0, description: "Leading zero cannot be mapped to any letter." },
      { input: { s: "10" }, expected: 1, description: "'10' only maps to 'J'." },
      { input: { s: "27" }, expected: 1, description: "'27' cannot be paired as a 2-digit letter, only 'B' and 'G'." },
      { input: { s: "2101" }, expected: 1 },
      { input: { s: "111111" }, expected: 13 },
      { input: { s: "100" }, expected: 0 },
    ],
  },

  // ------------------------------------------------------------------ coin-change
  {
    id: "coin-change",
    summary:
      "You are given a list of coin denominations `coins` and an integer `amount`. Return the **fewest number of coins** needed to make up that amount. If that amount of money cannot be formed by any combination of the coins, return `-1`. You may assume you have an unlimited supply of each coin denomination.",
    constraints: [
      "1 ≤ len(coins) ≤ 12",
      "1 ≤ coins[i] ≤ 2³¹ - 1",
      "0 ≤ amount ≤ 10⁴",
    ],
    pattern: "1-D DP: fewest coins needed for each amount from 0 to amount",
    timeComplexity: {
      bruteForce: "O(amountⁿ)",
      optimal: "O(amount · len(coins))",
      explanation:
        "Plain recursion tries every coin at each remaining amount, exploring an exponential number of coin sequences. A bottom-up DP table computes the fewest coins for every amount from 1 up to target in O(amount · len(coins)) time.",
    },
    spaceComplexity: {
      optimal: "O(amount)",
      explanation:
        "The `dp` list holds amount + 1 numbers, storing the minimum coins needed for each intermediate amount.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [amount + 1] * (amount + 1)",
        plainEnglishExplanation:
          "Creates a list of length `amount + 1` filled with `amount + 1`. Since the largest possible answer using positive integer coins is `amount` (using all 1-cent coins), `amount + 1` safely represents an 'infinity' or unreachable sentinel value.",
        exampleSnippet: "amount = 5\nprint([amount + 1] * (amount + 1))",
        whyWeUseItHere:
          "Initializes all amounts as impossible before finding smaller combination totals with `min`.",
      },
      {
        keywordOrMethod: "min(dp[a], 1 + dp[a - c])",
        plainEnglishExplanation:
          "Compares the current best answer for amount `a` with using one coin of value `c` plus the best answer for the remaining amount `a - c`.",
        exampleSnippet: "best = 5\nwith_coin = 1 + 2\nprint(min(best, with_coin))",
        whyWeUseItHere:
          "At each amount, we check if taking coin `c` achieves a smaller coin count.",
      },
      {
        keywordOrMethod: "dp[amount] if dp[amount] <= amount else -1",
        plainEnglishExplanation:
          "Python's conditional expression (ternary operator): returns the value before `if` when condition is True, otherwise returns the value after `else`.",
        exampleSnippet: "ans = 7\nlimit = 5\nprint(ans if ans <= limit else -1)",
        whyWeUseItHere:
          "If `dp[amount]` remained untouched at its initial sentinel value, no coin combination could form the amount, so we return -1.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { coins: [1, 2, 5], amount: 11 },
      pointers: { dp: ["a"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine calculating the change needed for every price from 0 cents up to the target amount. For 0 cents, you need 0 coins. For any higher amount `a`, you consider your final coin: if you used a coin of value `c`, you would need 1 coin plus whatever the minimum coins were to make `a - c`. Since you already solved all smaller amounts, you just look up `dp[a - c]` and pick the coin choice that gives the smallest total.",
      edgeCases: [
        "`amount = 0`: requires 0 coins, returns 0.",
        "Impossible amounts like `coins = [2], amount = 3`: `dp[3]` remains at sentinel value, returns -1.",
        "Coin larger than amount: skipped during evaluation since `a - c < 0`.",
      ],
      stepByStepWalkthrough: [
        "**Create the DP array.** Allocate `dp = [amount + 1] * (amount + 1)`. The index represents the amount.",
        "**Base case.** `dp[0] = 0` because zero coins are needed to make amount 0.",
        "**Loop amounts.** For each amount `a` from 1 to `amount`.",
        "**Try each coin.** For each coin `c` in `coins`, if `a - c >= 0`, update `dp[a] = min(dp[a], 1 + dp[a - c])`.",
        "**Check reachability.** After filling the table, check if `dp[amount] <= amount`. If so, return `dp[amount]`; otherwise return -1.",
      ],
    },
    hints: {
      conceptual:
        "What is the fewest coins to make amount 11 if your last coin was 5? It would be 1 + (fewest coins to make 6). If you know the answer for all amounts smaller than 11, you can check every possible last coin.",
      structural:
        "Make `dp = [amount + 1] * (amount + 1)` with `dp[0] = 0`. Outer loop `for a in range(1, amount + 1):`, inner loop `for c in coins:`. Update `dp[a] = min(dp[a], 1 + dp[a - c])` when `a - c >= 0`.",
    },
    commonMistakes: [
      "Greedy coin picking: choosing the largest coin first fails for cases like `coins = [1, 3, 4, 5], amount = 7` (greedy picks 5 + 1 + 1 = 3 coins, while 4 + 3 = 2 coins is optimal).",
      "Using `float('inf')` without converting back to -1 when amount is impossible.",
      "Forgetting to set `dp[0] = 0`, causing every amount to remain infinity.",
    ],
    starterCode: `def coin_change(coins: list[int], amount: int) -> int:
    # Find the fewest number of coins needed to make amount.
    # Tip: compute the minimum coins needed for every amount from 1 up to amount.
    pass
`,
    optimalSolution: `def coin_change(coins: list[int], amount: int) -> int:
    # dp[a] = minimum coins needed to make amount a.
    # Initialize with amount + 1 as an "infinity" sentinel value
    dp = [amount + 1] * (amount + 1)
    # 0 coins needed to make amount 0
    dp[0] = 0

    # Solve for each amount from 1 up to target amount
    for a in range(1, amount + 1):
        for c in coins:
            # If coin value fits inside amount a
            if a - c >= 0:
                # 1 coin of value c plus the best way to make the remainder
                dp[a] = min(dp[a], 1 + dp[a - c])

    # If dp[amount] was never improved, amount is impossible
    return dp[amount] if dp[amount] <= amount else -1
`,
    bruteForceSolution: `def coin_change(coins: list[int], amount: int) -> int:
    memo = {}

    def dfs(rem: int) -> int:
        if rem == 0:
            return 0
        if rem < 0:
            return float("inf")
        if rem in memo:
            return memo[rem]

        min_coins = float("inf")
        for c in coins:
            min_coins = min(min_coins, 1 + dfs(rem - c))

        memo[rem] = min_coins
        return min_coins

    res = dfs(amount)
    return res if res != float("inf") else -1
`,
    harness: { kind: "function", entry: "coin_change" },
    testCases: [
      { input: { coins: [1, 2, 5], amount: 11 }, expected: 3, description: "5 + 5 + 1 = 11: 3 coins." },
      { input: { coins: [2], amount: 3 }, expected: -1, description: "Cannot form odd amount 3 with only 2-coins." },
      { input: { coins: [1], amount: 0 }, expected: 0, description: "Amount 0 requires 0 coins." },
      { input: { coins: [1], amount: 2 }, expected: 2 },
      { input: { coins: [2, 5, 10, 1], amount: 27 }, expected: 4 },
      { input: { coins: [186, 419, 83, 408], amount: 6249 }, expected: 20 },
      { input: { coins: [1, 3, 4, 5], amount: 7 }, expected: 2, description: "3 + 4 = 7: 2 coins (greedy would choose 5 + 1 + 1 = 3 coins)." },
    ],
  },

  // ------------------------------------------------------------------ maximum-product-subarray
  {
    id: "maximum-product-subarray",
    summary:
      "Given an integer list `nums`, find a contiguous non-empty subarray that has the **largest product**, and return that product. Keep in mind that multiplying two negative numbers creates a positive product.",
    constraints: [
      "1 ≤ len(nums) ≤ 2 · 10⁴",
      "-10 ≤ nums[i] ≤ 10",
      "The product of any prefix or suffix fits in a 32-bit integer",
    ],
    pattern: "Track both running minimum and maximum products",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Checking products for all pairs of subarray boundaries takes O(n²). Tracking the current minimum and maximum products ending at each index requires only a single pass of O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a few scalar variables (`res`, `cur_max`, `cur_min`, and `temp`) are stored in memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "max(n, temp, cur_min * n)",
        plainEnglishExplanation:
          "`max` accepts multiple comma-separated arguments and returns the single largest value among them.",
        exampleSnippet: "print(max(-2, -6, 12))",
        whyWeUseItHere:
          "The new maximum product ending at `n` could start fresh with `n`, continue from `cur_max * n`, or flip sign from `cur_min * n`.",
      },
      {
        keywordOrMethod: "temp = cur_max * n",
        plainEnglishExplanation:
          "Temporarily saves a computed product in a variable so that updating `cur_max` doesn't overwrite the value before calculating `cur_min`.",
        exampleSnippet: "a = 2\nb = 3\ntemp = a * 10\na = temp\nb = b + temp\nprint(a, b)",
        whyWeUseItHere:
          "Both `cur_max` and `cur_min` need the previous `cur_max`, so we must save the product before overwriting `cur_max`.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [2, 3, -2, 4] },
      pointers: { nums: ["i"] },
      focus: ["cur_max", "cur_min", "res"],
    },
    intuitiveExplanation: {
      intuition:
        "Unlike maximum subarray sum where negative numbers always hurt, with multiplication a negative number can turn a tiny negative product into a huge positive product! Therefore, a very small (negative) product is just as valuable as a large positive product: one more negative number flips it into a huge maximum. By tracking both the running maximum and running minimum ending at each position, we never miss a sign flip.",
      edgeCases: [
        "Array with a single negative number like `[-2]`: the only contiguous subarray is `[-2]`, answer is -2.",
        "Array containing zeros like `[-2, 0, -1]`: zero resets the product sequence, answer is 0.",
        "Even count of negatives like `[-2, 3, -4]`: negative times negative yields positive 24.",
      ],
      stepByStepWalkthrough: [
        "**Initialize tracking.** Set `res = nums[0]`, `cur_max = 1`, and `cur_min = 1`.",
        "**Iterate through numbers.** For each number `n` in `nums`.",
        "**Compute candidate products.** Save `temp = cur_max * n`.",
        "**Update cur_max.** `cur_max = max(n, temp, cur_min * n)`. This handles starting fresh at `n`, extending a positive streak, or multiplying two negatives.",
        "**Update cur_min.** `cur_min = min(n, temp, cur_min * n)`. This tracks the most negative product ready to be flipped.",
        "**Update overall maximum.** `res = max(res, cur_max)`.",
        "**Return answer.** Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "If you encounter a negative number, your current minimum product (if negative) could suddenly become your new maximum product. How can you prepare for that?",
      structural:
        "Maintain `cur_max` and `cur_min` initialized to 1. In a single loop over `nums`, compute `temp = cur_max * n`, then update `cur_max = max(n, temp, cur_min * n)` and `cur_min = min(n, temp, cur_min * n)`. Update `res` with `max(res, cur_max)`.",
    },
    commonMistakes: [
      "Only tracking `cur_max` like Kadane's algorithm for sum: fails whenever a negative number multiplies an earlier negative product.",
      "Overwriting `cur_max` before computing `cur_min`: causes `cur_min` to use the updated `cur_max` rather than the previous step's value.",
      "Initializing `res = 0`: fails if all numbers in the array are negative (e.g. `[-2]` would incorrectly return 0).",
    ],
    starterCode: `def max_product(nums: list[int]) -> int:
    # Find the contiguous subarray with the largest product.
    # Tip: maintain both current max and current min because multiplying by negative flips signs.
    pass
`,
    optimalSolution: `def max_product(nums: list[int]) -> int:
    # Initialize overall max with the first element
    res = nums[0]
    # Running max and min products ending at the current element
    cur_max = 1
    cur_min = 1

    for i, n in enumerate(nums):
        # Save old cur_max * n before cur_max is overwritten
        temp = cur_max * n
        # New max can be n alone, old max * n, or old min * n (sign flip)
        cur_max = max(n, temp, cur_min * n)
        # New min can also come from any of the three choices
        cur_min = min(n, temp, cur_min * n)
        # Record the highest product seen anywhere
        res = max(res, cur_max)

    return res
`,
    bruteForceSolution: `def max_product(nums: list[int]) -> int:
    res = nums[0]
    n = len(nums)
    for i in range(n):
        cur = 1
        for j in range(i, n):
            cur *= nums[j]
            res = max(res, cur)
    return res
`,
    harness: { kind: "function", entry: "max_product" },
    testCases: [
      { input: { nums: [2, 3, -2, 4] }, expected: 6, description: "[2, 3] gives the maximum product 6." },
      { input: { nums: [-2, 0, -1] }, expected: 0, description: "The largest product is 0, since -2 and -1 are separated by 0." },
      { input: { nums: [-2, 3, -4] }, expected: 24, description: "Multiplying -2 * 3 * -4 gives positive 24." },
      { input: { nums: [-2] }, expected: -2, description: "Single negative element is its own maximum." },
      { input: { nums: [0, 2] }, expected: 2 },
      { input: { nums: [-4, -3, -2] }, expected: 12 },
      { input: { nums: [2, -5, -2, -4, 3] }, expected: 24 },
    ],
  },

  // ------------------------------------------------------------------ word-break
  {
    id: "word-break",
    summary:
      "Given a string `s` and a dictionary of strings `word_dict`, return `True` if `s` can be segmented into a space-separated sequence of one or more dictionary words. You may reuse words from `word_dict` as many times as desired.",
    constraints: [
      "1 ≤ len(s) ≤ 300",
      "1 ≤ len(word_dict) ≤ 1000",
      "1 ≤ len(word_dict[i]) ≤ 20",
      "All characters in `s` and `word_dict` are lowercase English letters",
    ],
    pattern: "1-D DP: determine if suffix s[i:] can be segmented",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n · m · k)",
      explanation:
        "Where n is len(s), m is len(word_dict), and k is average word length. Checking all partitionings recursively takes exponential O(2ⁿ) time. 1-D DP evaluates each starting index i against each word in the dictionary with an O(k) slice comparison, taking O(n · m · k) time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The `dp` list holds n + 1 boolean values, one for each suffix starting index.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [False] * (n + 1)",
        plainEnglishExplanation:
          "Creates a list of boolean values with length `n + 1`, initialized to `False`.",
        exampleSnippet: "print([False] * 4)",
        whyWeUseItHere:
          "`dp[i]` tracks whether the suffix starting at index `i` can be completely matched by words.",
      },
      {
        keywordOrMethod: "s[i:i + len(w)] == w",
        plainEnglishExplanation:
          "Extracts a slice of string `s` starting at index `i` with length equal to word `w` and checks if it matches `w` exactly.",
        exampleSnippet: "s = 'leetcode'\nw = 'leet'\nprint(s[0:0 + len(w)] == w)",
        whyWeUseItHere:
          "Checks if word `w` matches the beginning of suffix `s[i:]`.",
      },
      {
        keywordOrMethod: "break",
        plainEnglishExplanation:
          "Immediately exits the innermost loop.",
        exampleSnippet: "for x in [1, 2, 3]:\n    if x == 2:\n        break\n    print(x)",
        whyWeUseItHere:
          "Once any dictionary word successfully segments suffix `s[i:]`, we mark `dp[i] = True` and don't need to test other words at index `i`.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "leetcode", word_dict: ["leet", "code"] },
      pointers: { dp: ["i"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Work backwards from the end of the string. Suppose you want to know if `s[i:]` can be broken into words. Try every dictionary word: if word `w` matches the start of `s[i:]`, then the problem reduces to whether the remaining suffix `s[i + len(w):]` can be segmented. If that remainder was already confirmed `True`, then `s[i:]` is also `True`! Working from the end back to index 0 ensures the remainder's answer is always known when we need it.",
      edgeCases: [
        "Words that overlap or have common prefixes like `['leet', 'code', 'leetc']`: testing all words at each position ensures the right choice is found.",
        "Word cannot be formed without leaving extra characters like `'catsandog'`: returns `False`.",
        "Single-letter word matching single-letter string: returns `True`.",
      ],
      stepByStepWalkthrough: [
        "**Allocate DP table.** Create `dp = [False] * (n + 1)` where `n = len(s)`.",
        "**Base case.** Set `dp[n] = True`. An empty suffix requires zero words, so it is always valid.",
        "**Iterate backwards.** Loop `i` from `n - 1` down to `0`.",
        "**Match words.** For each word `w` in `word_dict`: check if `i + len(w) <= n` and `s[i:i + len(w)] == w`.",
        "**Verify remainder.** If the word matches and `dp[i + len(w)]` is `True`, mark `dp[i] = True` and break.",
        "**Return answer.** Return `dp[0]`, which indicates whether the entire string `s[0:]` can be segmented.",
      ],
    },
    hints: {
      conceptual:
        "If a word matches the beginning of string s, what question are you left with? You need to know if the rest of the string can be segmented.",
      structural:
        "Create boolean array `dp` of size `len(s) + 1` with `dp[len(s)] = True`. Loop `i` backwards from `len(s) - 1` to 0. For each word `w`, if `s[i:i + len(w)] == w` and `dp[i + len(w)]` is True, set `dp[i] = True` and break.",
    },
    commonMistakes: [
      "Greedy matching: choosing the first matching word can trap the algorithm if a shorter/longer word was required for the rest to work.",
      "Out of bounds slicing: checking `s[i:i + len(w)] == w` without verifying `i + len(w) <= len(s)`.",
      "Setting `dp[len(s)] = False`: without the empty string base case as `True`, all entries remain `False`.",
    ],
    starterCode: `def word_break(s: str, word_dict: list[str]) -> bool:
    # Determine if s can be segmented into words from word_dict.
    # Tip: dp[i] indicates whether suffix s[i:] can be segmented.
    pass
`,
    optimalSolution: `def word_break(s: str, word_dict: list[str]) -> bool:
    n = len(s)
    # dp[i] = True if suffix s[i:] can be segmented into dictionary words
    dp = [False] * (n + 1)
    # Base case: empty suffix is always valid (requires 0 words)
    dp[n] = True

    # Work backwards from the end of the string to the beginning
    for i in range(n - 1, -1, -1):
        for w in word_dict:
            # Check if word w fits and matches the characters starting at index i
            if i + len(w) <= n and s[i:i + len(w)] == w:
                # If the remainder after word w can be formed, then s[i:] can too
                if dp[i + len(w)]:
                    dp[i] = True
                    break

    # dp[0] tells if the full string s[0:] can be segmented
    return dp[0]
`,
    bruteForceSolution: `def word_break(s: str, word_dict: list[str]) -> bool:
    words = set(word_dict)
    memo = {}

    def dfs(i: int) -> bool:
        if i == len(s):
            return True
        if i in memo:
            return memo[i]

        for j in range(i + 1, len(s) + 1):
            if s[i:j] in words and dfs(j):
                memo[i] = True
                return True

        memo[i] = False
        return False

    return dfs(0)
`,
    harness: { kind: "function", entry: "word_break" },
    testCases: [
      { input: { s: "leetcode", word_dict: ["leet", "code"] }, expected: true, description: "'leetcode' can be split into 'leet' and 'code'." },
      { input: { s: "applepenapple", word_dict: ["apple", "pen"] }, expected: true, description: "Can reuse 'apple': 'apple' + 'pen' + 'apple'." },
      { input: { s: "catsandog", word_dict: ["cats", "dog", "sand", "and", "cat"] }, expected: false, description: "No valid combination segments the entire string." },
      { input: { s: "a", word_dict: ["a"] }, expected: true },
      { input: { s: "a", word_dict: ["b"] }, expected: false },
      { input: { s: "bb", word_dict: ["a", "b", "bbb", "bbbb"] }, expected: true },
      { input: { s: "goalspecial", word_dict: ["go", "goal", "goals", "special"] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ longest-increasing-subsequence
  {
    id: "longest-increasing-subsequence",
    summary:
      "Given an integer list `nums`, return the length of the **longest strictly increasing subsequence**. A subsequence is derived by deleting some or no elements without changing the order of the remaining elements.",
    constraints: [
      "1 ≤ len(nums) ≤ 2500",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
    ],
    pattern: "1-D DP: length of LIS starting or ending at each index",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n²)",
      explanation:
        "There are 2ⁿ possible subsequences. With 1-D DP, each element compares against all elements after it, using nested loops of length n: n · (n - 1) / 2 comparisons, which is O(n²).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The `dp` list holds n integers, storing the LIS length starting at each index.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [1] * n",
        plainEnglishExplanation:
          "Creates a list of ones of length `n`. Every single element by itself forms an increasing subsequence of length 1.",
        exampleSnippet: "print([1] * 5)",
        whyWeUseItHere:
          "Initializes the minimum possible LIS length for every starting position.",
      },
      {
        keywordOrMethod: "for j in range(i + 1, n):",
        plainEnglishExplanation:
          "Iterates `j` over all indices that appear strictly after index `i`.",
        exampleSnippet: "for j in range(3, 6):\n    print(j)",
        whyWeUseItHere:
          "A subsequence must preserve original order, so elements that follow `nums[i]` must have index `j > i`.",
      },
      {
        keywordOrMethod: "max(dp)",
        plainEnglishExplanation:
          "`max(iterable)` returns the single largest value in a list or collection.",
        exampleSnippet: "scores = [1, 4, 2, 3]\nprint(max(scores))",
        whyWeUseItHere:
          "Finds the maximum LIS length across all possible starting positions.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
      pointers: { nums: ["i", "j"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of each number as a stepping stone. If you stand on stone `i`, you want to know the longest chain of increasingly higher stones you can hop across. You look at every stone `j` to your right: if stone `j` is taller than stone `i` (`nums[j] > nums[i]`), you could hop to stone `j` and then continue with stone `j`'s best chain (`1 + dp[j]`). By checking every stone behind you from right to left, you build the answer for each stone.",
      edgeCases: [
        "All elements identical like `[7, 7, 7]`: strictly increasing requires each step to be strictly greater, so the answer is 1.",
        "Already strictly increasing like `[1, 2, 3, 4]`: every element can be taken, answer is len(nums).",
        "Strictly decreasing like `[5, 4, 3, 2, 1]`: no two elements can be paired, answer is 1.",
      ],
      stepByStepWalkthrough: [
        "**Initialize DP array.** Create `dp = [1] * n`. Each element alone is an increasing subsequence of length 1.",
        "**Iterate backwards.** Loop `i` from `n - 1` down to `0`.",
        "**Compare with successors.** Loop `j` from `i + 1` up to `n - 1`.",
        "**Update chain length.** If `nums[i] < nums[j]`, update `dp[i] = max(dp[i], 1 + dp[j])`.",
        "**Find overall maximum.** Return `max(dp)`.",
      ],
    },
    hints: {
      conceptual:
        "If you decide to start a subsequence at nums[i], which elements could be the next number in that subsequence? Any number after index i that is strictly larger than nums[i].",
      structural:
        "Initialize `dp = [1] * len(nums)`. Use nested loops: outer `for i in range(len(nums) - 1, -1, -1):`, inner `for j in range(i + 1, len(nums)):`. If `nums[i] < nums[j]`, set `dp[i] = max(dp[i], 1 + dp[j])`. Return `max(dp)`.",
    },
    commonMistakes: [
      "Using `<=` instead of `<`: the problem requires *strictly* increasing subsequences, so duplicates cannot be chained.",
      "Returning `dp[0]` instead of `max(dp)`: the longest increasing subsequence does not necessarily start at index 0.",
      "Confusing subsequence with contiguous subarray: elements do not need to be adjacent in the original array.",
    ],
    starterCode: `def length_of_lis(nums: list[int]) -> int:
    # Find the length of the longest strictly increasing subsequence in nums.
    # Tip: dp[i] can store the LIS length starting at index i.
    pass
`,
    optimalSolution: `def length_of_lis(nums: list[int]) -> int:
    n = len(nums)
    # dp[i] = length of LIS starting at index i (each element alone is length 1)
    dp = [1] * n

    # Fill backwards from the last element to the first
    for i in range(n - 1, -1, -1):
        for j in range(i + 1, n):
            # If nums[j] is strictly greater, it can directly follow nums[i]
            if nums[i] < nums[j]:
                dp[i] = max(dp[i], 1 + dp[j])

    # The overall LIS could start at any index
    return max(dp)
`,
    bruteForceSolution: `def length_of_lis(nums: list[int]) -> int:
    memo = {}

    def dfs(i: int, prev_val: int) -> int:
        if i == len(nums):
            return 0
        state = (i, prev_val)
        if state in memo:
            return memo[state]

        # Option 1: skip nums[i]
        res = dfs(i + 1, prev_val)
        # Option 2: include nums[i] if strictly increasing
        if nums[i] > prev_val:
            res = max(res, 1 + dfs(i + 1, nums[i]))

        memo[state] = res
        return res

    return dfs(0, float("-inf"))
`,
    harness: { kind: "function", entry: "length_of_lis" },
    testCases: [
      { input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expected: 4, description: "The longest increasing subsequence is [2, 3, 7, 101] or [2, 5, 7, 18], length 4." },
      { input: { nums: [0, 1, 0, 3, 2, 3] }, expected: 4, description: "Subsequence [0, 1, 2, 3] has length 4." },
      { input: { nums: [7, 7, 7, 7, 7] }, expected: 1, description: "Strictly increasing requires strictly larger elements, so length is 1." },
      { input: { nums: [1] }, expected: 1 },
      { input: { nums: [1, 2, 3, 4, 5] }, expected: 5 },
      { input: { nums: [5, 4, 3, 2, 1] }, expected: 1 },
      { input: { nums: [4, 10, 4, 3, 8, 9] }, expected: 3 },
    ],
  },

  // ------------------------------------------------------------------ partition-equal-subset-sum
  {
    id: "partition-equal-subset-sum",
    summary:
      "Given an integer list `nums`, determine if it can be partitioned into two subsets such that the sum of elements in both subsets is **equal**.",
    constraints: [
      "1 ≤ len(nums) ≤ 200",
      "1 ≤ nums[i] ≤ 100",
    ],
    pattern: "1-D DP: 0/1 knapsack targeting subset sum total // 2",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n · target)",
      explanation:
        "Where target = sum(nums) // 2. Plain recursion checks all 2ⁿ subsets. 0/1 knapsack DP iterates through each number and updates reachable sums up to target in O(n · target) time.",
    },
    spaceComplexity: {
      optimal: "O(target)",
      explanation:
        "A boolean list `dp` of size target + 1 tracks which subset sums are achievable.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "total % 2 != 0",
        plainEnglishExplanation:
          "`%` is the modulo operator (remainder after division). If `total % 2 != 0`, `total` is an odd number.",
        exampleSnippet: "print(11 % 2 != 0)\nprint(12 % 2 != 0)",
        whyWeUseItHere:
          "Two subsets of integers with equal sum must sum to an even total. If the total sum is odd, equal partition is impossible.",
      },
      {
        keywordOrMethod: "range(target, num - 1, -1)",
        plainEnglishExplanation:
          "`range(start, stop, step)` counting backwards by -1 from `target` down to `num`.",
        exampleSnippet: "for j in range(5, 1, -1):\n    print(j)",
        whyWeUseItHere:
          "Iterating backwards prevents using the same number more than once when computing achievable subset sums.",
      },
      {
        keywordOrMethod: "dp[j] = dp[j] or dp[j - num]",
        plainEnglishExplanation:
          "`or` evaluates to `True` if either operand is `True`. If sum `j` was already achievable, or if `j - num` was achievable before taking `num`, then sum `j` is achievable.",
        exampleSnippet: "a = False\nb = True\nprint(a or b)",
        whyWeUseItHere:
          "Updates whether sum `j` can be formed using the numbers seen so far.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [1, 5, 11, 5] },
      pointers: { dp: ["j"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "If you can split the array into two subsets with equal sum, each subset must sum to exactly half of the total sum (`sum(nums) // 2`). That transforms the problem into a classic question: can we find any subset of `nums` that sums to `target`? This is the 0/1 Knapsack problem. Start with a list where only sum 0 is reachable. For each number, expand the reachable sums by adding that number to every previously reachable sum.",
      edgeCases: [
        "Odd total sum like `[1, 2, 3, 5]` (sum is 11): impossible to divide into two equal integers, returns `False` immediately.",
        "Single element like `[100]`: cannot form two non-empty subsets, returns `False`.",
        "Two equal numbers like `[1, 1]`: partitions into `[1]` and `[1]`, returns `True`.",
      ],
      stepByStepWalkthrough: [
        "**Calculate total sum.** Let `total = sum(nums)`.",
        "**Check parity.** If `total % 2 != 0`, return `False` immediately.",
        "**Define target.** Let `target = total // 2`.",
        "**Create DP list.** Allocate `dp = [False] * (target + 1)` with `dp[0] = True` (a sum of 0 is always achievable with an empty subset).",
        "**Process numbers.** For each `num` in `nums`, loop `j` backwards from `target` down to `num`.",
        "**Update reachable sums.** Set `dp[j] = dp[j] or dp[j - num]`.",
        "**Return answer.** Return `dp[target]`.",
      ],
    },
    hints: {
      conceptual:
        "If two subsets have equal sums, what must each subset sum to? Exactly half of the total sum.",
      structural:
        "Check if `sum(nums) % 2 != 0`. If so, return False. Create a boolean array `dp` of size `target + 1` with `dp[0] = True`. Loop through each `num` in `nums` and loop `j` backwards from `target` down to `num`, updating `dp[j] = dp[j] or dp[j - num]`. Return `dp[target]`.",
    },
    commonMistakes: [
      "Iterating `j` forwards instead of backwards: iterating forwards would allow the same number to be reused multiple times (unbounded knapsack instead of 0/1 knapsack).",
      "Forgetting to check if `sum(nums)` is odd before dividing.",
      "Trying to find both subsets simultaneously instead of reducing the task to finding one subset summing to `target`.",
    ],
    starterCode: `def can_partition(nums: list[int]) -> bool:
    # Determine if nums can be split into two subsets with equal sum.
    # Tip: check whether a subset sums to exactly sum(nums) // 2.
    pass
`,
    optimalSolution: `def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    # If the total sum is odd, two equal integer halves are impossible
    if total % 2 != 0:
        return False

    target = total // 2
    # dp[j] = True if a subset with sum j can be formed
    dp = [False] * (target + 1)
    # Base case: sum 0 is always possible using an empty subset
    dp[0] = True

    for num in nums:
        # Loop backwards so each number is used at most once
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]
`,
    bruteForceSolution: `def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    memo = {}

    def dfs(i: int, cur: int) -> bool:
        if cur == target:
            return True
        if cur > target or i == len(nums):
            return False
        state = (i, cur)
        if state in memo:
            return memo[state]

        memo[state] = dfs(i + 1, cur + nums[i]) or dfs(i + 1, cur)
        return memo[state]

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "can_partition" },
    testCases: [
      { input: { nums: [1, 5, 11, 5] }, expected: true, description: "Can partition into [1, 5, 5] and [11], each summing to 11." },
      { input: { nums: [1, 2, 3, 5] }, expected: false, description: "Total sum is 11 (odd), which cannot be split equally." },
      { input: { nums: [1, 1] }, expected: true, description: "Can partition into [1] and [1]." },
      { input: { nums: [2, 2, 3, 5] }, expected: false },
      { input: { nums: [1, 2, 5] }, expected: false },
      { input: { nums: [100] }, expected: false },
      { input: { nums: [1, 2, 3, 4, 5, 6, 7] }, expected: true },
    ],
  },
];

export default problems;
