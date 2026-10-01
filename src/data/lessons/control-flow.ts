import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "control-flow",
  title: "Decisions & Loops",
  goal: "Make decisions with if/elif/else, repeat actions with while and for loops, count with range(), and steer loops with break and continue.",
  estimatedMinutes: 25,
  icon: "repeat",
  blocks: [
    {
      kind: "text",
      markdown:
        "### How programs make decisions\nIn the previous lesson, every program ran in a straight line: line 1, then line 2, then line 3. But real programs need to make choices: *if the password is correct, let them in; otherwise, show an error*.\n\nPython uses `if`, `elif` (short for *else if*), and `else` to choose which block of code to run. Think of it like a fork in the road: Python checks each sign in order, takes the first path whose condition is `True`, and skips the rest.",
    },
    {
      kind: "code",
      caption: "Python checks conditions from top to bottom. As soon as one is True, it runs that indented block and skips the rest.",
      code: `score = 85

if score >= 90:
    print("Grade: A - Outstanding!")
elif score >= 80:
    print("Grade: B - Great job!")
elif score >= 70:
    print("Grade: C - Good effort!")
else:
    print("Grade: F - Keep practicing!")
`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Indentation is Python's syntax",
      markdown:
        "In most languages, curly braces `{ }` wrap blocks of code. In Python, **indentation (4 spaces)** defines which lines belong inside the `if`. Every line inside the block must be indented by the exact same number of spaces.\n\nDon't forget the colon `:` at the end of each `if`, `elif`, or `else` line — it tells Python: *the indented block starts on the next line*.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `score = 75
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
elif score >= 60:
    print("C")
else:
    print("F")`,
        options: ["A", "B", "C", "F"],
        answerIndex: 1,
        explanation:
          "Python checks `score >= 90` (False, 75 is less than 90), then checks `score >= 70` (True, 75 >= 70). It prints \"B\" and immediately skips the remaining `elif` and `else` branches.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Combining conditions with and, or, not\nYou can combine multiple yes/no questions into a single check:\n\n- `and`: both conditions must be `True`\n- `or`: at least one condition must be `True`\n- `not`: flips `True` to `False` (and vice versa)\n\nYou can also chain comparisons naturally, just like in mathematics: `0 <= x < 100` checks if `x` is between 0 and 99 in one go.",
    },
    {
      kind: "code",
      caption: "Checking age brackets and membership status with logical operators.",
      code: `age = 22
has_ticket = True

if age >= 18 and has_ticket:
    print("Welcome to the concert!")
else:
    print("Admission denied.")

# Chained comparison: checks both 0 <= age and age <= 120
if 0 <= age <= 120:
    print("Valid age entered.")
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `x = 12
if x > 10 and x % 2 == 0:
    print("big even")
else:
    print("other")`,
        options: ["big even", "other", "big", "even"],
        answerIndex: 0,
        explanation:
          "`x > 10` is True (12 > 10) and `x % 2 == 0` is True (12 divided by 2 has remainder 0). Since both are True, the `and` condition is True and Python prints \"big even\".",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### while loops: repeating while True\nA `while` loop keeps running its indented block of code **as long as its condition remains True**. Before each turn, Python checks the condition. If it is still `True`, it runs the block again. Once the condition becomes `False`, Python jumps past the loop.\n\nEvery turn of a loop is called an **iteration**.",
    },
    {
      kind: "code",
      caption: "Press Visualize to watch `countdown` decrease on each turn until it hits 0.",
      visualize: true,
      code: `countdown = 3

while countdown > 0:
    print("T-minus", countdown)
    countdown -= 1

print("Blastoff!")
`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The infinite loop trap",
      markdown:
        "If the condition never becomes `False`, the loop will run forever and freeze your program! Always make sure the code inside the loop modifies a variable so the condition eventually fails.\n\nIf you forgot `countdown -= 1` in the example above, `countdown > 0` would be True forever.",
    },
    {
      kind: "text",
      markdown:
        "### for loops and range(): counting made easy\nWhile `while` loops repeat based on a condition, `for` loops repeat for a specific sequence of items. When you want to repeat something a set number of times or count through numbers, use `range()`:\n\n- `range(stop)`: counts from `0` up to `stop - 1` (does NOT include `stop`!)\n- `range(start, stop)`: counts from `start` up to `stop - 1`\n- `range(start, stop, step)`: counts by `step` increments (use negative steps to count backwards)",
    },
    {
      kind: "code",
      caption: "Notice that range(n) always stops one step before n.",
      code: `# range(3) produces 0, 1, 2
for i in range(3):
    print("Turn", i)

# range(2, 6) produces 2, 3, 4, 5
print("Counting 2 to 5:")
for n in range(2, 6):
    print(n)

# range(6, 0, -2) counts backwards by 2s: 6, 4, 2
print("Counting down by 2s:")
for n in range(6, 0, -2):
    print(n)
`,
    },
    {
      kind: "table",
      caption: "How range() works",
      headers: ["Call", "Numbers generated", "Explanation"],
      rows: [
        ["range(4)", "0, 1, 2, 3", "Default start is 0, stops before 4"],
        ["range(1, 5)", "1, 2, 3, 4", "Starts at 1, stops before 5"],
        ["range(0, 10, 2)", "0, 2, 4, 6, 8", "Counts by 2s (step = 2)"],
        ["range(5, 0, -1)", "5, 4, 3, 2, 1", "Counts down (step = -1), stops before 0"],
      ],
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `total = 0
for i in range(1, 5):
    total += i
print(total)`,
        options: ["15", "10", "5", "4"],
        answerIndex: 1,
        explanation:
          "`range(1, 5)` produces the numbers 1, 2, 3, 4 (it stops before 5). Adding them up: 1 + 2 + 3 + 4 = 10.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Steering loops: break and continue\nSometimes you want to alter the normal flow of a loop:\n\n- `break`: **exits the loop immediately**, jumping straight to the code after the loop.\n- `continue`: **skips the rest of the current turn** and jumps straight to the next iteration.\n\nThink of `break` as an emergency exit button, and `continue` as hitting the \"skip song\" button.",
    },
    {
      kind: "code",
      caption: "Press Visualize to watch `break` stop the search once 7 is found, and `continue` skip even numbers.",
      visualize: true,
      code: `# Finding a number and stopping early
target = 7
found = False

for num in [2, 4, 7, 9, 11]:
    if num == target:
        found = True
        break  # No need to keep searching!

print("Found target?", found)

# Printing only odd numbers
for n in range(6):
    if n % 2 == 0:
        continue  # Skip evens, jump to next turn
    print("Odd:", n)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `count = 0
for x in [1, 2, 3, 4, 5]:
    if x == 3:
        continue
    if x == 5:
        break
    count += x
print(count)`,
        options: ["15", "10", "7", "3"],
        answerIndex: 2,
        explanation:
          "x=1: count becomes 1. x=2: count becomes 3. x=3: `continue` skips adding 3. x=4: count becomes 7. x=5: `break` exits the loop before adding 5. The final count is 7.",
        predictsOutput: true,
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "control-flow-sum-evens",
        title: "Sum of even numbers",
        prompt:
          "Given a positive integer `n`, calculate and return the sum of all positive even numbers from `2` up to `n` (inclusive).\n\nFor example, if `n` is `6`, the even numbers are `2, 4, 6`, so the sum is `2 + 4 + 6 = 12`. If `n` is `1`, there are no positive even numbers, so return `0`.\n\nHint: Use `for` with `range(2, n + 1, 2)` or loop through all numbers and check `i % 2 == 0`.",
        starterCode: `def sum_even_numbers(n):
    # Sum all even numbers from 2 up to n (inclusive)
    total = 0
    return total
`,
        solution: `def sum_even_numbers(n):
    total = 0
    # Step by 2 starting from 2 up to n + 1
    for i in range(2, n + 1, 2):
        total += i
    return total
`,
        harness: { kind: "function", entry: "sum_even_numbers" },
        testCases: [
          { input: { n: 6 }, expected: 12, description: "2 + 4 + 6 = 12" },
          { input: { n: 7 }, expected: 12, description: "7 is odd, so we still sum 2 + 4 + 6 = 12" },
          { input: { n: 1 }, expected: 0, description: "No positive even numbers between 2 and 1." },
          { input: { n: 2 }, expected: 2 },
          { input: { n: 10 }, expected: 30 },
          { input: { n: 0 }, expected: 0 },
        ],
        hint: "`range(2, n + 1, 2)` starts at 2 and steps by 2 up to n. Remember to use `n + 1` so n itself is included.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "control-flow-find-first-negative",
        title: "Find first negative number",
        prompt:
          "Given a list of numbers `nums`, find and return the **index** (position) of the first negative number (a number strictly less than `0`). If the list contains no negative numbers, return `-1`.\n\nFor example, given `[3, 5, -2, 7]`, the first negative number is `-2` at index `2`, so return `2`.",
        starterCode: `def find_first_negative(nums):
    # Return the index of the first negative number, or -1 if none exists
    return 0
`,
        solution: `def find_first_negative(nums):
    # Iterate through all positions in the list
    for i in range(len(nums)):
        if nums[i] < 0:
            return i
    # If no negative number was found after checking all items
    return -1
`,
        harness: { kind: "function", entry: "find_first_negative" },
        testCases: [
          { input: { nums: [3, 5, -2, 7, -8] }, expected: 2, description: "-2 is the first negative number, at index 2." },
          { input: { nums: [10, 20, 30] }, expected: -1, description: "All numbers are positive, so return -1." },
          { input: { nums: [-4, 5, 6] }, expected: 0, description: "The very first number is negative, at index 0." },
          { input: { nums: [] }, expected: -1, description: "Empty list has no negative numbers." },
          { input: { nums: [0, 0, -1] }, expected: 2 },
          { input: { nums: [5, 4, 3, 2, 1, -99] }, expected: 5 },
        ],
        hint: "Loop through indices with `for i in range(len(nums)):`. Check `if nums[i] < 0:` and `return i` immediately.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nAlmost every LeetCode problem requires loops and conditional logic:\n\n- **Two Pointers** (**Valid Palindrome**, **Two Sum II**) uses `while left < right:` to squeeze pointers together from both ends.\n- **Binary Search** (**Binary Search**, **Search a 2D Matrix**) cuts the search space in half with `while low <= high:` and `if`/`elif` checks.\n- **Sliding Window** (**Best Time to Buy and Sell Stock**) expands a window using `for right in range(len(prices)):`.\n- **Fast and Slow Pointers** (**Linked List Cycle**) drives forward with `while fast and fast.next:`.",
    },
  ],
};

export default lesson;
