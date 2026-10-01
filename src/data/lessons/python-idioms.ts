import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "python-idioms",
  title: "Python Idioms for DSA",
  goal: "Write clean, idiomatic Python using enumerate, zip, tuple unpacking, custom sorting keys, and ternary expressions to solve coding challenges with less code and fewer bugs.",
  estimatedMinutes: 20,
  icon: "lightbulb",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Why write idiomatic Python?\nIn many programming languages, looping over an array while keeping track of the current index takes multiple lines and awkward counter variables. In Python, a handful of built-in idioms let you express complex loops, swaps, and transformations in a single, readable line.\n\nWriting idiomatic Python isn't just about looking elegant—it saves precious minutes during technical interviews and eliminates whole classes of off-by-one errors. Let's master the tools you will reach for in almost every NeetCode problem.",
    },
    {
      kind: "text",
      markdown:
        "### 1. `enumerate()`: Index and Value Together\nOften you need both the **index** (the position: 0, 1, 2...) and the **value** of each item in a list.\n\nA beginner might write:\n```python\ni = 0\nwhile i < len(nums):\n    val = nums[i]\n    ...\n    i += 1\n```\nOr `for i in range(len(nums)): val = nums[i]`.\n\nPython gives you `enumerate(nums)`. It pairs each element with its index automatically, like numbered seats at a theatre ticket counter.",
    },
    {
      kind: "code",
      caption: "`enumerate()` yields (index, item) pairs on each iteration. You can also specify a custom start value with `start=1`.",
      code: `fruits = ["apple", "banana", "cherry"]

# The idiomatic way: index and item together
for idx, fruit in enumerate(fruits):
    print(f"Index {idx}: {fruit}")

# Need 1-based ranking? Pass start=1
for rank, fruit in enumerate(fruits, start=1):
    print(f"Rank {rank}: {fruit}")
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `colors = ["red", "blue", "green"]
for i, c in enumerate(colors):
    if c == "blue":
        print(i)`,
        options: ["0", "1", "2", "blue"],
        answerIndex: 1,
        explanation:
          "`enumerate(colors)` produces `(0, 'red')`, then `(1, 'blue')`, then `(2, 'green')`. When `c == 'blue'`, the index `i` is 1.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 2. `zip()`: Iterating in Lockstep\nWhat if you have two lists of equal length and want to compare or combine their items side-by-side? Think of a jacket zipper interlocking pairs of teeth.\n\n`zip(list_a, list_b)` pairs up element 0 with element 0, element 1 with element 1, and so on. It stops as soon as the shortest list runs out.",
    },
    {
      kind: "code",
      caption: "`zip()` iterates through two or more collections simultaneously without manual indexing.",
      code: `names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 72]

for name, score in zip(names, scores):
    print(f"{name} scored {score}")

# Pairing adjacent characters in a string
word = "PYTHON"
for char1, char2 in zip(word, word[1:]):
    print(f"Pair: {char1}{char2}")
`,
    },
    {
      kind: "text",
      markdown:
        "### 3. Tuple Unpacking & Swapping: No Temp Variable\nIn languages like C or Java, swapping two variables requires a temporary placeholder:\n```python\ntemp = a\na = b\nb = temp\n```\nIn Python, you can swap in a single step: `a, b = b, a`.\n\nPython evaluates everything on the right-hand side first (packaging the values into an internal tuple `(b, a)`), and then unpacks those values into the variables on the left. You can also unpack lists and coordinates directly into separate variables.",
    },
    {
      kind: "code",
      caption: "Press Visualize to see Python evaluate the right side before reassigning the variables on the left.",
      visualize: true,
      code: `a = 10
b = 20
print("Before:", a, b)

# Swap in one atomic step
a, b = b, a
print("After:", a, b)

# Unpack a coordinate pair
point = (4, 9)
x, y = point
print("Unpacked x and y:", x, y)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `x = 1
y = 2
x, y = y, x + y
print(x, y)`,
        options: ["2 3", "2 4", "1 3", "3 2"],
        answerIndex: 0,
        explanation:
          "Python evaluates the right side first: `y` is 2, and `x + y` is `1 + 2 = 3`. So the right side is `(2, 3)`. Then it assigns `x = 2` and `y = 3`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 4. Custom Sorting with `key=`\n`sorted(collection)` returns a new sorted list, while `list.sort()` sorts in-place. By default, numbers sort from small to large and strings sort alphabetically.\n\nWhat if you want to sort strings by their **length**, or intervals by their **ending time**? You pass the `key=` argument! `key` is a function that Python calls on each element to calculate its sort weight.\n\n`min()` and `max()` also accept `key=`: `max(words, key=len)` finds the longest word instantly.",
    },
    {
      kind: "code",
      caption: "`key=` accepts standard functions like `len` or small one-line `lambda` helper functions.",
      code: `words = ["banana", "pie", "apple", "strawberry"]

# Sort by length using the built-in len function
by_length = sorted(words, key=len)
print("Sorted by length:", by_length)

# Find the longest word directly
longest = max(words, key=len)
print("Longest word:", longest)

# Sort 2D intervals by end time (index 1 of each pair)
intervals = [[1, 4], [2, 1], [3, 8]]
by_end = sorted(intervals, key=lambda pair: pair[1])
print("Intervals by end:", by_end)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `nums = [-5, 2, -1, 4]
print(min(nums, key=abs))`,
        options: ["-5", "-1", "2", "4"],
        answerIndex: 1,
        explanation:
          "The `abs` function turns values into positive distances: `abs(-5)=5`, `abs(2)=2`, `abs(-1)=1`, `abs(4)=4`. The element with the minimum absolute value is `-1`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 5. `any()`, `all()`, Ternary Expressions & `*args`\nHere are three more daily superpowers:\n\n- **`any(...)`**: returns `True` if **at least one** element is truthy. Stops searching early as soon as it finds one.\n- **`all(...)`**: returns `True` only if **every** element is truthy.\n- **Ternary expression**: Python's one-line `if/else`: `value_if_true if condition else value_if_false`.\n- **`*` unpacking**: `*nums` unpacks a list into separate positional arguments. For example, `print(*nums)` prints list elements separated by spaces without square brackets.",
    },
    {
      kind: "code",
      caption: "Cleaner conditions without clumsy flags or multi-line if/else branches.",
      code: `nums = [2, 4, 6, 7, 8]

# Any odd numbers?
has_odd = any(n % 2 != 0 for n in nums)
print("Has odd:", has_odd)

# Are all numbers positive?
all_positive = all(n > 0 for n in nums)
print("All positive:", all_positive)

# Ternary expression
score = 85
result = "Pass" if score >= 60 else "Fail"
print("Result:", result)

# Unpacking elements
values = [1, 2, 3]
print(*values)
`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Clarity over cleverness",
      markdown:
        "Python idioms make your intent unmistakable. But if a one-liner becomes difficult to read or requires complex nested lambdas, write it out across two or three plain lines. In interviews, clear and correct code always beats hyper-condensed code.",
    },
    {
      kind: "exercise",
      exercise: {
        id: "idioms-first-negative",
        title: "First Negative Index",
        prompt:
          "Given a list of integers `nums`, use `enumerate()` to find the 0-based index of the first negative number (less than 0). If there are no negative numbers in the list, return `-1`.",
        starterCode: `def first_negative_index(nums: list[int]) -> int:
    # Use enumerate to inspect both index and value
    return 0
`,
        solution: `def first_negative_index(nums: list[int]) -> int:
    # Loop over index and number together
    for i, num in enumerate(nums):
        if num < 0:
            return i
    return -1
`,
        harness: { kind: "function", entry: "first_negative_index" },
        testCases: [
          { input: { nums: [3, 5, -2, 8] }, expected: 2, description: "-2 is at index 2." },
          { input: { nums: [-10, 20, 30] }, expected: 0, description: "The first item is already negative." },
          { input: { nums: [1, 2, 3] }, expected: -1, description: "No negatives present." },
          { input: { nums: [] }, expected: -1, description: "Empty list has no negatives." },
          { input: { nums: [0, 0, -1] }, expected: 2 },
          { input: { nums: [7, 8, 9, -5] }, expected: 3 },
        ],
        hint: "Loop with `for i, num in enumerate(nums):`. If `num < 0`, immediately `return i`. After the loop, `return -1`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "idioms-longest-word",
        title: "Find the Longest Word",
        prompt:
          "Given a non-empty list of strings `words`, return the single longest word using Python's `max()` function with the `key=` argument. If several words tie for the longest length, `max()` will naturally return the first one.",
        starterCode: `def find_longest_word(words: list[str]) -> str:
    # Use max() with key=len
    return ""
`,
        solution: `def find_longest_word(words: list[str]) -> str:
    # max() with key=len ranks strings by their character length
    return max(words, key=len)
`,
        harness: { kind: "function", entry: "find_longest_word" },
        testCases: [
          { input: { words: ["cat", "elephant", "dog"] }, expected: "elephant", description: "elephant has 8 letters." },
          { input: { words: ["hello", "world"] }, expected: "hello", description: "Ties return the first longest word." },
          { input: { words: ["a", "bb", "ccc"] }, expected: "ccc" },
          { input: { words: ["algorithm"] }, expected: "algorithm" },
          { input: { words: ["code", "neet", "python", "dsa"] }, expected: "python" },
        ],
        hint: "Pass `len` as the `key` argument: `return max(words, key=len)`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nThese idioms appear everywhere on NeetCode:\n\n- **Two Sum**: `enumerate(nums)` gives you each number and its index so you can save them to a hash map in one pass.\n- **Longest Common Prefix**: `zip(*strs)` walks through characters of every input word simultaneously.\n- **Merge Intervals** and **Non-overlapping Intervals**: `intervals.sort(key=lambda x: x[0])` sorts intervals by start time.\n- **Top K Frequent Elements**: sorting frequency pairs or using custom keys.\n- **Valid Palindrome**: two-pointer swaps with `l, r = l + 1, r - 1`.",
    },
  ],
};

export default lesson;
