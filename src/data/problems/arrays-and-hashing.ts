import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ contains-duplicate
  {
    id: "contains-duplicate",
    summary:
      "You are given an integer list `nums`. Return `True` if any value appears **at least twice** in the list, and return `False` if every element is distinct.",
    constraints: [
      "1 ≤ len(nums) ≤ 100,000",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
    ],
    pattern: "Hash set of seen elements",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force compares every pair of numbers with nested loops, taking O(n²) time. Using a hash set, we inspect each number once. Checking whether a number is in a set and adding it both take O(1) time on average, giving an overall O(n) runtime.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In the worst case (when all elements are unique), the set stores all n numbers before the function returns False, using O(n) extra memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "seen = set()",
        plainEnglishExplanation:
          "A `set` is a collection of unique items. Checking whether an item is inside a set is practically instant (O(1)). In Python, `{}` creates an empty dictionary, so you must use `set()` to create an empty set.",
        exampleSnippet:
          "s = set()\ns.add(5)\ns.add(5)\nprint(s)\nprint(len(s))",
        whyWeUseItHere:
          "We use a set to remember every number we encounter so we can check for duplicates instantly.",
      },
      {
        keywordOrMethod: "for num in nums:",
        plainEnglishExplanation:
          "A `for ... in ...` loop visits every element in a list from left to right, assigning each value in turn to the variable `num`.",
        exampleSnippet:
          "primes = [2, 3, 5]\nfor p in primes:\n    print(p)",
        whyWeUseItHere:
          "We inspect each number in `nums` one by one.",
      },
      {
        keywordOrMethod: "if num in seen:",
        plainEnglishExplanation:
          "`item in some_set` checks whether `item` exists in the set and returns `True` or `False`. On a set, this lookup takes O(1) average time.",
        exampleSnippet:
          "seen = {1, 2, 3}\nprint(2 in seen)\nprint(9 in seen)",
        whyWeUseItHere:
          "This instant check tells us whether the current number was already encountered earlier.",
      },
      {
        keywordOrMethod: "seen.add(num)",
        plainEnglishExplanation:
          "The `.add()` method inserts a new element into a set. If the element is already present, the set remains unchanged.",
        exampleSnippet:
          "fruits = set()\nfruits.add('apple')\nprint(fruits)",
        whyWeUseItHere:
          "When a number is new, we record it in `seen` so subsequent iterations will recognize it as a duplicate.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { nums: [1, 2, 3, 1] },
      focus: ["seen", "num"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine standing at the door of an event with a guest list. As each guest arrives, you check whether their name is already on your list. If it is, you caught a duplicate right away and can stop. If not, you write their name down and invite the next guest. Because checking a hash set is practically instant, you only walk through the line of guests once.",
      edgeCases: [
        "A list with a single element (e.g. `[1]`): no pair can exist, so the loop finishes and returns `False`.",
        "The duplicate is at the very beginning (e.g. `[1, 1]`): detected on the second item, exiting immediately.",
        "Negative numbers or zeros (e.g. `[-5, 0, -5]`): negative numbers and zeros are hashed and matched just like positive numbers.",
      ],
      stepByStepWalkthrough: [
        "Create an empty set `seen` to store the numbers we have walked past.",
        "Loop over each number `num` in `nums`.",
        "Check if `num` is already in `seen`.",
        "If it is, return `True` immediately since we found a duplicate.",
        "Otherwise, add `num` to `seen` with `seen.add(num)`.",
        "If the loop finishes without finding any duplicate, return `False`.",
      ],
    },
    hints: {
      conceptual:
        "If you remember every number you have seen so far in a fast lookup structure, how quickly can you check if the current number is a duplicate?",
      structural:
        "Initialize an empty set `seen = set()`. Loop with `for num in nums:` and check `if num in seen: return True`. If not found, `seen.add(num)`. At the end of the loop, return `False`.",
    },
    commonMistakes: [
      "Writing `seen = {}` instead of `seen = set()`. In Python, `{}` creates an empty dictionary, not a set.",
      "Using a list instead of a set (e.g. `seen = []` and `num in seen`). Checking membership in a list scans every element one by one, turning the algorithm into slow O(n²).",
      "Using `len(nums) != len(set(nums))`. While correct as a one-liner, it always converts the whole list to a set even if the duplicate is at index 0 and 1, missing the chance to exit early.",
    ],
    starterCode: `def contains_duplicate(nums: list[int]) -> bool:
    # Return True if any value appears at least twice, False if all are unique.
    # Tip: a set allows instant O(1) checks for previously seen numbers.
    pass
`,
    optimalSolution: `def contains_duplicate(nums: list[int]) -> bool:
    # seen keeps track of all numbers encountered so far
    seen = set()

    for num in nums:
        # Have we already run into this number earlier?
        if num in seen:
            # Yes! A duplicate exists
            return True

        # Not yet. Add it to our record for future checks
        seen.add(num)

    # We checked every number and found no repeats
    return False
`,
    bruteForceSolution: `def contains_duplicate(nums: list[int]) -> bool:
    # Compare every pair (i, j) with i < j: O(n²)
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False
`,
    harness: { kind: "function", entry: "contains_duplicate" },
    testCases: [
      { input: { nums: [1, 2, 3, 1] }, expected: true, description: "1 appears at index 0 and index 3." },
      { input: { nums: [1, 2, 3, 4] }, expected: false, description: "All four numbers are distinct." },
      { input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, expected: true, description: "Multiple numbers appear several times." },
      { input: { nums: [7] }, expected: false, description: "A single element cannot contain a duplicate." },
      { input: { nums: [0, 4, 5, 0] }, expected: true },
      { input: { nums: [-1, -2, -3, -1] }, expected: true },
      { input: { nums: [-1, -2, -3, -4] }, expected: false },
      { input: { nums: [1000000000, -1000000000, 1000000000] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ valid-anagram
  {
    id: "valid-anagram",
    summary:
      "Given two strings `s` and `t`, return `True` if `t` is an **anagram** of `s`, and `False` otherwise. An anagram is formed by rearranging all the letters of a word, using each original letter exactly once.",
    constraints: [
      "1 ≤ len(s), len(t) ≤ 50,000",
      "`s` and `t` consist of lowercase English letters",
    ],
    pattern: "Character frequency count using a hash map",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n)",
      explanation:
        "Sorting both strings takes O(n log n) time. Counting character frequencies with a dictionary takes O(n) time, and verifying at most 26 letter counts takes O(1) time, for an overall O(n) runtime.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Because the input only contains lowercase English letters, the dictionary holds at most 26 key-value pairs regardless of how long the strings are.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "len(s) != len(t)",
        plainEnglishExplanation:
          "`len()` counts characters in a string. Two strings can only be anagrams if they have the exact same length. If their lengths differ, we can return `False` immediately.",
        exampleSnippet:
          "s1 = 'cat'\ns2 = 'cats'\nprint(len(s1) != len(s2))",
        whyWeUseItHere:
          "Failing early on length mismatches avoids unnecessary counting.",
      },
      {
        keywordOrMethod: "count = {}",
        plainEnglishExplanation:
          "Curly braces `{}` create an empty dictionary: a key-to-value map. We use characters as keys and integer frequencies as values.",
        exampleSnippet:
          "freq = {}\nfreq['a'] = 1\nprint(freq)",
        whyWeUseItHere:
          "We track the net count of each letter across both strings.",
      },
      {
        keywordOrMethod: "count.get(char, 0)",
        plainEnglishExplanation:
          "`dict.get(key, default)` returns the value for `key` if it exists. If `key` is missing, it returns `default` (0 here) instead of raising a `KeyError`.",
        exampleSnippet:
          "scores = {'a': 5}\nprint(scores.get('a', 0))\nprint(scores.get('b', 0))",
        whyWeUseItHere:
          "Allows us to increment or decrement counts cleanly without an `if char in count:` check.",
      },
      {
        keywordOrMethod: "count.values()",
        plainEnglishExplanation:
          "`dict.values()` returns all values stored in the dictionary, ignoring the keys.",
        exampleSnippet:
          "d = {'a': 0, 'b': 0}\nprint(list(d.values()))",
        whyWeUseItHere:
          "We check if every character balance ended at zero.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { s: "anagram", t: "nagaram" },
      focus: ["count", "char"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of an anagram as rearranging letter tiles from a board game. If two words are anagrams, they must use the exact same inventory of letter tiles. Imagine a ledger: for every letter in the first word, you add +1 to that letter's tally. For every letter in the second word, you subtract -1. If every letter ends up with a balance of 0, the two words used identical tiles in identical amounts.",
      edgeCases: [
        "Different string lengths: e.g. `s = 'a'`, `t = 'ab'`. Caught immediately by `len(s) != len(t)`.",
        "Identical single-letter strings: e.g. `s = 'a'`, `t = 'a'`. Count balances to 0, returns `True`.",
        "Same letters, different frequencies: e.g. `s = 'aacc'`, `t = 'ccac'`. Both have 'a' and 'c', but the counts don't match, returning `False`.",
      ],
      stepByStepWalkthrough: [
        "If `len(s) != len(t)`, return `False` immediately.",
        "Create an empty dictionary `count` to track letter tallies.",
        "Loop through each character in `s` and increment its tally: `count[char] = count.get(char, 0) + 1`.",
        "Loop through each character in `t` and decrement its tally: `count[char] = count.get(char, 0) - 1`.",
        "Iterate over `count.values()`. If any value is not 0, return `False`.",
        "If every balance is 0, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "If two words are anagrams, what must be true about the count of every single letter in both words?",
      structural:
        "First check `if len(s) != len(t): return False`. Use a dictionary `count = {}`. Add 1 for letters in `s`, subtract 1 for letters in `t`. Finally, verify that every value in `count.values()` equals 0.",
    },
    commonMistakes: [
      "Using `set(s) == set(t)`. Sets discard duplicates! `'aa'` and `'a'` have the same set `{'a'}`, but are NOT anagrams.",
      "Using `count[char]` directly without `.get()` or `in` check. If a character appears in `t` that never was in `s`, Python raises a `KeyError`.",
      "Calling `s.count(ch)` inside a loop. That rescans `s` on every iteration, leading to O(n²) performance.",
    ],
    starterCode: `def is_anagram(s: str, t: str) -> bool:
    # Return True if t is an anagram of s, False otherwise.
    # Tip: count how many times each character appears in both strings.
    pass
`,
    optimalSolution: `def is_anagram(s: str, t: str) -> bool:
    # Anagrams must have the exact same number of letters
    if len(s) != len(t):
        return False

    # count tracks the frequency balance of each character: {char: balance}
    count = {}

    # Increment tally for each letter in s
    for char in s:
        count[char] = count.get(char, 0) + 1

    # Decrement tally for each letter in t
    for char in t:
        count[char] = count.get(char, 0) - 1

    # Every letter tally must balance back to zero
    for val in count.values():
        if val != 0:
            return False

    return True
`,
    bruteForceSolution: `def is_anagram(s: str, t: str) -> bool:
    # Sorting both strings takes O(n log n)
    return sorted(s) == sorted(t)
`,
    harness: { kind: "function", entry: "is_anagram" },
    testCases: [
      { input: { s: "anagram", t: "nagaram" }, expected: true, description: "Both strings contain three 'a's, one 'n', one 'g', one 'r', and one 'm'." },
      { input: { s: "rat", t: "car" }, expected: false, description: "'car' has 'c' which does not appear in 'rat'." },
      { input: { s: "a", t: "ab" }, expected: false, description: "Different lengths cannot be anagrams." },
      { input: { s: "listen", t: "silent" }, expected: true },
      { input: { s: "aacc", t: "ccac" }, expected: false, description: "Same characters but unequal frequencies ('a' appears twice in s, once in t)." },
      { input: { s: "z", t: "z" }, expected: true },
      { input: { s: "ab", t: "ba" }, expected: true },
      { input: { s: "aabbcc", t: "bbaacc" }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ two-sum
  {
    id: "two-sum",
    summary:
      "You're given a list of numbers `nums` and a number `target`. Find the **two different positions** in the list whose numbers add up to `target`, and return those two positions (their indices) as a list. There is always exactly one answer, and you may not use the same position twice.",
    constraints: [
      "2 ≤ len(nums) ≤ 10,000",
      "Exactly one valid answer exists",
      "You may return the two indices in any order",
    ],
    pattern: "Hash map of values you've already seen",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force tries every pair: for each of the n numbers it scans up to n partners, so about n × n checks. With a dictionary we walk the list once, and each `in` check / insert costs O(1) on average, so the total is O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In the worst case the answer is the last pair, so we store almost every number in the dictionary before finding it.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def two_sum(nums: list[int], target: int) -> list[int]:",
        plainEnglishExplanation:
          "`def` creates a function named `two_sum` with two inputs (parameters). The `: list[int]` and `-> list[int]` parts are *type hints*: notes for humans saying 'nums is a list of whole numbers' and 'this returns a list of whole numbers'. Python does not enforce them.",
        exampleSnippet:
          "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))",
        whyWeUseItHere:
          "Every problem on this site is a function. The tests call `two_sum(...)` with different inputs and compare what you `return` to the expected answer.",
      },
      {
        keywordOrMethod: "for i, num in enumerate(nums):",
        plainEnglishExplanation:
          "A normal `for num in nums:` loop gives you each value. `enumerate` gives you *pairs*: the position and the value. `i, num` unpacks each pair into two variables, so `i` is 0, 1, 2… and `num` is the number at that position.",
        exampleSnippet:
          "fruits = ['apple', 'kiwi', 'fig']\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)",
        whyWeUseItHere:
          "We need the number (to do the subtraction) AND its index (because the answer is a pair of indices).",
      },
      {
        keywordOrMethod: "seen = {}",
        plainEnglishExplanation:
          "Curly braces create an empty *dictionary* (dict): a lookup table that maps keys to values, like a phone book maps names to numbers. Finding a key takes the same tiny amount of time no matter how big the dict gets.",
        exampleSnippet:
          "ages = {}\nages['ana'] = 31\nages['bo'] = 25\nprint(ages)\nprint(ages['ana'])",
        whyWeUseItHere:
          "We store each number we've passed as a key, with its index as the value: `{number: index}`.",
      },
      {
        keywordOrMethod: "if complement in seen:",
        plainEnglishExplanation:
          "`key in some_dict` asks 'is this key in the dictionary?' and gives `True` or `False`. It checks the keys, not the values, and it's O(1) on average.",
        exampleSnippet:
          "ages = {'ana': 31, 'bo': 25}\nprint('ana' in ages)\nprint('cy' in ages)\nprint(31 in ages)  # False: 31 is a value, not a key",
        whyWeUseItHere:
          "This is the instant check: 'have I already walked past the partner I need?'",
      },
      {
        keywordOrMethod: "return [seen[complement], i]",
        plainEnglishExplanation:
          "`seen[complement]` reads the value stored under the key `complement` (its index). The square brackets around the two values build a new list. `return` hands that list back to whoever called the function and immediately stops the function.",
        exampleSnippet:
          "ages = {'ana': 31}\nprint([ages['ana'], 99])",
        whyWeUseItHere:
          "The earlier index comes from the dictionary; the current index is `i`.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { nums: [3, 4, 5, 6], target: 10 },
      pointers: { nums: ["i"] },
      focus: ["seen", "complement"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine walking down a line of people, each holding a number card, while carrying a notebook. When you reach someone holding `num`, you already know the exact partner they need: `target - num`. So you glance at your notebook: 'have I met that partner yet?' If yes, you're done. If not, you write down this person's number and position, then move on. The notebook is a dictionary, and glancing at it is instant, so you only walk the line once.",
      edgeCases: [
        "The two numbers are equal, e.g. `[3, 3]` with target 6: we only store a number *after* checking it, so the second 3 finds the first one.",
        "A number that is exactly half the target must not pair with itself: `[3, 2, 4]` with target 6 must return `[1, 2]`, not `[0, 0]`.",
        "Negative numbers and zero work the same way: `target - num` handles them naturally.",
      ],
      stepByStepWalkthrough: [
        "Create an empty dictionary `seen` to remember `{number: index}` for everything we've passed.",
        "Loop over the list with `enumerate` so we get each index `i` and value `num`.",
        "Compute `complement = target - num`, the partner `num` needs.",
        "If `complement` is already a key in `seen`, return `[seen[complement], i]`.",
        "Otherwise store the current number: `seen[num] = i`, and continue.",
      ],
    },
    hints: {
      conceptual:
        "For each number x you look at, you know exactly which partner it needs: target − x. The whole problem is: how can you find out *instantly* whether you've already seen that partner?",
      structural:
        "Loop with `for i, num in enumerate(nums):` and keep a dictionary `seen = {number: index}`. Check `if target - num in seen:` BEFORE adding the current number with `seen[num] = i`.",
    },
    commonMistakes: [
      "Adding the current number to `seen` before checking. Then `[3, 2, 4]` with target 6 finds 3 + 3 and wrongly returns `[0, 0]`.",
      "Returning the numbers themselves (`[2, 7]`) instead of their positions (`[0, 1]`).",
      "Using `nums.index(complement)` inside the loop: it secretly scans the whole list each time, making the solution O(n²) again.",
    ],
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Return the indices of the two numbers that add up to target.
    # Tip: a dictionary can remember numbers you've already seen.
    pass
`,
    optimalSolution: `def two_sum(nums: list[int], target: int) -> list[int]:
    # seen remembers every number we've passed: {number: its index}
    seen = {}

    for i, num in enumerate(nums):
        # The partner we'd need so that num + partner == target
        complement = target - num

        # Have we already walked past that partner?
        if complement in seen:
            # Yes! Its index is stored in the dictionary
            return [seen[complement], i]

        # Not yet. Remember this number in case a later one needs it
        seen[num] = i

    return []  # never reached: the problem promises one answer
`,
    bruteForceSolution: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Try every pair (i, j) with i < j
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
`,
    harness: { kind: "function", entry: "two_sum", compare: "unordered" },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], description: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], description: "2 + 4 = 6. Not [0, 0]: you can't use the 3 twice." },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], description: "Two equal numbers at different positions." },
      { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4], description: "Negative numbers: -3 + -5 = -8." },
      { input: { nums: [0, 4, 3, 0], target: 0 }, expected: [0, 3], description: "Zeros count too: 0 + 0 = 0." },
      { input: { nums: [1, 5, 9, 13, 2], target: 22 }, expected: [2, 3], description: "The pair is in the middle." },
      { input: { nums: [5, 75, 25], target: 100 }, expected: [1, 2] },
    ],
  },

  // ------------------------------------------------------------------ group-anagrams
  {
    id: "group-anagrams",
    summary:
      "Given a list of strings `strs`, group all the **anagrams** together into separate sublists. You can return the groups in any order.",
    constraints: [
      "1 ≤ len(strs) ≤ 10,000",
      "0 ≤ len(strs[i]) ≤ 100",
      "`strs[i]` consists of lowercase English letters",
    ],
    pattern: "Hash map with sorted string as key",
    timeComplexity: {
      bruteForce: "O(n² × k log k)",
      optimal: "O(n × k log k)",
      explanation:
        "For each of the n strings with maximum length k, sorting its characters takes O(k log k). Inserting into the hash map takes O(k) time. Grouping all n words therefore takes O(n × k log k) time.",
    },
    spaceComplexity: {
      optimal: "O(n × k)",
      explanation:
        "The hash map stores all n strings and their sorted keys, taking O(n × k) total space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import defaultdict",
        plainEnglishExplanation:
          "`defaultdict(list)` is a dictionary that automatically creates an empty list `[]` whenever you access a key for the first time, so you never get a `KeyError`.",
        exampleSnippet:
          "from collections import defaultdict\ngroups = defaultdict(list)\ngroups['key'].append('val')\nprint(dict(groups))",
        whyWeUseItHere:
          "We can immediately append words to `groups[sorted_word]` without checking if the bucket already exists.",
      },
      {
        keywordOrMethod: "sorted(word)",
        plainEnglishExplanation:
          "`sorted()` returns a list containing all the characters of the string in alphabetical order.",
        exampleSnippet:
          "print(sorted('eat'))\nprint(sorted('tea'))",
        whyWeUseItHere:
          "All anagrams produce the exact same sorted character list.",
      },
      {
        keywordOrMethod: "''.join(...)",
        plainEnglishExplanation:
          "`''.join(list_of_chars)` glues a list of characters back into a single string. Dictionary keys in Python must be immutable (like strings), not lists.",
        exampleSnippet:
          "letters = ['a', 'e', 't']\nprint(''.join(letters))",
        whyWeUseItHere:
          "We convert the sorted character list into a string key for our dictionary.",
      },
      {
        keywordOrMethod: "list(groups.values())",
        plainEnglishExplanation:
          "`groups.values()` extracts all the bucket lists from the dictionary, and `list(...)` turns them into a list of lists.",
        exampleSnippet:
          "d = {'a': [1, 2], 'b': [3]}\nprint(list(d.values()))",
        whyWeUseItHere:
          "The final answer requires a list of grouped words, discarding the dictionary keys.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
      focus: ["groups", "sorted_word", "word"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine sorting a pile of scrambled letters into labeled folders. If you rearrange the letters of 'eat', 'tea', and 'ate' into alphabetical order, they all spell 'aet'. That sorted string acts like a barcode or label. For every word you encounter, you compute its alphabetical barcode, locate the folder with that label, and drop the word inside. When done, you just collect all the folders.",
      edgeCases: [
        "An empty string (e.g. `['']`): sorting an empty string gives `''`, which is a valid key producing `[['']]`.",
        "A single word (e.g. `['a']`): produces `[['a']]`.",
        "No words share anagrams (e.g. `['cat', 'dog']`): each word forms its own single-element group `[['cat'], ['dog']]`.",
        "All words are anagrams: all words gather into one single group.",
      ],
      stepByStepWalkthrough: [
        "Import `defaultdict` from `collections`.",
        "Initialize `groups = defaultdict(list)` to store words under their sorted keys.",
        "For each `word` in `strs`, sort its characters and join them: `sorted_word = ''.join(sorted(word))`.",
        "Append `word` to `groups[sorted_word]`.",
        "Return `list(groups.values())`.",
      ],
    },
    hints: {
      conceptual:
        "What canonical representation do all anagrams share when their letters are rearranged in a standard order?",
      structural:
        "Use `groups = defaultdict(list)`. For each `word in strs`, sort its letters with `''.join(sorted(word))` to make a key, and append `word` to `groups[key]`. Finally, return `list(groups.values())`.",
    },
    commonMistakes: [
      "Using a list as a dictionary key, like `groups[sorted(word)]`. Python lists are mutable and cannot be dictionary keys (`TypeError: unhashable type: 'list'`). Always join characters into a string or convert to a tuple.",
      "Overwriting words instead of appending, e.g. `groups[key] = [word]`, which forgets previously grouped anagrams.",
    ],
    starterCode: `from collections import defaultdict


def group_anagrams(strs: list[str]) -> list[list[str]]:
    # Group all anagrams together into separate sublists.
    # Tip: sorting a word's letters gives a common key for all its anagrams.
    pass
`,
    optimalSolution: `from collections import defaultdict


def group_anagrams(strs: list[str]) -> list[list[str]]:
    # Map each sorted signature to the list of words sharing that signature
    groups = defaultdict(list)

    for word in strs:
        # Sorting characters creates the same signature for all anagrams
        sorted_word = "".join(sorted(word))
        # Add the original word to its matching group
        groups[sorted_word].append(word)

    # Return all the grouped word lists
    return list(groups.values())
`,
    bruteForceSolution: `def group_anagrams(strs: list[str]) -> list[list[str]]:
    # Pairwise comparison without a hash map: O(n² × k log k)
    res = []
    used = [False] * len(strs)

    for i in range(len(strs)):
        if used[i]:
            continue
        group = [strs[i]]
        used[i] = True
        for j in range(i + 1, len(strs)):
            if not used[j] and sorted(strs[i]) == sorted(strs[j]):
                group.append(strs[j])
                used[j] = True
        res.append(group)

    return res
`,
    harness: { kind: "function", entry: "group_anagrams", compare: "unordered-nested" },
    testCases: [
      { input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] }, expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]], description: "'eat', 'tea', and 'ate' group together; 'tan' and 'nat' group together; 'bat' is alone." },
      { input: { strs: [""] }, expected: [[""]], description: "A single empty string." },
      { input: { strs: ["a"] }, expected: [["a"]], description: "A single one-letter string." },
      { input: { strs: ["ab", "ba", "abc", "cba", "bca"] }, expected: [["ab", "ba"], ["abc", "cba", "bca"]] },
      { input: { strs: ["stop", "pots", "tops", "opts", "post"] }, expected: [["stop", "pots", "tops", "opts", "post"]], description: "All five words are anagrams of each other." },
      { input: { strs: ["cat", "dog", "pig"] }, expected: [["cat"], ["dog"], ["pig"]], description: "No words share any anagrams." },
      { input: { strs: ["a", "b", "a"] }, expected: [["a", "a"], ["b"]] },
    ],
  },

  // ------------------------------------------------------------------ top-k-frequent-elements
  {
    id: "top-k-frequent-elements",
    summary:
      "Given an integer list `nums` and an integer `k`, return the `k` **most frequent** elements in the list. You may return the answer in any order, and the answer is guaranteed to be unique.",
    constraints: [
      "1 ≤ len(nums) ≤ 100,000",
      "k is in the range [1, number of unique elements]",
      "The answer is guaranteed to be unique",
    ],
    pattern: "Bucket sort by frequency (or hash map frequency count)",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n)",
      explanation:
        "Counting frequencies takes O(n). Bucket sort creates an array of size n + 1 where index f holds numbers with frequency f. Populating buckets takes O(n), and scanning buckets backwards from highest frequency takes O(n) time. The total runtime is strictly O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The frequency map and bucket array both store at most n numbers, using O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import Counter",
        plainEnglishExplanation:
          "`Counter(nums)` is a built-in dictionary subclass that automatically counts how many times each item appears in a list.",
        exampleSnippet:
          "from collections import Counter\ncounts = Counter([1, 1, 2, 3, 3, 3])\nprint(counts[3])\nprint(counts[2])",
        whyWeUseItHere:
          "It counts occurrences of each number in one fast line.",
      },
      {
        keywordOrMethod: "[[] for _ in range(len(nums) + 1)]",
        plainEnglishExplanation:
          "A list comprehension that builds a list of separate empty lists. Each sublist represents a 'bucket' for a specific frequency count.",
        exampleSnippet:
          "buckets = [[] for _ in range(4)]\nbuckets[2].append(99)\nprint(buckets)",
        whyWeUseItHere:
          "A number can appear at most `len(nums)` times, so index `f` in `buckets` holds all numbers with frequency `f`.",
      },
      {
        keywordOrMethod: "for num, freq in counts.items():",
        plainEnglishExplanation:
          "`counts.items()` yields `(key, value)` pairs from the dictionary. `num, freq` unpacks each pair into two variables.",
        exampleSnippet:
          "grades = {'alice': 90, 'bob': 80}\nfor name, score in grades.items():\n    print(name, score)",
        whyWeUseItHere:
          "We put each `num` into the bucket at index `freq`.",
      },
      {
        keywordOrMethod: "range(len(buckets) - 1, 0, -1)",
        plainEnglishExplanation:
          "`range(start, stop, -1)` counts backwards by 1, from the highest possible frequency down to 1.",
        exampleSnippet:
          "for i in range(3, 0, -1):\n    print(i)",
        whyWeUseItHere:
          "We want the most frequent elements first, so we read buckets from highest frequency to lowest.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
      focus: ["counts", "buckets", "res"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a voting competition where people vote for different candidates (numbers). First, you count the votes for each candidate. Instead of spending time sorting all candidates by vote count, imagine setting up labeled bins: bin #1, bin #2, bin #3... representing vote totals. If candidate 1 got 3 votes, drop candidate 1 into bin #3. If candidate 2 got 2 votes, drop 2 into bin #2. Now you simply walk from the highest-numbered bin down, picking candidates until you have k winners.",
      edgeCases: [
        "k equals the number of unique elements: e.g. `nums = [1]`, `k = 1`. Returns `[1]`.",
        "All elements appear with the same frequency: e.g. `[1, 2, 3]`, `k = 3`. All are placed in bucket 1 and collected.",
        "Negative numbers or zeros: e.g. `[-1, -1, 0]`, `k = 1`. Handled identically by frequency tally.",
      ],
      stepByStepWalkthrough: [
        "Count frequencies of all numbers using `Counter(nums)`.",
        "Create a list of empty lists `buckets` of length `len(nums) + 1`.",
        "For each `(num, freq)` in `counts.items()`, append `num` to `buckets[freq]`.",
        "Create an empty result list `res`.",
        "Loop backwards through `buckets` from the highest frequency index down to 1.",
        "For each `num` in `buckets[freq]`, append it to `res`.",
        "If `len(res) == k`, return `res` immediately.",
      ],
    },
    hints: {
      conceptual:
        "Can you group elements by how many times they appear? What is the maximum frequency any number can have in a list of length n?",
      structural:
        "Count frequencies with `counts = Counter(nums)`. Make buckets `buckets = [[] for _ in range(len(nums) + 1)]` and append each number to `buckets[freq]`. Scan backwards with `for freq in range(len(buckets) - 1, 0, -1):` and collect numbers until `len(res) == k`.",
    },
    commonMistakes: [
      "Writing `buckets = [[]] * (len(nums) + 1)`. In Python, `[[]] * n` creates references to the EXACT SAME inner list! Appending to one bucket modifies every bucket.",
      "Sorting all numbers by frequency with `sorted(counts.keys(), key=lambda x: counts[x], reverse=True)[:k]`. This works and passes, but takes O(n log n) time instead of O(n).",
    ],
    starterCode: `from collections import Counter


def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Return the k most frequent elements in any order.
    # Tip: bucket sort by frequency achieves O(n) runtime.
    pass
`,
    optimalSolution: `from collections import Counter


def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Count how many times each number appears
    counts = Counter(nums)

    # buckets[f] holds all numbers that appear exactly f times
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)

    # Collect numbers from highest frequency down to 1
    res = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            res.append(num)
            # Stop as soon as we have collected k elements
            if len(res) == k:
                return res

    return res
`,
    bruteForceSolution: `from collections import Counter


def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Count frequencies, then sort unique numbers by frequency descending: O(n log n)
    counts = Counter(nums)
    sorted_nums = sorted(counts.keys(), key=lambda x: counts[x], reverse=True)
    return sorted_nums[:k]
`,
    harness: { kind: "function", entry: "top_k_frequent", compare: "unordered" },
    testCases: [
      { input: { nums: [1, 1, 1, 2, 2, 3], k: 2 }, expected: [1, 2], description: "1 appears three times and 2 appears twice; both are more frequent than 3." },
      { input: { nums: [1], k: 1 }, expected: [1], description: "Only one unique element." },
      { input: { nums: [4, 4, 4, 6, 6, 7, 7, 7, 7], k: 2 }, expected: [7, 4], description: "7 appears four times, 4 appears three times, 6 appears twice." },
      { input: { nums: [-1, -1, 2, 2, 2, 3], k: 2 }, expected: [2, -1] },
      { input: { nums: [5, 5, 5, 5], k: 1 }, expected: [5] },
      { input: { nums: [1, 2, 3, 4], k: 4 }, expected: [1, 2, 3, 4] },
      { input: { nums: [3, 0, 1, 0], k: 1 }, expected: [0] },
    ],
  },

  // ------------------------------------------------------------------ product-of-array-except-self
  {
    id: "product-of-array-except-self",
    summary:
      "Given an integer list `nums`, return a list `res` where `res[i]` is the product of all elements in `nums` **except** `nums[i]`. You must solve this in **O(n)** time **without using division**.",
    constraints: [
      "2 ≤ len(nums) ≤ 100,000",
      "-30 ≤ nums[i] ≤ 30",
      "The product of any prefix or suffix fits in a 32-bit integer",
      "Do not use division",
    ],
    pattern: "Prefix and suffix products (running accumulator)",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force multiplies every other element with nested loops, taking O(n²) time. The optimal approach makes one forward pass to store left products and one backward pass to multiply right products, taking O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The output array `res` does not count as extra auxiliary space for the purpose of algorithm analysis, and we only use two integer accumulator variables (`prefix` and `postfix`).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "res = [1] * len(nums)",
        plainEnglishExplanation:
          "Creates a new list filled with `1`s of the exact same length as `nums`. 1 is the multiplicative identity (multiplying by 1 leaves numbers unchanged).",
        exampleSnippet:
          "print([1] * 4)",
        whyWeUseItHere:
          "Initializes the output list so we can accumulate products into each position.",
      },
      {
        keywordOrMethod: "for i in range(len(nums)):",
        plainEnglishExplanation:
          "Loops through indices `0, 1, ..., len(nums) - 1`, letting us access and modify elements by their index `i`.",
        exampleSnippet:
          "items = ['a', 'b']\nfor i in range(len(items)):\n    print(i, items[i])",
        whyWeUseItHere:
          "We need the index to store the product of elements to the left of position `i`.",
      },
      {
        keywordOrMethod: "for i in range(len(nums) - 1, -1, -1):",
        plainEnglishExplanation:
          "`range(start, stop, step)` with step -1 counts backwards from the last index down to 0.",
        exampleSnippet:
          "nums = [10, 20, 30]\nfor i in range(len(nums) - 1, -1, -1):\n    print(nums[i])",
        whyWeUseItHere:
          "We walk backwards to multiply each position by the product of all elements to its right.",
      },
      {
        keywordOrMethod: "prefix *= nums[i]",
        plainEnglishExplanation:
          "`prefix *= val` is shorthand for `prefix = prefix * val`. It multiplies `prefix` by `val` and updates `prefix`.",
        exampleSnippet:
          "total = 3\ntotal *= 4\nprint(total)",
        whyWeUseItHere:
          "Maintains a running product of numbers seen so far.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [1, 2, 3, 4] },
      pointers: { nums: ["i"], res: ["i"] },
      focus: ["prefix", "postfix", "res"],
    },
    intuitiveExplanation: {
      intuition:
        "For any position i, the product of everything except nums[i] is simply (product of everything to the left of i) × (product of everything to the right of i). Picture two passes: in the first pass, you walk left-to-right carrying a basket that multiplies every number you pass, dropping off the left-product at each spot. In the second pass, you walk right-to-left carrying another basket, multiplying the right-product into whatever was already in each spot. When you finish, every position has left × right, with zero division!",
      edgeCases: [
        "A single zero in nums (e.g. `[1, 0, 3]`): the spot holding 0 gets the product of the non-zero numbers (3), while all other positions include the zero and become 0.",
        "Multiple zeros (e.g. `[0, 2, 0]`): every single position's product includes at least one zero, producing all zeros.",
        "Negative numbers (e.g. `[-1, 1, -1, 1]`): negative signs naturally cancel out or persist according to standard multiplication rules.",
      ],
      stepByStepWalkthrough: [
        "Create a result list `res` filled with `1`s of length `n = len(nums)`.",
        "Initialize `prefix = 1` for the product of numbers to the left.",
        "Loop forward `for i in range(n)`: set `res[i] = prefix`, then update `prefix *= nums[i]`.",
        "Initialize `postfix = 1` for the product of numbers to the right.",
        "Loop backward `for i in range(n - 1, -1, -1)`: multiply `res[i] *= postfix`, then update `postfix *= nums[i]`.",
        "Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "If you cannot divide the total product by nums[i], how can you compute the product of everything to the left of index i, and the product of everything to the right of index i?",
      structural:
        "Create `res = [1] * len(nums)`. In a forward pass `for i in range(len(nums)):`, store `prefix` in `res[i]` and multiply `prefix *= nums[i]`. In a backward pass `for i in range(len(nums) - 1, -1, -1):`, multiply `res[i] *= postfix` and multiply `postfix *= nums[i]`. Return `res`.",
    },
    commonMistakes: [
      "Using division: taking the total product of the entire array and dividing by `nums[i]`. This violates the rules and crashes with `ZeroDivisionError` when any number is 0.",
      "Updating `prefix` before writing to `res[i]`. Since `res[i]` should NOT include `nums[i]`, you must write `prefix` to `res[i]` FIRST, and only then multiply `prefix` by `nums[i]`.",
    ],
    starterCode: `def product_except_self(nums: list[int]) -> list[int]:
    # Return a list where res[i] is the product of all elements except nums[i].
    # Do NOT use division; aim for O(n) time.
    pass
`,
    optimalSolution: `def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n

    # Forward pass: res[i] gets the product of all elements to the left of i
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]

    # Backward pass: multiply each res[i] by the product of all elements to the right of i
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]

    return res
`,
    bruteForceSolution: `def product_except_self(nums: list[int]) -> list[int]:
    # Multiply all other elements for each position: O(n²)
    res = []
    for i in range(len(nums)):
        prod = 1
        for j in range(len(nums)):
            if i != j:
                prod *= nums[j]
        res.append(prod)
    return res
`,
    harness: { kind: "function", entry: "product_except_self" },
    testCases: [
      { input: { nums: [1, 2, 3, 4] }, expected: [24, 12, 8, 6], description: "At index 0: 2*3*4=24; index 1: 1*3*4=12; index 2: 1*2*4=8; index 3: 1*2*3=6." },
      { input: { nums: [-1, 1, 0, -3, 3] }, expected: [0, 0, 9, 0, 0], description: "Zero makes every position 0 except index 2, which is (-1)*1*(-3)*3 = 9." },
      { input: { nums: [2, 3] }, expected: [3, 2], description: "Two elements: each gets the other element." },
      { input: { nums: [0, 0] }, expected: [0, 0], description: "Two zeros: every product has a zero, so all results are 0." },
      { input: { nums: [1, -1] }, expected: [-1, 1] },
      { input: { nums: [5, 2, 4, 3] }, expected: [24, 60, 30, 40] },
      { input: { nums: [1, 1, 1, 1] }, expected: [1, 1, 1, 1] },
    ],
  },

  // ------------------------------------------------------------------ valid-sudoku
  {
    id: "valid-sudoku",
    summary:
      "Determine if a 9x9 Sudoku board is valid. Each row, each column, and each of the nine 3x3 sub-boxes must contain digits 1-9 without repetition. Empty cells are marked with `'.'`. The board does not need to be solvable or completely filled, only valid according to the numbers currently on it.",
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit '1'-'9' or '.'",
    ],
    pattern: "Hash sets for tracking seen digits across rows, columns, and 3x3 boxes",
    timeComplexity: {
      bruteForce: "O(1)",
      optimal: "O(1)",
      explanation:
        "The board has a fixed size of 9 × 9 = 81 cells. We visit each cell once and perform O(1) set operations, resulting in a constant runtime.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "At most 81 digit entries are stored across all row, column, and block sets, which is bounded by a constant.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import defaultdict",
        plainEnglishExplanation:
          "`defaultdict(set)` automatically creates a fresh, empty `set()` whenever a key is accessed for the first time.",
        exampleSnippet:
          "from collections import defaultdict\ngroups = defaultdict(set)\ngroups['row0'].add('5')\nprint(groups['row0'])",
        whyWeUseItHere:
          "We can track seen numbers for every row, column, and 3x3 block without manually pre-populating 27 separate sets.",
      },
      {
        keywordOrMethod: "for r in range(9): for c in range(9):",
        plainEnglishExplanation:
          "Nested loops that iterate over row index `r` from 0 to 8 and column index `c` from 0 to 8, visiting every cell in a 9x9 grid.",
        exampleSnippet:
          "for r in range(2):\n    for c in range(2):\n        print(r, c)",
        whyWeUseItHere:
          "We need to check every coordinate in the Sudoku board.",
      },
      {
        keywordOrMethod: "val == '.' / continue",
        plainEnglishExplanation:
          "Empty cells are marked with a dot `'.'`. The `continue` keyword skips the rest of the current loop iteration and moves directly to the next cell.",
        exampleSnippet:
          "for ch in ['1', '.', '2']:\n    if ch == '.':\n        continue\n    print(ch)",
        whyWeUseItHere:
          "Empty cells don't constrain anything in Sudoku, so we skip past them.",
      },
      {
        keywordOrMethod: "(r // 3, c // 3)",
        plainEnglishExplanation:
          "Integer division `// 3` groups coordinates into blocks of 3. Rows 0, 1, 2 become 0; 3, 4, 5 become 1; 6, 7, 8 become 2. Together `(r // 3, c // 3)` gives a 2D coordinate from `(0, 0)` to `(2, 2)` identifying which 3x3 sub-grid the cell is in.",
        exampleSnippet:
          "r, c = 4, 7\nbox_coord = (r // 3, c // 3)\nprint(box_coord)",
        whyWeUseItHere:
          "Every cell in the same 3x3 sub-box shares the same `(r // 3, c // 3)` tuple.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        board: [
          ["8", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      },
      gridPointers: { board: [["r", "c"]] },
      focus: ["val", "rows", "cols", "boxes"],
    },
    intuitiveExplanation: {
      intuition:
        "Sudoku validity has three simple rules: no duplicate digits in any row, no duplicate digits in any column, and no duplicate digits in any 3x3 box. Imagine three checkers walking with you across the board. Whenever you see a digit, the Row Checker checks if that row already has it, the Column Checker checks the column, and the Box Checker checks that 3x3 box. If any of the three finds a repeat, the board is invalid. If none of them find it, they all write it down and you move on.",
      edgeCases: [
        "An empty board with all dots: every cell is skipped, returning `True`.",
        "Duplicate within a 3x3 box that is on different rows and columns: caught by the box check.",
        "Duplicate in the same column: caught by the column check.",
      ],
      stepByStepWalkthrough: [
        "Initialize three `defaultdict(set)` objects: `rows`, `cols`, and `boxes`.",
        "Iterate over row index `r` from 0 to 8 and column index `c` from 0 to 8.",
        "Read `val = board[r][c]`. If `val == '.'`, continue to the next cell.",
        "Compute the 3x3 box coordinate: `box_key = (r // 3, c // 3)`.",
        "Check if `val` is already present in `rows[r]`, `cols[c]`, or `boxes[box_key]`.",
        "If `val` is in any of those three sets, return `False` immediately.",
        "Otherwise, add `val` to `rows[r]`, `cols[c]`, and `boxes[box_key]`.",
        "If all cells pass without conflict, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "How can you uniquely label which of the nine 3x3 boxes a cell at row r and column c belongs to?",
      structural:
        "Use three `defaultdict(set)` structures for rows, columns, and 3x3 boxes. For each cell `board[r][c] != '.'`, check whether `val` is in `rows[r]`, `cols[c]`, or `boxes[(r // 3, c // 3)]`. If yes return `False`, otherwise add it to all three sets.",
    },
    commonMistakes: [
      "Using `r % 3` instead of `r // 3`. `r % 3` cycles 0, 1, 2, 0, 1, 2, putting different rows into the same box incorrectly. `r // 3` groups rows 0-2 into block 0.",
      "Treating empty cells `'.'` as digits. If dots are not skipped, multiple dots will trigger false duplicate warnings.",
    ],
    starterCode: `from collections import defaultdict


def is_valid_sudoku(board: list[list[str]]) -> bool:
    # Return True if the 9x9 Sudoku board is valid so far, False otherwise.
    # Tip: use sets to track seen numbers for each row, column, and 3x3 block.
    pass
`,
    optimalSolution: `from collections import defaultdict


def is_valid_sudoku(board: list[list[str]]) -> bool:
    # Track digits seen in each row, column, and 3x3 block
    rows = defaultdict(set)
    cols = defaultdict(set)
    boxes = defaultdict(set)

    for r in range(9):
        for c in range(9):
            val = board[r][c]

            # Empty cells are valid; skip them
            if val == ".":
                continue

            # Identify which 3x3 block this cell belongs to
            box_key = (r // 3, c // 3)

            # Check if this digit has already appeared in this row, col, or box
            if val in rows[r] or val in cols[c] or val in boxes[box_key]:
                return False

            # Record this digit in all three collections
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_key].add(val)

    return True
`,
    bruteForceSolution: `def is_valid_sudoku(board: list[list[str]]) -> bool:
    # Check each row
    for r in range(9):
        seen = set()
        for c in range(9):
            v = board[r][c]
            if v != ".":
                if v in seen:
                    return False
                seen.add(v)

    # Check each column
    for c in range(9):
        seen = set()
        for r in range(9):
            v = board[r][c]
            if v != ".":
                if v in seen:
                    return False
                seen.add(v)

    # Check each 3x3 block
    for br in range(3):
        for bc in range(3):
            seen = set()
            for r in range(br * 3, br * 3 + 3):
                for c in range(bc * 3, bc * 3 + 3):
                    v = board[r][c]
                    if v != ".":
                        if v in seen:
                            return False
                        seen.add(v)

    return True
`,
    harness: { kind: "function", entry: "is_valid_sudoku" },
    testCases: [
      {
        input: {
          board: [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        },
        expected: true,
        description: "A standard partially-filled valid Sudoku board.",
      },
      {
        input: {
          board: [
            ["8", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        },
        expected: false,
        description: "Invalid because board[0][0] and board[2][2] are both '8', repeating in the top-left 3x3 block.",
      },
      {
        input: {
          board: [
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        },
        expected: true,
        description: "A completely empty board is valid.",
      },
      {
        input: {
          board: [
            ["1", "1", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        },
        expected: false,
      },
      {
        input: {
          board: [
            ["1", ".", ".", ".", ".", ".", ".", ".", "."],
            ["1", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        },
        expected: false,
      },
      {
        input: {
          board: [
            ["5", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", "5", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        },
        expected: false,
      },
    ],
  },

  // ------------------------------------------------------------------ encode-and-decode-strings
  {
    id: "encode-and-decode-strings",
    summary:
      "Design an algorithm to **encode** a list of strings into a single string, and **decode** that single string back into the original list of strings. The strings may contain any of the 256 possible ASCII characters, including delimiters, spaces, symbols, and empty strings.",
    constraints: [
      "0 ≤ len(strs) ≤ 200",
      "0 ≤ len(strs[i]) ≤ 200",
      "`strs[i]` consists of any valid ASCII characters",
    ],
    pattern: "Length-prefixed encoding (<length>#<string>)",
    timeComplexity: {
      bruteForce: "O(n × k)",
      optimal: "O(n × k)",
      explanation:
        "Encoding iterates through all n strings of average length k, computing lengths and joining them in O(n × k) time. Decoding parses length prefixes and slices strings in O(n × k) time. Both operations run in linear time relative to the total number of characters.",
    },
    spaceComplexity: {
      optimal: "O(n × k)",
      explanation:
        "The encoded string and decoded list store the characters of all strings plus a few characters for each length prefix.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: 'f"{len(s)}#{s}"',
        plainEnglishExplanation:
          'An f-string embeds expressions inside curly braces `{}`. `f"{len(s)}#{s}"` prefixes string `s` with its length and a `#` delimiter.',
        exampleSnippet:
          "s = 'hello'\nprint(f'{len(s)}#{s}')",
        whyWeUseItHere:
          "Tells the decoder exactly how many characters to read, preventing confusion if `s` contains `#` itself.",
      },
      {
        keywordOrMethod: "''.join(...)",
        plainEnglishExplanation:
          "Concatenates a list of strings into a single string efficiently in O(n) time.",
        exampleSnippet:
          "parts = ['4#neet', '4#code']\nprint(''.join(parts))",
        whyWeUseItHere:
          "We combine all length-prefixed pieces into one encoded string.",
      },
      {
        keywordOrMethod: "while i < len(s):",
        plainEnglishExplanation:
          "A `while` loop that continues running as long as index pointer `i` is within the bounds of string `s`.",
        exampleSnippet:
          "text = 'abc'\ni = 0\nwhile i < len(text):\n    print(text[i])\n    i += 1",
        whyWeUseItHere:
          "Since words have variable lengths, we jump `i` forward by the decoded word length on each step.",
      },
      {
        keywordOrMethod: "s.find('#', i)",
        plainEnglishExplanation:
          "`s.find(sub, start)` searches for `sub` beginning from index `start`, returning the index where `sub` was found.",
        exampleSnippet:
          "msg = '4#love'\nj = msg.find('#', 0)\nprint(j)\nprint(msg[:j])",
        whyWeUseItHere:
          "Finds the `#` delimiter following the length digits starting at index `i`.",
      },
      {
        keywordOrMethod: "s[j + 1 : j + 1 + length]",
        plainEnglishExplanation:
          "String slicing extracts characters starting at index `start` up to (but not including) `end`.",
        exampleSnippet:
          "encoded = '4#word'\nj = 1\nlength = 4\nprint(encoded[j + 1 : j + 1 + length])",
        whyWeUseItHere:
          "Extracts the exact word characters after the `#` delimiter.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { strs: ["neet", "code", "love"] },
      pointers: { s: ["i", "j"] },
      focus: ["res", "length", "i", "j"],
    },
    intuitiveExplanation: {
      intuition:
        "If you simply joined words with a comma like 'cat,dog', what happens if a word contains a comma like 'hello,world'? The delimiter gets mixed up with the data! No single delimiter character is safe because any character could be part of a word. Instead, think of how network protocols send packets: before each packet, they write its length in bytes: '4#neat4#code'. Even if a word contains '#', like '2##1', its encoded header says length 3: '3#2##1'. The decoder reads '3', knows the next 3 characters are payload, and never gets confused by the '#' inside.",
      edgeCases: [
        "An empty list `strs = []`: encodes to `\"\"`, decodes back to `[]`.",
        "A list containing empty strings `[\"\"]`: encoded as `\"0#\"`, decodes back to `[\"\"]`.",
        "Strings with special characters, spaces, or '#': e.g. `[\"123#\", \"#\"]`. The length prefix ensures `#` is treated as content, not delimiter.",
      ],
      stepByStepWalkthrough: [
        "To encode: iterate over each string `s` in `strs`, formatting each as `f\"{len(s)}#{s}\"`.",
        "Join all parts together into a single string and return it.",
        "To decode: initialize an empty result list `res` and pointer `i = 0`.",
        "While `i < len(s)`, locate the next delimiter with `j = s.find('#', i)`.",
        "Convert the length characters `s[i:j]` to an integer `length = int(s[i:j])`.",
        "Extract the word content: `word = s[j + 1 : j + 1 + length]` and append to `res`.",
        "Advance the pointer past the extracted word: `i = j + 1 + length`.",
        "Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "Any separator you choose might appear inside the strings. How can you tell the decoder how long each word is BEFORE reading it?",
      structural:
        "In `encode`, prefix each string with its length and a delimiter: `f\"{len(s)}#{s}\"`. In `decode`, use a pointer `i = 0` and a `while i < len(s):` loop. Find `#` at `j = s.find('#', i)`, parse `length = int(s[i:j])`, slice `s[j + 1 : j + 1 + length]`, and advance `i = j + 1 + length`.",
    },
    commonMistakes: [
      "Using simple string splitting like `s.split(\",\")`. If any string contains a comma, decoding fails.",
      "Assuming string lengths are always single-digit numbers. A string of length 12 has prefix `12#`, so you must find the `#` delimiter rather than assuming `length` is only at index `i`.",
    ],
    starterCode: `def encode(strs: list[str]) -> str:
    # Encode a list of strings to a single string.
    # Tip: prefix each string with its length and a delimiter like '#'.
    pass


def decode(s: str) -> list[str]:
    # Decode the single string back into the original list of strings.
    pass
`,
    optimalSolution: `def encode(strs: list[str]) -> str:
    # Prefix each string with its length and a delimiter: e.g. "4#neet"
    encoded_parts = []
    for s in strs:
        encoded_parts.append(f"{len(s)}#{s}")
    return "".join(encoded_parts)


def decode(s: str) -> list[str]:
    res = []
    i = 0

    while i < len(s):
        # Find the delimiter that marks the end of the length number
        j = s.find("#", i)
        # Parse the length digits into an integer
        length = int(s[i:j])
        # Extract exactly 'length' characters following the '#'
        word = s[j + 1 : j + 1 + length]
        res.append(word)
        # Advance the pointer to the start of the next length prefix
        i = j + 1 + length

    return res
`,
    bruteForceSolution: `def encode(strs: list[str]) -> str:
    # Alternative encoding using explicit loop concatenation
    res = ""
    for s in strs:
        res += str(len(s)) + "#" + s
    return res


def decode(s: str) -> list[str]:
    res = []
    i = 0
    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        res.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return res
`,
    harness: { kind: "custom", entry: "encode", runner: "encode-decode" },
    testCases: [
      { input: { strs: ["neet", "code", "love", "you"] }, expected: ["neet", "code", "love", "you"], description: "Standard list of four words." },
      { input: { strs: ["we", "say", ":", "yes"] }, expected: ["we", "say", ":", "yes"], description: "Contains punctuation marks." },
      { input: { strs: [""] }, expected: [""], description: "A list with a single empty string." },
      { input: { strs: [] }, expected: [], description: "An empty list." },
      { input: { strs: ["#", "##", "###"] }, expected: ["#", "##", "###"], description: "Strings made entirely of the '#' delimiter." },
      { input: { strs: ["12#ab", "4#cd"] }, expected: ["12#ab", "4#cd"], description: "Strings that look like length prefixes." },
      { input: { strs: ["a", "b", "c", "d"] }, expected: ["a", "b", "c", "d"] },
      { input: { strs: ["hello world", "spaces inside strings"] }, expected: ["hello world", "spaces inside strings"] },
    ],
  },

  // ------------------------------------------------------------------ longest-consecutive-sequence
  {
    id: "longest-consecutive-sequence",
    summary:
      "Given an unsorted list of integers `nums`, return the length of the **longest consecutive elements sequence** (e.g. `[1, 2, 3, 4]` has length 4). Your algorithm must run in **O(n)** time.",
    constraints: [
      "0 ≤ len(nums) ≤ 100,000",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
    ],
    pattern: "Hash set with sequence start detection (num - 1 not in set)",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n)",
      explanation:
        "Sorting nums takes O(n log n). By placing all numbers in a hash set, lookups take O(1). We only count forward if `num - 1` is NOT in the set (identifying `num` as the true start of a streak). Every number is visited at most twice, resulting in O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The hash set stores up to n unique numbers from the input, taking O(n) space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "num_set = set(nums)",
        plainEnglishExplanation:
          "Converts the list `nums` into a set, deduplicating elements and enabling instant O(1) membership lookups.",
        exampleSnippet:
          "numbers = [3, 1, 2, 2]\ns = set(numbers)\nprint(s)",
        whyWeUseItHere:
          "Allows us to check whether adjacent numbers exist in O(1) time.",
      },
      {
        keywordOrMethod: "if num - 1 not in num_set:",
        plainEnglishExplanation:
          "`not in` checks if a value is absent from a set. If `num - 1` does NOT exist in the set, then `num` must be the beginning of a streak.",
        exampleSnippet:
          "s = {10, 11, 12}\nfor x in s:\n    if x - 1 not in s:\n        print('Start of streak:', x)",
        whyWeUseItHere:
          "This is the vital optimization: only counting from the start of a streak guarantees O(n) time.",
      },
      {
        keywordOrMethod: "while current + 1 in num_set:",
        plainEnglishExplanation:
          "A `while` loop that continues incrementing `current` as long as the next consecutive integer exists in the set.",
        exampleSnippet:
          "s = {1, 2, 3, 5}\nx = 1\nwhile x + 1 in s:\n    x += 1\nprint('Streak ended at:', x)",
        whyWeUseItHere:
          "Steps forward along the unbroken sequence to measure its length.",
      },
      {
        keywordOrMethod: "max(longest, streak)",
        plainEnglishExplanation:
          "`max(a, b)` returns whichever number is larger.",
        exampleSnippet:
          "longest = 3\nstreak = 5\nlongest = max(longest, streak)\nprint(longest)",
        whyWeUseItHere:
          "Keeps track of the maximum sequence length seen across all streaks.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: { nums: [100, 4, 200, 1, 3, 2] },
      focus: ["num_set", "longest", "streak", "num"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine dominoes numbered and scattered across a floor. You want to find the longest unbroken chain of numbers. If you pick up domino 3 and also see domino 2 on the floor, you don't start counting from 3—you know 3 is in the middle of some longer chain. You only start counting when you pick up a domino that has NO smaller neighbor (like 1). From there, you follow the chain: 1 → 2 → 3 → 4 until it stops. Because you only count from the true start of each chain, each domino is counted once.",
      edgeCases: [
        "An empty list `[]`: the longest sequence is length `0`.",
        "A single number `[42]`: the longest sequence is length `1`.",
        "Duplicates in list (e.g. `[1, 2, 0, 1]`): the set removes duplicates so repeated numbers don't disrupt sequence counting.",
        "Negative numbers bridging into positive (e.g. `[-2, -1, 0, 1]`): negative numbers transition smoothly across zero.",
      ],
      stepByStepWalkthrough: [
        "Convert `nums` into a set `num_set`.",
        "Initialize `longest = 0`.",
        "Loop over each `num` in `num_set`.",
        "Check `if num - 1 not in num_set:` to verify `num` is the beginning of a streak.",
        "If it is, set `current = num` and `streak = 1`.",
        "While `current + 1 in num_set`, increment `current += 1` and `streak += 1`.",
        "Update `longest = max(longest, streak)`.",
        "Return `longest`.",
      ],
    },
    hints: {
      conceptual:
        "If you have a set of all numbers, how can you know if a number is the first number of a consecutive sequence? Why should you ONLY count from the start?",
      structural:
        "Create `num_set = set(nums)`. For each `num in num_set`: check `if num - 1 not in num_set:`. If so, start `current = num`, `streak = 1`, and `while current + 1 in num_set: current += 1; streak += 1`. Update `longest = max(longest, streak)`.",
    },
    commonMistakes: [
      "Sorting first: `nums.sort()` takes O(n log n), violating the O(n) requirement.",
      "Starting a `while` loop for every number without checking `num - 1 not in num_set`. For an array like `[1, 2, 3, 4, 5]`, counting from 1, then from 2, then from 3... turns the algorithm into O(n²).",
    ],
    starterCode: `def longest_consecutive(nums: list[int]) -> int:
    # Return the length of the longest consecutive sequence in nums.
    # Must run in O(n) time.
    pass
`,
    optimalSolution: `def longest_consecutive(nums: list[int]) -> int:
    # num_set enables instant O(1) neighbor lookups
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # Only start counting if num is the beginning of a sequence
        if num - 1 not in num_set:
            current = num
            streak = 1

            # Count consecutive numbers forward
            while current + 1 in num_set:
                current += 1
                streak += 1

            # Update our longest streak record
            longest = max(longest, streak)

    return longest
`,
    bruteForceSolution: `def longest_consecutive(nums: list[int]) -> int:
    # Sorting takes O(n log n)
    if not nums:
        return 0

    sorted_nums = sorted(set(nums))
    longest = 1
    current = 1

    for i in range(1, len(sorted_nums)):
        if sorted_nums[i] == sorted_nums[i - 1] + 1:
            current += 1
            longest = max(longest, current)
        else:
            current = 1

    return longest
`,
    harness: { kind: "function", entry: "longest_consecutive" },
    testCases: [
      { input: { nums: [100, 4, 200, 1, 3, 2] }, expected: 4, description: "The longest consecutive sequence is [1, 2, 3, 4], which has length 4." },
      { input: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, expected: 9, description: "The sequence from 0 to 8 has length 9 (duplicates ignored)." },
      { input: { nums: [] }, expected: 0, description: "An empty list has sequence length 0." },
      { input: { nums: [10] }, expected: 1, description: "A single number has sequence length 1." },
      { input: { nums: [9, 1, 4, 7, 3, -1, 0, 5, 8, -2, 6] }, expected: 7, description: "Negative numbers into positive: longest streak is 7 (from 3 to 9)." },
      { input: { nums: [1, 2, 0, 1] }, expected: 3, description: "[0, 1, 2] has length 3." },
      { input: { nums: [5, 5, 5, 5] }, expected: 1 },
    ],
  },
];

export default problems;
