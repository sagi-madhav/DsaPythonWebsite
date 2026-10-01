import type { CategoryInfo, CategorySlug } from "./types";

export const CATEGORY_INFO: Record<CategorySlug, CategoryInfo> = {
  "arrays-and-hashing": {
    slug: "arrays-and-hashing",
    title: "Arrays & Hashing",
    shortTitle: "Arrays",
    prerequisites: [],
    fundamentals: ["python-basics", "lists-and-slicing", "dicts-and-sets"],
    tagline: "Instant O(1) lookups and linear scans: the bedrock of interview DSA.",
    mentalModel: "A telephone directory: instead of searching every house for a name, you look it up directly in the index in one step.",
    recognitionSignals: [
      "Find pairs or duplicates in a collection",
      "Frequency counting or grouping by properties",
      "Need O(1) membership checking or caching complements",
    ],
    template: `seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        return [seen[complement], i]
    seen[num] = i`,
    typicalComplexity: "Time: O(n) | Space: O(n)",
    position: { x: 0, y: 0 },
  },
  "two-pointers": {
    slug: "two-pointers",
    title: "Two Pointers",
    shortTitle: "Two Pointers",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["lists-and-slicing", "control-flow"],
    tagline: "Shrink search space from both ends without nested loops.",
    mentalModel: "Two index fingers walking inward along a sorted ruler until they point to the exact target sum.",
    recognitionSignals: [
      "Sorted array where you need to find pairs or triples",
      "In-place string or array reversal and palindrome testing",
      "Container boundaries maximizing area or volume",
    ],
    template: `l, r = 0, len(nums) - 1
while l < r:
    current_sum = nums[l] + nums[r]
    if current_sum == target:
        return [l + 1, r + 1]
    elif current_sum < target:
        l += 1
    else:
        r -= 1`,
    typicalComplexity: "Time: O(n) | Space: O(1)",
    position: { x: 1, y: 0 },
  },
  "sliding-window": {
    slug: "sliding-window",
    title: "Sliding Window",
    shortTitle: "Sliding Window",
    prerequisites: ["two-pointers"],
    fundamentals: ["lists-and-slicing", "strings"],
    tagline: "Dynamic subsegment tracking in continuous arrays or strings.",
    mentalModel: "A magnifying glass sliding across film frames, expanding rightward and contracting leftward when constraints are violated.",
    recognitionSignals: [
      "Subarrays or substrings with target length or condition",
      "Longest or shortest contiguous segment meeting a rule",
      "Continuous rolling maximum, sum, or character counts",
    ],
    template: `l = 0
for r in range(len(s)):
    # Expand window by including s[r]
    counts[s[r]] = counts.get(s[r], 0) + 1
    while not condition_valid():
        counts[s[l]] -= 1
        l += 1
    best = max(best, r - l + 1)`,
    typicalComplexity: "Time: O(n) | Space: O(k)",
    position: { x: 2, y: 0 },
  },
  "stack": {
    slug: "stack",
    title: "Stack",
    shortTitle: "Stack",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["lists-and-slicing"],
    tagline: "Last-In, First-Out: nesting, matching, and monotonic histories.",
    mentalModel: "A stack of plates in a cafeteria: you can only place on top or take from the top. Great for tracking matching pairs.",
    recognitionSignals: [
      "Matching opening and closing brackets or tags",
      "Finding the next greater or smaller element (monotonic stack)",
      "Backtracking history or undoing previous steps",
    ],
    template: `stack = []
for item in items:
    while stack and should_pop(stack[-1], item):
        top = stack.pop()
        # Process popped element
    stack.append(item)`,
    typicalComplexity: "Time: O(n) | Space: O(n)",
    position: { x: 0, y: 1 },
  },
  "binary-search": {
    slug: "binary-search",
    title: "Binary Search",
    shortTitle: "Binary Search",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["control-flow"],
    tagline: "Halving search spaces in O(log n) time.",
    mentalModel: "Opening a phone book right down the middle and immediately discarding the entire half you don't need.",
    recognitionSignals: [
      "Sorted array or matrix lookup in sublinear time",
      "Finding the boundary where a condition flips from True to False",
      "Minimizing the maximum or maximizing the minimum speed/capacity",
    ],
    template: `low, high = 0, len(nums) - 1
while low <= high:
    mid = (low + high) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        low = mid + 1
    else:
        high = mid - 1`,
    typicalComplexity: "Time: O(log n) | Space: O(1)",
    position: { x: 1, y: 1 },
  },
  "linked-list": {
    slug: "linked-list",
    title: "Linked List",
    shortTitle: "Linked List",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["classes-and-nodes", "references"],
    tagline: "Chained pointer nodes: in-place splicing and cycle detection.",
    mentalModel: "A treasure hunt where each clue contains only a message and the address of the next clue.",
    recognitionSignals: [
      "Reversing sequence links in-place with O(1) extra space",
      "Merging two already-ordered chains",
      "Detecting cycles using slow and fast runners (Floyd's algorithm)",
    ],
    template: `dummy = ListNode(0, head)
prev, curr = None, head
while curr:
    nxt = curr.next
    curr.next = prev
    prev = curr
    curr = nxt
return prev`,
    typicalComplexity: "Time: O(n) | Space: O(1)",
    position: { x: 2, y: 1 },
  },
  "trees": {
    slug: "trees",
    title: "Trees",
    shortTitle: "Trees",
    prerequisites: ["linked-list"],
    fundamentals: ["classes-and-nodes", "recursion"],
    tagline: "Hierarchical data: depth-first search and breadth-first search.",
    mentalModel: "An organizational chart: every manager directs left and right sub-teams, and problems are solved recursively down each branch.",
    recognitionSignals: [
      "Root to leaf path calculations and maximum depth",
      "Binary Search Tree properties: left < root < right",
      "Subtree symmetry, inversion, or serialization",
    ],
    template: `def dfs(node):
    if not node:
        return 0
    left_depth = dfs(node.left)
    right_depth = dfs(node.right)
    return 1 + max(left_depth, right_depth)`,
    typicalComplexity: "Time: O(n) | Space: O(h)",
    position: { x: 0, y: 2 },
  },
  "tries": {
    slug: "tries",
    title: "Tries",
    shortTitle: "Tries",
    prerequisites: ["trees"],
    fundamentals: ["classes-and-nodes", "dicts-and-sets"],
    tagline: "Prefix trees for efficient word dictionaries and autocomplete.",
    mentalModel: "A tree where each branch is a letter. Tracing from root spells prefixes and complete words.",
    recognitionSignals: [
      "Autocomplete or prefix checking across large vocabularies",
      "Searching with wildcard characters like '.'",
      "Boggle-style grid word search algorithms",
    ],
    template: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False`,
    typicalComplexity: "Time: O(L) per word | Space: O(N * L)",
    position: { x: 1, y: 2 },
  },
  "heap-priority-queue": {
    slug: "heap-priority-queue",
    title: "Heap / Priority Queue",
    shortTitle: "Heap",
    prerequisites: ["trees"],
    fundamentals: ["deques-and-heaps"],
    tagline: "Instant top element retrieval in dynamic streams.",
    mentalModel: "An emergency room triage line: patients are served by urgency, not arrival order. The most critical person is always first.",
    recognitionSignals: [
      "Find the K-th largest or K closest points in a collection",
      "Continuously tracking running median in real-time streams",
      "Greedy interval scheduling with cooldowns",
    ],
    template: `import heapq
min_heap = []
for num in nums:
    heapq.heappush(min_heap, num)
    if len(min_heap) > k:
        heapq.heappop(min_heap)`,
    typicalComplexity: "Time: O(n log k) | Space: O(k)",
    position: { x: 2, y: 2 },
  },
  "backtracking": {
    slug: "backtracking",
    title: "Backtracking",
    shortTitle: "Backtracking",
    prerequisites: ["trees"],
    fundamentals: ["recursion", "references"],
    tagline: "Systematic trial-and-error: explore, prune, and revert.",
    mentalModel: "Navigating a hedge maze: you drop breadcrumbs as you walk forward, and when you hit a dead end, you rewind step-by-step and try the other turn.",
    recognitionSignals: [
      "Generate all permutations, combinations, or subsets",
      "Solve constraint puzzles like N-Queens or Sudoku",
      "Partitioning strings into valid components",
    ],
    template: `res = []
def backtrack(start, path):
    res.append(path[:])
    for i in range(start, len(nums)):
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()
backtrack(0, [])`,
    typicalComplexity: "Time: O(2ⁿ) or O(n!) | Space: O(n)",
    position: { x: 0, y: 3 },
  },
  "graphs": {
    slug: "graphs",
    title: "Graphs",
    shortTitle: "Graphs",
    prerequisites: ["trees"],
    fundamentals: ["recursion", "deques-and-heaps"],
    tagline: "Arbitrary networks: BFS shortest paths and DFS connectivity.",
    mentalModel: "A subway system or island archipelago: nodes are stations and edges are train tracks or bridges between them.",
    recognitionSignals: [
      "Counting islands in 2D grids with flood-fill",
      "Finding topological order or prerequisite cycles",
      "Shortest path in unweighted graphs using BFS",
    ],
    template: `visited = set()
def dfs(r, c):
    if (r, c) in visited or not (0 <= r < ROWS and 0 <= c < COLS) or grid[r][c] != "1":
        return
    visited.add((r, c))
    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        dfs(r + dr, c + dc)`,
    typicalComplexity: "Time: O(V + E) | Space: O(V)",
    position: { x: 1, y: 3 },
  },
  "advanced-graphs": {
    slug: "advanced-graphs",
    title: "Advanced Graphs",
    shortTitle: "Adv Graphs",
    prerequisites: ["graphs", "heap-priority-queue"],
    fundamentals: ["deques-and-heaps"],
    tagline: "Weighted graphs: Dijkstra, Prim's MST, and Bellman-Ford.",
    mentalModel: "A GPS navigation app computing toll fees and flight routes with stopover limits.",
    recognitionSignals: [
      "Shortest path with positive edge weights (Dijkstra's)",
      "Connecting all points with minimal total wire/distance (MST)",
      "Cheapest path with at most K transfer stops",
    ],
    template: `pq = [(0, start)]  # (cost, node)
best = {start: 0}
while pq:
    d, u = heapq.heappop(pq)
    if d > best.get(u, float('inf')):
        continue
    for v, w in adj[u]:
        if d + w < best.get(v, float('inf')):
            best[v] = d + w
            heapq.heappush(pq, (d + w, v))`,
    typicalComplexity: "Time: O(E log V) | Space: O(V + E)",
    position: { x: 2, y: 3 },
  },
  "1-d-dp": {
    slug: "1-d-dp",
    title: "1-D Dynamic Programming",
    shortTitle: "1-D DP",
    prerequisites: ["backtracking"],
    fundamentals: ["recursion", "big-o"],
    tagline: "Break recursive problems into cached subproblems.",
    mentalModel: "Climbing stairs or saving money: today's best result is built directly from yesterday's known best results.",
    recognitionSignals: [
      "Maximum or minimum cost over sequential decisions",
      "Counting distinct ways to reach a target value",
      "Can partition or segment sequences based on past choices",
    ],
    template: `dp = [0] * (n + 1)
dp[0] = base_case
for i in range(1, n + 1):
    dp[i] = transition(dp[i - 1], dp[i - 2])
return dp[n]`,
    typicalComplexity: "Time: O(n) | Space: O(n) or O(1)",
    position: { x: 0, y: 4 },
  },
  "2-d-dp": {
    slug: "2-d-dp",
    title: "2-D Dynamic Programming",
    shortTitle: "2-D DP",
    prerequisites: ["1-d-dp"],
    fundamentals: ["lists-and-slicing", "recursion"],
    tagline: "Matrix grid paths, string pairings, and interval games.",
    mentalModel: "A chessboard or spreadsheet: each cell's answer combines the cell above it and the cell to its left.",
    recognitionSignals: [
      "Unique paths in a grid with obstacles",
      "Longest Common Subsequence or Edit Distance between two strings",
      "Knapsack with weight and value or interval game theory",
    ],
    template: `dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if s1[i-1] == s2[j-1]:
            dp[i][j] = 1 + dp[i-1][j-1]
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])`,
    typicalComplexity: "Time: O(m * n) | Space: O(m * n)",
    position: { x: 1, y: 4 },
  },
  "greedy": {
    slug: "greedy",
    title: "Greedy",
    shortTitle: "Greedy",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["lists-and-slicing"],
    tagline: "Make the locally optimal choice at each step to reach global optimum.",
    mentalModel: "A cashier making change: giving the largest possible coin at every step gives the fewest total coins.",
    recognitionSignals: [
      "Interval scheduling (pick earliest finishing meeting)",
      "Jump Game / reachability questions without backtracking",
      "Maximizing profit or minimizing cost with single choices",
    ],
    template: `curr_max = nums[0]
total_max = nums[0]
for n in nums[1:]:
    curr_max = max(n, curr_max + n)
    total_max = max(total_max, curr_max)`,
    typicalComplexity: "Time: O(n) | Space: O(1)",
    position: { x: 2, y: 4 },
  },
  "intervals": {
    slug: "intervals",
    title: "Intervals",
    shortTitle: "Intervals",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["lists-and-slicing", "python-idioms"],
    tagline: "Sort time ranges and merge, insert, or check overlaps.",
    mentalModel: "Calendar scheduling: sort meetings by start time, and if meeting B starts before meeting A ends, they conflict.",
    recognitionSignals: [
      "Merge overlapping appointments or intervals",
      "Insert new event into non-overlapping calendar",
      "Find minimum conference rooms required",
    ],
    template: `intervals.sort(key=lambda x: x[0])
merged = [intervals[0]]
for start, end in intervals[1:]:
    if start <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], end)
    else:
        merged.append([start, end])`,
    typicalComplexity: "Time: O(n log n) | Space: O(n)",
    position: { x: 0, y: 5 },
  },
  "math-and-geometry": {
    slug: "math-and-geometry",
    title: "Math & Geometry",
    shortTitle: "Math",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["python-basics"],
    tagline: "Matrix algebra, digital cycles, and coordinate geometry.",
    mentalModel: "Peeling an onion layer by layer (spiral matrix) or rotating a square sheet of paper 90 degrees.",
    recognitionSignals: [
      "Spiral order traversal or 90-degree matrix rotation",
      "Detecting cycles in numeric transformations (Happy Number)",
      "Arbitrary precision arithmetic and coordinate point counting",
    ],
    template: `top, bottom = 0, len(matrix) - 1
left, right = 0, len(matrix[0]) - 1
while left <= right and top <= bottom:
    # Traverse right, down, left, up`,
    typicalComplexity: "Time: O(m * n) | Space: O(1)",
    position: { x: 1, y: 5 },
  },
  "bit-manipulation": {
    slug: "bit-manipulation",
    title: "Bit Manipulation",
    shortTitle: "Bit Manipulation",
    prerequisites: ["arrays-and-hashing"],
    fundamentals: ["python-basics"],
    tagline: "Binary operators: XOR cancellation, bit masks, and shifts.",
    mentalModel: "Light switches: toggling the same switch twice returns it to its original state (XOR cancellation).",
    recognitionSignals: [
      "Find the single number when all others appear twice (`a ^ a == 0`)",
      "Counting 1-bits (`n & (n - 1)`) or bitwise addition",
      "Bit masks representing visited states or set subsets",
    ],
    template: `res = 0
for num in nums:
    res ^= num
return res`,
    typicalComplexity: "Time: O(n) | Space: O(1)",
    position: { x: 2, y: 5 },
  },
};

export const CATEGORIES_LIST: CategoryInfo[] = Object.values(CATEGORY_INFO);
