import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "lists-and-slicing",
  title: "Lists & Slicing",
  goal: "Create and manipulate lists, index forwards and backwards, slice sublists with [start:stop:step], modify with append/pop/insert, check membership with in, and navigate 2D grids.",
  estimatedMinutes: 30,
  icon: "list",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Python's swiss army knife: The List\nImagine a row of numbered school lockers: locker 0, locker 1, locker 2, and so on. In Python, an ordered collection of values kept in numbered slots is called a **list**.\n\nLists are the single most important data structure in Python and coding interviews. They can hold anything: numbers, strings, even other lists. You create a list with square brackets `[ ]` and separate items with commas.",
    },
    {
      kind: "code",
      caption: "Python uses 0-based indexing: the first item is always at index 0.",
      code: `fruits = ["apple", "banana", "cherry", "date"]

print("First fruit (index 0):", fruits[0])
print("Second fruit (index 1):", fruits[1])
print("How many fruits?", len(fruits))
`,
    },
    {
      kind: "text",
      markdown:
        "### Negative indices: counting from the back\nIn many languages, getting the last element requires writing `fruits[len(fruits) - 1]`. Python gives you a much cleaner shortcut: **negative indices**.\n\n- `fruits[-1]` is the **last** item.\n- `fruits[-2]` is the **second-to-last** item.\n- `fruits[-len(fruits)]` brings you all the way back to the very first item.",
    },
    {
      kind: "code",
      caption: "This snippet raises an IndexError on purpose. Lists only have items from index 0 to len - 1. Asking for index 5 when there are only 3 items crashes!",
      expectError: true,
      code: `nums = [10, 20, 30]

print("Last element:", nums[-1])
print("Second to last:", nums[-2])

# Deliberate error: index 5 does not exist!
print(nums[5])
`,
    },
    {
      kind: "text",
      markdown:
        "### Modifying lists: append, pop, and insert\nUnlike strings or numbers, lists are **mutable**: you can add, change, or remove items at any time:\n\n- `nums.append(x)`: adds `x` to the end of the list. Fast (**O(1)**).\n- `nums.pop()`: removes and returns the last element. Fast (**O(1)**).\n- `nums.pop(i)`: removes the item at index `i`. Slower (**O(n)**) because every item after `i` must slide one spot to the left.\n- `nums.insert(i, x)`: inserts `x` at index `i`. Slower (**O(n)**) because items must shift right.",
    },
    {
      kind: "code",
      caption: "Press Visualize to watch items enter and leave the shopping cart in memory.",
      visualize: true,
      code: `cart = ["milk", "bread"]
cart.append("eggs")
cart.append("cheese")

# pop() removes and hands back the last item
removed = cart.pop()
print("Removed:", removed)

# insert 'butter' at index 1 (shifts bread and eggs right)
cart.insert(1, "butter")
print("Cart is now:", cart)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `stack = [10, 20]
stack.append(30)
stack.pop()
stack.append(40)
print(stack)`,
        options: ["[10, 20, 30, 40]", "[10, 20, 40]", "[10, 30, 40]", "[10, 40]"],
        answerIndex: 1,
        explanation:
          "Start: `[10, 20]`. `append(30)` makes it `[10, 20, 30]`. `pop()` removes 30, leaving `[10, 20]`. `append(40)` makes it `[10, 20, 40]`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Slicing sublists: [start:stop:step]\nSlicing extracts a brand new sublist without modifying the original list. The syntax is `list[start:stop:step]`:\n\n- `start`: index where the slice begins (included).\n- `stop`: index where the slice stops (**excluded** — stops right before it).\n- `step`: how many items to step forward each time (default is 1).\n\nConvenient shortcuts:\n- Leave out `start` (`[:stop]`) to begin at index 0.\n- Leave out `stop` (`[start:]`) to go all the way to the end.\n- `[::-1]` with step `-1` reverses the entire list in one step!",
    },
    {
      kind: "code",
      caption: "Slices always return a new list. The original list is never modified.",
      code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print("nums[2:6]   ->", nums[2:6])    # index 2 up to (not including) 6
print("nums[:4]    ->", nums[:4])     # first 4 elements
print("nums[6:]    ->", nums[6:])     # from index 6 to the end
print("nums[::2]   ->", nums[::2])    # every second element
print("nums[::-1]  ->", nums[::-1])   # reversed!
`,
    },
    {
      kind: "callout",
      tone: "insight",
      title: "Why stop is excluded",
      markdown:
        "Excluding `stop` makes calculations clean:\n1. The length of `nums[start:stop]` is always exactly `stop - start`. `nums[2:6]` has `6 - 2 = 4` items.\n2. Splitting a list in two at `mid` requires zero math adjustments: `nums[:mid]` and `nums[mid:]` partition the list with no duplicates and no missing items.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `nums = [10, 20, 30, 40, 50]
print(nums[1:4])`,
        options: ["[10, 20, 30]", "[20, 30, 40]", "[20, 30, 40, 50]", "[30, 40]"],
        answerIndex: 1,
        explanation:
          "`nums[1:4]` starts at index 1 (value 20) and stops before index 4 (value 50). It includes indices 1, 2, and 3: values `[20, 30, 40]`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Checking membership with in & iterating\nTo check whether a value exists in a list, use the `in` keyword: `'banana' in fruits` returns `True` or `False`.\n\nWhen looping through a list, you have two great options:\n- `for item in fruits:` when you only need the values.\n- `for i, item in enumerate(fruits):` when you need both the index `i` AND the value `item`.",
    },
    {
      kind: "code",
      caption: "Using `in` to test membership and `enumerate()` to get both index and item.",
      code: `colors = ["red", "green", "blue"]

print("Is green in list?", "green" in colors)
print("Is yellow in list?", "yellow" in colors)

for index, color in enumerate(colors):
    print(f"Locker {index} holds {color}")
`,
    },
    {
      kind: "text",
      markdown:
        "### 2D Lists: Grids & Matrices\nA list can contain other lists! A list of lists represents a 2D table or grid, just like a chessboard or spreadsheet.\n\nTo access a specific cell, use two sets of brackets: `grid[row][col]`.\n- `len(grid)` is the number of **rows**.\n- `len(grid[0])` is the number of **columns**.",
    },
    {
      kind: "code",
      caption: "Navigating a 3x3 grid using row and column indices.",
      code: `grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("Top-left (row 0, col 0):", grid[0][0])
print("Center (row 1, col 1):", grid[1][1])
print("Bottom-right (row 2, col 2):", grid[2][2])
print("Entire row 1:", grid[1])
`,
    },
    {
      kind: "table",
      caption: "List operations and time complexity",
      headers: ["Operation", "Syntax", "Time Complexity", "Why"],
      rows: [
        ["Access by index", "nums[i]", "O(1)", "Direct calculation of memory address"],
        ["Append to end", "nums.append(x)", "O(1)", "Adds directly to the pre-allocated end"],
        ["Pop from end", "nums.pop()", "O(1)", "Removes last element, no shifting"],
        ["Insert / Pop at index 0", "nums.insert(0, x)", "O(n)", "Must shift all n elements one slot"],
        ["Search with in", "x in nums", "O(n)", "Scans elements from left to right"],
        ["Slice sublist", "nums[start:stop]", "O(k)", "Copies k elements into a new list"],
      ],
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `matrix = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]
print(matrix[2][0])`,
        options: ["10", "30", "70", "80"],
        answerIndex: 2,
        explanation:
          "`matrix[2]` accesses row 2 (the 3rd row: `[70, 80, 90]`). Index `[0]` accesses the first item of that row: `70`.",
        predictsOutput: true,
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "lists-rotate-left",
        title: "Rotate list left by one",
        prompt:
          "Given a list `nums`, return a new list where all elements are shifted one position to the left, and the first element moves to the very end.\n\nFor example, `[1, 2, 3, 4]` becomes `[2, 3, 4, 1]`.\n\nIf the list is empty or has only one element, return it unchanged. Solve this with slicing!",
        starterCode: `def rotate_left(nums):
    # Return a new list shifted left by 1, with first item at the end
    return nums
`,
        solution: `def rotate_left(nums):
    if len(nums) <= 1:
        return nums
    return nums[1:] + nums[:1]
`,
        harness: { kind: "function", entry: "rotate_left" },
        testCases: [
          { input: { nums: [1, 2, 3, 4] }, expected: [2, 3, 4, 1], description: "1 moves to the end, 2 becomes first." },
          { input: { nums: [10] }, expected: [10], description: "Single item list remains unchanged." },
          { input: { nums: [] }, expected: [], description: "Empty list remains unchanged." },
          { input: { nums: [5, 9] }, expected: [9, 5] },
          { input: { nums: [10, 20, 30, 40, 50] }, expected: [20, 30, 40, 50, 10] },
          { input: { nums: [7, 8, 9] }, expected: [8, 9, 7] },
        ],
        hint: "`nums[1:]` gets everything from index 1 to the end. `nums[:1]` is a list with just the first element. Glue them together with `+`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "lists-count-in-range",
        title: "Count elements in range",
        prompt:
          "Write a function `count_in_range(nums, low, high)` that returns how many numbers in `nums` fall within the range `[low, high]` inclusive (i.e. `low <= x <= high`).\n\nFor example, if `nums = [2, 5, 8, 12, 1]` and `low = 3, high = 10`, the qualifying numbers are `5` and `8`, so return `2`.",
        starterCode: `def count_in_range(nums, low, high):
    # Count numbers in nums where low <= x <= high
    return 0
`,
        solution: `def count_in_range(nums, low, high):
    count = 0
    for x in nums:
        if low <= x <= high:
            count += 1
    return count
`,
        harness: { kind: "function", entry: "count_in_range" },
        testCases: [
          { input: { nums: [2, 5, 8, 12, 1], low: 3, high: 10 }, expected: 2, description: "5 and 8 are between 3 and 10." },
          { input: { nums: [1, 2, 3, 4], low: 5, high: 10 }, expected: 0, description: "No elements fall within 5 to 10." },
          { input: { nums: [10, 10, 10], low: 10, high: 10 }, expected: 3, description: "All three elements equal 10." },
          { input: { nums: [], low: 0, high: 100 }, expected: 0 },
          { input: { nums: [-5, 0, 5], low: -10, high: 0 }, expected: 2 },
          { input: { nums: [100, 200, 300], low: 50, high: 250 }, expected: 2 },
        ],
        hint: "Initialize `count = 0`. Loop through `for x in nums:` and increment `count += 1` if `low <= x <= high`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nLists are central to almost every interview problem:\n\n- **Two Sum**, **Best Time to Buy and Sell Stock**, and **Product of Array Except Self** are built entirely around list indexing and traversal.\n- **Valid Palindrome** checks symmetry using list/string reversal: `s == s[::-1]`.\n- **Valid Parentheses**, **Daily Temperatures**, and **Min Stack** use `append()` and `pop()` as high-speed Stack operations.\n- **Number of Islands**, **Rotting Oranges**, and **Rotate Image** navigate 2D grids using row and column coordinates `grid[r][c]`.",
    },
  ],
};

export default lesson;
