import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ valid-parentheses
  {
    id: "valid-parentheses",
    summary:
      "Given a string `s` containing only bracket characters (`'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`), determine if the string is valid. A string is valid if every opening bracket is closed by the same type of bracket, and brackets are closed in the exact order they were opened.",
    constraints: [
      "1 ≤ len(s) ≤ 10,000",
      "s consists only of opening and closing brackets: '()[]{}'",
    ],
    pattern: "Stack of unmatched opening brackets",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force repeatedly searches for and removes adjacent pairs like '()', '[]', and '{}'. Each removal takes O(n) time and can repeat up to n / 2 times, giving O(n²). With a stack, we inspect each character once and perform O(1) push and pop operations, achieving O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In the worst case (for example, all opening brackets like `'(((((('`), every character is pushed onto the stack, using up to n space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "stack = [] / stack.append() / stack.pop()",
        plainEnglishExplanation:
          "A regular Python list works as a stack (Last-In, First-Out). `.append(item)` pushes an item onto the top, and `.pop()` removes and returns the most recently added item from the top.",
        exampleSnippet:
          "stack = []\nstack.append('(')\nstack.append('[')\nprint(stack.pop())\nprint(stack)",
        whyWeUseItHere:
          "We push opening brackets onto the stack and pop them whenever we encounter their matching closing bracket.",
      },
      {
        keywordOrMethod: "matching = {')': '(', '}': '{', ']': '['}",
        plainEnglishExplanation:
          "A dictionary stores key-value pairs. Using each closing bracket as a key lets us look up its corresponding opening bracket in O(1) time.",
        exampleSnippet:
          "matching = {')': '(', '}': '{', ']': '['}\nprint(matching['}'])\nprint(')' in matching)",
        whyWeUseItHere:
          "When we see a closing bracket, `matching[char]` instantly tells us which opening bracket must be at the top of the stack.",
      },
      {
        keywordOrMethod: "stack[-1]",
        plainEnglishExplanation:
          "Index `-1` in Python reads the very last item in a list without removing it. In stack terminology, this is called 'peeking' at the top.",
        exampleSnippet:
          "items = [10, 20, 30]\nprint(items[-1])",
        whyWeUseItHere:
          "We need to inspect the most recently opened bracket to see if it matches the current closing bracket before deciding to pop it.",
      },
      {
        keywordOrMethod: "len(stack) == 0",
        plainEnglishExplanation:
          "`len(stack)` counts how many items are in the list. When `len(stack) == 0`, the list is completely empty.",
        exampleSnippet:
          "items = []\nprint(len(items) == 0)",
        whyWeUseItHere:
          "A valid string must have every open bracket closed. If any brackets remain on the stack at the end, the string is invalid.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: { s: "([{}])" },
      focus: ["stack", "char", "matching"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of nested gift boxes or a stack of plates in a cafeteria. When you open a gift box, you can't close it until you have closed every smaller box placed inside it. The last box opened must be the first box closed (Last-In, First-Out). A Python list works just like this stack: when you see an opening bracket, you push it on top. When you see a closing bracket, you check if the top bracket matches. If it matches, you pop it off. If the stack is empty at the end, every opened box was properly closed!",
      edgeCases: [
        "String starts with a closing bracket like `')'`: the stack is empty when trying to match, so it immediately returns `False`.",
        "Leftover opening brackets like `'((('`: the loop finishes, but the stack still has unclosed brackets, so checking `len(stack) == 0` returns `False`.",
        "Mismatched pair like `'(]'`: the top of the stack does not match the closer, returning `False`.",
      ],
      stepByStepWalkthrough: [
        "Create an empty list `stack` to keep track of open brackets waiting to be closed.",
        "Define a dictionary `matching` mapping each closing bracket to its expected opening partner: `')': '('`, `'}': '{'`, `']': '['`.",
        "Loop through each character `char` in the string `s`.",
        "If `char` is a closing bracket (a key in `matching`), verify that `stack` is not empty and that the top item `stack[-1]` equals `matching[char]`. If yes, pop it. If not, return `False`.",
        "If `char` is an opening bracket, append it onto `stack`.",
        "After checking all characters, return `True` only if `len(stack) == 0`.",
      ],
    },
    hints: {
      conceptual:
        "Notice the order requirement: the most recently opened bracket must be the very first one to be closed. What data structure naturally remembers items in 'most recent first' order?",
      structural:
        "Use a list `stack = []`. When you encounter an opening bracket, do `stack.append(char)`. When you encounter a closing bracket, check `if stack and stack[-1] == matching[char]:` then `stack.pop()`. At the end, return `len(stack) == 0`.",
    },
    commonMistakes: [
      "Trying to count brackets with integer counters: counting counts the total numbers of '(' and ')', but misses ordering errors like `'([)]'`.",
      "Popping from an empty stack: calling `stack.pop()` when no openers were pushed raises an `IndexError`. Always check `if stack:` first.",
      "Returning `True` without checking if the stack is empty at the end: strings like `'('` would mistakenly return `True`.",
    ],
    starterCode: `def is_valid(s: str) -> bool:
    # Check if the brackets in s open and close in the correct order.
    # Tip: a list can act as a stack using append() and pop().
    pass
`,
    optimalSolution: `def is_valid(s: str) -> bool:
    # A stack to store opening brackets as we see them
    stack = []
    # Map each closing bracket to its expected opening partner
    matching = {")": "(", "}": "{", "]": "["}

    for char in s:
        # If char is a closing bracket
        if char in matching:
            # Check if stack has an opener and if it matches
            if stack and stack[-1] == matching[char]:
                # Pop the matching opening bracket
                stack.pop()
            else:
                # Mismatched bracket or no opener on stack
                return False
        else:
            # Char is an opening bracket, push onto stack
            stack.append(char)

    # Valid only if all opened brackets were closed
    return len(stack) == 0
`,
    bruteForceSolution: `def is_valid(s: str) -> bool:
    # Repeatedly remove adjacent valid pairs
    prev_len = -1
    while len(s) != prev_len:
        prev_len = len(s)
        s = s.replace("()", "").replace("[]", "").replace("{}", "")
    return len(s) == 0
`,
    harness: { kind: "function", entry: "is_valid" },
    testCases: [
      { input: { s: "()" }, expected: true, description: "A single matching pair of parentheses." },
      { input: { s: "()[]{}" }, expected: true, description: "Three independent matching bracket pairs in sequence." },
      { input: { s: "(]" }, expected: false, description: "Opening parenthesis closed by a mismatched square bracket." },
      { input: { s: "([{}])" }, expected: true, description: "Properly nested brackets inside each other." },
      { input: { s: "[(])" }, expected: false, description: "Interleaved brackets without proper nesting." },
      { input: { s: "[" }, expected: false },
      { input: { s: "]" }, expected: false },
      { input: { s: "{[]}" }, expected: true },
      { input: { s: "(((" }, expected: false },
    ],
  },

  // ------------------------------------------------------------------ min-stack
  {
    id: "min-stack",
    summary:
      "Design a stack class `MinStack` that supports standard stack operations (`push`, `pop`, `top`) and also retrieving the minimum element (`get_min`) in **O(1) constant time**.",
    constraints: [
      "All operations (push, pop, top, get_min) must run in O(1) time",
      "-2³¹ ≤ val ≤ 2³¹ - 1",
      "pop, top, and get_min will only be called on non-empty stacks",
      "At most 30,000 calls will be made in total",
    ],
    pattern: "Two parallel stacks: values and running minimums",
    timeComplexity: {
      bruteForce: "O(n) for get_min",
      optimal: "O(1) for all operations",
      explanation:
        "Scanning the stack to find the minimum on every `get_min()` call takes O(n). By keeping a parallel `min_stack` where the top element always holds the minimum value of the stack up to that level, `get_min()` simply reads `min_stack[-1]` in O(1) time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "Both `self.stack` and `self.min_stack` hold at most n numbers each, which is 2n total elements, or O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class MinStack:",
        plainEnglishExplanation:
          "`class` creates a new blueprint for an object. Methods defined inside the class with `def method(self, ...)` can access and modify attributes stored on `self`.",
        exampleSnippet:
          "class Counter:\n    def __init__(self):\n        self.val = 0\nc = Counter()\nprint(c.val)",
        whyWeUseItHere:
          "This problem asks us to design a custom data structure that bundles state (the two stacks) with methods.",
      },
      {
        keywordOrMethod: "self.min_stack.append(current_min)",
        plainEnglishExplanation:
          "`self.min_stack` is an instance attribute attached to this specific `MinStack` object. Calling `.append()` adds a value to the end of that list.",
        exampleSnippet:
          "class Demo:\n    def __init__(self):\n        self.nums = []\n    def add(self, x):\n        self.nums.append(x)\nd = Demo()\nd.add(42)\nprint(d.nums)",
        whyWeUseItHere:
          "We push the updated running minimum onto `min_stack` every time a new number is pushed onto the main stack.",
      },
      {
        keywordOrMethod: "val if not self.min_stack else min(val, self.min_stack[-1])",
        plainEnglishExplanation:
          "This is a conditional expression (ternary operator). If `self.min_stack` is empty, the minimum is just `val`. Otherwise, it's the smaller of `val` and the previous minimum `self.min_stack[-1]`.",
        exampleSnippet:
          "mins = [5, 2]\nval = 3\nnew_min = val if not mins else min(val, mins[-1])\nprint(new_min)",
        whyWeUseItHere:
          "It determines the new minimum element at the current stack height in a single line.",
      },
      {
        keywordOrMethod: "self.stack[-1]",
        plainEnglishExplanation:
          "Reads the last element added to `self.stack` without removing it.",
        exampleSnippet:
          "items = [7, 8, 9]\nprint(items[-1])",
        whyWeUseItHere:
          "Implements `top()` and `get_min()` in O(1) time by glancing at the top of the respective stack.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: {
        operations: ["MinStack", "push", "push", "push", "get_min", "pop", "top", "get_min"],
        arguments: [[], [-2], [0], [-3], [], [], [], []],
      },
    },
    intuitiveExplanation: {
      intuition:
        "If you only keep a single variable `current_min`, what happens when that minimum value is popped off? You would have to search through the entire stack to figure out what the previous minimum was! Instead, maintain two stacks side-by-side. The primary stack holds all numbers. The second stack (`min_stack`) tracks 'what was the minimum among all numbers at this level and below?' When you push, you record the minimum up to that point. When you pop, both stacks pop together, effortlessly restoring the previous minimum in O(1) time!",
      edgeCases: [
        "Pushing a value equal to the current minimum: both stacks record that minimum, ensuring popping one instance does not erase the other.",
        "Popping the absolute minimum: `min_stack` pops its top value, revealing the previous minimum beneath it instantly.",
        "Negative numbers: `min(val, current_min)` handles negative values seamlessly.",
      ],
      stepByStepWalkthrough: [
        "In `__init__`, initialize two empty lists: `self.stack` and `self.min_stack`.",
        "In `push(val)`, append `val` to `self.stack`. Calculate `current_min = val if not self.min_stack else min(val, self.min_stack[-1])`, and append it to `self.min_stack`.",
        "In `pop()`, remove the top item from both `self.stack` and `self.min_stack` using `.pop()`.",
        "In `top()`, return the last item in `self.stack` with `self.stack[-1]`.",
        "In `get_min()`, return the last item in `self.min_stack` with `self.min_stack[-1]`.",
      ],
    },
    hints: {
      conceptual:
        "If you only keep one variable for the minimum, popping it destroys your memory of what the minimum was before that item arrived. How can you store the history of minimums alongside the items?",
      structural:
        "Store two lists on `self`: `self.stack` and `self.min_stack`. Whenever you push to `self.stack`, calculate the new minimum and push it to `self.min_stack`. Whenever you pop, pop from both.",
    },
    commonMistakes: [
      "Tracking only a single `min_val` variable: when the minimum is popped, you cannot restore the prior minimum without an O(n) scan.",
      "Only pushing to `min_stack` when `val < min_stack[-1]`: using `<` instead of `<=` means duplicate minimum values are lost, breaking the stack when one duplicate is popped.",
      "Forgetting `self.` when assigning instance variables in `__init__`, making them local variables that disappear after initialization.",
    ],
    starterCode: `class MinStack:
    def __init__(self):
        # Initialize your data structure here.
        pass

    def push(self, val: int) -> None:
        # Push element val onto the stack.
        pass

    def pop(self) -> None:
        # Remove the element on the top of the stack.
        pass

    def top(self) -> int:
        # Get the top element of the stack.
        pass

    def get_min(self) -> int:
        # Retrieve the minimum element in the stack.
        pass
`,
    optimalSolution: `class MinStack:
    def __init__(self):
        # Primary stack holding all pushed values
        self.stack = []
        # Parallel stack where the top is always the minimum of all values so far
        self.min_stack = []

    def push(self, val: int) -> None:
        # Push val onto the main stack
        self.stack.append(val)
        # Determine current minimum including this new value
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        # Push the updated minimum onto min_stack
        self.min_stack.append(current_min)

    def pop(self) -> None:
        # Remove the top item from the main stack
        self.stack.pop()
        # Remove corresponding minimum from the min_stack
        self.min_stack.pop()

    def top(self) -> int:
        # Return the top item of the main stack
        return self.stack[-1]

    def get_min(self) -> int:
        # Return the minimum value at current stack height
        return self.min_stack[-1]
`,
    bruteForceSolution: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return min(self.stack)
`,
    harness: { kind: "design", entry: "MinStack" },
    testCases: [
      {
        input: {
          operations: ["MinStack", "push", "push", "push", "get_min", "pop", "top", "get_min"],
          arguments: [[], [-2], [0], [-3], [], [], [], []],
        },
        expected: [null, null, null, null, -3, null, 0, -2],
        description:
          "Push -2, 0, -3. The min is -3. After popping -3, top is 0 and min returns to -2.",
      },
      {
        input: {
          operations: ["MinStack", "push", "push", "get_min", "get_min", "push", "get_min", "top", "pop", "get_min"],
          arguments: [[], [2], [1], [], [], [3], [], [], [], []],
        },
        expected: [null, null, null, 1, 1, null, 1, 3, null, 1],
        description:
          "Testing multiple consecutive get_min calls and popping a non-minimum element.",
      },
      {
        input: {
          operations: ["MinStack", "push", "get_min", "top"],
          arguments: [[], [0], [], []],
        },
        expected: [null, null, 0, 0],
      },
      {
        input: {
          operations: ["MinStack", "push", "push", "pop", "top", "get_min"],
          arguments: [[], [-1], [-2], [], [], []],
        },
        expected: [null, null, null, null, -1, -1],
      },
      {
        input: {
          operations: ["MinStack", "push", "push", "push", "get_min", "pop", "get_min"],
          arguments: [[], [10], [20], [-10], [], [], []],
        },
        expected: [null, null, null, null, -10, null, 10],
      },
      {
        input: {
          operations: ["MinStack", "push", "push", "push", "top", "pop", "get_min", "pop", "get_min"],
          arguments: [[], [3], [3], [3], [], [], [], [], []],
        },
        expected: [null, null, null, null, 3, null, 3, null, 3],
      },
    ],
  },

  // ------------------------------------------------------------------ evaluate-reverse-polish-notation
  {
    id: "evaluate-reverse-polish-notation",
    summary:
      "Evaluate an arithmetic expression given as a list of strings `tokens` in **Reverse Polish Notation** (postfix notation). Valid operators are `'+'`, `'-'`, `'*'`, and `'/'`. Each operand is an integer or another expression. Division between two integers must **truncate toward zero**.",
    constraints: [
      "1 ≤ len(tokens) ≤ 10,000",
      "tokens[i] is an operator ('+', '-', '*', '/') or an integer in [-200, 200]",
      "The expression is guaranteed to be valid and no division by zero occurs",
    ],
    pattern: "Operand stack with operator reduction",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force repeatedly looks for adjacent operand-operand-operator patterns in the list and replaces them, taking up to n passes of length n each. With a stack, we iterate through the tokens once and perform O(1) operations per token, taking O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In the worst case (all numbers first, followed by operators), the stack holds up to (n + 1) / 2 numbers.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "int(a / b)",
        plainEnglishExplanation:
          "`a / b` performs standard float division. Wrapping it in `int(...)` truncates toward zero by stripping off any decimal portion (e.g. `int(-7 / 3)` is `-2`). This differs from `a // b`, which floors toward negative infinity (`-7 // 3` is `-3`).",
        exampleSnippet:
          "print(int(6 / -132))\nprint(int(-7 / 3))\nprint(-7 // 3)  # Note: // floors to -3!",
        whyWeUseItHere:
          "The problem explicitly requires division to truncate toward zero for both positive and negative results.",
      },
      {
        keywordOrMethod: "stack.pop()",
        plainEnglishExplanation:
          "Removes and returns the top item from the stack. When an operator needs two numbers, popping twice gives the right operand first, then the left operand.",
        exampleSnippet:
          "stack = [10, 20]\nb = stack.pop()\na = stack.pop()\nprint('a:', a, 'b:', b)",
        whyWeUseItHere:
          "Operators apply to the two most recently pushed numbers.",
      },
      {
        keywordOrMethod: "int(token)",
        plainEnglishExplanation:
          "Converts a string representation of an integer (like `'-42'`) into a real Python `int` so arithmetic can be performed on it.",
        exampleSnippet:
          "val = int('-42')\nprint(val + 2)",
        whyWeUseItHere:
          "Tokens arrive as strings, so operands must be converted to numbers before pushing to the stack.",
      },
      {
        keywordOrMethod: "for token in tokens:",
        plainEnglishExplanation:
          "A standard `for` loop that iterates over each element in the `tokens` list from left to right.",
        exampleSnippet:
          "for t in ['1', '+', '2']:\n    print(t)",
        whyWeUseItHere:
          "Reverse Polish Notation is evaluated strictly from left to right.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: { tokens: ["2", "1", "+", "3", "*"] },
      focus: ["stack", "token"],
    },
    intuitiveExplanation: {
      intuition:
        "In everyday math (infix notation), operators sit between numbers (`2 + 3`). In Reverse Polish Notation (postfix notation), operators come *after* the numbers they operate on (`2 1 +`). As you read tokens from left to right, you don't know what to do with a number until you see an operator. So you place numbers on a stack. When an operator appears, it grabs the two most recent numbers off the stack, performs the calculation, and drops the result back on the stack!",
      edgeCases: [
        "Division with negative numbers: in Python, `-7 // 3` gives `-3` (floors downward), whereas LeetCode requires `-2` (truncating toward zero). Using `int(a / b)` correctly truncates toward zero.",
        "Order of operands for subtraction and division: the first popped item is the RIGHT operand (`b`), and the second is the LEFT operand (`a`). We must compute `a - b` and `int(a / b)`, not `b - a` or `int(b / a)`.",
        "Single token expression like `['18']`: no operators exist; the stack simply returns the single integer `18`.",
      ],
      stepByStepWalkthrough: [
        "Initialize an empty list `stack = []`.",
        "Iterate through each string `token` in `tokens`.",
        "If `token` is an operator (`'+'`, `'-'`, `'*'`, `'/'`), pop the top value as `b` (right operand) and the next top value as `a` (left operand).",
        "Compute the result: `a + b`, `a - b`, `a * b`, or `int(a / b)`, and append the result to `stack`.",
        "If `token` is a number string, convert it with `int(token)` and append to `stack`.",
        "Return the single remaining value on the stack: `stack[0]`.",
      ],
    },
    hints: {
      conceptual:
        "When an operator appears, which operands does it operate on? The two most recent numbers that haven't been used yet!",
      structural:
        "Use a list as an operand stack. When you see a number, push `int(token)`. When you see an operator, pop `b = stack.pop()`, then `a = stack.pop()`, apply the operator to `a` and `b`, and push the result.",
    },
    commonMistakes: [
      "Using Python's floor division `a // b` instead of `int(a / b)`. Floor division rounds towards negative infinity (`-3 // 2 == -2`), but the problem requires truncating toward zero (`int(-3 / 2) == -1`).",
      "Swapping the order of operands: `stack.pop()` yields the right operand first. Computing `b - a` or `int(b / a)` produces the wrong sign or inverted fraction.",
      "Forgetting negative numbers when parsing strings: checking `token.isdigit()` returns `False` for `'-11'` because of the minus sign. It is simpler to check if `token in '+-*/'`.",
    ],
    starterCode: `def eval_rpn(tokens: list[str]) -> int:
    # Evaluate the Reverse Polish Notation expression.
    # Tip: push numbers to a stack, and pop two numbers when you hit an operator.
    pass
`,
    optimalSolution: `def eval_rpn(tokens: list[str]) -> int:
    # Stack to hold numerical operands
    stack = []

    for token in tokens:
        if token == "+":
            # Pop right operand then left operand and add
            b = stack.pop()
            a = stack.pop()
            stack.append(a + b)
        elif token == "-":
            # Order matters: left operand 'a' minus right operand 'b'
            b = stack.pop()
            a = stack.pop()
            stack.append(a - b)
        elif token == "*":
            # Pop operands and multiply
            b = stack.pop()
            a = stack.pop()
            stack.append(a * b)
        elif token == "/":
            # int(a / b) truncates toward zero in Python (unlike a // b)
            b = stack.pop()
            a = stack.pop()
            stack.append(int(a / b))
        else:
            # Token is an integer string, convert and push to stack
            stack.append(int(token))

    # The final evaluation result is the only item left on the stack
    return stack[0]
`,
    harness: { kind: "function", entry: "eval_rpn" },
    testCases: [
      { input: { tokens: ["2", "1", "+", "3", "*"] }, expected: 9, description: "(2 + 1) * 3 = 9." },
      { input: { tokens: ["4", "13", "5", "/", "+"] }, expected: 6, description: "13 / 5 = 2 (truncated), then 4 + 2 = 6." },
      {
        input: { tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] },
        expected: 22,
        description: "Complex nested expression with negative division and multiple operations.",
      },
      { input: { tokens: ["18"] }, expected: 18 },
      { input: { tokens: ["3", "-4", "+"] }, expected: -1 },
      { input: { tokens: ["4", "-2", "/", "2", "-3", "-", "-"] }, expected: -7 },
      { input: { tokens: ["3", "11", "+", "5", "-"] }, expected: 9 },
    ],
  },

  // ------------------------------------------------------------------ generate-parentheses
  {
    id: "generate-parentheses",
    summary:
      "Given an integer `n`, generate all combinations of **well-formed parentheses** using `n` pairs of open and close parentheses. Return the combinations as a list of strings in any order.",
    constraints: ["1 ≤ n ≤ 8"],
    pattern: "Backtracking with open and close counts",
    timeComplexity: {
      bruteForce: "O(2^(2n) × n)",
      optimal: "O(4^n / √n)",
      explanation:
        "Brute force generates all 2^(2n) possible combinations of brackets and validates each one in O(n). Backtracking only explores prefixes that can lead to valid combinations. The number of valid combinations is the n-th Catalan number C_n = (1 / (n + 1)) * (2n choose n) ≈ 4^n / (n^(1.5) √π), yielding O(4^n / √n) time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The recursion tree reaches a maximum depth of 2n, using O(n) space on the call stack and for the current character list.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def backtrack(open_count: int, close_count: int) -> None:",
        plainEnglishExplanation:
          "A nested helper function defined inside another function. It can directly read and modify variables in the outer function's scope, like `result` and `current`.",
        exampleSnippet:
          "def outer():\n    nums = []\n    def helper(step):\n        if step > 2: return\n        nums.append(step)\n        helper(step + 1)\n    helper(1)\n    return nums\nprint(outer())",
        whyWeUseItHere:
          "We need a recursive function that tracks how many opening and closing brackets have been placed so far.",
      },
      {
        keywordOrMethod: "''.join(current)",
        plainEnglishExplanation:
          "Glues a list of individual characters into a single string. `''` means no separator between characters.",
        exampleSnippet:
          "chars = ['(', '(', ')', ')']\nprint(''.join(chars))",
        whyWeUseItHere:
          "We build combinations as lists of characters for fast appending and popping, then convert to a string when done.",
      },
      {
        keywordOrMethod: "current.pop() (backtracking)",
        plainEnglishExplanation:
          "Removes the character we just added so we can explore other alternative choices at the same decision point.",
        exampleSnippet:
          "path = ['(']\npath.append(')')\nprint('before:', path)\npath.pop()\nprint('after:', path)",
        whyWeUseItHere:
          "Backtracking reuses a single list `current`, adding a bracket before recursing and removing it afterwards.",
      },
      {
        keywordOrMethod: "if open_count < n:",
        plainEnglishExplanation:
          "A simple comparison checking whether the number of placed opening brackets is strictly less than the allowed total `n`.",
        exampleSnippet:
          "n = 3\nopen_count = 2\nprint(open_count < n)",
        whyWeUseItHere:
          "We can only place an opening bracket if we haven't already used all `n` opening brackets.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { n: 2 },
      focus: ["open_count", "close_count", "current"],
    },
    intuitiveExplanation: {
      intuition:
        "Instead of generating random combinations and throwing away invalid ones, we build valid strings one character at a time. At every step, you ask two questions: Can I place an open bracket `'('`? Yes, as long as you haven't placed all `n` open brackets yet (`open_count < n`). Can I place a close bracket `')'`? Yes, but ONLY if there is an unmatched open bracket waiting to be closed (`close_count < open_count`). Following these two rules makes it impossible to ever build an invalid string!",
      edgeCases: [
        "n = 1: base case with only one possible pair: `['()']`.",
        "n = 8: largest input constraint, producing 1,430 combinations.",
        "Close count never exceeding open count ensures no close bracket is placed prematurely.",
      ],
      stepByStepWalkthrough: [
        "Create a list `result = []` to store all valid combinations and `current = []` for the characters in the current branch.",
        "Define a recursive helper `backtrack(open_count, close_count)`.",
        "Base case: if `len(current) == 2 * n`, all `n` pairs have been placed. Join `current` into a string, append it to `result`, and return.",
        "If `open_count < n`: add `'('` to `current`, recurse with `backtrack(open_count + 1, close_count)`, and pop `'('` when coming back.",
        "If `close_count < open_count`: add `')'` to `current`, recurse with `backtrack(open_count, close_count + 1)`, and pop `')'` when coming back.",
        "Call `backtrack(0, 0)` and return `result`.",
      ],
    },
    hints: {
      conceptual:
        "When building a valid bracket string from left to right, what condition allows you to add `'('`? What condition allows you to add `')'`?",
      structural:
        "Use recursion: `def backtrack(open_count, close_count):`. Add `'('` whenever `open_count < n`, and add `')'` whenever `close_count < open_count`. When length hits `2 * n`, record `''.join(current)`.",
    },
    commonMistakes: [
      "Checking `close_count < n` instead of `close_count < open_count`. This allows closing brackets to be placed before opening brackets, generating invalid sequences like `')('`.",
      "Mutating a shared string or list without undoing the choice (`current.pop()`) when backtracking.",
      "Generating all 2^(2n) sequences and filtering: this works for small n, but wastes huge amounts of memory and time.",
    ],
    starterCode: `def generate_parenthesis(n: int) -> list[str]:
    # Generate all valid combinations of n pairs of parentheses.
    # Tip: backtrack by tracking how many '(' and ')' you have placed.
    pass
`,
    optimalSolution: `def generate_parenthesis(n: int) -> list[str]:
    # List to collect all valid combinations
    result = []
    # Current sequence of characters being constructed
    current = []

    def backtrack(open_count: int, close_count: int) -> None:
        # Base case: we have placed all n opening and n closing brackets
        if len(current) == 2 * n:
            result.append("".join(current))
            return

        # We can add an opening bracket if we have not reached n
        if open_count < n:
            current.append("(")
            backtrack(open_count + 1, close_count)
            current.pop()

        # We can add a closing bracket only if it pairs with an unmatched opening bracket
        if close_count < open_count:
            current.append(")")
            backtrack(open_count, close_count + 1)
            current.pop()

    # Start recursion with zero open and zero close brackets
    backtrack(0, 0)
    return result
`,
    harness: { kind: "function", entry: "generate_parenthesis", compare: "unordered" },
    testCases: [
      { input: { n: 1 }, expected: ["()"], description: "Only 1 valid combination of 1 pair." },
      { input: { n: 2 }, expected: ["(())", "()()"], description: "2 valid combinations: nested and sequential." },
      {
        input: { n: 3 },
        expected: ["((()))", "(()())", "(())()", "()(())", "()()()"],
        description: "All 5 valid combinations for 3 pairs.",
      },
      {
        input: { n: 4 },
        expected: [
          "(((())))", "((()()))", "((())())", "((()))()", "(()(()))",
          "(()()())", "(()())()", "(())(())", "(())()()", "()((()))",
          "()(()())", "()(())()", "()()(())", "()()()()",
        ],
      },
      {
        input: { n: 5 },
        expected: [
          "((((()))))", "(((()())))", "(((())()))", "(((()))())", "(((())))()",
          "((()(())))", "((()()()))", "((()())())", "((()()))()", "((())(()))",
          "((())()())", "((())())()", "((()))(())", "((()))()()", "(()((())))",
          "(()(()()))", "(()(())())", "(()(()))()", "(()()(()))", "(()()()())",
          "(()()())()", "(()())(())", "(()())()()", "(())((()))", "(())(()())",
          "(())(())()", "(())()(())", "(())()()()", "()(((())))", "()((()()))",
          "()((())())", "()((()))()", "()(()(()))", "()(()()())", "()(()())()",
          "()(())(())", "()(())()()", "()()((()))", "()()(()())", "()()(())()",
          "()()()(())", "()()()()()",
        ],
      },
      {
        input: { n: 2 },
        expected: ["(())", "()()"],
      },
    ],
  },

  // ------------------------------------------------------------------ daily-temperatures
  {
    id: "daily-temperatures",
    summary:
      "Given a list of daily temperatures `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after day `i` to experience a warmer temperature. If no future day is warmer, set `answer[i] = 0`.",
    constraints: [
      "1 ≤ len(temperatures) ≤ 100,000",
      "30 ≤ temperatures[i] ≤ 100",
    ],
    pattern: "Monotonic decreasing stack of indices",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force checks every future day for each day i, taking O(n²) in the worst case (e.g. descending temperatures). With a monotonic stack, every day's index is pushed once and popped at most once, performing at most 2n operations total: O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In the worst case (strictly decreasing temperatures), all n indices remain on the stack until the end.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "[0] * len(temperatures)",
        plainEnglishExplanation:
          "Creates a new list filled with zeros of the exact length of `temperatures`. Any day that never sees a warmer temperature simply stays 0.",
        exampleSnippet:
          "zeros = [0] * 4\nprint(zeros)",
        whyWeUseItHere:
          "Pre-allocating the answer list allows us to write directly to any index `answer[prev_i]`.",
      },
      {
        keywordOrMethod: "for i, temp in enumerate(temperatures):",
        plainEnglishExplanation:
          "`enumerate` yields pairs of `(index, value)` for each item in the list, so `i` is the day number and `temp` is the temperature.",
        exampleSnippet:
          "temps = [70, 72, 68]\nfor i, t in enumerate(temps):\n    print(f'day {i}: {t}')",
        whyWeUseItHere:
          "We need both the temperature (to compare warmth) and its index (to calculate the number of waiting days).",
      },
      {
        keywordOrMethod: "while stack and temp > temperatures[stack[-1]]:",
        plainEnglishExplanation:
          "Loops as long as the stack is not empty AND the current temperature is strictly warmer than the temperature on top of the stack.",
        exampleSnippet:
          "stack = [0]\ntemps = [70, 75]\ni, temp = 1, 75\nwhile stack and temp > temps[stack[-1]]:\n    prev = stack.pop()\n    print(f'warmer for day {prev}')",
        whyWeUseItHere:
          "Resolves all past days on the stack that were colder than today's temperature.",
      },
      {
        keywordOrMethod: "answer[prev_i] = i - prev_i",
        plainEnglishExplanation:
          "Subtracts the earlier day index `prev_i` from the current day index `i` to get the count of elapsed days.",
        exampleSnippet:
          "ans = [0, 0, 0]\ni, prev_i = 2, 0\nans[prev_i] = i - prev_i\nprint(ans)",
        whyWeUseItHere:
          "The wait time is the difference between today's index and the waiting day's index.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] },
      focus: ["stack", "i", "temp", "answer"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a line of people waiting for a warmer day. Whenever today's temperature arrives, you look at the people waiting. If today is warmer than the temperature for the person on top of the stack, their wait is over! You pop them from the stack and record how many days they waited (`today_index - their_index`). You keep popping as long as today is warmer than the top person. Then, today joins the stack to wait for its own warmer day. Because colder days sit on top of warmer days, the stack stays in decreasing order (monotonic).",
      edgeCases: [
        "Strictly decreasing temperatures like `[90, 80, 70]`: no day ever sees a warmer day, so `answer` remains all zeros.",
        "Strictly increasing temperatures like `[30, 40, 50]`: each day immediately sees a warmer day the very next day (`[1, 1, 0]`).",
        "Equal consecutive temperatures: equal temperature is not strictly warmer, so the wait continues.",
      ],
      stepByStepWalkthrough: [
        "Create an output list `answer = [0] * len(temperatures)` filled with zeros.",
        "Create an empty list `stack = []` to store indices of days waiting for a warmer temperature.",
        "Loop over `temperatures` with index `i` and value `temp` using `enumerate`.",
        "While `stack` is not empty and `temp > temperatures[stack[-1]]`: pop `prev_i = stack.pop()` and record `answer[prev_i] = i - prev_i`.",
        "Push current index `i` onto `stack`.",
        "Return `answer`.",
      ],
    },
    hints: {
      conceptual:
        "When a warmer day arrives, which past days does it resolve? Can you store days that are still waiting, and resolve them as soon as a warmer day appears?",
      structural:
        "Maintain a stack of day indices in decreasing temperature order. While `stack and temp > temperatures[stack[-1]]:`, pop `prev_i` and compute `answer[prev_i] = i - prev_i`. Then append `i`.",
    },
    commonMistakes: [
      "Storing temperatures in the stack instead of indices: without the index, you cannot calculate the number of elapsed days `i - prev_i`.",
      "Using `>=` instead of `>`: equal temperature is not warmer, so days with equal temperatures should stay on the stack.",
      "Using nested loops: a brute force O(n²) solution times out on inputs with 100,000 temperatures.",
    ],
    starterCode: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    # Return how many days until a warmer temperature for each day.
    # Tip: maintain a stack of unresolved days (indices).
    pass
`,
    optimalSolution: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    # Output array initialized to 0 for days that never see a warmer temp
    answer = [0] * len(temperatures)
    # Stack stores indices of days waiting for a warmer temperature
    stack = []

    for i, temp in enumerate(temperatures):
        # Current temp is warmer than the day at the top of the stack
        while stack and temp > temperatures[stack[-1]]:
            # Pop that earlier day
            prev_i = stack.pop()
            # The wait time is the difference between day indices
            answer[prev_i] = i - prev_i

        # Push current day's index to await a future warmer day
        stack.append(i)

    return answer
`,
    bruteForceSolution: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    ans = [0] * n
    for i in range(n):
        for j in range(i + 1, n):
            if temperatures[j] > temperatures[i]:
                ans[i] = j - i
                break
    return ans
`,
    harness: { kind: "function", entry: "daily_temperatures" },
    testCases: [
      {
        input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] },
        expected: [1, 1, 4, 2, 1, 1, 0, 0],
        description: "Day 0 (73) waits 1 day for 74; Day 2 (75) waits 4 days for 76.",
      },
      {
        input: { temperatures: [30, 40, 50, 60] },
        expected: [1, 1, 1, 0],
        description: "Strictly increasing: each day waits exactly 1 day except the last.",
      },
      { input: { temperatures: [30, 60, 90] }, expected: [1, 1, 0], description: "Steeply rising temperatures." },
      { input: { temperatures: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70] }, expected: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0] },
      { input: { temperatures: [55, 55, 55] }, expected: [0, 0, 0] },
      { input: { temperatures: [90, 80, 70] }, expected: [0, 0, 0] },
      { input: { temperatures: [40] }, expected: [0] },
    ],
  },

  // ------------------------------------------------------------------ car-fleet
  {
    id: "car-fleet",
    summary:
      "There are `n` cars traveling toward a destination at mile `target`. You are given two integer lists: `position` and `speed`. A car can never pass the car ahead of it, but can catch up and drive at the same speed, forming a **car fleet**. Return the number of car fleets that reach the destination.",
    constraints: [
      "n == len(position) == len(speed)",
      "1 ≤ n ≤ 100,000",
      "0 ≤ position[i] < target ≤ 1,000,000",
      "All values in position are distinct",
      "0 < speed[i] ≤ 1,000,000",
    ],
    pattern: "Sort by position descending and track arrival times with a stack",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n log n)",
      explanation:
        "Sorting the cars by starting position takes O(n log n) time. Once sorted, iterating from closest-to-target to furthest takes O(n) time, so total time is dominated by the sort: O(n log n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "Storing the sorted cars and the arrival times on the stack takes O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "sorted(zip(position, speed), reverse=True)",
        plainEnglishExplanation:
          "`zip` bundles the two lists into pairs `(pos, sp)`. `sorted(..., reverse=True)` sorts those pairs from largest starting position to smallest.",
        exampleSnippet:
          "pos = [0, 4, 2]\nspd = [2, 1, 3]\ncars = sorted(zip(pos, spd), reverse=True)\nprint(cars)",
        whyWeUseItHere:
          "Cars cannot pass each other, so the car starting closest to the destination dictates the speed for cars behind it.",
      },
      {
        keywordOrMethod: "time = (target - pos) / sp",
        plainEnglishExplanation:
          "Uses standard float division `/` to calculate the exact hours required to travel the remaining distance `target - pos` at speed `sp`.",
        exampleSnippet:
          "target, pos, sp = 12, 10, 2\ntime = (target - pos) / sp\nprint('arrival time:', time)",
        whyWeUseItHere:
          "Float precision is needed so that cars arriving at slightly different times aren't incorrectly merged.",
      },
      {
        keywordOrMethod: "if len(stack) >= 2 and stack[-1] <= stack[-2]:",
        plainEnglishExplanation:
          "Checks if the most recently added car arrives earlier than or at the same time as the fleet ahead of it.",
        exampleSnippet:
          "times = [3.0, 2.5]\nif len(times) >= 2 and times[-1] <= times[-2]:\n    times.pop()\nprint('fleets remaining:', len(times))",
        whyWeUseItHere:
          "If a trailing car takes less or equal time, it catches up and merges into the fleet ahead, so it is popped.",
      },
      {
        keywordOrMethod: "stack.append(time) / stack.pop()",
        plainEnglishExplanation:
          "Appends a car's arrival time to the stack, and pops it if it merges with the fleet ahead.",
        exampleSnippet:
          "stk = []\nstk.append(4.0)\nstk.append(1.0)\nstk.pop()\nprint(stk)",
        whyWeUseItHere:
          "The stack preserves only the distinct fleet leaders that reach the target independently.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] },
      focus: ["stack", "pos", "sp", "time"],
    },
    intuitiveExplanation: {
      intuition:
        "Cars cannot pass each other, so the car starting closest to the destination gets to set the pace. Calculate how long each car would take to reach the destination on its own: `time = (target - position) / speed`. If a car starting further behind would reach the destination earlier than (or at the same time as) the car ahead of it, it will collide with the car ahead and merge into its fleet! If it takes strictly longer, it can never catch up, and will lead its own fleet. By processing cars from closest to furthest, we can track fleets easily.",
      edgeCases: [
        "A single car (`len(position) == 1`): always forms exactly 1 fleet.",
        "All cars merge into one fleet: when cars behind are significantly faster, only 1 fleet arrives.",
        "Cars with equal arrival times: cars catch up at the target mile and count as 1 fleet.",
      ],
      stepByStepWalkthrough: [
        "Pair each car's `position` and `speed` using `zip(position, speed)`.",
        "Sort the cars in descending order of starting position (`reverse=True`), so the car closest to the target comes first.",
        "Initialize an empty list `stack = []` to store the arrival times of distinct fleet leaders.",
        "For each car `(pos, sp)`, calculate `time = (target - pos) / sp` and append it to `stack`.",
        "If `len(stack) >= 2` and `stack[-1] <= stack[-2]`: the current car arrives faster than or at the same time as the fleet ahead, meaning it merges into that fleet. Pop `stack[-1]`.",
        "Return `len(stack)`.",
      ],
    },
    hints: {
      conceptual:
        "Can a car ever pass a car that started ahead of it? No! So which car determines whether a fleet forms: the car in front or the car behind?",
      structural:
        "Sort the cars from largest starting position to smallest. Calculate `(target - pos) / speed` for each car. Use a stack of fleet arrival times; if a car's time is `<= stack[-1]`, it merges with the fleet ahead.",
    },
    commonMistakes: [
      "Sorting in ascending order (front to back): the car ahead determines the speed limit for cars behind it, so you must process cars from closest to target to furthest.",
      "Using integer floor division `//` instead of float division `/`: arrival times like 2.3 and 2.8 would both floor to 2, leading to incorrect fleet merges.",
      "Trying to simulate car movement step-by-step with small time increments, which is far too slow and suffers from floating-point inaccuracy.",
    ],
    starterCode: `def car_fleet(target: int, position: list[int], speed: list[int]) -> int:
    # Return the number of car fleets that arrive at target.
    # Tip: sort cars by starting position from closest to target to furthest.
    pass
`,
    optimalSolution: `def car_fleet(target: int, position: list[int], speed: list[int]) -> int:
    # Pair position and speed, sorted from closest to target to furthest
    cars = sorted(zip(position, speed), reverse=True)
    # Stack stores arrival times of distinct fleet leaders
    stack = []

    for pos, sp in cars:
        # Time required for this car to reach target independently
        time = (target - pos) / sp
        # Push this car's time to the stack
        stack.append(time)

        # If this car arrives faster than or equal to the fleet ahead, it merges
        if len(stack) >= 2 and stack[-1] <= stack[-2]:
            stack.pop()

    # The number of fleet leaders is the number of fleets
    return len(stack)
`,
    harness: { kind: "function", entry: "car_fleet" },
    testCases: [
      {
        input: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] },
        expected: 3,
        description: "Cars at 10 and 8 form fleet 1; cars at 5 and 3 form fleet 2; car at 0 is fleet 3.",
      },
      { input: { target: 10, position: [3], speed: [3] }, expected: 1, description: "A single car forms 1 fleet." },
      {
        input: { target: 100, position: [0, 2, 4], speed: [4, 2, 1] },
        expected: 1,
        description: "All cars catch up and form a single fleet.",
      },
      {
        input: { target: 10, position: [6, 8], speed: [3, 2] },
        expected: 2,
        description: "Car at 8 arrives at t=1.0; car at 6 arrives at t=1.33 and cannot catch up.",
      },
      { input: { target: 10, position: [0, 4, 2], speed: [2, 1, 3] }, expected: 1 },
      { input: { target: 15, position: [2, 4, 6], speed: [1, 1, 1] }, expected: 3 },
    ],
  },

  // ------------------------------------------------------------------ largest-rectangle-in-histogram
  {
    id: "largest-rectangle-in-histogram",
    summary:
      "Given an array of integers `heights` representing a histogram's bar heights where each bar has width 1, find the area of the **largest rectangle** that can be formed within the histogram.",
    constraints: [
      "1 ≤ len(heights) ≤ 100,000",
      "0 ≤ heights[i] ≤ 10,000",
    ],
    pattern: "Monotonic increasing stack of (start_index, height)",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force checks every possible pair of bars as left and right edges, finding the minimum height between them in O(n²). With a monotonic stack, every bar is pushed once and popped once, and each pop calculates a rectangle area in O(1), achieving O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In the worst case (strictly increasing bar heights), the stack stores all n bars as pairs of `(start_index, height)`.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "stack.append((start, h))",
        plainEnglishExplanation:
          "Stores a tuple of `(start_index, height)` on the stack. The tuple records both how tall the bar is and how far back to the left it can extend.",
        exampleSnippet:
          "stack = []\nstack.append((0, 5))\nprint('top height:', stack[-1][1])",
        whyWeUseItHere:
          "When a taller bar is popped, the current shorter bar can extend leftward to that taller bar's starting position.",
      },
      {
        keywordOrMethod: "while stack and stack[-1][1] > h:",
        plainEnglishExplanation:
          "Checks if the bar on top of the stack is strictly taller than the current bar `h`.",
        exampleSnippet:
          "stack = [(0, 6)]\nh = 2\nif stack and stack[-1][1] > h:\n    prev_i, prev_h = stack.pop()\n    print(f'popped height {prev_h} starting at {prev_i}')",
        whyWeUseItHere:
          "A bar that is taller than `h` cannot extend past index `i`, so its rectangle must end here.",
      },
      {
        keywordOrMethod: "max_area = max(max_area, prev_h * (i - prev_i))",
        plainEnglishExplanation:
          "Calculates the rectangle area with height `prev_h` and width `i - prev_i`, keeping the largest area seen so far.",
        exampleSnippet:
          "max_area = 0\nh, width = 5, 2\nmax_area = max(max_area, h * width)\nprint('area:', max_area)",
        whyWeUseItHere:
          "Determines the rectangle size for each completed bar as it is popped.",
      },
      {
        keywordOrMethod: "for start_i, h in stack:",
        plainEnglishExplanation:
          "Iterates over remaining tuples left on the stack at the end of the loop, unpacking `(start_index, height)` into two variables.",
        exampleSnippet:
          "bars = [(0, 2), (2, 3)]\nfor start_i, h in bars:\n    print(start_i, h)",
        whyWeUseItHere:
          "Any bars still on the stack when the loop ends can extend all the way to the end of the histogram.",
      },
    ],
    visualizerType: "stack",
    visualization: {
      input: { heights: [2, 1, 5, 6, 2, 3] },
      focus: ["stack", "max_area", "i", "h"],
    },
    intuitiveExplanation: {
      intuition:
        "A rectangle of height `h` can extend sideways as long as the neighboring bars are at least as tall as `h`. When you encounter a bar that is *shorter* than the bar on top of the stack, that taller bar can no longer extend to the right! Its rectangle is complete, so you pop it and calculate its area: `height * (current_index - start_index)`. Furthermore, the new shorter bar could have started as far back as that popped bar's starting position! So we update the shorter bar's start index before pushing it.",
      edgeCases: [
        "Histogram with only 1 bar: area is simply the height of that bar.",
        "Monotonically increasing heights like `[1, 2, 3, 4]`: no bars are popped during the main loop; the end-of-loop cleanup calculates areas extending to the end.",
        "Heights containing 0: bars of height 0 have area 0 and reset the starting indices of future rectangles.",
      ],
      stepByStepWalkthrough: [
        "Initialize `max_area = 0` and an empty list `stack = []` storing tuples of `(start_index, height)`.",
        "Iterate through `heights` with index `i` and height `h` using `enumerate`.",
        "Set `start = i` (the earliest index where a rectangle of height `h` could start).",
        "While `stack` is not empty and the top bar's height `stack[-1][1] > h`: pop `(prev_i, prev_h) = stack.pop()`, compute area `prev_h * (i - prev_i)`, update `max_area = max(max_area, area)`, and update `start = prev_i`.",
        "Push `(start, h)` onto `stack`.",
        "After the loop, for each remaining `(start_i, h)` in `stack`, calculate the area extending all the way to `len(heights)`: `h * (len(heights) - start_i)`, and update `max_area`.",
        "Return `max_area`.",
      ],
    },
    hints: {
      conceptual:
        "For each bar, how far to the left and right can it extend without hitting a shorter bar? How can a stack help you detect when a bar's rightward extension must stop?",
      structural:
        "Maintain a stack of pairs `(start_index, height)` in increasing order of height. When `h < stack[-1][1]`, pop the top bar, calculate its area with width `i - prev_start`, and shift `start = prev_start`. After the loop, process any bars left on the stack using width `len(heights) - start`.",
    },
    commonMistakes: [
      "Forgetting the bars left on the stack after the loop ends. These bars extend all the way to the right end of the histogram (`len(heights)`).",
      "Pushing `(i, h)` instead of `(start, h)`: after popping taller bars, the current shorter bar could have started back at the popped bar's start position.",
      "Using a brute force O(n²) approach, which causes a time limit exceeded error on inputs with up to 100,000 bars.",
    ],
    starterCode: `def largest_rectangle_area(heights: list[int]) -> int:
    # Find the largest rectangular area possible in the histogram.
    # Tip: maintain a stack of (start_index, height) in increasing height order.
    pass
`,
    optimalSolution: `def largest_rectangle_area(heights: list[int]) -> int:
    max_area = 0
    # Stack stores tuples: (index where this height starts, height)
    stack = []

    for i, h in enumerate(heights):
        # A new bar starts at its own index by default
        start = i

        # If current bar is shorter than the bar on top of the stack,
        # that taller bar cannot extend any further to the right
        while stack and stack[-1][1] > h:
            prev_i, prev_h = stack.pop()
            # Calculate area with height prev_h and width from prev_i to i
            max_area = max(max_area, prev_h * (i - prev_i))
            # The current shorter bar h can extend back to prev_i
            start = prev_i

        # Push the extended start index and height
        stack.append((start, h))

    # Any remaining bars on the stack extend all the way to the end of heights
    total_len = len(heights)
    for start_i, h in stack:
        max_area = max(max_area, h * (total_len - start_i))

    return max_area
`,
    bruteForceSolution: `def largest_rectangle_area(heights: list[int]) -> int:
    max_area = 0
    n = len(heights)
    for i in range(n):
        min_h = heights[i]
        for j in range(i, n):
            min_h = min(min_h, heights[j])
            max_area = max(max_area, min_h * (j - i + 1))
    return max_area
`,
    harness: { kind: "function", entry: "largest_rectangle_area" },
    testCases: [
      {
        input: { heights: [2, 1, 5, 6, 2, 3] },
        expected: 10,
        description: "The bars of height 5 and 6 form a rectangle of height 5 and width 2: area = 10.",
      },
      {
        input: { heights: [2, 4] },
        expected: 4,
        description: "Height 4 with width 1 gives area 4 (or height 2 with width 2 = 4).",
      },
      {
        input: { heights: [1, 1, 1, 1] },
        expected: 4,
        description: "All equal heights: area is height 1 × width 4 = 4.",
      },
      { input: { heights: [6, 5, 4, 3, 2, 1] }, expected: 12 },
      { input: { heights: [1, 2, 3, 4, 5] }, expected: 9 },
      { input: { heights: [0, 9] }, expected: 9 },
      { input: { heights: [3] }, expected: 3 },
      { input: { heights: [2, 1, 2] }, expected: 3 },
    ],
  },
];

export default problems;
