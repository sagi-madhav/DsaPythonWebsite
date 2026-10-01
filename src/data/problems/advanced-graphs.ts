import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ reconstruct-itinerary
  {
    id: "reconstruct-itinerary",
    summary:
      "You find a pile of plane tickets, each written as `[from, to]`. They all belong to one traveller whose trip started at `\"JFK\"`. Rebuild the trip: return the airports in the order they were visited, using **every ticket exactly once**. If several trips are possible, return the one that is alphabetically smallest when you compare the airport lists stop by stop (like sorting words in a dictionary). At least one valid trip always exists.",
    constraints: [
      "1 ≤ len(tickets) ≤ 300",
      "Airport codes are 3 uppercase letters",
      "A ticket never goes from an airport to itself",
      "At least one trip uses every ticket exactly once",
    ],
    pattern: "Eulerian path with Hierholzer's algorithm (a stack)",
    timeComplexity: {
      bruteForce: "O(2^E) worst case",
      optimal: "O(E log E)",
      explanation:
        "E is the number of tickets. The backtracking version tries tickets in alphabetical order and undoes choices that lead to a dead end; in a nasty case it can try a huge (exponential) number of partial trips. The stack version sorts the tickets once (O(E log E)), then every ticket is pushed onto the stack once and every airport is moved into the route once, which is O(E). Sorting dominates.",
    },
    spaceComplexity: {
      optimal: "O(E)",
      explanation:
        "The graph stores every ticket once, and the stack and the route each hold at most E + 1 airports.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "graph = defaultdict(list)",
        plainEnglishExplanation:
          "`defaultdict` comes from Python's `collections` module (so we write `from collections import defaultdict` at the top). It's a dictionary that never complains about a missing key: the first time you look up a key it hasn't seen, it quietly creates a value for it by calling `list()`, which makes an empty list `[]`.",
        exampleSnippet:
          "from collections import defaultdict\n\nflights = defaultdict(list)\nflights['JFK'].append('LHR')\nflights['JFK'].append('SFO')\nprint(flights['JFK'])\nprint(flights['NOWHERE'])  # missing key: an empty list, no error",
        whyWeUseItHere:
          "Each airport maps to the list of places we still hold tickets to. Airports that only ever appear as a destination automatically get an empty list, which means 'no way out from here'.",
      },
      {
        keywordOrMethod: "for src, dst in sorted(tickets, reverse=True):",
        plainEnglishExplanation:
          "`sorted(...)` returns a new, sorted copy of a list. `reverse=True` sorts from largest to smallest (for text: Z to A). Lists of strings are compared item by item, so `['JFK', 'SFO']` comes after `['JFK', 'ATL']`. Each ticket is a two-item list, and `src, dst` *unpacks* it: the first item goes into `src`, the second into `dst`.",
        exampleSnippet:
          "tickets = [['JFK', 'ATL'], ['ATL', 'SFO'], ['JFK', 'SFO']]\nfor src, dst in sorted(tickets, reverse=True):\n    print(src, '->', dst)",
        whyWeUseItHere:
          "We append destinations Z to A, so the alphabetically *smallest* destination ends up at the END of each list, where `.pop()` can grab it instantly.",
      },
      {
        keywordOrMethod: "graph[airport].pop()",
        plainEnglishExplanation:
          "`.pop()` with no argument removes the LAST item of a list and gives it back to you. It's very fast because nothing else in the list has to move.",
        exampleSnippet:
          "destinations = ['SFO', 'LHR', 'ATL']\nnext_stop = destinations.pop()\nprint(next_stop)\nprint(destinations)",
        whyWeUseItHere:
          "Popping a destination both chooses where we fly next (the smallest one) and 'uses up' that ticket so it can't be used twice.",
      },
      {
        keywordOrMethod: "airport = stack[-1]",
        plainEnglishExplanation:
          "Negative indexes count from the end: `stack[-1]` is the last item, `stack[-2]` the one before it. Reading it does NOT remove it. A list used like a pile of plates, where you only touch the top, is called a *stack*.",
        exampleSnippet:
          "stack = ['JFK', 'NRT', 'JFK']\nprint(stack[-1])\nprint(len(stack))  # still 3: we only peeked",
        whyWeUseItHere:
          "The top of the stack is the airport we're currently standing in. We peek at it to decide: fly onward, or declare it a final stop.",
      },
      {
        keywordOrMethod: "while stack:",
        plainEnglishExplanation:
          "In a condition, an empty list counts as `False` and a non-empty list counts as `True`. So `while stack:` means 'keep looping as long as the stack still has something in it'. The same trick works with `if graph[airport]:` ('if this list isn't empty').",
        exampleSnippet:
          "stack = ['a', 'b']\nwhile stack:\n    print('popped', stack.pop())\nprint('empty now:', stack)",
        whyWeUseItHere:
          "We're done exactly when every airport has been moved off the stack into the route.",
      },
      {
        keywordOrMethod: "route.reverse()",
        plainEnglishExplanation:
          "`.reverse()` flips a list in place: the first item becomes the last. It changes the list itself and returns `None`, so write `route.reverse()` on its own line, not `route = route.reverse()`.",
        exampleSnippet: "route = ['KUL', 'JFK', 'NRT', 'JFK']\nroute.reverse()\nprint(route)",
        whyWeUseItHere:
          "The algorithm discovers the stops from the end of the trip backward, so we flip the list once at the end.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: { tickets: [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]] },
      focus: ["stack", "route", "graph", "airport"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture each ticket as a one-way road you must drive exactly once, like tracing a drawing without lifting your pen. The obvious plan is greedy: from wherever you are, always take the alphabetically smallest ticket left. That's *almost* right, but it can drive you into a dead end early (an airport with no tickets out) while other tickets are still unused. The fix (Hierholzer's algorithm) is a clever change of viewpoint: keep flying greedily, remembering your path on a stack. When you get stuck at an airport, that airport MUST be the last stop of everything that's left, so move it to the answer and step back one airport to try other tickets from there. Because stops are discovered last-to-first, you reverse the answer at the end.",
      edgeCases: [
        "A dead end that comes too early: with tickets JFK→KUL, JFK→NRT, NRT→JFK, greedy flies to KUL first and gets stuck. The stack trick makes KUL the last stop: JFK, NRT, JFK, KUL.",
        "Duplicate tickets (the same `[from, to]` twice) are two separate items in the list, so both get used.",
        "An airport you only ever fly INTO gets an empty list from `defaultdict`, so the moment you land there it's 'stuck' and goes straight into the route.",
      ],
      stepByStepWalkthrough: [
        "Sort the tickets from Z to A and build `graph`, so each airport's list ends with its alphabetically smallest destination.",
        "Start with `stack = [\"JFK\"]` (where the trip begins) and an empty `route`.",
        "Peek at the top of the stack. If that airport still has tickets, pop the smallest destination off its list and push it onto the stack: you just flew there.",
        "If the airport has no tickets left, you're stuck: it must be the last stop of what remains, so pop it off the stack and append it to `route`.",
        "Repeat until the stack is empty. By then every ticket has been used and every stop is in `route`.",
        "`route` lists the stops from last to first, so reverse it and return it.",
      ],
    },
    hints: {
      conceptual:
        "You must use every ticket exactly once. Always taking the alphabetically smallest ticket is right most of the time; the danger is getting stuck early. What if, whenever you get stuck at an airport, you decide it must be the very LAST stop and build the answer from the back?",
      structural:
        "Build `graph = defaultdict(list)` from `sorted(tickets, reverse=True)` so `graph[a].pop()` returns the smallest destination. Use `stack = [\"JFK\"]` and `while stack:`. If `graph[stack[-1]]` is non-empty, push the popped destination; otherwise move `stack.pop()` into `route`. Reverse `route` at the end.",
    },
    commonMistakes: [
      "Pure greedy without handling dead ends: always flying to the smallest destination fails the JFK/KUL/NRT case, because KUL strands you with unused tickets.",
      "Sorting A to Z and then using `.pop()`: that grabs the LARGEST destination. Either sort with `reverse=True`, or (more slowly) use `pop(0)`.",
      "Forgetting to reverse `route` at the end, which returns the trip backwards.",
      "Storing destinations in a `set`: two identical tickets collapse into one, so a ticket never gets used.",
    ],
    starterCode: `from collections import defaultdict


def find_itinerary(tickets: list[list[str]]) -> list[str]:
    # Map each airport to the places you still hold tickets to.
    # Tip: when you get stuck at an airport, it must be the LAST stop of what's left.
    pass
`,
    optimalSolution: `from collections import defaultdict


def find_itinerary(tickets: list[list[str]]) -> list[str]:
    # graph maps an airport to the destinations we still hold tickets for
    graph = defaultdict(list)

    # Sort Z to A so each list ENDS with its alphabetically smallest destination
    for src, dst in sorted(tickets, reverse=True):
        graph[src].append(dst)

    # The stack is the path we're flying right now; every trip starts at JFK
    stack = ["JFK"]
    # route collects the stops from the END of the trip backward
    route = []

    while stack:
        # Peek at the airport we're standing in (the top of the stack)
        airport = stack[-1]

        if graph[airport]:
            # A ticket is left: fly to the smallest destination (pop uses the ticket up)
            next_airport = graph[airport].pop()
            stack.append(next_airport)
        else:
            # Stuck here, so this airport is the last stop of what's left
            route.append(stack.pop())

    # We found the stops last-to-first, so flip the list around
    route.reverse()
    return route
`,
    bruteForceSolution: `def find_itinerary(tickets: list[list[str]]) -> list[str]:
    # Backtracking: try tickets in alphabetical order, undo any choice that dead-ends
    graph = {}
    for src, dst in sorted(tickets):
        graph.setdefault(src, []).append(dst)

    route = ["JFK"]

    def dfs(airport):
        # Used every ticket? Then this is the answer
        if len(route) == len(tickets) + 1:
            return True
        options = graph.get(airport, [])
        for i in range(len(options)):
            next_airport = options.pop(i)
            route.append(next_airport)
            if dfs(next_airport):
                return True
            # Dead end: put the ticket back and try the next one
            route.pop()
            options.insert(i, next_airport)
        return False

    dfs("JFK")
    return route
`,
    harness: { kind: "function", entry: "find_itinerary" },
    testCases: [
      {
        input: { tickets: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]] },
        expected: ["JFK", "MUC", "LHR", "SFO", "SJC"],
        description: "There's only one way to chain these tickets: JFK → MUC → LHR → SFO → SJC.",
      },
      {
        input: { tickets: [["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]] },
        expected: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
        description:
          "Several trips use every ticket. This one wins because at the first choice ATL comes before SFO alphabetically.",
      },
      {
        input: { tickets: [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]] },
        expected: ["JFK", "NRT", "JFK", "KUL"],
        description:
          "KUL is alphabetically first, but flying there first strands you with unused tickets. So KUL has to be the final stop.",
      },
      { input: { tickets: [["JFK", "AAA"]] }, expected: ["JFK", "AAA"] },
      {
        input: { tickets: [["JFK", "ATL"], ["ATL", "JFK"], ["JFK", "ATL"], ["ATL", "JFK"]] },
        expected: ["JFK", "ATL", "JFK", "ATL", "JFK"],
        description: "Duplicate tickets: each copy must be used.",
      },
      {
        input: {
          tickets: [["JFK", "AAA"], ["AAA", "JFK"], ["JFK", "BBB"], ["JFK", "CCC"], ["CCC", "JFK"]],
        },
        expected: ["JFK", "AAA", "JFK", "CCC", "JFK", "BBB"],
        description: "BBB is a dead end, so even though it comes before CCC it must be saved for last.",
      },
      {
        input: { tickets: [["JFK", "LHR"], ["LHR", "JFK"], ["JFK", "LHR"]] },
        expected: ["JFK", "LHR", "JFK", "LHR"],
      },
      {
        input: {
          tickets: [
            ["EZE", "AXA"], ["TIA", "ANU"], ["ANU", "JFK"], ["JFK", "ANU"], ["ANU", "EZE"],
            ["TIA", "ANU"], ["AXA", "TIA"], ["TIA", "JFK"], ["ANU", "TIA"], ["JFK", "TIA"],
          ],
        },
        expected: ["JFK", "ANU", "EZE", "AXA", "TIA", "ANU", "JFK", "TIA", "ANU", "TIA", "JFK"],
      },
    ],
  },

  // ------------------------------------------------------------------ min-cost-to-connect-all-points
  {
    id: "min-cost-to-connect-all-points",
    summary:
      "You're given a list of points on a grid, each written `[x, y]`. Joining two points with a wire costs their **Manhattan distance**, `|x1 - x2| + |y1 - y2|` (the distance you'd walk along city blocks, never cutting diagonally). Return the **smallest total cost** of wires that connects every point to every other point, either directly or by passing through other points.",
    constraints: [
      "1 ≤ len(points) ≤ 1000",
      "-1,000,000 ≤ x, y ≤ 1,000,000",
      "All points are different",
    ],
    pattern: "Minimum spanning tree with Prim's algorithm (min-heap)",
    timeComplexity: {
      bruteForce: "O(n³)",
      optimal: "O(n² log n)",
      explanation:
        "The brute-force version connects one new point per round, and each round rescans every (connected, unconnected) pair to find the cheapest wire: n rounds × n² pairs = O(n³). Prim's with a heap pushes up to n candidate wires each time a point joins, so about n² pushes and pops in total. Each heap operation costs O(log(n²)) = O(log n), giving O(n² log n).",
    },
    spaceComplexity: {
      optimal: "O(n²)",
      explanation:
        "Old, out-of-date wires stay in the heap until they're popped and skipped, so in the worst case the heap holds about n² entries. The `in_tree` set holds at most n points.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "import heapq / heapq.heappush(min_heap, item)",
        plainEnglishExplanation:
          "`heapq` is Python's built-in *min-heap* toolkit. A heap is an ordinary list that `heapq` keeps in a special arrangement so the SMALLEST item is always at index 0. `heapq.heappush(heap, item)` adds an item and quietly rearranges a few elements to keep that promise. It costs O(log n), far cheaper than re-sorting the whole list.",
        exampleSnippet:
          "import heapq\n\nmin_heap = []\nheapq.heappush(min_heap, 7)\nheapq.heappush(min_heap, 2)\nheapq.heappush(min_heap, 5)\nprint(min_heap[0])  # the smallest is always at the front\nprint(min_heap)",
        whyWeUseItHere:
          "The heap is our pile of 'wire quotes'. Every time a point joins the network, we push a quote for wiring it to each unconnected point.",
      },
      {
        keywordOrMethod: "cost, i = heapq.heappop(min_heap)",
        plainEnglishExplanation:
          "`heapq.heappop(heap)` removes the smallest item and returns it, again in O(log n). Our items are pairs like `(4, 1)`, and `cost, i = ...` unpacks the pair into two variables at once: `cost` gets 4 and `i` gets 1.",
        exampleSnippet:
          "import heapq\n\nmin_heap = [(9, 2), (4, 1), (6, 3)]\nheapq.heapify(min_heap)  # arrange an existing list into a heap\ncost, i = heapq.heappop(min_heap)\nprint(cost, i)\nprint(min_heap[0])",
        whyWeUseItHere:
          "Each pop hands us the cheapest wire we know about that might reach a new point.",
      },
      {
        keywordOrMethod: "(cost, index) tuples in a heap",
        plainEnglishExplanation:
          "A *tuple* is a fixed little bundle of values written with round brackets, like `(4, 1)`. Python compares tuples item by item: first items first, and only if those tie does it look at the second items. So `(3, 9) < (5, 0)` because 3 < 5, and `(3, 1) < (3, 2)` because the first items tie and 1 < 2.",
        exampleSnippet: "print((3, 9) < (5, 0))\nprint((3, 1) < (3, 2))\nprint(sorted([(5, 0), (3, 9), (3, 1)]))",
        whyWeUseItHere:
          "Putting the cost FIRST in each tuple makes the heap order wires by cost, which is exactly what Prim's algorithm needs.",
      },
      {
        keywordOrMethod: "in_tree = set() / in_tree.add(i) / i in in_tree",
        plainEnglishExplanation:
          "A *set* is a bag of unique items with no order. `.add(x)` puts `x` in, and `x in my_set` answers True or False almost instantly, no matter how big the set is.",
        exampleSnippet: "connected = set()\nconnected.add(0)\nconnected.add(3)\nprint(3 in connected)\nprint(1 in connected)\nprint(len(connected))",
        whyWeUseItHere:
          "`in_tree` remembers which points are already wired into the network, so we never pay to connect a point twice.",
      },
      {
        keywordOrMethod: "x1, y1 = points[i] and abs(x1 - x2)",
        plainEnglishExplanation:
          "`points[i]` is a two-item list like `[2, 2]`; `x1, y1 = points[i]` unpacks it into two variables. `abs(n)` gives the *absolute value*: the distance from zero, always non-negative (`abs(-3)` is 3).",
        exampleSnippet: "x1, y1 = [0, 0]\nx2, y2 = [2, -3]\nprint(abs(x1 - x2) + abs(y1 - y2))",
        whyWeUseItHere:
          "This is the Manhattan distance between two points: how far apart they are along x, plus how far apart along y.",
      },
      {
        keywordOrMethod: "continue",
        plainEnglishExplanation:
          "Inside a loop, `continue` skips the rest of the current pass and jumps straight to the next one. Nothing below it runs this time around.",
        exampleSnippet: "for n in [1, 2, 3, 4]:\n    if n % 2 == 0:\n        continue\n    print(n)",
        whyWeUseItHere:
          "When we pop a wire to a point that's already connected, that wire is useless (it would make a loop), so we skip it.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      input: { points: [[0, 0], [2, 2], [3, 10], [5, 2]] },
      heaps: ["min_heap"],
      focus: ["min_heap", "in_tree", "total", "cost", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you're laying cable between houses and you want the cheapest network that reaches everyone. Start at any house. Then repeat one simple move: of all the cables that would reach a house NOT yet connected, lay the cheapest one. This is Prim's algorithm, and it always builds a cheapest network (called a *minimum spanning tree*: every point connected, exactly n − 1 wires, no loops). Why is greedy safe? The cheapest cable that crosses from 'connected' to 'not connected' can always be part of some best network: if a plan skipped it, you could swap it in for a pricier crossing cable and never pay more. The min-heap is your pile of cable quotes that always hands you the cheapest one first.",
      edgeCases: [
        "A single point needs no wires, so the answer is 0. The loop pops the starting `(0, 0)` and immediately finishes.",
        "The same point can sit in the heap several times with different costs. Only the first (cheapest) pop counts; later pops are skipped because the point is already in `in_tree`.",
        "Negative and very large coordinates are fine: `abs` handles negatives and Python integers never overflow.",
      ],
      stepByStepWalkthrough: [
        "Put `(0, 0)` in the heap: 'reaching point 0 costs nothing'. We have to start somewhere, and any point works.",
        "Pop the cheapest `(cost, i)`. If point `i` is already connected, this quote is out of date: skip it.",
        "Otherwise connect point `i`: add it to `in_tree` and add `cost` to `total`.",
        "For every point `j` that isn't connected yet, push `(distance from i to j, j)` as a new quote.",
        "Repeat until `in_tree` holds all n points, then return `total`.",
        "Example: for (0,0), (2,2), (3,10), (5,2), (7,0) the wires chosen cost 4, 3, 4 and 9, for a total of 20.",
      ],
    },
    hints: {
      conceptual:
        "You need wires that link everything with no loops, for the lowest total. Start from one point and keep adding the cheapest wire that reaches a NEW point. What data structure always gives you the cheapest option instantly?",
      structural:
        "Prim's algorithm: a `set` of connected points and a heap list of `(cost, index)` tuples managed with `heapq.heappush` / `heapq.heappop`. Loop `while len(in_tree) < n:`, skip popped points already in the set, and push distances to all unconnected points after each new connection.",
    },
    commonMistakes: [
      "Not skipping a popped point that's already connected: you pay for that point twice.",
      "Pushing `(index, cost)` instead of `(cost, index)`: the heap orders by the FIRST item, so you'd pop the lowest index instead of the cheapest wire.",
      "Using straight-line distance (with a square root) instead of the Manhattan distance the problem asks for.",
      "Taking the globally cheapest wires without checking for loops. That idea (Kruskal's algorithm) only works if you also detect wires that join two already-connected points.",
    ],
    starterCode: `import heapq


def min_cost_connect_points(points: list[list[int]]) -> int:
    # Grow a network from point 0: always add the cheapest wire to a NEW point.
    # Tip: a heap of (cost, point_index) gives you the cheapest wire quickly.
    pass
`,
    optimalSolution: `import heapq


def min_cost_connect_points(points: list[list[int]]) -> int:
    n = len(points)
    # Points already wired into our growing network
    in_tree = set()
    # Wire quotes as (cost, point index). Point 0 starts us off for free
    min_heap = [(0, 0)]
    total = 0

    # Keep going until every point is connected
    while len(in_tree) < n:
        # Take the cheapest quote we have
        cost, i = heapq.heappop(min_heap)
        # Point i is already connected: this wire would make a loop, so skip it
        if i in in_tree:
            continue

        # Connect point i and pay for its wire
        in_tree.add(i)
        total += cost

        # Quote a wire from point i to every point that isn't connected yet
        x1, y1 = points[i]
        for j in range(n):
            if j not in in_tree:
                x2, y2 = points[j]
                # Manhattan distance: the gap along x plus the gap along y
                dist = abs(x1 - x2) + abs(y1 - y2)
                heapq.heappush(min_heap, (dist, j))

    return total
`,
    bruteForceSolution: `def min_cost_connect_points(points: list[list[int]]) -> int:
    # Prim's idea without a heap: each round, scan EVERY possible wire
    n = len(points)
    in_tree = [False] * n
    in_tree[0] = True
    total = 0
    for _ in range(n - 1):
        best_cost = None
        best_point = -1
        for i in range(n):
            if not in_tree[i]:
                continue
            for j in range(n):
                if in_tree[j]:
                    continue
                dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
                if best_cost is None or dist < best_cost:
                    best_cost = dist
                    best_point = j
        in_tree[best_point] = True
        total += best_cost
    return total
`,
    harness: { kind: "function", entry: "min_cost_connect_points" },
    testCases: [
      {
        input: { points: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]] },
        expected: 20,
        description:
          "Wire (0,0)-(2,2) for 4, (2,2)-(5,2) for 3, (5,2)-(7,0) for 4 and (2,2)-(3,10) for 9. Total 4 + 3 + 4 + 9 = 20.",
      },
      {
        input: { points: [[3, 12], [-2, 5], [-4, 1]] },
        expected: 18,
        description: "(3,12)-(-2,5) costs 5 + 7 = 12 and (-2,5)-(-4,1) costs 2 + 4 = 6. Total 18.",
      },
      { input: { points: [[0, 0]] }, expected: 0, description: "One point: nothing to connect." },
      { input: { points: [[0, 0], [1, 1]] }, expected: 2 },
      { input: { points: [[-1000000, -1000000], [1000000, 1000000]] }, expected: 4000000 },
      {
        input: { points: [[0, 0], [0, 1], [1, 0], [1, 1]] },
        expected: 3,
        description: "The four corners of a unit square: three wires of length 1.",
      },
      { input: { points: [[2, -3], [-17, -8], [13, 8], [-17, -15]] }, expected: 53 },
      {
        input: { points: Array.from({ length: 40 }, (_, i) => [i * 2, 0]) },
        expected: 78,
        description: "40 points in a row, 2 apart: 39 wires of length 2.",
      },
    ],
  },

  // ------------------------------------------------------------------ network-delay-time
  {
    id: "network-delay-time",
    summary:
      "A network has `n` computers labelled `1` to `n`. Each entry `[u, v, w]` in `times` is a one-way cable: a signal sent from computer `u` arrives at computer `v` after `w` units of time. You send a signal from computer `k`. Return how long it takes until **every** computer has received it, or `-1` if some computer can never be reached.",
    constraints: [
      "1 ≤ k ≤ n ≤ 100",
      "1 ≤ len(times) ≤ 6000",
      "0 ≤ w ≤ 100 (travel times are never negative)",
      "No two cables share the same (u, v) pair",
    ],
    pattern: "Dijkstra's shortest paths with a min-heap",
    timeComplexity: {
      bruteForce: "O(n · E)",
      optimal: "O(E log E)",
      explanation:
        "E is the number of cables. The brute force (Bellman-Ford) re-checks every cable n − 1 times, improving arrival times a little each round: O(n · E). Dijkstra pushes at most one heap entry per cable, and each push or pop costs O(log E), so O(E log E) in total.",
    },
    spaceComplexity: {
      optimal: "O(n + E)",
      explanation: "The graph stores every cable once, the heap holds at most E entries, and `arrival` holds at most n computers.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "graph = defaultdict(list) and graph[u].append((v, w))",
        plainEnglishExplanation:
          "`defaultdict(list)` (from `collections`) is a dictionary that automatically creates an empty list the first time you use a new key. `(v, w)` with round brackets is a *tuple*: a small fixed bundle of values, here 'neighbor v, travel time w'.",
        exampleSnippet:
          "from collections import defaultdict\n\ngraph = defaultdict(list)\ngraph[1].append((2, 5))\ngraph[1].append((3, 1))\nprint(graph[1])\nprint(graph[9])  # never added: just an empty list",
        whyWeUseItHere:
          "`graph[u]` lists every cable leaving computer `u`. Computers with no outgoing cables simply give back an empty list.",
      },
      {
        keywordOrMethod: "for u, v, w in times:",
        plainEnglishExplanation:
          "Each item of `times` is a three-item list like `[2, 1, 1]`. Writing three names after `for` *unpacks* each item: `u` gets the first value, `v` the second, `w` the third.",
        exampleSnippet: "times = [[2, 1, 1], [2, 3, 4]]\nfor u, v, w in times:\n    print('from', u, 'to', v, 'takes', w)",
        whyWeUseItHere: "It turns each cable into readable names while we build the graph.",
      },
      {
        keywordOrMethod: "heapq.heappush / heapq.heappop",
        plainEnglishExplanation:
          "`heapq` (import it with `import heapq`) keeps a normal list arranged as a *min-heap*: the smallest item is always at index 0. `heappush(heap, item)` adds an item and `heappop(heap)` removes and returns the smallest one. Both take only O(log n) time.",
        exampleSnippet:
          "import heapq\n\nevents = []\nheapq.heappush(events, 7)\nheapq.heappush(events, 3)\nheapq.heappush(events, 5)\nprint(heapq.heappop(events))\nprint(heapq.heappop(events))",
        whyWeUseItHere:
          "The heap is a waiting room of 'signal arrives at computer X at time T' events. We always handle the earliest event next.",
      },
      {
        keywordOrMethod: "(time, node) tuples are compared item by item",
        plainEnglishExplanation:
          "Python compares tuples by their first items; only if those are equal does it look at the second items. So `(1, 9)` is smaller than `(2, 0)`.",
        exampleSnippet: "import heapq\n\nheap = []\nheapq.heappush(heap, (10, 2))\nheapq.heappush(heap, (1, 3))\nheapq.heappush(heap, (3, 2))\nprint(heapq.heappop(heap))",
        whyWeUseItHere:
          "Putting the TIME first makes the heap hand us the earliest arrival, not the lowest computer number.",
      },
      {
        keywordOrMethod: "arrival = {} / if node in arrival: continue",
        plainEnglishExplanation:
          "`{}` creates an empty dictionary (key → value lookup table). `node in arrival` checks whether `node` is already a key. `continue` skips the rest of this loop pass and moves on to the next one.",
        exampleSnippet: "arrival = {}\narrival[2] = 0\narrival[3] = 1\nfor node in [2, 4]:\n    if node in arrival:\n        continue\n    print('first time seeing', node)",
        whyWeUseItHere:
          "`arrival` stores each computer's final, shortest arrival time. If a computer is already in it, a later copy of the signal is useless, so we skip it.",
      },
      {
        keywordOrMethod: "max(arrival.values())",
        plainEnglishExplanation:
          "`.values()` gives you all the values stored in a dictionary (ignoring the keys). `max(...)` returns the largest of them.",
        exampleSnippet: "arrival = {1: 0, 2: 3, 3: 1}\nprint(list(arrival.values()))\nprint(max(arrival.values()))",
        whyWeUseItHere: "The network is done when the LAST computer hears the signal, which is the largest arrival time.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      input: { times: [[1, 2, 10], [1, 3, 1], [3, 2, 2]], n: 3, k: 1 },
      heaps: ["min_heap"],
      focus: ["min_heap", "arrival", "time", "node"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of the signal as water flooding through pipes from computer `k`. Computers get wet in order of arrival time, and that's exactly what Dijkstra's algorithm simulates. Keep a waiting room (a min-heap) of events like 'the signal reaches computer 3 at time 1'. Always handle the EARLIEST event next. The first time a computer comes out of the waiting room, that time is final: every other signal still travelling is at the same time or later, and since cables never take negative time, none of them can arrive sooner. When a computer is reached, it sends the signal down each of its cables, which adds new events. The answer is the time the last computer hears the signal.",
      edgeCases: [
        "A computer nobody can reach means the answer is `-1`: check that `arrival` holds all `n` computers.",
        "A detour can beat a direct cable: with cables 1→2 (10), 1→3 (1) and 3→2 (2), computer 2 hears the signal at time 3, not 10.",
        "Cables with travel time 0 are allowed. Dijkstra still works because times never go down.",
        "Cables are one-way: a cable from 1 to 2 does NOT let a signal go from 2 to 1.",
      ],
      stepByStepWalkthrough: [
        "Build `graph`: for each cable `[u, v, w]`, add `(v, w)` to `graph[u]`.",
        "Start the waiting room with `(0, k)`: the signal is at computer `k` at time 0.",
        "Pop the earliest event `(time, node)`. If `node` is already in `arrival`, an earlier signal beat this one: skip it.",
        "Otherwise this is the shortest time to reach `node`, so record `arrival[node] = time`.",
        "For every cable `(neighbor, w)` leaving `node`, push `(time + w, neighbor)`: the signal will reach that neighbor at that time.",
        "When the heap is empty, return `-1` if fewer than `n` computers were reached, otherwise the largest arrival time.",
      ],
    },
    hints: {
      conceptual:
        "Each computer hears the signal at the earliest moment any route can deliver it, and the answer is the largest of those moments. Can you process computers in the order the signal reaches them, always handling the soonest arrival first?",
      structural:
        "Dijkstra's algorithm: a `defaultdict(list)` graph, a heap of `(time, node)` tuples managed with `heapq`, and a dict `arrival` for computers whose time is final. Skip popped nodes already in `arrival`. At the end, compare `len(arrival)` with `n`.",
    },
    commonMistakes: [
      "Adding up all the arrival times instead of taking the maximum. Signals travel in parallel, so the answer is the time the LAST computer is reached.",
      "Treating a computer as finished when you PUSH it instead of when you POP it. The first route you discover isn't always the fastest (see the detour example).",
      "Forgetting the computers are numbered from 1, then building a list of size `n` and going out of range on computer `n`.",
      "Forgetting to return `-1` when some computer is never reached.",
    ],
    starterCode: `import heapq
from collections import defaultdict


def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    # Find the earliest time the signal reaches each computer, starting from k.
    # Tip: a heap of (time, computer) lets you always handle the soonest arrival first.
    pass
`,
    optimalSolution: `import heapq
from collections import defaultdict


def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    # graph[u] = list of (neighbor, travel time) for every cable leaving u
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    # Final, shortest arrival time of every computer we've settled
    arrival = {}
    # Waiting room of (arrival time, computer). The signal starts at k at time 0
    min_heap = [(0, k)]

    while min_heap:
        # Handle the earliest arrival anywhere in the network
        time, node = heapq.heappop(min_heap)
        # Already reached earlier? This slower copy of the signal is useless
        if node in arrival:
            continue

        # First time node comes out of the heap, so this time is its shortest
        arrival[node] = time

        # Send the signal down every cable leaving node
        for neighbor, w in graph[node]:
            if neighbor not in arrival:
                heapq.heappush(min_heap, (time + w, neighbor))

    # Some computer never got the signal
    if len(arrival) < n:
        return -1
    # Everyone is done when the LAST computer hears it
    return max(arrival.values())
`,
    bruteForceSolution: `def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    # Bellman-Ford: relax every cable n - 1 times
    INF = float("inf")
    dist = [INF] * (n + 1)  # index 0 is unused: computers are 1..n
    dist[k] = 0
    for _ in range(n - 1):
        for u, v, w in times:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    worst = max(dist[1:])
    return -1 if worst == INF else worst
`,
    harness: { kind: "function", entry: "network_delay_time" },
    testCases: [
      {
        input: { times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 },
        expected: 2,
        description:
          "From computer 2, computers 1 and 3 hear the signal at time 1, and computer 4 hears it at time 2 (via 3). The last one is at time 2.",
      },
      {
        input: { times: [[1, 2, 1]], n: 2, k: 1 },
        expected: 1,
        description: "One cable taking one unit of time.",
      },
      {
        input: { times: [[1, 2, 1]], n: 2, k: 2 },
        expected: -1,
        description: "Cables are one-way: starting at computer 2, the signal can never reach computer 1.",
      },
      {
        input: { times: [[1, 2, 10], [1, 3, 1], [3, 2, 2]], n: 3, k: 1 },
        expected: 3,
        description: "The detour 1 → 3 → 2 takes 1 + 2 = 3, much faster than the direct cable of 10.",
      },
      { input: { times: [[1, 2, 1], [2, 3, 1]], n: 4, k: 1 }, expected: -1 },
      { input: { times: [[1, 2, 1], [2, 3, 2], [3, 1, 4]], n: 3, k: 2 }, expected: 6 },
      { input: { times: [[1, 2, 1], [2, 3, 7], [1, 3, 4], [2, 1, 2]], n: 3, k: 2 }, expected: 6 },
      {
        input: { times: [[1, 2, 0], [2, 3, 0]], n: 3, k: 1 },
        expected: 0,
        description: "Instant cables: everyone hears the signal at time 0.",
      },
      {
        input: { times: [[1, 2, 5], [1, 3, 5], [2, 4, 1], [3, 4, 1], [4, 5, 3]], n: 5, k: 1 },
        expected: 9,
      },
    ],
  },
  // ------------------------------------------------------------------ swim-in-rising-water
  {
    id: "swim-in-rising-water",
    summary:
      "You are given an `n x n` integer matrix `grid` where each cell `grid[i][j]` represents the elevation at that point. At time `t`, the water level everywhere is `t`, meaning you can swim between adjacent cells if and only if both cells have an elevation of at most `t`. You start at `(0, 0)` and want to reach `(n - 1, n - 1)`. Return the **least time `t`** until you can swim from the top-left to the bottom-right cell.",
    constraints: [
      "n == len(grid) == len(grid[i])",
      "1 ≤ n ≤ 50",
      "0 ≤ grid[i][j] < n^2",
      "Each value grid[i][j] is unique",
    ],
    pattern: "Modified Dijkstra: min-heap prioritizing minimum bottleneck elevation",
    timeComplexity: {
      bruteForce: "O(n^2 · log(max_elevation))",
      optimal: "O(n^2 · log n)",
      explanation:
        "Dijkstra's algorithm visits each of the n^2 cells once. Each cell pushes up to 4 neighbors into the min-heap. With at most n^2 elements in the heap, each heap operation takes O(log(n^2)) = O(log n), for a total runtime of O(n^2 log n).",
    },
    spaceComplexity: {
      optimal: "O(n^2)",
      explanation:
        "The `visited` set and the `min_heap` each store at most n^2 cell coordinates, using quadratic space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "import heapq / heapq.heappop / heapq.heappush",
        plainEnglishExplanation:
          "`heapq` maintains a min-heap where the element with the smallest first value is always at index 0 and popped first.",
        exampleSnippet:
          "import heapq\nh = [(5, 0, 0), (2, 0, 1)]\nheapq.heapify(h)\nprint(heapq.heappop(h))",
        whyWeUseItHere:
          "Always expands the cell reachable with the minimum water level seen so far.",
      },
      {
        keywordOrMethod: "max(t, grid[nr][nc])",
        plainEnglishExplanation:
          "Computes the maximum between two values.",
        exampleSnippet:
          "print(max(3, 7))\nprint(max(10, 4))",
        whyWeUseItHere:
          "The time to enter a neighbor cell is the maximum of the current time reached and the neighbor's elevation.",
      },
      {
        keywordOrMethod: "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:",
        plainEnglishExplanation:
          "Loops through the 4 coordinate offsets representing up, down, left, and right movements on a 2D grid.",
        exampleSnippet:
          "r, c = 2, 2\nfor dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n    print(r + dr, c + dc)",
        whyWeUseItHere:
          "Checks all 4 adjacent neighboring cells on each step.",
      },
      {
        keywordOrMethod: "visited = set() / visited.add((r, c)) / (r, c) in visited",
        plainEnglishExplanation:
          "A set storing cell coordinates `(r, c)`. Membership testing and insertion run in O(1) time.",
        exampleSnippet:
          "v = set()\nv.add((0, 0))\nprint((0, 0) in v)\nprint((1, 1) in v)",
        whyWeUseItHere:
          "Ensures we do not revisit previously explored cells.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: { grid: [[0, 2], [1, 3]] },
      gridPointers: { grid: [["r", "c"]] },
      focus: ["t", "r", "c", "min_heap"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine the grid as terrain slowly submerging under rising floodwater. As the water rises to height `t`, submerged valleys connect together. You want to walk from `(0, 0)` to `(n - 1, n - 1)` without ever stepping on land higher than the current water level. By using Dijkstra's algorithm, you always step into whichever adjacent cell has the lowest water requirement, exactly like water finding the path of least resistance through cracks in a mountain.",
      edgeCases: [
        "1x1 grid: the answer is simply the elevation of `grid[0][0]`.",
        "Start cell has a higher elevation than all surrounding cells: you must wait at `(0, 0)` until time equals `grid[0][0]`.",
        "Direct diagonal shortcut does not exist: only 4-directional moves are allowed.",
      ],
      stepByStepWalkthrough: [
        "Determine grid dimension `n = len(grid)`.",
        "Initialize `min_heap = [(grid[0][0], 0, 0)]` and `visited = {(0, 0)}`.",
        "While `min_heap` is not empty, pop `(t, r, c)` with the lowest required water level.",
        "If `(r, c) == (n - 1, n - 1)`, return `t`: because we always explore the lowest time path first, this is optimal.",
        "For each of the 4 orthogonal directions `(dr, dc)`, calculate neighbor `(nr, nc)`.",
        "If `(nr, nc)` is within grid bounds and not in `visited`, mark it visited and push `(max(t, grid[nr][nc]), nr, nc)` into `min_heap`.",
      ],
    },
    hints: {
      conceptual:
        "Think of this as finding a path from start to finish that minimizes the MAXIMUM edge weight encountered along the way. Which graph search algorithm finds paths by increasing cost?",
      structural:
        "Use Dijkstra's algorithm with a min-heap storing `(time, r, c)`. When stepping into neighbor `(nr, nc)`, the cost becomes `max(time, grid[nr][nc])`.",
    },
    commonMistakes: [
      "Summing the elevations along the path instead of taking the maximum elevation encountered.",
      "Forgetting that moving onto a cell with lower elevation still requires waiting for the current water level `t`.",
      "Allowing diagonal movement when only orthogonal moves (up, down, left, right) are permitted.",
    ],
    starterCode: `def swim_in_water(grid: list[list[int]]) -> int:
    # Return minimum time t to swim from (0, 0) to (n - 1, n - 1).
    # Tip: Dijkstra where path cost is the maximum elevation seen along the path.
    pass
`,
    optimalSolution: `import heapq


def swim_in_water(grid: list[list[int]]) -> int:
    n = len(grid)
    # Min-heap storing (time_needed, row, col)
    min_heap = [(grid[0][0], 0, 0)]
    # Track visited cells to avoid cycles
    visited = {(0, 0)}

    while min_heap:
        t, r, c = heapq.heappop(min_heap)

        # Reached the bottom-right destination
        if r == n - 1 and c == n - 1:
            return t

        # Explore orthogonal neighbors
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                visited.add((nr, nc))
                # Time to reach neighbor is bounded by current water level and neighbor's elevation
                heapq.heappush(min_heap, (max(t, grid[nr][nc]), nr, nc))

    return 0
`,
    bruteForceSolution: `from collections import deque


def swim_in_water(grid: list[list[int]]) -> int:
    # Binary search on time t with BFS reachability check: O(n^2 log(n))
    n = len(grid)
    l = grid[0][0]
    r = max(max(row) for row in grid)
    res = r

    def can_reach(t):
        if grid[0][0] > t:
            return False
        visited = {(0, 0)}
        q = deque([(0, 0)])
        while q:
            cr, cc = q.popleft()
            if cr == n - 1 and cc == n - 1:
                return True
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited and grid[nr][nc] <= t:
                    visited.add((nr, nc))
                    q.append((nr, nc))
        return False

    while l <= r:
        mid = (l + r) // 2
        if can_reach(mid):
            res = mid
            r = mid - 1
        else:
            l = mid + 1

    return res
`,
    harness: { kind: "function", entry: "swim_in_water" },
    testCases: [
      {
        input: { grid: [[0, 2], [1, 3]] },
        expected: 3,
        description:
          "At time 3, you can swim along path (0,0) -> (1,0) -> (1,1) whose elevations are 0, 1, 3.",
      },
      {
        input: {
          grid: [
            [0, 1, 2, 3, 4],
            [24, 23, 22, 21, 5],
            [12, 13, 14, 15, 16],
            [11, 17, 18, 19, 20],
            [10, 9, 8, 7, 6],
          ],
        },
        expected: 16,
        description:
          "The path follows the lower elevation route, never needing a water level above 16.",
      },
      {
        input: { grid: [[0]] },
        expected: 0,
        description: "A single cell grid requires 0 time.",
      },
      {
        input: { grid: [[3, 2], [0, 1]] },
        expected: 3,
        description:
          "Start cell is 3, so you must wait until time 3 before you can even begin.",
      },
      { input: { grid: [[0, 1], [2, 3]] }, expected: 3 },
      {
        input: {
          grid: [
            [0, 2, 5],
            [1, 8, 3],
            [4, 7, 6],
          ],
        },
        expected: 6,
      },
    ],
  },

  // ------------------------------------------------------------------ alien-dictionary
  {
    id: "alien-dictionary",
    summary:
      "There is a new alien language that uses the English alphabet, but the order of the letters is unknown. You are given a list of strings `words` from the alien language's dictionary, where the strings are sorted lexicographically according to the language's rules.\n\nDerive the order of characters in the alien language. Return a **string of unique characters** in the alien language sorted in lexicographically increasing order. If no valid ordering exists, return `\"\"`.",
    constraints: [
      "1 ≤ len(words) ≤ 100",
      "1 ≤ len(words[i]) ≤ 100",
      "words[i] consists of lowercase English letters",
    ],
    pattern: "Topological sort (Kahn's algorithm) on character dependency graph",
    timeComplexity: {
      bruteForce: "O(C) where C is total characters in words",
      optimal: "O(C + U + E) = O(C)",
      explanation:
        "Extracting edges by comparing adjacent words inspects each character at most once, taking O(C) time where C is the total number of characters in words. The graph has at most U ≤ 26 unique vertices and at most E ≤ 26^2 edges. Kahn's BFS visits each vertex and edge once, taking O(U + E) = O(1) time. Total time is linear in input size O(C).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The alphabet is bounded by 26 English letters, so the adjacency list and in-degree map take O(26 + 26^2) = O(1) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "adj = {c: set() for w in words for c in w}",
        plainEnglishExplanation:
          "Dictionary comprehension creating an entry with an empty set for every unique character that appears in `words`.",
        exampleSnippet:
          "words = ['ab', 'bc']\nadj = {c: set() for w in words for c in w}\nprint(sorted(list(adj.keys())))",
        whyWeUseItHere:
          "Initializes the graph so every letter present in the input is represented as a vertex.",
      },
      {
        keywordOrMethod: "for w1, w2 in zip(words, words[1:]):",
        plainEnglishExplanation:
          "`zip` pairs up adjacent words `(word 0, word 1)`, `(word 1, word 2)`, etc.",
        exampleSnippet:
          "words = ['a', 'b', 'c']\nfor w1, w2 in zip(words, words[1:]):\n    print(w1, '->', w2)",
        whyWeUseItHere:
          "Since words are sorted lexicographically, comparing adjacent word pairs reveals the ordering between letters.",
      },
      {
        keywordOrMethod: "from collections import deque / deque()",
        plainEnglishExplanation:
          "A queue where `.popleft()` removes the oldest element in O(1) time.",
        exampleSnippet:
          "from collections import deque\nq = deque(['a', 'b'])\nprint(q.popleft())",
        whyWeUseItHere:
          "Used in Kahn's algorithm to process characters with 0 incoming dependencies.",
      },
      {
        keywordOrMethod: "w1[:min_len] == w2[:min_len]",
        plainEnglishExplanation:
          "String slice comparison checking if the shorter word is an exact prefix of the longer word.",
        exampleSnippet:
          "w1, w2 = 'abcd', 'abc'\nprint(len(w1) > len(w2) and w1[:len(w2)] == w2)",
        whyWeUseItHere:
          "Detects invalid dictionary ordering: a longer word cannot precede its own prefix (e.g. 'abcd' cannot come before 'abc').",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { words: ["wrt", "wrf", "er", "ett", "rftt"] },
      focus: ["adj", "in_degree", "queue", "order"],
    },
    intuitiveExplanation: {
      intuition:
        "When looking at words in an ordinary dictionary, you know 'apple' comes before 'banana' because at the very first position where they differ, 'a' comes before 'b'. The remaining letters don't matter for that comparison. By comparing every pair of neighboring words in the alien dictionary and finding their first differing letter, you establish rules like: letter A must come before letter B (an arrow A -> B). Finding a valid character order that satisfies all these arrows is the classic Topological Sort problem.",
      edgeCases: [
        "Prefix mismatch: a longer word precedes its shorter prefix (e.g. `['apple', 'app']`). This is invalid in any lexicographical order, so return `\"\"`.",
        "Cycle in letter dependencies (e.g. `z -> x -> z`): no valid order exists, so return `\"\"`.",
        "Single word: all characters in that word can appear in any order.",
        "Multiple valid topological orders: `compare: 'alien-order'` accepts any valid topological ordering.",
      ],
      stepByStepWalkthrough: [
        "Initialize an adjacency list `adj` and an `in_degree` map for every unique character in all words.",
        "Iterate through adjacent word pairs `w1, w2`.",
        "If `len(w1) > len(w2)` and `w1` starts with `w2`, the ordering is invalid: return `\"\"`.",
        "Scan both words character by character until the first differing pair `(c1, c2)` is found.",
        "If `c2` is not already in `adj[c1]`, add `c2` to `adj[c1]` and increment `in_degree[c2]` by 1. Then break to the next pair.",
        "Enqueue all characters with `in_degree == 0` into a `queue`.",
        "While `queue` is not empty, pop character `c`, append to `order`, and decrement in-degrees of its neighbors. Enqueue neighbors whose in-degree drops to 0.",
        "If `len(order) < len(in_degree)`, a cycle exists: return `\"\"`. Otherwise, return `\"\".join(order)`.",
      ],
    },
    hints: {
      conceptual:
        "Compare each pair of adjacent words to find the first differing character. What kind of relationship does that establish between the two characters?",
      structural:
        "Build a directed graph of character precedence and compute in-degrees. Use Kahn's algorithm (BFS with a queue of 0 in-degree nodes). If the result doesn't contain all unique characters, there is a cycle.",
    },
    commonMistakes: [
      "Continuing to compare characters in two words after the first difference. Only the first differing character defines an ordering relationship.",
      "Failing to handle the prefix violation edge case where `w1` is strictly longer than `w2` but shares the same prefix.",
      "Not including characters that have no dependencies (0 in-degree and 0 out-degree) in the final answer.",
    ],
    starterCode: `def alien_order(words: list[str]) -> str:
    # Return valid ordering of alien letters as a string, or "" if invalid.
    # Tip: compare adjacent words at first differing char to build a directed graph.
    pass
`,
    optimalSolution: `from collections import deque


def alien_order(words: list[str]) -> str:
    # Initialize graph and in-degrees for all unique characters
    adj = {c: set() for w in words for c in w}
    in_degree = {c: 0 for c in adj}

    # Compare adjacent pairs of words to find character ordering rules
    for w1, w2 in zip(words, words[1:]):
        min_len = min(len(w1), len(w2))
        # Invalid prefix case: e.g. 'abcd' before 'abc'
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""

        # First differing character determines the ordering rule
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                if c2 not in adj[c1]:
                    adj[c1].add(c2)
                    in_degree[c2] += 1
                break

    # Kahn's algorithm: start with characters that have no dependencies
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    order = []

    while queue:
        c = queue.popleft()
        order.append(c)
        for neighbor in adj[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Cycle detected if we could not order all unique characters
    if len(order) < len(in_degree):
        return ""

    return "".join(order)
`,
    bruteForceSolution: `def alien_order(words: list[str]) -> str:
    # DFS topological sort with cycle detection
    adj = {c: set() for w in words for c in w}
    for w1, w2 in zip(words, words[1:]):
        min_len = min(len(w1), len(w2))
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                adj[c1].add(c2)
                break

    visited = {}  # False = in current DFS stack, True = fully visited
    res = []

    def dfs(c):
        if c in visited:
            return visited[c]
        visited[c] = False
        for neighbor in adj[c]:
            if not dfs(neighbor):
                return False
        visited[c] = True
        res.append(c)
        return True

    for c in list(adj.keys()):
        if not dfs(c):
            return ""

    res.reverse()
    return "".join(res)
`,
    harness: { kind: "function", entry: "alien_order", compare: "alien-order" },
    testCases: [
      {
        input: { words: ["wrt", "wrf", "er", "ett", "rftt"] },
        expected: "wertf",
        description:
          "'t'<'f', 'w'<'e', 'r'<'t', 'e'<'r' gives valid alien order wertf.",
      },
      {
        input: { words: ["z", "x"] },
        expected: "zx",
        description: "'z' comes before 'x'.",
      },
      {
        input: { words: ["z", "x", "z"] },
        expected: "",
        description: "Cyclic dependency: z < x and x < z is impossible.",
      },
      {
        input: { words: ["abc", "ab"] },
        expected: "",
        description: "Prefix error: 'abc' cannot come before 'ab'.",
      },
      {
        input: { words: ["z", "z"] },
        expected: "z",
        description: "Single letter dictionary.",
      },
      { input: { words: ["zy", "zx"] }, expected: "yxz" },
    ],
  },

  // ------------------------------------------------------------------ cheapest-flights-within-k-stops
  {
    id: "cheapest-flights-within-k-stops",
    summary:
      "There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [from, to, price]`, and integers `src`, `dst`, and `k`. Return the **cheapest price** from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.",
    constraints: [
      "1 ≤ n ≤ 100",
      "0 ≤ len(flights) ≤ (n * (n - 1) // 2)",
      "flights[i] == [fromi, toi, pricei]",
      "0 ≤ fromi, toi < n, fromi != toi",
      "1 ≤ pricei ≤ 10,000",
      "0 ≤ src, dst, k < n, src != dst",
    ],
    pattern: "Bellman-Ford: relax all edges up to k + 1 times",
    timeComplexity: {
      bruteForce: "O(V^(k+1)) worst case DFS",
      optimal: "O((k + 1) · E)",
      explanation:
        "Bellman-Ford runs `k + 1` iterations (since at most k stops means at most k + 1 flights). In each iteration, it iterates over all E flights to relax distances. Total time is O((k + 1) * E).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "We keep price arrays of size n representing the cheapest cost to each city, using linear space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "prices = [float('inf')] * n",
        plainEnglishExplanation:
          "Creates a list of size `n` initialized to infinity `float('inf')` to represent currently unreachable cities.",
        exampleSnippet:
          "p = [float('inf')] * 3\np[0] = 0\nprint(p)",
        whyWeUseItHere:
          "Starting costs to all cities are unknown/infinity except for the source city which costs 0.",
      },
      {
        keywordOrMethod: "temp_prices = list(prices)",
        plainEnglishExplanation:
          "`list(...)` creates an independent copy of the list.",
        exampleSnippet:
          "orig = [1, 2]\ncopy = list(orig)\ncopy[0] = 99\nprint(orig[0], copy[0])",
        whyWeUseItHere:
          "Prevents updates within the same flight step from cascading into subsequent flights in the same iteration.",
      },
      {
        keywordOrMethod: "for u, v, p in flights:",
        plainEnglishExplanation:
          "Unpacks each flight record into source `u`, destination `v`, and cost `p`.",
        exampleSnippet:
          "flights = [[0, 1, 100]]\nfor u, v, p in flights:\n    print(u, 'to', v, 'costs', p)",
        whyWeUseItHere:
          "Loops through all flight edges to see if any offer a cheaper way to reach destination `v`.",
      },
      {
        keywordOrMethod: "-1 if prices[dst] == float('inf') else int(prices[dst])",
        plainEnglishExplanation:
          "Ternary conditional: returns `-1` if destination is still unreachable (infinity), else returns the cost.",
        exampleSnippet:
          "ans = float('inf')\nprint(-1 if ans == float('inf') else int(ans))",
        whyWeUseItHere:
          "Handles the case where no route with at most `k` stops connects `src` to `dst`.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        n: 4,
        flights: [
          [0, 1, 100],
          [1, 2, 100],
          [2, 0, 100],
          [1, 3, 600],
          [2, 3, 200],
        ],
        src: 0,
        dst: 3,
        k: 1,
      },
      focus: ["prices", "temp_prices", "u", "v", "p"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine finding the cheapest bus trip. If you are allowed 0 stops (1 bus ride), you can only look at direct buses from your start city. If you are allowed 1 stop (2 bus rides), you can take any direct bus, and then from where you land, take a second bus. Each iteration of Bellman-Ford represents taking 'one more flight'. By running exactly `k + 1` iterations and copying the price table at the start of each round, you ensure you never take more than `k + 1` flights.",
      edgeCases: [
        "Destination is unreachable within k stops: returns `-1`.",
        "k is 0: only direct flights from `src` to `dst` are eligible.",
        "Cheaper path exists but requires more than k stops: correctly picks the cheapest path that satisfies the stop limit.",
      ],
      stepByStepWalkthrough: [
        "Initialize an array `prices` of size `n` with `float('inf')`, setting `prices[src] = 0`.",
        "Loop `k + 1` times (each iteration allows 1 additional flight).",
        "At the start of each iteration, copy `prices` into `temp_prices`.",
        "Iterate through every flight `(u, v, p)` in `flights`.",
        "If city `u` was reachable (`prices[u] != float('inf')`) and `prices[u] + p < temp_prices[v]`, update `temp_prices[v]`.",
        "Update `prices = temp_prices`.",
        "After `k + 1` rounds, return `-1` if `prices[dst] == float('inf')` else `int(prices[dst])`.",
      ],
    },
    hints: {
      conceptual:
        "At most `k` stops means at most `k + 1` flights. Which shortest-path algorithm naturally explores paths by increasing number of edges?",
      structural:
        "Use the Bellman-Ford algorithm for `k + 1` iterations. Maintain a copy of the distance array in each round so that a single iteration cannot chain multiple flights together.",
    },
    commonMistakes: [
      "Updating `prices` directly in-place without a `temp_prices` copy: this can chain multiple flights within a single iteration and exceed the `k` stops limit.",
      "Running the loop `k` times instead of `k + 1` times (k stops corresponds to k + 1 flights).",
      "Using standard Dijkstra without tracking stops: Dijkstra tracks lowest total cost, which might burn all stops on cheap edges and fail to find the goal.",
    ],
    starterCode: `def find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    # Return cheapest price from src to dst with at most k stops, or -1.
    # Tip: Bellman-Ford relaxed exactly k + 1 times using a temporary array.
    pass
`,
    optimalSolution: `def find_cheapest_price(
    n: int, flights: list[list[int]], src: int, dst: int, k: int
) -> int:
    INF = float("inf")
    # prices[i] stores the cheapest cost to reach city i from src
    prices = [INF] * n
    prices[src] = 0

    # At most k stops means at most k + 1 flights
    for _ in range(k + 1):
        # Copy prices so updates only build on previous round's results
        temp_prices = list(prices)
        for u, v, p in flights:
            # If city u has not been reached yet, we cannot fly from it
            if prices[u] == INF:
                continue
            if prices[u] + p < temp_prices[v]:
                temp_prices[v] = prices[u] + p
        prices = temp_prices

    return -1 if prices[dst] == INF else int(prices[dst])
`,
    bruteForceSolution: `from collections import defaultdict, deque


def find_cheapest_price(
    n: int, flights: list[list[int]], src: int, dst: int, k: int
) -> int:
    # BFS tracking (cost, city, stops)
    graph = defaultdict(list)
    for u, v, p in flights:
        graph[u].append((v, p))

    queue = deque([(0, src, 0)])
    cheapest = float("inf")
    min_cost = {}

    while queue:
        cost, city, stops = queue.popleft()
        if city == dst:
            cheapest = min(cheapest, cost)
            continue
        if stops > k or cost >= cheapest:
            continue
        if (city, stops) in min_cost and min_cost[(city, stops)] <= cost:
            continue
        min_cost[(city, stops)] = cost

        for neighbor, price in graph[city]:
            queue.append((cost + price, neighbor, stops + 1))

    return -1 if cheapest == float("inf") else int(cheapest)
`,
    harness: { kind: "function", entry: "find_cheapest_price" },
    testCases: [
      {
        input: {
          n: 4,
          flights: [
            [0, 1, 100],
            [1, 2, 100],
            [2, 0, 100],
            [1, 3, 600],
            [2, 3, 200],
          ],
          src: 0,
          dst: 3,
          k: 1,
        },
        expected: 700,
        description:
          "Path 0 -> 1 -> 3 has 1 stop with cost 100 + 600 = 700. Cheaper path 0 -> 1 -> 2 -> 3 requires 2 stops, which exceeds k=1.",
      },
      {
        input: {
          n: 3,
          flights: [
            [0, 1, 100],
            [1, 2, 100],
            [0, 2, 500],
          ],
          src: 0,
          dst: 2,
          k: 1,
        },
        expected: 200,
        description:
          "Path 0 -> 1 -> 2 has 1 stop with cost 200, which is cheaper than direct flight of 500.",
      },
      {
        input: {
          n: 3,
          flights: [
            [0, 1, 100],
            [1, 2, 100],
            [0, 2, 500],
          ],
          src: 0,
          dst: 2,
          k: 0,
        },
        expected: 500,
        description:
          "With k=0 (0 stops), only the direct flight 0 -> 2 of cost 500 is allowed.",
      },
      {
        input: {
          n: 2,
          flights: [[0, 1, 300]],
          src: 0,
          dst: 1,
          k: 0,
        },
        expected: 300,
      },
      {
        input: {
          n: 3,
          flights: [[0, 1, 100]],
          src: 0,
          dst: 2,
          k: 1,
        },
        expected: -1,
        description: "Destination city 2 cannot be reached from city 0.",
      },
      {
        input: {
          n: 5,
          flights: [
            [0, 1, 5],
            [1, 2, 5],
            [2, 3, 5],
            [3, 4, 5],
            [0, 4, 100],
          ],
          src: 0,
          dst: 4,
          k: 2,
        },
        expected: 100,
        description:
          "Path with cost 20 takes 3 stops (exceeding k=2), so direct flight 100 is chosen.",
      },
    ],
  },
];

export default problems;
