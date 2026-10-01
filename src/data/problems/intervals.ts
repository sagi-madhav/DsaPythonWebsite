import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ insert-interval
  {
    id: "insert-interval",
    summary:
      "You are given a list of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given another interval `new_interval = [start, end]`. Insert `new_interval` into `intervals` such that the list is still sorted by start time and contains **no overlapping intervals** (merging overlapping intervals if necessary). Return the resulting list.",
    constraints: [
      "0 ≤ len(intervals) ≤ 10,000",
      "intervals[i].length == 2",
      "new_interval.length == 2",
      "0 ≤ start_i ≤ end_i ≤ 100,000",
      "intervals is sorted by start_i in ascending order",
    ],
    pattern: "Three-phase linear scan: intervals before, overlapping intervals merged, intervals after",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n)",
      explanation:
        "Since `intervals` is already sorted by start time, we can walk through it once in three sequential phases: adding intervals before, merging overlaps, and adding intervals after. Each interval is visited once, taking O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "We build a new result list `res` to hold the output intervals, which requires O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "intervals[i][0] / intervals[i][1]",
        plainEnglishExplanation:
          "In a 2D list where each item is a pair `[start, end]`, `[0]` accesses the start time and `[1]` accesses the end time of the `i`-th interval.",
        exampleSnippet: "pair = [3, 7]\nprint(pair[0])\nprint(pair[1])",
        whyWeUseItHere:
          "We compare start and end times to detect whether intervals overlap with `new_interval`.",
      },
      {
        keywordOrMethod: "new_interval[0] = min(new_interval[0], intervals[i][0])",
        plainEnglishExplanation:
          "`min(a, b)` takes the smaller start time, and `max(a, b)` takes the larger end time, expanding `new_interval` to encompass the overlapping interval.",
        exampleSnippet: "new_int = [4, 8]\ncurr = [2, 5]\nnew_int[0] = min(new_int[0], curr[0])\nnew_int[1] = max(new_int[1], curr[1])\nprint(new_int)",
        whyWeUseItHere:
          "When two intervals overlap, their merged interval spans from the earliest start to the latest end.",
      },
      {
        keywordOrMethod: "res.append(new_interval)",
        plainEnglishExplanation:
          "`.append()` places an element at the end of the list `res`.",
        exampleSnippet: "res = [[1, 2]]\nres.append([3, 5])\nprint(res)",
        whyWeUseItHere:
          "Once all overlapping intervals are merged into `new_interval`, we append it into its correct position.",
      },
      {
        keywordOrMethod: "def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:",
        plainEnglishExplanation:
          "`def` defines the function taking a list of interval pairs `intervals` and a single interval pair `new_interval`, returning the merged list of interval pairs.",
        exampleSnippet: "def first(items: list[list[int]]) -> list[int]:\n    return items[0]\n\nprint(first([[1, 2], [3, 4]]))",
        whyWeUseItHere:
          "The required function signature called by the automated test harness.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { intervals: [[1, 3], [6, 9]], new_interval: [2, 5] },
      pointers: { intervals: ["i"] },
      focus: ["intervals", "new_interval", "res", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of existing intervals as train stops along a railway line. When a new express route `new_interval` is introduced, it divides the railway into three zones: (1) Stops that finish completely before the new route starts — these are untouched and kept as is. (2) Stops that overlap with the new route — these must be merged together into one big combined route stretching from the earliest start to the latest end. (3) Stops that start completely after the new route ends — these are untouched and appended after the new route.",
      edgeCases: [
        "Empty `intervals = []`: simply return `[new_interval]`.",
        "`new_interval` comes before all existing intervals: inserted at the very front with no merges.",
        "`new_interval` comes after all existing intervals: inserted at the very end with no merges.",
        "`new_interval` overlaps and absorbs all existing intervals: returns a single large merged interval.",
      ],
      stepByStepWalkthrough: [
        "Initialize an empty result list `res = []` and pointer `i = 0`.",
        "Phase 1: While `i < len(intervals)` and `intervals[i][1] < new_interval[0]`, append `intervals[i]` to `res` (it ends before `new_interval` begins) and increment `i`.",
        "Phase 2: While `i < len(intervals)` and `intervals[i][0] <= new_interval[1]`, they overlap! Merge them by setting `new_interval[0] = min(new_interval[0], intervals[i][0])` and `new_interval[1] = max(new_interval[1], intervals[i][1])`, and increment `i`.",
        "Append the merged `new_interval` to `res`.",
        "Phase 3: While `i < len(intervals)`, append the remaining intervals to `res` and increment `i`.",
        "Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "Because the intervals are already sorted, you can process them in three natural stages: those that end before the new interval starts, those that overlap with it, and those that start after it ends.",
      structural:
        "Use an index `i = 0` and a list `res = []`. Three sequential `while` loops handle the three phases: (1) `intervals[i][1] < new_interval[0]`, (2) `intervals[i][0] <= new_interval[1]`, and (3) the rest.",
    },
    commonMistakes: [
      "Re-sorting the array using O(n log n) sorting instead of taking advantage of the already sorted input.",
      "Forgetting to append `new_interval` if it belongs at the very end of the list.",
      "Using `<` instead of `<=` when detecting overlaps: intervals `[1, 2]` and `[2, 3]` share point 2 and ARE considered overlapping.",
    ],
    starterCode: `def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    # Insert new_interval into sorted non-overlapping intervals and merge overlaps.
    # Tip: process intervals in three phases: before, overlapping, and after.
    pass
`,
    optimalSolution: `def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    res = []
    i = 0
    n = len(intervals)

    # Phase 1: Add all intervals that come strictly before new_interval
    while i < n and intervals[i][1] < new_interval[0]:
        res.append(intervals[i])
        i += 1

    # Phase 2: Merge all overlapping intervals into new_interval
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1

    # Add the merged new_interval to our result
    res.append(new_interval)

    # Phase 3: Add all remaining intervals that come strictly after
    while i < n:
        res.append(intervals[i])
        i += 1

    return res
`,
    bruteForceSolution: `def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    # Append and sort all intervals, then merge
    all_intervals = intervals + [new_interval]
    all_intervals.sort(key=lambda x: x[0])
    res = []
    for interval in all_intervals:
        if not res or res[-1][1] < interval[0]:
            res.append(interval)
        else:
            res[-1][1] = max(res[-1][1], interval[1])
    return res
`,
    harness: { kind: "function", entry: "insert" },
    testCases: [
      {
        input: { intervals: [[1, 3], [6, 9]], new_interval: [2, 5] },
        expected: [[1, 5], [6, 9]],
        description: "new_interval [2, 5] overlaps with [1, 3], merging into [1, 5].",
      },
      {
        input: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], new_interval: [4, 8] },
        expected: [[1, 2], [3, 10], [12, 16]],
        description: "[4, 8] overlaps with [3, 5], [6, 7], and [8, 10], merging them all into [3, 10].",
      },
      {
        input: { intervals: [], new_interval: [5, 7] },
        expected: [[5, 7]],
        description: "Inserting into an empty list produces a list with just the new interval.",
      },
      {
        input: { intervals: [[1, 5]], new_interval: [2, 3] },
        expected: [[1, 5]],
        description: "new_interval is completely inside an existing interval.",
      },
      {
        input: { intervals: [[1, 5]], new_interval: [6, 8] },
        expected: [[1, 5], [6, 8]],
        description: "new_interval comes completely after existing intervals.",
      },
      {
        input: { intervals: [[1, 5]], new_interval: [0, 0] },
        expected: [[0, 0], [1, 5]],
        description: "new_interval comes completely before existing intervals.",
      },
      {
        input: { intervals: [[1, 5]], new_interval: [0, 6] },
        expected: [[0, 6]],
        description: "new_interval completely covers the existing interval.",
      },
    ],
  },

  // ------------------------------------------------------------------ merge-intervals
  {
    id: "merge-intervals",
    summary:
      "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the **non-overlapping intervals** that cover all the intervals in the input.",
    constraints: [
      "1 ≤ len(intervals) ≤ 10,000",
      "intervals[i].length == 2",
      "0 ≤ start_i ≤ end_i ≤ 10,000",
    ],
    pattern: "Sort intervals by start time and greedily merge adjacent overlapping intervals",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n log n)",
      explanation:
        "Sorting the list of n intervals takes O(n log n). Merging them in a single pass takes O(n) because each interval is visited once and either appended or merged with the previous one. Total time is O(n log n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In Python, sorting takes O(n) space and the result list `merged` requires up to O(n) space to store the non-overlapping intervals.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "intervals.sort(key=lambda x: x[0])",
        plainEnglishExplanation:
          "Sorts the list of intervals by each interval's first element (`start` time). `lambda x: x[0]` is a tiny inline function saying 'extract index 0'.",
        exampleSnippet: "pairs = [[3, 1], [1, 9], [2, 4]]\npairs.sort(key=lambda x: x[0])\nprint(pairs)",
        whyWeUseItHere:
          "Sorting by start time ensures that any intervals that could possibly overlap appear adjacent to each other.",
      },
      {
        keywordOrMethod: "merged[-1]",
        plainEnglishExplanation:
          "`list[-1]` retrieves the very last element in the list without removing it.",
        exampleSnippet: "items = ['first', 'second', 'last']\nprint(items[-1])",
        whyWeUseItHere:
          "We compare each new interval with the last interval currently added to our merged result.",
      },
      {
        keywordOrMethod: "merged[-1][1] = max(merged[-1][1], interval[1])",
        plainEnglishExplanation:
          "Extends the end time of the last merged interval to whichever end time reaches further to the right.",
        exampleSnippet: "box = [[1, 4]]\nbox[-1][1] = max(box[-1][1], 7)\nprint(box)",
        whyWeUseItHere:
          "When two intervals overlap, their union ends at the maximum of their two end times.",
      },
      {
        keywordOrMethod: "def merge(intervals: list[list[int]]) -> list[list[int]]:",
        plainEnglishExplanation:
          "`def` defines the function taking a list of intervals and returning the merged non-overlapping list.",
        exampleSnippet: "def identity(items: list[list[int]]) -> list[list[int]]:\n    return items\n\nprint(identity([[1, 2]]))",
        whyWeUseItHere:
          "Standard function entry point called by the test runner.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
      pointers: { intervals: ["i"] },
      focus: ["intervals", "merged", "interval", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a schedule of events. If you sort all events by their start times, you only ever need to check whether the *current* event starts before the *previous* event finishes. If it starts before the previous one ends, they overlap, so you extend the end of the previous event to cover both. If it starts after the previous event finishes, there is a clean gap, so you start a new separate event block.",
      edgeCases: [
        "Intervals that touch at a single point (e.g. `[1, 4]` and `[4, 5]`): since end equals start, they overlap and merge to `[1, 5]`.",
        "One interval completely inside another (e.g. `[1, 10]` and `[2, 3]`): merged into `[1, 10]`.",
        "Input with already non-overlapping intervals: the output matches the input.",
      ],
      stepByStepWalkthrough: [
        "Sort `intervals` in ascending order by their start times (`key=lambda x: x[0]`).",
        "Initialize an empty list `merged = []`.",
        "Iterate through each index `i` in `range(len(intervals))` with `interval = intervals[i]`:",
        "If `merged` is empty, or if `interval[0] > merged[-1][1]`, there is no overlap: append `interval` to `merged`.",
        "Otherwise, they overlap: update `merged[-1][1] = max(merged[-1][1], interval[1])`.",
        "Return `merged`.",
      ],
    },
    hints: {
      conceptual:
        "If the intervals were sorted chronologically by start time, where could an interval possibly overlap? Could it overlap with something far ahead, or only with its immediate neighbor?",
      structural:
        "Sort `intervals` by `x[0]`. Initialize `merged = []`. Loop through each `interval` in `intervals`: if `not merged or merged[-1][1] < interval[0]`, append it. Otherwise, set `merged[-1][1] = max(merged[-1][1], interval[1])`.",
    },
    commonMistakes: [
      "Not sorting before merging: without sorting, overlapping intervals can be separated and missed.",
      "Updating the end time to `interval[1]` instead of `max(merged[-1][1], interval[1])`, which breaks when a longer interval engulfs a shorter one.",
      "Treating intervals that touch at endpoints (`[1, 4]` and `[4, 5]`) as non-overlapping when the problem specifies they should be merged.",
    ],
    starterCode: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    # Merge all overlapping intervals and return the non-overlapping result.
    # Tip: sort by start time, then merge each interval with the previous one if they overlap.
    pass
`,
    optimalSolution: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    # Sort intervals by their start times
    intervals.sort(key=lambda x: x[0])
    merged = []

    for i in range(len(intervals)):
        interval = intervals[i]
        # If merged is empty or current interval doesn't overlap with the previous one
        if not merged or merged[-1][1] < interval[0]:
            # No overlap: start a new interval in merged
            merged.append(interval)
        else:
            # Overlap: extend the end time of the previous interval
            merged[-1][1] = max(merged[-1][1], interval[1])

    return merged
`,
    bruteForceSolution: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    # Repeatedly find any two overlapping intervals and combine them
    intervals.sort(key=lambda x: x[0])
    res = []
    for cur in intervals:
        if not res or res[-1][1] < cur[0]:
            res.append(cur)
        else:
            res[-1][1] = max(res[-1][1], cur[1])
    return res
`,
    harness: { kind: "function", entry: "merge" },
    testCases: [
      {
        input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
        expected: [[1, 6], [8, 10], [15, 18]],
        description: "Intervals [1, 3] and [2, 6] overlap, merging into [1, 6].",
      },
      {
        input: { intervals: [[1, 4], [4, 5]] },
        expected: [[1, 5]],
        description: "Intervals [1, 4] and [4, 5] touch at 4, so they are considered overlapping and merged into [1, 5].",
      },
      {
        input: { intervals: [[1, 4], [2, 3]] },
        expected: [[1, 4]],
        description: "[2, 3] is completely contained within [1, 4].",
      },
      {
        input: { intervals: [[1, 4], [0, 4]] },
        expected: [[0, 4]],
        description: "Unsorted input is handled correctly by sorting first.",
      },
      { input: { intervals: [[1, 4], [0, 0]] }, expected: [[0, 0], [1, 4]] },
      { input: { intervals: [[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]] }, expected: [[1, 10]] },
      { input: { intervals: [[1, 4], [5, 6]] }, expected: [[1, 4], [5, 6]] },
    ],
  },

  // ------------------------------------------------------------------ non-overlapping-intervals
  {
    id: "non-overlapping-intervals",
    summary:
      "Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of intervals** you need to remove to make the rest of the intervals non-overlapping. Intervals that touch at a single point (such as `[1, 2]` and `[2, 3]`) do not overlap.",
    constraints: [
      "1 ≤ len(intervals) ≤ 100,000",
      "intervals[i].length == 2",
      "-50,000 ≤ start_i < end_i ≤ 50,000",
    ],
    pattern: "Greedy interval scheduling: sort by start time and keep the interval that ends earlier",
    timeComplexity: {
      bruteForce: "O(2ⁿ)",
      optimal: "O(n log n)",
      explanation:
        "Sorting the n intervals takes O(n log n). Then we iterate through the sorted intervals once in O(n) time, making a constant number of comparisons per interval. Overall time complexity is O(n log n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a few scalar variables (`prev_end`, `removals`) are stored, using O(1) extra space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "intervals.sort(key=lambda x: x[0])",
        plainEnglishExplanation:
          "Sorts the intervals in-place by their start times.",
        exampleSnippet: "ints = [[1, 4], [2, 3], [3, 4]]\nints.sort(key=lambda x: x[0])\nprint(ints)",
        whyWeUseItHere:
          "Ordering intervals chronologically allows us to examine conflicts sequentially.",
      },
      {
        keywordOrMethod: "prev_end = min(prev_end, intervals[i][1])",
        plainEnglishExplanation:
          "When two intervals overlap, keeping the one with the smaller end time leaves the most room for future intervals, minimizing subsequent conflicts.",
        exampleSnippet: "end1 = 5\nend2 = 3\nkept_end = min(end1, end2)\nprint(kept_end)",
        whyWeUseItHere:
          "Greedily keeps the interval that ends earlier and counts the other one as removed.",
      },
      {
        keywordOrMethod: "removals += 1",
        plainEnglishExplanation:
          "Increments the removal counter by 1 whenever an overlap conflict must be resolved.",
        exampleSnippet: "count = 0\ncount += 1\nprint(count)",
        whyWeUseItHere:
          "Counts the total number of intervals that had to be discarded.",
      },
      {
        keywordOrMethod: "def erase_overlap_intervals(intervals: list[list[int]]) -> int:",
        plainEnglishExplanation:
          "`def` defines the function taking a list of intervals and returning an integer count of removals.",
        exampleSnippet: "def count_removals(items: list[list[int]]) -> int:\n    return len(items) - 1\n\nprint(count_removals([[1, 2], [2, 3]]))",
        whyWeUseItHere:
          "The required function signature for the automated test harness.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] },
      pointers: { intervals: ["i"] },
      focus: ["intervals", "prev_end", "removals", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you are scheduling talks in a single auditorium and want to fit as many talks as possible without clashes (which is equivalent to removing the fewest talks). When two talks overlap, which one should you cancel? Always cancel the one that finishes LATER! The talk that finishes earlier frees up the room sooner, giving all future talks the greatest chance of fitting in without further conflicts.",
      edgeCases: [
        "No overlapping intervals: returns 0 removals.",
        "All intervals identical (e.g. `[[1, 2], [1, 2], [1, 2]]`): must remove all except one, so returns 2.",
        "Touching intervals `[1, 2]` and `[2, 3]`: problem says touching at a point does NOT count as overlapping, so returns 0.",
      ],
      stepByStepWalkthrough: [
        "If `intervals` is empty, return 0.",
        "Sort `intervals` by their start time (`key=lambda x: x[0]`).",
        "Set `removals = 0` and `prev_end = intervals[0][1]`.",
        "Iterate through the rest of the intervals from index 1:",
        "If `intervals[i][0] < prev_end`, there is an overlap: increment `removals += 1` and update `prev_end = min(prev_end, intervals[i][1])` (greedily keeping the interval that finishes earlier).",
        "Otherwise (`intervals[i][0] >= prev_end`), there is no overlap: update `prev_end = intervals[i][1]`.",
        "Return `removals`.",
      ],
    },
    hints: {
      conceptual:
        "To remove the fewest intervals, you want to keep the maximum number of non-overlapping intervals. When two intervals overlap, which one is better to discard: the one that finishes earlier or the one that finishes later?",
      structural:
        "Sort `intervals` by start time. Track `prev_end = intervals[0][1]`. Loop `for i in range(1, len(intervals)):`: if `intervals[i][0] < prev_end`, increment `removals` and set `prev_end = min(prev_end, intervals[i][1])`. Otherwise, set `prev_end = intervals[i][1]`.",
    },
    commonMistakes: [
      "Treating intervals that share an endpoint (like `[1, 2]` and `[2, 3]`) as overlapping. The problem states they do not overlap (`start >= prev_end` is valid).",
      "Forgetting to update `prev_end` to `min(prev_end, intervals[i][1])` upon an overlap, which fails to simulate discarding the longer interval.",
      "Sorting by start time but not updating `prev_end` on removals.",
    ],
    starterCode: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    # Return the minimum number of intervals to remove to make the rest non-overlapping.
    # Tip: sort intervals and greedily keep the interval that ends earlier.
    pass
`,
    optimalSolution: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    # An empty or single-interval list has no overlaps
    if not intervals:
        return 0

    # Sort intervals by their start times
    intervals.sort(key=lambda x: x[0])
    removals = 0
    # Track the end time of the most recently kept interval
    prev_end = intervals[0][1]

    for i in range(1, len(intervals)):
        # If current interval starts before the previous one ends, they overlap
        if intervals[i][0] < prev_end:
            # We must remove one interval to resolve the conflict
            removals += 1
            # Greedily keep the interval that ends earlier to minimize future conflicts
            prev_end = min(prev_end, intervals[i][1])
        else:
            # No overlap: keep the current interval and update prev_end
            prev_end = intervals[i][1]

    return removals
`,
    bruteForceSolution: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    # Sort by end time: standard greedy interval scheduling
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[1])
    count = 1
    end = intervals[0][1]
    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:
            count += 1
            end = intervals[i][1]
    return len(intervals) - count
`,
    harness: { kind: "function", entry: "erase_overlap_intervals" } ,
    testCases: [
      {
        input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] },
        expected: 1,
        description: "Removing [1, 3] leaves [1, 2], [2, 3], [3, 4] non-overlapping.",
      },
      {
        input: { intervals: [[1, 2], [1, 2], [1, 2]] },
        expected: 2,
        description: "You need to remove two [1, 2] to leave one remaining.",
      },
      {
        input: { intervals: [[1, 2], [2, 3]] },
        expected: 0,
        description: "Intervals [1, 2] and [2, 3] touch at 2, which does not count as overlapping.",
      },
      { input: { intervals: [[1, 100], [11, 22], [1, 11], [2, 12]] }, expected: 2 },
      { input: { intervals: [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]] }, expected: 2 },
      { input: { intervals: [[1, 5], [2, 3], [3, 4]] }, expected: 1 },
      { input: { intervals: [[-52, 31], [-73, -26], [82, 97], [-65, -11], [-62, -49], [95, 99], [58, 95], [-97, -81]] }, expected: 4 },
    ],
  },

  // ------------------------------------------------------------------ meeting-rooms
  {
    id: "meeting-rooms",
    summary:
      "Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, determine if a person could **attend all meetings** without any overlapping. A meeting ending at time `t` does not conflict with a meeting starting at time `t`.",
    constraints: [
      "0 ≤ len(intervals) ≤ 10,000",
      "intervals[i].length == 2",
      "0 ≤ start_i < end_i ≤ 1,000,000",
    ],
    pattern: "Sort intervals by start time and check for any overlap between consecutive meetings",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n log n)",
      explanation:
        "Brute force compares every pair of meetings for an overlap, taking O(n²). Sorting the meetings by start time takes O(n log n). After sorting, we only need to compare each meeting with the one right after it in O(n) time, so the total time is O(n log n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "No extra data structures are created; we only compare adjacent elements after sorting.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "intervals.sort(key=lambda x: x[0])",
        plainEnglishExplanation:
          "Sorts the meetings by their starting time in ascending order.",
        exampleSnippet: "meetings = [[9, 10], [1, 3], [4, 6]]\nmeetings.sort(key=lambda x: x[0])\nprint(meetings)",
        whyWeUseItHere:
          "Once sorted chronologically, any schedule conflict must happen between adjacent meetings in the list.",
      },
      {
        keywordOrMethod: "intervals[i][0] < intervals[i - 1][1]",
        plainEnglishExplanation:
          "Checks if meeting `i` starts *before* meeting `i - 1` has finished.",
        exampleSnippet: "prev_meeting = [1, 5]\ncurr_meeting = [4, 8]\nprint(curr_meeting[0] < prev_meeting[1])",
        whyWeUseItHere:
          "If the next meeting starts before the previous one ends, you cannot attend both.",
      },
      {
        keywordOrMethod: "return True / return False",
        plainEnglishExplanation:
          "Boolean return values. Returns `False` as soon as any conflict is detected; returns `True` if no conflicts occur.",
        exampleSnippet: "def can_attend(overlap: bool) -> bool:\n    return not overlap\n\nprint(can_attend(False))",
        whyWeUseItHere:
          "The problem asks for a boolean answer indicating whether all meetings can be attended.",
      },
      {
        keywordOrMethod: "def can_attend_meetings(intervals: list[list[int]]) -> bool:",
        plainEnglishExplanation:
          "`def` defines the function taking a list of meeting intervals and returning a boolean.",
        exampleSnippet: "def is_empty(items: list[list[int]]) -> bool:\n    return len(items) == 0\n\nprint(is_empty([]))\nprint(is_empty([[1, 2]]))",
        whyWeUseItHere:
          "Entry point function called by the test runner.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { intervals: [[0, 30], [5, 10], [15, 20]] },
      pointers: { intervals: ["i"] },
      focus: ["intervals", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of your personal calendar. If you sort all appointments chronologically, you only need to verify that each appointment starts after the previous one finishes. If any meeting starts while the previous one is still in progress, you have a schedule conflict and cannot attend both!",
      edgeCases: [
        "No meetings (`[]`) or one meeting (`[[7, 10]]`): impossible to have a conflict, returns `True`.",
        "Back-to-back meetings (`[[1, 5], [5, 10]]`): meeting finishes exactly when the next starts, which is allowed, so returns `True`.",
        "Multiple overlapping meetings: returns `False` as soon as the first conflict is spotted.",
      ],
      stepByStepWalkthrough: [
        "Sort `intervals` by their start time (`key=lambda x: x[0]`).",
        "Loop `i` from 1 to `len(intervals) - 1`.",
        "For each meeting at index `i`, check if `intervals[i][0] < intervals[i - 1][1]`.",
        "If it starts before the previous meeting ends, return `False` immediately.",
        "If the loop finishes with no conflicts found, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "If you arrange all meetings in chronological order by start time, which meetings can possibly conflict with each other?",
      structural:
        "Sort `intervals` by `x[0]`. Loop `for i in range(1, len(intervals)):` and check `if intervals[i][0] < intervals[i - 1][1]: return False`. Return `True` after the loop.",
    },
    commonMistakes: [
      "Using `<=` instead of `<`: a meeting ending at 10 and another starting at 10 do NOT overlap.",
      "Not sorting the intervals first: two conflicting meetings might not be adjacent in the original input.",
      "Returning `True` too early inside the loop before checking all subsequent meetings.",
    ],
    starterCode: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    # Determine if a person could attend all meetings without overlap.
    # Tip: sort meetings by start time and check if any meeting starts before the previous ends.
    pass
`,
    optimalSolution: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    # Sort the meetings in chronological order by start time
    intervals.sort(key=lambda x: x[0])

    # Check each meeting against the one immediately before it
    for i in range(1, len(intervals)):
        # If the current meeting starts before the previous meeting ends
        if intervals[i][0] < intervals[i - 1][1]:
            # Conflict detected: cannot attend both
            return False

    # No overlapping meetings found
    return True
`,
    bruteForceSolution: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    # Compare every pair of meetings
    n = len(intervals)
    for i in range(n):
        for j in range(i + 1, n):
            # Two intervals overlap if max(start1, start2) < min(end1, end2)
            if max(intervals[i][0], intervals[j][0]) < min(intervals[i][1], intervals[j][1]):
                return False
    return True
`,
    harness: { kind: "function", entry: "can_attend_meetings" },
    testCases: [
      {
        input: { intervals: [[0, 30], [5, 10], [15, 20]] },
        expected: false,
        description: "Meeting [0, 30] overlaps with [5, 10] and [15, 20].",
      },
      {
        input: { intervals: [[7, 10], [2, 4]] },
        expected: true,
        description: "The meetings [2, 4] and [7, 10] do not overlap.",
      },
      {
        input: { intervals: [] },
        expected: true,
        description: "With 0 meetings, there are no conflicts.",
      },
      {
        input: { intervals: [[1, 5], [5, 8]] },
        expected: true,
        description: "Back-to-back meetings at time 5 do not overlap.",
      },
      {
        input: { intervals: [[1, 5], [4, 6]] },
        expected: false,
        description: "Meeting starts at 4 while previous ends at 5, causing a conflict.",
      },
      { input: { intervals: [[1, 2], [2, 3], [3, 4], [4, 5]] }, expected: true },
      { input: { intervals: [[13, 15], [1, 13]] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ meeting-rooms-ii
  {
    id: "meeting-rooms-ii",
    summary:
      "Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of conference rooms** required to hold all meetings. A meeting ending at time `t` frees up its room for another meeting starting at time `t`.",
    constraints: [
      "1 ≤ len(intervals) ≤ 10,000",
      "0 ≤ start_i < end_i ≤ 1,000,000",
    ],
    pattern: "Chronological events: two sorted arrays of start and end times with two pointers",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n log n)",
      explanation:
        "Extracting and sorting the start times and end times each takes O(n log n). Then we walk both arrays using two pointers in O(n) total steps. The overall time complexity is O(n log n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "We store two lists of length n for the separated start times and end times, taking O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "start_times = sorted([i[0] for i in intervals])",
        plainEnglishExplanation:
          "A list comprehension that extracts the start time of every meeting and sorts them in ascending order.",
        exampleSnippet: "ints = [[5, 10], [1, 3], [2, 6]]\nstarts = sorted([x[0] for x in ints])\nprint(starts)",
        whyWeUseItHere:
          "Separating start times from end times lets us process meeting beginnings and endings as independent events in chronological order.",
      },
      {
        keywordOrMethod: "end_times = sorted([i[1] for i in intervals])",
        plainEnglishExplanation:
          "A list comprehension that extracts the end time of every meeting and sorts them in ascending order.",
        exampleSnippet: "ints = [[5, 10], [1, 3], [2, 6]]\nends = sorted([x[1] for x in ints])\nprint(ends)",
        whyWeUseItHere:
          "Sorting end times tells us when the earliest currently occupied room becomes free.",
      },
      {
        keywordOrMethod: "count += 1 / count -= 1",
        plainEnglishExplanation:
          "Tracks the number of rooms currently in use. Increment when a meeting begins; decrement when a meeting finishes.",
        exampleSnippet: "active = 0\nactive += 1  # meeting starts\nactive -= 1  # meeting ends\nprint(active)",
        whyWeUseItHere:
          "The peak value of `count` is the minimum number of rooms needed.",
      },
      {
        keywordOrMethod: "def min_meeting_rooms(intervals: list[list[int]]) -> int:",
        plainEnglishExplanation:
          "`def` defines the function taking a list of meeting intervals and returning the minimum integer count of rooms required.",
        exampleSnippet: "def count_rooms(meetings: list[list[int]]) -> int:\n    return len(meetings)\n\nprint(count_rooms([[1, 2], [3, 4]]))",
        whyWeUseItHere:
          "The function signature required by the test runner.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { intervals: [[0, 30], [5, 10], [15, 20]] },
      pointers: { start_times: ["s_ptr"], end_times: ["e_ptr"] },
      focus: ["intervals", "start_times", "end_times", "s_ptr", "e_ptr", "count", "max_rooms"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of conference rooms like cars in a parking lot. Every time a meeting starts, a car enters the lot (`count += 1`). Every time a meeting ends, a car leaves the lot (`count -= 1`). By sorting all start times and all end times separately, we can simply walk forward in time: if the next event is a meeting starting before the earliest meeting ends, we need another room. If a meeting ends before or at the same time the next starts, that room is freed up (`count -= 1`). The peak number of cars in the lot at any one time is the exact number of rooms needed!",
      edgeCases: [
        "No overlapping meetings: at most 1 room is ever in use, returns 1.",
        "All meetings overlap at the same time: requires `len(intervals)` rooms.",
        "A meeting starts at the exact same minute another finishes (e.g. `[1, 5]` and `[5, 10]`): the ending happens first or concurrently, so the same room can be reused without needing a 2nd room.",
      ],
      stepByStepWalkthrough: [
        "Extract all start times and sort them: `start_times = sorted([i[0] for i in intervals])`.",
        "Extract all end times and sort them: `end_times = sorted([i[1] for i in intervals])`.",
        "Initialize `s_ptr = 0`, `e_ptr = 0`, `count = 0`, and `max_rooms = 0`.",
        "While `s_ptr < len(intervals)`:",
        "If `start_times[s_ptr] < end_times[e_ptr]`: a meeting starts before any room is freed, so increment `count += 1` and advance `s_ptr += 1`.",
        "Otherwise (`start_times[s_ptr] >= end_times[e_ptr]`): a meeting has ended, freeing a room, so decrement `count -= 1` and advance `e_ptr += 1`.",
        "Update `max_rooms = max(max_rooms, count)`.",
        "Return `max_rooms`.",
      ],
    },
    hints: {
      conceptual:
        "Do you need to know which specific meeting is in which room? Or do you just need to know how many meetings are active at the peak moment in time?",
      structural:
        "Separate the start times and end times into two sorted lists. Use two pointers `s_ptr` and `e_ptr`. If `start_times[s_ptr] < end_times[e_ptr]`, increment your active room count and `s_ptr`. Otherwise, decrement active room count and increment `e_ptr`.",
    },
    commonMistakes: [
      "Thinking that when meeting A finishes and meeting B starts at the same time `t`, you need two rooms. A meeting ending frees its room immediately.",
      "Trying to pair meetings to specific rooms instead of tracking the concurrency count.",
      "Using an O(max_time) array: if meeting times reach 1,000,000, an array of that size is wasteful and slow.",
    ],
    starterCode: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    # Return the minimum number of conference rooms required for all meetings.
    # Tip: sort start times and end times separately to track overlapping meetings.
    pass
`,
    optimalSolution: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0

    # Separate and sort start times and end times independently
    start_times = sorted([interval[0] for interval in intervals])
    end_times = sorted([interval[1] for interval in intervals])

    s_ptr = 0
    e_ptr = 0
    count = 0
    max_rooms = 0

    # Process all start events in chronological order
    while s_ptr < len(intervals):
        # If the next meeting starts before the earliest ongoing meeting ends
        if start_times[s_ptr] < end_times[e_ptr]:
            # A new room is required
            count += 1
            s_ptr += 1
        else:
            # An ongoing meeting has ended, freeing up a room
            count -= 1
            e_ptr += 1

        # Keep track of the peak number of rooms required at any point
        max_rooms = max(max_rooms, count)

    return max_rooms
`,
    bruteForceSolution: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    # Using a min-heap to track active meeting end times
    import heapq
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[0])
    rooms = []  # min-heap of end times
    heapq.heappush(rooms, intervals[0][1])
    for interval in intervals[1:]:
        if rooms[0] <= interval[0]:
            heapq.heappop(rooms)
        heapq.heappush(rooms, interval[1])
    return len(rooms)
`,
    harness: { kind: "function", entry: "min_meeting_rooms" },
    testCases: [
      {
        input: { intervals: [[0, 30], [5, 10], [15, 20]] },
        expected: 2,
        description: "At time 5 to 10, meeting [0, 30] and [5, 10] both require a room. Maximum concurrent rooms needed is 2.",
      },
      {
        input: { intervals: [[7, 10], [2, 4]] },
        expected: 1,
        description: "Meetings do not overlap, so 1 room is sufficient.",
      },
      {
        input: { intervals: [[1, 5], [5, 10]] },
        expected: 1,
        description: "Meeting ending at 5 frees the room immediately for the meeting starting at 5.",
      },
      { input: { intervals: [[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]] }, expected: 4 },
      { input: { intervals: [[6, 17], [8, 9], [15, 19]] }, expected: 2 },
      { input: { intervals: [[13, 15], [1, 13], [6, 9]] }, expected: 2 },
      { input: { intervals: [[1, 4], [2, 5], [3, 6]] }, expected: 3 },
    ],
  },

  // ------------------------------------------------------------------ minimum-interval-to-include-each-query
  {
    id: "minimum-interval-to-include-each-query",
    summary:
      "You are given a 2D integer array `intervals`, where `intervals[i] = [left_i, right_i]` describes the `i`-th interval (with size `right_i - left_i + 1`). You are also given an integer array `queries`. For each query `queries[j]`, find the **size of the smallest interval** `i` such that `left_i <= queries[j] <= right_i`. If no such interval contains the query, the answer is `-1`. Return an array containing the answers to the queries in their original order.",
    constraints: [
      "1 ≤ len(intervals) ≤ 100,000",
      "1 ≤ len(queries) ≤ 100,000",
      "intervals[i].length == 2",
      "1 ≤ left_i ≤ right_i ≤ 10,000,000",
      "1 ≤ queries[j] ≤ 10,000,000",
    ],
    pattern: "Sort intervals and queries, then use a min-heap to track the smallest valid interval size",
    timeComplexity: {
      bruteForce: "O(m × n)",
      optimal: "O(n log n + m log m)",
      explanation:
        "Brute force checks all n intervals for each of the m queries, taking O(m × n) which times out. Sorting intervals takes O(n log n) and sorting queries takes O(m log m). Each interval is pushed and popped from the min-heap at most once in O(log n) time, giving O((n + m) log n + m log m) total time.",
    },
    spaceComplexity: {
      optimal: "O(n + m)",
      explanation:
        "The min-heap stores up to n intervals at a time (O(n)), and the result list stores answers for m queries (O(m)).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "import heapq",
        plainEnglishExplanation:
          "`import heapq` brings in Python's priority queue module. A min-heap keeps the smallest element at the front (`heap[0]`).",
        exampleSnippet: "import heapq\nh = []\nheapq.heappush(h, (3, 'apple'))\nheapq.heappush(h, (1, 'banana'))\nprint(h[0])",
        whyWeUseItHere:
          "A min-heap allows us to instantly retrieve the smallest interval size that covers the current query.",
      },
      {
        keywordOrMethod: "heapq.heappush(min_heap, (size, right))",
        plainEnglishExplanation:
          "Pushes a tuple `(size, right)` onto the heap. Python compares tuples by their first element (`size`), so the shortest interval stays on top.",
        exampleSnippet: "import heapq\nh = []\nheapq.heappush(h, (5, 10))\nheapq.heappush(h, (2, 8))\nprint(h[0][0])",
        whyWeUseItHere:
          "Stores intervals by `(size, right_boundary)` so the shortest interval is always at `min_heap[0]`.",
      },
      {
        keywordOrMethod: "heapq.heappop(min_heap)",
        plainEnglishExplanation:
          "Removes and returns the smallest item from the heap in O(log k) time.",
        exampleSnippet: "import heapq\nh = [2, 5, 8]\nheapq.heapify(h)\nsmallest = heapq.heappop(h)\nprint(smallest)",
        whyWeUseItHere:
          "Removes outdated intervals that ended before the current query point.",
      },
      {
        keywordOrMethod: "sorted(enumerate(queries), key=lambda x: x[1])",
        plainEnglishExplanation:
          "Pairs each query with its original position `(index, query_val)` and sorts the pairs by `query_val`.",
        exampleSnippet: "q = [19, 5, 22]\nsorted_q = sorted(enumerate(q), key=lambda x: x[1])\nprint(sorted_q)",
        whyWeUseItHere:
          "Processing queries in ascending order lets us scan through intervals once from left to right, while still writing answers to each query's original position.",
      },
      {
        keywordOrMethod: "def min_interval(intervals: list[list[int]], queries: list[int]) -> list[int]:",
        plainEnglishExplanation:
          "`def` defines the function taking a list of intervals and a list of query numbers, returning a list of minimum interval sizes.",
        exampleSnippet: "def count(ints: list[list[int]], q: list[int]) -> list[int]:\n    return [len(ints)] * len(q)\n\nprint(count([[1, 2]], [5, 6]))",
        whyWeUseItHere:
          "The standard function signature required by the test runner.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { intervals: [[1, 4], [2, 4], [3, 6], [4, 4]], queries: [2, 3, 4, 5] },
      pointers: { intervals: ["i"] },
      heaps: ["min_heap"],
      focus: ["intervals", "queries", "min_heap", "res", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "If queries are asked in random order, you'd have to search all intervals again and again. But if you sort the queries from left to right, you can sweep a timeline forward! For each query `q`: (1) Push all intervals that start at or before `q` into a min-heap, ordered by their size. (2) Discard any intervals from the top of the heap whose right boundary is strictly before `q` (they ended in the past and can never cover `q` or any future query). (3) The top of the heap is now guaranteed to cover `q` and has the smallest size! Record that size and move to the next query.",
      edgeCases: [
        "Query not covered by any interval: top of heap becomes empty after discarding expired intervals, returns -1.",
        "Multiple intervals of different sizes covering query: min-heap guarantees the smallest size is picked.",
        "Duplicate query values: correctly handled by processing each query independently.",
      ],
      stepByStepWalkthrough: [
        "Sort `intervals` by start time: `intervals.sort(key=lambda x: x[0])`.",
        "Sort queries while preserving original indices: `sorted_queries = sorted(enumerate(queries), key=lambda x: x[1])`.",
        "Initialize an empty min-heap `min_heap = []`, pointer `i = 0`, and result list `res = [-1] * len(queries)`.",
        "For each `(orig_idx, q)` in `sorted_queries`:",
        "While `i < len(intervals)` and `intervals[i][0] <= q`, push `(intervals[i][1] - intervals[i][0] + 1, intervals[i][1])` onto `min_heap`, then increment `i += 1`.",
        "While `min_heap` is not empty and `min_heap[0][1] < q`, pop from `min_heap` (it ends before `q`).",
        "If `min_heap` is not empty, set `res[orig_idx] = min_heap[0][0]`.",
        "Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "If you sort both the intervals and the queries, you can process queries in increasing order. As you move from left to right, which intervals become eligible? Which intervals become permanently obsolete?",
      structural:
        "Sort `intervals` by start time. Sort `queries` while remembering original indices. Maintain a min-heap storing `(size, end_time)`. For each query, push all newly started intervals into the heap, pop any intervals that end before the query, and read the top.",
    },
    commonMistakes: [
      "Not preserving original query indices: the answer must match the original query ordering.",
      "Not popping expired intervals from the heap: an interval might have a small size but end before the query point.",
      "Re-inserting intervals for every query: sorting allows each interval to be pushed into the heap at most once across all queries.",
    ],
    starterCode: `import heapq

def min_interval(intervals: list[list[int]], queries: list[int]) -> list[int]:
    # Return the smallest interval size containing each query, or -1.
    # Tip: sort intervals and queries, then use a min-heap ordered by interval size.
    pass
`,
    optimalSolution: `import heapq

def min_interval(intervals: list[list[int]], queries: list[int]) -> list[int]:
    # Sort intervals by their start time
    intervals.sort(key=lambda x: x[0])

    # Sort queries along with their original indices
    sorted_queries = sorted(enumerate(queries), key=lambda x: x[1])

    # Result list pre-filled with -1
    res = [-1] * len(queries)

    # Min-heap stores tuples of (interval_size, right_boundary)
    min_heap = []
    i = 0
    n = len(intervals)

    for orig_idx, q in sorted_queries:
        # Add all intervals that start at or before the current query
        while i < n and intervals[i][0] <= q:
            l, r = intervals[i]
            size = r - l + 1
            heapq.heappush(min_heap, (size, r))
            i += 1

        # Remove intervals from the heap that end before the current query
        while min_heap and min_heap[0][1] < q:
            heapq.heappop(min_heap)

        # The top of the heap is the smallest valid interval covering q
        if min_heap:
            res[orig_idx] = min_heap[0][0]

    return res
`,
    bruteForceSolution: `def min_interval(intervals: list[list[int]], queries: list[int]) -> list[int]:
    res = []
    for q in queries:
        best = -1
        for l, r in intervals:
            if l <= q <= r:
                size = r - l + 1
                if best == -1 or size < best:
                    best = size
        res.append(best)
    return res
`,
    harness: { kind: "function", entry: "min_interval" },
    testCases: [
      {
        input: { intervals: [[1, 4], [2, 4], [3, 6], [4, 4]], queries: [2, 3, 4, 5] },
        expected: [3, 3, 1, 4],
        description: "Query 2 is covered by [1, 4] and [2, 4], smallest size is 3. Query 4 is covered by [4, 4], size 1.",
      },
      {
        input: { intervals: [[2, 3], [2, 5], [1, 8], [20, 25]], queries: [2, 19, 5, 22] },
        expected: [2, -1, 4, 6],
        description: "Query 19 is not covered by any interval, so result is -1.",
      },
      {
        input: { intervals: [[1, 1]], queries: [1, 2] },
        expected: [1, -1],
        description: "Query 1 covered by [1, 1] (size 1), query 2 not covered (-1).",
      },
      { input: { intervals: [[4, 5], [5, 8], [1, 9], [8, 10], [1, 6]], queries: [7, 9, 3, 8, 2] }, expected: [4, 3, 6, 3, 6] },
      { input: { intervals: [[9, 9], [6, 7], [5, 6], [2, 5], [4, 10]], queries: [4, 10, 5, 9] }, expected: [4, 7, 2, 1] },
      { input: { intervals: [[1, 10]], queries: [1, 5, 10, 11] }, expected: [10, 10, 10, -1] },
      { input: { intervals: [[3, 5], [1, 2]], queries: [0, 1, 2, 3, 4, 5, 6] }, expected: [-1, 2, 2, 3, 3, 3, -1] },
    ],
  },
];

export default problems;
