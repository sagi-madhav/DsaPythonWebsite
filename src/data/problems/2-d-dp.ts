import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ unique-paths
  {
    id: "unique-paths",
    summary:
      "A robot starts in the **top-left** square of a grid with `m` rows and `n` columns and wants to reach the **bottom-right** square. On every move it may step **one square right** or **one square down**, never left or up. Return how many different routes it can take.",
    constraints: [
      "1 ≤ m, n ≤ 100",
      "The answer is at most 2 × 10⁹, so it fits in a normal integer",
    ],
    pattern: "2-D DP: count the routes into each cell",
    timeComplexity: {
      bruteForce: "O(2^(m+n)) plain, O(m·n) memoized",
      optimal: "O(m · n)",
      explanation:
        "Plain recursion splits into two calls at every cell, so it explores roughly 2^(m+n) routes one by one. With a memo (the alternative solution) every cell is solved only once. The table does the same thing with loops: m rows × n columns = m·n cells, and each cell is one addition, so the total is O(m · n).",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "The table stores one number per cell. (Because each row only looks at the row above, you could keep just one row and get O(n), but the full table is easier to picture.)",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def unique_paths(m: int, n: int) -> int:",
        plainEnglishExplanation:
          "`def` creates a function named `unique_paths` with two inputs. `m: int` and `n: int` are *type hints* saying both inputs are whole numbers, and `-> int` says the function hands back a whole number. Python doesn't enforce hints; they're notes for humans.",
        exampleSnippet: "def area(m: int, n: int) -> int:\n    return m * n\n\nprint(area(3, 7))",
        whyWeUseItHere:
          "The tests call `unique_paths(3, 7)` and compare what you `return` with the expected count.",
      },
      {
        keywordOrMethod: "dp = [[1] * n for _ in range(m)]",
        plainEnglishExplanation:
          "`[1] * n` makes one list of n ones, like `[1, 1, 1]`. Wrapping it as `[ ... for _ in range(m)]` (a *list comprehension*) runs that m times and collects the results, so you get m separate rows: a 2-D list, or grid. `_` is the name people use for a loop variable they don't need. **Trap:** `[[1] * n] * m` looks the same when printed, but it puts the *same* row object in the list m times, so changing one row changes all of them.",
        exampleSnippet:
          "safe = [[0] * 3 for _ in range(2)]\ntrap = [[0] * 3] * 2\nsafe[0][0] = 9\ntrap[0][0] = 9\nprint(safe)\nprint(trap)  # both rows changed: they are the SAME list",
        whyWeUseItHere:
          "Our table needs one cell per square of the grid, and every row must be its own list because we write different numbers into different rows.",
      },
      {
        keywordOrMethod: "dp[i][j]",
        plainEnglishExplanation:
          "A 2-D list is a list of rows. `dp[i]` picks row i (a list), and the second `[j]` picks position j inside that row. So `dp[i][j]` is 'row i, column j', counting from 0. `dp[i - 1][j]` is the cell directly above, `dp[i][j - 1]` the cell directly to the left.",
        exampleSnippet:
          "grid = [[1, 2, 3],\n        [4, 5, 6]]\nprint(grid[1])      # the whole second row\nprint(grid[1][2])   # row 1, column 2\nprint(grid[0][2])   # the cell above it",
        whyWeUseItHere:
          "Each cell's value is built from the cell above it and the cell to its left.",
      },
      {
        keywordOrMethod: "for i in range(1, m):",
        plainEnglishExplanation:
          "`range(1, m)` counts 1, 2, …, m - 1: it starts at the first number and stops just *before* the second. Putting one `for` loop inside another visits every (row, column) pair: the inner loop runs completely for each step of the outer one.",
        exampleSnippet: "for i in range(1, 3):\n    for j in range(1, 4):\n        print(i, j)",
        whyWeUseItHere:
          "Row 0 and column 0 are already correct (all 1s), so we start both loops at 1 and fill everything else.",
      },
      {
        keywordOrMethod: "memo = {} and memo[(i, j)]",
        plainEnglishExplanation:
          "A dictionary maps keys to values. `(i, j)` is a *tuple*: a small, unchangeable pair of values, and tuples can be dictionary keys. `(i, j) in memo` asks 'did I already store an answer for this cell?' A function defined inside another function (like `paths` in the alternative solution) can read and change the outer function's variables, such as `memo`.",
        exampleSnippet:
          "memo = {}\nmemo[(2, 3)] = 10\nprint((2, 3) in memo)\nprint((3, 2) in memo)\nprint(memo[(2, 3)])",
        whyWeUseItHere:
          "The memoized version (the alternative solution) remembers every cell it has solved so it never solves it twice.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { m: 3, n: 4 },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Think about the robot's very last step into any square: it either came down from the square above or came right from the square to the left. There is no third way in. So the number of routes into a square is simply (routes into the square above) + (routes into the square to the left). The top row and left column are easy: the robot can only reach them in a straight line, so each has exactly 1 route. If you write those counts on a piece of graph paper and keep adding 'above + left', square by square, the number in the bottom-right corner is the answer.",
      edgeCases: [
        "A grid with one row or one column (`m == 1` or `n == 1`): there's only one straight route. The loops never run and the table of 1s already says 1.",
        "`m == 1` and `n == 1`: the robot is already standing on the finish, which counts as one route (doing nothing).",
        "The answer is symmetric: a 3 × 7 grid and a 7 × 3 grid both have 28 routes, because flipping the grid swaps 'right' and 'down'.",
      ],
      stepByStepWalkthrough: [
        "**What one cell means.** `dp[i][j]` = the number of different routes from the start (row 0, column 0) to row `i`, column `j`. The answer we want is the bottom-right cell, `dp[m - 1][n - 1]`.",
        "**Plain recursion.** routes(i, j) = routes(i - 1, j) + routes(i, j - 1), and routes = 1 for any cell in the top row or left column. This is correct, but slow.",
        "**Why it repeats work.** routes(2, 2) asks for routes(1, 2) and routes(2, 1), and *both* of those ask for routes(1, 1). On a big grid these overlaps pile up until the same cells are recomputed millions of times.",
        "**Memoization.** Keep a dictionary `memo` keyed by `(i, j)`. The first time a cell is solved, store its count; every later request is an instant lookup. Now each of the m × n cells is solved once.",
        "**Bottom-up table.** Skip the recursion and fill the answers directly into a grid made with `[[1] * n for _ in range(m)]`: every cell starts at 1, which is already right for row 0 and column 0. (Never `[[1] * n] * m`: those rows would all be the same list.)",
        "Fill the remaining cells row by row, left to right, starting at (1, 1): `dp[i][j] = dp[i - 1][j] + dp[i][j - 1]`. The two cells it needs are above and to the left, so they're always finished already.",
        "Return `dp[m - 1][n - 1]`, the bottom-right corner.",
      ],
    },
    hints: {
      conceptual:
        "Look at the last move into any square: the robot came from directly above or directly from the left. If you already knew the route counts for those two squares, how would you get the count for this one?",
      structural:
        "Make a 2-D list `dp` with `m` rows and `n` columns (a list comprehension, all 1s), then two nested `for` loops starting at 1: rows outside, columns inside. The answer sits in the bottom-right cell.",
    },
    commonMistakes: [
      "Building the grid with `[[1] * n] * m`. That's m references to ONE row, so writing `dp[1][1]` silently changes every row and the counts come out wrong.",
      "Starting the loops at 0. Then `dp[i - 1]` with i = 0 reads `dp[-1]`, which in Python means the *last* row, so you get a wrong answer without any error message.",
      "Mixing up rows and columns: `m` is the number of rows (the first index) and `n` the number of columns (the second). Writing `dp[j][i]` crashes or reads the wrong cell whenever m ≠ n.",
      "Plain recursion without a memo: correct, but far too slow for grids like 23 × 12 because the same cells are recounted over and over.",
    ],
    starterCode: `def unique_paths(m: int, n: int) -> int:
    # Every square can only be entered from above or from the left.
    # Tip: build an m x n table where each cell = routes into that square.
    pass
`,
    optimalSolution: `def unique_paths(m: int, n: int) -> int:
    # dp[i][j] = number of routes from the start to row i, column j.
    # Start every cell at 1: the top row and the left column can only be
    # reached in a straight line. Each row is its own fresh list.
    dp = [[1] * n for _ in range(m)]

    # Fill the rest row by row, left to right, so the cell above and the
    # cell to the left are always finished before we need them
    for i in range(1, m):
        for j in range(1, n):
            # The robot arrives either from above or from the left,
            # so add the routes into those two cells
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

    # The bottom-right corner counts every route to the finish
    return dp[m - 1][n - 1]
`,
    bruteForceSolution: `def unique_paths(m: int, n: int) -> int:
    # Top-down version: plain recursion plus a memo of finished cells
    memo = {}

    def paths(i, j):
        # How many routes reach row i, column j?
        if i == 0 or j == 0:
            return 1  # top row or left column: one straight-line route
        if (i, j) in memo:
            return memo[(i, j)]  # solved before: reuse it
        # Arrive from above, or arrive from the left
        memo[(i, j)] = paths(i - 1, j) + paths(i, j - 1)
        return memo[(i, j)]

    return paths(m - 1, n - 1)
`,
    harness: { kind: "function", entry: "unique_paths" },
    testCases: [
      { input: { m: 3, n: 7 }, expected: 28, description: "A 3-row, 7-column grid. Adding 'above + left' cell by cell ends with 28 in the corner." },
      { input: { m: 3, n: 2 }, expected: 3, description: "Right-Down-Down, Down-Right-Down, or Down-Down-Right." },
      { input: { m: 1, n: 1 }, expected: 1, description: "The start is the finish: one route with zero moves." },
      { input: { m: 1, n: 5 }, expected: 1, description: "A single row: the only route is straight right." },
      { input: { m: 4, n: 1 }, expected: 1 },
      { input: { m: 3, n: 3 }, expected: 6 },
      { input: { m: 7, n: 3 }, expected: 28, description: "Same as 3 × 7, just rotated." },
      { input: { m: 10, n: 10 }, expected: 48620 },
      { input: { m: 16, n: 16 }, expected: 155117520 },
      { input: { m: 23, n: 12 }, expected: 193536720 },
    ],
  },

  // ------------------------------------------------------------------ longest-common-subsequence
  {
    id: "longest-common-subsequence",
    summary:
      "Given two strings `text1` and `text2`, return the length of the longest string that is a **subsequence** of both. A subsequence keeps some of a string's letters in their original order but may skip any of them: `'ace'` is a subsequence of `'abcde'`, while `'aec'` is not (the order is wrong). If the strings share no letters, return 0.",
    constraints: [
      "1 ≤ len(text1), len(text2) ≤ 1000",
      "Both strings contain only lowercase English letters",
    ],
    pattern: "2-D DP over two prefixes",
    timeComplexity: {
      bruteForce: "O(2^(m+n)) plain, O(m·n) memoized",
      optimal: "O(m · n)",
      explanation:
        "Let m and n be the two lengths. Plain recursion branches in two whenever the letters differ, so it can make about 2^(m+n) calls. Memoizing (the alternative solution) means each (i, j) pair is solved once. The table has (m + 1) × (n + 1) cells and each one is a single comparison plus a `max`, so filling it is O(m · n).",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "One number per cell of the (m + 1) × (n + 1) table. Since each row only reads the row above it, two rows would be enough, but the full table is easier to follow.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [[0] * cols for _ in range(rows)]",
        plainEnglishExplanation:
          "`[0] * cols` builds one row of zeros. The list comprehension `[ ... for _ in range(rows)]` builds that row `rows` times, each one a brand-new list, giving you a grid. `_` is a name for a loop variable you don't use. **Trap:** `[[0] * cols] * rows` repeats the *same* row object, so writing into one row writes into all of them.",
        exampleSnippet:
          "safe = [[0] * 3 for _ in range(2)]\ntrap = [[0] * 3] * 2\nsafe[0][0] = 9\ntrap[0][0] = 9\nprint(safe)\nprint(trap)  # both rows changed: they are the SAME list",
        whyWeUseItHere:
          "We need a table with one row per prefix of `text1` and one column per prefix of `text2`, and every row gets different numbers.",
      },
      {
        keywordOrMethod: "text1[i - 1]",
        plainEnglishExplanation:
          "Square brackets on a string give you one character, counting from 0: `'abc'[0]` is `'a'`. Row `i` of our table means 'the first i letters', and the last of those letters lives at index `i - 1`.",
        exampleSnippet: "word = 'abcde'\ni = 3\nprint(word[:i])     # the first 3 letters\nprint(word[i - 1])  # the last of them",
        whyWeUseItHere:
          "Each cell compares the newest letter of the two prefixes it represents.",
      },
      {
        keywordOrMethod: "max(a, b)",
        plainEnglishExplanation:
          "`max` returns the larger of the values you give it.",
        exampleSnippet: "print(max(2, 5))\nprint(max(4, 4))",
        whyWeUseItHere:
          "When the two newest letters differ, we drop one of them and keep whichever choice gives the longer answer.",
      },
      {
        keywordOrMethod: "for i in range(1, rows):",
        plainEnglishExplanation:
          "`range(1, rows)` counts 1, 2, …, rows - 1, stopping just *before* `rows`. With one loop inside another, the inner loop runs all the way through for every value of the outer one, visiting every (row, column) pair.",
        exampleSnippet: "for i in range(1, 3):\n    for j in range(1, 3):\n        print(i, j)",
        whyWeUseItHere:
          "Row 0 and column 0 stand for an empty prefix and stay 0, so we fill from (1, 1) onwards.",
      },
      {
        keywordOrMethod: "memo = {} and memo[(i, j)]",
        plainEnglishExplanation:
          "A dictionary stores key → value pairs. `(i, j)` is a *tuple* (a fixed pair of values), and tuples can be used as keys. `(i, j) in memo` checks whether that pair was stored already. A function written inside another function can use the outer function's variables, like `memo` and `text1`.",
        exampleSnippet: "memo = {}\nmemo[(1, 2)] = 5\nprint((1, 2) in memo)\nprint(memo[(1, 2)])",
        whyWeUseItHere:
          "The memoized version (the alternative solution) saves the answer for each (i, j) pair the first time it's computed.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { text1: "abcde", text2: "ace" },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Write `text1` down the left side of a table and `text2` across the top. Each cell answers a smaller version of the question: 'using only these beginnings of the two words, how long a common subsequence can I make?' To answer it, look at the last letter of each beginning. If they're the same letter, you can safely pair them and add 1 to the answer for both beginnings with that letter removed (the cell diagonally up-left). If they differ, at least one of the two letters is useless here, so try dropping each one (the cell above, the cell to the left) and keep the better. Fill the table from the top-left; the bottom-right cell holds the answer for the full words.",
      edgeCases: [
        "No letters in common (`'abc'` vs `'def'`): no letters ever match, so every cell stays 0.",
        "Identical strings: every letter pairs up, so the answer is the whole length.",
        "Repeated letters (`'aaaa'` vs `'aa'`): each letter can be paired only once, so the shorter string limits the answer to 2.",
      ],
      stepByStepWalkthrough: [
        "**What one cell means.** `dp[i][j]` = the length of the longest common subsequence of the first `i` letters of `text1` and the first `j` letters of `text2`. Row 0 and column 0 mean 'an empty prefix', so they're 0. The answer is the bottom-right cell.",
        "**Plain recursion.** lcs(i, j) compares `text1[i - 1]` with `text2[j - 1]`. Equal: 1 + lcs(i - 1, j - 1). Different: max(lcs(i - 1, j), lcs(i, j - 1)). Base case: if either prefix is empty, the answer is 0.",
        "**Why it repeats work.** The 'different' case splits into two calls, and both of them soon ask for the same lcs(i - 1, j - 1). For two 1000-letter strings the number of calls becomes astronomically large.",
        "**Memoization.** There are only (len1 + 1) × (len2 + 1) different (i, j) questions. Store each answer in a dictionary the first time, and every later request is an instant lookup.",
        "**Bottom-up table.** Create the grid with `[[0] * cols for _ in range(rows)]` (a fresh list per row). Fill it row by row, left to right, from (1, 1). Each cell needs only the cell above, the cell to the left and the cell up-left, which are already filled.",
        "Return `dp[rows - 1][cols - 1]`: all of `text1` against all of `text2`.",
      ],
    },
    hints: {
      conceptual:
        "Compare the last letters of the two strings. If they're equal, they can be part of the answer together. If they're not, at least one of them can't be used. Which smaller questions does that leave you with?",
      structural:
        "A 2-D list with `len(text1) + 1` rows and `len(text2) + 1` columns: the extra row and column of zeros stand for an empty prefix. Fill it with two nested `for` loops that start at 1, using `text1[i - 1]` and `text2[j - 1]`.",
    },
    commonMistakes: [
      "Comparing `text1[i]` instead of `text1[i - 1]`. Row i stands for the first i letters, whose last letter is at index i - 1. Using `i` skips the first letter and crashes at the end of the string.",
      "On a match, writing `max(dp[i - 1][j], dp[i][j - 1]) + 1`. That can count the same letter twice. The +1 must come from the diagonal `dp[i - 1][j - 1]`, where *both* matched letters are removed.",
      "Building the table with `[[0] * cols] * rows`: every row is the same list, so updating one row updates them all.",
      "Confusing subsequence with substring: the letters do *not* need to be next to each other, only in the same order.",
    ],
    starterCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # Compare the last letters of two prefixes: match, or drop one?
    # Tip: a table with one row per prefix of text1 and one column per prefix of text2.
    pass
`,
    optimalSolution: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # One extra row and column for "an empty prefix"
    rows = len(text1) + 1
    cols = len(text2) + 1

    # dp[i][j] = longest common subsequence of the first i letters
    # of text1 and the first j letters of text2. A fresh list per row.
    dp = [[0] * cols for _ in range(rows)]

    for i in range(1, rows):
        for j in range(1, cols):
            # Compare the newest letter of each prefix (index i - 1 / j - 1)
            if text1[i - 1] == text2[j - 1]:
                # Same letter: pair them up, plus the best without both letters
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # Different: drop one letter or the other, keep the better result
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Bottom-right cell = all of text1 against all of text2
    return dp[rows - 1][cols - 1]
`,
    bruteForceSolution: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # Top-down version: plain recursion plus a memo of solved (i, j) pairs
    memo = {}

    def lcs(i, j):
        # Longest common subsequence of the first i letters and the first j letters
        if i == 0 or j == 0:
            return 0  # an empty prefix has nothing in common with anything
        if (i, j) in memo:
            return memo[(i, j)]
        if text1[i - 1] == text2[j - 1]:
            result = lcs(i - 1, j - 1) + 1
        else:
            result = max(lcs(i - 1, j), lcs(i, j - 1))
        memo[(i, j)] = result
        return result

    return lcs(len(text1), len(text2))
`,
    harness: { kind: "function", entry: "longest_common_subsequence" },
    testCases: [
      { input: { text1: "abcde", text2: "ace" }, expected: 3, description: "'ace' appears in order inside 'abcde' (skipping b and d)." },
      { input: { text1: "abc", text2: "abc" }, expected: 3, description: "Identical strings: the whole string is shared." },
      { input: { text1: "abc", text2: "def" }, expected: 0, description: "Not a single letter in common." },
      { input: { text1: "a", text2: "a" }, expected: 1 },
      { input: { text1: "a", text2: "b" }, expected: 0 },
      { input: { text1: "aaaa", text2: "aa" }, expected: 2, description: "Each letter can be used once, so the shorter string caps the answer." },
      { input: { text1: "ezupkr", text2: "ubmrapg" }, expected: 2 },
      { input: { text1: "abcba", text2: "abcbcba" }, expected: 5 },
      { input: { text1: "oxcpqrsvwf", text2: "shmtulqrypy" }, expected: 2 },
      { input: { text1: "pmjghexybyrgzczy", text2: "hafcdqbgncrcbihkd" }, expected: 4 },
    ],
  },

  // ------------------------------------------------------------------ best-time-to-buy-and-sell-stock-with-cooldown
  {
    id: "best-time-to-buy-and-sell-stock-with-cooldown",
    summary:
      "`prices[i]` is a stock's price on day `i`. You may buy and sell as many times as you like, but you can own **at most one share at a time**, and the day after you sell you must **rest** (a cooldown day with no buying). Return the largest total profit you can make. Never trading is allowed, so the answer is at least 0.",
    constraints: [
      "1 ≤ len(prices) ≤ 5000",
      "0 ≤ prices[i] ≤ 1000",
    ],
    pattern: "2-D DP over (day, holding a share or not)",
    timeComplexity: {
      bruteForce: "O(2^n) plain, O(n) memoized",
      optimal: "O(n)",
      explanation:
        "Plain recursion makes a two-way choice every day, so it explores about 2^n different plans. There are only 2 situations per day (holding or not), so the memoized version (the alternative solution) solves 2n questions. The table has (n + 2) rows × 2 columns and each cell is one `max` of two numbers: O(n) in total.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The table holds 2 numbers per day. Each row only looks one or two rows ahead, so a few variables would do (O(1)), but the table shows the idea clearly.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "FREE = 0 and HOLDING = 1",
        plainEnglishExplanation:
          "These are ordinary variables used as readable names for column numbers. Writing a name in ALL CAPS is a Python habit that means 'this value never changes'. `dp[i][HOLDING]` reads much better than `dp[i][1]`.",
        exampleSnippet: "FREE = 0\nHOLDING = 1\nrow = [10, 25]\nprint(row[FREE])\nprint(row[HOLDING])",
        whyWeUseItHere:
          "Each row of the table has two columns: one for 'I own nothing' and one for 'I own a share'.",
      },
      {
        keywordOrMethod: "dp = [[0] * 2 for _ in range(n + 2)]",
        plainEnglishExplanation:
          "`[0] * 2` is one row `[0, 0]`. The list comprehension `[ ... for _ in range(n + 2)]` builds n + 2 *separate* rows, which makes a grid. `_` is the conventional name for a loop variable you don't use. **Trap:** `[[0] * 2] * (n + 2)` repeats the same row object, so changing one row changes every row.",
        exampleSnippet:
          "safe = [[0] * 2 for _ in range(3)]\ntrap = [[0] * 2] * 3\nsafe[0][1] = 7\ntrap[0][1] = 7\nprint(safe)\nprint(trap)  # every row changed: they are the SAME list",
        whyWeUseItHere:
          "One row per day, plus two padding rows of zeros for the days after the last day.",
      },
      {
        keywordOrMethod: "for i in range(n - 1, -1, -1):",
        plainEnglishExplanation:
          "`range(start, stop, step)` with a step of -1 counts *down*. It starts at `n - 1` and stops just before `-1`, so the last value is 0.",
        exampleSnippet: "for i in range(4, -1, -1):\n    print(i)",
        whyWeUseItHere:
          "Each day's best profit depends on the days after it, so we fill the table from the last day back to day 0.",
      },
      {
        keywordOrMethod: "max(a, b)",
        plainEnglishExplanation: "`max` returns the larger of the values it's given.",
        exampleSnippet: "rest = 3\nbuy = -1\nprint(max(rest, buy))",
        whyWeUseItHere:
          "Every day we pick the better of two choices: do nothing, or trade.",
      },
      {
        keywordOrMethod: "memo[(i, holding)]",
        plainEnglishExplanation:
          "A dictionary can use a *tuple* (a fixed pair of values written with parentheses) as a key, so one dictionary can remember answers for every (day, situation) pair. `True` and `False` work fine inside the tuple.",
        exampleSnippet: "memo = {}\nmemo[(3, True)] = 8\nprint((3, True) in memo)\nprint((3, False) in memo)",
        whyWeUseItHere:
          "The memoized version (the alternative solution) stores the best profit for each (day, holding) pair the first time it's worked out.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { prices: [1, 2, 3, 0, 2] },
      gridPointers: { dp: [["i", "FREE"], ["i", "HOLDING"]] },
      focus: ["dp", "prices"],
      pointers: { prices: ["i"] },
    },
    intuitiveExplanation: {
      intuition:
        "Every morning you're in one of two situations: your hands are empty (FREE) or you're holding a share (HOLDING). When FREE you can rest or buy; when HOLDING you can rest or sell, and selling means tomorrow is a forced rest day. If somebody told you 'the best you can still earn from tomorrow onward' for both situations, today's decision would just be a `max` of two options. So we plan backwards, like planning a trip starting from the destination: fill in the last day first, then the day before it, all the way back to day 0.",
      edgeCases: [
        "Only one day: you can't buy and then sell on a later day, so the answer is 0.",
        "Prices that only fall: never buying is best. The 'rest' option guarantees we never go below 0.",
        "Prices that only rise: one long hold (buy on day 0, sell on the last day) beats many small trades, because every sale costs a rest day.",
      ],
      stepByStepWalkthrough: [
        "**What one cell means.** `dp[i][FREE]` = the most profit you can still make from day `i` to the end if you start day `i` owning nothing. `dp[i][HOLDING]` = the same, but starting day `i` owning a share. The answer is `dp[0][FREE]`.",
        "**Plain recursion.** best(i, holding) tries both choices for day `i`: rest → best(i + 1, holding); buy → best(i + 1, True) - price; sell → best(i + 2, False) + price (i + 2 skips the cooldown day). Base case: past the last day, profit is 0.",
        "**Why it repeats work.** Lots of different histories land you in the same spot, like 'day 4, owning nothing', and plain recursion re-solves that spot every time. Two choices per day means about 2^n calls, even though only 2n different spots exist.",
        "**Memoization.** Store best(i, holding) in a dictionary keyed by `(i, holding)`, so each of the 2n spots is solved once.",
        "**Bottom-up table.** Make `n + 2` rows of `[0, 0]` with `[[0] * 2 for _ in range(n + 2)]` (never `[[0] * 2] * (n + 2)`, which shares one row). The two extra zero rows mean 'after the last day', so `i + 1` and `i + 2` never fall off the end.",
        "Fill from `i = n - 1` down to 0: `dp[i][FREE] = max(rest, dp[i + 1][HOLDING] - prices[i])` and `dp[i][HOLDING] = max(rest, dp[i + 2][FREE] + prices[i])`.",
        "Return `dp[0][FREE]`: day 0, empty-handed.",
      ],
    },
    hints: {
      conceptual:
        "For planning the future, only two things matter: which day it is, and whether you're holding a share. Each of those situations has just two choices. What does selling do to *tomorrow*?",
      structural:
        "A table with one row per day (plus two padding rows of zeros) and two columns, FREE and HOLDING. Fill it with a backwards loop `for i in range(n - 1, -1, -1):`, using `max()` to pick between resting and trading.",
    },
    commonMistakes: [
      "After selling, moving on to `i + 1` instead of `i + 2`. That ignores the cooldown and produces answers that are too big.",
      "Creating only `n` rows: on the last day `dp[i + 2]` points past the end of the list and raises an IndexError. The two padding rows of zeros prevent that.",
      "Filling the table forwards with `range(n)`: each day needs the answers for *later* days, which wouldn't exist yet.",
      "Adding the price when buying instead of subtracting it: buying costs money, selling earns it.",
    ],
    starterCode: `def max_profit(prices: list[int]) -> int:
    # Each day you either own nothing or own one share.
    # Tip: work backwards from the last day; selling forces a rest tomorrow.
    pass
`,
    optimalSolution: `def max_profit(prices: list[int]) -> int:
    n = len(prices)
    # Readable names for the two columns of the table
    FREE = 0     # starting the day owning nothing: you may buy
    HOLDING = 1  # starting the day owning a share: you may sell

    # dp[i][FREE] / dp[i][HOLDING] = most profit still possible from day i on.
    # Two extra rows of zeros mean "after the last day": nothing left to earn.
    dp = [[0] * 2 for _ in range(n + 2)]

    # Fill backwards, because every day depends on the days after it
    for i in range(n - 1, -1, -1):
        # Owning nothing: rest today, or buy today (pay prices[i]) and hold tomorrow
        dp[i][FREE] = max(dp[i + 1][FREE], dp[i + 1][HOLDING] - prices[i])
        # Owning a share: keep holding, or sell today (earn prices[i]); a sale
        # forces a rest tomorrow, so we continue at day i + 2 owning nothing
        dp[i][HOLDING] = max(dp[i + 1][HOLDING], dp[i + 2][FREE] + prices[i])

    # Day 0, empty-handed
    return dp[0][FREE]
`,
    bruteForceSolution: `def max_profit(prices: list[int]) -> int:
    # Top-down version: plain recursion plus a memo of solved (day, holding) pairs
    memo = {}

    def best(i, holding):
        # Most profit from day i onward; holding is True if we own a share
        if i >= len(prices):
            return 0  # no days left
        if (i, holding) in memo:
            return memo[(i, holding)]
        rest = best(i + 1, holding)
        if holding:
            trade = best(i + 2, False) + prices[i]  # sell, then sit out the cooldown day
        else:
            trade = best(i + 1, True) - prices[i]  # buy
        memo[(i, holding)] = max(rest, trade)
        return memo[(i, holding)]

    return best(0, False)
`,
    harness: { kind: "function", entry: "max_profit" },
    testCases: [
      { input: { prices: [1, 2, 3, 0, 2] }, expected: 3, description: "Buy at 1, sell at 2, rest (price 3), buy at 0, sell at 2: 1 + 2 = 3." },
      { input: { prices: [1] }, expected: 0, description: "Only one day: there's no later day to sell on." },
      { input: { prices: [5, 4, 3, 2, 1] }, expected: 0, description: "Prices only fall, so the best plan is to never buy." },
      { input: { prices: [1, 2, 3, 4, 5] }, expected: 4, description: "Buy on day 0 and sell on the last day." },
      { input: { prices: [2, 1, 4] }, expected: 3 },
      { input: { prices: [1, 4, 2, 7] }, expected: 6, description: "Selling at 4 would force a rest on the day the price is 2. Holding from 1 to 7 is better." },
      { input: { prices: [6, 1, 3, 2, 4, 7] }, expected: 6 },
      { input: { prices: [3, 3, 3] }, expected: 0 },
      { input: { prices: [1, 3, 1, 3, 1, 3] }, expected: 4 },
      { input: { prices: [8, 6, 4, 3, 3, 2, 3, 5, 8, 3, 8, 2, 6] }, expected: 10 },
    ],
  },

  // ------------------------------------------------------------------ coin-change-ii
  {
    id: "coin-change-ii",
    summary:
      "You have an endless supply of coins of each value listed in `coins` (no two values are the same). Count how many different **combinations** of coins add up to exactly `amount`. Order doesn't matter: `1 + 2` and `2 + 1` are the same combination. If the amount can't be made, return 0. Making an amount of 0 counts as one way: take no coins.",
    constraints: [
      "1 ≤ len(coins) ≤ 300",
      "1 ≤ coins[i] ≤ 5000, and all coin values are different",
      "0 ≤ amount ≤ 5000",
      "The answer fits in a 32-bit integer",
    ],
    pattern: "2-D DP: unbounded knapsack (counting)",
    timeComplexity: {
      bruteForce: "Exponential plain, O(n · amount) memoized",
      optimal: "O(n · amount)",
      explanation:
        "Let n be the number of coin types. Plain recursion branches into 'skip this coin' and 'use it once more' at every step, which grows exponentially. Memoizing (the alternative solution) solves each (coin types, amount) question once. The table has (n + 1) rows × (amount + 1) columns and each cell is one or two additions, so it's O(n · amount).",
    },
    spaceComplexity: {
      optimal: "O(n · amount)",
      explanation:
        "One count per cell. Since each row only reads the row above and itself, a single row of length amount + 1 is enough (O(amount)), a classic follow-up.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [[0] * cols for _ in range(rows)]",
        plainEnglishExplanation:
          "`[0] * cols` is one row of zeros. The list comprehension `[ ... for _ in range(rows)]` builds a separate row `rows` times, so you get a grid. `_` means 'a loop variable I don't need'. **Trap:** `[[0] * cols] * rows` repeats one and the same row, so writing to one row writes to all of them.",
        exampleSnippet:
          "safe = [[0] * 3 for _ in range(2)]\ntrap = [[0] * 3] * 2\nsafe[0][0] = 9\ntrap[0][0] = 9\nprint(safe)\nprint(trap)  # both rows changed: they are the SAME list",
        whyWeUseItHere:
          "One row per 'number of coin types allowed', one column per amount from 0 to `amount`.",
      },
      {
        keywordOrMethod: "coin = coins[i - 1]",
        plainEnglishExplanation:
          "Lists are numbered from 0. Row `i` of the table means 'the first i coin types', so the coin type that row `i` *adds* is the one at index `i - 1`.",
        exampleSnippet: "coins = [1, 2, 5]\ni = 2\nprint(coins[:i])     # the first 2 coin types\nprint(coins[i - 1])  # the newest one",
        whyWeUseItHere:
          "Each row brings in one new coin type, and we need its value.",
      },
      {
        keywordOrMethod: "dp[i][j] += dp[i][j - coin]",
        plainEnglishExplanation:
          "`x += y` is shorthand for `x = x + y`. `dp[i][j]` is 'row i, column j' of the grid: `dp[i]` picks the row, then `[j]` picks the cell inside it.",
        exampleSnippet: "grid = [[1, 1, 2], [1, 2, 0]]\ngrid[1][2] += grid[1][0]\nprint(grid[1][2])",
        whyWeUseItHere:
          "A cell starts with the ways that skip the new coin, then *adds* the ways that use it.",
      },
      {
        keywordOrMethod: "for i in range(1, rows):",
        plainEnglishExplanation:
          "`range(1, rows)` counts 1, 2, …, rows - 1 (it stops just before `rows`). A loop inside a loop runs the inner loop completely for every step of the outer one.",
        exampleSnippet: "for i in range(1, 3):\n    for j in range(1, 4):\n        print(i, j)",
        whyWeUseItHere:
          "Row 0 (no coins) and column 0 (amount 0) are set up first; the loops fill everything else.",
      },
      {
        keywordOrMethod: "memo[(i, j)]",
        plainEnglishExplanation:
          "A dictionary can use a *tuple* such as `(i, j)` (a fixed pair of values) as its key. `(i, j) in memo` asks whether that pair's answer is already stored. A function defined inside another function can use the outer one's variables, like `memo` and `coins`.",
        exampleSnippet: "memo = {}\nmemo[(2, 5)] = 3\nprint((2, 5) in memo)\nprint(memo[(2, 5)])",
        whyWeUseItHere:
          "The memoized version (the alternative solution) remembers each (coin types, amount) answer.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { amount: 4, coins: [1, 2] },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp", "coin"],
    },
    intuitiveExplanation: {
      intuition:
        "Line your coin types up in a row of jars and decide about one jar at a time. For the jar in front of you there are only two possibilities: you never take a coin from it (so the count is whatever the earlier jars could manage), or you take at least one (take one coin out, and you're left with a smaller amount, still allowed to use this same jar again). Deciding jar by jar is the trick that stops `1 + 2` and `2 + 1` from both being counted: every combination gets built in the same jar order, so it's counted exactly once.",
      edgeCases: [
        "`amount == 0`: there's exactly one way (take nothing), no matter which coins exist.",
        "Impossible amounts, e.g. 3 with only 2-coins, or 7 with `[2, 4, 6]`: the count stays 0.",
        "A coin bigger than the amount: it can never be used, so its row is just a copy of the row above.",
      ],
      stepByStepWalkthrough: [
        "**What one cell means.** `dp[i][j]` = the number of ways to make the amount `j` using only the first `i` coin types (any number of each). Row 0 means 'no coins allowed'. The answer is `dp[len(coins)][amount]`.",
        "**Plain recursion.** ways(i, j) = ways(i - 1, j) (never use coin i) + ways(i, j - coin) (use one more of coin i). Base cases: j == 0 → 1 way; no coin types left but j > 0 → 0 ways.",
        "**Why it repeats work.** Different choices lead to the same question. With coins 1 and 2, taking two 1s or one 2 both leave 'amount j - 2, same coins', and plain recursion counts that leftover from scratch each time.",
        "**Memoization.** Only (n + 1) × (amount + 1) different questions exist. Store each answer in a dictionary keyed by `(i, j)` and look it up next time.",
        "**Bottom-up table.** Create it with `[[0] * (amount + 1) for _ in range(len(coins) + 1)]` (a fresh list per row), then put 1 in column 0 of every row: amount 0 always has one way.",
        "Fill row by row, left to right. Copy the cell above (`dp[i - 1][j]`, skip this coin), and if the coin fits, add `dp[i][j - coin]` from the *same* row (use it, and still allow more of it). That cell is to the left, so it's already done.",
        "Return the bottom-right cell.",
      ],
    },
    hints: {
      conceptual:
        "To avoid counting the same coins in a different order, decide coin types one at a time: for each type, either you never use it, or you use it at least once. What does each choice leave you with?",
      structural:
        "Rows = how many coin types are allowed (0 to n), columns = amounts 0 to `amount`. Nested `for` loops; each cell = the cell above + the cell `coin` steps to the left in the same row (when `j >= coin`).",
    },
    commonMistakes: [
      "Using `dp[i - 1][j - coin]` instead of `dp[i][j - coin]`. The row above has no access to this coin, so that version allows each coin type at most once.",
      "Leaving column 0 at 0. Amount 0 has exactly one way (no coins); without that 1, every cell stays 0.",
      "In the 1-D version, looping over amounts outside and coins inside. That counts different *orders* (1 + 2 and 2 + 1 separately) and gives too big an answer.",
      "Building the grid with `[[0] * cols] * rows`: all rows share one list.",
    ],
    starterCode: `def change(amount: int, coins: list[int]) -> int:
    # Decide one coin type at a time: never use it, or use it (again).
    # Tip: a table with a row per coin type and a column per amount 0..amount.
    pass
`,
    optimalSolution: `def change(amount: int, coins: list[int]) -> int:
    rows = len(coins) + 1  # row i = only the first i coin types allowed
    cols = amount + 1      # column j = the amount j we're trying to make

    # dp[i][j] = ways to make amount j using only the first i coin types.
    # A fresh list for every row.
    dp = [[0] * cols for _ in range(rows)]

    # Amount 0 can always be made exactly one way: take no coins
    for i in range(rows):
        dp[i][0] = 1

    for i in range(1, rows):
        coin = coins[i - 1]  # the coin type this row adds
        for j in range(1, cols):
            # Ways that never use this coin: same as the row above
            dp[i][j] = dp[i - 1][j]
            if j >= coin:
                # Ways that use this coin: take one, then make j - coin
                # with the SAME coin types (so it can be used again)
                dp[i][j] += dp[i][j - coin]

    # All coin types allowed, the full amount
    return dp[rows - 1][amount]
`,
    bruteForceSolution: `def change(amount: int, coins: list[int]) -> int:
    # Top-down version: plain recursion plus a memo of solved (i, j) pairs
    memo = {}

    def ways(i, j):
        # Ways to make amount j using only the first i coin types
        if j == 0:
            return 1  # nothing left to pay: exactly one way
        if i == 0:
            return 0  # money left to pay, but no coin types allowed
        if (i, j) in memo:
            return memo[(i, j)]
        coin = coins[i - 1]
        result = ways(i - 1, j)  # never use this coin type
        if j >= coin:
            result += ways(i, j - coin)  # use it once more
        memo[(i, j)] = result
        return result

    return ways(len(coins), amount)
`,
    harness: { kind: "function", entry: "change" },
    testCases: [
      { input: { amount: 5, coins: [1, 2, 5] }, expected: 4, description: "5, 2+2+1, 2+1+1+1 and 1+1+1+1+1." },
      { input: { amount: 3, coins: [2] }, expected: 0, description: "Only 2-coins: you can make 2 or 4, never 3." },
      { input: { amount: 10, coins: [10] }, expected: 1, description: "A single 10-coin." },
      { input: { amount: 0, coins: [7] }, expected: 1, description: "Amount 0: the one way is to take no coins." },
      { input: { amount: 4, coins: [1, 2] }, expected: 3 },
      { input: { amount: 12, coins: [2, 3, 5] }, expected: 5 },
      { input: { amount: 7, coins: [2, 4, 6] }, expected: 0, description: "Even coins can never make an odd amount." },
      { input: { amount: 100, coins: [1, 5, 10, 25] }, expected: 242 },
      { input: { amount: 300, coins: [2, 5, 10, 20, 50] }, expected: 6171 },
    ],
  },

  // ------------------------------------------------------------------ target-sum
  {
    id: "target-sum",
    summary:
      "You are given an integer list `nums` and an integer `target`. Build an expression by placing either `'+'` or `'-'` before each integer and then adding them all up. Return the number of different ways to assign signs so that the expression evaluates to `target`.",
    constraints: [
      "1 ≤ len(nums) ≤ 20",
      "0 ≤ nums[i] ≤ 1000",
      "0 ≤ sum(nums) ≤ 1000",
      "-1000 ≤ target ≤ 1000",
    ],
    pattern: "Subset sum DP: transform into finding positive subset sum (target + total) // 2",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n · s)",
      explanation:
        "Trying all sign assignments checks 2ⁿ combinations. Mathematically, splitting into positive and negative sets means 2 · sum(P) = target + sum(nums). Finding subsets summing to s = (target + total) // 2 takes O(n · s) time.",
    },
    spaceComplexity: {
      optimal: "O(s)",
      explanation:
        "A 1-D list `dp` of size s + 1 where s = (target + total) // 2.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "abs(target) > total",
        plainEnglishExplanation:
          "`abs(x)` gives the absolute (positive) value of a number. If `abs(target) > total`, even making all numbers positive cannot reach `target`.",
        exampleSnippet: "print(abs(-5) > 4)\nprint(abs(3) > 10)",
        whyWeUseItHere:
          "Quickly eliminates unreachable targets before doing any DP calculations.",
      },
      {
        keywordOrMethod: "(target + total) % 2 != 0",
        plainEnglishExplanation:
          "Checks whether the sum of `target` and `total` is an odd number.",
        exampleSnippet: "target, total = 1, 4\nprint((target + total) % 2 != 0)",
        whyWeUseItHere:
          "Since 2 * sum(P) must be an integer, `target + total` must be even.",
      },
      {
        keywordOrMethod: "dp[j] += dp[j - num]",
        plainEnglishExplanation:
          "Adds the number of ways to form sum `j - num` to the ways to form sum `j`.",
        exampleSnippet: "dp = [1, 0, 0]\nnum = 1\ndp[1] += dp[0]\nprint(dp)",
        whyWeUseItHere:
          "Incorporating `num` creates new ways to form sum `j` from each way that formed `j - num`.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [1, 1, 1, 1, 1], target: 3 },
      pointers: { dp: ["j"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Every choice divides the numbers into two teams: those with a `+` sign (Team P) and those with a `-` sign (Team N). We want `sum(P) - sum(N) = target`. But we also know that `sum(P) + sum(N) = total`. Adding these two equations gives `2 * sum(P) = target + total`, which simplifies to `sum(P) = (target + total) // 2`. The problem is now completely transformed: count how many subsets of `nums` sum up to this specific value `s`!",
      edgeCases: [
        "`abs(target) > sum(nums)`: impossible because even all `+` signs cannot reach target, returns 0.",
        "`(target + total) % 2 != 0`: cannot split an odd number into two equal integer halves, returns 0.",
        "`nums` contains zeros: a zero can have either `+` or `-` without changing the sum, so each zero doubles the number of valid assignments.",
      ],
      stepByStepWalkthrough: [
        "**Calculate total.** Let `total = sum(nums)`.",
        "**Validate bounds and parity.** If `abs(target) > total` or `(target + total) % 2 != 0`, return 0.",
        "**Determine positive subset target.** `s = (target + total) // 2`.",
        "**Initialize DP array.** `dp = [0] * (s + 1)` with `dp[0] = 1` (1 way to make sum 0 with empty set).",
        "**Update counts.** For each `num` in `nums`, loop `j` backwards from `s` down to `num`: `dp[j] += dp[j - num]`.",
        "**Return result.** Return `dp[s]`.",
      ],
    },
    hints: {
      conceptual:
        "Every assignment splits numbers into positive and negative groups: P - N = target and P + N = total. Can you solve for P?",
      structural:
        "Compute `s = (target + sum(nums)) // 2`. If invalid, return 0. Use a 1-D list `dp = [0] * (s + 1)` with `dp[0] = 1`. For each number in `nums`, loop backwards `for j in range(s, num - 1, -1):` and add `dp[j - num]` to `dp[j]`. Return `dp[s]`.",
    },
    commonMistakes: [
      "Looping `j` forwards instead of backwards: this reuses the same element multiple times.",
      "Forgetting to handle `abs(target) > sum(nums)`, which leads to a negative `s` or index out of range.",
      "Failing when `nums` contains `0`: `0` is a valid element that doubles combinations (since +0 and -0 both work). Backwards loop correctly updates `dp[0] += dp[0]`.",
    ],
    starterCode: `def find_target_sum_ways(nums: list[int], target: int) -> int:
    # Count how many ways to assign + and - signs to reach target.
    # Tip: convert to subset sum targeting (target + sum(nums)) // 2.
    pass
`,
    optimalSolution: `def find_target_sum_ways(nums: list[int], target: int) -> int:
    total = sum(nums)
    # Target is out of reach or cannot be formed with integer subsets
    if abs(target) > total or (target + total) % 2 != 0:
        return 0

    # s is the target sum of the subset of numbers with positive signs
    s = (target + total) // 2
    # dp[j] = number of subsets summing to j
    dp = [0] * (s + 1)
    # Exactly 1 way to form sum 0 (the empty set)
    dp[0] = 1

    for num in nums:
        # Loop backwards so each number in nums is used at most once
        for j in range(s, num - 1, -1):
            dp[j] += dp[j - num]

    return dp[s]
`,
    bruteForceSolution: `def find_target_sum_ways(nums: list[int], target: int) -> int:
    memo = {}

    def dfs(i: int, cur: int) -> int:
        if i == len(nums):
            return 1 if cur == target else 0
        state = (i, cur)
        if state in memo:
            return memo[state]

        # Try both '+' and '-' on nums[i]
        ways = dfs(i + 1, cur + nums[i]) + dfs(i + 1, cur - nums[i])
        memo[state] = ways
        return ways

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "find_target_sum_ways" },
    testCases: [
      { input: { nums: [1, 1, 1, 1, 1], target: 3 }, expected: 5, description: "5 ways to assign signs to get sum 3 (four +1s and one -1)." },
      { input: { nums: [1], target: 1 }, expected: 1, description: "+1 reaches 1." },
      { input: { nums: [1], target: 2 }, expected: 0, description: "Cannot reach 2 from a single 1." },
      { input: { nums: [1, 0], target: 1 }, expected: 2, description: "+1 +0 and +1 -0 both reach 1." },
      { input: { nums: [0, 0, 0, 0, 0, 0, 0, 0, 1], target: 1 }, expected: 256 },
      { input: { nums: [2, 1], target: 1 }, expected: 1 },
      { input: { nums: [100], target: -200 }, expected: 0 },
    ],
  },

  // ------------------------------------------------------------------ interleaving-string
  {
    id: "interleaving-string",
    summary:
      "Given three strings `s1`, `s2`, and `s3`, determine whether `s3` is formed by an **interleaving** of `s1` and `s2`. An interleaving weaves `s1` and `s2` together to form `s3` while preserving the relative left-to-right order of characters from each string.",
    constraints: [
      "0 ≤ len(s1), len(s2) ≤ 100",
      "0 ≤ len(s3) ≤ 200",
      "All strings consist of lowercase English letters",
    ],
    pattern: "2-D DP: grid representing prefixes of s1 and s2",
    timeComplexity: {
      bruteForce: "O(2^(m+n))",
      optimal: "O(m · n)",
      explanation:
        "Where m = len(s1) and n = len(s2). Plain recursion branches when both strings match the current character of s3. 2-D DP fills an (m + 1) × (n + 1) grid where each cell takes O(1) checks, taking O(m · n) time total.",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "A 2-D boolean grid of size (len(s1) + 1) × (len(s2) + 1).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [[False] * (n + 1) for _ in range(m + 1)]",
        plainEnglishExplanation:
          "Creates a 2-D grid with `m + 1` rows and `n + 1` columns initialized to `False`.",
        exampleSnippet: "grid = [[False] * 3 for _ in range(2)]\nprint(grid)",
        whyWeUseItHere:
          "`dp[i][j]` records whether prefix `s1[:i]` and prefix `s2[:j]` can interleave to form prefix `s3[:i + j]`.",
      },
      {
        keywordOrMethod: "s1[i - 1] == s3[i + j - 1]",
        plainEnglishExplanation:
          "Checks if the newest character of `s1` matches the corresponding character in `s3`.",
        exampleSnippet: "s1, s3 = 'ab', 'axb'\ni, j = 1, 0\nprint(s1[i - 1] == s3[i + j - 1])",
        whyWeUseItHere:
          "The newest character in `s3` must come from either `s1` or `s2`.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac" },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine navigating a maze from top-left (0, 0) to bottom-right (m, n). Stepping right means consuming a character from `s2`; stepping down means consuming a character from `s1`. At any point (i, j), you have consumed `i + j` characters total. You can step down into (i, j) if the i-th character of `s1` matches `s3[i + j - 1]` and cell (i - 1, j) was reachable. You can step right if the j-th character of `s2` matches `s3[i + j - 1]` and cell (i, j - 1) was reachable.",
      edgeCases: [
        "`len(s1) + len(s2) != len(s3)`: impossible to form `s3`, immediately returns `False`.",
        "All empty strings `s1 = '', s2 = '', s3 = ''`: returns `True`.",
        "One string empty, e.g. `s1 = '', s2 = 'abc', s3 = 'abc'`: returns `True`.",
      ],
      stepByStepWalkthrough: [
        "**Length validation.** If `len(s1) + len(s2) != len(s3)`, return `False`.",
        "**Create 2-D DP table.** Create `dp = [[False] * (n + 1) for _ in range(m + 1)]` where `m = len(s1)` and `n = len(s2)`.",
        "**Base case.** `dp[0][0] = True` (empty prefixes interleave to form empty `s3`).",
        "**Nested loops.** Loop `i` from `0` to `m` and `j` from `0` to `n`.",
        "**Check transition from s1.** If `i > 0` and `s1[i - 1] == s3[i + j - 1]` and `dp[i - 1][j]`, set `dp[i][j] = True`.",
        "**Check transition from s2.** If `j > 0` and `s2[j - 1] == s3[i + j - 1]` and `dp[i][j - 1]`, set `dp[i][j] = True`.",
        "**Return result.** Return `dp[m][n]`.",
      ],
    },
    hints: {
      conceptual:
        "The character s3[i + j - 1] must either come from s1[i - 1] or from s2[j - 1]. If it comes from s1, can s1[:i-1] and s2[:j] form s3[:i+j-1]?",
      structural:
        "First check if lengths add up. Make an `(m + 1) x (n + 1)` boolean grid `dp` with `dp[0][0] = True`. Nested loops `for i in range(m + 1):` and `for j in range(n + 1):`. Transition from `dp[i-1][j]` if `s1[i-1] == s3[i+j-1]` and from `dp[i][j-1]` if `s2[j-1] == s3[i+j-1]`.",
    },
    commonMistakes: [
      "Forgetting the initial length check: if `len(s1) + len(s2) != len(s3)`, checking characters causes out of bounds errors on `s3`.",
      "Greedy matching: when both `s1[i-1]` and `s2[j-1]` match `s3[i+j-1]`, picking just one can fail later; DP checks both paths.",
    ],
    starterCode: `def is_interleave(s1: str, s2: str, s3: str) -> bool:
    # Determine if s3 is formed by interleaving s1 and s2.
    # Tip: dp[i][j] indicates if s1[:i] and s2[:j] form s3[:i + j].
    pass
`,
    optimalSolution: `def is_interleave(s1: str, s2: str, s3: str) -> bool:
    # Total length of s1 and s2 must equal length of s3
    if len(s1) + len(s2) != len(s3):
        return False

    m, n = len(s1), len(s2)
    # dp[i][j] = True if s1[:i] and s2[:j] interleave to form s3[:i + j]
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    # Base case: two empty strings form an empty string
    dp[0][0] = True

    for i in range(m + 1):
        for j in range(n + 1):
            # Try taking the latest character from s1
            if i > 0 and s1[i - 1] == s3[i + j - 1] and dp[i - 1][j]:
                dp[i][j] = True
            # Try taking the latest character from s2
            if j > 0 and s2[j - 1] == s3[i + j - 1] and dp[i][j - 1]:
                dp[i][j] = True

    # Check if full strings s1 and s2 form full string s3
    return dp[m][n]
`,
    bruteForceSolution: `def is_interleave(s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
        return False
    memo = {}

    def dfs(i: int, j: int) -> bool:
        if i == len(s1) and j == len(s2):
            return True
        state = (i, j)
        if state in memo:
            return memo[state]

        ans = False
        k = i + j
        if i < len(s1) and s1[i] == s3[k] and dfs(i + 1, j):
            ans = True
        elif j < len(s2) and s2[j] == s3[k] and dfs(i, j + 1):
            ans = True

        memo[state] = ans
        return ans

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "is_interleave" },
    testCases: [
      { input: { s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac" }, expected: true, description: "Can split s1 into 'aa', 'bc', 'c' and s2 into 'dbbc', 'a' to weave 'aadbbcbcac'." },
      { input: { s1: "aabcc", s2: "dbbca", s3: "aadbbbaccc" }, expected: false, description: "Relative ordering of letters cannot match s3." },
      { input: { s1: "", s2: "", s3: "" }, expected: true, description: "Empty strings trivially interleave to form an empty string." },
      { input: { s1: "", s2: "b", s3: "b" }, expected: true },
      { input: { s1: "a", s2: "", s3: "c" }, expected: false },
      { input: { s1: "ab", s2: "bc", s3: "babc" }, expected: true },
      { input: { s1: "aa", s2: "ab", s3: "aaba" }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ longest-increasing-path-in-a-matrix
  {
    id: "longest-increasing-path-in-a-matrix",
    summary:
      "Given an `m x n` integers `matrix`, return the length of the **longest strictly increasing path**. From each cell, you can step in four directions: **up, down, left, or right**. Diagonal moves and stepping outside the boundary are not permitted.",
    constraints: [
      "1 ≤ m, n ≤ 200",
      "0 ≤ matrix[i][j] ≤ 2³¹ - 1",
    ],
    pattern: "2-D DP / DFS with memoization on a DAG",
    timeComplexity: {
      bruteForce: "O(4^(m·n))",
      optimal: "O(m · n)",
      explanation:
        "Because steps must be strictly increasing, no path can ever visit the same cell twice (it is a Directed Acyclic Graph). Memoizing the longest path starting at each cell ensures each cell is computed once in O(m · n) time.",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "The `memo` grid stores the longest path length for all m · n cells, and the recursion stack reaches at most m · n frames in the worst case.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:",
        plainEnglishExplanation:
          "Iterates through the four cardinal directions (up, down, left, right) as row and column offsets.",
        exampleSnippet: "for dr, dc in [(-1, 0), (1, 0)]:\n    print(dr, dc)",
        whyWeUseItHere:
          "Neatly explores the four adjacent neighbours of cell `(r, c)`.",
      },
      {
        keywordOrMethod: "if 0 <= nr < ROWS and 0 <= nc < COLS:",
        plainEnglishExplanation:
          "Verifies that the neighbour coordinate `(nr, nc)` lies within valid grid boundaries.",
        exampleSnippet: "nr, nc = 1, 2\nROWS, COLS = 3, 3\nprint(0 <= nr < ROWS and 0 <= nc < COLS)",
        whyWeUseItHere:
          "Prevents IndexError when inspecting boundary edges.",
      },
      {
        keywordOrMethod: "memo[r][c] != 0",
        plainEnglishExplanation:
          "Checks if an answer has already been calculated and stored for this cell.",
        exampleSnippet: "memo = [[0, 2], [1, 0]]\nprint(memo[0][1] != 0)",
        whyWeUseItHere:
          "Avoids redundant DFS explorations from cells that have already been solved.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { matrix: [[9, 9, 4], [6, 6, 8], [2, 1, 1]] },
      gridPointers: { memo: [["r", "c"]] },
      focus: ["memo"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture each cell as a hill with a certain elevation. You are only allowed to walk uphill to strictly higher neighbours. Since you can only walk uphill, you can never loop back to a cell you've visited before: no cycles exist! From each cell, the longest uphill walk is 1 plus the maximum of the longest uphill walks from its higher neighbours. Once you calculate that value for a cell, write it down in `memo` so you never re-walk it.",
      edgeCases: [
        "1x1 matrix `[[1]]`: no moves possible, longest path is 1.",
        "All equal values like `[[2, 2], [2, 2]]`: strictly increasing paths cannot move anywhere, answer is 1.",
        "Spiral increasing path: winding path that visits all cells in order, answer is m * n.",
      ],
      stepByStepWalkthrough: [
        "**Initialize memo table.** Create `memo = [[0] * COLS for _ in range(ROWS)]`.",
        "**Define DFS helper.** `dfs(r, c)` returns the longest increasing path starting at cell `(r, c)`.",
        "**Check memo.** If `memo[r][c] != 0`, return `memo[r][c]` immediately.",
        "**Explore 4 neighbours.** Start `best = 1`. For each direction `(dr, dc)`: if neighbor `(nr, nc)` is in bounds and `matrix[nr][nc] > matrix[r][c]`, update `best = max(best, 1 + dfs(nr, nc))`.",
        "**Save to memo.** Store `memo[r][c] = best` and return `best`.",
        "**Find matrix maximum.** Loop over every cell in `matrix` and find `max(dfs(r, c))`.",
      ],
    },
    hints: {
      conceptual:
        "Can a path ever loop back on itself if every step must be strictly increasing? No! That means you can use simple DFS with memoization without needing a 'visited' set.",
      structural:
        "Create a 2-D `memo` grid initialized to 0. Write a helper `dfs(r, c)` that checks 4 directions. If neighbour is in bounds and greater, take `1 + dfs(nr, nc)`. Store in `memo[r][c]`. In the main function, call `dfs` on all cells and return the max.",
    },
    commonMistakes: [
      "Using `>=` instead of `>`: the path must be *strictly* increasing.",
      "Trying to solve with standard bottom-up topological sort instead of DFS with memoization (which is much simpler to write and debug).",
      "Forgetting to initialize `best = 1`: a cell alone without any valid moves has path length 1.",
    ],
    starterCode: `def longest_increasing_path(matrix: list[list[int]]) -> int:
    # Find the length of the longest strictly increasing path in matrix.
    # Tip: DFS with memoization; strictly increasing steps guarantee no cycles.
    pass
`,
    optimalSolution: `def longest_increasing_path(matrix: list[list[int]]) -> int:
    ROWS, COLS = len(matrix), len(matrix[0])
    # memo[r][c] = length of longest increasing path starting at (r, c)
    memo = [[0] * COLS for _ in range(ROWS)]

    def dfs(r: int, c: int) -> int:
        # Return already computed answer
        if memo[r][c] != 0:
            return memo[r][c]

        # The cell itself is a path of length 1
        best = 1
        # Check all 4 orthogonal neighbours
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            # Move only to strictly greater neighbours inside grid bounds
            if 0 <= nr < ROWS and 0 <= nc < COLS and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))

        # Store in memo table
        memo[r][c] = best
        return best

    res = 0
    # The longest path can start from any cell in the matrix
    for r in range(ROWS):
        for c in range(COLS):
            res = max(res, dfs(r, c))

    return res
`,
    bruteForceSolution: `def longest_increasing_path(matrix: list[list[int]]) -> int:
    ROWS, COLS = len(matrix), len(matrix[0])

    def dfs(r: int, c: int) -> int:
        best = 1
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < ROWS and 0 <= nc < COLS and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))
        return best

    return max(dfs(r, c) for r in range(ROWS) for c in range(COLS))
`,
    harness: { kind: "function", entry: "longest_increasing_path" },
    testCases: [
      { input: { matrix: [[9, 9, 4], [6, 6, 8], [2, 1, 1]] }, expected: 4, description: "The longest increasing path is [1, 2, 6, 9], length 4." },
      { input: { matrix: [[3, 4, 5], [3, 2, 6], [2, 2, 1]] }, expected: 4, description: "The longest increasing path is [3, 4, 5, 6], length 4." },
      { input: { matrix: [[1]] }, expected: 1, description: "Single cell has path length 1." },
      { input: { matrix: [[1, 2], [3, 4]] }, expected: 3 },
      { input: { matrix: [[7, 8, 9], [9, 7, 6], [7, 2, 3]] }, expected: 6 },
      { input: { matrix: [[1, 2, 3, 4], [8, 7, 6, 5]] }, expected: 8 },
    ],
  },

  // ------------------------------------------------------------------ distinct-subsequences
  {
    id: "distinct-subsequences",
    summary:
      "Given two strings `s` and `t`, return the number of distinct **subsequences of `s`** that equal `t`. A subsequence is formed by deleting zero or more characters from `s` without changing the relative order of the remaining characters.",
    constraints: [
      "1 ≤ len(s), len(t) ≤ 1000",
      "`s` and `t` consist of English letters",
      "The answer fits in a 32-bit signed integer",
    ],
    pattern: "2-D DP: matching target prefix t[:j] in source prefix s[:i]",
    timeComplexity: {
      bruteForce: "O(2^(len(s)))",
      optimal: "O(m · n)",
      explanation:
        "Where m = len(s) and n = len(t). Trying all subsequences is exponential. A 2-D DP table calculates matching counts for each prefix pair in O(m · n) time.",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "A 2-D table of size (len(s) + 1) × (len(t) + 1).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp = [[0] * (n + 1) for _ in range(m + 1)]",
        plainEnglishExplanation:
          "Allocates an `(m + 1) x (n + 1)` 2-D grid filled with zeros.",
        exampleSnippet: "print([[0] * 3 for _ in range(2)])",
        whyWeUseItHere:
          "`dp[i][j]` records the number of distinct subsequences of `s[:i]` that match `t[:j]`.",
      },
      {
        keywordOrMethod: "dp[i][j] = dp[i - 1][j]",
        plainEnglishExplanation:
          "Carries forward the ways to form `t[:j]` without using the newest character `s[i - 1]`.",
        exampleSnippet: "dp = [[1, 0], [1, 0]]\ndp[1][1] = dp[0][1]\nprint(dp[1][1])",
        whyWeUseItHere:
          "We can always choose to skip character `s[i - 1]`.",
      },
      {
        keywordOrMethod: "dp[i][j] += dp[i - 1][j - 1]",
        plainEnglishExplanation:
          "When `s[i - 1] == t[j - 1]`, we add the ways that match `s[i - 1]` to `t[j - 1]`.",
        exampleSnippet: "val = 2\nval += 3\nprint(val)",
        whyWeUseItHere:
          "Combines the ways that use the matched character with the ways that skip it.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { s: "rabbbit", t: "rabbit" },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Suppose you want to form target string `t` using characters from `s`. Looking at the latest character `s[i - 1]`, you always have the option to ignore it: the number of ways is `dp[i - 1][j]`. If `s[i - 1]` happens to match `t[j - 1]`, you have a second option: use it to match `t[j - 1]`, which adds all the ways `s[:i - 1]` could form `t[:j - 1]` (`dp[i - 1][j - 1]`). Summing both options gives the complete count.",
      edgeCases: [
        "`len(t) > len(s)`: impossible to form a longer target from a shorter source, returns 0.",
        "`t` is empty: an empty target can always be formed in exactly 1 way (by deleting everything).",
        "No common characters: count stays 0.",
      ],
      stepByStepWalkthrough: [
        "**Dimensions.** Let `m = len(s)` and `n = len(t)`.",
        "**Create DP grid.** Allocate `dp = [[0] * (n + 1) for _ in range(m + 1)]`.",
        "**Base case.** For all `i` from `0` to `m`, set `dp[i][0] = 1` because matching an empty target `t[:0]` always has 1 way.",
        "**Fill table.** Loop `i` from 1 to `m` and `j` from 1 to `n`.",
        "**Option 1: skip.** Always set `dp[i][j] = dp[i - 1][j]`.",
        "**Option 2: match.** If `s[i - 1] == t[j - 1]`, add `dp[i - 1][j - 1]` to `dp[i][j]`.",
        "**Return answer.** Return `dp[m][n]`.",
      ],
    },
    hints: {
      conceptual:
        "At each character of s, you can either ignore it (matching t using only earlier characters of s), or if it matches the current character of t, pair them up.",
      structural:
        "Create an `(len(s) + 1) x (len(t) + 1)` table. Fill column 0 with 1s. Loop `for i in range(1, len(s) + 1):` and `for j in range(1, len(t) + 1):`. Set `dp[i][j] = dp[i - 1][j]`, and if `s[i - 1] == t[j - 1]`, add `dp[i - 1][j - 1]`. Return `dp[m][n]`.",
    },
    commonMistakes: [
      "Forgetting to initialize column 0 to 1: without the empty string base case, all counts remain 0.",
      "Overwriting `dp[i][j] = dp[i - 1][j - 1]` on a match instead of adding `dp[i - 1][j]`: you must include both using and skipping `s[i - 1]`.",
    ],
    starterCode: `def num_distinct(s: str, t: str) -> int:
    # Count the number of distinct subsequences of s that equal t.
    # Tip: at each character of s, you can either skip it or pair it (if matching).
    pass
`,
    optimalSolution: `def num_distinct(s: str, t: str) -> int:
    m, n = len(s), len(t)
    # dp[i][j] = number of distinct subsequences of s[:i] that equal t[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # An empty target string t[:0] can always be formed in exactly 1 way
    for i in range(m + 1):
        dp[i][0] = 1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # Option 1: skip character s[i - 1]
            dp[i][j] = dp[i - 1][j]
            # Option 2: if characters match, pair s[i - 1] with t[j - 1]
            if s[i - 1] == t[j - 1]:
                dp[i][j] += dp[i - 1][j - 1]

    # Full string s against full string t
    return dp[m][n]
`,
    bruteForceSolution: `def num_distinct(s: str, t: str) -> int:
    memo = {}

    def dfs(i: int, j: int) -> int:
        if j == len(t):
            return 1
        if i == len(s):
            return 0
        state = (i, j)
        if state in memo:
            return memo[state]

        # Skip s[i]
        res = dfs(i + 1, j)
        # Pair s[i] if it matches t[j]
        if s[i] == t[j]:
            res += dfs(i + 1, j + 1)

        memo[state] = res
        return res

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "num_distinct" },
    testCases: [
      { input: { s: "rabbbit", t: "rabbit" }, expected: 3, description: "Three distinct ways to choose which 'b' to skip in 'rabbbit'." },
      { input: { s: "babgbag", t: "bag" }, expected: 5, description: "5 distinct subsequences of 'babgbag' spell 'bag'." },
      { input: { s: "a", t: "b" }, expected: 0, description: "Cannot form 'b' from 'a'." },
      { input: { s: "a", t: "a" }, expected: 1 },
      { input: { s: "ananas", t: "ana" }, expected: 4 },
      { input: { s: "ddd", t: "dd" }, expected: 3 },
    ],
  },

  // ------------------------------------------------------------------ edit-distance
  {
    id: "edit-distance",
    summary:
      "Given two strings `word1` and `word2`, return the **minimum number of operations** required to convert `word1` into `word2`. You have three allowed operations: **insert** a character, **delete** a character, or **replace** a character.",
    constraints: [
      "0 ≤ len(word1), len(word2) ≤ 500",
      "`word1` and `word2` consist of lowercase English letters",
    ],
    pattern: "2-D DP: minimum edits between prefixes word1[:i] and word2[:j]",
    timeComplexity: {
      bruteForce: "O(3^(m+n))",
      optimal: "O(m · n)",
      explanation:
        "Where m = len(word1) and n = len(word2). Plain recursion branches three ways at every non-matching character. The 2-D DP table has (m + 1) × (n + 1) cells, each evaluated in O(1) time.",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "A 2-D table of size (len(word1) + 1) × (len(word2) + 1) storing edit counts.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "min(insert, delete, replace)",
        plainEnglishExplanation:
          "`min` accepts three or more values and returns the smallest one.",
        exampleSnippet: "print(min(3, 1, 4))",
        whyWeUseItHere:
          "Picks the cheapest of the three editing operations (insert, delete, or replace).",
      },
      {
        keywordOrMethod: "dp[i][0] = i and dp[0][j] = j",
        plainEnglishExplanation:
          "Sets up the base cases: turning a word of length `i` into an empty string takes `i` deletions; turning an empty string into a word of length `j` takes `j` insertions.",
        exampleSnippet: "dp = [[0] * 3 for _ in range(3)]\nfor i in range(3): dp[i][0] = i\nfor j in range(3): dp[0][j] = j\nprint(dp)",
        whyWeUseItHere:
          "Populates boundary row 0 and column 0 before running the nested loops.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { word1: "horse", word2: "ros" },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Compare the final characters `word1[i - 1]` and `word2[j - 1]`. If they already match, great! No new edit is needed, and the cost is just `dp[i - 1][j - 1]`. If they differ, you must pay 1 edit. You have three choices: delete `word1[i - 1]` (leaving `word1[:i - 1]` vs `word2[:j]`), insert `word2[j - 1]` (leaving `word1[:i]` vs `word2[:j - 1]`), or replace `word1[i - 1]` with `word2[j - 1]` (leaving `word1[:i - 1]` vs `word2[:j - 1]`). Take the minimum of those three options plus 1.",
      edgeCases: [
        "Both strings empty: 0 operations.",
        "One string empty: cost equals the length of the other string (all insertions or all deletions).",
        "Identical strings: cost is 0 since all characters match.",
      ],
      stepByStepWalkthrough: [
        "**Grid allocation.** Create `dp = [[0] * (n + 1) for _ in range(m + 1)]` where `m = len(word1)` and `n = len(word2)`.",
        "**Base row and column.** Set `dp[i][0] = i` (deletions) and `dp[0][j] = j` (insertions).",
        "**Nested loops.** Loop `i` from 1 to `m` and `j` from 1 to `n`.",
        "**Match case.** If `word1[i - 1] == word2[j - 1]`, `dp[i][j] = dp[i - 1][j - 1]`.",
        "**Differ case.** Otherwise, `dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])`.",
        "**Return answer.** Return `dp[m][n]`.",
      ],
    },
    hints: {
      conceptual:
        "If the last characters match, the edit distance is the same as without them. If they don't match, you can insert, delete, or replace. What subproblems do those three actions lead to?",
      structural:
        "Use an `(m + 1) x (n + 1)` table. Fill row 0 with `0..n` and column 0 with `0..m`. For each `(i, j)`, if characters match, copy diagonal `dp[i-1][j-1]`. Else, take `1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])`.",
    },
    commonMistakes: [
      "Adding 1 when characters match: if `word1[i - 1] == word2[j - 1]`, the cost is simply `dp[i - 1][j - 1]` with no extra +1.",
      "Mixing up insert and delete coordinates: `dp[i][j - 1]` corresponds to insert in word1; `dp[i - 1][j]` corresponds to delete from word1.",
    ],
    starterCode: `def min_distance(word1: str, word2: str) -> int:
    # Return the minimum operations (insert, delete, replace) to convert word1 to word2.
    # Tip: dp[i][j] = min edits between word1[:i] and word2[:j].
    pass
`,
    optimalSolution: `def min_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    # dp[i][j] = min operations to convert word1[:i] to word2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Converting word1[:i] to an empty string requires i deletions
    for i in range(m + 1):
        dp[i][0] = i
    # Converting an empty string to word2[:j] requires j insertions
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                # Characters already match: no new operation needed
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # 1 + min of:
                # dp[i][j - 1]: insert character into word1
                # dp[i - 1][j]: delete character from word1
                # dp[i - 1][j - 1]: replace character in word1
                dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])

    # Minimum edits to convert entire word1 to word2
    return dp[m][n]
`,
    bruteForceSolution: `def min_distance(word1: str, word2: str) -> int:
    memo = {}

    def dfs(i: int, j: int) -> int:
        if i == len(word1):
            return len(word2) - j
        if j == len(word2):
            return len(word1) - i
        state = (i, j)
        if state in memo:
            return memo[state]

        if word1[i] == word2[j]:
            res = dfs(i + 1, j + 1)
        else:
            res = 1 + min(dfs(i, j + 1), dfs(i + 1, j), dfs(i + 1, j + 1))

        memo[state] = res
        return res

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "min_distance" },
    testCases: [
      { input: { word1: "horse", word2: "ros" }, expected: 3, description: "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e'): 3 edits." },
      { input: { word1: "intention", word2: "execution" }, expected: 5, description: "5 operations: replace 'i', replace 'n', replace 't', insert 'c', replace 'n'." },
      { input: { word1: "", word2: "" }, expected: 0, description: "Both strings are already empty." },
      { input: { word1: "a", word2: "" }, expected: 1 },
      { input: { word1: "", word2: "abc" }, expected: 3 },
      { input: { word1: "sea", word2: "eat" }, expected: 2 },
      { input: { word1: "plasma", word2: "altruism" }, expected: 6 },
    ],
  },

  // ------------------------------------------------------------------ burst-balloons
  {
    id: "burst-balloons",
    summary:
      "You are given `n` balloons indexed from `0` to `n - 1`. Each balloon is painted with a number `nums[i]`. When you burst balloon `i`, you receive `nums[i - 1] * nums[i] * nums[i + 1]` coins. Out-of-bounds indices are treated as virtual balloons with value `1`. Return the **maximum coins** you can collect by bursting all balloons.",
    constraints: [
      "1 ≤ len(nums) ≤ 300",
      "0 ≤ nums[i] ≤ 100",
    ],
    pattern: "Interval DP: think backwards about which balloon is burst LAST in range [l, r]",
    timeComplexity: {
      bruteForce: "O(n!)",
      optimal: "O(n³)",
      explanation:
        "Trying all burst order permutations takes factorial O(n!) time. Working backwards with interval DP over all interval lengths and choosing which balloon k is burst last in [l, r] takes O(n³) time.",
    },
    spaceComplexity: {
      optimal: "O(n²)",
      explanation:
        "A 2-D DP table of size (n + 2) × (n + 2) storing max coins for each sub-interval.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "balloons = [1] + nums + [1]",
        plainEnglishExplanation:
          "Concatenates `[1]` at the front and `[1]` at the back of `nums`, providing the boundary values without special `if` statements.",
        exampleSnippet: "nums = [3, 1, 5]\nprint([1] + nums + [1])",
        whyWeUseItHere:
          "Out-of-bounds neighbours count as 1, so adding boundary 1s makes calculations uniform.",
      },
      {
        keywordOrMethod: "for length in range(1, n + 1):",
        plainEnglishExplanation:
          "Iterates over subproblem interval lengths from 1 balloon up to all `n` balloons.",
        exampleSnippet: "for length in range(1, 4):\n    print('Length:', length)",
        whyWeUseItHere:
          "Interval DP requires solving shorter sub-intervals before longer intervals that depend on them.",
      },
      {
        keywordOrMethod: "for k in range(l, r + 1):",
        plainEnglishExplanation:
          "Tests each balloon `k` inside the current range `[l, r]` as the *last* balloon to be burst in that range.",
        exampleSnippet: "l, r = 1, 3\nfor k in range(l, r + 1):\n    print(k)",
        whyWeUseItHere:
          "If balloon `k` is burst last in `[l, r]`, its adjacent surviving neighbours are guaranteed to be `balloons[l - 1]` and `balloons[r + 1]`.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [3, 1, 5, 8] },
      pointers: { balloons: ["l", "r"] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "If you think about bursting the first balloon, it removes a barrier between its neighbours, coupling the remaining subproblems in a messy way. The breakthrough is to think in reverse: which balloon is burst LAST in range `[l, r]`? If balloon `k` is the very last balloon to pop in `[l, r]`, all other balloons between `l` and `r` are already gone. Therefore, balloon `k`'s neighbours at that moment MUST be `balloons[l - 1]` and `balloons[r + 1]`! This cleanly separates the problem into two completely independent subproblems: bursting everything in `[l, k - 1]` and bursting everything in `[k + 1, r]`.",
      edgeCases: [
        "Single balloon `[7]`: coins collected is `1 * 7 * 1 = 7`.",
        "Two balloons `[1, 5]`: burst 1 first (1*1*5=5) then 5 (1*5*1=5), total = 10.",
        "Balloons with value 0: popping them earns 0 coins from that pop, but may allow neighbours to multiply.",
      ],
      stepByStepWalkthrough: [
        "**Pad boundaries.** Form `balloons = [1] + nums + [1]` of length `n + 2`.",
        "**Create DP grid.** Allocate `dp = [[0] * (n + 2) for _ in range(n + 2)]`.",
        "**Loop by interval length.** Loop `length` from 1 to `n`.",
        "**Loop interval start.** Loop `l` from 1 to `n - length + 1`, setting `r = l + length - 1`.",
        "**Pick last balloon k.** Loop `k` from `l` to `r`. Coins earned by popping `k` last is `balloons[l - 1] * balloons[k] * balloons[r + 1] + dp[l][k - 1] + dp[k + 1][r]`.",
        "**Maximize.** `dp[l][r] = max(dp[l][r], coins)`.",
        "**Return total.** Return `dp[1][n]`.",
      ],
    },
    hints: {
      conceptual:
        "Thinking forward about which balloon to burst first makes subproblems dependent. What happens if you think backwards: which balloon is burst LAST in the range?",
      structural:
        "Pad `nums` with 1 on both sides. Use an interval DP table `dp[l][r]`. Loop by length from 1 to n, then by left endpoint l, and iterate `k` from l to r testing `balloons[l-1]*balloons[k]*balloons[r+1] + dp[l][k-1] + dp[k+1][r]`. Return `dp[1][n]`.",
    },
    commonMistakes: [
      "Greedy bursting: popping the smallest balloon first does not always yield the optimal product.",
      "Thinking forward instead of backward: attempting to pick the first popped balloon leaves boundaries that depend on future choices.",
    ],
    starterCode: `def max_coins(nums: list[int]) -> int:
    # Return the maximum coins collected by bursting all balloons.
    # Tip: interval DP thinking backwards: which balloon in [l, r] is burst LAST?
    pass
`,
    optimalSolution: `def max_coins(nums: list[int]) -> int:
    # Add virtual boundary balloons with value 1 on both ends
    balloons = [1] + nums + [1]
    n = len(nums)
    # dp[l][r] = max coins from bursting all balloons in range l..r
    dp = [[0] * (n + 2) for _ in range(n + 2)]

    # Solve subproblems by interval length from 1 up to n
    for length in range(1, n + 1):
        for l in range(1, n - length + 2):
            r = l + length - 1
            # Try bursting balloon k LAST in the range [l, r]
            for k in range(l, r + 1):
                # When k is last to burst in [l, r], its neighbours are l - 1 and r + 1
                coins = balloons[l - 1] * balloons[k] * balloons[r + 1]
                coins += dp[l][k - 1] + dp[k + 1][r]
                dp[l][r] = max(dp[l][r], coins)

    # Max coins from bursting all balloons from index 1 to n
    return dp[1][n]
`,
    bruteForceSolution: `def max_coins(nums: list[int]) -> int:
    balloons = [1] + nums + [1]
    memo = {}

    def dfs(l: int, r: int) -> int:
        if l > r:
            return 0
        state = (l, r)
        if state in memo:
            return memo[state]

        best = 0
        for k in range(l, r + 1):
            coins = balloons[l - 1] * balloons[k] * balloons[r + 1] + dfs(l, k - 1) + dfs(k + 1, r)
            best = max(best, coins)

        memo[state] = best
        return best

    return dfs(1, len(nums))
`,
    harness: { kind: "function", entry: "max_coins" },
    testCases: [
      { input: { nums: [3, 1, 5, 8] }, expected: 167, description: "Burst 1 (3*1*5=15), then 5 (3*5*8=120), then 3 (1*3*8=24), then 8 (1*8*1=8): 15 + 120 + 24 + 8 = 167." },
      { input: { nums: [1, 5] }, expected: 10, description: "Burst 1 then 5: 1*1*5 + 1*5*1 = 10." },
      { input: { nums: [7] }, expected: 7, description: "Single balloon: 1 * 7 * 1 = 7." },
      { input: { nums: [9, 76] }, expected: 760 },
      { input: { nums: [8, 2, 6, 8] }, expected: 552 },
      { input: { nums: [3, 1, 5] }, expected: 35 },
    ],
  },

  // ------------------------------------------------------------------ regular-expression-matching
  {
    id: "regular-expression-matching",
    summary:
      "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'`. `'.'` matches any single character. `'*'` matches **zero or more** of the preceding element. The match must cover the **entire** input string (not just a portion).",
    constraints: [
      "1 ≤ len(s) ≤ 20",
      "1 ≤ len(p) ≤ 20",
      "`s` contains only lowercase English letters",
      "`p` contains only lowercase English letters, `'.'`, and `'*'",
      "Each `'*'` is guaranteed to follow a valid preceding character",
    ],
    pattern: "2-D DP: pattern matching table handling '.' and '*'",
    timeComplexity: {
      bruteForce: "O(2^(m+n))",
      optimal: "O(m · n)",
      explanation:
        "Where m = len(s) and n = len(p). Plain recursion branches on every '*' between zero occurrences and matching one more. A 2-D DP table calculates (m + 1) × (n + 1) states in O(m · n) time.",
    },
    spaceComplexity: {
      optimal: "O(m · n)",
      explanation:
        "A 2-D boolean grid of size (len(s) + 1) × (len(p) + 1).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dp[0][j] = dp[0][j - 2]",
        plainEnglishExplanation:
          "When pattern has `*` at position `j - 1`, matching zero occurrences of the preceding character means copying the match state from `j - 2`.",
        exampleSnippet: "dp = [True, False, False]\n# simulating 'a*'\ndp[2] = dp[0]\nprint(dp[2])",
        whyWeUseItHere:
          "Handles patterns like `'a*'` or `'a*b*'` that can match an empty string.",
      },
      {
        keywordOrMethod: "p[j - 2] == s[i - 1] or p[j - 2] == '.'",
        plainEnglishExplanation:
          "Checks if the character preceding `*` matches the current string character `s[i - 1]` or is the wildcard `'.'`. ",
        exampleSnippet: "char = 'a'\npat = '.'\nprint(pat == char or pat == '.')",
        whyWeUseItHere:
          "Determines if `*` is eligible to absorb character `s[i - 1]`.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { s: "aab", p: "c*a*b" },
      gridPointers: { dp: [["i", "j"]] },
      focus: ["dp"],
    },
    intuitiveExplanation: {
      intuition:
        "Build a grid where `dp[i][j]` is `True` if prefix `s[:i]` matches pattern `p[:j]`. When looking at `p[j - 1]`: if it is a regular letter or `'.'`, it matches `s[i - 1]` if characters match and `dp[i - 1][j - 1]` was `True`. If `p[j - 1]` is `'*'`, you have two choices: treat `'*'` as matching ZERO of the preceding character (`dp[i][j - 2]`), or if the preceding character matches `s[i - 1]`, treat `'*'` as matching ONE OR MORE of it (`dp[i - 1][j]`).",
      edgeCases: [
        "Pattern with `*` matching empty string, like `s = '', p = 'a*b*'`: evaluates to `True`.",
        "Wildcard `.*`: matches any sequence of characters.",
        "Characters preceding `*` do not match: `'*'` must be used as zero occurrences.",
      ],
      stepByStepWalkthrough: [
        "**Grid allocation.** Create `dp = [[False] * (n + 1) for _ in range(m + 1)]`.",
        "**Base case.** `dp[0][0] = True` (empty string matches empty pattern).",
        "**Initialize row 0.** For each index `j` from 2 to `n`: if `p[j - 1] == '*'`: set `dp[0][j] = dp[0][j - 2]`.",
        "**Nested loops.** Loop `i` from 1 to `m` and `j` from 1 to `n`.",
        "**Case 1: `*` symbol.** `dp[i][j] = dp[i][j - 2]` (zero occurrences). If preceding character matches (`p[j - 2] == s[i - 1] or p[j - 2] == '.'`), also OR with `dp[i - 1][j]` (one or more).",
        "**Case 2: single char or `.`:** If `p[j - 1] == s[i - 1] or p[j - 1] == '.'`, set `dp[i][j] = dp[i - 1][j - 1]`.",
        "**Return answer.** Return `dp[m][n]`.",
      ],
    },
    hints: {
      conceptual:
        "The hardest part is '*'. It can mean 0 of the preceding character (ignore both the '*' and the character before it), or it can mean 1+ of the preceding character (if the character matches, consume one from s and keep the pattern).",
      structural:
        "Create an `(m + 1) x (n + 1)` boolean table with `dp[0][0] = True`. Fill row 0 for `*` with `dp[0][j] = dp[0][j - 2]`. In nested loops, if `p[j - 1] == '*'`: `dp[i][j] = dp[i][j - 2]` or (if preceding character matches s[i-1]) `dp[i - 1][j]`. Else if characters match, copy diagonal `dp[i - 1][j - 1]`.",
    },
    commonMistakes: [
      "Treating '*' as matching any sequence by itself (like shell globbing): in regex, '*' modifies the character immediately preceding it.",
      "Forgetting to initialize row 0 for patterns like `a*b*`: an empty string can match non-empty patterns with zero-occurrence stars.",
      "Checking `dp[i - 1][j - 1]` for 1+ star matches instead of `dp[i - 1][j]`: the pattern stays at `j` so the star can match multiple characters.",
    ],
    starterCode: `def is_match(s: str, p: str) -> bool:
    # Return True if s matches pattern p supporting '.' and '*'.
    # Tip: '.' matches any single character; '*' matches zero or more of preceding char.
    pass
`,
    optimalSolution: `def is_match(s: str, p: str) -> bool:
    m, n = len(s), len(p)
    # dp[i][j] = True if s[:i] matches pattern p[:j]
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    # Base case: empty string matches empty pattern
    dp[0][0] = True

    # Patterns like a*, a*b*, or a*b*c* can match empty string s[:0]
    for j in range(2, n + 1):
        if p[j - 1] == "*":
            dp[0][j] = dp[0][j - 2]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == "*":
                # Option A: zero occurrences of preceding character
                dp[i][j] = dp[i][j - 2]
                # Option B: one or more occurrences (if preceding character matches s[i - 1])
                if p[j - 2] == s[i - 1] or p[j - 2] == ".":
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            elif p[j - 1] == s[i - 1] or p[j - 1] == ".":
                # Single character match
                dp[i][j] = dp[i - 1][j - 1]

    return dp[m][n]
`,
    bruteForceSolution: `def is_match(s: str, p: str) -> bool:
    memo = {}

    def dfs(i: int, j: int) -> bool:
        if j == len(p):
            return i == len(s)
        state = (i, j)
        if state in memo:
            return memo[state]

        first_match = i < len(s) and (p[j] == s[i] or p[j] == ".")

        if j + 1 < len(p) and p[j + 1] == "*":
            # Zero occurrences of p[j], or (if first matches) consume s[i]
            res = dfs(i, j + 2) or (first_match and dfs(i + 1, j))
        else:
            res = first_match and dfs(i + 1, j + 1)

        memo[state] = res
        return res

    return dfs(0, 0)
`,
    harness: { kind: "function", entry: "is_match" },
    testCases: [
      { input: { s: "aa", p: "a" }, expected: false, description: "'a' does not match the entire string 'aa'." },
      { input: { s: "aa", p: "a*" }, expected: true, description: "'*' means zero or more of preceding 'a'." },
      { input: { s: "ab", p: ".*" }, expected: true, description: "'.*' matches any string." },
      { input: { s: "aab", p: "c*a*b" }, expected: true, description: "'c*' matches zero 'c's, 'a*' matches two 'a's, 'b' matches 'b'." },
      { input: { s: "mississippi", p: "mis*is*p*." }, expected: false },
      { input: { s: "ab", p: ".*c" }, expected: false },
      { input: { s: "aaa", p: "a*a" }, expected: true },
    ],
  },
];

export default problems;
