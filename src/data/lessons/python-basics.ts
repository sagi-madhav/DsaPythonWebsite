import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "python-basics",
  title: "Python Basics: Values, Variables & print()",
  goal: "Write and run tiny Python programs: print values, store them in variables, do arithmetic and comparisons, and read an error message without panicking.",
  estimatedMinutes: 25,
  icon: "terminal",
  blocks: [
    {
      kind: "text",
      markdown:
        "### What is a program?\nA program is a list of instructions for the computer, like a recipe. Python reads your instructions **one line at a time, from top to bottom**, and does exactly what each line says: nothing more, nothing less. Every NeetCode solution you'll write is just a few dozen of these lines.\n\nThe boxes below are real Python running in your browser. Press **Run** to see what a box does, then change something and run it again. You can't break anything.",
    },
    {
      kind: "code",
      caption: "`print(...)` shows whatever is inside the brackets. Commas let you print several things in a row, with a space between them.",
      code: `print("Hello, world!")
print(42)
print("I am learning", "Python")
print("2 + 3 =", 2 + 3)
`,
    },
    {
      kind: "text",
      markdown:
        "### Values and types\nEvery piece of data in Python is a **value**, and every value has a **type** that says what kind of thing it is. You'll meet these five constantly:\n\n- `int`: a whole number, like `7`, `0`, or `-12`\n- `float`: a number with a decimal point, like `3.5` or `2.0`\n- `str` (string): text, written inside quotes: `\"hello\"` or `'hello'`\n- `bool` (boolean): exactly one of two values, `True` or `False`\n- `None`: a special value meaning *nothing here*\n\n`type(value)` tells you the type of any value.",
    },
    {
      kind: "code",
      caption: "Quotes matter: `7` is a number, but `\"7\"` is text that happens to contain the digit 7.",
      code: `print(type(7))
print(type(3.5))
print(type("hi"))
print(type(True))
print(type(None))

print(7 + 7)        # numbers: adds them
print("7" + "7")    # strings: glues them together
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `print("3" + "4")`,
        options: ["7", "34", "3 4", "\"3\" + \"4\""],
        answerIndex: 1,
        explanation:
          "Both values are in quotes, so they're strings (text), not numbers. `+` on two strings glues them together, giving the text `34`. Without the quotes, `3 + 4` would be `7`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Variables are name tags\nA **variable** is a name you stick onto a value so you can use it later. `score = 10` means: *make the value 10, and stick the name tag `score` on it*.\n\nThe `=` sign does **not** mean \"equals\" like in maths. It means \"make the name on the left point at the value on the right\". So `score = score + 5` is perfectly sensible: work out `score + 5` first, then move the `score` tag onto the result.\n\nName rules: letters, digits, and underscores, never starting with a digit. Names are case-sensitive (`Score` and `score` are different). Python style uses `snake_case`: lowercase words joined by underscores, like `max_profit`.",
    },
    {
      kind: "code",
      caption: "Press Visualize and step through. Watch the tag `score` move to a new value each time it's assigned, while `bonus` keeps the value it was given.",
      visualize: true,
      code: `score = 10
print(score)
score = score + 5
print(score)
bonus = score
score = 0
print(score, bonus)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `x = 5
y = x
x = x * 2
print(x, y)`,
        options: ["10 10", "10 5", "5 10", "5 5"],
        answerIndex: 1,
        explanation:
          "`y = x` sticks the tag `y` on the value `x` had *at that moment*: 5. Then `x = x * 2` makes a new value, 10, and moves only the `x` tag onto it. `y` is still on 5.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Arithmetic\n`+`, `-`, and `*` work as you'd expect. Then there are four that DSA problems lean on heavily:\n\n- `/` is normal division and **always** gives a float: `6 / 2` is `3.0`.\n- `//` is *floor division*: divide, then round **down** to a whole number.\n- `%` (modulo) gives the **remainder** after dividing.\n- `**` is power: `2 ** 3` is 2 × 2 × 2 = 8.\n\nThink of sharing 17 cookies among 5 friends: each friend gets `17 // 5 = 3` cookies, and `17 % 5 = 2` are left over.",
    },
    {
      kind: "code",
      code: `print(7 + 3)
print(7 - 3)
print(7 * 3)
print(7 / 2)     # true division: always a float
print(7 // 2)    # floor division: how many whole 2s fit in 7
print(7 % 2)     # remainder: what is left over
print(2 ** 10)   # power: 2 to the 10th
print(-7 // 2)   # floor goes DOWN, so -3.5 becomes -4 (not -3)

count = 0
count += 1       # shorthand for: count = count + 1
count += 1
print(count)
`,
    },
    {
      kind: "table",
      caption: "Python's arithmetic operators",
      headers: ["Operator", "Name", "Example", "Result"],
      rows: [
        ["+", "add", "7 + 2", "9"],
        ["-", "subtract", "7 - 2", "5"],
        ["*", "multiply", "7 * 2", "14"],
        ["/", "divide (float)", "7 / 2", "3.5"],
        ["//", "floor divide", "7 // 2", "3"],
        ["%", "remainder", "7 % 2", "1"],
        ["**", "power", "7 ** 2", "49"],
        ["+=", "add to a variable", "x += 2", "x is now 2 bigger"],
      ],
    },
    {
      kind: "callout",
      tone: "insight",
      title: "Why DSA loves // and %",
      markdown:
        "- `n % 2 == 0` checks whether `n` is even.\n- `n % 10` is the last digit of `n`, and `n // 10` chops that digit off.\n- `mid = (left + right) // 2` finds the middle position in Binary Search. You need `//` because a position must be a whole number.\n- `i % len(nums)` wraps a position back to the start, like a clock going from 12 to 1.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `print(9 / 3, 9 // 2, 9 % 4)`,
        options: ["3 4 1", "3.0 4 1", "3.0 4.5 1", "3 4.5 2"],
        answerIndex: 1,
        explanation:
          "`/` always gives a float, so `9 / 3` is `3.0`, not `3`. `9 // 2` is 4.5 rounded down, so `4`. `9 % 4` is the remainder of 9 ÷ 4 (two 4s make 8, leaving `1`).",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Comparisons and True/False logic\nA comparison asks a yes/no question and answers with a `bool`:\n\n- `==` equal to, `!=` not equal to\n- `<` less than, `<=` less than or equal to\n- `>` greater than, `>=` greater than or equal to\n\nCombine questions with plain English words:\n\n- `a and b` is `True` only if **both** are `True`\n- `a or b` is `True` if **at least one** is `True`\n- `not a` flips `True` to `False` and back",
    },
    {
      kind: "code",
      code: `age = 20
print(age == 20)
print(age != 20)
print(age >= 18)
print(age >= 18 and age < 65)
print(age < 13 or age > 60)
print(not age > 18)
print(1 < age < 30)   # Python lets you chain comparisons like in maths
`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "= and == are different",
      markdown:
        "One `=` **assigns** (moves a name tag). Two `==` **asks** whether two values are equal. Writing `if score = 10:` is a SyntaxError; you meant `if score == 10:`. You'll learn `if` in the next lesson.",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `a = 5
b = 10
print(a > 3 and b < 5, a > 3 or b < 5)`,
        options: ["True True", "False True", "True False", "False False"],
        answerIndex: 1,
        explanation:
          "`a > 3` is True but `b < 5` is False. `and` needs both to be True, so the first answer is `False`. `or` needs just one, so the second answer is `True`.",
        predictsOutput: true,
      },
    },
    {
      kind: "code",
      caption: "Comments: everything after a `#` is ignored by Python. Use comments to explain *why* a line exists. Every solution on this site is full of them, and the visualizer shows them as narration while the code runs.",
      code: `# This whole line is a comment: Python skips it.
price = 4  # a comment can also sit at the end of a line
print(price * 3)
# print("this line is switched off, so it never runs")
`,
    },
    {
      kind: "text",
      markdown:
        "### Reading error messages\nErrors are normal. Professionals see them all day. An error message is Python telling you **what** went wrong and **where**. Read it from the bottom up:\n\n1. The **last line** names the error type and explains it, e.g. `TypeError: can only concatenate str (not \"int\") to str`.\n2. Just above it, the **line number** shows where Python gave up.\n\nThe usual suspects:\n\n- `SyntaxError`: Python can't understand the line at all (a missing `:`, quote, or bracket).\n- `NameError`: you used a name that doesn't exist yet, often a typo.\n- `TypeError`: you mixed types that don't go together, like text + number.\n- `ZeroDivisionError`: you divided by zero.\n- `IndentationError`: the spaces at the start of a line are off (more on this next lesson).",
    },
    {
      kind: "code",
      caption: "This one fails on purpose. Run it and read the last line. Then fix it: `print(\"Score: \" + str(score))` turns the number into text first, or `print(\"Score:\", score)` lets print handle it.",
      expectError: true,
      code: `score = 10
print("Score: " + score)
`,
    },
    {
      kind: "code",
      caption: "Another deliberate error: a typo. Python reports a NameError on line 2 because `totl` was never created. Fix the spelling and run it again.",
      expectError: true,
      code: `total = 5
print(totl)
`,
    },
    {
      kind: "exercise",
      exercise: {
        id: "basics-split-minutes",
        title: "Minutes to hours and minutes",
        prompt:
          "Given a whole number of minutes, work out how many full hours that is, and how many minutes are left over. For example, 135 minutes is 2 hours and 15 minutes.\n\nDon't worry about the `def` line yet: the Functions lesson explains it. Just replace the two `0`s with the right calculations using `//` and `%`. The `return` line hands your answer back to the tests.",
        starterCode: `def split_minutes(total_minutes):
    # There are 60 minutes in an hour.
    hours = 0      # replace 0 using //
    minutes = 0    # replace 0 using %
    return [hours, minutes]
`,
        solution: `def split_minutes(total_minutes):
    # How many whole hours fit into the total
    hours = total_minutes // 60
    # The minutes left over after taking out those hours
    minutes = total_minutes % 60
    return [hours, minutes]
`,
        harness: { kind: "function", entry: "split_minutes" },
        testCases: [
          { input: { total_minutes: 135 }, expected: [2, 15], description: "Two full hours is 120 minutes, leaving 15." },
          { input: { total_minutes: 60 }, expected: [1, 0], description: "Exactly one hour, nothing left over." },
          { input: { total_minutes: 59 }, expected: [0, 59], description: "Not even one full hour yet." },
          { input: { total_minutes: 0 }, expected: [0, 0] },
          { input: { total_minutes: 61 }, expected: [1, 1] },
          { input: { total_minutes: 600 }, expected: [10, 0] },
        ],
        hint: "`total_minutes // 60` counts the whole hours; `total_minutes % 60` is what's left.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "basics-is-even",
        title: "Is it even?",
        prompt:
          "Return `True` if `n` is even and `False` if it's odd. Replace `False` on the return line with a comparison that works it out.",
        starterCode: `def is_even(n):
    # A number is even when dividing by 2 leaves no remainder.
    return False
`,
        solution: `def is_even(n):
    # Even numbers leave a remainder of 0 when divided by 2
    return n % 2 == 0
`,
        harness: { kind: "function", entry: "is_even" },
        testCases: [
          { input: { n: 4 }, expected: true, description: "4 % 2 is 0, so 4 is even." },
          { input: { n: 7 }, expected: false, description: "7 % 2 is 1, so 7 is odd." },
          { input: { n: 0 }, expected: true, description: "0 % 2 is 0: zero counts as even." },
          { input: { n: -2 }, expected: true },
          { input: { n: -3 }, expected: false },
          { input: { n: 1 }, expected: false },
        ],
        hint: "`n % 2` is the remainder. Compare it to 0 with `==`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nEverything here shows up in every problem, but some lean on it directly:\n\n- **Binary Search**, **Search a 2D Matrix**, and **Koko Eating Bananas** use `//` to find middles and round divisions.\n- **Happy Number**, **Plus One**, and **Reverse Integer** pull numbers apart digit by digit with `% 10` and `// 10`.\n- **Pow(x, n)** is all about powers.\n- **Contains Duplicate** and **Valid Anagram** return a `bool`: `True` or `False`.",
    },
  ],
};

export default lesson;
