import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ number-of-islands
  {
    id: "number-of-islands",
    summary:
      "Given an `m x n` 2D binary grid `grid` of `'1'`s (land) and `'0'`s (water), return the **total number of islands**. An island is formed by horizontally or vertically connected land cells and is surrounded by water. You may assume that all four boundaries outside the grid are water.",
    constraints: [
      "m == len(grid)",
      "n == len(grid[i])",
      "1 ≤ m, n ≤ 300",
      "grid[r][c] is either '0' or '1'",
    ],
    pattern: "Depth-first search (DFS) / Breadth-first search (BFS) grid traversal",
    timeComplexity: {
      bruteForce: "O(m × n)",
      optimal: "O(m × n)",
      explanation:
        "We iterate through every cell in the m × n grid. Each cell is visited at most a constant number of times: once in the outer loops, and at most once during DFS exploration since each visited land cell is immediately sunk to '0'.",
    },
    spaceComplexity: {
      optimal: "O(m × n)",
      explanation:
        "In the worst case (a grid completely filled with land '1's), the recursion stack in DFS can grow up to m × n frames deep.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "rows, cols = len(grid), len(grid[0])",
        plainEnglishExplanation:
          "`len(grid)` gives the number of rows, and `len(grid[0])` gives the number of columns in the first row. We unpack both values into `rows` and `cols` in a single line.",
        exampleSnippet:
          "grid = [['1', '0'], ['0', '1']]\nrows, cols = len(grid), len(grid[0])\nprint(rows, cols)",
        whyWeUseItHere:
          "We need the boundary dimensions to check if our search stays inside the grid.",
      },
      {
        keywordOrMethod: "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:",
        plainEnglishExplanation:
          "A list of (row_change, col_change) coordinate pairs representing the four orthogonal directions: up (-1, 0), down (1, 0), left (0, -1), and right (0, 1). Unpacking `dr, dc` gives the offset for each step.",
        exampleSnippet:
          "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n    print(f'delta: r+{dr}, c+{dc}')",
        whyWeUseItHere:
          "Instead of writing four separate recursive calls or branches, we loop through direction vectors concisely.",
      },
      {
        keywordOrMethod: "grid[r][c] = '0'",
        plainEnglishExplanation:
          "Assigning `'0'` to `grid[r][c]` changes that cell from land to water in place. In graph algorithms on grids, this is known as 'sinking' the land to mark it as visited.",
        exampleSnippet:
          "grid = [['1', '1'], ['0', '1']]\ngrid[0][1] = '0'\nprint(grid[0])",
        whyWeUseItHere:
          "Sinking visited land avoids creating a separate `visited` set, saving extra memory.",
      },
      {
        keywordOrMethod: "def dfs(r: int, c: int) -> None:",
        plainEnglishExplanation:
          "A nested helper function defined inside the outer function. It can directly read and mutate variables from the enclosing function (like `rows`, `cols`, and `grid`).",
        exampleSnippet:
          "def outer():\n    total = 0\n    def inner(x):\n        return x * 2\n    total += inner(5)\n    print(total)\nouter()",
        whyWeUseItHere:
          "The recursive explorer needs access to the grid and dimensions without passing them as extra arguments on every step.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        grid: [
          ["1", "1", "0"],
          ["1", "0", "0"],
          ["0", "0", "1"],
        ],
      },
      gridPointers: { grid: [["r", "c"]] },
      focus: ["islands", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine looking down at an archipelago from an airplane. Whenever you spot a patch of unvisited land ('1'), you shout 'I found a new island!' and increase your island count by 1. Then you send a flood crew to sink every patch of land connected to that spot (changing '1' to '0'). Once the whole island is underwater, you continue scanning the map. Because any part of an already discovered island has been sunk, every new '1' you encounter is guaranteed to be a brand new island.",
      edgeCases: [
        "Grid with only water ('0's): returns 0 because no land is ever found.",
        "Grid completely filled with land ('1's): returns 1 because the very first DFS sinks every cell.",
        "Diagonal cells: land connected only diagonally does not count as connected, so each diagonal cell is its own island.",
        "Single-cell grid: either 1 (if '1') or 0 (if '0').",
      ],
      stepByStepWalkthrough: [
        "Get `rows` and `cols` from `grid`, and initialize `islands = 0`.",
        "Define `dfs(r, c)`: if `(r, c)` is out of bounds or not `'1'`, return immediately. Otherwise sink `grid[r][c] = '0'` and call `dfs` on the four adjacent neighbors.",
        "Loop through every cell `(r, c)` using nested `for` loops.",
        "When `grid[r][c] == '1'`, increment `islands` by 1 and call `dfs(r, c)` to sink the entire connected island.",
        "After scanning all cells, return `islands`.",
      ],
    },
    hints: {
      conceptual:
        "Every time you encounter land, how can you explore and mark all connected land cells so you don't count them again later?",
      structural:
        "Use nested loops over `range(rows)` and `range(cols)`. When `grid[r][c] == '1'`, increment your count and launch a recursive `dfs(r, c)` helper that marks visited cells as `'0'` in all 4 directions.",
    },
    commonMistakes: [
      "Counting diagonal neighbors: islands only connect horizontally and vertically, not diagonally.",
      "Forgetting to check boundary limits `0 <= r < rows` and `0 <= c < cols` before indexing `grid[r][c]`.",
      "Treating grid cells as integers `1` and `0` instead of strings `'1'` and `'0'` as specified by the problem.",
      "Forgetting to sink the cell before calling DFS on neighbors, which causes infinite recursive loops.",
    ],
    starterCode: `def num_islands(grid: list[list[str]]) -> int:
    # Count how many connected islands of '1's exist in the grid.
    # Tip: whenever you see a '1', sink the whole island with DFS or BFS.
    pass
`,
    optimalSolution: `def num_islands(grid: list[list[str]]) -> int:
    # Empty grid contains zero islands
    if not grid:
        return 0

    # Grid boundaries and island counter
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r: int, c: int) -> None:
        # Stop if we wander out of bounds or step on water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return

        # Sink this land cell so we don't visit it again
        grid[r][c] = "0"

        # Explore all 4 orthogonal directions: up, down, left, right
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            dfs(r + dr, c + dc)

    # Scan through every cell on the map
    for r in range(rows):
        for c in range(cols):
            # Found unvisited land: a new island!
            if grid[r][c] == "1":
                # Sink the entire island with DFS
                dfs(r, c)
                # Increment our island count
                islands += 1

    # Return total count of islands discovered
    return islands
`,
    bruteForceSolution: `from collections import deque


def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    islands = 0

    # BFS queue alternative
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                grid[r][c] = "0"
                queue = deque([(r, c)])
                while queue:
                    curr_r, curr_c = queue.popleft()
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = curr_r + dr, curr_c + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1":
                            grid[nr][nc] = "0"
                            queue.append((nr, nc))

    return islands
`,
    harness: { kind: "function", entry: "num_islands" },
    testCases: [
      {
        input: {
          grid: [
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"],
          ],
        },
        expected: 1,
        description: "All land cells are connected horizontally and vertically into one large island.",
      },
      {
        input: {
          grid: [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
          ],
        },
        expected: 3,
        description: "Three separated islands: top-left, middle, and bottom-right.",
      },
      {
        input: { grid: [["1"]] },
        expected: 1,
        description: "A single 1x1 island.",
      },
      {
        input: { grid: [["0"]] },
        expected: 0,
      },
      {
        input: {
          grid: [
            ["1", "0"],
            ["0", "1"],
          ],
        },
        expected: 2,
      },
      {
        input: {
          grid: [
            ["1", "1"],
            ["1", "1"],
          ],
        },
        expected: 1,
      },
      {
        input: {
          grid: [
            ["0", "0", "0"],
            ["0", "0", "0"],
          ],
        },
        expected: 0,
      },
      {
        input: {
          grid: [
            ["1", "1", "1"],
            ["0", "0", "1"],
            ["1", "1", "1"],
          ],
        },
        expected: 1,
      },
    ],
  },

  // ------------------------------------------------------------------ clone-graph
  {
    id: "clone-graph",
    summary:
      "Given a reference to a node in a **connected undirected graph**, return a **deep copy** (clone) of the graph. Each node has an integer `val` and a list `neighbors` of other `Node` references. The cloned graph must have the exact same structure and values, but every node must be a brand-new `Node` object.",
    constraints: [
      "The number of nodes in the graph is between 0 and 100",
      "1 ≤ Node.val ≤ 100",
      "Node.val is unique for each node",
      "There are no repeated edges and no self-loops",
      "The graph is connected and undirected",
    ],
    pattern: "Graph traversal with a hash map of cloned nodes",
    timeComplexity: {
      bruteForce: "O(V + E)",
      optimal: "O(V + E)",
      explanation:
        "V is the number of vertices (nodes) and E is the number of edges. We visit each node once and iterate through all of its neighbors once.",
    },
    spaceComplexity: {
      optimal: "O(V)",
      explanation:
        "The hash map stores one entry for each of the V nodes, and the DFS call stack takes up to O(V) frames.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from typing import Optional",
        plainEnglishExplanation:
          "`Optional[Node]` means the value can either be a `Node` object or `None` (for an empty graph).",
        exampleSnippet:
          "from typing import Optional\nx: Optional[int] = None\nprint(x is None)",
        whyWeUseItHere:
          "The input node can be `None` if the graph has 0 nodes.",
      },
      {
        keywordOrMethod: "cloned = {}",
        plainEnglishExplanation:
          "A dictionary used as a lookup table mapping each original `Node` object to its newly created copy `Node(val)`.",
        exampleSnippet:
          "copies = {}\ncopies['original'] = 'clone'\nprint(copies['original'])",
        whyWeUseItHere:
          "Prevents duplicate copies of the same node and breaks infinite cycles in graph traversal.",
      },
      {
        keywordOrMethod: "copy = Node(curr.val)",
        plainEnglishExplanation:
          "Constructs a brand-new instance of `Node` with the same integer value as `curr`. Its `neighbors` list is initially empty.",
        exampleSnippet:
          "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.neighbors = []\nnew_node = Node(5)\nprint(new_node.val, new_node.neighbors)",
        whyWeUseItHere:
          "A deep clone requires creating fresh objects rather than reusing the original references.",
      },
      {
        keywordOrMethod: "if curr in cloned:",
        plainEnglishExplanation:
          "Checks if an object is already a key in the dictionary. In Python, object identity or hashing determines membership.",
        exampleSnippet:
          "seen = {'a': 1}\nprint('a' in seen)\nprint('b' in seen)",
        whyWeUseItHere:
          "If we already cloned a neighbor earlier, we immediately return that copy instead of recursing forever.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { node: [[2], [1]] },
      focus: ["cloned", "node"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of duplicating a network of friends. When you meet Alice, you create a brand-new clone called AliceClone and write in your contact book: 'Alice -> AliceClone'. Next, you look at Alice's friend list. For each friend (say Bob), you check your book: have you cloned Bob yet? If yes, you connect AliceClone to BobClone. If not, you clone Bob, write Bob in the book, and recursively clone Bob's friends. The contact book (hash map) prevents you from creating two BobClones and stops infinite loops when friends mutually link to each other.",
      edgeCases: [
        "Empty graph (`node is None`): immediately return `None`.",
        "Single isolated node (`neighbors = []`): returns a single cloned node with an empty neighbors list.",
        "Cycles: two nodes pointing at each other (e.g., 1-2) are safely handled by checking `if curr in cloned` before visiting.",
      ],
      stepByStepWalkthrough: [
        "If `node is None`, return `None`.",
        "Create a dictionary `cloned = {}` mapping `original_node -> cloned_node`.",
        "Define `dfs(curr)`: if `curr` is already in `cloned`, return `cloned[curr]`.",
        "Otherwise, create `copy = Node(curr.val)` and record `cloned[curr] = copy`.",
        "Loop over every `neighbor` in `curr.neighbors`, recursively calling `dfs(neighbor)` and appending the result to `copy.neighbors`.",
        "Return `dfs(node)` to clone and connect the entire graph.",
      ],
    },
    hints: {
      conceptual:
        "How can you make sure you only create one new Node for each original node, even when edges loop back on themselves?",
      structural:
        "Keep a dictionary `cloned = {original_node: copy_node}`. In a recursive `dfs(curr)` function, return `cloned[curr]` if already seen, else make `Node(curr.val)`, register it in `cloned`, and recursively append cloned neighbors.",
    },
    commonMistakes: [
      "Reusing the original nodes: returning the original graph nodes will fail the test harness.",
      "Registering the copy in `cloned` AFTER recursing on neighbors: this causes an infinite recursive loop on cyclic graphs.",
      "Not handling the `node is None` edge case properly.",
    ],
    starterCode: `# Definition for a Node (already provided for you):
# class Node:
#     def __init__(self, val=0, neighbors=None):
#         self.val = val
#         self.neighbors = neighbors if neighbors is not None else []

from typing import Optional


def clone_graph(node: Optional["Node"]) -> Optional["Node"]:
    # Return a deep copy of the graph starting from node.
    # Tip: use a dictionary to map each original node to its clone.
    pass
`,
    optimalSolution: `from typing import Optional


def clone_graph(node: Optional["Node"]) -> Optional["Node"]:
    if not node:
        return None

    # Map each original node to its brand-new clone
    cloned = {}

    def dfs(curr: "Node") -> "Node":
        # If this node was already cloned, return the existing copy
        if curr in cloned:
            return cloned[curr]

        # Create a fresh copy with the same value
        copy = Node(curr.val)
        # Store in dict BEFORE recursing to prevent infinite loops on cycles
        cloned[curr] = copy

        # Recursively clone and attach each neighbor
        for neighbor in curr.neighbors:
            copy.neighbors.append(dfs(neighbor))

        return copy

    return dfs(node)
`,
    bruteForceSolution: `from collections import deque
from typing import Optional


def clone_graph(node: Optional["Node"]) -> Optional["Node"]:
    if not node:
        return None

    # BFS approach using a queue
    cloned = {node: Node(node.val)}
    queue = deque([node])

    while queue:
        curr = queue.popleft()
        for neighbor in curr.neighbors:
            if neighbor not in cloned:
                cloned[neighbor] = Node(neighbor.val)
                queue.append(neighbor)
            cloned[curr].neighbors.append(cloned[neighbor])

    return cloned[node]
`,
    harness: {
      kind: "function",
      entry: "clone_graph",
      argTypes: { node: "graph" },
      returnType: "graph",
    },
    testCases: [
      {
        input: { node: [[2, 4], [1, 3], [2, 4], [1, 3]] },
        expected: [[2, 4], [1, 3], [2, 4], [1, 3]],
        description: "4 nodes connected in a 4-cycle: 1-2, 2-3, 3-4, 4-1.",
      },
      {
        input: { node: [[]] },
        expected: [[]],
        description: "A single node with value 1 and no neighbors.",
      },
      {
        input: { node: [] },
        expected: [],
        description: "An empty graph (None node).",
      },
      {
        input: { node: [[2], [1]] },
        expected: [[2], [1]],
      },
      {
        input: { node: [[2, 3], [1, 3], [1, 2]] },
        expected: [[2, 3], [1, 3], [1, 2]],
      },
      {
        input: { node: [[2], [1, 3], [2]] },
        expected: [[2], [1, 3], [2]],
      },
    ],
  },

  // ------------------------------------------------------------------ max-area-of-island
  {
    id: "max-area-of-island",
    summary:
      "Given an `m x n` binary matrix `grid` of `0`s (water) and `1`s (land), find the **maximum area** of any island in the grid. An island is formed by horizontally or vertically adjacent land cells. The area is the number of cells in that island. If there are no islands, return `0`.",
    constraints: [
      "m == len(grid)",
      "n == len(grid[i])",
      "1 ≤ m, n ≤ 50",
      "grid[r][c] is either 0 or 1",
    ],
    pattern: "Depth-first search to measure connected component size",
    timeComplexity: {
      bruteForce: "O(m × n)",
      optimal: "O(m × n)",
      explanation:
        "Every cell in the m × n grid is inspected. Each land cell is visited and sunk to 0 during DFS, so no cell is processed more than once.",
    },
    spaceComplexity: {
      optimal: "O(m × n)",
      explanation:
        "In the worst case (the entire grid is one huge island), the DFS recursion stack can reach m × n frames.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "max_area = max(max_area, current_area)",
        plainEnglishExplanation:
          "`max(a, b)` returns whichever number is larger. It updates `max_area` whenever `current_area` exceeds the previous record.",
        exampleSnippet:
          "best = 0\nbest = max(best, 5)\nbest = max(best, 3)\nprint(best)",
        whyWeUseItHere:
          "We track the largest island seen so far across all discovered islands.",
      },
      {
        keywordOrMethod: "area = 1",
        plainEnglishExplanation:
          "Starting the area counter at 1 counts the current cell itself, before adding the areas of its adjacent neighbors.",
        exampleSnippet:
          "def count_self():\n    area = 1\n    return area\nprint(count_self())",
        whyWeUseItHere:
          "Every recursive DFS step accounts for 1 square of land.",
      },
      {
        keywordOrMethod: "area += dfs(r + dr, c + dc)",
        plainEnglishExplanation:
          "`+=` adds the return value of each neighbor's DFS search to our running tally of this island's area.",
        exampleSnippet:
          "total = 1\ntotal += 4\nprint(total)",
        whyWeUseItHere:
          "Aggregates the sizes of all sub-branches into the total area of the island.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        grid: [
          [1, 1],
          [1, 0],
        ],
      },
      gridPointers: { grid: [["r", "c"]] },
      focus: ["max_area", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture an archipelago where you want to find the single biggest landmass. You scan row by row. Whenever you touch land (a cell with value 1), you explore the entire island with DFS. Instead of just marking cells as visited, every time your explorer steps onto a land cell, it counts 'that's 1 square!' and sinks it so it isn't counted again. By adding up the squares found in all 4 directions, you get the exact area of that island. You compare it to your record so far and keep the maximum.",
      edgeCases: [
        "Grid with all 0s: returns 0.",
        "Grid with all 1s: returns m × n (one single island covering the entire grid).",
        "Single-cell grid: returns 1 if [1], or 0 if [0].",
      ],
      stepByStepWalkthrough: [
        "Check if `grid` is empty; if so, return 0.",
        "Initialize `max_area = 0`, `rows = len(grid)`, `cols = len(grid[0])`.",
        "Define `dfs(r, c)`: return 0 if `(r, c)` is out of bounds or `grid[r][c] != 1`.",
        "Sink the cell: `grid[r][c] = 0` and set `area = 1`.",
        "Recursively call `dfs` on all 4 neighbors and add their returned areas to `area`.",
        "Iterate over all cells: when a cell is 1, compute `current_area = dfs(r, c)` and update `max_area = max(max_area, current_area)`.",
        "Return `max_area`.",
      ],
    },
    hints: {
      conceptual:
        "How can you modify the island-counting algorithm so that DFS returns the total number of connected land cells instead of just visiting them?",
      structural:
        "Write a `dfs(r, c)` function that sinks `grid[r][c] = 0` and returns `1 + sum(dfs(neighbor) for neighbor)`. Keep track of `max(max_area, current_area)` across all cells.",
    },
    commonMistakes: [
      "Using string `'1'` instead of integer `1`: unlike LeetCode 200 (Number of Islands) which uses strings, this problem uses integer values `0` and `1`.",
      "Not sinking the cell before recursing to neighbors, leading to counting the same cells repeatedly or infinite recursion.",
      "Returning 1 instead of 0 when out of bounds or on water.",
    ],
    starterCode: `def max_area_of_island(grid: list[list[int]]) -> int:
    # Find the maximum area (number of 1s) of any island in the grid.
    # Tip: use DFS to count the cells in an island, sinking them as you go.
    pass
`,
    optimalSolution: `def max_area_of_island(grid: list[list[int]]) -> int:
    # Empty grid contains no land
    if not grid:
        return 0

    # Grid dimensions and max area record
    rows, cols = len(grid), len(grid[0])
    max_area = 0

    def dfs(r: int, c: int) -> int:
        # Out of bounds or hit water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
            return 0

        # Sink this cell so we count it only once
        grid[r][c] = 0
        # This cell itself counts as 1 square of land
        area = 1

        # Sum the land area from all 4 neighboring directions
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            area += dfs(r + dr, c + dc)

        return area

    # Check every cell on the grid for unvisited land
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                # Explore the entire island and calculate its area
                current_area = dfs(r, c)
                # Update max area if this island is larger
                if current_area > max_area:
                    max_area = current_area

    # Return the largest island area discovered
    return max_area
`,
    bruteForceSolution: `from collections import deque


def max_area_of_island(grid: list[list[int]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_area = 0

    # BFS approach
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                area = 0
                queue = deque([(r, c)])
                grid[r][c] = 0
                while queue:
                    cr, cc = queue.popleft()
                    area += 1
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = cr + dr, cc + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                            grid[nr][nc] = 0
                            queue.append((nr, nc))
                if area > max_area:
                    max_area = area

    return max_area
`,
    harness: { kind: "function", entry: "max_area_of_island" },
    testCases: [
      {
        input: {
          grid: [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          ],
        },
        expected: 6,
        description: "The largest connected island contains 6 cells.",
      },
      {
        input: { grid: [[0, 0, 0, 0, 0, 0, 0, 0]] },
        expected: 0,
        description: "No islands at all, so max area is 0.",
      },
      {
        input: { grid: [[1]] },
        expected: 1,
        description: "A single 1x1 island has area 1.",
      },
      {
        input: { grid: [[0]] },
        expected: 0,
      },
      {
        input: {
          grid: [
            [1, 1],
            [1, 1],
          ],
        },
        expected: 4,
      },
      {
        input: {
          grid: [
            [1, 0],
            [0, 1],
          ],
        },
        expected: 1,
      },
      {
        input: {
          grid: [
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 1],
          ],
        },
        expected: 3,
      },
    ],
  },

  // ------------------------------------------------------------------ pacific-atlantic-water-flow
  {
    id: "pacific-atlantic-water-flow",
    summary:
      "You are given an `m x n` grid `heights` representing the height of land above sea level. Rain water can flow to adjacent cells (up, down, left, right) if the neighboring cell's height is **less than or equal** to the current cell's height. The Pacific ocean borders the top and left edges, and the Atlantic ocean borders the bottom and right edges. Return a list of all coordinates `[r, c]` where rain water can flow to **both** the Pacific and Atlantic oceans.",
    constraints: [
      "m == len(heights)",
      "n == len(heights[0])",
      "1 ≤ m, n ≤ 200",
      "0 ≤ heights[r][c] ≤ 10^5",
    ],
    pattern: "Reverse flow DFS/BFS from ocean borders",
    timeComplexity: {
      bruteForce: "O((m × n)²)",
      optimal: "O(m × n)",
      explanation:
        "Starting from every cell and testing downhill flow can take O(m × n) per cell. By flipping our perspective and starting from ocean borders searching uphill, each cell is visited at most once for the Pacific and once for the Atlantic.",
    },
    spaceComplexity: {
      optimal: "O(m × n)",
      explanation:
        "The two `pacific` and `atlantic` sets each store at most m × n coordinate pairs, and the DFS call stack takes up to O(m × n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "pacific = set()",
        plainEnglishExplanation:
          "`set()` creates an empty set: a collection of unique elements with O(1) membership checks (`(r, c) in pacific`).",
        exampleSnippet:
          "s = set()\ns.add((1, 2))\nprint((1, 2) in s)\nprint((0, 0) in s)",
        whyWeUseItHere:
          "We collect coordinates reachable from the Pacific and Atlantic oceans independently.",
      },
      {
        keywordOrMethod: "(r, c) in pacific and (r, c) in atlantic",
        plainEnglishExplanation:
          "The `and` keyword checks that both conditions are `True`. Here it checks that cell `(r, c)` can reach both oceans.",
        exampleSnippet:
          "a = {1, 2}\nb = {2, 3}\nprint(2 in a and 2 in b)\nprint(1 in a and 1 in b)",
        whyWeUseItHere:
          "The problem asks for cells whose water can reach both oceans.",
      },
      {
        keywordOrMethod: "result.append([r, c])",
        plainEnglishExplanation:
          "`.append(...)` adds an item to the end of a list. Here we append a 2-element list `[r, c]` representing coordinates.",
        exampleSnippet:
          "coords = []\ncoords.append([0, 1])\nprint(coords)",
        whyWeUseItHere:
          "Builds the final list of coordinate pairs to return.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        heights: [
          [1, 2],
          [2, 1],
        ],
      },
      gridPointers: { heights: [["r", "c"]] },
      focus: ["pacific", "atlantic", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine rain falling on a mountain ridge. If you try to drop water on every single cell and trace where it trickles downhill, you will retrace the same paths thousands of times. Instead, turn the problem upside down: imagine the oceans rising! Flood seawater *uphill* from the Pacific edges (top and left) into any neighboring cell that is at least as tall. Then do the same uphill flood from the Atlantic edges (bottom and right). Any mountain peak reached by BOTH flood waters can drain down to both oceans.",
      edgeCases: [
        "Single-cell grid: touches both oceans simultaneously, so `[[0, 0]]` is always returned.",
        "Flat grid (all cells same height): water can flow freely everywhere, so every single cell reaches both oceans.",
        "1D grid (single row or column): all cells touch both oceans.",
      ],
      stepByStepWalkthrough: [
        "Create two sets: `pacific = set()` and `atlantic = set()`.",
        "Write `dfs(r, c, reachable)`: add `(r, c)` to `reachable`. For each of the 4 neighbors `(nr, nc)`, if it is inside the grid, not yet in `reachable`, and `heights[nr][nc] >= heights[r][c]` (uphill), recursively call `dfs(nr, nc, reachable)`.",
        "Launch DFS from the Pacific borders: top row `(0, c)` and left column `(r, 0)`.",
        "Launch DFS from the Atlantic borders: bottom row `(rows - 1, c)` and right column `(r, cols - 1)`.",
        "Find the intersection: loop over all `(r, c)` and append `[r, c]` if it is in both `pacific` and `atlantic`.",
        "Return the resulting list of coordinates.",
      ],
    },
    hints: {
      conceptual:
        "Simulating downhill water flow from every cell is slow. What happens if you start at the oceans and flow uphill instead?",
      structural:
        "Run two separate graph searches (DFS or BFS) starting from the ocean edges: one from Pacific borders (top row, left column) and one from Atlantic borders (bottom row, right column). Only step to neighbors with equal or greater height. The answer is cells visited by both.",
    },
    commonMistakes: [
      "Going downhill during border traversal: when starting from oceans, water must flow UPHILL (`neighbor >= current`).",
      "Confusing which borders touch which ocean: Pacific is top & left; Atlantic is bottom & right.",
      "Overlooking cells with equal height: water can flow between cells of identical height (`>=`, not `>`).",
    ],
    starterCode: `def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    # Return coordinates [r, c] that can flow to both Pacific and Atlantic oceans.
    # Tip: start from ocean borders and search uphill instead of downhill.
    pass
`,
    optimalSolution: `def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    # Handle empty input grid
    if not heights or not heights[0]:
        return []

    rows, cols = len(heights), len(heights[0])
    # Sets to track cells reachable from each ocean
    pacific = set()
    atlantic = set()

    def dfs(r: int, c: int, reachable: set) -> None:
        # Mark cell as reachable from this ocean
        reachable.add((r, c))

        # Check all 4 orthogonal neighboring cells
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            # Flow flows uphill: neighbor must be inside grid, unvisited, and >= current height
            if 0 <= nr < rows and 0 <= nc < cols:
                if (nr, nc) not in reachable and heights[nr][nc] >= heights[r][c]:
                    # Recursively trace uphill flow
                    dfs(nr, nc, reachable)

    # 1. Flow uphill from Pacific top and Atlantic bottom borders
    for c in range(cols):
        dfs(0, c, pacific)
        dfs(rows - 1, c, atlantic)

    # Flow uphill from Pacific left and Atlantic right borders
    for r in range(rows):
        dfs(r, 0, pacific)
        dfs(r, cols - 1, atlantic)

    # 2. Collect all cells reachable by both oceans
    result = []
    for r in range(rows):
        for c in range(cols):
            # If reachable by both oceans, add coordinate to result
            if (r, c) in pacific and (r, c) in atlantic:
                result.append([r, c])

    # Return list of all valid coordinates
    return result
`,
    bruteForceSolution: `from collections import deque


def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    if not heights or not heights[0]:
        return []

    rows, cols = len(heights), len(heights[0])

    def can_reach_both(start_r: int, start_c: int) -> bool:
        # BFS downhill from each individual cell
        queue = deque([(start_r, start_c)])
        visited = {(start_r, start_c)}
        reaches_pac = False
        reaches_atl = False

        while queue:
            r, c = queue.popleft()
            if r == 0 or c == 0:
                reaches_pac = True
            if r == rows - 1 or c == cols - 1:
                reaches_atl = True
            if reaches_pac and reaches_atl:
                return True

            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    if (nr, nc) not in visited and heights[nr][nc] <= heights[r][c]:
                        visited.add((nr, nc))
                        queue.append((nr, nc))

        return reaches_pac and reaches_atl

    return [[r, c] for r in range(rows) for c in range(cols) if can_reach_both(r, c)]
`,
    harness: { kind: "function", entry: "pacific_atlantic", compare: "unordered" },
    testCases: [
      {
        input: {
          heights: [
            [1, 2, 2, 3, 5],
            [3, 2, 3, 4, 4],
            [2, 4, 5, 3, 1],
            [6, 7, 1, 4, 5],
            [5, 1, 1, 2, 4],
          ],
        },
        expected: [
          [0, 4],
          [1, 3],
          [1, 4],
          [2, 2],
          [3, 0],
          [3, 1],
          [4, 0],
        ],
        description: "These 7 cells can drain water to both oceans.",
      },
      {
        input: { heights: [[1]] },
        expected: [[0, 0]],
        description: "A 1x1 island borders both the Pacific and Atlantic oceans.",
      },
      {
        input: {
          heights: [
            [2, 1],
            [1, 2],
          ],
        },
        expected: [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
        description: "In a 2x2 grid, all cells border both oceans.",
      },
      {
        input: {
          heights: [
            [3, 3],
            [3, 3],
          ],
        },
        expected: [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ],
      },
      {
        input: { heights: [[1, 2, 3]] },
        expected: [[0, 0], [0, 1], [0, 2]],
      },
      {
        input: { heights: [[1], [2], [3]] },
        expected: [[0, 0], [1, 0], [2, 0]],
      },
      {
        input: {
          heights: [
            [1, 1, 1],
            [1, 5, 1],
            [1, 1, 1],
          ],
        },
        expected: [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ surrounded-regions
  {
    id: "surrounded-regions",
    summary:
      "Given an `m x n` matrix `board` containing `'X'` and `'O'`, **capture all surrounded regions**. A region is captured by flipping all surrounded `'O'`s into `'X'`s. A cell `'O'` is **not** surrounded if it is on the border of the board or connects horizontally or vertically to a border `'O'`. Mutate `board` **in place**.",
    constraints: [
      "m == len(board)",
      "n == len(board[i])",
      "1 ≤ m, n ≤ 200",
      "board[r][c] is either 'X' or 'O'",
    ],
    pattern: "Border-connected flood fill / reverse thinking",
    timeComplexity: {
      bruteForce: "O(m × n)",
      optimal: "O(m × n)",
      explanation:
        "We visit each cell a constant number of times: once while scanning the borders with DFS, and once during the final pass to flip characters.",
    },
    spaceComplexity: {
      optimal: "O(m × n)",
      explanation:
        "The DFS call stack can grow up to m × n frames in the worst case if a huge border-connected component snakes through the board.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "board[r][c] = 'T'",
        plainEnglishExplanation:
          "Temporarily writing `'T'` (for 'temporary safe') marks a border-connected `'O'` so we know it must NOT be flipped to `'X'`.",
        exampleSnippet:
          "board = [['X', 'O'], ['X', 'X']]\nboard[0][1] = 'T'\nprint(board[0])",
        whyWeUseItHere:
          "Using a temporary character allows in-place marking without allocating extra memory for a visited set.",
      },
      {
        keywordOrMethod: "for r in range(rows): dfs(r, 0)",
        plainEnglishExplanation:
          "Iterates over every row `r` at column `0` (the leftmost column) to initiate DFS from the left border.",
        exampleSnippet:
          "for r in range(3):\n    print(f'border coordinate ({r}, 0)')",
        whyWeUseItHere:
          "Any `'O'` touching the border can never be captured.",
      },
      {
        keywordOrMethod: "elif board[r][c] == 'T': board[r][c] = 'O'",
        plainEnglishExplanation:
          "Restores the temporary `'T'` marker back to the original `'O'` in the final pass.",
        exampleSnippet:
          "val = 'T'\nif val == 'T':\n    val = 'O'\nprint(val)",
        whyWeUseItHere:
          "Cleans up our temporary markers so the final board only contains `'X'` and `'O'`.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        board: [
          ["X", "X", "X"],
          ["X", "O", "X"],
          ["X", "X", "X"],
        ],
      },
      gridPointers: { board: [["r", "c"]] },
      focus: ["board", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of `'X'` as land and `'O'` as water pools. Any water pool connected to the edge of the board has an outlet to the ocean and cannot be trapped. Any interior water pool that is completely surrounded by land on all sides has no escape and gets paved over (captured). Instead of figuring out which interior pools are trapped, it is much easier to start at the borders and rescue every pool connected to the edges by stamping it with a temporary 'SAFE' mark. Once all safe pools are marked, any remaining `'O'` is trapped and turned into `'X'`. Finally, un-stamp 'SAFE' back to `'O'`.",
      edgeCases: [
        "Small boards (1x1, 2x2, or 1D): every cell is on the border, so no cell can ever be surrounded or captured.",
        "Board entirely filled with 'X': unchanged.",
        "Board entirely filled with 'O': all cells connect to the border, so none are captured.",
      ],
      stepByStepWalkthrough: [
        "If `board` is empty, return.",
        "Define `dfs(r, c)`: if `(r, c)` is out of bounds or `board[r][c] != 'O'`, return. Change `board[r][c] = 'T'` and recursively visit all 4 neighbors.",
        "Run `dfs` along all 4 borders: left column, right column, top row, and bottom row.",
        "Scan every cell on the board: if `board[r][c] == 'O'`, it was surrounded, so set `board[r][c] = 'X'`. If `board[r][c] == 'T'`, it was safe, so restore `board[r][c] = 'O'`.",
      ],
    },
    hints: {
      conceptual:
        "Instead of checking which 'O's are surrounded, can you identify which 'O's CANNOT be surrounded? Which cells can escape to the edge?",
      structural:
        "Flood fill (DFS/BFS) starting ONLY from 'O's on the border, temporarily marking them as 'T'. Then iterate through the whole grid: flip remaining 'O' -> 'X', and restore 'T' -> 'O'.",
    },
    commonMistakes: [
      "Starting DFS from interior cells: checking whether an interior component touches a border requires extra tracking and can be tricky. Starting from the borders is much simpler.",
      "Forgetting to restore temporary markers back to `'O'`.",
      "Returning a new board instead of modifying `board` in place: the test runner expects the original list to be mutated.",
    ],
    starterCode: `def solve(board: list[list[str]]) -> None:
    # Capture surrounded regions by flipping 'O's to 'X's in-place.
    # Tip: any 'O' connected to the border cannot be captured.
    pass
`,
    optimalSolution: `def solve(board: list[list[str]]) -> None:
    # Quick exit on empty board
    if not board or not board[0]:
        return

    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int) -> None:
        # Stop if out of bounds or cell is not an unvisited safe 'O'
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != "O":
            return
        # Temporarily mark this safe 'O' as 'T'
        board[r][c] = "T"
        # Explore neighbors in all 4 orthogonal directions
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            dfs(r + dr, c + dc)

    # 1. Protect all border-connected 'O's by marking them 'T'
    # Check left and right columns
    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)

    # Check top and bottom rows
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)

    # 2. Capture remaining surrounded 'O's and restore 'T's to 'O'
    for r in range(rows):
        for c in range(cols):
            # Surrounded 'O's are captured and flipped to 'X'
            if board[r][c] == "O":
                board[r][c] = "X"
            # Border-connected safe 'T's are restored back to 'O'
            elif board[r][c] == "T":
                board[r][c] = "O"
`,
    bruteForceSolution: `from collections import deque


def solve(board: list[list[str]]) -> None:
    if not board or not board[0]:
        return

    rows, cols = len(board), len(board[0])
    visited = set()

    # Find each component of 'O's and see if any cell touches the border
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == "O" and (r, c) not in visited:
                component = []
                queue = deque([(r, c)])
                visited.add((r, c))
                is_surrounded = True

                while queue:
                    cr, cc = queue.popleft()
                    component.append((cr, cc))
                    if cr == 0 or cr == rows - 1 or cc == 0 or cc == cols - 1:
                        is_surrounded = False
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = cr + dr, cc + dc
                        if 0 <= nr < rows and 0 <= nc < cols:
                            if board[nr][nc] == "O" and (nr, nc) not in visited:
                                visited.add((nr, nc))
                                queue.append((nr, nc))

                if is_surrounded:
                    for cr, cc in component:
                        board[cr][cc] = "X"
`,
    harness: { kind: "function", entry: "solve", inPlace: "board" },
    testCases: [
      {
        input: {
          board: [
            ["X", "X", "X", "X"],
            ["X", "O", "O", "X"],
            ["X", "X", "O", "X"],
            ["X", "O", "X", "X"],
          ],
        },
        expected: [
          ["X", "X", "X", "X"],
          ["X", "X", "X", "X"],
          ["X", "X", "X", "X"],
          ["X", "O", "X", "X"],
        ],
        description: "The three interior 'O's are surrounded and flipped to 'X'; the bottom border 'O' is safe.",
      },
      {
        input: { board: [["X"]] },
        expected: [["X"]],
        description: "Single 'X' cell remains 'X'.",
      },
      {
        input: { board: [["O"]] },
        expected: [["O"]],
        description: "Single 'O' cell is on the border, so it is safe.",
      },
      {
        input: {
          board: [
            ["X", "X"],
            ["X", "X"],
          ],
        },
        expected: [
          ["X", "X"],
          ["X", "X"],
        ],
      },
      {
        input: {
          board: [
            ["O", "O"],
            ["O", "O"],
          ],
        },
        expected: [
          ["O", "O"],
          ["O", "O"],
        ],
      },
      {
        input: {
          board: [
            ["X", "X", "X"],
            ["X", "O", "X"],
            ["X", "X", "X"],
          ],
        },
        expected: [
          ["X", "X", "X"],
          ["X", "X", "X"],
          ["X", "X", "X"],
        ],
      },
      {
        input: {
          board: [
            ["X", "O", "X"],
            ["X", "O", "X"],
            ["X", "X", "X"],
          ],
        },
        expected: [
          ["X", "O", "X"],
          ["X", "O", "X"],
          ["X", "X", "X"],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ rotting-oranges
  {
    id: "rotting-oranges",
    summary:
      "You are given an `m x n` grid where each cell has one of three values: `0` representing an empty cell, `1` representing a fresh orange, or `2` representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the **minimum number of minutes** until no cell has a fresh orange. If this is impossible, return `-1`.",
    constraints: [
      "m == len(grid)",
      "n == len(grid[i])",
      "1 ≤ m, n ≤ 10",
      "grid[r][c] is 0, 1, or 2",
    ],
    pattern: "Multi-source breadth-first search (BFS)",
    timeComplexity: {
      bruteForce: "O((m × n)²)",
      optimal: "O(m × n)",
      explanation:
        "Every cell is examined during the initial scan, and each orange enters and exits the BFS queue at most once. Each step checks 4 directions, taking O(m × n) total time.",
    },
    spaceComplexity: {
      optimal: "O(m × n)",
      explanation:
        "The BFS queue can hold at most m × n orange coordinates in the worst case.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import deque",
        plainEnglishExplanation:
          "`deque` (double-ended queue) allows adding and removing items from both ends in O(1) time. We use `queue.popleft()` to pop the oldest element.",
        exampleSnippet:
          "from collections import deque\nq = deque([10, 20])\nq.append(30)\nprint(q.popleft())",
        whyWeUseItHere:
          "BFS requires a first-in, first-out queue to process events in chronological order.",
      },
      {
        keywordOrMethod: "for _ in range(len(queue)):",
        plainEnglishExplanation:
          "Freezes the current size of the queue at the start of the loop, processing all nodes at the current distance level before moving to the next minute.",
        exampleSnippet:
          "items = [1, 2, 3]\nfor _ in range(len(items)):\n    print('step', items.pop(0))",
        whyWeUseItHere:
          "Groups oranges that rot at the exact same minute into one time step.",
      },
      {
        keywordOrMethod: "return minutes if fresh == 0 else -1",
        plainEnglishExplanation:
          "A ternary conditional expression. It evaluates to `minutes` if `fresh == 0`, otherwise it evaluates to `-1`.",
        exampleSnippet:
          "fresh = 0\nminutes = 4\nprint(minutes if fresh == 0 else -1)",
        whyWeUseItHere:
          "If any fresh oranges could not be reached by the rot, we must return -1.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        grid: [
          [2, 1],
          [1, 1],
        ],
      },
      gridPointers: { grid: [["r", "c"]] },
      focus: ["minutes", "fresh", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of rot as a disease spreading in waves through a fruit warehouse. At minute 0, every initially rotten orange is already a source of infection. During minute 1, all fresh oranges immediately next to ANY source become infected simultaneously. During minute 2, those newly rotten oranges infect their neighbors, and so on. Because all sources spread at the same time, this is a multi-source Breadth-First Search (BFS). Each level of the BFS corresponds to exactly one minute ticking on the clock.",
      edgeCases: [
        "No fresh oranges at all (`fresh == 0`): returns 0 minutes immediately.",
        "Fresh orange completely surrounded by empty cells (0s): can never be reached, so returns -1.",
        "No rotten oranges but fresh oranges exist: returns -1 because rot can never start.",
      ],
      stepByStepWalkthrough: [
        "Scan the entire grid: append all initially rotten oranges `(r, c)` to a `queue`, and count the total number of `fresh` oranges.",
        "If `fresh == 0`, return 0 immediately.",
        "Initialize `minutes = 0`.",
        "While `queue` is not empty and `fresh > 0`:",
        "Increment `minutes` by 1.",
        "Iterate `len(queue)` times to process the current minute's wave: pop an orange, check its 4 neighbors, and for each fresh neighbor, turn it to rotten (`grid[nr][nc] = 2`), decrement `fresh`, and enqueue `(nr, nc)`.",
        "When the queue is empty, return `minutes` if `fresh == 0` else `-1`.",
      ],
    },
    hints: {
      conceptual:
        "All rotten oranges infect their neighbors at the same time. Which traversal visits nodes in expanding concentric waves level by level?",
      structural:
        "Use multi-source BFS with a `collections.deque`. Put ALL initial rotten oranges in the queue at minute 0 and count `fresh`. In a `while queue and fresh > 0:` loop, process each wave with `for _ in range(len(queue)):`, incrementing `minutes` after each wave.",
    },
    commonMistakes: [
      "Running separate BFS runs from each rotten orange: this computes individual distances rather than simultaneous spread, leading to wrong minute counts.",
      "Incrementing `minutes` even when no fresh oranges were infected in the final wave.",
      "Forgetting to check if `fresh == 0` initially (should return 0, not -1).",
    ],
    starterCode: `from collections import deque


def oranges_rotting(grid: list[list[int]]) -> int:
    # Find min minutes until all oranges rot, or -1 if impossible.
    # Tip: multi-source BFS starting with all initially rotten oranges in the queue.
    pass
`,
    optimalSolution: `from collections import deque


def oranges_rotting(grid: list[list[int]]) -> int:
    # Dimensions of grid, queue for BFS waves, and counter of fresh oranges
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    # 1. Collect all initially rotten oranges and count fresh ones
    for r in range(rows):
        for c in range(cols):
            # Rotten orange: starting position for multi-source BFS
            if grid[r][c] == 2:
                queue.append((r, c))
            # Fresh orange: must be infected by the end
            elif grid[r][c] == 1:
                fresh += 1

    # If no fresh oranges exist to begin with, 0 minutes needed
    if fresh == 0:
        return 0

    # Minutes elapsed so far
    minutes = 0

    # 2. Multi-source BFS spreading rot 1 minute per wave
    while queue and fresh > 0:
        minutes += 1
        # Process every orange that rotted in the previous minute
        for _ in range(len(queue)):
            r, c = queue.popleft()
            # Check adjacent cells in 4 orthogonal directions
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    # Rot the fresh orange and enqueue it
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))

    # If some fresh oranges were never reached, return -1
    return minutes if fresh == 0 else -1
`,
    bruteForceSolution: `def oranges_rotting(grid: list[list[int]]) -> int:
    # Step-by-step simulation copying the grid each minute
    rows, cols = len(grid), len(grid[0])
    fresh = sum(grid[r][c] == 1 for r in range(rows) for c in range(cols))
    if fresh == 0:
        return 0

    minutes = 0
    while True:
        to_rot = []
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                            to_rot.append((nr, nc))

        if not to_rot:
            break

        for r, c in to_rot:
            if grid[r][c] == 1:
                grid[r][c] = 2
                fresh -= 1

        minutes += 1
        if fresh == 0:
            return minutes

    return -1 if fresh > 0 else minutes
`,
    harness: { kind: "function", entry: "oranges_rotting" },
    testCases: [
      {
        input: {
          grid: [
            [2, 1, 1],
            [1, 1, 0],
            [0, 1, 1],
          ],
        },
        expected: 4,
        description: "Rot spreads through adjacent cells in 4 minutes.",
      },
      {
        input: {
          grid: [
            [2, 1, 1],
            [0, 1, 1],
            [1, 0, 1],
          ],
        },
        expected: -1,
        description: "The bottom-left orange is blocked by empty cells (0s) and cannot be reached.",
      },
      {
        input: { grid: [[0, 2]] },
        expected: 0,
        description: "Already no fresh oranges, takes 0 minutes.",
      },
      {
        input: { grid: [[1]] },
        expected: -1,
      },
      {
        input: { grid: [[2]] },
        expected: 0,
      },
      {
        input: { grid: [[2, 1, 1, 1]] },
        expected: 3,
      },
      {
        input: { grid: [[2, 1, 2]] },
        expected: 1,
      },
      {
        input: { grid: [[0]] },
        expected: 0,
      },
    ],
  },

  // ------------------------------------------------------------------ walls-and-gates
  {
    id: "walls-and-gates",
    summary:
      "You are given an `m x n` grid `rooms` initialized with three possible values: `-1` is a wall, `0` is a gate, and `2147483647` (INF) is an empty room. Fill each empty room in place with the **distance to its nearest gate**. If an empty room cannot reach any gate, leave its value as `2147483647`.",
    constraints: [
      "m == len(rooms)",
      "n == len(rooms[i])",
      "1 ≤ m, n ≤ 250",
      "rooms[r][c] is -1, 0, or 2147483647",
    ],
    pattern: "Multi-source breadth-first search from all gates",
    timeComplexity: {
      bruteForce: "O((m × n)²)",
      optimal: "O(m × n)",
      explanation:
        "Starting a separate search from every empty room would be slow. By starting BFS from all gates at once, each cell is visited at most once, running in O(m × n) time.",
    },
    spaceComplexity: {
      optimal: "O(m × n)",
      explanation:
        "The BFS queue holds at most m × n room coordinates.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "INF = 2147483647",
        plainEnglishExplanation:
          "2147483647 is 2^31 - 1, the maximum 32-bit signed integer. The problem uses this constant to represent an empty, unvisited room.",
        exampleSnippet:
          "INF = 2147483647\nprint(INF > 1_000_000)",
        whyWeUseItHere:
          "We check `rooms[nr][nc] == INF` to identify empty rooms that haven't been reached yet.",
      },
      {
        keywordOrMethod: "queue.popleft()",
        plainEnglishExplanation:
          "Removes and returns an item from the front of a `collections.deque` in O(1) time.",
        exampleSnippet:
          "from collections import deque\nq = deque([(0, 1), (2, 3)])\nr, c = q.popleft()\nprint(r, c)",
        whyWeUseItHere:
          "Breadth-first search must process rooms in first-in, first-out (FIFO) order to guarantee shortest distances.",
      },
      {
        keywordOrMethod: "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:",
        plainEnglishExplanation:
          "Iterates through the four orthogonal direction vectors (up, down, left, right) to step into neighboring grid cells.",
        exampleSnippet:
          "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n    print(f'step: {dr}, {dc}')",
        whyWeUseItHere:
          "Allows checking all four adjacent rooms cleanly without repetitive code.",
      },
      {
        keywordOrMethod: "rooms[nr][nc] = current_dist + 1",
        plainEnglishExplanation:
          "Updates the neighbor cell's value directly in the 2D grid with the shortest distance from a gate.",
        exampleSnippet:
          "dist = 2\nnext_dist = dist + 1\nprint(next_dist)",
        whyWeUseItHere:
          "Because BFS traverses shortest paths first, the first time we reach an empty room gives its exact shortest distance.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        rooms: [
          [0, 2147483647],
          [2147483647, 0],
        ],
      },
      gridPointers: { rooms: [["r", "c"]] },
      focus: ["rooms", "r", "c"],
    },
    intuitiveExplanation: {
      intuition:
        "If you had to find the closest exit in a sprawling building, you wouldn't walk every possible path from your room. Instead, picture emergency sound alarms placed at every gate (exit). The sound waves travel outward one room per second simultaneously from all gates. The moment the sound first reaches a room, that elapsed time is guaranteed to be the shortest distance to the nearest gate.",
      edgeCases: [
        "Grid with only walls (-1) and empty rooms: empty rooms remain INF because no gate exists.",
        "Room completely walled off: stays INF.",
        "Single gate: all connected empty rooms get Manhattan distance to that gate.",
      ],
      stepByStepWalkthrough: [
        "If `rooms` is empty, return.",
        "Set `INF = 2147483647`.",
        "Find all gates (`rooms[r][c] == 0`) and enqueue their coordinates `(r, c)`.",
        "While the queue is not empty, pop `(r, c)`.",
        "For each of the 4 neighbors `(nr, nc)`, if it is within bounds and has value `INF`, set `rooms[nr][nc] = rooms[r][c] + 1` and append `(nr, nc)` to the queue.",
      ],
    },
    hints: {
      conceptual:
        "Instead of searching from each empty room to find a gate, what if you search outward from all gates simultaneously?",
      structural:
        "Collect all cells with `0` into a `collections.deque`. Use BFS: pop a cell, look at 4 neighbors, and if a neighbor equals `2147483647`, update it to `current_dist + 1` and push it into the queue.",
    },
    commonMistakes: [
      "Searching from each empty room individually: this is O((m × n)²) and results in Time Limit Exceeded.",
      "Overwriting walls (-1) or gates (0): only update cells whose value is strictly equal to `INF` (`2147483647`).",
    ],
    starterCode: `from collections import deque


def walls_and_gates(rooms: list[list[int]]) -> None:
    # Fill each empty room (INF=2147483647) with distance to nearest gate (0) in-place.
    # Tip: multi-source BFS starting from all gates at distance 0 simultaneously.
    pass
`,
    optimalSolution: `from collections import deque


def walls_and_gates(rooms: list[list[int]]) -> None:
    # Quick exit on empty grid
    if not rooms or not rooms[0]:
        return

    # Dimensions of grid and empty-room sentinel value
    rows, cols = len(rooms), len(rooms[0])
    INF = 2147483647
    queue = deque()

    # 1. Enqueue all gates (value 0) as simultaneous BFS starting points
    for r in range(rows):
        for c in range(cols):
            # When a gate is found, seed the BFS queue
            if rooms[r][c] == 0:
                queue.append((r, c))

    # 2. Multi-source BFS spreading outward wave by wave from all gates
    while queue:
        # Dequeue the next room coordinate
        r, c = queue.popleft()
        current_dist = rooms[r][c]

        # Check all 4 orthogonal directions: up, down, left, right
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            # Only step into empty, unvisited rooms within grid bounds
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                # Set distance to nearest gate and enqueue room
                rooms[nr][nc] = current_dist + 1
                queue.append((nr, nc))
`,
    bruteForceSolution: `from collections import deque


def walls_and_gates(rooms: list[list[int]]) -> None:
    if not rooms or not rooms[0]:
        return

    rows, cols = len(rooms), len(rooms[0])
    INF = 2147483647

    # Run separate BFS from each gate
    gates = [(r, c) for r in range(rows) for c in range(cols) if rooms[r][c] == 0]
    for gr, gc in gates:
        queue = deque([(gr, gc, 0)])
        while queue:
            r, c, dist = queue.popleft()
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] != -1:
                    if rooms[nr][nc] > dist + 1:
                        rooms[nr][nc] = dist + 1
                        queue.append((nr, nc, dist + 1))
`,
    harness: { kind: "function", entry: "walls_and_gates", inPlace: "rooms" },
    testCases: [
      {
        input: {
          rooms: [
            [2147483647, -1, 0, 2147483647],
            [2147483647, 2147483647, 2147483647, -1],
            [2147483647, -1, 2147483647, -1],
            [0, -1, 2147483647, 2147483647],
          ],
        },
        expected: [
          [3, -1, 0, 1],
          [2, 2, 1, -1],
          [1, -1, 2, -1],
          [0, -1, 3, 4],
        ],
        description: "Each empty room gets filled with the shortest distance to its nearest gate.",
      },
      {
        input: { rooms: [[-1]] },
        expected: [[-1]],
        description: "A single wall stays -1.",
      },
      {
        input: { rooms: [[0]] },
        expected: [[0]],
        description: "A single gate stays 0.",
      },
      {
        input: { rooms: [[2147483647]] },
        expected: [[2147483647]],
        description: "An unreachable room with no gates remains INF.",
      },
      {
        input: { rooms: [[0, 2147483647]] },
        expected: [[0, 1]],
      },
      {
        input: { rooms: [[0, -1, 2147483647]] },
        expected: [[0, -1, 2147483647]],
      },
      {
        input: {
          rooms: [
            [0, 2147483647],
            [2147483647, 0],
          ],
        },
        expected: [
          [0, 1],
          [1, 0],
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ course-schedule
  {
    id: "course-schedule",
    summary:
      "There are a total of `num_courses` courses you have to take, labeled from `0` to `num_courses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`. Return `True` if you can finish all courses, or `False` if there is a circular dependency.",
    constraints: [
      "1 ≤ num_courses ≤ 2000",
      "0 ≤ len(prerequisites) ≤ 5000",
      "prerequisites[i].length == 2",
      "0 ≤ a, b < num_courses",
      "All prerequisite pairs [a, b] are unique",
    ],
    pattern: "Topological sort / cycle detection in a directed graph",
    timeComplexity: {
      bruteForce: "O(V + E)",
      optimal: "O(V + E)",
      explanation:
        "V is `num_courses` and E is the number of prerequisite pairs. Building the adjacency list and tracking in-degrees takes O(V + E). Kahn's BFS algorithm visits each course and edge once.",
    },
    spaceComplexity: {
      optimal: "O(V + E)",
      explanation:
        "The adjacency list graph stores E directed edges across V nodes, and the in-degree array and queue take O(V) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "graph = [[] for _ in range(num_courses)]",
        plainEnglishExplanation:
          "Creates a list containing `num_courses` separate empty sublists. Each index represents a course, and its sublist holds the courses that unlock after taking it.",
        exampleSnippet:
          "adj = [[] for _ in range(3)]\nadj[0].append(1)\nprint(adj)",
        whyWeUseItHere:
          "An adjacency list is the standard way to represent a directed graph in Python.",
      },
      {
        keywordOrMethod: "indegree = [0] * num_courses",
        plainEnglishExplanation:
          "`[0] * n` creates a list of `n` zeros. `indegree[i]` tracks how many prerequisite courses must be completed before course `i` can be taken.",
        exampleSnippet:
          "deg = [0] * 3\ndeg[1] += 1\nprint(deg)",
        whyWeUseItHere:
          "Kahn's algorithm identifies courses ready to take when their in-degree drops to 0.",
      },
      {
        keywordOrMethod: "for course, pre in prerequisites:",
        plainEnglishExplanation:
          "Unpacks each pair `[course, pre]`. Remember that `[a, b]` means 'take b before a', so the directed edge goes from `pre` to `course`.",
        exampleSnippet:
          "pairs = [[1, 0], [2, 1]]\nfor c, p in pairs:\n    print(f'{p} unlocks {c}')",
        whyWeUseItHere:
          "Clarifies the direction of prerequisites when building the dependency graph.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { num_courses: 2, prerequisites: [[1, 0]] },
      focus: ["graph", "indegree", "queue", "taken"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of signing up for college courses. Each course has a prerequisite count (its 'in-degree'): if course A requires 2 other courses, its count is 2. At the start of the semester, you can only enroll in courses with 0 prerequisites left. When you complete a course, you cross it off the requirement lists of all advanced courses that needed it (decrementing their counts). If an advanced course's prerequisite count drops to 0, it is now unlocked! If you can unlock and finish every single course this way, you graduate. But if two courses require each other (a circular dependency like A needs B and B needs A), neither count will ever drop to 0, leaving you stuck.",
      edgeCases: [
        "No prerequisites at all: all courses can be taken in any order, returns `True`.",
        "Direct 2-course cycle `[[0, 1], [1, 0]]`: neither course can ever start, returns `False`.",
        "Self-loop `[[0, 0]]`: a course that requires itself can never be finished, returns `False`.",
        "Single course (`num_courses = 1`): returns `True`.",
      ],
      stepByStepWalkthrough: [
        "Initialize `graph = [[] for _ in range(num_courses)]` and `indegree = [0] * num_courses`.",
        "For each `[course, pre]` in `prerequisites`, add `course` to `graph[pre]` and increment `indegree[course]` by 1.",
        "Collect all courses with `indegree == 0` into a `queue`.",
        "Initialize a counter `taken = 0`.",
        "While the queue is not empty, pop a course `pre`, increment `taken += 1`, and for each `course` in `graph[pre]`, decrement `indegree[course] -= 1`. If `indegree[course] == 0`, append it to the queue.",
        "Return `taken == num_courses`.",
      ],
    },
    hints: {
      conceptual:
        "A set of courses can be finished if and only if the dependency graph has no directed cycles. How can you repeatedly remove courses that have no remaining requirements?",
      structural:
        "Use Kahn's algorithm (BFS with in-degrees): build `graph[pre] = [dependent_courses]` and count incoming edges in `indegree`. Queue courses where `indegree == 0`. Each time you pop a course, reduce its neighbors' in-degrees and queue any that reach 0. Check if `taken == num_courses`.",
    },
    commonMistakes: [
      "Reversing edge directions: `[a, b]` means `b` is required first (`b -> a`), not `a -> b`.",
      "Using an undirected graph: dependencies are one-way (directed edges).",
      "Forgetting to check if `taken == num_courses` at the end.",
    ],
    starterCode: `from collections import deque


def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    # Determine if you can finish all courses given prerequisite pairs [a, b] (take b before a).
    # Tip: count in-degrees for each course and take courses with 0 prerequisites first (Kahn's BFS).
    pass
`,
    optimalSolution: `from collections import deque


def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    # graph[pre] = list of courses unlocked after taking pre
    graph = [[] for _ in range(num_courses)]
    # indegree[c] = number of remaining prerequisites for course c
    indegree = [0] * num_courses

    # Build adjacency list and populate incoming prerequisites count
    for course, pre in prerequisites:
        graph[pre].append(course)
        indegree[course] += 1

    # Start with all courses that have 0 prerequisites
    queue = deque([c for c in range(num_courses) if indegree[c] == 0])
    # Tally of courses completed
    taken = 0

    while queue:
        # Take a course whose prerequisites are fully satisfied
        pre = queue.popleft()
        taken += 1

        # Unlock dependent courses
        for course in graph[pre]:
            indegree[course] -= 1
            # If all prerequisites for this course are met, it is ready to take
            if indegree[course] == 0:
                queue.append(course)

    # All courses can be finished if we took every course
    return taken == num_courses
`,
    bruteForceSolution: `def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    # DFS cycle detection using 3 states: 0=unvisited, 1=visiting, 2=visited
    graph = [[] for _ in range(num_courses)]
    for course, pre in prerequisites:
        graph[pre].append(course)

    state = [0] * num_courses

    def has_cycle(node: int) -> bool:
        if state[node] == 1:
            return True
        if state[node] == 2:
            return False

        state[node] = 1
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True
        state[node] = 2
        return False

    for c in range(num_courses):
        if state[c] == 0 and has_cycle(c):
            return False

    return True
`,
    harness: { kind: "function", entry: "can_finish" },
    testCases: [
      {
        input: { num_courses: 2, prerequisites: [[1, 0]] },
        expected: true,
        description: "Take course 0 first, then course 1.",
      },
      {
        input: {
          num_courses: 2,
          prerequisites: [
            [1, 0],
            [0, 1],
          ],
        },
        expected: false,
        description: "Circular dependency: course 0 requires course 1, and course 1 requires course 0.",
      },
      {
        input: { num_courses: 3, prerequisites: [] },
        expected: true,
        description: "No prerequisites at all, so any order works.",
      },
      {
        input: {
          num_courses: 3,
          prerequisites: [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
        },
        expected: false,
      },
      {
        input: {
          num_courses: 4,
          prerequisites: [
            [1, 0],
            [2, 0],
            [3, 1],
            [3, 2],
          ],
        },
        expected: true,
      },
      {
        input: {
          num_courses: 5,
          prerequisites: [
            [1, 0],
            [3, 2],
          ],
        },
        expected: true,
      },
      {
        input: { num_courses: 1, prerequisites: [[0, 0]] },
        expected: false,
      },
    ],
  },

  // ------------------------------------------------------------------ course-schedule-ii
  {
    id: "course-schedule-ii",
    summary:
      "There are a total of `num_courses` courses you have to take, labeled from `0` to `num_courses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first before taking course `a`. Return **a valid ordering of courses** you should take to finish all courses. If there are multiple valid answers, return any of them. If it is impossible to finish all courses (due to a cycle), return an **empty array** `[]`.",
    constraints: [
      "1 ≤ num_courses ≤ 2000",
      "0 ≤ len(prerequisites) ≤ num_courses * (num_courses - 1)",
      "prerequisites[i].length == 2",
      "0 ≤ a, b < num_courses",
      "a != b",
      "All pairs [a, b] are distinct",
    ],
    pattern: "Topological sort using Kahn's algorithm (BFS)",
    timeComplexity: {
      bruteForce: "O(V + E)",
      optimal: "O(V + E)",
      explanation:
        "Building the graph and degree array takes O(V + E). Each course is enqueued and dequeued once, producing the topological order in O(V + E) time.",
    },
    spaceComplexity: {
      optimal: "O(V + E)",
      explanation:
        "The graph adjacency list stores O(V + E) entries, and the queue and result list take O(V) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "[[] for _ in range(num_courses)]",
        plainEnglishExplanation:
          "A list comprehension that creates `num_courses` distinct empty lists, ensuring mutating one list doesn't affect the others.",
        exampleSnippet:
          "adj = [[] for _ in range(3)]\nadj[0].append(1)\nprint(adj)",
        whyWeUseItHere:
          "Initializes the adjacency list graph where each course has its own list of dependent courses.",
      },
      {
        keywordOrMethod: "[c for c in range(num_courses) if indegree[c] == 0]",
        plainEnglishExplanation:
          "Filters courses to find only those with an in-degree of 0 (no prerequisites needed).",
        exampleSnippet:
          "indegree = [0, 2, 0, 1]\nready = [c for c in range(len(indegree)) if indegree[c] == 0]\nprint(ready)",
        whyWeUseItHere:
          "Finds the initial set of courses you can take immediately on day one.",
      },
      {
        keywordOrMethod: "order.append(curr)",
        plainEnglishExplanation:
          "Appends the course we just took to our sequence of completed courses.",
        exampleSnippet:
          "order = []\norder.append(0)\norder.append(1)\nprint(order)",
        whyWeUseItHere:
          "Records courses in the exact order their prerequisites were satisfied.",
      },
      {
        keywordOrMethod: "return order if len(order) == num_courses else []",
        plainEnglishExplanation:
          "Checks if our schedule contains all `num_courses`. If some courses were never unlocked (due to a cycle), we return an empty list `[]`.",
        exampleSnippet:
          "order = [0, 1]\nn = 2\nprint(order if len(order) == n else [])",
        whyWeUseItHere:
          "If a cycle exists, no complete schedule is possible.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        num_courses: 3,
        prerequisites: [
          [1, 0],
          [2, 1],
        ],
      },
      focus: ["graph", "indegree", "order", "queue"],
    },
    intuitiveExplanation: {
      intuition:
        "This is Course Schedule with a bonus: instead of just checking if graduation is possible, you need to write down your actual semester-by-semester schedule! As before, start with every course that has no prerequisites and add them to your schedule (`order`). As you complete each course, reduce the prerequisite count for all courses that depended on it. Whenever an advanced course hits 0 prerequisites, add it to the queue. If your schedule ends up with all courses, you are done. If it gets stuck prematurely, there is a cycle, so return `[]`.",
      edgeCases: [
        "Cycle exists: return `[]`.",
        "Multiple valid topological orders (e.g. independent courses): any valid order is accepted by the judge.",
        "No prerequisites: return `[0, 1, ..., n-1]`.",
        "Single course: return `[0]`.",
      ],
      stepByStepWalkthrough: [
        "Build `graph = [[] for _ in range(num_courses)]` and `indegree = [0] * num_courses`.",
        "For each `[course, pre]`, append `course` to `graph[pre]` and increment `indegree[course]`.",
        "Enqueue all courses with `indegree == 0` and initialize `order = []`.",
        "While the queue has elements, pop `curr`, append `curr` to `order`, and for each `dependent` in `graph[curr]`, decrement `indegree[dependent]`. If it becomes 0, enqueue it.",
        "If `len(order) == num_courses`, return `order`, else return `[]`.",
      ],
    },
    hints: {
      conceptual:
        "How can you record the courses as they become eligible to be taken?",
      structural:
        "Apply Kahn's algorithm (BFS with in-degrees): each time a course is popped from the queue, append it to `order = []`. At the end, return `order` if `len(order) == num_courses` else `[]`.",
    },
    commonMistakes: [
      "Returning a partial order when a cycle exists: the problem requires returning an empty array `[]` if not all courses can be finished.",
      "Misidentifying edge direction: `[a, b]` means `b` must be taken before `a`.",
    ],
    starterCode: `from collections import deque


def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    # Return a valid ordering of courses to take, or [] if impossible.
    # Tip: Kahn's algorithm records each course in order as its indegree reaches 0.
    pass
`,
    optimalSolution: `from collections import deque


def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    # graph[pre] = list of courses unlocked by taking pre
    graph = [[] for _ in range(num_courses)]
    # indegree[c] = count of prerequisites remaining for course c
    indegree = [0] * num_courses

    # Build graph and count prerequisites for each course
    for course, pre in prerequisites:
        graph[pre].append(course)
        indegree[course] += 1

    # Queue courses that have 0 prerequisites ready to take immediately
    queue = deque([c for c in range(num_courses) if indegree[c] == 0])
    # Schedule list storing the topological ordering
    order = []

    # Process courses in topological order
    while queue:
        # Pop the next ready course and append to our schedule
        curr = queue.popleft()
        order.append(curr)

        # Unlock dependent courses
        for dependent in graph[curr]:
            indegree[dependent] -= 1
            # Enqueue dependent course when all its prerequisites are completed
            if indegree[dependent] == 0:
                queue.append(dependent)

    # Return valid ordering if all courses were completed, else []
    return order if len(order) == num_courses else []
`,
    bruteForceSolution: `def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    # DFS post-order topological sort with cycle detection
    graph = [[] for _ in range(num_courses)]
    for course, pre in prerequisites:
        graph[pre].append(course)

    # 0 = unvisited, 1 = visiting, 2 = visited
    state = [0] * num_courses
    order = []
    has_cycle = False

    def dfs(node: int) -> None:
        nonlocal has_cycle
        if has_cycle:
            return
        state[node] = 1
        for neighbor in graph[node]:
            if state[neighbor] == 1:
                has_cycle = True
                return
            elif state[neighbor] == 0:
                dfs(neighbor)
        state[node] = 2
        order.append(node)

    for c in range(num_courses):
        if state[c] == 0:
            dfs(c)

    if has_cycle or len(order) != num_courses:
        return []
    return order[::-1]
`,
    harness: { kind: "function", entry: "find_order", compare: "topo-order" },
    testCases: [
      {
        input: { num_courses: 2, prerequisites: [[1, 0]] },
        expected: [0, 1],
        description: "Course 0 must be taken first, followed by course 1.",
      },
      {
        input: {
          num_courses: 4,
          prerequisites: [
            [1, 0],
            [2, 0],
            [3, 1],
            [3, 2],
          ],
        },
        expected: [0, 1, 2, 3],
        description: "Course 0 is first; course 3 must come after both 1 and 2.",
      },
      {
        input: {
          num_courses: 2,
          prerequisites: [
            [1, 0],
            [0, 1],
          ],
        },
        expected: [],
        description: "Cycle detected: cannot finish courses, return [].",
      },
      {
        input: { num_courses: 1, prerequisites: [] },
        expected: [0],
      },
      {
        input: { num_courses: 3, prerequisites: [] },
        expected: [0, 1, 2],
      },
      {
        input: {
          num_courses: 3,
          prerequisites: [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
        },
        expected: [],
      },
      {
        input: {
          num_courses: 3,
          prerequisites: [
            [1, 0],
            [2, 0],
          ],
        },
        expected: [0, 1, 2],
      },
    ],
  },

  // ------------------------------------------------------------------ redundant-connection
  {
    id: "redundant-connection",
    summary:
      "A tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with `n` nodes labeled `1` to `n`, but one extra edge was added, creating a cycle. Given an array `edges` of length `n` where `edges[i] = [u, v]`, return an edge that can be removed so the remaining graph is a tree. If there are multiple answers, return the one that appears **last** in the input array.",
    constraints: [
      "n == len(edges)",
      "3 ≤ n ≤ 1000",
      "edges[i].length == 2",
      "1 ≤ u < v ≤ n",
      "edges has no repeated elements",
      "The given graph is connected",
    ],
    pattern: "Disjoint Set Union (Union-Find) with path compression and union by rank",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n · α(n))",
      explanation:
        "Using Union-Find with path compression and rank, each find and union operation takes near-constant O(α(n)) time (where α is the inverse Ackermann function, practically ≤ 4). Processing n edges takes O(n · α(n)) ≈ O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The parent and rank arrays each require O(n) storage for n + 1 elements.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "parent = list(range(n + 1))",
        plainEnglishExplanation:
          "`range(n + 1)` generates numbers 0 through n. Each node initially serves as its own parent. We use `n + 1` so we can index directly with 1-based node numbers `1..n`.",
        exampleSnippet:
          "parent = list(range(4))\nprint(parent)  # [0, 1, 2, 3]",
        whyWeUseItHere:
          "Union-Find initializes every node in its own separate component.",
      },
      {
        keywordOrMethod: "parent[node] = find(parent[node])",
        plainEnglishExplanation:
          "Path compression: when finding the root of `node`, we point `node` directly to the ultimate root, flattening the tree for nearly instant future lookups.",
        exampleSnippet:
          "parent = [0, 0, 1]\ndef find(i):\n    if parent[i] != i:\n        parent[i] = find(parent[i])\n    return parent[i]\nprint(find(2))\nprint(parent)",
        whyWeUseItHere:
          "Path compression keeps the trees extremely flat so find operations run in practically O(1) time.",
      },
      {
        keywordOrMethod: "if root_u == root_v:",
        plainEnglishExplanation:
          "If two nodes already share the exact same root, they are already part of the same connected component. Adding an edge between them creates a cycle!",
        exampleSnippet:
          "root_a, root_b = 3, 3\nif root_a == root_b:\n    print('Cycle detected!')",
        whyWeUseItHere:
          "This condition instantly detects the redundant edge.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        edges: [
          [1, 2],
          [1, 3],
          [2, 3],
        ],
      },
      focus: ["parent", "u", "v"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine connecting islands with bridges. Initially, each island is isolated. Every time a construction crew builds a bridge between island A and island B, you check: are A and B already connected by some existing chain of bridges? If not, you unite their networks. But if A and B are already in the same network, building this new bridge creates a closed loop (a cycle)! That bridge is completely redundant. Because we process bridges in order, the first bridge that attempts to connect two already-connected islands is our answer.",
      edgeCases: [
        "Triangle cycle `[1, 2], [1, 3], [2, 3]`: the last edge `[2, 3]` is redundant.",
        "Cycle at the very end of the input vs cycle earlier: returning the edge that appears last in the input when multiple exist is naturally handled by scanning left to right.",
      ],
      stepByStepWalkthrough: [
        "Initialize `parent = list(range(n + 1))` and `rank = [1] * (n + 1)`.",
        "Define `find(node)`: recursively find the root with path compression `parent[node] = find(parent[node])`.",
        "Define `union(u, v)`: find `root_u` and `root_v`. If `root_u == root_v`, return `False` (cycle found!). Otherwise attach the smaller rank tree to the larger rank tree and return `True`.",
        "Iterate through each `[u, v]` in `edges`.",
        "If `union(u, v)` returns `False`, return `[u, v]` immediately.",
      ],
    },
    hints: {
      conceptual:
        "In a tree, adding any edge between two already-connected nodes creates a cycle. How can you track which nodes are connected as you add edges one by one?",
      structural:
        "Use a Disjoint Set Union (Union-Find) data structure. For each edge `[u, v]`, if `find(u) == find(v)`, you've found the redundant edge! Otherwise call `union(u, v)`.",
    },
    commonMistakes: [
      "Forgetting 1-based indexing: node labels are 1 to n, so allocating an array of size `n` instead of `n + 1` causes IndexError on node `n`.",
      "Omitting path compression: without path compression or union by rank, tree height can become O(n), causing O(n²) total time.",
    ],
    starterCode: `def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    # Return the edge that creates a cycle, or the last such edge if multiple.
    # Tip: Union-Find tracks connected components; if find(u) == find(v), [u, v] is redundant.
    pass
`,
    optimalSolution: `def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    n = len(edges)
    # 1-indexed parent array: initially each node is its own parent
    parent = list(range(n + 1))
    rank = [1] * (n + 1)

    def find(node: int) -> int:
        # Path compression: point directly to root
        if parent[node] != node:
            parent[node] = find(parent[node])
        return parent[node]

    def union(u: int, v: int) -> bool:
        root_u = find(u)
        root_v = find(v)

        # Same root means u and v are already connected: cycle!
        if root_u == root_v:
            return False

        # Union by rank: attach smaller tree under larger tree
        if rank[root_u] < rank[root_v]:
            parent[root_u] = root_v
        elif rank[root_u] > rank[root_v]:
            parent[root_v] = root_u
        else:
            parent[root_v] = root_u
            rank[root_u] += 1

        return True

    # Process each edge in order
    for u, v in edges:
        # If union fails, u and v were already connected by earlier edges: cycle found!
        if not union(u, v):
            return [u, v]

    # Return empty list if no redundant edge found
    return []
`,
    bruteForceSolution: `from collections import defaultdict


def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    # DFS: before adding each edge, check if a path already exists between u and v
    graph = defaultdict(list)

    def has_path(src: int, dst: int, visited: set) -> bool:
        if src == dst:
            return True
        visited.add(src)
        for neighbor in graph[src]:
            if neighbor not in visited:
                if has_path(neighbor, dst, visited):
                    return True
        return False

    for u, v in edges:
        visited = set()
        if has_path(u, v, visited):
            return [u, v]
        graph[u].append(v)
        graph[v].append(u)

    return []
`,
    harness: { kind: "function", entry: "find_redundant_connection" },
    testCases: [
      {
        input: {
          edges: [
            [1, 2],
            [1, 3],
            [2, 3],
          ],
        },
        expected: [2, 3],
        description: "Edge [2, 3] creates a triangle cycle with [1, 2] and [1, 3].",
      },
      {
        input: {
          edges: [
            [1, 2],
            [2, 3],
            [3, 4],
            [1, 4],
            [1, 5],
          ],
        },
        expected: [1, 4],
        description: "Edge [1, 4] completes the cycle 1-2-3-4-1.",
      },
      {
        input: {
          edges: [
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 1],
          ],
        },
        expected: [4, 1],
      },
      {
        input: {
          edges: [
            [1, 3],
            [3, 4],
            [1, 5],
            [3, 5],
            [2, 3],
          ],
        },
        expected: [3, 5],
      },
      {
        input: {
          edges: [
            [1, 2],
            [2, 3],
            [3, 1],
          ],
        },
        expected: [3, 1],
      },
      {
        input: {
          edges: [
            [1, 2],
            [1, 3],
            [1, 4],
            [2, 4],
          ],
        },
        expected: [2, 4],
      },
    ],
  },

  // ------------------------------------------------------------------ number-of-connected-components-in-an-undirected-graph
  {
    id: "number-of-connected-components-in-an-undirected-graph",
    summary:
      "You have a graph of `n` nodes labeled from `0` to `n - 1`. You are given an integer `n` and an array `edges` where `edges[i] = [a, b]` indicates an undirected edge between node `a` and node `b`. Return the **total number of connected components** in the graph.",
    constraints: [
      "1 ≤ n ≤ 2000",
      "0 ≤ len(edges) ≤ 5000",
      "edges[i].length == 2",
      "0 ≤ a, b < n",
      "a != b",
      "There are no duplicate edges",
    ],
    pattern: "Disjoint Set Union (Union-Find) or BFS/DFS component counting",
    timeComplexity: {
      bruteForce: "O(n + E)",
      optimal: "O(n + E · α(n))",
      explanation:
        "Initializing the parent array takes O(n). Processing E edges using Union-Find with path compression takes O(E · α(n)) time, which is practically linear O(n + E).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The parent and rank arrays store n integers each.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "parent = list(range(n))",
        plainEnglishExplanation:
          "Generates `[0, 1, ..., n - 1]`. In Union-Find, each node starts as the leader of its own 1-element component.",
        exampleSnippet:
          "p = list(range(4))\nprint(p)",
        whyWeUseItHere:
          "Sets up the parent pointer array for all n vertices before processing any edges.",
      },
      {
        keywordOrMethod: "parent[node] = find(parent[node])",
        plainEnglishExplanation:
          "Path compression: during recursive find, resets the node's parent directly to the root of the tree.",
        exampleSnippet:
          "parent = [0, 0, 1]\ndef find(i):\n    if parent[i] != i:\n        parent[i] = find(parent[i])\n    return parent[i]\nprint(find(2))",
        whyWeUseItHere:
          "Flattens the Union-Find tree so subsequent searches run in nearly O(1) time.",
      },
      {
        keywordOrMethod: "components = n",
        plainEnglishExplanation:
          "Before looking at any edges, every node is in its own isolated component, so there are initially `n` components.",
        exampleSnippet:
          "components = 5\ncomponents -= 1\nprint('remaining:', components)",
        whyWeUseItHere:
          "Every successful union between two previously separated components reduces the total component count by exactly 1.",
      },
      {
        keywordOrMethod: "if union(u, v): components -= 1",
        plainEnglishExplanation:
          "Calls `union(u, v)`. If it returns `True` (meaning `u` and `v` were in separate sets and are now merged), we decrement `components`.",
        exampleSnippet:
          "def merge(a, b):\n    return a != b\ncount = 3\nif merge(1, 2):\n    count -= 1\nprint(count)",
        whyWeUseItHere:
          "Avoids needing a separate pass to count distinct set roots at the end.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        n: 3,
        edges: [[0, 1]],
      },
      focus: ["parent", "components", "u", "v"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine `n` people standing in a room, each forming their own 1-person club (so `n` clubs in total). You start reading a list of friendships `[a, b]`. If person `a` and person `b` are already in the same club, nothing changes. But if person `a` and person `b` belong to different clubs, their two clubs merge into one! Each time two separate clubs merge, the total number of clubs drops by 1. Once all friendships are processed, the number of remaining clubs is your answer.",
      edgeCases: [
        "No edges (`edges = []`): all `n` nodes are isolated, returns `n`.",
        "Single node (`n = 1, edges = []`): returns `1`.",
        "Fully connected graph: returns `1`.",
        "Redundant edges: edges that connect nodes within the same component do not reduce the count.",
      ],
      stepByStepWalkthrough: [
        "Set `parent = list(range(n))`, `rank = [1] * n`, and `components = n`.",
        "Define `find(node)` with path compression.",
        "Define `union(u, v)`: return `False` if `find(u) == find(v)`, else merge by rank and return `True`.",
        "For each `[u, v]` in `edges`, call `union(u, v)`. If it returns `True`, decrement `components -= 1`.",
        "Return `components`.",
      ],
    },
    hints: {
      conceptual:
        "Every time an edge connects two previously unconnected groups of nodes, how does the total count of separate groups change?",
      structural:
        "Start with `components = n`. Use Union-Find to process each edge. If `union(u, v)` successfully merges two different roots, decrement `components` by 1. Return `components`.",
    },
    commonMistakes: [
      "Decrementing the component count even when an edge connects two nodes already in the same component.",
      "Forgetting nodes are 0-indexed (`0` to `n - 1`), unlike Redundant Connection which was 1-indexed.",
    ],
    starterCode: `def count_components(n: int, edges: list[list[int]]) -> int:
    # Count the number of connected components in the undirected graph with n nodes.
    # Tip: start with n components; each successful union decreases the count by 1.
    pass
`,
    optimalSolution: `def count_components(n: int, edges: list[list[int]]) -> int:
    # Each node initially belongs to its own component (0-indexed)
    parent = list(range(n))
    # Rank array for union-by-rank balancing
    rank = [1] * n
    # Start with n independent components
    components = n

    def find(node: int) -> int:
        # Path compression: point node directly to root
        if parent[node] != node:
            parent[node] = find(parent[node])
        return parent[node]

    def union(u: int, v: int) -> bool:
        root_u = find(u)
        root_v = find(v)

        # Same root means u and v are already connected in the same component
        if root_u == root_v:
            return False

        # Attach smaller tree to larger tree
        if rank[root_u] < rank[root_v]:
            parent[root_u] = root_v
        elif rank[root_u] > rank[root_v]:
            parent[root_v] = root_u
        else:
            parent[root_v] = root_u
            rank[root_u] += 1

        return True

    # Process all edges in the graph
    for u, v in edges:
        # Every successful union decreases the total component count by 1
        if union(u, v):
            components -= 1

    # Return final number of connected components
    return components
`,
    bruteForceSolution: `def count_components(n: int, edges: list[list[int]]) -> int:
    # DFS component count
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = set()
    components = 0

    for i in range(n):
        if i not in visited:
            components += 1
            stack = [i]
            visited.add(i)
            while stack:
                curr = stack.pop()
                for neighbor in graph[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        stack.append(neighbor)

    return components
`,
    harness: { kind: "function", entry: "count_components" },
    testCases: [
      {
        input: {
          n: 5,
          edges: [
            [0, 1],
            [1, 2],
            [3, 4],
          ],
        },
        expected: 2,
        description: "Component 1 is {0, 1, 2} and Component 2 is {3, 4}.",
      },
      {
        input: {
          n: 5,
          edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
          ],
        },
        expected: 1,
        description: "All 5 nodes are connected in a single line.",
      },
      {
        input: { n: 4, edges: [] },
        expected: 4,
        description: "4 isolated nodes with 0 edges form 4 separate components.",
      },
      {
        input: { n: 1, edges: [] },
        expected: 1,
      },
      {
        input: {
          n: 4,
          edges: [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
        },
        expected: 2,
      },
      {
        input: {
          n: 6,
          edges: [
            [0, 1],
            [2, 3],
          ],
        },
        expected: 4,
      },
      {
        input: {
          n: 3,
          edges: [
            [0, 1],
            [1, 2],
            [0, 2],
          ],
        },
        expected: 1,
      },
    ],
  },

  // ------------------------------------------------------------------ graph-valid-tree
  {
    id: "graph-valid-tree",
    summary:
      "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected `edges` (each edge is a pair of nodes `[a, b]`), determine whether these edges make up a **valid tree**. An undirected graph is a valid tree if it is **fully connected** and contains **no cycles**.",
    constraints: [
      "1 ≤ n ≤ 2000",
      "0 ≤ len(edges) ≤ 5000",
      "edges[i].length == 2",
      "0 ≤ a, b < n",
      "a != b",
      "There are no duplicate edges or self-loops",
    ],
    pattern: "Union-Find or DFS with tree property checks (edges == n - 1)",
    timeComplexity: {
      bruteForce: "O(n + E)",
      optimal: "O(n · α(n))",
      explanation:
        "A valid tree with n nodes must have exactly n - 1 edges. If `len(edges) != n - 1`, we return False immediately in O(1). Otherwise, we run Union-Find over the n - 1 edges in O(n · α(n)) ≈ O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The parent and rank arrays each require O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "if len(edges) != n - 1: return False",
        plainEnglishExplanation:
          "A fundamental mathematical property of trees: any tree with `n` nodes must contain exactly `n - 1` edges. If there are fewer edges, the graph is disconnected; if there are more, it must contain a cycle.",
        exampleSnippet:
          "n = 4\nedges = [[0, 1], [1, 2]]\nprint(len(edges) == n - 1)",
        whyWeUseItHere:
          "Instantly rejects invalid graphs before doing any graph traversal.",
      },
      {
        keywordOrMethod: "rank = [1] * n",
        plainEnglishExplanation:
          "Creates a list of `n` ones representing the initial depth or rank of each node's tree in Union-Find.",
        exampleSnippet:
          "ranks = [1] * 4\nprint(ranks)",
        whyWeUseItHere:
          "Used in union-by-rank to keep trees flat by attaching shorter trees under taller roots.",
      },
      {
        keywordOrMethod: "parent[node] = find(parent[node])",
        plainEnglishExplanation:
          "Recursive path compression in `find`: updates the node's parent pointer directly to the representative of its set.",
        exampleSnippet:
          "parent = [0, 0, 1]\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\nprint(find(2))",
        whyWeUseItHere:
          "Flattens tree depth to keep cycle detection nearly instantaneous across all edges.",
      },
      {
        keywordOrMethod: "if not union(u, v): return False",
        plainEnglishExplanation:
          "If two nodes `u` and `v` already share the same root in our Union-Find structure, adding edge `[u, v]` creates a cycle, which violates the tree definition.",
        exampleSnippet:
          "def union(a, b):\n    return a != b\nif not union(1, 1):\n    print('Cycle found!')",
        whyWeUseItHere:
          "Detects any cycle in the graph.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        n: 3,
        edges: [
          [0, 1],
          [1, 2],
        ],
      },
      focus: ["parent", "u", "v"],
    },
    intuitiveExplanation: {
      intuition:
        "To be a valid tree, a graph must fulfill two conditions: (1) no cycles (no closed loops), and (2) all nodes must be connected into a single piece. A magic property of trees connects these two requirements: if a graph has `n` nodes and NO cycles, it is fully connected IF AND ONLY IF it has exactly `n - 1` edges! So we first check `len(edges) == n - 1`. If that holds, all we have to do is verify that none of the edges form a cycle using Union-Find.",
      edgeCases: [
        "Single node (`n = 1, edges = []`): has 1 node and 0 edges, is connected with no cycles, returns `True`.",
        "Disconnected components with `len(edges) < n - 1`: caught immediately by the edge count check.",
        "Cycle with `len(edges) >= n`: caught either by edge count or by union-find.",
      ],
      stepByStepWalkthrough: [
        "If `len(edges) != n - 1`, return `False` immediately.",
        "Initialize `parent = list(range(n))` and `rank = [1] * n`.",
        "Define `find(node)` with path compression.",
        "Define `union(u, v)`: return `False` if `find(u) == find(v)`, else merge by rank and return `True`.",
        "Iterate over each `[u, v]` in `edges`: if `union(u, v)` returns `False`, a cycle was detected, so return `False`.",
        "If all `n - 1` edges successfully merged without cycles, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "How many edges does a tree with n nodes have? If an undirected graph has that exact number of edges and no cycles, is it guaranteed to be a tree?",
      structural:
        "Check `if len(edges) != n - 1: return False`. Then run Union-Find over the edges: if any edge connects two nodes with the same root (`find(u) == find(v)`), return `False`. Otherwise return `True`.",
    },
    commonMistakes: [
      "Forgetting to check `len(edges) == n - 1`: if you only check for no cycles, a disconnected graph like 4 nodes with edges `[[0, 1], [2, 3]]` has no cycles but is NOT a tree.",
      "Assuming a graph with `n - 1` edges is always connected: it could have a cycle and an isolated node.",
    ],
    starterCode: `def valid_tree(n: int, edges: list[list[int]]) -> bool:
    # Check if the undirected graph is a valid tree (connected and acyclic).
    # Tip: a tree with n nodes must have exactly n - 1 edges and no cycles.
    pass
`,
    optimalSolution: `def valid_tree(n: int, edges: list[list[int]]) -> bool:
    # A tree with n nodes must have exactly n - 1 edges
    if len(edges) != n - 1:
        return False

    # Initialize Union-Find parent array and rank sizes
    parent = list(range(n))
    rank = [1] * n

    def find(node: int) -> int:
        # Path compression: point node directly to root
        if parent[node] != node:
            parent[node] = find(parent[node])
        return parent[node]

    def union(u: int, v: int) -> bool:
        root_u = find(u)
        root_v = find(v)

        # Same root means u and v were already connected: cycle!
        if root_u == root_v:
            return False

        # Attach smaller tree under larger root
        if rank[root_u] < rank[root_v]:
            parent[root_u] = root_v
        elif rank[root_u] > rank[root_v]:
            parent[root_v] = root_u
        else:
            parent[root_v] = root_u
            rank[root_u] += 1

        return True

    # With exactly n - 1 edges, having no cycles guarantees connectivity
    for u, v in edges:
        # If adding this edge creates a cycle, not a valid tree
        if not union(u, v):
            return False

    # All n nodes are connected without cycles
    return True
`,
    bruteForceSolution: `from collections import deque


def valid_tree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1:
        return False

    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # BFS from node 0: must visit all n nodes
    visited = set()
    queue = deque([0])
    visited.add(0)

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return len(visited) == n
`,
    harness: { kind: "function", entry: "valid_tree" },
    testCases: [
      {
        input: {
          n: 5,
          edges: [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 4],
          ],
        },
        expected: true,
        description: "5 nodes with 4 edges and no cycles forms a valid tree.",
      },
      {
        input: {
          n: 5,
          edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [1, 3],
            [1, 4],
          ],
        },
        expected: false,
        description: "Contains cycle 1-2-3-1, so it cannot be a tree.",
      },
      {
        input: {
          n: 4,
          edges: [
            [0, 1],
            [2, 3],
          ],
        },
        expected: false,
        description: "Disconnected: 2 components instead of 1.",
      },
      {
        input: { n: 1, edges: [] },
        expected: true,
        description: "A single node with no edges is a valid tree.",
      },
      {
        input: { n: 2, edges: [[0, 1]] },
        expected: true,
      },
      {
        input: {
          n: 3,
          edges: [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
        },
        expected: false,
      },
      {
        input: {
          n: 4,
          edges: [
            [0, 1],
            [1, 2],
            [2, 3],
          ],
        },
        expected: true,
      },
    ],
  },

  // ------------------------------------------------------------------ word-ladder
  {
    id: "word-ladder",
    summary:
      "A transformation sequence from `begin_word` to `end_word` using a dictionary `word_list` is a sequence of words `begin_word -> s1 -> s2 -> ... -> sk` such that every adjacent pair of words differs by exactly **one letter**, and every `si` is in `word_list`. Return the **number of words** in the shortest transformation sequence from `begin_word` to `end_word`, or `0` if no such sequence exists.",
    constraints: [
      "1 ≤ len(begin_word) ≤ 10",
      "len(end_word) == len(begin_word)",
      "1 ≤ len(word_list) ≤ 5000",
      "len(word_list[i]) == len(begin_word)",
      "All words consist of lowercase English letters",
      "begin_word != end_word",
      "All words in word_list are unique",
    ],
    pattern: "Breadth-first search (BFS) with intermediate wildcard patterns",
    timeComplexity: {
      bruteForce: "O(N² × L)",
      optimal: "O(N × L²)",
      explanation:
        "N is the number of words in `word_list` and L is the length of each word. Comparing every pair of words takes O(N² × L). Using intermediate wildcard patterns (like `'h*t'`), generating patterns takes O(N × L²), and each word is processed once during BFS in O(N × L²) time.",
    },
    spaceComplexity: {
      optimal: "O(N × L²)",
      explanation:
        "The patterns dictionary maps N × L patterns to matching words, with each pattern string taking O(L) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import defaultdict, deque",
        plainEnglishExplanation:
          "`defaultdict(list)` automatically creates an empty list when accessing a missing key, and `deque` provides an O(1) queue for BFS.",
        exampleSnippet:
          "from collections import defaultdict, deque\nd = defaultdict(list)\nd['key'].append(1)\nq = deque([10])\nprint(d['key'], q.popleft())",
        whyWeUseItHere:
          "We group words by their wildcard patterns and traverse the graph in BFS order.",
      },
      {
        keywordOrMethod: "pattern = word[:j] + '*' + word[j + 1:]",
        plainEnglishExplanation:
          "String slicing replaces the character at index `j` with `'*'`. For example, `'hot'` with `j=1` becomes `'h*t'`.",
        exampleSnippet:
          "w = 'hot'\npat = w[:1] + '*' + w[2:]\nprint(pat)",
        whyWeUseItHere:
          "Any two words that differ by one letter at position `j` will produce the exact same pattern.",
      },
      {
        keywordOrMethod: "patterns[pattern] = []",
        plainEnglishExplanation:
          "Once we have explored all words matching a pattern, we clear that pattern's list to avoid re-examining the same words in future steps.",
        exampleSnippet:
          "table = {'*at': ['cat', 'bat']}\ntable['*at'] = []\nprint(table)",
        whyWeUseItHere:
          "Prevents redundant lookups and speeds up BFS graph traversal.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        begin_word: "hit",
        end_word: "cog",
        word_list: ["hot", "dot", "dog", "cog"],
      },
      focus: ["patterns", "queue", "word", "length"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of each word as a subway station, and a 1-letter change as a train track connecting two stations. We want the shortest route from station `begin_word` to station `end_word`. In any unweighted shortest-path problem, Breadth-First Search (BFS) is the optimal tool because it visits all stations 1 step away, then 2 steps away, guaranteeing that the first time we pull `end_word` from the queue, we have taken the minimum possible number of steps. To quickly find which words differ by 1 letter, we bucket words into wildcard templates: both 'hot' and 'dot' belong to '*ot'.",
      edgeCases: [
        "`end_word` not in `word_list`: impossible to reach, returns 0 immediately.",
        "`begin_word` already connects to `end_word` in 1 step: returns 2 (sequence of length 2).",
        "No possible path between `begin_word` and `end_word`: queue empties without reaching `end_word`, returns 0.",
      ],
      stepByStepWalkthrough: [
        "If `end_word not in word_list`, return 0.",
        "Preprocess `word_list`: for each word and each character index `j`, generate `pattern = word[:j] + '*' + word[j+1:]` and append `word` to `patterns[pattern]`.",
        "Initialize `queue = deque([(begin_word, 1)])` and `visited = {begin_word}`.",
        "While `queue` has words, pop `(word, length)`.",
        "If `word == end_word`, return `length`.",
        "For each character index `j`, find its pattern and iterate over each `neighbor` in `patterns[pattern]`. If `neighbor` is not visited, mark it visited and enqueue `(neighbor, length + 1)`.",
        "Clear `patterns[pattern] = []` so we don't traverse those edges again.",
        "If queue empties without finding `end_word`, return 0.",
      ],
    },
    hints: {
      conceptual:
        "Since every step between words has equal cost (1 change), which graph traversal algorithm always finds the shortest path first?",
      structural:
        "Use BFS with a `collections.deque` storing `(current_word, path_length)`. To find 1-letter neighbors efficiently, group words by intermediate wildcard patterns like `word[:j] + '*' + word[j+1:]` in a `defaultdict(list)`.",
    },
    commonMistakes: [
      "Forgetting to check if `end_word` is in `word_list`: if it isn't, no valid sequence can ever exist.",
      "Returning the number of transformations (edges) instead of the number of words in the sequence (nodes = edges + 1): the problem asks for the sequence length including `begin_word` and `end_word`.",
      "Pairwise comparison of all words: comparing all N words against each other is O(N² × L), which times out on large word lists.",
    ],
    starterCode: `from collections import defaultdict, deque


def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    # Find shortest transformation sequence length from begin_word to end_word.
    # Tip: use BFS with generic intermediate patterns like 'h*t' to find 1-letter neighbors.
    pass
`,
    optimalSolution: `from collections import defaultdict, deque


def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    # If end_word is not in word_list, no transformation is possible
    if end_word not in word_list:
        return 0

    word_len = len(begin_word)
    # Map generic intermediate pattern -> list of matching words
    patterns = defaultdict(list)
    for word in word_list:
        # Group words by wildcard patterns replacing one letter with '*'
        for j in range(word_len):
            pattern = word[:j] + "*" + word[j + 1:]
            patterns[pattern].append(word)

    # BFS queue stores (current_word, sequence_length)
    queue = deque([(begin_word, 1)])
    # Set of visited words to prevent cycles
    visited = {begin_word}

    while queue:
        # Pop the current word and its path length
        word, length = queue.popleft()

        # Target word reached: return total words in shortest path
        if word == end_word:
            return length

        # Check all wildcard patterns for the current word
        for j in range(word_len):
            pattern = word[:j] + "*" + word[j + 1:]
            # Explore all candidate words matching this pattern
            for neighbor in patterns[pattern]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, length + 1))
            # Clear pattern list to avoid redundant lookups
            patterns[pattern] = []

    # If queue empties without reaching end_word, no path exists
    return 0
`,
    bruteForceSolution: `from collections import deque


def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    if end_word not in word_list:
        return 0

    words = set(word_list)
    queue = deque([(begin_word, 1)])
    visited = {begin_word}

    def diff_by_one(w1: str, w2: str) -> bool:
        diff = 0
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                diff += 1
                if diff > 1:
                    return False
        return diff == 1

    while queue:
        word, length = queue.popleft()
        if word == end_word:
            return length
        for candidate in words:
            if candidate not in visited and diff_by_one(word, candidate):
                visited.add(candidate)
                queue.append((candidate, length + 1))

    return 0
`,
    harness: { kind: "function", entry: "ladder_length" },
    testCases: [
      {
        input: {
          begin_word: "hit",
          end_word: "cog",
          word_list: ["hot", "dot", "dog", "lot", "log", "cog"],
        },
        expected: 5,
        description: "Shortest transformation is 'hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog' (5 words).",
      },
      {
        input: {
          begin_word: "hit",
          end_word: "cog",
          word_list: ["hot", "dot", "dog", "lot", "log"],
        },
        expected: 0,
        description: "end_word 'cog' is not in word_list, so no transformation sequence is possible.",
      },
      {
        input: {
          begin_word: "a",
          end_word: "c",
          word_list: ["a", "b", "c"],
        },
        expected: 2,
        description: "'a' -> 'c' in 2 words.",
      },
      {
        input: {
          begin_word: "hot",
          end_word: "dog",
          word_list: ["hot", "dog"],
        },
        expected: 0,
      },
      {
        input: {
          begin_word: "cat",
          end_word: "sag",
          word_list: ["bat", "bag", "sag", "dag"],
        },
        expected: 4,
      },
      {
        input: {
          begin_word: "hot",
          end_word: "dot",
          word_list: ["hot", "dot", "dog"],
        },
        expected: 2,
      },
      {
        input: {
          begin_word: "qa",
          end_word: "sq",
          word_list: [
            "si", "go", "se", "cm", "so", "ph", "mt", "db", "mb", "sb",
            "kr", "ln", "tm", "le", "av", "sm", "ar", "ci", "ca", "br",
            "ti", "ba", "to", "ra", "fa", "yo", "ow", "sn", "ya", "cr",
            "po", "fe", "ho", "ma", "re", "or", "rn", "au", "ur", "rh",
            "sr", "tc", "lt", "lo", "as", "fr", "nb", "yb", "if", "pb",
            "ge", "th", "pm", "rb", "sh", "co", "ga", "li", "ha", "hz",
            "no", "bi", "di", "hi", "qa", "pi", "os", "uh", "wm", "an",
            "me", "mo", "na", "la", "st", "er", "sc", "ne", "mn", "mi",
            "am", "ex", "pt", "io", "be", "fm", "ta", "tb", "ni", "mr",
            "pa", "he", "lr", "sq", "ye",
          ],
        },
        expected: 5,
      },
    ],
  },
];

export default problems;
