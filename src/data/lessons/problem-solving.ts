import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "problem-solving",
  title: "How to Approach a Problem",
  goal: "Master a repeatable 6-step framework to analyze, sketch, solve, optimize, and test coding interview problems.",
  estimatedMinutes: 20,
  icon: "compass",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Overcoming the blank screen\nStaring at an empty code editor while an interviewer waits can make anyone's mind freeze. The difference between engineers who freeze and those who solve problems with calm confidence isn't raw genius—it is having a **repeatable mental framework**.\n\nWhen given a coding challenge, strong candidates don't start typing Python immediately. Instead, they follow a battle-tested 6-step system that turns an ambiguous problem into an optimal, working solution.",
    },
    {
      kind: "text",
      markdown:
        "### Step 1 & 2: Read Carefully & Work Examples by Hand\n\n**1. Read carefully & ask clarifying questions**:\n- What are the inputs and outputs? (Are we returning indices or the values themselves?)\n- What are the constraints? (Can the list be empty? Can numbers be negative? How large can $n$ be?)\n\n**2. Work through an example with pen and paper**:\n- Never touch the keyboard until you can solve the example by hand.\n- Trace through the sample inputs step-by-step. If you cannot solve it on paper, you cannot write code to solve it.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What is the most effective first step when presented with an interview problem?",
        options: [
          "Clarify constraints and trace through a small example by hand before coding.",
          "Immediately begin typing your best guess into the code editor.",
          "Memorize code from similar problems you saw previously.",
          "Ask the interviewer for the optimal approach right away.",
        ],
        answerIndex: 0,
        explanation:
          "Rushing into code without clarifying inputs and working through manual examples often leads to solving the wrong problem or getting stuck on edge cases.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Step 3: Always State the Brute Force First\nNever sit in silence while thinking! Interviewers evaluate your thought process.\n\nState the simplest, most obvious approach out loud: *\"The straightforward brute-force way is to check every pair using two nested loops. That would take $O(n^2)$ time and $O(1)$ space.\"*\n\nWhy is this powerful?\n1. It proves you understand the goal.\n2. It gives you a working baseline.\n3. It sets up the question: *\"What is making this brute force slow?\"*",
    },
    {
      kind: "code",
      caption: "A brute force solution compares every pair in O(n^2) time.",
      code: `# Brute force: check every pair
def has_duplicate_brute(nums):
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] == nums[j]:
                return True
    return False

print(has_duplicate_brute([1, 2, 3, 1]))
print(has_duplicate_brute([1, 2, 3, 4]))
`,
    },
    {
      kind: "text",
      markdown:
        "### Step 4: Identify the Bottleneck & Choose a Pattern\nLook at the brute force and ask: **What is the bottleneck?**\n\nIn the nested loops above, the inner loop spends $O(n)$ time searching for something we have already seen. How can we make lookups faster?\n\nChoose the matching DSA tool:\n- Need instant $O(1)$ lookups? $\\rightarrow$ **Hash Set / Hash Map**\n- Array is sorted? $\\rightarrow$ **Two Pointers** or **Binary Search** ($O(\\log n)$)\n- Contiguous subarrays or substrings? $\\rightarrow$ **Sliding Window**\n- First-In, First-Out (FIFO) queue? $\\rightarrow$ **collections.deque**\n- Last-In, First-Out (LIFO) tracking? $\\rightarrow$ **Stack**\n- Top $K$ elements or running min/max? $\\rightarrow$ **heapq (Heap)**",
    },
    {
      kind: "code",
      caption: "Replacing the inner loop with a hash set drops the time from O(n^2) to O(n).",
      code: `# Optimal: hash set gives O(1) lookups
def has_duplicate_optimal(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

print(has_duplicate_optimal([1, 2, 3, 1]))
print(has_duplicate_optimal([1, 2, 3, 4]))
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def find_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)
    return -1

print(find_duplicate([3, 1, 4, 2, 1]))`,
        options: ["1", "3", "4", "-1"],
        answerIndex: 0,
        explanation:
          "`seen` tracks `{3, 1, 4, 2}`. When the second `1` is reached, `1 in seen` is True, returning `1` immediately.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Step 5 & 6: Clean Code & The Edge Case Checklist\nOnce you have written clean, readable Python with descriptive variable names, do not just say *\"I'm done!\"*\n\nProactively test your solution out loud against standard **edge cases**:\n- **0, 1, Many**: What happens if the input is empty `[]`? What if it has only 1 element?\n- **Duplicates**: What if all elements are identical, like `[5, 5, 5]`?\n- **Extremes**: Negative numbers, zero, very large numbers.\n- **Order**: Already sorted, reverse sorted, or completely unsorted.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The self-testing habit",
      markdown:
        "Before asking your interviewer if your solution passes, pick one small edge case (like an empty list or a list of one item) and trace through your code line by line. Catching your own edge case is one of the highest signals an interviewer looks for.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "Which of the following is NOT a meaningful edge case to check for an array problem?",
        options: [
          "The font or color scheme of your code editor.",
          "An empty array: `[]`.",
          "An array containing negative numbers or zeros.",
          "An array with only a single element: `[42]`.",
        ],
        answerIndex: 0,
        explanation:
          "Edge cases test boundary values in your algorithm's logic (empty collections, singletons, negatives, duplicates), not editor preferences.",
      },
    },
    {
      kind: "text",
      markdown:
        "### The NeetCode 150 Roadmap\nLearning DSA is not about grinding 500 isolated problems. It is about mastering **18 fundamental patterns** that build directly on one another:\n\n1. **Arrays & Hashing**: Instant lookups and frequency counting.\n2. **Two Pointers & Sliding Window**: Efficient linear scans on arrays.\n3. **Stack & Binary Search**: Tracking history and logarithmic divide-and-conquer.\n4. **Linked Lists & Trees**: Dynamic node pointers and recursive traversals.\n5. **Heaps, Backtracking & Graphs**: Priority, exhaustive search, and networks.\n6. **Dynamic Programming**: Breaking complex problems into memoized subproblems.",
    },
    {
      kind: "exercise",
      exercise: {
        id: "problem-solving-first-duplicate",
        title: "First Duplicate Value",
        prompt:
          "Given a list of integers `nums`, write a function that returns the **first duplicate number** (the number whose second occurrence appears earliest in the list). If no duplicates exist, return `-1`.\n\nMake sure your solution handles empty lists and single-element lists cleanly.",
        starterCode: `def first_duplicate(nums: list[int]) -> int:
    # Use a set to track numbers seen so far
    return -1
`,
        solution: `def first_duplicate(nums: list[int]) -> int:
    seen = set()
    for num in nums:
        if num in seen:
            return num
        seen.add(num)
    return -1
`,
        harness: { kind: "function", entry: "first_duplicate" },
        testCases: [
          { input: { nums: [2, 1, 3, 5, 3, 2] }, expected: 3, description: "3's second occurrence comes at index 4, before 2's at index 5." },
          { input: { nums: [1, 2, 3, 4] }, expected: -1, description: "No duplicates." },
          { input: { nums: [5, 5] }, expected: 5 },
          { input: { nums: [] }, expected: -1, description: "Empty list edge case." },
          { input: { nums: [9] }, expected: -1, description: "Single element edge case." },
          { input: { nums: [-1, 2, -1] }, expected: -1, description: "Handles negative numbers." },
        ],
        hint: "Initialize `seen = set()`. Loop through `nums`: if `num in seen`, return `num`. Otherwise add it to `seen`. After the loop, return `-1`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "problem-solving-has-pair-sum",
        title: "Has Pair with Target Sum",
        prompt:
          "Given a list of numbers `nums` and an integer `target`, return `True` if there exist two distinct elements that add up to `target`, and `False` otherwise.\n\nOptimize your solution to run in $O(n)$ time using a hash set.",
        starterCode: `def has_pair_sum(nums: list[int], target: int) -> bool:
    # Use a set of seen numbers to find target - num in O(n) time
    return False
`,
        solution: `def has_pair_sum(nums: list[int], target: int) -> bool:
    seen = set()
    for num in nums:
        complement = target - num
        if complement in seen:
            return True
        seen.add(num)
    return False
`,
        harness: { kind: "function", entry: "has_pair_sum" },
        testCases: [
          { input: { nums: [10, 15, 3, 7], target: 17 }, expected: true, description: "10 + 7 = 17." },
          { input: { nums: [1, 2, 3], target: 10 }, expected: false },
          { input: { nums: [5, 5], target: 10 }, expected: true, description: "Two separate 5s make 10." },
          { input: { nums: [5], target: 10 }, expected: false, description: "Cannot reuse the single 5." },
          { input: { nums: [], target: 0 }, expected: false, description: "Empty list has no pairs." },
          { input: { nums: [-2, 8, 4], target: 2 }, expected: true, description: "-2 + 4 = 2." },
        ],
        hint: "For each `num`, calculate `complement = target - num`. If `complement in seen: return True`. Then add `num` to `seen`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nYou are now fully prepared to begin your journey through the NeetCode 150:\n\n- Start immediately with **Contains Duplicate** and **Valid Anagram** in **Arrays & Hashing**.\n- Move to **Two Sum**, which uses the exact complement pattern you just implemented.\n- Whenever you feel stuck on any problem, return to the 6 steps: read, draw by hand, state brute force, find the bottleneck, implement cleanly, and check edge cases.",
    },
  ],
};

export default lesson;
