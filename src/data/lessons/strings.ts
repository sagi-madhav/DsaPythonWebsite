import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "strings",
  title: "Strings & Immutability",
  goal: "Manipulate text in Python: understand string immutability, index and slice, format with f-strings, transform with built-in methods, join and split efficiently, and convert characters with ord() and chr().",
  estimatedMinutes: 20,
  icon: "text",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Text in Python: The immutable sequence\nIn Python, text is stored as a string (`str`). It looks and feels a lot like a list of characters: you can access characters by index, slice substrings, check its length with `len()`, and loop over it with `for ch in text:`.\n\nHowever, there is one critical rule that catches almost every beginner: **strings are immutable**. Once created in memory, a string can **never** be edited in place!",
    },
    {
      kind: "code",
      caption: "Strings support 0-based indexing, negative indices, and slicing just like lists.",
      code: `word = "Algorithms"

print("First character (index 0):", word[0])
print("Last character (index -1):", word[-1])
print("Slice [0:4]:", word[0:4])
print("Reversed string:", word[::-1])
print("Total length:", len(word))
`,
    },
    {
      kind: "text",
      markdown:
        "### Immutability in action\nWhat happens if you try to replace a letter in a string using `word[0] = 'a'`? Python immediately raises a **`TypeError`**.\n\nBecause strings cannot be modified in place, any string \"change\" must produce a **brand new string** in memory.",
    },
    {
      kind: "code",
      caption: "This snippet deliberately fails with a TypeError: 'str' object does not support item assignment. Strings cannot be edited in place!",
      expectError: true,
      code: `greeting = "hello"

# Deliberate error: you cannot assign to an index of a string!
greeting[0] = "H"
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `word = "cat"
new_word = "b" + word[1:]
print(new_word)`,
        options: ["bat", "cat", "bcat", "Error"],
        answerIndex: 0,
        explanation:
          "`word[1:]` extracts everything from index 1 onward: \"at\". Concatenating \"b\" + \"at\" produces the new string \"bat\".",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Essential string methods\nPython provides built-in methods for cleaning and inspecting text:\n\n- `.lower()` and `.upper()`: change case.\n- `.strip()`: removes whitespace from both ends (or `.lstrip()` / `.rstrip()`).\n- `.isalnum()`: returns `True` if all characters are letters or digits.\n- `.isalpha()`: returns `True` if letters only; `.isdigit()` for digits only.\n- `.replace(\"old\", \"new\")`: replaces occurrences.\n\nRemember: because strings are immutable, these methods never change the original string — they return a **new** transformed string.",
    },
    {
      kind: "code",
      caption: "Cleaning raw user input by stripping spaces, lowercasing, and filtering characters.",
      code: `raw_input = "   RaceCar 123!   "

cleaned = raw_input.strip().lower()
print("Cleaned string:", f"'{cleaned}'")

# Filtering only alphanumeric characters
alpha_nums = [ch for ch in cleaned if ch.isalnum()]
print("Alphanumeric only:", alpha_nums)
`,
    },
    {
      kind: "text",
      markdown:
        "### Splitting and Joining\nTwo methods you'll use constantly in string problems:\n\n- `text.split(sep)`: chops a string into a list of words. Calling `text.split()` without arguments splits on any whitespace and automatically discards extra spaces.\n- `delimiter.join(list_of_strings)`: glues a list of strings together into one string, placing `delimiter` between each item.\n\nNotice the syntax: the delimiter string calls `.join()`. Think of the delimiter as the glue doing the joining: `\"-\".join([\"a\", \"b\", \"c\"])` gives `\"a-b-c\"`.",
    },
    {
      kind: "code",
      caption: "Splitting sentences into words and joining lists back into formatted text.",
      code: `sentence = "The   quick brown fox"
words = sentence.split()
print("Words list:", words)

# Glue words back together with hyphens
hyphenated = "-".join(words)
print("Hyphenated:", hyphenated)

# Split comma-separated values
csv = "apple,banana,cherry"
items = csv.split(",")
print("CSV items:", items)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `parts = "data structures".split()
result = "_".join(parts)
print(result)`,
        options: ["data_structures", "data structures", "datastructures", "data-structures"],
        answerIndex: 0,
        explanation:
          "`\"data structures\".split()` creates the list `[\"data\", \"structures\"]`. `\"_\".join(...)` joins them with an underscore: `data_structures`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Formatted strings (f-strings)\nInstead of messy string concatenation like `\"User \" + name + \" has \" + str(score) + \" points\"`, Python offers **f-strings**:\n\n```python\nf\"User {name} has {score} points\"\n```\n\nJust prefix the string with an `f` before the opening quote. Any variable or Python expression placed inside `{ }` is evaluated and inserted directly.",
    },
    {
      kind: "text",
      markdown:
        "### Character codes: ord() and chr()\nEvery character in your computer is mapped to an underlying integer code (ASCII / Unicode):\n\n- `ord(c)`: gives the integer code of character `c` (`ord('a')` is `97`, `ord('b')` is `98`).\n- `chr(n)`: converts the integer `n` back into its character (`chr(97)` is `'a'`).\n\nThe classic DSA trick: **`ord(c) - ord('a')`** maps lowercase letters `'a'` through `'z'` to numbers `0` through `25`:\n- `'a'` maps to `97 - 97 = 0`\n- `'b'` maps to `98 - 97 = 1`\n- `'z'` maps to `122 - 97 = 25`\n\nThis lets you create a 26-element array `counts = [0] * 26` to count letter frequencies in O(1) space!",
    },
    {
      kind: "code",
      caption: "Using ord() to convert letters into 0-indexed alphabet positions.",
      code: `print("ASCII of 'a':", ord("a"))
print("ASCII of 'b':", ord("b"))
print("ASCII of 'z':", ord("z"))

letter = "c"
alphabet_index = ord(letter) - ord("a")
print(f"Alphabet index of '{letter}':", alphabet_index)

# Reversing from number back to character
print("Character for 65:", chr(65))
`,
    },
    {
      kind: "callout",
      tone: "insight",
      title: "The O(n²) string building trap",
      markdown:
        "Because strings are immutable, writing `s += char` inside a loop creates an **entirely new copy** of `s` on every single turn! Copying length 1, then length 2, then 3 ... up to n takes `1 + 2 + 3 + ... + n ≈ O(n²)` operations.\n\n**The fast DSA way**:\n1. Collect characters in a list: `chars.append(c)` (O(1) per character).\n2. Join them once at the end: `\"\".join(chars)` (O(n) total time).",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `char = "e"
print(ord(char) - ord("a"))`,
        options: ["3", "4", "5", "97"],
        answerIndex: 1,
        explanation:
          "'a' is 0, 'b' is 1, 'c' is 2, 'd' is 3, 'e' is 4. `ord('e')` is 101, and `ord('a')` is 97. 101 - 97 = 4.",
        predictsOutput: true,
      },
    },
    {
      kind: "table",
      caption: "Common string operations and costs",
      headers: ["Operation", "Example", "Result / Output", "Time Complexity"],
      rows: [
        ["Indexing", "s[0]", "Character at index", "O(1)"],
        ["Slicing", "s[1:4]", "Substring copy", "O(k) where k is slice length"],
        ["Case change", "s.lower()", "New lowercased string", "O(n)"],
        ["Stripping", "s.strip()", "New trimmed string", "O(n)"],
        ["Split", "s.split()", "List of substring words", "O(n)"],
        ["Join", "''.join(list)", "Combined string", "O(n)"],
        ["Char to int", "ord(c)", "ASCII/Unicode number", "O(1)"],
        ["+= in loop", "s += c in loop", "Accidental O(n²)", "O(n²) - Avoid!"],
      ],
    },
    {
      kind: "exercise",
      exercise: {
        id: "strings-is-palindrome",
        title: "Valid palindrome",
        prompt:
          "Write a function `is_palindrome(s)` that determines if string `s` reads the same forwards and backwards, considering **only alphanumeric characters** and **ignoring case**.\n\nFor example, `\"A man, a plan, a canal: Panama\"` is a palindrome because after filtering and lowercasing it becomes `\"amanaplanacanalpanama\"`.\n\nHint: Build a list of lowercase alphanumeric characters using `.isalnum()` and `.lower()`, then check if the list equals its reverse `chars[::-1]`.",
        starterCode: `def is_palindrome(s):
    # Return True if s is a palindrome considering alphanumeric chars only, else False
    return False
`,
        solution: `def is_palindrome(s):
    cleaned = []
    for ch in s:
        if ch.isalnum():
            cleaned.append(ch.lower())
    return cleaned == cleaned[::-1]
`,
        harness: { kind: "function", entry: "is_palindrome" },
        testCases: [
          { input: { s: "A man, a plan, a canal: Panama" }, expected: true, description: "Ignoring spaces and punctuation, reads the same both ways." },
          { input: { s: "race a car" }, expected: false, description: "'raceacar' is not the same backwards." },
          { input: { s: " " }, expected: true, description: "An empty filtered string is a palindrome." },
          { input: { s: "0P" }, expected: false },
          { input: { s: "a." }, expected: true },
          { input: { s: "Was it a car or a cat I saw?" }, expected: true },
        ],
        hint: "Iterate through each character `ch` in `s`. If `ch.isalnum()`, append `ch.lower()` to a list. Check if `cleaned == cleaned[::-1]`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "strings-reverse-words",
        title: "Reverse words in a string",
        prompt:
          "Given an input string `s`, reverse the order of the words. A word is defined as a sequence of non-space characters. Return a string of the words in reverse order concatenated by a single space, with no leading or trailing spaces.\n\nFor example, given `\"  the sky   is blue  \"`, return `\"blue is sky the\"`.\n\nHint: `s.split()` automatically strips leading/trailing spaces and condenses multiple spaces between words!",
        starterCode: `def reverse_words(s):
    # Split the words, reverse them, and join them with a single space
    return ""
`,
        solution: `def reverse_words(s):
    words = s.split()
    return " ".join(words[::-1])
`,
        harness: { kind: "function", entry: "reverse_words" },
        testCases: [
          { input: { s: "the sky is blue" }, expected: "blue is sky the", description: "Reverses the 4 words." },
          { input: { s: "  hello world  " }, expected: "world hello", description: "Removes extra leading and trailing spaces." },
          { input: { s: "a good   example" }, expected: "example good a", description: "Reduces multiple spaces between words to a single space." },
          { input: { s: "word" }, expected: "word" },
          { input: { s: "  Bob    Loves  Alice   " }, expected: "Alice Loves Bob" },
          { input: { s: "EPIC   CODE" }, expected: "CODE EPIC" },
        ],
        hint: "`words = s.split()` produces a cleaned list of words. Reverse the list with `words[::-1]` and join with `' '.join(...)`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nString manipulation is featured in dozens of interview problems:\n\n- **Valid Palindrome**: filtering with `.isalnum()` and checking symmetry.\n- **Valid Anagram**: counting character frequencies using `ord(c) - ord('a')` or frequency hash maps.\n- **Group Anagrams**: sorting character sequences with `\"\".join(sorted(s))` to form dictionary keys.\n- **Longest Common Prefix**: slicing and comparing matching character prefixes.\n- **Encode and Decode Strings**: joining with custom length delimiters and slicing.",
    },
  ],
};

export default lesson;
