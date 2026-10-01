import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "references",
  title: "Pointers & References",
  goal: "Understand Python's object model: distinguish names from values, master aliasing and mutability, compare 'is' vs '==', copy data safely, and avoid accidental mutations in algorithms.",
  estimatedMinutes: 25,
  icon: "link",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Name tags vs Boxes: Python's Memory Model\nMost beginners imagine a variable as a cardboard box holding data: `a = [1, 2, 3]` means putting `[1, 2, 3]` inside a box labeled `a`.\n\nIn Python, that mental model leads straight into bugs! A variable is **not a box**; it is a **name tag tied with a string to an object** floating in memory.\n\nWhen you write `b = a`, Python does **not** make a new list. It simply attaches a second name tag `b` to the exact same list object!",
    },
    {
      kind: "code",
      caption: "Press Visualize to see both name tags `a` and `b` pointing to the exact same list in memory.",
      visualize: true,
      code: `a = [1, 2, 3]
b = a  # b is an alias: a second name tag on the same list!

b.append(4)

print("List a:", a)
print("List b:", b)
`,
    },
    {
      kind: "text",
      markdown:
        "### 'is' vs '==': Identity vs Equality\nPython has two ways to compare objects:\n\n- **`==`** checks **equality**: Do these two objects have the same *contents* or values?\n- **`is`** checks **identity**: Are these two names pointing to the *exact same object* in computer memory?\n\n`id(x)` gives the unique integer memory address where object `x` lives. Writing `a is b` is literally shorthand for `id(a) == id(b)`.",
    },
    {
      kind: "code",
      caption: "list1 and list2 have identical contents, but they are two distinct objects at different memory addresses.",
      code: `list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print("list1 == list2:", list1 == list2)  # True: same contents
print("list1 is list2:", list1 is list2)  # False: different objects in memory!
print("list1 is list3:", list1 is list3)  # True: same object

print("Address of list1:", id(list1))
print("Address of list2:", id(list2))  # Different number!
print("Address of list3:", id(list3))  # Same number as list1!
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `x = [10, 20]
y = [10, 20]
print(x == y, x is y)`,
        options: ["True True", "True False", "False True", "False False"],
        answerIndex: 1,
        explanation:
          "`x == y` is True because both lists contain `[10, 20]`. `x is y` is False because they were created independently and reside at different memory locations.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Mutable vs Immutable Objects\nWhy didn't aliasing cause problems when we used integers and strings in earlier lessons?\n\nBecause numbers, strings, booleans, and tuples are **immutable** (they can never change):\n- When you do `x = 5; y = x; x += 1`, Python does not change the number 5. It creates a new integer 6 and moves the `x` name tag to 6. `y` remains on 5.\n\nLists, dictionaries, and sets are **mutable**:\n- When you call `.append()` or assign to an index, the existing object changes in place. Every variable pointing to that object sees the change!",
    },
    {
      kind: "code",
      caption: "Press Visualize to see numbers reassigning to new objects, while lists mutate in place.",
      visualize: true,
      code: `# Immutable: numbers cannot change; tags move
x = 10
y = x
x += 5
print("x:", x, "y:", y)  # y is still 10

# Mutable: the list itself mutates in place
nums1 = [10]
nums2 = nums1
nums1.append(5)
print("nums1:", nums1, "nums2:", nums2)  # nums2 sees [10, 5]!
`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The 2D Grid Trap: [[0] * 3] * 3",
      markdown:
        "This is the single most common Python bug in technical interviews!\n\nWriting `grid = [[0] * 3] * 3` creates an outer list of 3 items, but all 3 items point to the **exact same row in memory**. If you write `grid[0][0] = 1`, all 3 rows change!\n\n**The Fix**: Use a list comprehension to create independent rows:\n`grid = [[0] * cols for _ in range(rows)]`",
    },
    {
      kind: "code",
      caption: "Press Visualize to see how `[[0] * 3] * 3` creates shared row references, while separate row creation creates independent rows.",
      visualize: true,
      code: `# The TRAP: 3 aliases of the same row
buggy = [[0] * 3] * 3
buggy[0][0] = 99
print("Buggy grid (all rows changed!):", buggy)

# The FIX: 3 distinct rows created separately
correct = []
for _ in range(3):
    correct.append([0] * 3)
correct[0][0] = 99
print("Correct grid (only row 0 changed):", correct)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `row = [0, 0]
matrix = [row, row]
matrix[0][1] = 5
print(matrix[1][1])`,
        options: ["0", "5", "None", "IndexError"],
        answerIndex: 1,
        explanation:
          "Both `matrix[0]` and `matrix[1]` reference the exact same `row` list. Modifying `matrix[0][1]` changes `row[1]` to 5, so `matrix[1][1]` is also 5.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Copying objects: Shallow vs Deep\nTo make an independent copy of a list so future modifications won't alter the original, make a **shallow copy**:\n\n- `copy_list = original[:]` (slicing)\n- `copy_list = original.copy()`\n- `copy_list = list(original)`\n\nAll three create a brand new list in memory with its own memory address. Adding or removing elements in `copy_list` has zero effect on `original`.",
    },
    {
      kind: "code",
      caption: "Making an independent copy with `[:]`. Notice `original is independent` is False!",
      code: `original = [1, 2, 3]
independent = original[:]  # creates a new list object

independent.append(99)

print("Original list:", original)
print("Copied list:  ", independent)
print("Are they the same object?", original is independent)
`,
    },
    {
      kind: "text",
      markdown:
        "### Passing objects to functions\nPython uses **pass-by-object-reference**:\n\nWhen you pass a list into a function, the function's parameter becomes an alias to that list. If the function modifies the list using methods like `.append()` or `nums[i] = ...`, the caller's list is modified too!\n\nHowever, if the function reassigns `nums = [...]`, it simply moves its own local name tag to a new object; the caller's variable remains unchanged.",
    },
    {
      kind: "callout",
      tone: "insight",
      title: "Why Backtracking MUST append copies",
      markdown:
        "In algorithm problems like **Subsets** or **Permutations**, you maintain a running `path` list. If you write `results.append(path)`, you only stored a reference to `path`. When the algorithm later backtracks with `path.pop()`, every entry inside `results` mutates too!\n\nYou must always store a snapshot copy: `results.append(path[:])` or `results.append(list(path))`.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def add_item(items):
    items.append("apple")

cart = ["banana"]
add_item(cart)
print(len(cart))`,
        options: ["1", "2", "0", "TypeError"],
        answerIndex: 1,
        explanation:
          "`items` inside `add_item` is an alias to `cart`. Calling `items.append(\"apple\")` mutates the list in place. `cart` now has 2 elements: `[\"banana\", \"apple\"]`.",
        predictsOutput: true,
      },
    },
    {
      kind: "table",
      caption: "Python types: Mutability & Copying",
      headers: ["Type", "Mutable?", "How to copy", "Safe as Dict key / Set item?"],
      rows: [
        ["int, float, bool", "No (immutable)", "Automatic", "Yes"],
        ["str", "No (immutable)", "Automatic", "Yes"],
        ["tuple", "No (immutable)", "Automatic", "Yes (if contents are immutable)"],
        ["list", "Yes (mutable)", "lst[:] or lst.copy()", "No (unhashable)"],
        ["dict", "Yes (mutable)", "d.copy()", "No (unhashable)"],
        ["set", "Yes (mutable)", "s.copy()", "No (unhashable)"],
      ],
    },
    {
      kind: "exercise",
      exercise: {
        id: "references-double-in-place",
        title: "Double elements in place",
        prompt:
          "Write a function `double_in_place(nums)` that multiplies every number in `nums` by 2 **in place** (modifying the existing list object, without creating a new list). Return `nums`.\n\nFor example, if `nums = [1, 2, 3]`, modifying it in place turns `nums` into `[2, 4, 6]`.",
        starterCode: `def double_in_place(nums):
    # Modify elements of nums in place
    return nums
`,
        solution: `def double_in_place(nums):
    for i in range(len(nums)):
        nums[i] *= 2
    return nums
`,
        harness: { kind: "function", entry: "double_in_place", inPlace: "nums" },
        testCases: [
          { input: { nums: [1, 2, 3] }, expected: [2, 4, 6], description: "Each number is doubled in place." },
          { input: { nums: [0, -5, 10] }, expected: [0, -10, 20], description: "Handles zeros and negative numbers." },
          { input: { nums: [] }, expected: [] },
          { input: { nums: [7] }, expected: [14] },
          { input: { nums: [-1, -2, -3] }, expected: [-2, -4, -6] },
          { input: { nums: [100, 200] }, expected: [200, 400] },
        ],
        hint: "Loop through indices with `for i in range(len(nums)):` and assign `nums[i] *= 2` directly.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "references-create-grid",
        title: "Create independent 2D grid",
        prompt:
          "Write a function `create_grid(rows, cols, initial_val)` that creates and returns a 2D grid (list of lists) with dimensions `rows` × `cols`, where every cell is set to `initial_val`.\n\n**Crucial requirement**: Every row in the grid must be an independent list! Modifying a cell in row 0 must never affect any other row.\n\nFor example, `create_grid(2, 3, 0)` returns `[[0, 0, 0], [0, 0, 0]]`.",
        starterCode: `def create_grid(rows, cols, initial_val):
    # Create a 2D grid of rows x cols without row aliasing
    return []
`,
        solution: `def create_grid(rows, cols, initial_val):
    grid = []
    for _ in range(rows):
        grid.append([initial_val] * cols)
    return grid
`,
        harness: { kind: "function", entry: "create_grid" },
        testCases: [
          { input: { rows: 2, cols: 3, initial_val: 0 }, expected: [[0, 0, 0], [0, 0, 0]], description: "2 rows of 3 zeros." },
          { input: { rows: 1, cols: 1, initial_val: 5 }, expected: [[5]], description: "1x1 grid." },
          { input: { rows: 3, cols: 2, initial_val: "x" }, expected: [["x", "x"], ["x", "x"], ["x", "x"]] },
          { input: { rows: 0, cols: 0, initial_val: 0 }, expected: [] },
          { input: { rows: 2, cols: 2, initial_val: 1 }, expected: [[1, 1], [1, 1]] },
          { input: { rows: 1, cols: 3, initial_val: 99 }, expected: [[99, 99, 99]] },
        ],
        hint: "Loop `for _ in range(rows):` and append a fresh row `[initial_val] * cols` to `grid` each time. Do NOT multiply the outer list!",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nUnderstanding references and pointers is vital across LeetCode patterns:\n\n- **Subsets**, **Permutations**, and **Combination Sum**: appending snapshots with `res.append(path[:])` so backtracking doesn't corrupt previous results.\n- **Rotate Image** and **Set Matrix Zeroes**: modifying matrices in place with O(1) extra space.\n- **Reverse Linked List** and **Reorder List**: manipulating node pointer references (`curr.next = prev`).\n- **Clone Graph**: using a dictionary mapping `{old_node: new_node}` to handle shared references and cycles.",
    },
  ],
};

export default lesson;
