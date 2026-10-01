import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ kth-largest-element-in-a-stream
  {
    id: "kth-largest-element-in-a-stream",
    summary:
      "Build a class `KthLargest` that watches numbers arrive one at a time. It is created with a number `k` and a starting list `nums`. Every time `add(val)` is called, the new number joins the collection and you return the **k-th largest** number seen so far. Duplicates count separately: in `[5, 5, 3]` the 2nd largest is 5.",
    constraints: [
      "0 ≤ len(nums) ≤ 10,000 and 1 ≤ k ≤ len(nums) + 1",
      "-10,000 ≤ every number ≤ 10,000",
      "Up to 10,000 calls to `add`",
      "Whenever `add` returns, at least k numbers have been seen",
    ],
    pattern: "Min-heap that keeps only the k largest numbers",
    timeComplexity: {
      bruteForce: "O(n log n) per add",
      optimal: "O(log k) per add",
      explanation:
        "The brute force keeps every number and re-sorts the whole collection on each `add`, which costs O(n log n) when n numbers have arrived. The heap never holds more than k numbers, and a heap push or pop costs O(log k), so each `add` is O(log k). The constructor feeds the n starting numbers through `add`, so it costs O(n log k) once.",
    },
    spaceComplexity: {
      optimal: "O(k)",
      explanation:
        "The heap is trimmed back to k numbers after every push, so it never stores more than k + 1 values at any moment.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class KthLargest: / def __init__(self, ...): / self.k = k",
        plainEnglishExplanation:
          "A `class` is a blueprint for an object that bundles data and functions together. `__init__` is the setup function Python runs automatically when you create an object, like `KthLargest(3, [4, 5])`. `self` is the object itself: writing `self.k = k` stores `k` *on the object*, so every other method can read it later.",
        exampleSnippet:
          "class Clicker:\n    def __init__(self, start):\n        self.count = start\n\n    def click(self):\n        self.count += 1\n        return self.count\n\nc = Clicker(10)\nprint(c.click())\nprint(c.click())",
        whyWeUseItHere:
          "This is a *design* problem: the tests create one `KthLargest` object and call `add` on it many times. The heap and `k` must survive between calls, so they live on `self`.",
      },
      {
        keywordOrMethod: "import heapq / heapq.heappush(heap, val)",
        plainEnglishExplanation:
          "`heapq` is a built-in module that turns an ordinary list into a *min-heap*: a list kept in a special order where the **smallest** value is always at index 0. `heapq.heappush(heap, val)` adds `val` and quietly reshuffles a few items so that rule still holds. It costs O(log n), much cheaper than re-sorting. The rest of the list is *not* fully sorted, only the front is guaranteed.",
        exampleSnippet:
          "import heapq\n\nheap = []\nfor n in [5, 1, 8, 3]:\n    heapq.heappush(heap, n)\nprint(heap)     # not fully sorted...\nprint(heap[0])  # ...but the smallest is always first",
        whyWeUseItHere:
          "We need instant access to the smallest of our k largest numbers. A min-heap gives exactly that, so here we use heapq as-is (no tricks needed).",
      },
      {
        keywordOrMethod: "heapq.heappop(heap)",
        plainEnglishExplanation:
          "`heappop` removes the smallest value from the heap and returns it, then reshuffles so the next-smallest moves to the front. Also O(log n).",
        exampleSnippet:
          "import heapq\n\nheap = []\nfor n in [5, 1, 8, 3]:\n    heapq.heappush(heap, n)\nprint(heapq.heappop(heap))\nprint(heapq.heappop(heap))\nprint(heap)",
        whyWeUseItHere:
          "When the heap grows to k + 1 numbers, the smallest one can never be in the top k again, so we pop it off.",
      },
      {
        keywordOrMethod: "heap[0]",
        plainEnglishExplanation:
          "Reading index 0 of a heap *peeks* at the smallest value without removing it. It's O(1): no searching at all.",
        exampleSnippet:
          "import heapq\n\nheap = []\nfor n in [40, 10, 30]:\n    heapq.heappush(heap, n)\nprint(heap[0])\nprint(len(heap))  # still 3: peeking removes nothing",
        whyWeUseItHere:
          "After trimming, the heap holds exactly the k largest numbers, and the smallest of those, `heap[0]`, is the k-th largest. That's our answer.",
      },
      {
        keywordOrMethod: "heap = self.min_heap",
        plainEnglishExplanation:
          "Assigning a list to a new name does **not** copy it. Both names now point at the very same list, like two labels stuck on one box. Changing the list through one name is visible through the other.",
        exampleSnippet:
          "a = [1, 2]\nb = a        # b is another name for the SAME list\nb.append(3)\nprint(a)     # [1, 2, 3]",
        whyWeUseItHere:
          "Writing `heap` is shorter than `self.min_heap` every time, and because it's the same list, pushing onto `heap` really updates the object's heap.",
      },
      {
        keywordOrMethod: "self.add(num)",
        plainEnglishExplanation:
          "Inside a class, one method can call another through `self`. `self.add(num)` runs the `add` method on this same object, exactly as if someone outside had called it.",
        exampleSnippet:
          "class Box:\n    def __init__(self, items):\n        self.items = []\n        for item in items:\n            self.put(item)\n\n    def put(self, item):\n        self.items.append(item)\n\nprint(Box(['a', 'b']).items)",
        whyWeUseItHere:
          "The starting numbers need the same push-then-trim treatment as streamed numbers, so the constructor just reuses `add` instead of repeating the logic.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      heaps: ["heap"],
      focus: ["heap", "val"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture an exclusive club with only k chairs, reserved for the k biggest numbers seen so far. The bouncer doesn't need to remember everyone who was ever turned away. They only need to know the *weakest* member inside. When a newcomer arrives, they get a seat, and if the club is now over capacity the weakest person is shown the door. The weakest member still inside is exactly the k-th largest number. A min-heap is the bouncer's notebook: it always keeps the smallest value at the front, ready to read or remove in O(log k) time.",
      edgeCases: [
        "`nums` starts empty or with only k − 1 numbers: the heap is briefly smaller than k. That's fine, because the problem promises at least k numbers by the time `add` must return a real answer.",
        "Duplicates count separately: with k = 2 and numbers `[5, 5, 3]`, the answer is 5. The heap happily stores repeated values.",
        "A newcomer smaller than everything in the club is pushed and then immediately popped again, so the answer doesn't change.",
        "Negative numbers need no special handling: heapq compares them normally (-7 is smaller than -2).",
      ],
      stepByStepWalkthrough: [
        "In `__init__`, store `k` on `self` and create an empty list `self.min_heap` to use as a heap.",
        "Send every starting number through `self.add(num)`, so the push-and-trim logic lives in one place.",
        "In `add`, push `val` onto the heap with `heapq.heappush`. The smallest value is now at index 0.",
        "If the heap holds more than k numbers, `heapq.heappop` removes the smallest. It's beaten by k others, so it can never be in the top k again.",
        "The heap now holds exactly the k largest numbers. Their minimum, `heap[0]`, is the k-th largest, so return it.",
      ],
    },
    hints: {
      conceptual:
        "To know the k-th largest, do you need to remember numbers that are already beaten by k others? Of the top k numbers, which single one would you compare a newcomer against?",
      structural:
        "Store `k` and a list on `self`. In `add`: `heapq.heappush(...)`, then `heapq.heappop(...)` if `len(...) > self.k`, then `return heap[0]`. Python's heapq is a min-heap, which is exactly what you want here.",
    },
    commonMistakes: [
      "Expecting `heapq` to hand you the *largest* item. Python's heapq is a **min-heap**: `heap[0]` and `heappop` give the smallest. Here that's exactly what we need, so don't negate anything.",
      "Forgetting `self.` and writing `min_heap = []` in `__init__`. That creates a temporary local variable that vanishes when `__init__` finishes, so `add` can't find the heap.",
      "Trimming with `>=` instead of `>`: the heap shrinks to k − 1 numbers and you return the (k−1)-th largest.",
      "Sorting all numbers inside `add`: correct, but O(n log n) per call instead of O(log k).",
    ],
    starterCode: `import heapq


class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        # Keep a min-heap that only ever holds the k largest numbers.
        pass

    def add(self, val: int) -> int:
        # Add val, then return the k-th largest number seen so far.
        pass
`,
    optimalSolution: `import heapq


class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        # Remember k so add() can use it later
        self.k = k
        # A min-heap that will hold only the k LARGEST numbers seen so far
        self.min_heap = []
        # Feed the starting numbers through add(), one at a time
        for num in nums:
            self.add(num)

    def add(self, val: int) -> int:
        # A short name for our heap (the same list, not a copy)
        heap = self.min_heap
        # Drop the new number in; heapq keeps the SMALLEST value at heap[0]
        heapq.heappush(heap, val)
        # Too many numbers? Remove the smallest: it can't be in the top k
        if len(heap) > self.k:
            heapq.heappop(heap)
        # The smallest of the k largest numbers IS the k-th largest
        return heap[0]
`,
    bruteForceSolution: `class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        # Keep every number we've ever seen
        self.all_numbers = list(nums)

    def add(self, val: int) -> int:
        self.all_numbers.append(val)
        # Sort biggest-first and read position k - 1
        ordered = sorted(self.all_numbers, reverse=True)
        return ordered[self.k - 1]
`,
    harness: { kind: "design", entry: "KthLargest" },
    testCases: [
      {
        input: {
          operations: ["KthLargest", "add", "add", "add", "add", "add"],
          arguments: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
        },
        expected: [null, 4, 5, 5, 8, 8],
        description:
          "k = 3. After adding 3 the top three are 8, 5, 4, so the answer is 4. Adding 5 gives 8, 5, 5 → 5. Adding 10 gives 10, 8, 5 → 5. Adding 9 gives 10, 9, 8 → 8. Adding 4 changes nothing → 8.",
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add", "add", "add"],
          arguments: [[1, []], [-3], [-2], [-4], [0], [4]],
        },
        expected: [null, -3, -2, -2, 0, 4],
        description:
          "k = 1 means 'the largest so far'. The list may start empty because the first `add` brings us up to k numbers.",
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add", "add", "add"],
          arguments: [[2, [0]], [-1], [1], [-2], [-4], [3]],
        },
        expected: [null, -1, 0, 0, 0, 1],
        description:
          "Only k − 1 starting numbers. After adding -1 we have [0, -1], so the 2nd largest is -1. Small newcomers like -2 and -4 are pushed and popped right away.",
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add"],
          arguments: [[3, [5, 5, 5]], [5], [1], [6]],
        },
        expected: [null, 5, 5, 5],
        description: "Duplicates count separately: the top three after adding 6 are 6, 5, 5.",
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add", "add"],
          arguments: [[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]],
        },
        expected: [null, 7, 7, 7, 8],
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add"],
          arguments: [[1, [10, 9, 8]], [1], [2], [11]],
        },
        expected: [null, 10, 10, 11],
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add", "add", "add"],
          arguments: [[2, [-10, 4, -7, 0]], [-3], [8], [5], [-20], [6]],
        },
        expected: [null, 0, 4, 5, 5, 6],
      },
      {
        input: {
          operations: ["KthLargest", "add", "add", "add", "add"],
          arguments: [[5, [1, 2, 3, 4]], [5], [6], [0], [7]],
        },
        expected: [null, 1, 2, 2, 3],
      },
    ],
  },

  // ------------------------------------------------------------------ last-stone-weight
  {
    id: "last-stone-weight",
    summary:
      "You have a pile of stones, and `stones` lists their weights (positive whole numbers). Over and over, pick up the **two heaviest** stones and smash them together. If they weigh the same, both are destroyed. Otherwise the lighter one is destroyed and the heavier one loses that much weight and goes back on the pile. When at most one stone is left, return its weight, or `0` if nothing is left.",
    constraints: ["1 ≤ len(stones) ≤ 30", "1 ≤ stones[i] ≤ 1,000"],
    pattern: "Max-heap (a negated min-heap) to grab the biggest items repeatedly",
    timeComplexity: {
      bruteForce: "O(n² log n)",
      optimal: "O(n log n)",
      explanation:
        "Every smash removes at least one stone, so there are at most n rounds. The brute force re-sorts the whole pile each round (O(n log n) per round), which adds up to O(n² log n). With a heap, `heapify` costs O(n) once, and each round does at most three heap operations of O(log n) each, so the total is O(n log n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation: "The heap is a negated copy of the n stone weights.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "import heapq (a min-heap)",
        plainEnglishExplanation:
          "`heapq` is a built-in module that treats an ordinary list as a *min-heap*: the **smallest** value always sits at index 0. `heapq.heappop(h)` removes and returns that smallest value, and `heapq.heappush(h, x)` adds a value. Both cost only O(log n) because the heap only reshuffles a few items. heapq has **no max-heap** version.",
        exampleSnippet:
          "import heapq\n\nh = []\nfor n in [4, 9, 1]:\n    heapq.heappush(h, n)\nprint(h[0])              # smallest\nprint(heapq.heappop(h))  # removes the smallest\nprint(h)",
        whyWeUseItHere:
          "We need 'the heaviest stone' again and again while the pile changes. A heap gives us an extreme value quickly, but heapq only gives the *smallest*, so we need the trick below.",
      },
      {
        keywordOrMethod: "The negate trick: store -weight to get a max-heap",
        plainEnglishExplanation:
          "Multiplying by -1 flips the order of numbers: 8 > 7, but -8 < -7. So if we store every weight as a negative number, the heaviest stone becomes the *smallest* value, and heapq's min-heap puts it on top. When we take a value out, we negate it again to get the real weight back.",
        exampleSnippet:
          "import heapq\n\nweights = [2, 7, 4]\nh = []\nfor w in weights:\n    heapq.heappush(h, -w)   # store negatives\nprint(h)\nheaviest = -heapq.heappop(h)  # negate back\nprint(heaviest)",
        whyWeUseItHere:
          "This turns Python's min-heap into the max-heap we need: popping now gives the heaviest stone.",
      },
      {
        keywordOrMethod: "[-stone for stone in stones]",
        plainEnglishExplanation:
          "This is a *list comprehension*: a compact way to build a new list from an old one. Read it as 'for each stone in stones, put -stone in the new list'. It does the same as a `for` loop with `append`, in one line.",
        exampleSnippet:
          "stones = [2, 7, 4]\nnegated = [-stone for stone in stones]\nprint(negated)\nprint(stones)  # the original list is unchanged",
        whyWeUseItHere: "It makes the negated copy of all the weights in one step.",
      },
      {
        keywordOrMethod: "heapq.heapify(max_heap)",
        plainEnglishExplanation:
          "`heapify` rearranges an existing list, in place, into a valid heap. It's faster (O(n)) than pushing the items one by one (O(n log n)). It returns nothing; the list itself changes.",
        exampleSnippet:
          "import heapq\n\nh = [5, -3, 8, -10, 0]\nheapq.heapify(h)\nprint(h[0])  # the smallest value is now first\nprint(h)",
        whyWeUseItHere: "We already have all the (negated) weights, so we turn that list into a heap in one go.",
      },
      {
        keywordOrMethod: "while len(max_heap) > 1:",
        plainEnglishExplanation:
          "A `while` loop repeats its body as long as the condition is true. `len(...)` counts the items in a list. Here: 'keep going while at least two stones are left'.",
        exampleSnippet:
          "pile = [3, 1, 2]\nwhile len(pile) > 1:\n    pile.pop()\n    print('stones left:', len(pile))",
        whyWeUseItHere: "We don't know in advance how many smashes there will be; we stop when fewer than two stones remain.",
      },
      {
        keywordOrMethod: "if max_heap: return -max_heap[0]",
        plainEnglishExplanation:
          "An empty list counts as `False` in an `if`, and a non-empty list counts as `True`. `max_heap[0]` peeks at the top of the heap, and the minus sign undoes our negation.",
        exampleSnippet:
          "h = [-5]\nif h:\n    print('one stone of weight', -h[0])\nempty = []\nif not empty:\n    print('nothing left')",
        whyWeUseItHere: "After the loop there's either one stone (return its real weight) or none (return 0).",
      },
    ],
    visualizerType: "heap",
    visualization: {
      heaps: ["max_heap"],
      focus: ["max_heap", "first", "second"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a tournament where the two strongest fighters always face each other next, and the winner re-enters the queue a little weaker. You need to pull out 'the biggest one left' again and again while the crowd keeps changing. Re-sorting the whole line every round is wasteful. A heap keeps one extreme value on top and lets you remove it or add a new value in O(log n). Python's heapq always keeps the *smallest* value on top, so we store each weight as a negative number: -8 is smaller than -7, so the heaviest stone floats to the top.",
      edgeCases: [
        "A single stone: the loop never runs and we return that stone's weight.",
        "Two equal stones destroy each other, leaving nothing, so the answer is 0.",
        "A big stone surrounded by small ones (`[5, 1, 1, 1, 1, 1]`): the big one keeps winning and shrinking, and here it ends at 0.",
      ],
      stepByStepWalkthrough: [
        "Make a negated copy of the weights with `[-stone for stone in stones]`, so heapq's min-heap behaves like a max-heap.",
        "Call `heapq.heapify` to arrange that list into a heap. The heaviest stone (most negative number) is now at index 0.",
        "While at least two stones remain, pop twice. Negate each popped value to get the real weights `first` (heaviest) and `second`.",
        "If the weights differ, push the leftover `first - second` back, negated again so the heap stays consistent.",
        "When the loop ends, return `-max_heap[0]` if one stone is left, otherwise 0.",
      ],
    },
    hints: {
      conceptual:
        "Every round you need the two heaviest stones, and the pile keeps changing. What structure hands you 'the biggest remaining item' quickly, over and over, even as new items are added?",
      structural:
        "Use `heapq` as a max-heap by storing negative weights: build `[-s for s in stones]`, call `heapq.heapify`, then loop `while len(max_heap) > 1:` with two `heappop` calls and possibly one `heappush`.",
    },
    commonMistakes: [
      "Forgetting that heapq is a **min-heap**. Without negating, `heappop` gives the *lightest* stone and you smash the wrong pair.",
      "Negating on the way in but forgetting to negate the leftover when pushing it back. A positive number in a heap of negatives sinks to the bottom and breaks the order.",
      "Returning `max_heap[0]` without the minus sign, which gives a negative weight.",
      "Sorting the list inside the loop: it works, but costs O(n log n) per round instead of O(log n).",
    ],
    starterCode: `import heapq


def last_stone_weight(stones: list[int]) -> int:
    # heapq is a MIN-heap. Store negative weights so the heaviest is on top.
    # Smash the two heaviest until at most one stone remains.
    pass
`,
    optimalSolution: `import heapq


def last_stone_weight(stones: list[int]) -> int:
    # heapq only offers a MIN-heap (smallest on top). Storing every weight
    # as a negative number flips the order: the heaviest stone becomes the
    # most negative value, so it sits on top
    max_heap = [-stone for stone in stones]
    # Rearrange the list into a valid heap in one go
    heapq.heapify(max_heap)

    # Keep smashing while at least two stones are left
    while len(max_heap) > 1:
        # Pop the heaviest stone (negate again to get its real weight)
        first = -heapq.heappop(max_heap)
        # Pop the second heaviest the same way
        second = -heapq.heappop(max_heap)
        # Different weights: a smaller piece of the heavier stone survives
        if first != second:
            # Push the leftover back, negated to keep the max-heap trick
            heapq.heappush(max_heap, -(first - second))

    # One stone left? Return its real (positive) weight
    if max_heap:
        return -max_heap[0]
    # Every stone was destroyed
    return 0
`,
    bruteForceSolution: `def last_stone_weight(stones: list[int]) -> int:
    pile = list(stones)
    while len(pile) > 1:
        # Sort so the two heaviest stones are at the end
        pile.sort()
        first = pile.pop()
        second = pile.pop()
        if first != second:
            pile.append(first - second)
    if pile:
        return pile[0]
    return 0
`,
    harness: { kind: "function", entry: "last_stone_weight" },
    testCases: [
      {
        input: { stones: [2, 7, 4, 1, 8, 1] },
        expected: 1,
        description:
          "8 vs 7 leaves 1 → [2, 4, 1, 1, 1]. 4 vs 2 leaves 2 → [2, 1, 1, 1]. 2 vs 1 leaves 1 → [1, 1, 1]. 1 vs 1 destroys both → [1]. The last stone weighs 1.",
      },
      { input: { stones: [1] }, expected: 1, description: "Only one stone, so there's nothing to smash." },
      { input: { stones: [2, 2] }, expected: 0, description: "Equal weights destroy each other, leaving no stones." },
      { input: { stones: [3, 7, 2] }, expected: 2 },
      { input: { stones: [10, 4, 2, 10] }, expected: 2 },
      { input: { stones: [9, 3, 2, 10] }, expected: 0 },
      { input: { stones: [5, 1, 1, 1, 1, 1] }, expected: 0 },
      { input: { stones: [1000, 1, 500, 499] }, expected: 0 },
      { input: { stones: Array.from({ length: 30 }, (_, i) => i + 1) }, expected: 1 },
    ],
  },

  // ------------------------------------------------------------------ k-closest-points-to-origin
  {
    id: "k-closest-points-to-origin",
    summary:
      "You get a list of points on a flat grid, each written as `[x, y]`, and a number `k`. Return the `k` points that are **closest to the origin** `(0, 0)`, in any order. Distance means ordinary straight-line distance, √(x² + y²). The tests are chosen so the answer is unique (apart from its order).",
    constraints: [
      "1 ≤ k ≤ len(points) ≤ 10,000",
      "-10,000 ≤ x, y ≤ 10,000",
      "Return the k points in any order",
    ],
    pattern: "Min-heap keyed by squared distance",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n + k log n)",
      explanation:
        "The brute force sorts all n points by distance: O(n log n). The heap version computes n distances (O(n)), turns the list into a heap with `heapify` (also O(n)), then pops k times at O(log n) each. When k is much smaller than n, that's noticeably less work than a full sort.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation: "The heap stores one (distance, x, y) tuple for every point.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "for x, y in points:",
        plainEnglishExplanation:
          "Each item of `points` is a small list like `[3, -1]`. Writing two names after `for` *unpacks* each item: the first number goes into `x`, the second into `y`, on every pass of the loop.",
        exampleSnippet: "points = [[1, 3], [-2, 2]]\nfor x, y in points:\n    print('x is', x, 'and y is', y)",
        whyWeUseItHere: "We need x and y separately to compute each point's distance.",
      },
      {
        keywordOrMethod: "(distance, x, y): tuples and how they compare",
        plainEnglishExplanation:
          "Round brackets make a *tuple*: a small, fixed bundle of values. Python compares tuples item by item, left to right: first by the first item, and only if those are equal does it look at the second. So `(5, 9) < (8, 0)` is `True` because 5 < 8.",
        exampleSnippet: "print((5, 9) < (8, 0))\nprint((5, 1) < (5, 2))  # first items tie, so the second decides\nt = (10, 3, 1)\nprint(t[0])",
        whyWeUseItHere:
          "Putting the distance *first* in each tuple means the heap orders points by distance automatically, while still carrying x and y along.",
      },
      {
        keywordOrMethod: "heapq.heapify(min_heap)",
        plainEnglishExplanation:
          "`heapq` treats a plain list as a *min-heap*: the **smallest** item is always at index 0. `heapify` rearranges an existing list into that shape in one O(n) pass. It changes the list in place and returns nothing.",
        exampleSnippet: "import heapq\n\nh = [(26, 5, -1), (18, 3, 3), (20, -2, 4)]\nheapq.heapify(h)\nprint(h[0])  # the tuple with the smallest distance",
        whyWeUseItHere:
          "We want the *smallest* distances, and heapq is a min-heap, so it works directly. No negating needed.",
      },
      {
        keywordOrMethod: "distance, x, y = heapq.heappop(min_heap)",
        plainEnglishExplanation:
          "`heappop` removes and returns the smallest item (here, the closest point's tuple), then reshuffles so the next-smallest is at the front, in O(log n). Writing three names on the left unpacks the returned tuple into three variables.",
        exampleSnippet: "import heapq\n\nh = [(2, 1, 1), (8, -2, 2)]\nheapq.heapify(h)\ndistance, x, y = heapq.heappop(h)\nprint(distance, x, y)\nprint(h)",
        whyWeUseItHere: "Each pop gives us the next-closest point; we unpack it to keep just `[x, y]` for the answer.",
      },
      {
        keywordOrMethod: "for _ in range(k):",
        plainEnglishExplanation:
          "`range(k)` produces 0, 1, ..., k − 1, so the loop runs exactly k times. Naming the loop variable `_` is a Python habit meaning 'I don't need the counter, I just want to repeat'.",
        exampleSnippet: "for _ in range(3):\n    print('hello')",
        whyWeUseItHere: "We need exactly k pops, and the pop number itself doesn't matter.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      input: { points: [[3, 3], [5, -1], [-2, 4], [1, 1]], k: 2 },
      heaps: ["min_heap"],
      focus: ["min_heap", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you're the host of a party and the guests are standing around a fountain at the origin. You want the k guests nearest the fountain. Measure everyone's distance, write it on a sticky note on their shirt, and line them up in a heap, which always lets the person with the smallest note step forward first. Call the front person k times and you're done. One shortcut: you don't need the square root. If one squared distance is smaller than another, the real distance is smaller too, so comparing x² + y² is enough.",
      edgeCases: [
        "k equals the number of points: every point is returned.",
        "Duplicate points (`[[2, 2], [2, 2], [3, 3]]`) are separate entries, and both copies can be in the answer.",
        "Negative coordinates: squaring makes them positive, so (-2, 2) is exactly as far as (2, 2).",
        "Large coordinates up to 10,000: x² + y² is at most 200,000,000, which Python integers handle easily.",
      ],
      stepByStepWalkthrough: [
        "Loop over the points, unpacking each into `x` and `y`.",
        "Compute the squared distance `x * x + y * y` (no square root needed) and append the tuple `(distance, x, y)` to a list.",
        "Call `heapq.heapify` on the list. Because tuples compare by their first item, the closest point is now at index 0.",
        "Pop from the heap k times. Each pop returns the closest remaining point; unpack it and add `[x, y]` to the result.",
        "Return the result list.",
      ],
    },
    hints: {
      conceptual:
        "You don't need the points fully sorted, you only need the k smallest distances. Also: do you actually need the square root to decide which of two points is closer?",
      structural:
        "Build a list of `(x * x + y * y, x, y)` tuples, `heapq.heapify` it, then `heapq.heappop` it k times inside `for _ in range(k):`, collecting `[x, y]`.",
    },
    commonMistakes: [
      "Putting the distance *last* in the tuple, like `(x, y, distance)`. Tuples compare left to right, so the heap would order points by x instead of by distance.",
      "Expecting heapq to be a max-heap. It's a **min-heap**, which is exactly right here because we want the smallest distances.",
      "Using `math.sqrt` everywhere: not wrong, but unnecessary work, and floating-point numbers can bring rounding surprises.",
      "Returning the tuples with the distance still inside instead of just `[x, y]`.",
    ],
    starterCode: `import heapq


def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    # Compute each point's squared distance (x*x + y*y).
    # A min-heap can hand you the closest point, k times.
    pass
`,
    optimalSolution: `import heapq


def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    # We'll collect (distance, x, y) tuples here, then turn the list into a heap
    min_heap = []
    for x, y in points:
        # Squared distance: no square root needed, it sorts the same way
        distance = x * x + y * y
        # Distance goes FIRST so tuples are compared by distance
        min_heap.append((distance, x, y))

    # heapq is a MIN-heap: after heapify, the closest point is at index 0
    heapq.heapify(min_heap)

    result = []
    # Take the closest remaining point, k times
    for _ in range(k):
        # Remove the smallest tuple and unpack its three parts
        distance, x, y = heapq.heappop(min_heap)
        # Keep just the coordinates for the answer
        result.append([x, y])
    return result
`,
    bruteForceSolution: `def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    # Sort every point by its squared distance, then keep the first k
    ordered = sorted(points, key=lambda p: p[0] * p[0] + p[1] * p[1])
    return ordered[:k]
`,
    harness: { kind: "function", entry: "k_closest", compare: "unordered" },
    testCases: [
      {
        input: { points: [[1, 3], [-2, 2]], k: 1 },
        expected: [[-2, 2]],
        description: "Squared distances: 1 + 9 = 10 and 4 + 4 = 8. The point (-2, 2) is closer.",
      },
      {
        input: { points: [[3, 3], [5, -1], [-2, 4]], k: 2 },
        expected: [[3, 3], [-2, 4]],
        description: "Squared distances are 18, 26 and 20. The two smallest are 18 and 20.",
      },
      {
        input: { points: [[0, 1], [1, 0]], k: 2 },
        expected: [[0, 1], [1, 0]],
        description: "k equals the number of points, so every point is in the answer (in any order).",
      },
      { input: { points: [[1, 1]], k: 1 }, expected: [[1, 1]] },
      { input: { points: [[0, 0], [5, 5], [-1, -1], [2, 2]], k: 2 }, expected: [[0, 0], [-1, -1]] },
      { input: { points: [[-5, 4], [-6, -5], [4, 6]], k: 2 }, expected: [[-5, 4], [4, 6]] },
      { input: { points: [[2, 2], [2, 2], [3, 3]], k: 2 }, expected: [[2, 2], [2, 2]] },
      {
        input: { points: [[10000, 10000], [-10000, -10000], [1, -1], [0, -3]], k: 2 },
        expected: [[1, -1], [0, -3]],
      },
      {
        input: { points: Array.from({ length: 200 }, (_, i) => [i - 100, 2 * i - 200]), k: 3 },
        expected: [[0, 0], [-1, -2], [1, 2]],
      },
    ],
  },

  // ------------------------------------------------------------------ kth-largest-element-in-an-array
  {
    id: "kth-largest-element-in-an-array",
    summary:
      "Given a list of whole numbers `nums` and a number `k`, return the **k-th largest** value. This is about position in sorted order, not distinct values: in `[3, 3, 2]` the largest is 3 and the 2nd largest is *also* 3. Try to do it without sorting the whole list.",
    constraints: ["1 ≤ k ≤ len(nums) ≤ 100,000", "-10,000 ≤ nums[i] ≤ 10,000"],
    pattern: "Size-k min-heap (keep only the k largest)",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n log k)",
      explanation:
        "Sorting all n numbers costs O(n log n). The heap approach visits each number once, and each visit does a push and maybe a pop on a heap that never holds more than k + 1 items, so each visit costs O(log k): O(n log k) in total. (There's also an algorithm called Quickselect that averages O(n), but it's much trickier to get right.)",
    },
    spaceComplexity: {
      optimal: "O(k)",
      explanation: "The heap never holds more than k + 1 numbers.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "for num in nums:",
        plainEnglishExplanation:
          "A `for` loop runs its indented body once for each item in a list, putting the current item into the variable named after `for` (here `num`).",
        exampleSnippet: "nums = [3, 2, 1]\nfor num in nums:\n    print('looking at', num)",
        whyWeUseItHere: "We look at every number exactly once and decide whether it belongs in the top k.",
      },
      {
        keywordOrMethod: "import heapq / heapq.heappush(min_heap, num)",
        plainEnglishExplanation:
          "`heapq` is a built-in module that treats a plain list as a *min-heap*: the **smallest** value is always at index 0. `heappush` adds a value and reshuffles just a few items (O(log n)) to keep that rule. The rest of the list is not fully sorted.",
        exampleSnippet: "import heapq\n\nh = []\nfor n in [6, 2, 9]:\n    heapq.heappush(h, n)\nprint(h)\nprint(h[0])",
        whyWeUseItHere:
          "We need quick access to the *smallest* of our current top-k numbers, and heapq's min-heap gives exactly that. No negating needed.",
      },
      {
        keywordOrMethod: "heapq.heappop(min_heap)",
        plainEnglishExplanation:
          "`heappop` removes and returns the smallest value in the heap, then reshuffles so the next-smallest moves to index 0. O(log n).",
        exampleSnippet: "import heapq\n\nh = []\nfor n in [6, 2, 9]:\n    heapq.heappush(h, n)\nprint(heapq.heappop(h))\nprint(h)",
        whyWeUseItHere:
          "Once the heap has k + 1 numbers, its smallest is beaten by k others and can't be the answer, so we throw it away.",
      },
      {
        keywordOrMethod: "if len(min_heap) > k:",
        plainEnglishExplanation:
          "`len(...)` gives the number of items in a list. The `if` runs its body only when the heap has grown past k items.",
        exampleSnippet: "h = [1, 2, 3]\nk = 2\nif len(h) > k:\n    print('too many items:', len(h))",
        whyWeUseItHere: "This keeps the heap at exactly k numbers: the k largest seen so far.",
      },
      {
        keywordOrMethod: "return min_heap[0]",
        plainEnglishExplanation:
          "Index 0 of a heap is its smallest value. Reading it doesn't remove anything, and it costs O(1).",
        exampleSnippet: "import heapq\n\nh = []\nfor n in [5, 6]:\n    heapq.heappush(h, n)\nprint(h[0])",
        whyWeUseItHere:
          "At the end the heap holds the k largest numbers, and the smallest of them is, by definition, the k-th largest.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      heaps: ["min_heap"],
      focus: ["min_heap", "num"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a podium with exactly k spots for the k tallest people in a crowd. As each person walks past, they step onto the podium. If that makes k + 1 people, the *shortest* person on the podium steps down: k others are taller, so they can't be in the top k. When the whole crowd has passed, the shortest person still on the podium is the k-th tallest. A min-heap is the podium: it always knows who its smallest member is.",
      edgeCases: [
        "k = 1: the heap holds one number, the largest seen so far.",
        "k = len(nums): nothing is ever popped, and the answer is the smallest number in the list.",
        "Duplicates count as separate entries: `[7, 7, 7, 7]` with k = 3 returns 7.",
        "All negative numbers work the same way: -1 is larger than -3.",
      ],
      stepByStepWalkthrough: [
        "Start with an empty list `min_heap`.",
        "For each number, push it onto the heap with `heapq.heappush`.",
        "If the heap now has more than k numbers, `heapq.heappop` removes the smallest one.",
        "After the loop, the heap contains exactly the k largest numbers.",
        "Return `min_heap[0]`, the smallest of those k, which is the k-th largest overall.",
      ],
    },
    hints: {
      conceptual:
        "If you only remember the k biggest numbers you've seen so far, which one of them would be the answer at the end? And when a new number arrives, which remembered number might it replace?",
      structural:
        "Loop `for num in nums:`, `heapq.heappush(min_heap, num)`, and `heapq.heappop(min_heap)` whenever `len(min_heap) > k`. Return `min_heap[0]`.",
    },
    commonMistakes: [
      "Thinking heapq is a max-heap and negating everything. That works too, but then you'd have to pop k times from a heap of all n numbers. With heapq's natural **min-heap** of size k there's nothing to negate.",
      "Returning `heapq.heappop(min_heap)` or `min_heap[-1]` instead of `min_heap[0]`. The last element of a heap is *not* the largest; only index 0 has a guaranteed meaning.",
      "Removing duplicates with `set(nums)` first. The k-th largest counts duplicates, so `[3, 3, 2]` with k = 2 must return 3, not 2.",
    ],
    starterCode: `import heapq


def find_kth_largest(nums: list[int], k: int) -> int:
    # Keep a min-heap holding only the k largest numbers seen so far.
    # Its smallest element is the answer.
    pass
`,
    optimalSolution: `import heapq


def find_kth_largest(nums: list[int], k: int) -> int:
    # A min-heap that will only ever hold the k largest numbers seen so far
    min_heap = []

    for num in nums:
        # Add the number; heapq keeps the SMALLEST value at min_heap[0]
        heapq.heappush(min_heap, num)
        # More than k numbers? The smallest can't be in the top k: drop it
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    # The heap holds exactly the k largest; its smallest is the k-th largest
    return min_heap[0]
`,
    bruteForceSolution: `def find_kth_largest(nums: list[int], k: int) -> int:
    # Sort from largest to smallest and read position k - 1
    ordered = sorted(nums, reverse=True)
    return ordered[k - 1]
`,
    harness: { kind: "function", entry: "find_kth_largest" },
    testCases: [
      {
        input: { nums: [3, 2, 1, 5, 6, 4], k: 2 },
        expected: 5,
        description: "Biggest-first the list is 6, 5, 4, 3, 2, 1. The 2nd entry is 5.",
      },
      {
        input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 },
        expected: 4,
        description: "Biggest-first: 6, 5, 5, 4, ... Both 5s count separately, so the 4th largest is 4.",
      },
      { input: { nums: [1], k: 1 }, expected: 1, description: "A single number is its own largest." },
      { input: { nums: [7, 7, 7, 7], k: 3 }, expected: 7 },
      { input: { nums: [-1, -5, -3], k: 1 }, expected: -1 },
      { input: { nums: [2, 1], k: 2 }, expected: 1 },
      { input: { nums: [9, 8, 7, 6, 5], k: 5 }, expected: 5 },
      {
        input: { nums: Array.from({ length: 1000 }, (_, i) => (i * 7919) % 1000), k: 10 },
        expected: 990,
      },
    ],
  },
  // ------------------------------------------------------------------ task-scheduler
  {
    id: "task-scheduler",
    summary:
      "You are given an array of CPU tasks represented by letters `tasks` and a cooling interval `n`. Each cycle the CPU can either complete one task or remain idle. Identical tasks must be separated by at least `n` cooldown intervals. Return the **minimum number of CPU intervals** required to complete all tasks.",
    constraints: [
      "1 ≤ len(tasks) ≤ 10,000",
      "tasks[i] is an uppercase English letter",
      "0 ≤ n ≤ 100",
    ],
    pattern: "Max-heap + cooldown queue simulation",
    timeComplexity: {
      bruteForce: "O(m) where m is total intervals",
      optimal: "O(len(tasks) · log 26) = O(len(tasks))",
      explanation:
        "Counting task frequencies takes O(len(tasks)). There are at most 26 distinct tasks, so the heap contains at most 26 items. Heap operations take O(log 26) which is constant O(1). Each task is pushed and popped at most once, and each idle interval advances time by 1. Total time is bounded by the total interval count.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The heap and queue store at most 26 English letters and their counts, which takes O(26) = O(1) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import Counter / Counter(tasks)",
        plainEnglishExplanation:
          "`Counter` counts how many times each task appears in `tasks` and stores the counts in a dictionary-like object.",
        exampleSnippet:
          "from collections import Counter\nprint(Counter(['A', 'A', 'B']))",
        whyWeUseItHere:
          "We need to know the frequency of each task to always prioritize the most frequent one.",
      },
      {
        keywordOrMethod: "max_heap = [-cnt for cnt in counts.values()]",
        plainEnglishExplanation:
          "Python's `heapq` is a min-heap. Negating the counts turns it into an effective max-heap, where the largest original count becomes the most negative (smallest) number at index 0.",
        exampleSnippet:
          "import heapq\nh = [-5, -2, -8]\nheapq.heapify(h)\nprint(-heapq.heappop(h))",
        whyWeUseItHere:
          "Always scheduling the task with the highest remaining count prevents long idle periods at the end.",
      },
      {
        keywordOrMethod: "from collections import deque / deque()",
        plainEnglishExplanation:
          "A double-ended queue. `append` adds to the right end and `popleft()` removes from the left end in O(1) time.",
        exampleSnippet:
          "from collections import deque\nq = deque([(1, 'ready')])\nprint(q.popleft())",
        whyWeUseItHere:
          "Holds tasks waiting out their `n`-step cooldown along with the time they become eligible again.",
      },
      {
        keywordOrMethod: "while max_heap or queue:",
        plainEnglishExplanation:
          "Loops until every task has finished running and no tasks are waiting in cooldown.",
        exampleSnippet:
          "h, q = [1], []\nwhile h or q:\n    print('tick')\n    h.pop()",
        whyWeUseItHere:
          "Simulates each clock tick of CPU time until all work is done.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      input: { tasks: ["A", "A", "A", "B", "B", "B"], n: 2 },
      heaps: ["max_heap"],
      focus: ["time", "max_heap", "queue"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you have chores of different types. If you have 10 loads of laundry, but only 1 dishwasher run, you should start laundry as often as possible! The most frequent chore dictates the schedule. If you wait until the end to do all the laundry, you'll be forced to sit idle during cooldowns. By always running whichever available task has the most repetitions left (using a max-heap), and parking spent tasks in a cooldown queue until their timer expires, you minimize idle waiting.",
      edgeCases: [
        "n = 0: no cooldown needed, total intervals simply equals len(tasks).",
        "All tasks are unique: no task ever needs to wait on cooldown.",
        "One very dominant task: CPU spends many cycles idling between runs of that task.",
      ],
      stepByStepWalkthrough: [
        "Count frequencies of all tasks using `Counter(tasks)`.",
        "Push negated counts into `max_heap` so the most frequent task is on top.",
        "Maintain a `queue` storing `(remaining_count, ready_time)`.",
        "Initialize `time = 0`.",
        "At each cycle, increment `time += 1`.",
        "If `max_heap` has tasks, pop the most frequent task, decrement its count (`cnt + 1`), and if remaining, put `(cnt, time + n)` in the cooldown queue.",
        "If the task at the front of `queue` has reached its `ready_time == time`, pop it from `queue` and push its count back into `max_heap`.",
        "Repeat until both `max_heap` and `queue` are empty, then return `time`.",
      ],
    },
    hints: {
      conceptual:
        "To avoid idle cycles, which tasks should you prioritize running first: the ones with high frequency or low frequency?",
      structural:
        "Use a max-heap of task counts and a `deque` of `(remaining_count, ready_time)` pairs. Each time tick, pop from the heap, decrement, and if more left, put in queue with `time + n`. When queue tasks are ready, push them back to the heap.",
    },
    commonMistakes: [
      "Scheduling tasks arbitrarily instead of greedily picking the most frequent one first.",
      "Using regular list `.pop(0)` for the cooldown queue instead of `collections.deque.popleft()`, leading to O(k) shift overhead.",
      "Forgetting that if the heap is empty during a cycle, the CPU still burns an idle interval (time still increments).",
    ],
    starterCode: `def least_interval(tasks: list[str], n: int) -> int:
    # Return minimum CPU intervals to complete all tasks with cooldown n.
    # Tip: greedily execute the task with the highest remaining count.
    pass
`,
    optimalSolution: `import heapq
from collections import Counter, deque


def least_interval(tasks: list[str], n: int) -> int:
    # Count the frequency of each task
    counts = Counter(tasks)

    # Max-heap of negated counts (largest frequency at the top)
    max_heap = [-cnt for cnt in counts.values()]
    heapq.heapify(max_heap)

    # Queue storing pairs of (remaining_count, time_when_ready)
    queue = deque()
    time = 0

    # Continue until all tasks are finished and cooldowns have expired
    while max_heap or queue:
        time += 1

        if max_heap:
            # Execute the most frequent available task
            cnt = heapq.heappop(max_heap) + 1
            # If it still has executions remaining, queue it with cooldown
            if cnt < 0:
                queue.append((cnt, time + n))

        # If the task at front of cooldown is ready, return it to the heap
        if queue and queue[0][1] == time:
            ready_cnt, _ = queue.popleft()
            heapq.heappush(max_heap, ready_cnt)

    return time
`,
    bruteForceSolution: `from collections import Counter


def least_interval(tasks: list[str], n: int) -> int:
    # Mathematical formula based on the most frequent task
    counts = Counter(tasks)
    max_freq = max(counts.values())
    num_max_freq = sum(1 for c in counts.values() if c == max_freq)
    # Either bounded by slots dictated by max_freq, or by total task count
    return max(len(tasks), (max_freq - 1) * (n + 1) + num_max_freq)
`,
    harness: { kind: "function", entry: "least_interval" },
    testCases: [
      {
        input: { tasks: ["A", "A", "A", "B", "B", "B"], n: 2 },
        expected: 8,
        description:
          "Optimal schedule is A -> B -> idle -> A -> B -> idle -> A -> B, taking 8 intervals.",
      },
      {
        input: { tasks: ["A", "A", "A", "B", "B", "B"], n: 0 },
        expected: 6,
        description:
          "With n = 0, no cooldown is needed, taking exactly len(tasks) = 6 intervals.",
      },
      {
        input: {
          tasks: ["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"],
          n: 2,
        },
        expected: 16,
        description:
          "Task A dominates the frequency, forcing idle slots between runs of A after other tasks finish.",
      },
      { input: { tasks: ["A"], n: 2 }, expected: 1 },
      { input: { tasks: ["A", "B", "C", "D"], n: 2 }, expected: 4 },
      { input: { tasks: ["A", "A", "B", "B"], n: 2 }, expected: 5 },
      { input: { tasks: ["A", "A", "A", "B", "B", "C", "C"], n: 1 }, expected: 7 },
      { input: { tasks: ["A", "B", "A", "B", "A", "B"], n: 3 }, expected: 10 },
    ],
  },

  // ------------------------------------------------------------------ design-twitter
  {
    id: "design-twitter",
    summary:
      "Design a simplified version of Twitter where users can post tweets, follow/unfollow other users, and view the 10 most recent tweets in their news feed.\n\nImplement the `Twitter` class:\n- `Twitter()` initializes the object.\n- `post_tweet(user_id, tweet_id)` records a new tweet by `user_id`.\n- `get_news_feed(user_id)` returns the 10 most recent tweet IDs in the user's news feed, ordered from newest to oldest. A user's news feed includes tweets posted by users they follow and by themselves.\n- `follow(follower_id, followee_id)` user `follower_id` starts following `followee_id`.\n- `unfollow(follower_id, followee_id)` user `follower_id` unfollows `followee_id`.",
    constraints: [
      "1 ≤ user_id, follower_id, followee_id ≤ 500",
      "0 ≤ tweet_id ≤ 10,000",
      "All tweets have unique IDs",
      "At most 30,000 calls to post_tweet, get_news_feed, follow, and unfollow",
    ],
    pattern: "K-way merge of sorted tweet lists using a min-heap",
    timeComplexity: {
      bruteForce: "O(T log T) where T is total tweets of followed users",
      optimal: "O(k log k) for get_news_feed where k is number of followed users",
      explanation:
        "`post_tweet`, `follow`, and `unfollow` take O(1) time using hash maps and sets. In `get_news_feed`, we perform a k-way merge of the followed users' tweet lists using a heap. Since we only retrieve up to 10 tweets, we do at most 10 heap pops and pushes, each costing O(log k) where k is the number of followed users.",
    },
    spaceComplexity: {
      optimal: "O(U + T)",
      explanation:
        "Storing tweets and follow relationships requires memory proportional to the total number of users U and tweets T.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod:
          "from collections import defaultdict / defaultdict(list) / defaultdict(set)",
        plainEnglishExplanation:
          "A dictionary that automatically initializes missing keys with a new list `[]` or a new set `set()`.",
        exampleSnippet:
          "from collections import defaultdict\nf = defaultdict(set)\nf[1].add(2)\nprint(f[1])",
        whyWeUseItHere:
          "Stores each user's tweet history as a list, and each user's followees as a set.",
      },
      {
        keywordOrMethod: "following[follower_id].discard(followee_id)",
        plainEnglishExplanation:
          "`.discard(item)` removes an item from a set if it is present. Unlike `.remove()`, it never raises an error if the item was not in the set.",
        exampleSnippet:
          "s = {1, 2}\ns.discard(2)\ns.discard(99)\nprint(s)",
        whyWeUseItHere:
          "Safely removes a followee even if the user was not already following them.",
      },
      {
        keywordOrMethod: "import heapq / heapq.heappush / heapq.heappop",
        plainEnglishExplanation:
          "`heapq` provides min-heap operations. Storing tuples `(-time, tweet_id, ...)` lets the smallest (most negative) timestamp pop first, which corresponds to the newest tweet.",
        exampleSnippet:
          "import heapq\nh = []\nheapq.heappush(h, (-10, 'tweetA'))\nheapq.heappush(h, (-20, 'tweetB'))\nprint(heapq.heappop(h))",
        whyWeUseItHere:
          "Efficiently merges the most recent tweets from multiple followed users in descending chronological order.",
      },
      {
        keywordOrMethod: "users = set(self.following[user_id]) / users.add(user_id)",
        plainEnglishExplanation:
          "Creates a set of all followee IDs and includes the user themselves.",
        exampleSnippet:
          "f = {2, 3}\nu = set(f)\nu.add(1)\nprint(sorted(list(u)))",
        whyWeUseItHere:
          "A user's news feed includes both their own tweets and their followees' tweets.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      input: {
        operations: [
          "Twitter",
          "post_tweet",
          "get_news_feed",
          "follow",
          "post_tweet",
          "get_news_feed",
          "unfollow",
          "get_news_feed",
        ],
        arguments: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
      },
      heaps: ["min_heap"],
      focus: ["feed", "min_heap"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine each user has a personal stack of tweets on their desk, sorted chronologically with the newest tweet on top. When you want to see your news feed, you look at the top tweet on your desk and the top tweet on each of your friends' desks. Which one is newest? Pick it up! Then look at the next tweet on that person's desk. A min-heap (holding negative timestamps) keeps the newest available tweet at your fingertips. You repeat this at most 10 times to get the 10 newest tweets without reading anyone's entire history.",
      edgeCases: [
        "User has no tweets and follows no one: returns empty list `[]`.",
        "Total tweets available across all followed users is fewer than 10: returns all available tweets.",
        "User follows themselves: guarded to avoid duplicate entries.",
        "Unfollowing a user that wasn't followed: safely ignored.",
      ],
      stepByStepWalkthrough: [
        "In `__init__`, track a global `time` counter, a `tweets` dict (user -> list of `(time, tweet_id)`), and a `following` dict (user -> set of followees).",
        "In `post_tweet(user_id, tweet_id)`, append `(self.time, tweet_id)` to `tweets[user_id]` and increment `self.time`.",
        "In `follow(follower_id, followee_id)`, if `follower_id != followee_id`, add `followee_id` to `following[follower_id]`.",
        "In `unfollow(follower_id, followee_id)`, remove `followee_id` using `.discard()`.",
        "In `get_news_feed(user_id)`, gather `users = set(following[user_id]) | {user_id}`.",
        "Push the latest tweet from each user into `min_heap` as `(-time, tweet_id, user, next_index)`.",
        "Pop from `min_heap`, append `tweet_id` to `feed`, and if that user has earlier tweets (`next_index >= 0`), push their next tweet.",
        "Stop when `feed` reaches length 10 or the heap becomes empty, then return `feed`.",
      ],
    },
    hints: {
      conceptual:
        "Each user's tweets are already sorted chronologically. How do you merge multiple sorted lists to find the top 10 elements efficiently?",
      structural:
        "Store tweets per user in a list of `(time, tweet_id)`. For `get_news_feed`, initialize a heap with the newest tweet of each followed user (plus the user themselves), and pop up to 10 times.",
    },
    commonMistakes: [
      "Concatenating all tweets from all followed users and sorting everything from scratch on each query (O(T log T) instead of O(k)).",
      "Forgetting to include the user's own tweets in their news feed.",
      "Allowing a user to follow themselves and generating duplicate tweets in the feed.",
    ],
    starterCode: `class Twitter:
    def __init__(self):
        # Initialize data structures for tweets and follows
        pass

    def post_tweet(self, user_id: int, tweet_id: int) -> None:
        # Record a tweet published by user_id
        pass

    def get_news_feed(self, user_id: int) -> list[int]:
        # Return 10 most recent tweet IDs in user_id's feed
        pass

    def follow(self, follower_id: int, followee_id: int) -> None:
        # follower_id follows followee_id
        pass

    def unfollow(self, follower_id: int, followee_id: int) -> None:
        # follower_id unfollows followee_id
        pass
`,
    optimalSolution: `import heapq
from collections import defaultdict


class Twitter:
    def __init__(self):
        # Monotonically increasing timestamp for tweets
        self.time = 0
        # Map user_id -> list of (time, tweet_id)
        self.tweets = defaultdict(list)
        # Map follower_id -> set of followee_ids
        self.following = defaultdict(set)

    def post_tweet(self, user_id: int, tweet_id: int) -> None:
        # Record tweet with current timestamp
        self.tweets[user_id].append((self.time, tweet_id))
        self.time += 1

    def get_news_feed(self, user_id: int) -> list[int]:
        feed = []
        min_heap = []

        # Include user's own tweets as well as all followed users
        users = set(self.following[user_id])
        users.add(user_id)

        # Push the most recent tweet of each relevant user
        for u in users:
            if self.tweets[u]:
                last_idx = len(self.tweets[u]) - 1
                t, tid = self.tweets[u][last_idx]
                # (-timestamp, tweet_id, user, index_of_previous_tweet)
                heapq.heappush(min_heap, (-t, tid, u, last_idx - 1))

        # Retrieve up to 10 most recent tweets
        while min_heap and len(feed) < 10:
            neg_t, tid, u, next_idx = heapq.heappop(min_heap)
            feed.append(tid)
            # If this user has more tweets, push the next one into the heap
            if next_idx >= 0:
                t, prev_tid = self.tweets[u][next_idx]
                heapq.heappush(min_heap, (-t, prev_tid, u, next_idx - 1))

        return feed

    def follow(self, follower_id: int, followee_id: int) -> None:
        if follower_id != followee_id:
            self.following[follower_id].add(followee_id)

    def unfollow(self, follower_id: int, followee_id: int) -> None:
        self.following[follower_id].discard(followee_id)
`,
    bruteForceSolution: `class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = {}
        self.following = {}

    def post_tweet(self, user_id: int, tweet_id: int) -> None:
        if user_id not in self.tweets:
            self.tweets[user_id] = []
        self.tweets[user_id].append((self.time, tweet_id))
        self.time += 1

    def get_news_feed(self, user_id: int) -> list[int]:
        relevant = set(self.following.get(user_id, set()))
        relevant.add(user_id)
        all_tweets = []
        for u in relevant:
            all_tweets.extend(self.tweets.get(u, []))
        all_tweets.sort(key=lambda x: x[0], reverse=True)
        return [tid for _, tid in all_tweets[:10]]

    def follow(self, follower_id: int, followee_id: int) -> None:
        if follower_id != followee_id:
            if follower_id not in self.following:
                self.following[follower_id] = set()
            self.following[follower_id].add(followee_id)

    def unfollow(self, follower_id: int, followee_id: int) -> None:
        if follower_id in self.following:
            self.following[follower_id].discard(followee_id)
`,
    harness: { kind: "design", entry: "Twitter" },
    testCases: [
      {
        input: {
          operations: [
            "Twitter",
            "post_tweet",
            "get_news_feed",
            "follow",
            "post_tweet",
            "get_news_feed",
            "unfollow",
            "get_news_feed",
          ],
          arguments: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
        },
        expected: [null, null, [5], null, null, [6, 5], null, [5]],
        description:
          "User 1 posts tweet 5. User 1 follows 2. User 2 posts tweet 6. User 1's feed has [6, 5]. After unfollowing, feed returns [5].",
      },
      {
        input: {
          operations: [
            "Twitter",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "get_news_feed",
          ],
          arguments: [[], [1, 101], [1, 102], [1, 103], [1]],
        },
        expected: [null, null, null, null, [103, 102, 101]],
        description:
          "Multiple tweets from the same user are returned in reverse chronological order.",
      },
      {
        input: {
          operations: ["Twitter", "get_news_feed"],
          arguments: [[], [1]],
        },
        expected: [null, []],
        description: "User with no tweets and no followees returns an empty feed.",
      },
      {
        input: {
          operations: ["Twitter", "follow", "unfollow", "get_news_feed"],
          arguments: [[], [1, 2], [1, 2], [1]],
        },
        expected: [null, null, null, []],
      },
      {
        input: {
          operations: ["Twitter", "post_tweet", "follow", "get_news_feed"],
          arguments: [[], [2, 99], [1, 2], [1]],
        },
        expected: [null, null, null, [99]],
      },
      {
        input: {
          operations: [
            "Twitter",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "post_tweet",
            "get_news_feed",
          ],
          arguments: [
            [],
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5],
            [1, 6],
            [1, 7],
            [1, 8],
            [1, 9],
            [1, 10],
            [1, 11],
            [1],
          ],
        },
        expected: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
        ],
        description: "News feed caps at 10 most recent tweets.",
      },
    ],
  },

  // ------------------------------------------------------------------ find-median-from-data-stream
  {
    id: "find-median-from-data-stream",
    summary:
      "The **median** is the middle value in an ordered integer list. If the size of the list is even, the median is the mean of the two middle values.\n\nImplement the `MedianFinder` class:\n- `MedianFinder()` initializes the `MedianFinder` object.\n- `add_num(num)` adds the integer `num` from the data stream to the data structure.\n- `find_median()` returns the median of all elements so far as a float.",
    constraints: [
      "-100,000 ≤ num ≤ 100,000",
      "There will be at least one element in the data structure before calling find_median",
      "At most 50,000 calls will be made to add_num and find_median",
    ],
    pattern: "Two heaps: max-heap for lower half and min-heap for upper half",
    timeComplexity: {
      bruteForce: "O(n log n) per find_median or O(n) per add_num",
      optimal: "O(log n) for add_num, O(1) for find_median",
      explanation:
        "Brute force re-sorts all numbers on each query or uses insertion sort. With two balanced heaps, inserting a number and rebalancing takes O(log n) heap operations. `find_median` merely inspects the roots of the two heaps in O(1) time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "All numbers added from the stream are stored across the two heaps, taking linear space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "import heapq / heapq.heappush / heapq.heappop",
        plainEnglishExplanation:
          "`heapq` provides min-heap operations where the smallest element is at index 0. Storing negated numbers creates a max-heap where the largest number is popped first.",
        exampleSnippet:
          "import heapq\nh = []\nheapq.heappush(h, -5)\nheapq.heappush(h, -2)\nprint(-heapq.heappop(h))",
        whyWeUseItHere:
          "We use a max-heap (`small`) for numbers below the median and a min-heap (`large`) for numbers above the median.",
      },
      {
        keywordOrMethod: "small = self.small / large = self.large",
        plainEnglishExplanation:
          "Creates local alias references to the lists stored on `self`.",
        exampleSnippet:
          "class Bag:\n    def __init__(self):\n        self.items = []\n    def put(self, x):\n        it = self.items\n        it.append(x)\nb = Bag()\nb.put(10)\nprint(b.items)",
        whyWeUseItHere: "Keeps heap operation lines shorter and cleaner.",
      },
      {
        keywordOrMethod: "len(small) == len(large) or len(small) == len(large) + 1",
        plainEnglishExplanation:
          "Maintains size balance between the two heaps so `small` holds at most one more element than `large`.",
        exampleSnippet:
          "s, l = [3, 2], [5]\nprint(len(s) - len(l))",
        whyWeUseItHere:
          "Keeps the median values always at the top of the two heaps.",
      },
      {
        keywordOrMethod: "(-small[0] + large[0]) / 2.0",
        plainEnglishExplanation:
          "Computes the floating-point average of the two middle elements when the total count of numbers is even.",
        exampleSnippet: "print((-(-2) + 3) / 2.0)",
        whyWeUseItHere:
          "For an even number of elements, the median is the average of the maximum of the lower half and minimum of the upper half.",
      },
    ],
    visualizerType: "heap",
    visualization: {
      input: {
        operations: ["MedianFinder", "add_num", "add_num", "find_median", "add_num", "find_median"],
        arguments: [[], [1], [2], [], [3], []],
      },
      heaps: ["small", "large"],
      focus: ["num", "small", "large"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture a seesaw. On the left side, you put all the smaller numbers in a bag where the biggest one sits at the top (a max-heap). On the right side, you put all the larger numbers in a bag where the smallest one sits at the top (a min-heap). You keep both bags equal in size (or left has 1 more). The two middle numbers in the entire dataset are now sitting right next to each other at the openings of the two bags! Finding the median takes no search at all: just look at the two bag openings.",
      edgeCases: [
        "Single number added: `small` holds 1 element, `large` holds 0. Median is that single number.",
        "Two numbers added: median is their average.",
        "Duplicate numbers: heaps handle duplicates naturally without any special logic.",
        "Negative numbers: negation in max-heap works correctly with negative numbers (-(-5) = 5).",
      ],
      stepByStepWalkthrough: [
        "In `__init__`, initialize two heaps: `self.small` (max-heap for lower half) and `self.large` (min-heap for upper half).",
        "In `add_num(num)`, push `-num` to `self.small`.",
        "If the largest value in `small` exceeds the smallest value in `large`, move it: pop from `small`, negate, and push to `large`.",
        "Balance sizes: if `len(self.small) > len(self.large) + 1`, pop from `small` and push to `large`.",
        "If `len(self.large) > len(self.small)`, pop from `large` and push negated to `small`.",
        "In `find_median()`, if `small` has more elements than `large`, return `float(-small[0])`.",
        "Otherwise, return `(-small[0] + large[0]) / 2.0`.",
      ],
    },
    hints: {
      conceptual:
        "To find the median, you only ever need to inspect the middle one or two numbers. Can you divide numbers into a lower half and an upper half?",
      structural:
        "Use two heaps: a max-heap `small` for the smaller half and a min-heap `large` for the larger half. Maintain the invariant that every element in `small` is <= every element in `large`, with sizes balanced to within 1.",
    },
    commonMistakes: [
      "Keeping all numbers in a single list and sorting every time `find_median` is called (O(n log n) per query).",
      "Forgetting to negate values when using Python's `heapq` as a max-heap.",
      "Allowing `large` to grow larger than `small`: keeping `len(small) >= len(large)` simplifies the median lookup.",
    ],
    starterCode: `class MedianFinder:
    def __init__(self):
        # Initialize two heaps: max-heap for lower half, min-heap for upper half
        pass

    def add_num(self, num: int) -> None:
        # Add num to the data structure and keep heaps balanced
        pass

    def find_median(self) -> float:
        # Return current median as a float
        pass
`,
    optimalSolution: `import heapq


class MedianFinder:
    def __init__(self):
        # max-heap for the smaller half (values stored negated)
        self.small = []
        # min-heap for the larger half
        self.large = []

    def add_num(self, num: int) -> None:
        small = self.small
        large = self.large

        # Push to small (max-heap) first
        heapq.heappush(small, -num)

        # Ensure every element in small <= every element in large
        if small and large and (-small[0] > large[0]):
            val = -heapq.heappop(small)
            heapq.heappush(large, val)

        # Balance sizes so small has at most 1 more element than large
        if len(small) > len(large) + 1:
            val = -heapq.heappop(small)
            heapq.heappush(large, val)
        elif len(large) > len(small):
            val = heapq.heappop(large)
            heapq.heappush(small, -val)

    def find_median(self) -> float:
        small = self.small
        large = self.large

        # Odd total: top of small is the median
        if len(small) > len(large):
            return float(-small[0])
        # Even total: average of the two middle elements
        return (-small[0] + large[0]) / 2.0
`,
    bruteForceSolution: `class MedianFinder:
    def __init__(self):
        self.nums = []

    def add_num(self, num: int) -> None:
        self.nums.append(num)

    def find_median(self) -> float:
        # Sort on every query: O(n log n)
        s = sorted(self.nums)
        n = len(s)
        if n % 2 == 1:
            return float(s[n // 2])
        return (s[n // 2 - 1] + s[n // 2]) / 2.0
`,
    harness: { kind: "design", entry: "MedianFinder" },
    testCases: [
      {
        input: {
          operations: [
            "MedianFinder",
            "add_num",
            "add_num",
            "find_median",
            "add_num",
            "find_median",
          ],
          arguments: [[], [1], [2], [], [3], []],
        },
        expected: [null, null, null, 1.5, null, 2.0],
        description:
          "After adding 1 and 2, median is (1 + 2) / 2 = 1.5. After adding 3, median is 2.0.",
      },
      {
        input: {
          operations: ["MedianFinder", "add_num", "find_median"],
          arguments: [[], [5], []],
        },
        expected: [null, null, 5.0],
        description: "Single element median is the element itself as float.",
      },
      {
        input: {
          operations: [
            "MedianFinder",
            "add_num",
            "add_num",
            "add_num",
            "add_num",
            "find_median",
          ],
          arguments: [[], [6], [10], [2], [8], []],
        },
        expected: [null, null, null, null, null, 7.0],
        description: "Numbers [2, 6, 8, 10]: median is (6 + 8) / 2 = 7.0.",
      },
      {
        input: {
          operations: [
            "MedianFinder",
            "add_num",
            "add_num",
            "find_median",
            "add_num",
            "find_median",
          ],
          arguments: [[], [-1], [-2], [], [-3], []],
        },
        expected: [null, null, null, -1.5, null, -2.0],
      },
      {
        input: {
          operations: ["MedianFinder", "add_num", "add_num", "add_num", "find_median"],
          arguments: [[], [0], [0], [0], []],
        },
        expected: [null, null, null, null, 0.0],
      },
      {
        input: {
          operations: [
            "MedianFinder",
            "add_num",
            "add_num",
            "add_num",
            "add_num",
            "add_num",
            "find_median",
          ],
          arguments: [[], [5], [2], [8], [1], [9], []],
        },
        expected: [null, null, null, null, null, null, 5.0],
      },
    ],
  },
];

export default problems;
