import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "dicts-and-sets",
  title: "Dictionaries & Sets",
  goal: "Store key-value mappings in dictionaries and unique collections in sets, perform instant O(1) lookups, safely access values with .get(), and solve frequency problems.",
  estimatedMinutes: 25,
  icon: "book-open",
  blocks: [
    {
      kind: "text",
      markdown:
        "### The O(1) Hash Table Superpower\nSuppose you have a contact list of 1,000,000 phone numbers. If you store them in a list and check `target in numbers`, Python has to compare against every single number from beginning to end: up to a million steps!\n\nWhat if you could find any contact in **one single step**, no matter how huge the directory is?\n\nThat is the superpower of **dictionaries** and **sets**. They are powered by **hash tables**, which provide near-instant **O(1) average time lookups**.",
    },
    {
      kind: "code",
      caption: "Press Visualize to watch key-value pairs get inserted and updated in the dictionary.",
      visualize: true,
      code: `# Creating a dictionary mapping names (keys) to phone numbers (values)
phonebook = {
    "Alice": "555-0100",
    "Bob": "555-0101",
    "Charlie": "555-0102",
}

# Look up by key in O(1) time
print("Alice's number:", phonebook["Alice"])

# Add a new entry
phonebook["David"] = "555-0103"

# Update an existing key
phonebook["Alice"] = "555-9999"

print("Phonebook size:", len(phonebook))
`,
    },
    {
      kind: "text",
      markdown:
        "### Avoiding crashes with .get()\nIf you try to look up a key that does not exist using square brackets `d[key]`, Python crashes with a **`KeyError`**.\n\nTo safely fetch a value without risking a crash, use **`.get(key, default)`**:\n- If the key exists, it returns the value.\n- If the key does not exist, it returns your chosen `default` value (or `None` if you omit the default).",
    },
    {
      kind: "code",
      caption: "This snippet raises a KeyError on purpose: looking up 'science' with square brackets crashes because it's not in the dictionary.",
      expectError: true,
      code: `scores = {"math": 95, "history": 88}

# Safe lookup with .get() returns the fallback default 0
science_score = scores.get("science", 0)
print("Science score (safe):", science_score)

# Deliberate error: crashes with KeyError!
print(scores["science"])
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `counts = {"apple": 3, "banana": 5}
total = counts.get("cherry", 0) + counts.get("apple", 0)
print(total)`,
        options: ["8", "3", "0", "KeyError"],
        answerIndex: 1,
        explanation:
          "`counts.get(\"cherry\", 0)` returns 0 because \"cherry\" is not in the dictionary. `counts.get(\"apple\", 0)` returns 3. 0 + 3 = 3.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Looping over dictionaries\nYou can loop over dictionaries in three convenient ways:\n\n- `for key in d:` iterates through the **keys**.\n- `for val in d.values():` iterates through the **values**.\n- `for key, val in d.items():` unpacks both **key and value** simultaneously!\n\nChecking `key in d` checks whether a key exists in **O(1) time**.",
    },
    {
      kind: "code",
      caption: "Counting frequencies of words using `.get()` in a loop, then inspecting pairs with `.items()`.",
      code: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
freq = {}

for w in words:
    # If w exists, increment it; if not, start at 0 + 1 = 1
    freq[w] = freq.get(w, 0) + 1

print("Frequency table:", freq)

for word, count in freq.items():
    print(f"'{word}' appears {count} times")
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `counts = {}
for ch in "mississippi":
    counts[ch] = counts.get(ch, 0) + 1
print(counts["s"])`,
        options: ["2", "3", "4", "5"],
        answerIndex: 2,
        explanation:
          "In \"mississippi\", the letter 's' appears 4 times (positions 2, 3, 5, 6). The frequency dictionary records `counts[\"s\"] = 4`.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### Sets: Collections of unique items\nA **set** is an unordered collection that **never contains duplicate values**. If you add an item that's already in the set, the set simply ignores it.\n\n- Create a set with curly braces: `primes = {2, 3, 5, 7}`\n- Convert any list to a set to remove duplicates instantly: `set([1, 2, 2, 3])` becomes `{1, 2, 3}`.\n- Add items with `.add(x)`, remove with `.remove(x)` (or `.discard(x)`).\n- Checking `x in my_set` is **O(1) average time** — just like a dictionary!",
    },
    {
      kind: "code",
      caption: "Converting a list with duplicates into a set, and performing set operations.",
      code: `numbers = [1, 2, 2, 3, 4, 4, 4, 5]
unique = set(numbers)
print("Deduplicated set:", unique)

set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}

# Union | : all items from either set
print("Union (a | b):", set_a | set_b)

# Intersection & : items present in BOTH sets
print("Intersection (a & b):", set_a & set_b)

# Difference - : items in a but NOT in b
print("Difference (a - b):", set_a - set_b)
`,
    },
    {
      kind: "callout",
      tone: "insight",
      title: "How hash tables achieve O(1)",
      markdown:
        "When you look up a key or set element, Python runs it through a mathematical **hash function** that converts it into an integer. That integer points directly to a memory bucket. Python jumps straight to that bucket without scanning through the other items. That is why hash lookups take O(1) time regardless of whether your collection has 10 items or 10,000,000 items!",
    },
    {
      kind: "table",
      caption: "Comparing Python's core collections",
      headers: ["Collection", "Syntax", "Lookup (x in data)", "Duplicates?", "Use case"],
      rows: [
        ["List", "[1, 2, 3]", "O(n) - slow scan", "Allowed", "Ordered sequences, indexing by position"],
        ["Set", "{1, 2, 3}", "O(1) - instant hash", "No duplicates", "Tracking seen items, fast membership checks"],
        ["Dictionary", "{\"a\": 1}", "O(1) - instant hash (keys)", "Keys unique", "Key-value mappings, frequency counts"],
      ],
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `items = [1, 2, 3, 2, 1, 4]
s = set(items)
print(len(s))`,
        options: ["6", "5", "4", "3"],
        answerIndex: 2,
        explanation:
          "`set(items)` automatically removes duplicates: 1 and 2 appear multiple times, leaving only `{1, 2, 3, 4}`. The length of this set is 4.",
        predictsOutput: true,
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "dicts-first-unique-char",
        title: "First non-repeating character",
        prompt:
          "Given a string `s`, find and return the **index** of the first non-repeating character. If every character in `s` repeats, return `-1`.\n\nFor example, in `\"leetcode\"`, `'l'` appears only once and is at index `0`, so return `0`. In `\"loveleetcode\"`, the first non-repeating character is `'v'` at index `2`.\n\nHint: Count character frequencies in a dictionary, then loop through `s` with `enumerate()` to find the first character whose count is `1`.",
        starterCode: `def first_unique_char(s):
    # Return index of first character with frequency 1, or -1
    return -1
`,
        solution: `def first_unique_char(s):
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1

    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1
`,
        harness: { kind: "function", entry: "first_unique_char" },
        testCases: [
          { input: { s: "leetcode" }, expected: 0, description: "'l' appears once at index 0." },
          { input: { s: "loveleetcode" }, expected: 2, description: "'v' is the first unique character, at index 2." },
          { input: { s: "aabb" }, expected: -1, description: "All characters repeat, so return -1." },
          { input: { s: "z" }, expected: 0 },
          { input: { s: "abcabc" }, expected: -1 },
          { input: { s: "aabbcccd" }, expected: 7 },
        ],
        hint: "Step 1: Count character frequencies using a dictionary `counts[ch] = counts.get(ch, 0) + 1`. Step 2: Loop `for i, ch in enumerate(s):` and return `i` when `counts[ch] == 1`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "dicts-contains-duplicate",
        title: "Contains duplicate",
        prompt:
          "Given an integer list `nums`, return `True` if any value appears at least twice in the list, and `False` if every element is distinct.\n\nSolve this in **O(n)** time by using a `set` to remember numbers as you scan through the list.",
        starterCode: `def contains_duplicate(nums):
    # Return True if any duplicate exists, else False
    return False
`,
        solution: `def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
`,
        harness: { kind: "function", entry: "contains_duplicate" },
        testCases: [
          { input: { nums: [1, 2, 3, 1] }, expected: true, description: "1 appears twice, so return True." },
          { input: { nums: [1, 2, 3, 4] }, expected: false, description: "All numbers are distinct, so return False." },
          { input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, expected: true },
          { input: { nums: [] }, expected: false },
          { input: { nums: [42] }, expected: false },
          { input: { nums: [1, 5, -2, -4, 0] }, expected: false },
        ],
        hint: "Initialize `seen = set()`. For each `num` in `nums`, check `if num in seen: return True`, else `seen.add(num)`. Return `False` after checking all numbers.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nDictionaries and sets are the backbone of optimal algorithmic problem-solving:\n\n- **Contains Duplicate**: solved in one pass in O(n) time using a set.\n- **Two Sum**: store `seen[num] = index` to look up the complementary pair in O(1) time.\n- **Valid Anagram**: count character occurrences using a frequency dictionary.\n- **Group Anagrams**: use sorted character signatures or tuple counts as dictionary keys to group matching words.\n- **Longest Consecutive Sequence**: check for streak beginnings in O(1) using a set.",
    },
  ],
};

export default lesson;
