import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "functions",
  title: "Functions & Return Values",
  goal: "Package code into reusable functions with def, pass parameters, return values to callers, master local scope, use default arguments, and unpack multiple returns.",
  estimatedMinutes: 20,
  icon: "box",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Packaging code into reusable tools\nImagine you had to write the exact same five lines of code every time you wanted to calculate a price with tax, or find the middle of an array. Your code would quickly become a huge, unreadable mess.\n\nA **function** is a named, reusable block of code. Think of it like a kitchen blender: you put ingredients into the top (parameters), press the button, and it hands you back a smoothie (return value). You can use it as many times as you want without rebuilding the blender.",
    },
    {
      kind: "code",
      caption: "`def` defines the function. Calling `greet(\"Ada\")` runs the code inside and returns a greeting.",
      code: `def greet(name):
    # 'name' is a parameter: a placeholder for the real input
    return f"Hello, {name}!"

# Call the function with different arguments
message1 = greet("Ada")
message2 = greet("Grace")

print(message1)
print(message2)
`,
    },
    {
      kind: "text",
      markdown:
        "### Parameters vs Arguments\nThese two words are often used interchangeably, but there is a clear distinction:\n\n- A **parameter** is the variable name listed in the `def` line (the placeholder slot, e.g. `name`).\n- An **argument** is the actual value you pass into the function when you call it (e.g. `\"Ada\"`).\n\nYou can define functions with zero, one, or many parameters separated by commas: `def add(a, b):`.",
    },
    {
      kind: "text",
      markdown:
        "### The Great Confusion: return vs print\nThis is the **number one trap** for beginners learning Python:\n\n- `print()` **displays text on the screen** for a human to look at. The computer cannot save or reuse what was printed. It is like shouting a number out loud.\n- `return` **hands the result back to your code**. The caller can store it in a variable, pass it to another function, or use it in a calculation. It is like writing the answer on a slip of paper and handing it to someone.\n\nOnce a function executes `return`, it **stops immediately** and hands control back. Any lines below the `return` statement are skipped.\n\nIf a function finishes without an explicit `return`, it automatically returns `None`.",
    },
    {
      kind: "code",
      caption: "Watch what happens when you try to save the result of a function that prints vs one that returns.",
      code: `def square_and_print(n):
    print("Inside function:", n * n)
    # No return statement here!

def square_and_return(n):
    return n * n

result1 = square_and_print(4)
result2 = square_and_return(4)

print("result1 is:", result1)
print("result2 + 10 is:", result2 + 10)
`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The #1 beginner bug on LeetCode",
      markdown:
        "When submitting answers on LeetCode or coding platforms, your function must **`return`** the answer, not `print` it! The automated grader checks the returned value. If your function only prints, the grader sees `None` and marks your solution incorrect.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def double(x):
    x * 2

result = double(5)
print(result)`,
        options: ["10", "5", "None", "Error"],
        answerIndex: 2,
        explanation:
          "`double()` calculates `x * 2`, but it never says `return x * 2`. A Python function without an explicit `return` statement always returns `None`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Scope: Local vs Global\nWhere does a variable live?\n\nA variable created **inside** a function has **local scope**. It is born when the function runs, and it is destroyed the moment the function finishes. The outside world cannot see or touch it.\n\nA variable created **outside** all functions has **global scope**. Functions can read global variables, but assigning to a variable inside a function creates a *new local* variable by default, leaving the outside variable untouched.",
    },
    {
      kind: "code",
      caption: "This fails on purpose: `tax_rate` only exists inside `calculate_tax`. Trying to use it outside raises a NameError.",
      expectError: true,
      code: `def calculate_tax(income):
    tax_rate = 0.2  # local to calculate_tax
    return income * tax_rate

print(calculate_tax(1000))
print(tax_rate)  # Error: tax_rate does not exist out here!
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `score = 10

def boost():
    score = 50

boost()
print(score)`,
        options: ["10", "50", "60", "None"],
        answerIndex: 0,
        explanation:
          "Inside `boost()`, `score = 50` creates a new local variable named `score`. It does not change the global `score` defined outside. When `print(score)` runs, the global variable is still 10.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Default arguments: handy fallbacks\nYou can assign default values to parameters by writing `param=default_value` in the `def` line. If the caller provides an argument, Python uses it; if they omit it, Python uses the default.\n\nRule: all parameters with default values must come **after** parameters without defaults.",
    },
    {
      kind: "code",
      caption: "When called with one argument, `exponent` defaults to 2 (squaring). When called with two, the second argument overrides the default.",
      code: `def power(base, exponent=2):
    return base ** exponent

print(power(5))       # 5 ** 2 = 25 (uses default exponent=2)
print(power(2, 3))    # 2 ** 3 = 8  (overrides default with 3)
print(power(10, 0))   # 10 ** 0 = 1
`,
    },
    {
      kind: "text",
      markdown:
        "### Returning multiple values with tuples\nIn many languages, functions can only return a single value. In Python, you can return multiple values simply by separating them with commas:\n\n```python\nreturn min_val, max_val\n```\n\nBehind the scenes, Python bundles them into a `tuple` (an immutable list). The caller can unpack them directly into separate variables on one line: `low, high = find_bounds(nums)`.",
    },
    {
      kind: "code",
      caption: "Returning quotient and remainder in one go, then unpacking both into separate variables.",
      code: `def divide_with_remainder(dividend, divisor):
    quotient = dividend // divisor
    remainder = dividend % divisor
    return quotient, remainder

q, r = divide_with_remainder(17, 5)
print("Quotient:", q)
print("Remainder:", r)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `def get_dimensions():
    return 1920, 1080

w, h = get_dimensions()
print(w, h)`,
        options: ["1920 1080", "(1920, 1080)", "1080 1920", "1920"],
        answerIndex: 0,
        explanation:
          "`get_dimensions()` returns two values. `w, h = ...` unpacks 1920 into `w` and 1080 into `h`. `print(w, h)` prints both with a space between them: `1920 1080`.",
        predictsOutput: true,
      },
    },
    {
      kind: "table",
      caption: "Core function concepts at a glance",
      headers: ["Concept", "Syntax", "What it does"],
      rows: [
        ["def", "def solve(n):", "Defines a new function named solve"],
        ["parameter", "def area(w, h):", "Placeholder variables inside the parentheses"],
        ["return", "return answer", "Hands value back to caller and stops the function immediately"],
        ["default value", "def run(speed=5):", "Fallback value used when the argument is omitted"],
        ["multiple returns", "return a, b", "Packages values as a tuple, easily unpacked by caller"],
        ["local scope", "x = 10 inside def", "Variable exists only while the function is executing"],
      ],
    },
    {
      kind: "exercise",
      exercise: {
        id: "functions-clamp",
        title: "Clamp a number to a range",
        prompt:
          "Write a function `clamp(val, low, high)` that restricts `val` to stay within the range `[low, high]`:\n- If `val` is less than `low`, return `low`.\n- If `val` is greater than `high`, return `high`.\n- Otherwise, return `val` as is.\n\nFor example, `clamp(5, 1, 10)` returns `5`, while `clamp(-3, 0, 10)` returns `0`.",
        starterCode: `def clamp(val, low, high):
    # Restrict val so it is never less than low and never greater than high
    return 0
`,
        solution: `def clamp(val, low, high):
    if val < low:
        return low
    elif val > high:
        return high
    return val
`,
        harness: { kind: "function", entry: "clamp" },
        testCases: [
          { input: { val: 5, low: 1, high: 10 }, expected: 5, description: "5 is between 1 and 10, so return 5." },
          { input: { val: -3, low: 0, high: 10 }, expected: 0, description: "-3 is below 0, so clamp up to 0." },
          { input: { val: 25, low: 0, high: 10 }, expected: 10, description: "25 is above 10, so clamp down to 10." },
          { input: { val: 0, low: 0, high: 10 }, expected: 0 },
          { input: { val: 10, low: 0, high: 10 }, expected: 10 },
          { input: { val: 7, low: 7, high: 7 }, expected: 7 },
        ],
        hint: "Use `if val < low: return low`, `elif val > high: return high`, and finally `return val`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "functions-min-max-diff",
        title: "Difference between max and min",
        prompt:
          "Write a function `min_max_diff(nums)` that takes a list of numbers and returns the difference between the largest and smallest numbers (`maximum - minimum`).\n\nIf the list has 1 or fewer elements, return `0`.\n\nHint: You can use Python's built-in `min(nums)` and `max(nums)`.",
        starterCode: `def min_max_diff(nums):
    # Return max(nums) - min(nums), or 0 if len(nums) <= 1
    return 0
`,
        solution: `def min_max_diff(nums):
    if len(nums) <= 1:
        return 0
    return max(nums) - min(nums)
`,
        harness: { kind: "function", entry: "min_max_diff" },
        testCases: [
          { input: { nums: [3, 8, 1, 6] }, expected: 7, description: "Max is 8, min is 1. 8 - 1 = 7." },
          { input: { nums: [5] }, expected: 0, description: "Single element list has difference 0." },
          { input: { nums: [10, -5, 2] }, expected: 15, description: "Max is 10, min is -5. 10 - (-5) = 15." },
          { input: { nums: [4, 4, 4] }, expected: 0 },
          { input: { nums: [] }, expected: 0 },
          { input: { nums: [-10, -2] }, expected: 8 },
        ],
        hint: "Check `if len(nums) <= 1: return 0`, then compute `max(nums) - min(nums)`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nFunctions are the fundamental building block of all software and LeetCode problems:\n\n- Every single LeetCode challenge asks you to implement a function, like `two_sum(nums, target)` or `is_valid(s)`.\n- In **Binary Search** and **Koko Eating Bananas**, helper functions test whether a candidate answer is feasible: `def can_finish(speed):`.\n- In **Backtracking** (**Subsets**, **Permutations**) and Trees (**Invert Binary Tree**, **Diameter of Binary Tree**), recursive helper functions encapsulate state and return values.\n- Functions that return multiple values appear when returning coordinates or pair solutions.",
    },
  ],
};

export default lesson;
