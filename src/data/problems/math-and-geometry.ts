import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  {
    id: "rotate-image",
    summary:
      "You are given an `n x n` 2D grid `matrix` representing a square image. Rotate the image **90 degrees clockwise** directly in place. You must modify the input 2D list directly without allocating a new 2D grid.",
    constraints: [
      "matrix.length == matrix[i].length == n",
      "1 ≤ n ≤ 20",
      "-1000 ≤ matrix[i][j] ≤ 1000",
    ],
    pattern: "Transpose grid across main diagonal, then reverse each row",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n²)",
      explanation:
        "Transposing visits the n(n - 1) / 2 cells in the upper triangle to swap them with their diagonal reflections. Then reversing each of the n rows of length n takes n × (n / 2) swaps. Total operations scale directly with the n² cells in the matrix.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "All element swaps and row reversals are executed directly on the input matrix in place, using only a couple of integer loop variables.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "matrix[r][c]",
        plainEnglishExplanation:
          "2D lists in Python are lists of lists. `matrix[r]` gets row `r`, and `[c]` accesses column `c` inside that row.",
        exampleSnippet:
          "grid = [[1, 2], [3, 4]]\nprint(grid[0][1])  # row 0, col 1 is 2",
        whyWeUseItHere:
          "We need to read and swap specific cells across rows and columns.",
      },
      {
        keywordOrMethod: "a, b = b, a",
        plainEnglishExplanation:
          "Tuple unpacking allows swapping two variable or cell values in a single line without needing an explicit temporary variable.",
        exampleSnippet:
          "x, y = 10, 20\nx, y = y, x\nprint(x, y)",
        whyWeUseItHere:
          "We swap symmetric cells `matrix[r][c]` and `matrix[c][r]` across the diagonal.",
      },
      {
        keywordOrMethod: "for c in range(r + 1, n):",
        plainEnglishExplanation:
          "`range(r + 1, n)` starts one column past the diagonal element `r`. This restricts our loop strictly to cells above the diagonal, avoiding duplicate swaps.",
        exampleSnippet:
          "n = 3\nfor r in range(n):\n    for c in range(r + 1, n):\n        print(f'swap ({r},{c}) with ({c},{r})')",
        whyWeUseItHere:
          "If we looped over all columns, swapping twice would undo the transpose and put everything back.",
      },
      {
        keywordOrMethod: "row.reverse()",
        plainEnglishExplanation:
          "Reverses the elements of a list in-place, modifying the original list directly without creating a new one.",
        exampleSnippet:
          "nums = [1, 2, 3]\nnums.reverse()\nprint(nums)",
        whyWeUseItHere:
          "Reversing each row horizontally turns a transposed matrix into a 90° clockwise rotation.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { matrix: [[1, 2], [3, 4]] },
      gridPointers: { matrix: [["r", "c"]] },
      focus: ["matrix", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "Rotating a piece of paper 90 degrees clockwise can be decomposed into two simpler geometric flips. First, flip the matrix along its main diagonal (a transpose): rows become columns. Second, flip the matrix horizontally from left to right (reverse each row). Together, these two operations place every cell exactly where a 90° clockwise rotation should put it, without needing any spare memory!",
      edgeCases: [
        "1x1 matrix: [[1]] remains [[1]], the loops finish without any swaps.",
        "2x2 matrix: the minimal non-trivial square where 4 elements rotate.",
        "Negative values and zeros: handled identically since values do not affect geometric indices.",
      ],
      stepByStepWalkthrough: [
        "Measure the size of the square grid: n = len(matrix).",
        "Step 1 (Transpose): Loop r from 0 to n - 1, and c from r + 1 to n - 1.",
        "Swap matrix[r][c] with matrix[c][r]. Now rows and columns are interchanged.",
        "Step 2 (Reflect): Loop through each row in matrix.",
        "Call row.reverse() to flip the elements in each row horizontally.",
        "The matrix is now fully rotated 90° clockwise in-place.",
      ],
    },
    hints: {
      conceptual:
        "Try drawing a 3x3 matrix on paper. Where does row 0 end up after a 90-degree turn? It becomes column n - 1. Can you achieve this by combining a reflection across the diagonal with a horizontal flip?",
      structural:
        "Use two nested loops `for r in range(n):` and `for c in range(r + 1, n):` to swap `matrix[r][c]` and `matrix[c][r]`. Then loop `for row in matrix:` and call `row.reverse()`.",
    },
    commonMistakes: [
      "Looping over all columns `range(n)` during transpose: this swaps every pair twice, canceling out the entire transpose.",
      "Allocating a new matrix: the problem requires modifying `matrix` in place.",
      "Reversing rows BEFORE transposing: this results in a 90° counter-clockwise rotation instead of clockwise.",
    ],
    starterCode: `def rotate(matrix: list[list[int]]) -> None:
    # Rotate the 2D matrix 90 degrees clockwise in-place.
    # Do not return anything, modify matrix directly.
    pass
`,
    optimalSolution: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)

    # Step 1: Transpose the matrix (swap cells across the main diagonal)
    for r in range(n):
        for c in range(r + 1, n):
            # Swap cell (r, c) with cell (c, r)
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]

    # Step 2: Reverse each row horizontally to complete the clockwise rotation
    for r in range(n):
        # Reverse row r in-place
        matrix[r].reverse()
`,
    bruteForceSolution: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)
    # Create an auxiliary grid with the rotated elements
    rotated = [[0] * n for _ in range(n)]
    for r in range(n):
        for c in range(n):
            rotated[c][n - 1 - r] = matrix[r][c]

    # Copy the rotated values back into matrix to satisfy in-place requirement
    for r in range(n):
        for c in range(n):
            matrix[r][c] = rotated[r][c]
`,
    harness: { kind: "function", entry: "rotate", inPlace: "matrix" },
    testCases: [
      {
        input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        description: "Classic 3x3 matrix rotated 90 degrees clockwise.",
      },
      {
        input: { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]] },
        expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
        description: "4x4 matrix with arbitrary numbers.",
      },
      {
        input: { matrix: [[1]] },
        expected: [[1]],
        description: "1x1 matrix remains unchanged.",
      },
      {
        input: { matrix: [[1, 2], [3, 4]] },
        expected: [[3, 1], [4, 2]],
        description: "2x2 matrix rotation.",
      },
      {
        input: { matrix: [[-1, -2], [-3, -4]] },
        expected: [[-3, -1], [-4, -2]],
      },
      {
        input: { matrix: [[0, 0], [0, 0]] },
        expected: [[0, 0], [0, 0]],
      },
      {
        input: { matrix: [[1, 2, 3], [1, 2, 3], [1, 2, 3]] },
        expected: [[1, 1, 1], [2, 2, 2], [3, 3, 3]],
      },
    ],
  },
  {
    id: "spiral-matrix",
    summary:
      "Given an `m x n` grid `matrix`, return all elements of the grid in **spiral order**, starting from top-left and traveling clockwise toward the center.",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 ≤ m, n ≤ 10",
      "-100 ≤ matrix[i][j] ≤ 100",
    ],
    pattern: "Four-boundary simulation (top, bottom, left, right)",
    timeComplexity: {
      bruteForce: "O(m × n)",
      optimal: "O(m × n)",
      explanation:
        "Every cell in the m × n grid is visited and appended to the output list exactly once.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Excluding the output list, only four integer pointer boundaries (top, bottom, left, right) are maintained.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "top, bottom = 0, len(matrix) - 1",
        plainEnglishExplanation:
          "Multiple assignment sets up boundary limits for rows and columns simultaneously.",
        exampleSnippet:
          "top, bottom = 0, 4\nprint(top, bottom)",
        whyWeUseItHere:
          "We define the current active bounds of the unvisited rectangular region.",
      },
      {
        keywordOrMethod: "range(right, left - 1, -1)",
        plainEnglishExplanation:
          "`range(start, stop, step)` with step `-1` steps backwards from `right` down to `left` inclusive.",
        exampleSnippet:
          "for c in range(3, -1, -1):\n    print(c)",
        whyWeUseItHere:
          "We need to traverse backwards along the bottom row and left column.",
      },
      {
        keywordOrMethod: "while top <= bottom and left <= right:",
        plainEnglishExplanation:
          "Continues the loop as long as the rectangular boundary hasn't completely collapsed.",
        exampleSnippet:
          "lo, hi = 0, 2\nwhile lo <= hi:\n    print(lo)\n    lo += 1",
        whyWeUseItHere:
          "Ensures we still have unvisited rows and columns inside the current boundary.",
      },
      {
        keywordOrMethod: "result.append(matrix[r][c])",
        plainEnglishExplanation:
          "Appends the visited cell value to the end of the `result` list.",
        exampleSnippet:
          "res = []\nres.append(42)\nprint(res)",
        whyWeUseItHere:
          "Collects elements in the exact order they are visited.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { matrix: [[1, 2], [3, 4]] },
      gridPointers: { matrix: [["r", "c"]] },
      focus: ["result", "top", "bottom", "left", "right"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine tracing the perimeter of a rectangular rug with your finger. You go across the top to the right, down the right side, back along the bottom to the left, and up the left side. Once that outermost perimeter is finished, you step inward to the smaller unvisited rectangle inside and repeat the same 4 strokes. Each stroke shrinks one of the four boundary walls (top, bottom, left, right) until they pass each other.",
      edgeCases: [
        "Single row matrix [[1, 2, 3]]: after traversing right, top moves past bottom, so bottom stroke must be skipped.",
        "Single column matrix [[1], [2], [3]]: after traversing down, right moves past left, so left stroke must be skipped.",
        "1x1 matrix [[5]]: immediately traversed in one step.",
        "Rectangular (non-square) matrices: bounds must be rechecked before traversing left and up.",
      ],
      stepByStepWalkthrough: [
        "Initialize boundaries: top = 0, bottom = rows - 1, left = 0, right = cols - 1.",
        "Loop while top <= bottom and left <= right.",
        "Stroke 1: traverse row `top` from column `left` to `right`, append elements, then increment top += 1.",
        "Stroke 2: traverse col `right` from row `top` to `bottom`, append elements, then decrement right -= 1.",
        "Stroke 3: if top <= bottom still holds, traverse row `bottom` from `right` down to `left`, append elements, then decrement bottom -= 1.",
        "Stroke 4: if left <= right still holds, traverse col `left` from `bottom` up to `top`, append elements, then increment left += 1.",
        "Return the resulting spiral list.",
      ],
    },
    hints: {
      conceptual:
        "Think of peeling a rectangle in 4 strokes: right, down, left, up. What are the boundaries of the unvisited cells at any point?",
      structural:
        "Use four pointers: `top`, `bottom`, `left`, `right`. Run a `while top <= bottom and left <= right:` loop with four sequential `for` loops inside. Make sure to check `top <= bottom` before moving left and `left <= right` before moving up.",
    },
    commonMistakes: [
      "Forgetting to check `if top <= bottom` before the third stroke, causing duplicate visits on matrices with an odd number of rows.",
      "Off-by-one errors with reverse ranges: in Python `range(right, left, -1)` stops at `left + 1`, skipping column `left`.",
      "Mutating boundary pointers before reading the elements along that boundary.",
    ],
    starterCode: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    # Return all elements of the matrix in spiral order.
    # Tip: maintain four boundaries (top, bottom, left, right) and shrink them.
    pass
`,
    optimalSolution: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    if not matrix or not matrix[0]:
        return []

    result = []
    # Four boundary limits for the unvisited inner rectangle
    top = 0
    bottom = len(matrix) - 1
    left = 0
    right = len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Stroke 1: Move left to right along top boundary
        r = top
        for c in range(left, right + 1):
            result.append(matrix[r][c])
        top += 1

        # Stroke 2: Move top to bottom along right boundary
        c = right
        for r in range(top, bottom + 1):
            result.append(matrix[r][c])
        right -= 1

        # Stroke 3: Move right to left along bottom boundary (if rows remain)
        if top <= bottom:
            r = bottom
            for c in range(right, left - 1, -1):
                result.append(matrix[r][c])
            bottom -= 1

        # Stroke 4: Move bottom to top along left boundary (if columns remain)
        if left <= right:
            c = left
            for r in range(bottom, top - 1, -1):
                result.append(matrix[r][c])
            left += 1

    return result
`,
    bruteForceSolution: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    if not matrix:
        return []
    rows, cols = len(matrix), len(matrix[0])
    seen = [[False] * cols for _ in range(rows)]
    result = []
    # Directions: right, down, left, up
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    d = 0
    r, c = 0, 0

    for _ in range(rows * cols):
        result.append(matrix[r][c])
        seen[r][c] = True
        dr, dc = directions[d]
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols and not seen[nr][nc]:
            r, c = nr, nc
        else:
            d = (d + 1) % 4
            dr, dc = directions[d]
            r, c = r + dr, c + dc

    return result
`,
    harness: { kind: "function", entry: "spiral_order" },
    testCases: [
      {
        input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
        description: "3x3 square grid traversed spiraling inward.",
      },
      {
        input: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] },
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
        description: "3x4 rectangular grid.",
      },
      {
        input: { matrix: [[1]] },
        expected: [1],
        description: "Single element matrix.",
      },
      {
        input: { matrix: [[1, 2, 3, 4]] },
        expected: [1, 2, 3, 4],
        description: "Single row matrix.",
      },
      {
        input: { matrix: [[1], [2], [3], [4]] },
        expected: [1, 2, 3, 4],
        description: "Single column matrix.",
      },
      {
        input: { matrix: [[1, 2], [3, 4]] },
        expected: [1, 2, 4, 3],
      },
      {
        input: { matrix: [[2, 5, 8], [4, 0, -1]] },
        expected: [2, 5, 8, -1, 0, 4],
      },
    ],
  },
  {
    id: "set-matrix-zeroes",
    summary:
      "Given an `m x n` integer grid `matrix`, if an element is `0`, set its entire row and column to `0` **in place**. Solve it using constant **O(1)** additional space.",
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 ≤ m, n ≤ 200",
      "-2^31 ≤ matrix[i][j] ≤ 2^31 - 1",
    ],
    pattern: "Use first row and first column as zero markers",
    timeComplexity: {
      bruteForce: "O(m × n × (m + n))",
      optimal: "O(m × n)",
      explanation:
        "We inspect the grid in two main passes: first pass records zero locations in the first row/column, and the second pass updates inner cells. Total operations are proportional to m × n.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Instead of allocating row and column sets of size O(m + n), we use the matrix's own first row and first column as marker flags, plus two boolean variables.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "any(matrix[0][c] == 0 for c in range(cols))",
        plainEnglishExplanation:
          "`any()` returns `True` if any element of the generator expression is truthy. Here it tests if the first row originally had a zero.",
        exampleSnippet:
          "row = [1, 0, 5]\nprint(any(x == 0 for x in row))",
        whyWeUseItHere:
          "We must record if row 0 itself originally needed zeroing before using it as scratch space.",
      },
      {
        keywordOrMethod: "rows, cols = len(matrix), len(matrix[0])",
        plainEnglishExplanation:
          "Gets the number of rows (outer list length) and columns (inner list length).",
        exampleSnippet:
          "grid = [[1, 2, 3], [4, 5, 6]]\nprint(len(grid), len(grid[0]))",
        whyWeUseItHere:
          "Determines loop iteration bounds for the 2D grid.",
      },
      {
        keywordOrMethod: "for r in range(1, rows):",
        plainEnglishExplanation:
          "`range(1, rows)` skips row 0, iterating only through rows 1 to `rows - 1`.",
        exampleSnippet:
          "for i in range(1, 4):\n    print(i)",
        whyWeUseItHere:
          "We process inner cells without overwriting the markers stored in row 0 and column 0.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { matrix: [[1, 0], [1, 1]] },
      gridPointers: { matrix: [["r", "c"]] },
      focus: ["matrix", "first_row_zero", "first_col_zero"],
    },
    intuitiveExplanation: {
      intuition:
        "If you zero out rows and columns immediately as you see each zero, new zeros will spread like wildfire and erase the entire grid! We need markers to record which rows and columns *originally* contained a zero. Normally you'd keep two separate sets for zero rows and zero columns (taking O(m + n) extra memory). But the first row and first column of the grid are already sitting right there! We use them as our marker flags, and use two simple booleans to track whether row 0 and col 0 themselves need zeroing.",
      edgeCases: [
        "Cell (0, 0) is shared by both row 0 and col 0: separate booleans prevent row 0's status from corrupting col 0's status.",
        "Grid with no zeros: matrix remains completely unchanged.",
        "Grid with all zeros: all cells remain zero.",
        "1x1 matrix with [0] or [5].",
      ],
      stepByStepWalkthrough: [
        "Check if row 0 originally contains any 0 (store in first_row_zero).",
        "Check if col 0 originally contains any 0 (store in first_col_zero).",
        "Iterate over inner cells (r from 1 to m - 1, c from 1 to n - 1): if matrix[r][c] == 0, mark matrix[r][0] = 0 and matrix[0][c] = 0.",
        "Iterate over inner cells again: if matrix[r][0] == 0 or matrix[0][c] == 0, set matrix[r][c] = 0.",
        "If first_row_zero is True, set all cells in row 0 to 0.",
        "If first_col_zero is True, set all cells in col 0 to 0.",
      ],
    },
    hints: {
      conceptual:
        "You cannot overwrite cells right away because newly added zeros will look like original zeros. Where can you store notes about which rows and columns should be zeroed?",
      structural:
        "Use `matrix[r][0] = 0` and `matrix[0][c] = 0` as markers. Track the original status of row 0 and col 0 with two booleans `first_row_zero` and `first_col_zero`.",
    },
    commonMistakes: [
      "Zeroing out cells on the first pass, which cascades zeros across the whole board.",
      "Sharing cell `matrix[0][0]` for both row 0 and column 0 without separate flags, causing both to be wiped out if either contains a zero.",
      "Overwriting row 0 or column 0 before inner cells have read their marker values.",
    ],
    starterCode: `def set_zeroes(matrix: list[list[int]]) -> None:
    # Modify matrix in-place such that if an element is 0,
    # its entire row and column are set to 0.
    # Target O(1) extra space.
    pass
`,
    optimalSolution: `def set_zeroes(matrix: list[list[int]]) -> None:
    rows = len(matrix)
    cols = len(matrix[0])

    # Record whether row 0 and col 0 originally contain any zeros
    first_row_zero = any(matrix[0][c] == 0 for c in range(cols))
    first_col_zero = any(matrix[r][0] == 0 for r in range(rows))

    # Use first row and column to store zero markers for inner cells
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0

    # Apply zeroes to inner cells based on boundary markers
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0

    # Finally, zero out row 0 if it originally had a zero
    if first_row_zero:
        for c in range(cols):
            matrix[0][c] = 0

    # Zero out col 0 if it originally had a zero
    if first_col_zero:
        for r in range(rows):
            matrix[r][0] = 0
`,
    bruteForceSolution: `def set_zeroes(matrix: list[list[int]]) -> None:
    rows = len(matrix)
    cols = len(matrix[0])
    zero_rows = set()
    zero_cols = set()

    # Pass 1: find all original zero positions
    for r in range(rows):
        for c in range(cols):
            if matrix[r][c] == 0:
                zero_rows.add(r)
                zero_cols.add(c)

    # Pass 2: update cells
    for r in range(rows):
        for c in range(cols):
            if r in zero_rows or c in zero_cols:
                matrix[r][c] = 0
`,
    harness: { kind: "function", entry: "set_zeroes", inPlace: "matrix" },
    testCases: [
      {
        input: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] },
        expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
        description: "Zero in center zeroes out middle row and middle column.",
      },
      {
        input: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] },
        expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
        description: "Multiple zeros in the first row zero out multiple columns.",
      },
      {
        input: { matrix: [[1]] },
        expected: [[1]],
        description: "1x1 without zeros remains untouched.",
      },
      {
        input: { matrix: [[0]] },
        expected: [[0]],
        description: "1x1 with zero remains zero.",
      },
      {
        input: { matrix: [[1, 0]] },
        expected: [[0, 0]],
      },
      {
        input: { matrix: [[0], [1]] },
        expected: [[0], [0]],
      },
      {
        input: { matrix: [[1, 2, 3], [4, 5, 6]] },
        expected: [[1, 2, 3], [4, 5, 6]],
      },
      {
        input: { matrix: [[0, 0], [0, 0]] },
        expected: [[0, 0], [0, 0]],
      },
    ],
  },
  {
    id: "happy-number",
    summary:
      "Determine if a positive integer `n` is a **happy number**. Starting with `n`, replace the number with the sum of the squares of its digits. Repeat until the number reaches `1` (happy), or loops endlessly in a cycle that never includes `1` (unhappy). Return `True` if `n` is happy, or `False` otherwise.",
    constraints: ["1 ≤ n ≤ 2^31 - 1"],
    pattern: "Floyd's cycle-finding (slow and fast pointers)",
    timeComplexity: {
      bruteForce: "O(log n)",
      optimal: "O(log n)",
      explanation:
        "Extracting digits of n takes O(log n) time. The sum of squared digits drops quickly into numbers under 243. Once in this small finite domain, any sequence either hits 1 or repeats within at most a few dozen steps.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Floyd's tortoise-and-hare cycle detection uses only two integer pointers (`slow` and `fast`), avoiding the O(log n) space required by a hash set.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "number % 10 and number //= 10",
        plainEnglishExplanation:
          "`% 10` extracts the rightmost decimal digit, and `//= 10` strips it off, allowing us to peel digits one by one.",
        exampleSnippet:
          "num = 19\nprint(num % 10, num // 10)",
        whyWeUseItHere:
          "Extracts each digit to compute the sum of squares without converting to strings.",
      },
      {
        keywordOrMethod: "def get_next(number: int) -> int:",
        plainEnglishExplanation:
          "Defining a helper function inside another function keeps code modular and scoped.",
        exampleSnippet:
          "def outer():\n    def helper(x):\n        return x * x\n    return helper(4)\nprint(outer())",
        whyWeUseItHere:
          "Encapsulates the digit-squaring step so both slow and fast pointers can reuse it.",
      },
      {
        keywordOrMethod: "while fast != 1 and slow != fast:",
        plainEnglishExplanation:
          "Runs until either we reach the goal (1) or the two pointers collide (detecting a cycle).",
        exampleSnippet:
          "s, f = 1, 3\nprint(s != f)",
        whyWeUseItHere:
          "Implements Floyd's cycle detection loop termination condition.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { n: 19 },
      focus: ["slow", "fast"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of computing the sum of squared digits as taking a step along a path. Because sums of squares for any number quickly drop below 243, there are only a finite number of possible values. Like walking along a path that either leads to a destination (1) or loops endlessly around a roundabout, we can send two runners: a slow tortoise taking 1 step and a fast hare taking 2 steps. If there is a loop, the hare will inevitably lap the tortoise!",
      edgeCases: [
        "n = 1: already happy, returns True immediately.",
        "n = 4: the classic entry into the unhappy 8-number cycle (4 -> 16 -> 37 -> ... -> 4).",
        "Large powers of 10: 10, 100, 1000 all lead to 1² = 1.",
      ],
      stepByStepWalkthrough: [
        "Define helper `get_next(number)` to calculate sum of squared digits.",
        "Initialize `slow = n` and `fast = get_next(n)`.",
        "Loop while `fast != 1` and `slow != fast`.",
        "Advance `slow` by 1 step (`get_next(slow)`).",
        "Advance `fast` by 2 steps (`get_next(get_next(fast))` ).",
        "If `fast == 1`, return `True` (happy). Otherwise they met in a cycle, return `False`.",
      ],
    },
    hints: {
      conceptual:
        "Either the sequence reaches 1, or it revisits a number it has seen before. How can you detect if a sequence loops without storing every number in a set?",
      structural:
        "Use Floyd's tortoise and hare: initialize `slow = n`, `fast = get_next(n)`. Move slow 1 step and fast 2 steps in a `while fast != 1 and slow != fast:` loop. Return `fast == 1`.",
    },
    commonMistakes: [
      "Starting `fast = n`: then `slow == fast` is True before any steps are taken, immediately exiting.",
      "Infinite loop without cycle detection: numbers like 2 or 4 never reach 1 and will freeze the program without detection.",
      "Using string conversion `str(n)` in a tight loop instead of math `% 10` and `// 10`.",
    ],
    starterCode: `def is_happy(n: int) -> bool:
    # Determine if n is a happy number (reaches 1 via sum of digit squares).
    # Tip: use Floyd's tortoise and hare cycle detection to use O(1) space.
    pass
`,
    optimalSolution: `def is_happy(n: int) -> bool:
    # Helper to calculate the sum of squared digits
    def get_next(number: int) -> int:
        total = 0
        while number > 0:
            digit = number % 10
            total += digit * digit
            number //= 10
        return total

    # Floyd's cycle detection: slow advances 1 step, fast advances 2 steps
    slow = n
    fast = get_next(n)

    # Loop until fast finds 1 or catches up with slow (cycle detected)
    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))

    # If fast reached 1, n is a happy number!
    return fast == 1
`,
    bruteForceSolution: `def is_happy(n: int) -> bool:
    def get_next(number: int) -> int:
        total = 0
        while number > 0:
            digit = number % 10
            total += digit * digit
            number //= 10
        return total

    # Hash set to remember previously seen numbers
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = get_next(n)

    return n == 1
`,
    harness: { kind: "function", entry: "is_happy" },
    testCases: [
      {
        input: { n: 19 },
        expected: true,
        description: "1² + 9² = 82 → 68 → 100 → 1. Reaches 1, so it is happy.",
      },
      {
        input: { n: 2 },
        expected: false,
        description: "2 enters a cycle and never reaches 1.",
      },
      {
        input: { n: 1 },
        expected: true,
        description: "1 is already happy.",
      },
      {
        input: { n: 7 },
        expected: true,
        description: "7 reaches 1 (7 → 49 → 97 → 130 → 10 → 1).",
      },
      {
        input: { n: 4 },
        expected: false,
        description: "4 is the famous unhappy cycle.",
      },
      {
        input: { n: 100 },
        expected: true,
      },
      {
        input: { n: 1111111 },
        expected: true,
      },
    ],
  },
  {
    id: "plus-one",
    summary:
      "You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i-th` digit of the number ordered from most to least significant. Increment the large integer by **one** and return the resulting array of digits.",
    constraints: [
      "1 ≤ digits.length ≤ 100",
      "0 ≤ digits[i] ≤ 9",
      "digits does not contain any leading 0's (unless digits is [0])",
    ],
    pattern: "Reverse scan with carry propagation",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "In the best case (last digit < 9), we exit in O(1) time. In the worst case (all 9s like 999), we inspect all n digits and prepend 1, taking O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The digits are modified in place. If an extra digit is needed for all 9s, the new list takes O(n) memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "range(len(digits) - 1, -1, -1)",
        plainEnglishExplanation:
          "Iterates backwards from the last index down to 0, which corresponds to reading from least to most significant digit.",
        exampleSnippet:
          "arr = [10, 20, 30]\nfor i in range(len(arr) - 1, -1, -1):\n    print(i, arr[i])",
        whyWeUseItHere:
          "Addition begins at the units place (the rightmost digit).",
      },
      {
        keywordOrMethod: "[1] + digits",
        plainEnglishExplanation:
          "List concatenation with `+` creates a new list with `1` at the front followed by all elements of `digits`.",
        exampleSnippet:
          "zeros = [0, 0]\nprint([1] + zeros)",
        whyWeUseItHere:
          "Handles the all-9s rollover (e.g. `[9, 9]` rolls over to `[0, 0]`, prepending `1` yields `[1, 0, 0]`).",
      },
      {
        keywordOrMethod: "digits[i] += 1",
        plainEnglishExplanation:
          "Directly increments the element at index `i` in place.",
        exampleSnippet:
          "nums = [3, 4]\nnums[1] += 1\nprint(nums)",
        whyWeUseItHere:
          "Increments the digit when there is no rollover.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { digits: [1, 2, 9] },
      pointers: { digits: ["i"] },
      focus: ["digits", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of an odometer in a car. Adding 1 normally just increments the rightmost digit wheel. But if that wheel is on 9, it flips to 0 and carries 1 over to the wheel on its left. If that wheel is also on 9, it rolls over too. The carry only stops when it hits a digit strictly less than 9. If all wheels roll over to 0 (like 999), a new 1 pops up at the very front to make 1000.",
      edgeCases: [
        "No carry past the last digit: [1, 2, 3] -> [1, 2, 4].",
        "Multiple carries stopping mid-array: [1, 9, 9] -> [2, 0, 0].",
        "All nines: [9, 9, 9] -> [1, 0, 0, 0].",
        "Single zero: [0] -> [1].",
      ],
      stepByStepWalkthrough: [
        "Loop backwards from index len(digits) - 1 down to 0.",
        "If digits[i] < 9, increment digits[i] += 1 and return digits immediately.",
        "If digits[i] == 9, set digits[i] = 0 and continue loop to carry 1 left.",
        "If loop ends, every digit was a 9 (all are now 0s).",
        "Return [1] + digits to place the carried 1 at the front.",
      ],
    },
    hints: {
      conceptual:
        "Start adding from the rightmost digit. When does a carry propagate, and when does it stop?",
      structural:
        "Loop `for i in range(len(digits) - 1, -1, -1):`. If `digits[i] < 9`, add 1 and `return digits`. Otherwise set `digits[i] = 0`. Outside the loop, `return [1] + digits`.",
    },
    commonMistakes: [
      "Converting the array to an integer with `int(''.join(map(str, digits)))`: while working in Python for small inputs, it violates the spirit of large integer array arithmetic.",
      "Using `digits.insert(0, 1)` inside a loop, which shifts elements repeatedly in O(n) time.",
      "Failing the all-9s case by returning `[0, 0, 0]` instead of `[1, 0, 0, 0]`.",
    ],
    starterCode: `def plus_one(digits: list[int]) -> list[int]:
    # Increment the large integer represented by digits by one.
    # Return the resulting list of digits.
    pass
`,
    optimalSolution: `def plus_one(digits: list[int]) -> list[int]:
    # Traverse from rightmost (units) digit to leftmost
    for i in range(len(digits) - 1, -1, -1):
        # If current digit is under 9, increment and we are done!
        if digits[i] < 9:
            digits[i] += 1
            return digits

        # Digit is 9: it rolls over to 0 and carry propagates left
        digits[i] = 0

    # If every digit was 9 (e.g. [9, 9] -> [0, 0]), prepend 1 to make [1, 0, 0]
    return [1] + digits
`,
    bruteForceSolution: `def plus_one(digits: list[int]) -> list[int]:
    carry = 1
    result = []
    for digit in reversed(digits):
        total = digit + carry
        result.append(total % 10)
        carry = total // 10
    if carry:
        result.append(carry)
    result.reverse()
    return result
`,
    harness: { kind: "function", entry: "plus_one" },
    testCases: [
      {
        input: { digits: [1, 2, 3] },
        expected: [1, 2, 4],
        description: "123 + 1 = 124.",
      },
      {
        input: { digits: [4, 3, 2, 1] },
        expected: [4, 3, 2, 2],
        description: "4321 + 1 = 4322.",
      },
      {
        input: { digits: [9] },
        expected: [1, 0],
        description: "9 + 1 = 10.",
      },
      {
        input: { digits: [9, 9, 9] },
        expected: [1, 0, 0, 0],
        description: "All 9s roll over to 1000.",
      },
      {
        input: { digits: [1, 9, 9] },
        expected: [2, 0, 0],
      },
      {
        input: { digits: [0] },
        expected: [1],
      },
      {
        input: { digits: [8, 9, 9, 9] },
        expected: [9, 0, 0, 0],
      },
    ],
  },
  {
    id: "powx-n",
    summary:
      "Implement `my_pow(x, n)`, which calculates `x` raised to the power `n` (`x^n`). Solve it in **O(log n)** time using binary exponentiation.",
    constraints: [
      "-100.0 < x < 100.0",
      "-2^31 ≤ n ≤ 2^31 - 1",
      "n is an integer",
      "-10^4 ≤ x^n ≤ 10^4",
    ],
    pattern: "Binary exponentiation (Fast power)",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(log n)",
      explanation:
        "The exponent is halved in each step using integer division `power //= 2`. For n = 2³¹, this requires only 31 iterations instead of 2 billion multiplications.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Iterative binary exponentiation only tracks a few numeric variables.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "power //= 2",
        plainEnglishExplanation:
          "Integer division operator `//=` divides by 2 and discards any fractional part, effectively shifting binary bits right.",
        exampleSnippet:
          "p = 10\np //= 2\nprint(p)",
        whyWeUseItHere:
          "Halves the exponent in each step of fast power.",
      },
      {
        keywordOrMethod: "power % 2 == 1",
        plainEnglishExplanation:
          "Tests whether a number is odd (its lowest binary bit is 1).",
        exampleSnippet:
          "print(5 % 2 == 1)\nprint(4 % 2 == 1)",
        whyWeUseItHere:
          "Determines whether the current power of x should be multiplied into our running result.",
      },
      {
        keywordOrMethod: "x = 1 / x",
        plainEnglishExplanation:
          "Inverts the base to compute negative powers: `x^(-n) = (1/x)^n`.",
        exampleSnippet:
          "val = 2.0\nprint(1 / val)",
        whyWeUseItHere:
          "Converts negative exponents to positive exponents cleanly.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { x: 2.0, n: 4 },
      focus: ["result", "current_product", "power"],
    },
    intuitiveExplanation: {
      intuition:
        "To compute 2¹⁰, you don't need to multiply 2 ten times. Notice that 2¹⁰ = (2²)⁵ = 4⁵. And 4⁵ = 4 × 4⁴ = 4 × (4²)² = 4 × 16². By squaring the base each time, the exponent cuts in half! This shrinks a problem of 1,000 steps into just 10 steps, decomposing the exponent into powers of two just like a binary number.",
      edgeCases: [
        "n = 0: any non-zero base to the 0th power is 1.0.",
        "Negative n: 2^(-2) = (1/2)^2 = 0.25.",
        "x = 1.0 or -1.0: power stays 1.0 or toggles between -1.0 and 1.0.",
        "n = -2^31: Python integers do not overflow when negated.",
      ],
      stepByStepWalkthrough: [
        "If n < 0, invert the base x = 1 / x and set power = -n.",
        "Initialize result = 1.0 and current_product = x.",
        "While power > 0:",
        "If power is odd (power % 2 == 1), multiply result by current_product.",
        "Square the base: current_product *= current_product.",
        "Halve the exponent: power //= 2.",
        "Return result.",
      ],
    },
    hints: {
      conceptual:
        "Instead of multiplying by x n times, what happens if you square x? x^8 is ((x^2)^2)^2. How many multiplications did that take?",
      structural:
        "Handle `n < 0` with `x = 1 / x` and `power = -n`. Run `while power > 0:`. If `power % 2 == 1`, multiply `result *= current_product`. Then square `current_product` and divide `power //= 2`.",
    },
    commonMistakes: [
      "Multiplying in a linear loop `for _ in range(n):`, which times out when n is 2³¹ - 1.",
      "Forgetting negative exponents where `x^(-n) = (1/x)^n`.",
      "Using recursion without memoization or tail optimization, risking recursion depth limits.",
    ],
    starterCode: `def my_pow(x: float, n: int) -> float:
    # Calculate x raised to the power n (x^n).
    # Aim for O(log n) time using binary exponentiation.
    pass
`,
    optimalSolution: `def my_pow(x: float, n: int) -> float:
    # Handle negative powers: x^(-n) == (1/x)^n
    if n < 0:
        x = 1 / x
        power = -n
    else:
        power = n

    result = 1.0
    current_product = x

    # Binary exponentiation: halve power and square current_product
    while power > 0:
        # If the lowest bit of power is 1, contribute current_product to result
        if power % 2 == 1:
            result *= current_product

        # Square the base for the next bit position
        current_product *= current_product
        # Halve the exponent
        power //= 2

    return result
`,
    bruteForceSolution: `def my_pow(x: float, n: int) -> float:
    if n == 0:
        return 1.0
    if n < 0:
        x = 1 / x
        n = -n
    # Recursive divide-and-conquer formulation
    def fast_pow(base: float, exp: int) -> float:
        if exp == 0:
            return 1.0
        half = fast_pow(base, exp // 2)
        if exp % 2 == 0:
            return half * half
        return half * half * base

    return fast_pow(x, n)
`,
    harness: { kind: "function", entry: "my_pow" },
    testCases: [
      {
        input: { x: 2.0, n: 10 },
        expected: 1024.0,
        description: "2¹⁰ = 1024.0.",
      },
      {
        input: { x: 2.1, n: 3 },
        expected: 9.261,
        description: "2.1³ = 9.261.",
      },
      {
        input: { x: 2.0, n: -2 },
        expected: 0.25,
        description: "2⁻² = (1/2)² = 0.25.",
      },
      {
        input: { x: 1.0, n: 2147483647 },
        expected: 1.0,
      },
      {
        input: { x: 0.5, n: 2 },
        expected: 0.25,
      },
      {
        input: { x: 2.0, n: 0 },
        expected: 1.0,
      },
      {
        input: { x: -2.0, n: 3 },
        expected: -8.0,
      },
      {
        input: { x: -2.0, n: 2 },
        expected: 4.0,
      },
    ],
  },
  {
    id: "multiply-strings",
    summary:
      "Given two non-negative integers `num1` and `num2` represented as strings, return their product as a string. You must **not** use built-in `BigInteger` libraries or convert inputs directly to integers with `int()`.",
    constraints: [
      "1 ≤ num1.length, num2.length ≤ 200",
      "num1 and num2 consist of digits only.",
      "Both num1 and num2 do not contain leading zero, except the number 0 itself.",
    ],
    pattern: "Elementary school column multiplication on digit arrays",
    timeComplexity: {
      bruteForce: "O(m × n)",
      optimal: "O(m × n)",
      explanation:
        "Where m = len(num1) and n = len(num2). We multiply every digit of num1 by every digit of num2, requiring m × n single-digit multiplications.",
    },
    spaceComplexity: {
      optimal: "O(m + n)",
      explanation:
        "The product of an m-digit and n-digit number has at most m + n digits, stored in an array of size m + n.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "ord(char) - ord('0')",
        plainEnglishExplanation:
          "`ord()` gives the ASCII integer value of a character. Subtracting `ord('0')` converts a character like `'7'` to the integer `7` without using `int()`.",
        exampleSnippet:
          "ch = '7'\nprint(ord(ch) - ord('0'))",
        whyWeUseItHere:
          "Converts string digit characters to numbers without violating the problem constraint.",
      },
      {
        keywordOrMethod: "[0] * (m + n)",
        plainEnglishExplanation:
          "Allocates a list filled with zeros of length `m + n`.",
        exampleSnippet:
          "arr = [0] * 4\nprint(arr)",
        whyWeUseItHere:
          "Holds intermediate and final digit totals before string conversion.",
      },
      {
        keywordOrMethod: "''.join(str(d) for d in result[start:])",
        plainEnglishExplanation:
          "Slices the result list from the first non-zero digit, turns each digit into a string, and joins them into a single string.",
        exampleSnippet:
          "digits = [1, 2, 3]\nprint(''.join(str(d) for d in digits))",
        whyWeUseItHere:
          "Builds the final answer string from the digit array.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { num1: "12", num2: "3" },
      focus: ["result", "i", "j"],
    },
    intuitiveExplanation: {
      intuition:
        "Remember pencil-and-paper multiplication from school? You multiply each digit in the bottom number by each digit in the top number, shifting left for each place value, and sum the columns. In an array of size len(num1) + len(num2), digit num1[i] times digit num2[j] always lands precisely in slots i + j and i + j + 1! Position i + j + 1 takes the units digit, while position i + j absorbs the carry.",
      edgeCases: [
        "Either input is '0': multiplying anything by 0 returns '0', not '00' or ''.",
        "Single digit inputs: '2' * '3' = '6'.",
        "Unequal lengths: '123' * '45' = '5535'.",
        "All nines: '99' * '99' = '9801'.",
      ],
      stepByStepWalkthrough: [
        "If either num1 == '0' or num2 == '0', return '0' immediately.",
        "Allocate result = [0] * (len(num1) + len(num2)).",
        "Loop backwards over num1 with index i, and num2 with index j.",
        "Multiply the two single digits: total = d1 * d2 + result[i + j + 1].",
        "Store the units digit: result[i + j + 1] = total % 10.",
        "Carry over the tens digit: result[i + j] += total // 10.",
        "Skip any leading zeros at the start of result, convert digits to characters, and join.",
      ],
    },
    hints: {
      conceptual:
        "How many digits can the product of an m-digit and n-digit number have? At most m + n. Can you place each single-digit product directly into its corresponding slot?",
      structural:
        "Create an array `result = [0] * (len(num1) + len(num2))`. Iterate backwards with two nested loops: `for i in range(len(num1) - 1, -1, -1):` and `for j in range(len(num2) - 1, -1, -1):`. Add product to `result[i + j + 1]` and carry to `result[i + j]`.",
    },
    commonMistakes: [
      "Using `int(num1) * int(num2)`, which directly violates the core constraint of the problem.",
      "Misplacing the carry at `result[i + j - 1]` instead of `result[i + j]`.",
      "Failing to strip leading zeros, returning `'00'` or `'0408'` instead of `'0'` or `'408'`.",
    ],
    starterCode: `def multiply(num1: str, num2: str) -> str:
    # Multiply two number strings without using int() or BigInteger.
    # Return the product as a string.
    pass
`,
    optimalSolution: `def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"

    m, n = len(num1), len(num2)
    # The product of m digits and n digits has at most m + n digits
    result = [0] * (m + n)

    # Multiply each digit pair from right to left
    for i in range(m - 1, -1, -1):
        d1 = ord(num1[i]) - ord("0")
        for j in range(n - 1, -1, -1):
            d2 = ord(num2[j]) - ord("0")
            # Multiply digits and add to previous value at position i + j + 1
            total = d1 * d2 + result[i + j + 1]
            # Store units digit at position i + j + 1
            result[i + j + 1] = total % 10
            # Carry over tens digit to position i + j
            result[i + j] += total // 10

    # Skip any leading zeros at the beginning
    start = 0
    while start < len(result) and result[start] == 0:
        start += 1

    # Join the remaining digits into a string
    return "".join(str(d) for d in result[start:])
`,
    bruteForceSolution: `def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    v1 = 0
    for ch in num1:
        v1 = v1 * 10 + (ord(ch) - ord("0"))
    v2 = 0
    for ch in num2:
        v2 = v2 * 10 + (ord(ch) - ord("0"))
    prod = v1 * v2

    digits = []
    while prod > 0:
        digits.append(chr(ord("0") + (prod % 10)))
        prod //= 10
    digits.reverse()
    return "".join(digits)
`,
    harness: { kind: "function", entry: "multiply" },
    testCases: [
      {
        input: { num1: "2", num2: "3" },
        expected: "6",
        description: "2 × 3 = 6.",
      },
      {
        input: { num1: "123", num2: "456" },
        expected: "56088",
        description: "123 × 456 = 56088.",
      },
      {
        input: { num1: "0", num2: "456" },
        expected: "0",
        description: "Multiplying by 0 gives '0'.",
      },
      {
        input: { num1: "99", num2: "99" },
        expected: "9801",
      },
      {
        input: { num1: "9", num2: "9" },
        expected: "81",
      },
      {
        input: { num1: "12", num2: "34" },
        expected: "408",
      },
      {
        input: { num1: "100", num2: "10" },
        expected: "1000",
      },
    ],
  },
  {
    id: "detect-squares",
    summary:
      "Design a data structure that receives a stream of 2D points and counts the number of axis-aligned squares that can be formed using a given query point as one of the four corners.",
    constraints: [
      "point.length == 2",
      "0 ≤ x, y ≤ 1000",
      "At most 3000 calls in total will be made to add and count.",
    ],
    pattern: "Hash map of point frequencies with diagonal candidate testing",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n) per count, O(1) per add",
      explanation:
        "add() records the point in O(1) time. count() iterates through all distinct points seen so far (at most n points), checking if each can form a diagonal with the query point in O(1) dictionary lookups.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "We store the coordinates and occurrence counts of up to n added points in a hash map.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import defaultdict",
        plainEnglishExplanation:
          "`defaultdict(int)` creates a dictionary that automatically initializes missing keys to 0 instead of throwing a KeyError.",
        exampleSnippet:
          "from collections import defaultdict\ncounts = defaultdict(int)\ncounts[(1, 2)] += 1\nprint(counts[(1, 2)])",
        whyWeUseItHere:
          "Allows clean frequency counting of 2D coordinates.",
      },
      {
        keywordOrMethod: "(point[0], point[1])",
        plainEnglishExplanation:
          "Tuples `(x, y)` are immutable and therefore hashable, making them valid dictionary keys, whereas lists `[x, y]` cannot be dictionary keys.",
        exampleSnippet:
          "pt = (3, 4)\nd = {pt: 'origin'}\nprint(d[(3, 4)])",
        whyWeUseItHere:
          "We store coordinates as tuples in our frequency dictionary.",
      },
      {
        keywordOrMethod: "self.point_counts.get(corner, 0)",
        plainEnglishExplanation:
          "`.get(key, 0)` returns the count if `key` is present, or `0` if not, without adding the key into the dictionary.",
        exampleSnippet:
          "d = {'a': 5}\nprint(d.get('a', 0))\nprint(d.get('b', 0))",
        whyWeUseItHere:
          "Safely looks up other corners without mutating the dictionary while iterating through it.",
      },
      {
        keywordOrMethod: "abs(px - x) == abs(py - y)",
        plainEnglishExplanation:
          "`abs()` computes absolute difference. For an axis-aligned square, width must equal height.",
        exampleSnippet:
          "print(abs(5 - 9) == abs(2 - 6))",
        whyWeUseItHere:
          "Tests if candidate point (x, y) can form a valid square diagonal with query point (px, py).",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        operations: ["DetectSquares", "add", "add", "add", "count"],
        arguments: [[], [[0, 0]], [[0, 1]], [[1, 0]], [[1, 1]]],
      },
      focus: ["total_squares", "px", "py"],
    },
    intuitiveExplanation: {
      intuition:
        "An axis-aligned square is completely determined by two diagonally opposite corners! If your query point is P = (px, py), any other point D = (x, y) can be the opposite diagonal corner if and only if |px - x| == |py - y| > 0. Once you pick D, the positions of the other two corners are completely locked: one must be at (px, y) and the other at (x, py). The number of squares you can form is simply the product of how many times each of those three points was added!",
      edgeCases: [
        "Query point coincides with candidate point (px == x and py == y): side length is 0, which has area 0 and is not a square.",
        "Duplicate points: points added multiple times at the same coordinate multiply the number of valid squares.",
        "Points forming rectangles that are not squares (|px - x| != |py - y|): skipped.",
      ],
      stepByStepWalkthrough: [
        "In __init__, initialize `self.point_counts = defaultdict(int)`.",
        "In add(point), convert point to tuple `(point[0], point[1])` and increment its frequency.",
        "In count(point), let `px, py = point[0], point[1]` and `total_squares = 0`.",
        "Loop over all existing points `(x, y)` and their frequency `count` in `point_counts`.",
        "Check if `(x, y)` forms a valid diagonal: `abs(px - x) == abs(py - y)` and `px != x`.",
        "If valid, look up counts of the other two required corners `(px, y)` and `(x, py)`.",
        "Add `count * point_counts.get((px, y), 0) * point_counts.get((x, py), 0)` to `total_squares`.",
        "Return `total_squares`.",
      ],
    },
    hints: {
      conceptual:
        "If you fix one corner (the query point) and a diagonally opposite corner, the positions of the other two corners are completely determined. How can you test all possible diagonals?",
      structural:
        "Store point frequencies in `self.point_counts = defaultdict(int)`. In `count`, iterate through `(x, y), count` in `self.point_counts.items()`. If `abs(px - x) == abs(py - y) and px != x`, multiply `count * point_counts.get((px, y), 0) * point_counts.get((x, py), 0)`.",
    },
    commonMistakes: [
      "Using `self.point_counts[(px, y)]` during iteration: in Python, accessing a missing key in a `defaultdict` inserts the key, raising `RuntimeError: dictionary changed size during iteration`. Use `.get()` instead!",
      "Counting squares of side length 0 (when x == px and y == py). The problem requires positive area.",
      "Adding point counts instead of multiplying: combinations multiply.",
    ],
    starterCode: `class DetectSquares:
    def __init__(self):
        # Initialize your data structure here.
        pass

    def add(self, point: list[int]) -> None:
        # Add a point to the data structure.
        pass

    def count(self, point: list[int]) -> int:
        # Count axis-aligned squares with the given query point as a corner.
        pass
`,
    optimalSolution: `from collections import defaultdict


class DetectSquares:
    def __init__(self):
        # Maps coordinate tuple (x, y) -> count of points at this coordinate
        self.point_counts = defaultdict(int)

    def add(self, point: list[int]) -> None:
        # Increment frequency of the added point
        pt = (point[0], point[1])
        self.point_counts[pt] += 1

    def count(self, point: list[int]) -> int:
        px, py = point[0], point[1]
        total_squares = 0

        # Test every recorded point (x, y) as a potential diagonal opposite corner
        for (x, y), count in self.point_counts.items():
            # A valid diagonal must have equal non-zero horizontal and vertical distance
            if abs(px - x) != abs(py - y) or px == x:
                continue

            # The other two corners needed to complete the axis-aligned square
            corner1 = (px, y)
            corner2 = (x, py)

            # Use .get() to avoid inserting keys into defaultdict during iteration
            c1_count = self.point_counts.get(corner1, 0)
            c2_count = self.point_counts.get(corner2, 0)

            # Multiply the counts of all three corners
            total_squares += count * c1_count * c2_count

        return total_squares
`,
    bruteForceSolution: `from collections import defaultdict


class DetectSquares:
    def __init__(self):
        self.point_counts = defaultdict(int)

    def add(self, point: list[int]) -> None:
        pt = (point[0], point[1])
        self.point_counts[pt] += 1

    def count(self, point: list[int]) -> int:
        px, py = point[0], point[1]
        total_squares = 0
        # Iterate over snapshot of items
        for (x, y), count in list(self.point_counts.items()):
            if abs(px - x) != abs(py - y) or px == x:
                continue
            total_squares += count * self.point_counts.get((px, y), 0) * self.point_counts.get((x, py), 0)
        return total_squares
`,
    harness: { kind: "design", entry: "DetectSquares" },
    testCases: [
      {
        input: {
          operations: ["DetectSquares", "add", "add", "add", "count", "count", "add", "count"],
          arguments: [[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]],
        },
        expected: [null, null, null, null, 1, 0, null, 2],
        description:
          "Points (3,10), (11,2), (3,2) form 1 square with query (11,10). Query (14,8) forms 0 squares. Adding duplicate (11,2) doubles squares to 2.",
      },
      {
        input: {
          operations: ["DetectSquares", "add", "add", "add", "count"],
          arguments: [[], [[0, 0]], [[0, 1]], [[1, 0]], [[1, 1]]],
        },
        expected: [null, null, null, null, 1],
        description: "Unit square with corners (0,0), (0,1), (1,0), (1,1).",
      },
      {
        input: {
          operations: ["DetectSquares", "add", "add", "add", "count"],
          arguments: [[], [[0, 0]], [[0, 2]], [[1, 0]], [[1, 2]]],
        },
        expected: [null, null, null, null, 0],
        description: "Width is 1 and height is 2: this is a rectangle, not a square.",
      },
      {
        input: {
          operations: ["DetectSquares", "add", "add", "add", "add", "add", "add", "count"],
          arguments: [[], [[0, 0]], [[0, 2]], [[2, 0]], [[0, 4]], [[4, 0]], [[4, 4]], [[2, 2]]],
        },
        expected: [null, null, null, null, null, null, null, 1],
      },
      {
        input: {
          operations: ["DetectSquares", "count"],
          arguments: [[], [[5, 5]]],
        },
        expected: [null, 0],
      },
      {
        input: {
          operations: ["DetectSquares", "add", "add", "add", "count"],
          arguments: [[], [[100, 100]], [[100, 200]], [[200, 100]], [[200, 200]]],
        },
        expected: [null, null, null, null, 1],
      },
    ],
  },
];

export default problems;
