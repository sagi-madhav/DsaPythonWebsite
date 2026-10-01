import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "big-o",
  title: "Big-O Notation",
  goal: "Analyze code efficiency, count operations, evaluate time and space complexity, and read the Big-O growth chart.",
  estimatedMinutes: 25,
  icon: "trending-up",
  blocks: [
    {
      kind: "text",
      markdown:
        "### How fast is your code?\nA Python solution that finishes in 0.001 seconds on 10 numbers might take 30,000 years on 10 million numbers. Measuring speed with a stopwatch on your computer doesn't help—it tells you how fast your specific laptop's processor is today, not how well the algorithm scales.\n\nHow do computer scientists evaluate whether a solution is fast, scalable, and ready for production? We use **Big-O notation**.\n\nBig-O describes how the running time or memory usage of an algorithm grows as the input size ($n$) explodes toward infinity.",
    },
    {
      kind: "bigOChart",
    },
    {
      kind: "text",
      markdown:
        "### 1. The Common Time Complexities\nIn Big-O, $n$ represents the size of the input (for example, the number of items in a list or characters in a string).\n\nHere is the hierarchy from fastest to slowest:\n- **$O(1)$ Constant**: Instantaneous. The time never changes, regardless of whether $n$ is 5 or 5 billion (e.g. looking up a value by its index: `nums[0]`).\n- **$O(\\log n)$ Logarithmic**: Incredible speed. Every step cuts the remaining work in half (e.g. Binary Search).\n- **$O(n)$ Linear**: Proportional. If input size doubles, running time doubles (e.g. a single loop inspecting every element).\n- **$O(n \\log n)$ Linearithmic**: The theoretical speed limit for general comparison-based sorting (`sorted()`, Merge Sort).\n- **$O(n^2)$ Quadratic**: Slow for large $n$. Comparing every element against every other element in nested loops.\n- **$O(2^n)$ Exponential**: Explosive growth. Adding just 1 to $n$ doubles the total operations (e.g. brute-forcing all subsets).",
    },
    {
      kind: "table",
      caption: "Growth rates of common complexities",
      headers: ["Notation", "Name", "Approximate operations for n = 1,000", "Everyday Example"],
      rows: [
        ["O(1)", "Constant", "1", "Access array element by index"],
        ["O(log n)", "Logarithmic", "~10", "Binary search in a phone book"],
        ["O(n)", "Linear", "1,000", "Reading every page of a book once"],
        ["O(n log n)", "Linearithmic", "~10,000", "Python's sorted() / Merge Sort"],
        ["O(n²)", "Quadratic", "1,000,000", "Comparing every pair of students in a school"],
        ["O(2ⁿ)", "Exponential", "10³⁰⁰ (more than atoms in universe!)", "Trying every combination of a master lock"],
      ],
    },
    {
      kind: "text",
      markdown:
        "### 2. Counting Loops: Sequential vs Nested\nHow do you figure out the Big-O of code just by looking at it?\n\n1. **Loops in sequence ADD together**:\n```python\nfor x in nums: ...      # O(n)\nfor y in nums: ...      # O(n)\n# Total: O(n) + O(n) = O(2n) -> O(n)\n```\n\n2. **Nested loops MULTIPLY**:\n```python\nfor x in nums:          # runs n times\n    for y in nums:      # runs n times for EACH x\n# Total: n * n = O(n²)\n```",
    },
    {
      kind: "code",
      caption: "Sequential loops add; nested loops multiply.",
      code: `def demonstrate_loops(nums):
    n = len(nums)

    # Sequential loops: O(n) + O(n) = O(n)
    for x in nums:
        pass
    for x in nums:
        pass

    # Nested loops: O(n) * O(n) = O(n^2)
    pair_count = 0
    for i in range(n):
        for j in range(n):
            pair_count += 1
    print(f"For n={n}, nested loops ran {pair_count} times")

demonstrate_loops([1, 2, 3, 4, 5])
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def count_steps(n):
    steps = 0
    for i in range(n):
        for j in range(i + 1, n):
            steps += 1
    return steps

print(count_steps(4))`,
        options: ["6", "16", "12", "4"],
        answerIndex: 0,
        explanation:
          "For $n=4$: when $i=0$, $j$ runs 3 times; when $i=1$, 2 times; when $i=2$, 1 time. Total steps = $3 + 2 + 1 = 6$. In general, comparing all pairs takes $n(n - 1) / 2$ steps, which is $O(n^2)$.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 3. The Two Golden Simplification Rules\nWhen expressing Big-O, always simplify using these two rules:\n\n1. **Drop constant multipliers**: $O(3n)$, $O(50n)$, and $O(n / 2)$ all simplify to $O(n)$. We only care about how work scales as $n$ changes, not fixed multipliers.\n2. **Drop non-dominant terms**: If your function does $n^2 + 100n + 500$ steps, as $n$ grows to a million, $n^2$ becomes 1,000,000,000,000 while $100n$ is only 100,000,000 (a tiny fraction of 1%). We discard everything except the highest-order term and write **$O(n^2)$**.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "A function has two parts: first it loops through a list doing O(n) work, then it runs a nested loop doing O(n²) work. What is its overall simplified time complexity?",
        options: ["O(n²)", "O(n³)", "O(n² + n)", "O(2n²)"],
        answerIndex: 0,
        explanation:
          "In Big-O, we drop non-dominant terms. $O(n^2 + n)$ simplifies to $O(n^2)$ because the quadratic term completely dominates as $n$ grows.",
      },
    },
    {
      kind: "text",
      markdown:
        "### 4. Amortized Analysis & `list.append()`\nImagine buying coffee beans in a giant 5-pound bag. On 99 out of 100 mornings, scooping coffee takes 5 seconds ($O(1)$). Once every few months, you must drive to the supermarket to buy a new bag ($O(n)$). If you calculate the average cost across all mornings, each cup still takes only a few seconds.\n\nThis is called **Amortized Analysis**.\n\nPython lists are dynamic arrays allocated with extra space in memory. Most `append()` operations are instant $O(1)$. When the list runs out of allocated space, Python allocates double the memory and copies elements over ($O(n)$). Because doubling happens exponentially less often as the list grows, the average time per append is **Amortized $O(1)$**.",
    },
    {
      kind: "callout",
      tone: "insight",
      title: "Say 'Amortized O(1)' in interviews",
      markdown:
        "If an interviewer asks for the time complexity of adding to a dynamic array or Python list, saying **'Amortized O(1)'** instantly signals that you understand how memory allocation works under the hood.",
    },
    {
      kind: "text",
      markdown:
        "### 5. Space Complexity: Memory Overhead\nTime complexity measures how many operations run. **Space complexity** measures how much extra memory (RAM) your algorithm allocates beyond the input itself.\n\n- **$O(1)$ Auxiliary Space**: You only allocate a few variables (`total = 0`, `i = 0`). Memory usage never increases, no matter how huge $n$ is.\n- **$O(n)$ Auxiliary Space**: You create a new list of size $n$, a hash map storing $n$ elements, or recursive calls stacking $n$ frames on the call stack.",
    },
    {
      kind: "code",
      caption: "Comparing O(1) in-place space vs O(n) auxiliary memory allocation.",
      code: `# O(1) auxiliary space: only a counter variable is created
def sum_elements(nums):
    total = 0
    for x in nums:
        total += x
    return total

# O(n) auxiliary space: creates a brand-new list of size n
def double_elements(nums):
    return [x * 2 for x in nums]

print("Sum:", sum_elements([1, 2, 3]))
print("Doubled:", double_elements([1, 2, 3]))
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "If a function loops through an array of size n once and stores each unique item in a hash set, what are its time and auxiliary space complexities?",
        options: [
          "Time: O(n), Space: O(n)",
          "Time: O(n²), Space: O(1)",
          "Time: O(1), Space: O(n)",
          "Time: O(n), Space: O(1)",
        ],
        answerIndex: 0,
        explanation:
          "Looping through $n$ elements takes $O(n)$ time. In the worst case, storing all $n$ unique items in the hash set requires $O(n)$ extra memory.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "big-o-find-extremes",
        title: "Find Min and Max in One Pass",
        prompt:
          "Given a non-empty list of integers `nums`, find both the minimum and maximum values in a single pass ($O(n)$ time and $O(1)$ auxiliary space).\n\nReturn a list of two elements: `[min_val, max_val]`.\n\nDo not use Python's `sorted()` (which would take $O(n \\log n)$ time) or create a new list.",
        starterCode: `def find_min_max(nums: list[int]) -> list[int]:
    # Track min_val and max_val in a single loop
    return [0, 0]
`,
        solution: `def find_min_max(nums: list[int]) -> list[int]:
    min_val = nums[0]
    max_val = nums[0]
    for num in nums:
        if num < min_val:
            min_val = num
        if num > max_val:
            max_val = num
    return [min_val, max_val]
`,
        harness: { kind: "function", entry: "find_min_max" },
        testCases: [
          { input: { nums: [3, 1, 9, 7, 5] }, expected: [1, 9], description: "Min is 1, max is 9." },
          { input: { nums: [42] }, expected: [42, 42], description: "Single element is both min and max." },
          { input: { nums: [-5, -2, -10, 0] }, expected: [-10, 0] },
          { input: { nums: [5, 5, 5] }, expected: [5, 5] },
          { input: { nums: [100, -100] }, expected: [-100, 100] },
        ],
        hint: "Initialize `min_val = nums[0]` and `max_val = nums[0]`. Walk through `for num in nums:` updating both, then return `[min_val, max_val]`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "big-o-count-pairs",
        title: "Count Pair Combinations",
        prompt:
          "Given an integer `n` representing the length of a list, return the exact number of unique index pairs `(i, j)` where `0 <= i < j < n`. This formula represents the number of comparisons a quadratic nested loop makes.\n\nFormula: $n \\times (n - 1) // 2$. If `n <= 1`, return 0.",
        starterCode: `def count_pairs(n: int) -> int:
    # Calculate n * (n - 1) // 2
    return 0
`,
        solution: `def count_pairs(n: int) -> int:
    if n <= 1:
        return 0
    return n * (n - 1) // 2
`,
        harness: { kind: "function", entry: "count_pairs" },
        testCases: [
          { input: { n: 4 }, expected: 6, description: "4 * 3 // 2 = 6 pairs." },
          { input: { n: 5 }, expected: 10, description: "5 * 4 // 2 = 10 pairs." },
          { input: { n: 1 }, expected: 0, description: "A single item has no pairs." },
          { input: { n: 0 }, expected: 0 },
          { input: { n: 100 }, expected: 4950 },
        ],
        hint: "If `n <= 1: return 0`. Otherwise, return `n * (n - 1) // 2`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nEvery single technical interview ends with: *\"What is the time and space complexity of your solution?\"*\n\n- **Contains Duplicate**: comparing $O(n^2)$ nested loops vs $O(n \\log n)$ sorting vs $O(n)$ hash set.\n- **Two Sum**: trading $O(n)$ space (hash map) to crush the time complexity from $O(n^2)$ down to $O(n)$.\n- **Binary Search**: achieving blazing $O(\\log n)$ time by cutting search space in half.\n- **Merge Intervals**: sorting in $O(n \\log n)$ upfront so intervals can be merged in a single $O(n)$ pass.\n- **Subsets**: exponential $O(2^n)$ because an array of size $n$ has $2^n$ subsets.",
    },
  ],
};

export default lesson;
