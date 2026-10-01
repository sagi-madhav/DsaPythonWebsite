import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ binary-search
  {
    id: "binary-search",
    summary:
      "You get a list `nums` that is already sorted from smallest to largest (no number appears twice) and a number `target`. Return the **position (index)** where `target` sits in the list, or `-1` if it isn't there. The catch: your method should take about **log n** steps, not look at every number.",
    constraints: [
      "1 ≤ len(nums) ≤ 10,000",
      "nums is sorted in ascending order and all values are different",
      "-10,000 < nums[i], target < 10,000",
      "Aim for O(log n) time",
    ],
    pattern: "Classic binary search: halve the search area each step",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(log n)",
      explanation:
        "Brute force checks every number one by one, so a list of n numbers can take n checks. Binary search throws away half of the remaining numbers on every loop. Starting from n, after 1 step n/2 are left, then n/4, n/8... Halving 10,000 numbers reaches 1 after only about 14 steps. 'How many times can I halve n?' is exactly what log₂ n means, so the time is O(log n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep three whole numbers (`l`, `r`, `mid`) no matter how long the list is. We never copy the list.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "r = len(nums) - 1",
        plainEnglishExplanation:
          "`len(nums)` counts how many items are in the list. Python numbers positions starting at **0**, so a list of 6 items has positions 0 to 5. That's why the last position is `len(nums) - 1`.",
        exampleSnippet: "nums = [10, 20, 30]\nprint(len(nums))\nprint(len(nums) - 1)\nprint(nums[len(nums) - 1])",
        whyWeUseItHere:
          "`l` starts at the first position (0) and `r` at the last position, so together they cover the whole list.",
      },
      {
        keywordOrMethod: "while l <= r:",
        plainEnglishExplanation:
          "A `while` loop repeats its indented block over and over *as long as* the condition is `True`. It checks the condition before every round. `<=` means 'less than or equal to'.",
        exampleSnippet: "count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint('liftoff')",
        whyWeUseItHere:
          "While `l <= r` there is still at least one number left between the two edges that could be the target. When `l` passes `r`, the search area is empty.",
      },
      {
        keywordOrMethod: "mid = (l + r) // 2",
        plainEnglishExplanation:
          "`//` is *floor division*: divide, then throw away anything after the decimal point. `7 / 2` is `3.5`, but `7 // 2` is `3`. List positions must be whole numbers, so we need `//`.",
        exampleSnippet: "print(7 / 2)\nprint(7 // 2)\nprint((0 + 5) // 2)",
        whyWeUseItHere:
          "It gives the position halfway between `l` and `r` as a whole number we can use as an index.",
      },
      {
        keywordOrMethod: "if ... elif ... else:",
        plainEnglishExplanation:
          "`if` runs its block when its condition is true. `elif` (short for 'else if') is checked only when the earlier conditions were false. `else` catches everything that's left. Exactly one of the three blocks runs.",
        exampleSnippet: "guess = 7\nsecret = 4\nif guess == secret:\n    print('correct')\nelif guess < secret:\n    print('too low')\nelse:\n    print('too high')",
        whyWeUseItHere:
          "The middle number is either the target, too small, or too big, and each case needs a different move.",
      },
      {
        keywordOrMethod: "return mid / return -1",
        plainEnglishExplanation:
          "`return` hands a value back to whoever called the function and stops the function right there. Any code after it in the function doesn't run.",
        exampleSnippet: "def first_even(nums):\n    for n in nums:\n        if n % 2 == 0:\n            return n\n    return -1\n\nprint(first_even([3, 8, 5]))\nprint(first_even([1, 3]))",
        whyWeUseItHere:
          "As soon as we find the target we return its index. If the loop finishes without finding it, we return `-1` to say 'not here'.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [-1, 0, 3, 5, 9, 12, 15, 20], target: 15 },
      pointers: { nums: ["l", "mid", "r"] },
      focus: ["l", "mid", "r"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of the 'guess my number between 1 and 100' game. Nobody guesses 1, 2, 3... A smart player guesses 50. If the answer is 'higher', every number from 1 to 50 is ruled out in one go. Then they guess 75, and so on. Each guess cuts the remaining choices in half. A sorted list works the same way: look at the middle number. If it's too small, the target can only be to its right, so you throw away the whole left half. If it's too big, throw away the right half. Two markers, `l` and `r`, remember which part of the list is still in play.",
      edgeCases: [
        "A list with one number: `l` and `r` both start at 0, so `mid` is 0 and we check that single number.",
        "The target is smaller than everything (or bigger than everything): the search area keeps shrinking toward one end until `l > r`, and we return `-1`.",
        "The target is at the very first or very last position: the loop still finds it, it just takes the full number of halvings.",
      ],
      stepByStepWalkthrough: [
        "Put `l` at position 0 and `r` at the last position. Everything between them (inclusive) might contain the target.",
        "While `l <= r`, compute the middle position `mid = (l + r) // 2`.",
        "If `nums[mid] == target`, we found it: return `mid`.",
        "If `nums[mid] < target`, the target must be to the right, so move `l` to `mid + 1`.",
        "Otherwise the middle is too big, so move `r` to `mid - 1`.",
        "If the loop ends because `l` passed `r`, nothing is left to check: return `-1`.",
      ],
    },
    hints: {
      conceptual:
        "Because the list is sorted, looking at just ONE number tells you a lot: if it's smaller than the target, every number to its left is smaller too. How can you use that to rule out half the list with a single comparison?",
      structural:
        "Keep two indices `l = 0` and `r = len(nums) - 1`. Loop `while l <= r:`, compute `mid = (l + r) // 2`, compare `nums[mid]` with `target`, and move either `l = mid + 1` or `r = mid - 1`.",
    },
    commonMistakes: [
      "Writing `while l < r:` instead of `while l <= r:`. When `l == r` there is still one number left to check, and skipping it misses targets like `[5]` with target 5.",
      "Moving `l = mid` or `r = mid` instead of `mid + 1` / `mid - 1`. Since we already checked `mid`, keeping it can make the loop spin forever on two numbers.",
      "Using `/` instead of `//` for the middle. `/` gives a decimal like `2.5`, and `nums[2.5]` is an error.",
      "Starting `r` at `len(nums)` instead of `len(nums) - 1`, which can read past the end of the list.",
    ],
    starterCode: `def search(nums: list[int], target: int) -> int:
    # Return the index of target in the sorted list, or -1 if it's missing.
    # Tip: look at the middle element and throw away the half that can't contain target.
    pass
`,
    optimalSolution: `def search(nums: list[int], target: int) -> int:
    # l and r mark the edges of the part of the list that could still hold target
    l = 0
    r = len(nums) - 1

    # Keep going while the search area still has at least one number in it
    while l <= r:
        # Look at the number in the middle of the search area
        mid = (l + r) // 2

        # Did we land right on the target?
        if nums[mid] == target:
            return mid  # Found it: its index is the answer
        # The middle number is too small...
        elif nums[mid] < target:
            # ...so the target can only be to the RIGHT of mid. Drop the left half.
            l = mid + 1
        # The middle number is too big...
        else:
            # ...so the target can only be to the LEFT of mid. Drop the right half.
            r = mid - 1

    # The search area shrank to nothing: target isn't in the list
    return -1
`,
    bruteForceSolution: `def search(nums: list[int], target: int) -> int:
    # Check every position one by one: O(n)
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1
`,
    harness: { kind: "function", entry: "search" },
    testCases: [
      {
        input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
        expected: 4,
        description: "9 sits at index 4. The first middle is index 2 (value 3), which is too small, so we search the right half and find 9.",
      },
      {
        input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 },
        expected: -1,
        description: "2 would belong between 0 and 3, but it isn't in the list, so the search area shrinks to nothing.",
      },
      {
        input: { nums: [5], target: 5 },
        expected: 0,
        description: "A single number: l and r both start at 0, and that one number is the target.",
      },
      { input: { nums: [5], target: -5 }, expected: -1 },
      { input: { nums: [1, 3, 5, 7, 9, 11, 13], target: 1 }, expected: 0, description: "The target is the very first number." },
      { input: { nums: [1, 3, 5, 7, 9, 11, 13], target: 13 }, expected: 6, description: "The target is the very last number." },
      { input: { nums: [-10, -5, -2, 0], target: -5 }, expected: 1, description: "Negative numbers work the same way." },
      { input: { nums: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], target: 21 }, expected: -1, description: "Bigger than everything in the list." },
      {
        input: { nums: Array.from({ length: 10000 }, (_, i) => i * 2 - 9999), target: 1 },
        expected: 5000,
        description: "10,000 numbers, found in about 14 halvings.",
      },
    ],
  },

  // ------------------------------------------------------------------ search-a-2d-matrix
  {
    id: "search-a-2d-matrix",
    summary:
      "You get a grid of numbers `matrix` (a list of rows) with two promises: each row is sorted from small to large, and the first number of every row is bigger than the last number of the row above it. Return `True` if `target` appears anywhere in the grid and `False` otherwise, using about **log(rows × columns)** steps.",
    constraints: [
      "1 ≤ rows, columns ≤ 100",
      "Each row is sorted, and each row starts with a number bigger than the previous row's last number",
      "-10,000 ≤ matrix[i][j], target ≤ 10,000",
    ],
    pattern: "Binary search on a grid treated as one long sorted list",
    timeComplexity: {
      bruteForce: "O(m · n)",
      optimal: "O(log(m · n))",
      explanation:
        "Brute force looks at all m × n cells. The two promises mean that if you read the grid row by row, left to right, you get one long sorted list of m × n numbers. Binary search on that list halves the remaining cells each loop, so it takes about log₂(m × n) loops. Each loop does a constant amount of work (one division, one remainder, one comparison).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We never actually build the long list. We only store a handful of whole numbers (`l`, `r`, `mid`, `row`, `col`).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "matrix[row][col]",
        plainEnglishExplanation:
          "A grid in Python is a *list of lists*: each inner list is one row. `matrix[1]` gives the whole second row, and `matrix[1][2]` then picks the third number in that row. So the first bracket picks the row, the second picks the column.",
        exampleSnippet: "grid = [[1, 2, 3],\n        [4, 5, 6]]\nprint(grid[1])\nprint(grid[1][2])",
        whyWeUseItHere:
          "After working out which row and column our middle position lands in, we read that cell with `matrix[row][col]`.",
      },
      {
        keywordOrMethod: "len(matrix) and len(matrix[0])",
        plainEnglishExplanation:
          "`len(matrix)` counts the inner lists, which is the number of rows. `len(matrix[0])` counts the numbers in the first row, which is the number of columns (all rows have the same length here).",
        exampleSnippet: "grid = [[1, 2, 3],\n        [4, 5, 6]]\nprint(len(grid))\nprint(len(grid[0]))",
        whyWeUseItHere:
          "We need the column count to convert positions, and rows × columns tells us how long the imaginary flat list is.",
      },
      {
        keywordOrMethod: "mid // cols and mid % cols",
        plainEnglishExplanation:
          "`a // b` divides and drops the decimal part (how many *full* groups of b fit in a). `a % b` (the *modulo* or remainder operator) gives what's left over. 7 // 4 is 1 and 7 % 4 is 3, because 7 = 1 × 4 + 3.",
        exampleSnippet: "print(7 // 4)\nprint(7 % 4)\nprint(11 // 4, 11 % 4)",
        whyWeUseItHere:
          "If each row holds `cols` numbers, position `mid` in the flat list is in row `mid // cols` (how many full rows come before it) and column `mid % cols` (how far into that row it is).",
      },
      {
        keywordOrMethod: "while l <= r:  with  mid = (l + r) // 2",
        plainEnglishExplanation:
          "`while` repeats its block as long as the condition stays `True`. `(l + r) // 2` is the whole-number middle between two positions.",
        exampleSnippet: "l, r = 0, 9\nwhile l <= r:\n    mid = (l + r) // 2\n    print(l, mid, r)\n    l = mid + 1",
        whyWeUseItHere:
          "This is the standard binary search loop: keep halving the range of possible positions until it is empty.",
      },
      {
        keywordOrMethod: "return True / return False",
        plainEnglishExplanation:
          "`True` and `False` (capitalized!) are Python's two *boolean* values, used for yes/no answers. `return` hands one back and ends the function.",
        exampleSnippet: "def is_big(n):\n    if n > 100:\n        return True\n    return False\n\nprint(is_big(500))\nprint(is_big(5))",
        whyWeUseItHere:
          "The question is yes/no: is the target in the grid?",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 16 },
      gridPointers: { matrix: [["row", "col"]] },
      focus: ["l", "mid", "r", "row", "col", "value"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture the grid as a book where each row is one line of text. Because every row starts bigger than the previous row ended, reading line after line gives one long sorted list, like a single sentence wrapped across lines. So we can do ordinary binary search on that long list without ever building it. The only trick is translating a position in the long list back to a spot on the page: if every line holds 4 numbers, position 6 is on line 6 // 4 = 1, at spot 6 % 4 = 2.",
      edgeCases: [
        "A 1 × 1 grid: the flat list has one position (0), which is checked once.",
        "A single row or a single column: the conversion still works (`cols` is 1 for a single column, so `row = mid` and `col = 0`).",
        "A target smaller than the top-left number or bigger than the bottom-right number: the search area shrinks to nothing and we return `False`.",
      ],
      stepByStepWalkthrough: [
        "Count `rows` and `cols`. The imaginary flat list has `rows * cols` numbers, at positions 0 to `rows * cols - 1`.",
        "Set `l = 0` and `r = rows * cols - 1`.",
        "While `l <= r`, pick `mid = (l + r) // 2`.",
        "Convert `mid` to a grid cell: `row = mid // cols`, `col = mid % cols`, and read `value = matrix[row][col]`.",
        "If `value == target`, return `True`. If it's too small, move `l = mid + 1`; if too big, move `r = mid - 1`.",
        "If the loop ends, the target isn't anywhere: return `False`.",
      ],
    },
    hints: {
      conceptual:
        "Read the grid row by row like a book. Thanks to the two promises, what kind of list do you get? Which algorithm do you already know for that kind of list?",
      structural:
        "Binary search over positions `0 .. rows * cols - 1`. Inside the `while l <= r:` loop, turn `mid` into `row = mid // cols` and `col = mid % cols` before comparing `matrix[row][col]` with the target.",
    },
    commonMistakes: [
      "Dividing by the number of rows instead of columns: `mid // rows` is wrong. Each row holds `cols` numbers, so it's `mid // cols` and `mid % cols`.",
      "Starting `r` at `rows * cols` instead of `rows * cols - 1`, which reads past the last cell.",
      "Searching every row with `in` (`target in row`): it gives the right answer but checks every cell, so it's O(m · n) instead of O(log(m · n)).",
    ],
    starterCode: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    # Return True if target is somewhere in the grid.
    # Tip: read row by row, the grid is one long sorted list. Can you binary search it?
    pass
`,
    optimalSolution: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    # How many rows and how many columns the grid has
    rows = len(matrix)
    cols = len(matrix[0])

    # Pretend the grid is one long sorted list of rows * cols numbers.
    # l and r are positions in that imaginary list.
    l = 0
    r = rows * cols - 1

    # Standard binary search: keep going while positions are left to check
    while l <= r:
        # The middle position of the imaginary list
        mid = (l + r) // 2
        # Translate it to the real grid: how many full rows come before it...
        row = mid // cols
        # ...and how far into that row it is
        col = mid % cols
        # Read the number in that cell
        value = matrix[row][col]

        # Found the target in the grid
        if value == target:
            return True
        # The middle number is too small: the target must be later in the list
        elif value < target:
            l = mid + 1
        # The middle number is too big: the target must be earlier in the list
        else:
            r = mid - 1

    # Every possible position was ruled out
    return False
`,
    bruteForceSolution: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    # Look at every cell: O(rows * cols)
    for row in matrix:
        for value in row:
            if value == target:
                return True
    return False
`,
    harness: { kind: "function", entry: "search_matrix" },
    testCases: [
      {
        input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 },
        expected: true,
        description: "3 is in the first row. Read row by row, the grid is [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60], and 3 is at flat position 1.",
      },
      {
        input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 },
        expected: false,
        description: "13 would fit between 11 and 16, but it isn't in the grid.",
      },
      {
        input: { matrix: [[1]], target: 1 },
        expected: true,
        description: "A 1 × 1 grid holding exactly the target.",
      },
      { input: { matrix: [[1]], target: 2 }, expected: false },
      { input: { matrix: [[1, 3]], target: 3 }, expected: true, description: "A single row." },
      { input: { matrix: [[1], [3], [5]], target: 5 }, expected: true, description: "A single column: every row has just one number." },
      { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 60 }, expected: true, description: "The very last cell." },
      { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 0 }, expected: false, description: "Smaller than everything." },
      { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 100 }, expected: false, description: "Bigger than everything." },
      { input: { matrix: [[-5, -3], [-1, 0], [2, 4]], target: -1 }, expected: true, description: "Negative numbers, found at the start of the middle row." },
    ],
  },

  // ------------------------------------------------------------------ koko-eating-bananas
  {
    id: "koko-eating-bananas",
    summary:
      "Koko has several piles of bananas, `piles[i]` bananas in pile `i`, and `h` hours before the guards return. She picks one eating speed `k` (bananas per hour). Each hour she eats up to `k` bananas from a single pile; if the pile has fewer, she finishes it and waits out the rest of that hour. Return the **smallest whole-number speed** `k` that lets her finish every pile within `h` hours.",
    constraints: [
      "1 ≤ len(piles) ≤ 10,000",
      "len(piles) ≤ h ≤ 1,000,000,000 (so there's always enough time at some speed)",
      "1 ≤ piles[i] ≤ 1,000,000,000",
    ],
    pattern: "Binary search on the answer (speed), not on an array",
    timeComplexity: {
      bruteForce: "O(max(piles) · n)",
      optimal: "O(n · log(max(piles)))",
      explanation:
        "Brute force tries speeds 1, 2, 3... up to the biggest pile, and for each speed adds up the hours over all n piles. Binary search instead halves the range of possible speeds each round, so it only tries about log₂(max(piles)) speeds (about 30 even for a billion). Each try still loops over all n piles once, giving n × log(max(piles)).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep a few numbers (`l`, `r`, `k`, `hours`, `res`). The piles list isn't copied.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "import math / math.ceil(pile / k)",
        plainEnglishExplanation:
          "`import math` loads Python's built-in math toolbox. `math.ceil(x)` rounds a number **up** to the next whole number (the 'ceiling'). `/` is ordinary division that can give a decimal.",
        exampleSnippet: "import math\nprint(7 / 3)\nprint(math.ceil(7 / 3))\nprint(math.ceil(6 / 3))",
        whyWeUseItHere:
          "A pile of 7 at speed 3 takes 3 hours (3, then 3, then the last 1). That's 7 / 3 = 2.33 rounded up. Even a tiny leftover costs a whole hour.",
      },
      {
        keywordOrMethod: "max(piles)",
        plainEnglishExplanation:
          "`max(some_list)` returns the largest value in the list.",
        exampleSnippet: "print(max([3, 6, 7, 11]))",
        whyWeUseItHere:
          "At a speed equal to the biggest pile, every pile takes exactly one hour. Going faster never helps, so that's the top of our search range.",
      },
      {
        keywordOrMethod: "for pile in piles:",
        plainEnglishExplanation:
          "A `for` loop visits each item in a list, one at a time. On each round the variable `pile` holds the current item.",
        exampleSnippet: "for pile in [3, 6, 7]:\n    print('pile has', pile)",
        whyWeUseItHere:
          "To test a speed we must add up the hours for every pile.",
      },
      {
        keywordOrMethod: "hours += math.ceil(pile / k)",
        plainEnglishExplanation:
          "`x += y` is shorthand for `x = x + y`: add `y` to whatever `x` already holds.",
        exampleSnippet: "total = 0\ntotal += 5\ntotal += 2\nprint(total)",
        whyWeUseItHere:
          "`hours` is a running total: we add each pile's hours to it.",
      },
      {
        keywordOrMethod: "while l <= r:  with  k = (l + r) // 2",
        plainEnglishExplanation:
          "`while` repeats while its condition is `True`. `//` divides and drops the decimal, so `(l + r) // 2` is the whole number halfway between `l` and `r`.",
        exampleSnippet: "l, r = 1, 11\nprint((l + r) // 2)\nprint(11 // 2)",
        whyWeUseItHere:
          "We binary search over *speeds*: `l` is the slowest speed still possible, `r` the fastest, and `k` is the speed we test next.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { piles: [3, 6, 7, 11], h: 8 },
      focus: ["l", "r", "k", "hours", "res"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a dial labelled 1 to 11 (the biggest pile) that sets Koko's speed. There is a magic point on that dial: every speed below it is too slow and every speed at or above it is fast enough. Speeds are 'sorted' by whether they work, like a row of NOs followed by a row of YESes. So we binary search the dial instead of an array: try the middle speed, count the hours. If she finishes in time, the answer is this speed or something slower, so look left. If she's too slow, look right. The first YES is the answer.",
      edgeCases: [
        "`h` equals the number of piles: she has exactly one hour per pile, so the speed must be the biggest pile.",
        "`h` is huge: speed 1 already works, so the answer is 1.",
        "A pile size that isn't a multiple of `k`: the leftover still costs a full hour, which is why we round up.",
      ],
      stepByStepWalkthrough: [
        "The answer lies between `l = 1` and `r = max(piles)`. Start `res = r`, since the biggest pile is always fast enough.",
        "While `l <= r`, test the middle speed `k = (l + r) // 2`.",
        "Count `hours`: for each pile add `math.ceil(pile / k)`.",
        "If `hours <= h`, speed `k` works: save `res = k` and look for a slower speed with `r = k - 1`.",
        "Otherwise speed `k` is too slow: search faster speeds with `l = k + 1`.",
        "When the range is empty, `res` holds the slowest speed that worked.",
      ],
    },
    hints: {
      conceptual:
        "If speed 5 is fast enough, is speed 6 also fast enough? If speed 3 is too slow, is speed 2 too slow too? That 'too slow ... fast enough' pattern over speeds 1 to max(piles) is sorted. What search works on sorted things?",
      structural:
        "Binary search with `l = 1` and `r = max(piles)`. Inside `while l <= r:`, pick `k`, loop `for pile in piles:` to total `math.ceil(pile / k)`, then shrink `r` (fast enough, remember `k`) or grow `l` (too slow).",
    },
    commonMistakes: [
      "Using `pile // k` (rounding down) for the hours. A pile of 7 at speed 3 takes 3 hours, not 2.",
      "Starting the search at 0. Speed 0 means dividing by zero, and she'd never finish anyway. The smallest speed is 1.",
      "Stopping as soon as a speed works. The first working speed you test is not necessarily the smallest; keep searching to the left.",
      "Trying every speed from 1 upward. It's correct but with piles up to a billion it can take billions of tries.",
    ],
    starterCode: `import math


def min_eating_speed(piles: list[int], h: int) -> int:
    # Return the smallest speed k that lets Koko finish all piles within h hours.
    # Tip: the answer is between 1 and max(piles). Can you binary search that range?
    pass
`,
    optimalSolution: `import math


def min_eating_speed(piles: list[int], h: int) -> int:
    # Slowest speed worth trying: 1 banana per hour
    l = 1
    # Fastest speed we'd ever need: the biggest pile (then every pile takes 1 hour)
    r = max(piles)
    # The fastest speed always works, so it's a safe answer to start with
    res = r

    # Binary search over speeds, not over positions in a list
    while l <= r:
        # Try the speed halfway between the slowest and fastest candidates
        k = (l + r) // 2

        # Count how many hours Koko needs at speed k
        hours = 0
        for pile in piles:
            # This pile takes pile / k hours, rounded UP (leftovers cost a full hour)
            hours += math.ceil(pile / k)

        # Did she finish in time?
        if hours <= h:
            # Yes: k works. Remember it, then look for an even slower speed
            res = k
            r = k - 1
        else:
            # No: too slow. She has to eat faster
            l = k + 1

    # res is the slowest speed that still finished in time
    return res
`,
    bruteForceSolution: `import math


def min_eating_speed(piles: list[int], h: int) -> int:
    # Try speeds 1, 2, 3, ... and return the first one that is fast enough
    k = 1
    while True:
        hours = 0
        for pile in piles:
            hours += math.ceil(pile / k)
        if hours <= h:
            return k
        k += 1
`,
    harness: { kind: "function", entry: "min_eating_speed" },
    testCases: [
      {
        input: { piles: [3, 6, 7, 11], h: 8 },
        expected: 4,
        description: "At speed 4 the piles take 1 + 2 + 2 + 3 = 8 hours, just in time. At speed 3 they'd take 1 + 2 + 3 + 4 = 10 hours, too many.",
      },
      {
        input: { piles: [30, 11, 23, 4, 20], h: 5 },
        expected: 30,
        description: "5 piles and only 5 hours: each pile must be finished in a single hour, so she must eat as fast as the biggest pile.",
      },
      {
        input: { piles: [30, 11, 23, 4, 20], h: 6 },
        expected: 23,
        description: "At 23 per hour: 2 + 1 + 1 + 1 + 1 = 6 hours. At 22 the 23-pile needs 2 hours too, making 7.",
      },
      { input: { piles: [1], h: 1 }, expected: 1, description: "One tiny pile: the slowest speed is enough." },
      { input: { piles: [5, 5, 5, 5], h: 20 }, expected: 1, description: "Plenty of time: 1 banana per hour takes exactly 20 hours." },
      { input: { piles: [9, 8, 7], h: 10 }, expected: 3, description: "At 3: 3 + 3 + 3 = 9 hours. At 2: 5 + 4 + 4 = 13 hours." },
      { input: { piles: [312884470], h: 312884469 }, expected: 2, description: "Huge pile, one hour short of speed 1, so speed 2 is needed." },
      { input: { piles: [1000000000], h: 1000000000 }, expected: 1 },
      { input: { piles: [100000, 200000], h: 3 }, expected: 100000, description: "1 hour for the first pile and 2 for the second." },
    ],
  },

  // ------------------------------------------------------------------ find-minimum-in-rotated-sorted-array
  {
    id: "find-minimum-in-rotated-sorted-array",
    summary:
      "A list of different numbers was sorted from small to large and then **rotated**: some chunk from the end was moved to the front, so `[1, 2, 3, 4, 5]` might become `[3, 4, 5, 1, 2]`. Given the rotated list `nums`, return its **smallest number** in about **log n** steps.",
    constraints: [
      "1 ≤ len(nums) ≤ 5,000",
      "-5,000 ≤ nums[i] ≤ 5,000, and all values are different",
      "The list was sorted, then rotated between 1 and n times (rotating n times gives back the sorted list)",
      "Aim for O(log n) time",
    ],
    pattern: "Binary search comparing the middle with the right end",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(log n)",
      explanation:
        "Scanning for the smallest number looks at all n values. Our binary search compares `nums[mid]` with `nums[r]` and throws away about half of the remaining range every loop, so it needs about log₂ n loops, each doing a single comparison.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation: "Just the three indices `l`, `r` and `mid`.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "while l < r:",
        plainEnglishExplanation:
          "`while` repeats its block as long as the condition is `True`. Here we use `<` (strictly less), not `<=`, so the loop stops the moment `l` and `r` meet at the same position.",
        exampleSnippet: "l, r = 0, 3\nwhile l < r:\n    print(l, r)\n    l = l + 1\nprint('stopped with l =', l, 'and r =', r)",
        whyWeUseItHere:
          "We aren't looking for a specific value that might be missing; the minimum always exists. We shrink the range until only one position is left, and that position is the answer.",
      },
      {
        keywordOrMethod: "mid = (l + r) // 2",
        plainEnglishExplanation:
          "`//` divides and throws away the decimal part, so the result is a whole number we can use as a list position.",
        exampleSnippet: "print((0 + 6) // 2)\nprint((4 + 5) // 2)",
        whyWeUseItHere:
          "It picks the middle position of the current range.",
      },
      {
        keywordOrMethod: "if nums[mid] > nums[r]:",
        plainEnglishExplanation:
          "`nums[mid]` reads the number at position `mid`. `>` compares two numbers and gives `True` or `False`.",
        exampleSnippet: "nums = [4, 5, 6, 7, 0, 1, 2]\nprint(nums[3], nums[6])\nprint(nums[3] > nums[6])",
        whyWeUseItHere:
          "In a sorted stretch the numbers only go up. If the middle is BIGGER than the right end, the numbers must 'drop' somewhere between them, and the minimum is right after that drop.",
      },
      {
        keywordOrMethod: "r = mid  (not mid - 1)",
        plainEnglishExplanation:
          "Assigning `r = mid` moves the right marker onto the middle position, keeping that position inside the range.",
        exampleSnippet: "nums = [5, 1, 2, 3, 4]\nl, r = 0, 4\nmid = (l + r) // 2\nr = mid\nprint('range is now', nums[l:r + 1])",
        whyWeUseItHere:
          "When `nums[mid] <= nums[r]`, `mid` itself might be the smallest number, so we can't throw it away like ordinary binary search would.",
      },
      {
        keywordOrMethod: "return nums[l]",
        plainEnglishExplanation:
          "`return` sends a value back from the function. Note we return the *number* at position `l`, not the position itself.",
        exampleSnippet: "def middle_value(nums):\n    return nums[len(nums) // 2]\n\nprint(middle_value([7, 8, 9]))",
        whyWeUseItHere:
          "When the loop ends, `l` and `r` point to the same spot, which holds the minimum.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [4, 5, 6, 7, 0, 1, 2] },
      pointers: { nums: ["l", "mid", "r"] },
      focus: ["l", "mid", "r"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture a staircase that goes up, then suddenly drops to the floor, then goes up again: `[4, 5, 6, 7, 0, 1, 2]`. The minimum is the bottom of the drop. Stand in the middle and compare your step with the last step on the right. If your step is HIGHER than the right end, the drop must be somewhere to your right (a staircase that only goes up can't end lower than it started). If your step is LOWER than (or equal to) the right end, the stairs go straight up from you to the end, so the drop is at your spot or to your left. Either way, half the staircase is ruled out.",
      edgeCases: [
        "The list was rotated all the way around and is fully sorted, e.g. `[11, 13, 15, 17]`: `nums[mid]` is never bigger than `nums[r]`, so `r` keeps moving left until it reaches index 0.",
        "A single number: `l == r` from the start, the loop never runs, and we return that number.",
        "Two numbers like `[2, 1]`: `mid` is 0 and 2 > 1, so `l` moves to 1 and we return 1.",
      ],
      stepByStepWalkthrough: [
        "Set `l = 0` and `r = len(nums) - 1`. The minimum is somewhere in `nums[l..r]`.",
        "While `l < r`, compute `mid = (l + r) // 2`.",
        "If `nums[mid] > nums[r]`, the drop is to the right of `mid`, so the minimum is too: `l = mid + 1`.",
        "Otherwise `mid..r` climbs steadily, so the minimum is `mid` or somewhere left of it: `r = mid`.",
        "When `l == r`, only one candidate is left: return `nums[l]`.",
      ],
    },
    hints: {
      conceptual:
        "A rotated sorted list is two sorted runs glued together, and the minimum is where the second run begins. Comparing the middle number with the LAST number tells you which run the middle belongs to.",
      structural:
        "Use `while l < r:` with `mid = (l + r) // 2`. If `nums[mid] > nums[r]` set `l = mid + 1`, else set `r = mid`. Return `nums[l]` after the loop.",
    },
    commonMistakes: [
      "Setting `r = mid - 1` in the else branch. `mid` might be the minimum itself (e.g. `[5, 1, 2, 3, 4]` once the range shrinks), and you'd skip over it.",
      "Comparing with `nums[l]` instead of `nums[r]`. With a fully sorted list, `nums[mid] > nums[l]` is true but the minimum is on the LEFT, so that comparison sends you the wrong way unless you add extra checks.",
      "Using `while l <= r:` together with `r = mid`. When `l == r`, `mid == r`, and `r = mid` changes nothing, so the loop never ends.",
      "Returning `l` (the position) instead of `nums[l]` (the number).",
    ],
    starterCode: `def find_min(nums: list[int]) -> int:
    # Return the smallest number in the rotated sorted list.
    # Tip: compare the middle number with the number at the right end.
    pass
`,
    optimalSolution: `def find_min(nums: list[int]) -> int:
    # The minimum is somewhere between positions l and r (inclusive)
    l = 0
    r = len(nums) - 1

    # Keep narrowing until l and r meet on a single position
    while l < r:
        # Look at the middle of the current range
        mid = (l + r) // 2

        # Is the middle number bigger than the number at the right end?
        if nums[mid] > nums[r]:
            # Then the numbers "drop" somewhere after mid, and the minimum is right after
            # that drop. So the minimum is NOT mid and NOT to its left.
            l = mid + 1
        else:
            # Otherwise the numbers climb steadily from mid to r, so the smallest of
            # that stretch is mid itself. The minimum is mid or something left of it.
            r = mid

    # l and r point at the same spot now: the smallest number
    return nums[l]
`,
    bruteForceSolution: `def find_min(nums: list[int]) -> int:
    # Look at every number and keep the smallest: O(n)
    smallest = nums[0]
    for num in nums:
        if num < smallest:
            smallest = num
    return smallest
`,
    harness: { kind: "function", entry: "find_min" },
    testCases: [
      {
        input: { nums: [3, 4, 5, 1, 2] },
        expected: 1,
        description: "The sorted list [1, 2, 3, 4, 5] was rotated so 3, 4, 5 come first. The minimum 1 sits right after the drop from 5.",
      },
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2] },
        expected: 0,
        description: "The drop is from 7 to 0, so 0 is the smallest.",
      },
      {
        input: { nums: [11, 13, 15, 17] },
        expected: 11,
        description: "Rotated all the way around: the list is fully sorted, so the first number is the minimum.",
      },
      { input: { nums: [1] }, expected: 1, description: "Just one number." },
      { input: { nums: [2, 1] }, expected: 1 },
      { input: { nums: [1, 2] }, expected: 1 },
      { input: { nums: [5, 1, 2, 3, 4] }, expected: 1, description: "The minimum is at index 1, near the start." },
      { input: { nums: [2, 3, 4, 5, 1] }, expected: 1, description: "The minimum is at the very end." },
      { input: { nums: [-3, -1, 0, -10, -5] }, expected: -10, description: "Negative numbers: [-10, -5, -3, -1, 0] rotated." },
      {
        input: { nums: Array.from({ length: 5000 }, (_, i) => ((i + 1234) % 5000) - 2500) },
        expected: -2500,
        description: "5,000 numbers: found in about 13 steps.",
      },
    ],
  },
  // ------------------------------------------------------------------ search-in-rotated-sorted-array
  {
    id: "search-in-rotated-sorted-array",
    summary:
      "You are given an integer array `nums` sorted in ascending order (with distinct values) that has been rotated at an unknown pivot, and an integer `target`. Return the **index** of `target` if it is in `nums`, or `-1` if it is not. Your algorithm must achieve **O(log n)** runtime complexity.",
    constraints: [
      "1 ≤ len(nums) ≤ 5,000",
      "-10,000 ≤ nums[i], target ≤ 10,000",
      "All values of nums are unique",
      "nums is guaranteed to be rotated at some pivot",
    ],
    pattern: "Binary search on rotated array: identify which half is sorted",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(log n)",
      explanation:
        "Brute force checks every element linearly. In rotated binary search, dividing the array at `mid` always leaves at least one half sorted. By testing if `target` falls into the range of the sorted half, we know whether to search left or right in O(1) time. The search space cuts in half each step, taking O(log n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only three index variables (`l`, `r`, `mid`) are tracked, requiring constant extra memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "while l <= r:",
        plainEnglishExplanation:
          "Loops as long as the search window is not empty. When `l` moves past `r`, there are no candidate elements left.",
        exampleSnippet: "l, r = 0, 2\nwhile l <= r:\n    print(l, r)\n    l += 1",
        whyWeUseItHere:
          "We keep narrowing our search range until we find the target or determine it isn't in the list.",
      },
      {
        keywordOrMethod: "mid = (l + r) // 2",
        plainEnglishExplanation:
          "Floor division (`//`) calculates the midpoint index between `l` and `r`, discarding any remainder.",
        exampleSnippet: "l, r = 0, 5\nprint((l + r) // 2)",
        whyWeUseItHere:
          "Splits the remaining portion of the array into two halves to test against target.",
      },
      {
        keywordOrMethod: "nums[l] <= nums[mid]",
        plainEnglishExplanation:
          "Compares the number at index `l` with `mid`. If `nums[l] <= nums[mid]`, no rotation drop occurs in between, so that portion is strictly sorted.",
        exampleSnippet: "nums = [4, 5, 6, 7, 0, 1, 2]\nprint(nums[0] <= nums[3])",
        whyWeUseItHere:
          "Identifies whether the left half is the normally sorted half or contains the pivot point.",
      },
      {
        keywordOrMethod: "nums[l] <= target < nums[mid]",
        plainEnglishExplanation:
          "Chained comparison in Python: checks whether `target` is greater than or equal to `nums[l]` AND strictly less than `nums[mid]`.",
        exampleSnippet: "x = 5\nif 1 <= x < 10:\n    print('in range')",
        whyWeUseItHere:
          "Determines if target falls cleanly inside the boundaries of the sorted half.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
      pointers: { nums: ["l", "mid", "r"] },
      focus: ["l", "mid", "r"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine breaking a sorted circle of numbers in two. No matter where the break happened, at least one of the two pieces is completely normal and unbroken. Look at that unbroken half first: is your target within its lowest and highest values? If yes, keep that half and throw away the rest! If not, throw that half away and search the other half. Every split halves your choices, keeping the search logarithmic.",
      edgeCases: [
        "Array with a single number: checks index 0 once and returns 0 if it matches, else -1.",
        "Target is at the very first or last position of the rotated array: bounds correctly handle inclusive endpoints.",
        "Array is not rotated at all (rotated 0 times): left half is always sorted, behaving like standard binary search.",
      ],
      stepByStepWalkthrough: [
        "Initialize `l = 0` and `r = len(nums) - 1`.",
        "Find the middle index `mid = (l + r) // 2`.",
        "If `nums[mid] == target`, return `mid`.",
        "If `nums[l] <= nums[mid]`, the left half is sorted.",
        "If left is sorted and `nums[l] <= target < nums[mid]`, search left (`r = mid - 1`), else search right (`l = mid + 1`).",
        "Otherwise, the right half must be sorted. If `nums[mid] < target <= nums[r]`, search right (`l = mid + 1`), else search left (`r = mid - 1`).",
        "If `l > r`, target is missing: return `-1`.",
      ],
    },
    hints: {
      conceptual:
        "When an array is rotated once, cutting it at any point will always leave at least one half completely sorted. Can you check whether the target lies within that sorted half?",
      structural:
        "Use `while l <= r:` and compute `mid`. Use `if nums[l] <= nums[mid]:` to check if the left side is sorted. Inside each branch, check if `target` is within the sorted range to adjust `l` or `r`.",
    },
    commonMistakes: [
      "Using `<` instead of `<=` when comparing `nums[l]` and `nums[mid]`. When `l == mid`, `<` fails.",
      "Forgetting `<=` on boundaries (e.g. `nums[l] <= target`), missing target when it sits on an edge.",
      "Assuming both halves can be un-sorted at the same time: at least one half is always cleanly sorted.",
    ],
    starterCode: `def search(nums: list[int], target: int) -> int:
    # Return index of target in rotated sorted array nums, or -1.
    # Tip: at least one half (left or right) is always sorted.
    pass
`,
    optimalSolution: `def search(nums: list[int], target: int) -> int:
    # Initialize boundary pointers
    l = 0
    r = len(nums) - 1

    # Continue as long as valid candidates remain
    while l <= r:
        # Midpoint of current search range
        mid = (l + r) // 2

        # Target found at mid
        if nums[mid] == target:
            return mid

        # Determine if left half is normally sorted
        if nums[l] <= nums[mid]:
            # Does target fall inside the sorted left half?
            if nums[l] <= target < nums[mid]:
                r = mid - 1
            else:
                l = mid + 1
        else:
            # Otherwise the right half must be sorted
            if nums[mid] < target <= nums[r]:
                l = mid + 1
            else:
                r = mid - 1

    # Target is not present in nums
    return -1
`,
    bruteForceSolution: `def search(nums: list[int], target: int) -> int:
    # Linear scan: O(n) time
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1
`,
    harness: { kind: "function", entry: "search" },
    testCases: [
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
        expected: 4,
        description: "0 is located at index 4 in the rotated array.",
      },
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
        expected: -1,
        description: "3 does not exist in the array, so -1 is returned.",
      },
      {
        input: { nums: [1], target: 0 },
        expected: -1,
        description: "Single element array where the element is not the target.",
      },
      { input: { nums: [1], target: 1 }, expected: 0 },
      { input: { nums: [1, 3], target: 3 }, expected: 1 },
      { input: { nums: [3, 1], target: 1 }, expected: 1 },
      { input: { nums: [5, 1, 3], target: 5 }, expected: 0 },
      { input: { nums: [4, 5, 6, 7, 8, 1, 2], target: 8 }, expected: 4 },
      { input: { nums: [2, 3, 4, 5, 6, 7, 1], target: 1 }, expected: 6 },
    ],
  },

  // ------------------------------------------------------------------ time-based-key-value-store
  {
    id: "time-based-key-value-store",
    summary:
      "Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the key's value at a certain timestamp.\n\nImplement the `TimeMap` class:\n- `TimeMap()` initializes the object.\n- `set(key, value, timestamp)` stores the `key` with the `value` at the given `timestamp`.\n- `get(key, timestamp)` returns a value such that `set` was called previously with `timestamp_prev <= timestamp`. If there are multiple such values, it returns the value associated with the largest `timestamp_prev`. If there are no values, it returns `\"\"`.",
    constraints: [
      "1 ≤ len(key), len(value) ≤ 100",
      "key and value consist of lowercase English letters and digits",
      "1 ≤ timestamp ≤ 10,000,000",
      "All timestamps of set for each key are strictly increasing",
      "At most 200,000 calls will be made to set and get",
    ],
    pattern: "Hash map of sorted lists with binary search on timestamps",
    timeComplexity: {
      bruteForce: "O(n) per get",
      optimal: "O(1) set, O(log n) get",
      explanation:
        "`set` appends to the key's list in O(1). Since timestamps arrive in strictly increasing order, each key's list is already sorted by timestamp. `get` performs binary search over the key's entries to find the latest timestamp <= target in O(log n) time, where n is the number of values stored for that key.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "We store each (timestamp, value) pair once in the hash map, using linear total space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import defaultdict / defaultdict(list)",
        plainEnglishExplanation:
          "A dictionary that automatically creates an empty list `[]` whenever a new key is accessed for the first time.",
        exampleSnippet:
          "from collections import defaultdict\nstore = defaultdict(list)\nstore['user'].append('Ada')\nprint(store['user'])",
        whyWeUseItHere:
          "Allows us to append timestamps to any key without checking whether the key already exists.",
      },
      {
        keywordOrMethod: "history.append((timestamp, value))",
        plainEnglishExplanation:
          "Stores a pair of values bundled together as a tuple `(timestamp, value)` at the end of a list.",
        exampleSnippet:
          "pairs = []\npairs.append((1, 'v1'))\nprint(pairs[0][0], pairs[0][1])",
        whyWeUseItHere:
          "Keeps the timestamp paired with its corresponding value in chronological order.",
      },
      {
        keywordOrMethod: "while l <= r: with candidate tracking",
        plainEnglishExplanation:
          "Binary search pattern where `res` saves the latest valid match found so far, while moving `l = mid + 1` to search for an even closer one.",
        exampleSnippet:
          "nums = [1, 3, 5]\nl, r, res = 0, len(nums) - 1, -1\nwhile l <= r:\n    m = (l + r) // 2\n    if nums[m] <= 4:\n        res = nums[m]\n        l = m + 1\n    else:\n        r = m - 1\nprint(res)",
        whyWeUseItHere:
          "We want the largest timestamp `<=` the requested timestamp.",
      },
      {
        keywordOrMethod: "t, val = history[mid]",
        plainEnglishExplanation:
          "Unpacks a two-element tuple into two separate variables in a single line.",
        exampleSnippet:
          "entry = (10, 'success')\nt, val = entry\nprint(t, val)",
        whyWeUseItHere:
          "Extracts the timestamp `t` for comparison and the stored string `val` to return.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        operations: ["TimeMap", "set", "get", "get", "set", "get", "get"],
        arguments: [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]],
      },
      focus: ["key", "timestamp", "res", "mid", "l", "r"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a library catalog card for each topic (key). Every time a new fact is discovered, you write down the timestamp and the fact at the bottom of the card. Because facts are discovered in chronological order, the card is naturally sorted by date! When someone asks, 'What did we know about this topic at time T?', you don't read every entry from the beginning. You use binary search on that card to jump to the latest fact recorded at or before time T.",
      edgeCases: [
        "Querying a key that has never been set: returns `\"\"` immediately.",
        "Query timestamp is smaller than the very first recorded timestamp for that key: binary search never sets `res`, returns `\"\"`.",
        "Query timestamp is larger than all recorded timestamps: binary search returns the most recent value.",
      ],
      stepByStepWalkthrough: [
        "In `__init__`, initialize `self.store` as a `defaultdict(list)`.",
        "In `set(key, value, timestamp)`, append `(timestamp, value)` to `self.store[key]`.",
        "In `get(key, timestamp)`, check if `key in self.store`. If not, return `\"\"`.",
        "Initialize `history = self.store[key]`, `l = 0`, `r = len(history) - 1`, and `res = \"\"`.",
        "While `l <= r`, compute `mid = (l + r) // 2` and unpack `t, val = history[mid]`.",
        "If `t <= timestamp`, this entry is valid: record `res = val` and move `l = mid + 1` to search for a later valid timestamp.",
        "If `t > timestamp`, move `r = mid - 1` to search earlier entries.",
        "Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "For any given key, timestamps are appended in strictly increasing order. What algorithm lets you search a sorted list in logarithmic time?",
      structural:
        "Use a dictionary mapping each key to a list of `(timestamp, value)` pairs. In `get`, run binary search on that list looking for the largest `timestamp <= target`.",
    },
    commonMistakes: [
      "Linear scanning backwards through the list in `get`. It passes simple tests but times out on large numbers of calls (O(n) vs O(log n)).",
      "Returning the first match without continuing to search right for a larger valid timestamp.",
      "Not handling the case where query timestamp is earlier than all stored timestamps (should return empty string).",
    ],
    starterCode: `class TimeMap:
    def __init__(self):
        # Initialize storage mapping key to sorted history
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Store key, value, and timestamp
        pass

    def get(self, key: str, timestamp: int) -> str:
        # Return value at largest timestamp <= target timestamp
        pass
`,
    optimalSolution: `from collections import defaultdict


class TimeMap:
    def __init__(self):
        # Map each key to a list of (timestamp, value) tuples
        self.store = defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Timestamps are strictly increasing, so history stays sorted
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        # Key never set: return empty string
        if key not in self.store:
            return ""

        history = self.store[key]
        l = 0
        r = len(history) - 1
        res = ""

        # Binary search for the latest timestamp <= target timestamp
        while l <= r:
            mid = (l + r) // 2
            t, val = history[mid]

            # Valid timestamp found: remember value and search for later valid ones
            if t <= timestamp:
                res = val
                l = mid + 1
            else:
                # Timestamp is too far in the future, search earlier
                r = mid - 1

        return res
`,
    bruteForceSolution: `class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""
        # Linear scan from latest to earliest: O(n)
        for t, val in reversed(self.store[key]):
            if t <= timestamp:
                return val
        return ""
`,
    harness: { kind: "design", entry: "TimeMap" },
    testCases: [
      {
        input: {
          operations: ["TimeMap", "set", "get", "get", "set", "get", "get"],
          arguments: [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]],
        },
        expected: [null, null, "bar", "bar", null, "bar2", "bar2"],
        description:
          "At timestamp 1 and 3, 'foo' returns 'bar'. After updating at timestamp 4 with 'bar2', queries at 4 and 5 return 'bar2'.",
      },
      {
        input: {
          operations: ["TimeMap", "set", "set", "get", "get", "get"],
          arguments: [[], ["love", "high", 10], ["love", "low", 20], ["love", 5], ["love", 10], ["love", 15]],
        },
        expected: [null, null, null, "", "high", "high"],
        description:
          "Query at timestamp 5 is before any set operation, so it returns empty string. Timestamp 10 and 15 both return 'high'.",
      },
      {
        input: {
          operations: ["TimeMap", "get"],
          arguments: [[], ["missing", 1]],
        },
        expected: [null, ""],
        description: "Getting a key that does not exist returns empty string.",
      },
      {
        input: {
          operations: ["TimeMap", "set", "get", "get"],
          arguments: [[], ["k1", "v1", 100], ["k1", 100], ["k1", 99]],
        },
        expected: [null, null, "v1", ""],
      },
      {
        input: {
          operations: ["TimeMap", "set", "set", "set", "get", "get"],
          arguments: [[], ["a", "alpha", 1], ["a", "beta", 2], ["a", "gamma", 3], ["a", 2], ["a", 3]],
        },
        expected: [null, null, null, null, "beta", "gamma"],
      },
      {
        input: {
          operations: ["TimeMap", "set", "set", "get", "get"],
          arguments: [[], ["k", "first", 5], ["k", "second", 15], ["k", 25], ["k", 14]],
        },
        expected: [null, null, null, "second", "first"],
      },
    ],
  },

  // ------------------------------------------------------------------ median-of-two-sorted-arrays
  {
    id: "median-of-two-sorted-arrays",
    summary:
      "Given two sorted integer arrays `nums1` and `nums2` of size `m` and `n` respectively, return the **median** of the two sorted arrays as a floating-point number. The overall run time complexity must be **O(log(min(m, n)))**.",
    constraints: [
      "len(nums1) == m, len(nums2) == n",
      "0 ≤ m ≤ 1,000, 0 ≤ n ≤ 1,000",
      "1 ≤ m + n ≤ 2,000",
      "-1,000,000 ≤ nums1[i], nums2[i] ≤ 1,000,000",
    ],
    pattern: "Binary search partition on the smaller array",
    timeComplexity: {
      bruteForce: "O(m + n)",
      optimal: "O(log(min(m, n)))",
      explanation:
        "Merging both sorted arrays takes O(m + n) time and extra space. By performing binary search on the partition cut of the shorter array, we divide the search space in half each step, taking O(log(min(m, n))) time with no list merging.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only boundary pointers and partition indices are stored, using O(1) auxiliary space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "if len(a) > len(b): a, b = b, a",
        plainEnglishExplanation:
          "Swaps the two list references if `a` is longer than `b`, guaranteeing `a` is the shorter (or equal length) list.",
        exampleSnippet:
          "a, b = [1, 2, 3], [4, 5]\nif len(a) > len(b):\n    a, b = b, a\nprint(len(a), len(b))",
        whyWeUseItHere:
          "Binary search on the shorter array guarantees logarithmic time bounded by min(m, n) and ensures the corresponding cut in `b` is never negative.",
      },
      {
        keywordOrMethod: "float('-inf') and float('inf')",
        plainEnglishExplanation:
          "Special floating-point representations of negative and positive infinity. Any real number is greater than `-inf` and less than `inf`.",
        exampleSnippet:
          "print(float('-inf') < -1000)\nprint(float('inf') > 1000)",
        whyWeUseItHere:
          "Used as sentinel boundary values when a partition cut takes zero elements from an array or all elements.",
      },
      {
        keywordOrMethod: "half = (total + 1) // 2",
        plainEnglishExplanation:
          "Computes the exact number of elements that belong in the left combined half. For odd totals, the left half holds one extra element.",
        exampleSnippet:
          "print((5 + 1) // 2)\nprint((6 + 1) // 2)",
        whyWeUseItHere:
          "Divides the combined elements equally so the median sits right at the partition boundary.",
      },
      {
        keywordOrMethod: "max(a, b) and min(a, b)",
        plainEnglishExplanation:
          "Built-in functions that return the largest or smallest among the passed arguments.",
        exampleSnippet: "print(max(4, 9))\nprint(min(4, 9))",
        whyWeUseItHere:
          "The median comes from the largest value on the left partition and smallest value on the right partition.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums1: [1, 3], nums2: [2] },
      pointers: { a: ["i"], b: ["j"] },
      focus: ["i", "j", "left_a", "right_a", "left_b", "right_b"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine merging the two lists into one big sorted line, and slicing it right down the middle into a Left half and a Right half. If you knew how many elements from array A belong in the Left half (say `i`), then array B MUST contribute exactly the rest (say `j = half - i`). The slice is perfect if every number on the Left is smaller than or equal to every number on the Right: `left_A <= right_B` and `left_B <= right_A`. Since array A is sorted, we can binary search for the correct slice index `i`!",
      edgeCases: [
        "One array is completely empty: binary search immediately places all left elements in the other array.",
        "Odd total length: median is simply the largest element on the left side.",
        "Even total length: median is the average of the maximum left element and minimum right element.",
        "Disjoint ranges (all elements of nums1 smaller than nums2): partition hits the outer edge with -inf or inf.",
      ],
      stepByStepWalkthrough: [
        "Ensure `a` is the shorter array: if `len(nums1) > len(nums2)`, swap them.",
        "Calculate total elements `total = m + n` and left partition size `half = (total + 1) // 2`.",
        "Binary search on slice position `i` from `0` to `m` with `l = 0, r = m`.",
        "For each `i = (l + r) // 2`, set `j = half - i`.",
        "Find boundaries: `left_a = a[i - 1]` (or `-inf` if `i == 0`), `right_a = a[i]` (or `inf` if `i == m`), `left_b = b[j - 1]` (or `-inf` if `j == 0`), `right_b = b[j]` (or `inf` if `j == n`).",
        "If `left_a <= right_b` and `left_b <= right_a`, the partition is correct!",
        "If total length is odd, return `float(max(left_a, left_b))`.",
        "If total length is even, return `(max(left_a, left_b) + min(right_a, right_b)) / 2.0`.",
        "If `left_a > right_b`, cut `a` too far right: move `r = i - 1`. Otherwise move `l = i + 1`.",
      ],
    },
    hints: {
      conceptual:
        "If you split the combined arrays into two equal halves (Left and Right), you only need to decide how many elements to take from the smaller array.",
      structural:
        "Binary search on `i` (number of elements from the shorter array `a`). Then `j = (m + n + 1) // 2 - i` elements come from `b`. Compare boundary elements `a[i-1], a[i], b[j-1], b[j]` using `-inf` and `inf` for out-of-bounds.",
    },
    commonMistakes: [
      "Running binary search on the larger array: if `m > n`, `j` can become negative or out of bounds.",
      "Forgetting to cast the answer to a float or integer division instead of `/ 2.0` for even lengths.",
      "Not handling empty array cases with `float('-inf')` and `float('inf')`.",
    ],
    starterCode: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    # Return median of two sorted arrays in O(log(min(m, n))) time.
    # Tip: partition both arrays so all left elements <= all right elements.
    pass
`,
    optimalSolution: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    # Always binary search on the shorter array
    a, b = nums1, nums2
    if len(a) > len(b):
        a, b = b, a

    m = len(a)
    n = len(b)
    total = m + n
    # Number of elements in combined left partition
    half = (total + 1) // 2

    l = 0
    r = m

    while l <= r:
        # Cut position in shorter array a
        i = (l + r) // 2
        # Complementary cut position in array b
        j = half - i

        # Left and right boundary values around cut in a
        left_a = a[i - 1] if i > 0 else float("-inf")
        right_a = a[i] if i < m else float("inf")

        # Left and right boundary values around cut in b
        left_b = b[j - 1] if j > 0 else float("-inf")
        right_b = b[j] if j < n else float("inf")

        # Correct partition: all left elements <= all right elements
        if left_a <= right_b and left_b <= right_a:
            # Odd total count: max of left side is the median
            if total % 2 == 1:
                return float(max(left_a, left_b))
            # Even total count: average of two middle values
            return (max(left_a, left_b) + min(right_a, right_b)) / 2.0
        elif left_a > right_b:
            # Cut in a is too far right, move left
            r = i - 1
        else:
            # Cut in a is too far left, move right
            l = i + 1

    return 0.0
`,
    bruteForceSolution: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    # Merge both arrays into one sorted list: O(m + n)
    merged = sorted(nums1 + nums2)
    total = len(merged)
    mid = total // 2
    if total % 2 == 1:
        return float(merged[mid])
    return (merged[mid - 1] + merged[mid]) / 2.0
`,
    harness: { kind: "function", entry: "find_median_sorted_arrays" },
    testCases: [
      {
        input: { nums1: [1, 3], nums2: [2] },
        expected: 2.0,
        description: "Merged is [1, 2, 3], middle element is 2.0.",
      },
      {
        input: { nums1: [1, 2], nums2: [3, 4] },
        expected: 2.5,
        description: "Merged is [1, 2, 3, 4], median is (2 + 3) / 2 = 2.5.",
      },
      {
        input: { nums1: [0, 0], nums2: [0, 0] },
        expected: 0.0,
        description: "All zeroes return 0.0.",
      },
      {
        input: { nums1: [], nums2: [1] },
        expected: 1.0,
        description: "One array is empty, median is from the single-element array.",
      },
      { input: { nums1: [2], nums2: [] }, expected: 2.0 },
      { input: { nums1: [1, 3], nums2: [2, 7] }, expected: 2.5 },
      { input: { nums1: [1, 2, 3, 4, 5], nums2: [6, 7, 8, 9, 10] }, expected: 5.5 },
      { input: { nums1: [1, 2, 6], nums2: [3, 4, 5] }, expected: 3.5 },
    ],
  },
];

export default problems;
