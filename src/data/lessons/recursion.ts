import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "recursion",
  title: "Recursion & the Call Stack",
  goal: "Master base cases, recursive cases, and the call stack to solve divide-and-conquer and tree problems.",
  estimatedMinutes: 30,
  icon: "repeat-2",
  blocks: [
    {
      kind: "text",
      markdown:
        "### What is recursion?\nRecursion can feel mysterious at first, but it is one of computer science's most elegant ideas: **solving a big problem by delegating smaller versions of the exact same problem to yourself**.\n\nIf you have ever opened Russian nesting dolls (Matryoshka)—opening one doll only to find a smaller identical doll inside, until you reach the solid miniature doll at the core—you have already experienced recursion.\n\nIn this lesson, we will demystify how Python's call stack keeps track of recursive calls, see why infinite recursion happens, and discover why recursion is the natural superpower for trees and backtracking.",
    },
    {
      kind: "text",
      markdown:
        "### 1. The Two Golden Rules of Recursion\nEvery recursive function in the world must have two essential parts:\n\n1. **The Base Case**: The stopping condition. This is the simplest possible input where the answer is immediately known without any further function calls (the solid doll at the center). Without it, your function will run forever.\n2. **The Recursive Case**: The rule that breaks the problem into a strictly smaller subproblem and calls the function again.",
    },
    {
      kind: "code",
      caption: "A classic countdown: the base case stops when n <= 0; the recursive case counts down.",
      code: `def countdown(n):
    # 1. Base case: stop when we reach zero
    if n <= 0:
        print("Blastoff!")
        return

    # 2. Recursive case: print current number and recurse on n - 1
    print(n)
    countdown(n - 1)

countdown(3)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def mystery(n):
    if n <= 1:
        return 1
    return n + mystery(n - 1)

print(mystery(4))`,
        options: ["10", "4", "24", "7"],
        answerIndex: 0,
        explanation:
          "`mystery(4)` evaluates to `4 + mystery(3) = 4 + 3 + mystery(2) = 4 + 3 + 2 + mystery(1) = 4 + 3 + 2 + 1 = 10`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 2. The Call Stack and Factorial\nHow does Python remember where to go back to when a function call finishes?\n\nPython uses an internal data structure called the **Call Stack** (like a vertical stack of dinner plates):\n- Every time a function is called, Python places a new frame on top of the stack, holding that call's arguments and local variables.\n- When the function reaches its base case and returns, that top frame is removed (\"popped\"), and control returns to the frame directly beneath it.\n\nLet's calculate the factorial $n! = n \\times (n-1)!$ with $1! = 1$:",
    },
    {
      kind: "code",
      caption: "Press Visualize to watch stack frames accumulate during recursive descent and pop off as values multiply back up.",
      visualize: true,
      code: `def factorial(n):
    # Base case: 1! is 1
    if n <= 1:
        return 1

    # Recursive case: n * (n - 1)!
    return n * factorial(n - 1)

result = factorial(4)
print("4! =", result)
`,
    },
    {
      kind: "text",
      markdown:
        "### 3. Stack Overflow: Missing the Base Case\nWhat happens if a recursive function forgets its base case, or if the argument never moves closer to the stopping condition?\n\nEach recursive call stacks another frame in memory. Because memory isn't infinite, Python protects your computer by throwing a `RecursionError` as soon as the stack exceeds its safety limit (typically 1,000 calls).",
    },
    {
      kind: "code",
      caption: "This snippet deliberately fails with RecursionError because it has no base case.",
      expectError: true,
      code: `def infinite_descent(n):
    # Bug: no base case! This will call itself forever
    return infinite_descent(n - 1)

infinite_descent(10)
`,
    },
    {
      kind: "text",
      markdown:
        "### 4. Branching Recursion: Fibonacci Numbers\nIn factorial, each call made a single recursive call. But functions can also branch into multiple subproblems!\n\nThe Fibonacci sequence is defined by:\n- $F(0) = 0$\n- $F(1) = 1$\n- $F(n) = F(n-1) + F(n-2)$ for $n \\ge 2$\n\nNotice that each call branches into **two** child calls, creating a recursion tree.",
    },
    {
      kind: "code",
      caption: "Branching recursion: each non-base call spawns two additional calls.",
      code: `def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

print("fib(0):", fib(0))
print("fib(1):", fib(1))
print("fib(5):", fib(5))
print("fib(6):", fib(6))
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(4))`,
        options: ["3", "2", "5", "8"],
        answerIndex: 0,
        explanation:
          "`fib(4) = fib(3) + fib(2) = (fib(2) + fib(1)) + (fib(1) + fib(0)) = (1 + 1) + (1 + 0) = 2 + 1 = 3`.",
        predictsOutput: true,
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Recursion vs Iteration",
      markdown:
        "Any problem that can be solved recursively can also be solved iteratively using a loop (and an explicit list as a stack if needed). Loops use less memory because they avoid call stack overhead. However, for hierarchical structures like trees and nested directories, recursive code is often 5 lines instead of 30.",
    },
    {
      kind: "text",
      markdown:
        "### 5. Recursion in Trees: The Natural Superpower\nWhy are trees and recursion mentioned together so often?\n\nBecause a binary tree is a **recursive data structure**! A tree is just a root node whose left child is another tree, and whose right child is another tree.\n\nTo find the maximum depth (height) of a binary tree:\n- Base case: an empty tree (`root is None`) has depth `0`.\n- Recursive case: depth is `1 + max(depth(left), depth(right))`.",
    },
    {
      kind: "code",
      caption: "Recursive tree traversal: solving the problem for the left and right subtrees.",
      code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if root is None:
        return 0
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    return 1 + max(left_depth, right_depth)

# Tree:
#      1
#     / \\
#    2   3
#   /
#  4
root = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))
print("Max depth of tree:", max_depth(root))
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What is the standard base case when traversing a binary tree recursively?",
        options: [
          "When `root is None`, return a base value (like 0, None, or True).",
          "When `root.val == 0`, stop the recursion.",
          "When the call stack reaches 1,000 frames.",
          "When the node has only one child.",
        ],
        answerIndex: 0,
        explanation:
          "Every path in a binary tree ends at a `None` pointer past a leaf node. Checking `if root is None:` is the standard base case that stops recursion safely.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "recursion-sum-to-n",
        title: "Recursive Sum from 1 to n",
        prompt:
          "Write a recursive function `recursive_sum(n: int) -> int` that calculates the sum of all integers from 1 up to `n` (for example, $1 + 2 + 3 + 4 + 5 = 15$). If `n <= 0`, return `0`.\n\nYou must solve this recursively without using `for`, `while`, or Python's `sum()`.",
        starterCode: `def recursive_sum(n: int) -> int:
    # 1. Base case: if n <= 0, return 0
    # 2. Recursive case: n + recursive_sum(n - 1)
    return 0
`,
        solution: `def recursive_sum(n: int) -> int:
    if n <= 0:
        return 0
    return n + recursive_sum(n - 1)
`,
        harness: { kind: "function", entry: "recursive_sum" },
        testCases: [
          { input: { n: 5 }, expected: 15, description: "1 + 2 + 3 + 4 + 5 = 15." },
          { input: { n: 1 }, expected: 1, description: "Single number 1." },
          { input: { n: 0 }, expected: 0, description: "0 or negative returns 0." },
          { input: { n: 4 }, expected: 10 },
          { input: { n: 10 }, expected: 55 },
          { input: { n: -3 }, expected: 0 },
        ],
        hint: "Check `if n <= 0: return 0`. Otherwise, `return n + recursive_sum(n - 1)`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "recursion-tree-max-depth",
        title: "Maximum Depth of Binary Tree",
        prompt:
          "Given the `root` of a binary tree, return its maximum depth (the number of nodes along the longest path from the root node down to the farthest leaf node). If the tree is empty (`root is None`), return 0.\n\nThe `TreeNode` class is already defined for you.",
        starterCode: `# Definition for a binary tree node:
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def max_depth(root) -> int:
    # Base case: if root is None, return 0
    # Recursive case: 1 + max(max_depth(root.left), max_depth(root.right))
    return -1
`,
        solution: `def max_depth(root) -> int:
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
`,
        harness: { kind: "function", entry: "max_depth", argTypes: { root: "tree" } },
        testCases: [
          { input: { root: [3, 9, 20, null, null, 15, 7] }, expected: 3, description: "Root -> 20 -> 15 is 3 nodes deep." },
          { input: { root: [1, null, 2] }, expected: 2, description: "Two levels." },
          { input: { root: [] }, expected: 0, description: "Empty tree has depth 0." },
          { input: { root: [1] }, expected: 1, description: "Single root node has depth 1." },
          { input: { root: [1, 2, 3, 4, 5] }, expected: 3 },
        ],
        hint: "Check `if root is None: return 0`. Return `1 + max(max_depth(root.left), max_depth(root.right))`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nRecursion is the engine powering hundreds of interview questions:\n\n- **Maximum Depth of Binary Tree** & **Invert Binary Tree**: fundamental tree operations solved in 3-4 lines of recursion.\n- **Same Tree** & **Subtree of Another Tree**: comparing tree structures recursively.\n- **Climbing Stairs**: Fibonacci recurrence relation.\n- **Subsets**, **Permutations**, and **Combination Sum**: backtracking uses recursion to explore every possible choice and backtrack when stuck.\n- **Word Search**: Depth-First Search (DFS) on a 2D grid.",
    },
  ],
};

export default lesson;
