import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ valid-palindrome
  {
    id: "valid-palindrome",
    summary:
      "Given a string `s`, determine if it is a **palindrome** after converting all uppercase letters to lowercase and removing all non-alphanumeric characters (letters and numbers). A palindrome reads the same forwards and backwards. Return `True` if it is a palindrome, or `False` otherwise.",
    constraints: [
      "1 ≤ len(s) ≤ 200,000",
      "s consists only of printable ASCII characters",
    ],
    pattern: "Two pointers moving inward from both ends",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "The two pointers start at opposite ends of the string and move towards each other, skipping non-alphanumeric characters. Each character is inspected at most a constant number of times, giving O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We inspect characters directly in the given string using two integer pointers `l` and `r` without allocating any new strings or lists.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def is_palindrome(s: str) -> bool:",
        plainEnglishExplanation:
          "`def` defines a function named `is_palindrome`. `: str` means the input `s` is text, and `-> bool` means it returns a boolean (`True` or `False`). Python type hints are notes for humans and are not enforced at runtime.",
        exampleSnippet: "def is_positive(n: int) -> bool:\n    return n > 0\n\nprint(is_positive(5))\nprint(is_positive(-1))",
        whyWeUseItHere:
          "The automated test judge calls this function on different input strings and checks whether you return True or False.",
      },
      {
        keywordOrMethod: "s[l].isalnum()",
        plainEnglishExplanation:
          "`.isalnum()` returns `True` if the character is a letter (a-z, A-Z) or a number (0-9). It returns `False` for punctuation, spaces, and symbols.",
        exampleSnippet: "print('a'.isalnum())\nprint('9'.isalnum())\nprint(':'.isalnum())",
        whyWeUseItHere:
          "The problem asks us to ignore spaces and punctuation marks, comparing only alphanumeric characters.",
      },
      {
        keywordOrMethod: "s[l].lower()",
        plainEnglishExplanation:
          "`.lower()` turns any uppercase letter into its lowercase version. If the character is already lowercase or a number, it leaves it unchanged.",
        exampleSnippet: "print('P'.lower())\nprint('p'.lower())\nprint('4'.lower())",
        whyWeUseItHere:
          "Palindromes are case-insensitive: 'A' and 'a' must be treated as matching.",
      },
      {
        keywordOrMethod: "while l < r:",
        plainEnglishExplanation:
          "A `while` loop keeps running as long as its condition stays `True`. `l < r` ensures the left pointer stays strictly to the left of the right pointer.",
        exampleSnippet: "l = 0\nr = 4\nwhile l < r:\n    print(l, r)\n    l += 1\n    r -= 1",
        whyWeUseItHere:
          "Once `l` meets or crosses `r`, every pair of characters has been checked and verified.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { s: "A man, a plan, a canal: Panama" },
      pointers: { s: ["l", "r"] },
      focus: ["s", "l", "r"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine two people reading a banner from opposite ends at the same time: one starts at the left edge and walks right, while the other starts at the right edge and walks left. Whenever either person steps on a space, comma, or punctuation mark, they skip it and take another step. When both are standing on valid letters or digits, they read them aloud. If the letters don't match (ignoring capitalization), the banner is not a palindrome. If they keep matching until the two people meet in the center, the whole banner is confirmed as a valid palindrome.",
      edgeCases: [
        "A string with only punctuation or spaces (e.g. `' '` or `'.,'`): after skipping non-alphanumeric characters, the pointers cross immediately, correctly returning `True`.",
        "Single-character strings (e.g. `'a'`): always a palindrome since reading forwards and backwards is identical.",
        "Strings containing digits (e.g. `'0P'`): digits must match exactly; '0' and 'P' are not equal.",
      ],
      stepByStepWalkthrough: [
        "Initialize left pointer `l = 0` and right pointer `r = len(s) - 1`.",
        "While `l < r`, check if `s[l]` is not alphanumeric; if so, advance `l += 1`.",
        "Check if `s[r]` is not alphanumeric; if so, retreat `r -= 1`.",
        "Once both pointers land on alphanumeric characters, compare `s[l].lower()` with `s[r].lower()`.",
        "If they differ, return `False` immediately.",
        "If they match, step both pointers inward (`l += 1` and `r -= 1`) to check the next pair.",
        "If the loop finishes without finding any mismatch, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "Instead of building a new filtered and reversed string that takes extra memory, can you check characters directly in the original string using two pointers starting from the outer edges?",
      structural:
        "Initialize `l = 0` and `r = len(s) - 1`. Use a `while l < r:` loop. Inside, advance `l` past non-alphanumeric characters, retreat `r` past non-alphanumeric characters, and compare `s[l].lower()` with `s[r].lower()`.",
    },
    commonMistakes: [
      "Forgetting to check `l < r` inside the inner loops that skip non-alphanumeric characters, which can cause an `IndexError` when the string has no alphanumeric characters.",
      "Forgetting to convert characters to lowercase before comparing, causing `'A'` and `'a'` to wrongly be treated as different.",
      "Using `.isalpha()` instead of `.isalnum()`, which accidentally skips valid numeric digits like '0'-'9'.",
    ],
    starterCode: `def is_palindrome(s: str) -> bool:
    # Check if s is a palindrome considering only alphanumeric characters.
    # Tip: use two pointers moving inward from both ends of the string.
    pass
`,
    optimalSolution: `def is_palindrome(s: str) -> bool:
    # l starts at the first character, r starts at the last character
    l = 0
    r = len(s) - 1

    # Keep comparing characters until the two pointers meet in the middle
    while l < r:
        # Move the left pointer forward if it points to a non-alphanumeric character
        while l < r and not s[l].isalnum():
            l += 1

        # Move the right pointer backward if it points to a non-alphanumeric character
        while l < r and not s[r].isalnum():
            r -= 1

        # Compare the characters after converting both to lowercase
        if s[l].lower() != s[r].lower():
            return False

        # Move both pointers inward for the next comparison
        l += 1
        r -= 1

    # If all pairs matched, it is a valid palindrome
    return True
`,
    bruteForceSolution: `def is_palindrome(s: str) -> bool:
    # Build a list keeping only lowercase alphanumeric characters
    cleaned = []
    for ch in s:
        if ch.isalnum():
            cleaned.append(ch.lower())
    # Compare the cleaned list with its reversed version
    return cleaned == cleaned[::-1]
`,
    harness: { kind: "function", entry: "is_palindrome" },
    testCases: [
      {
        input: { s: "A man, a plan, a canal: Panama" },
        expected: true,
        description: "After removing non-alphanumeric characters and converting to lowercase, 'amanaplanacanalpanama' reads the same forwards and backwards.",
      },
      {
        input: { s: "race a car" },
        expected: false,
        description: "'raceacar' is not a palindrome because 'e' and 'a' do not match in the middle.",
      },
      {
        input: { s: " " },
        expected: true,
        description: "An empty string after removing non-alphanumeric characters is considered a valid palindrome.",
      },
      { input: { s: "0P" }, expected: false, description: "Character '0' does not match 'P'." },
      { input: { s: "a." }, expected: true },
      { input: { s: "ab_a" }, expected: true },
      { input: { s: "No 'x' in Nixon" }, expected: true },
      { input: { s: "12321" }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ two-sum-ii-input-array-is-sorted
  {
    id: "two-sum-ii-input-array-is-sorted",
    summary:
      "Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers that add up to a specific `target`. Return their 1-based indices `[index1, index2]` where `1 <= index1 < index2 <= len(numbers)`. There is exactly one valid solution, and you may not use the same element twice.",
    constraints: [
      "2 ≤ len(numbers) ≤ 30,000",
      "numbers is sorted in non-decreasing order",
      "-1,000 ≤ numbers[i] ≤ 1,000",
      "-1,000 ≤ target ≤ 1,000",
      "Exactly one valid answer exists",
    ],
    pattern: "Two pointers from opposite ends shrinking toward the target sum",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force tries every pair in O(n²) time. With two pointers starting at the two ends, each step either advances `l` or retreats `r`. Since the pointers never cross or reverse direction, we make at most n comparisons, giving O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep two integer pointers `l` and `r` and a sum variable, using O(1) extra space without any hash tables.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def two_sum(numbers: list[int], target: int) -> list[int]:",
        plainEnglishExplanation:
          "`def` defines a function taking a list of whole numbers `numbers` and an integer `target`, returning a list of two integer indices.",
        exampleSnippet: "def pair(nums: list[int]) -> list[int]:\n    return [nums[0], nums[1]]\n\nprint(pair([10, 20]))",
        whyWeUseItHere:
          "The test harness calls this function with different sorted number lists and checks your returned index list.",
      },
      {
        keywordOrMethod: "l = 0; r = len(numbers) - 1",
        plainEnglishExplanation:
          "`l = 0` points to the smallest number (first index), and `r = len(numbers) - 1` points to the largest number (last index).",
        exampleSnippet: "nums = [2, 7, 11, 15]\nl = 0\nr = len(nums) - 1\nprint(nums[l], nums[r])",
        whyWeUseItHere:
          "Because the array is already sorted, the two extreme ends represent the smallest and largest available values.",
      },
      {
        keywordOrMethod: "current_sum = numbers[l] + numbers[r]",
        plainEnglishExplanation:
          "Adds the numbers at the current left and right pointers together.",
        exampleSnippet: "nums = [2, 7, 11]\nprint(nums[0] + nums[2])",
        whyWeUseItHere:
          "Comparing this sum to `target` tells us whether we need a larger sum (move `l` right) or a smaller sum (move `r` left).",
      },
      {
        keywordOrMethod: "return [l + 1, r + 1]",
        plainEnglishExplanation:
          "Python lists are 0-indexed (positions start at 0), but this problem requires **1-indexed** answers. Adding 1 to each index converts `0` into `1`, `1` into `2`, and so on.",
        exampleSnippet: "idx = 0\nprint([idx + 1, idx + 2])",
        whyWeUseItHere:
          "The problem explicitly states indices are 1-based (`1 <= index1 < index2 <= len(numbers)`).",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { numbers: [2, 7, 11, 15], target: 9 },
      pointers: { numbers: ["l", "r"] },
      focus: ["numbers", "l", "r", "current_sum"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine numbers lined up on a scale from smallest to largest. You put a finger on the smallest number (`l`) and a finger on the largest number (`r`). If their sum is smaller than `target`, the ONLY way to increase the sum is to slide your left finger to a bigger number (`l += 1`). If their sum is larger than `target`, the ONLY way to decrease the sum is to slide your right finger to a smaller number (`r -= 1`). You can never miss the answer because at every step you safely discard a number that could never pair with any remaining candidate.",
      edgeCases: [
        "Negative numbers: adding negative numbers works the same way (e.g. `-1 + 0 = -1`).",
        "Two identical values that add up to target: e.g. `[1, 2, 2, 4]` with target 4 returns positions `[2, 3]`.",
        "Target pair is at the very ends of the array: `l` and `r` match on the very first check.",
      ],
      stepByStepWalkthrough: [
        "Place left pointer `l = 0` and right pointer `r = len(numbers) - 1`.",
        "While `l < r`, calculate `current_sum = numbers[l] + numbers[r]`.",
        "If `current_sum == target`, return `[l + 1, r + 1]` to account for 1-based indexing.",
        "If `current_sum < target`, the sum is too small: increment `l += 1` to get a larger value.",
        "If `current_sum > target`, the sum is too large: decrement `r -= 1` to get a smaller value.",
      ],
    },
    hints: {
      conceptual:
        "Because the array is already sorted, what does the sum of the smallest and largest elements tell you? If it is too small, which number could never be part of any valid pair?",
      structural:
        "Set `l = 0` and `r = len(numbers) - 1`. Loop `while l < r:`. Compute `numbers[l] + numbers[r]`. If equal to target, return `[l + 1, r + 1]`. If smaller, `l += 1`. If larger, `r -= 1`.",
    },
    commonMistakes: [
      "Returning 0-indexed positions `[l, r]` instead of 1-indexed positions `[l + 1, r + 1]`.",
      "Using a hash map: while it runs in O(n) time, it takes O(n) extra space, missing the benefit of the sorted order which allows O(1) space.",
      "Moving both pointers at the same time when the sum doesn't match, which might skip over the correct pair.",
    ],
    starterCode: `def two_sum(numbers: list[int], target: int) -> list[int]:
    # Return 1-indexed positions of two numbers summing to target.
    # Tip: numbers is sorted, so two pointers from both ends can find the pair.
    pass
`,
    optimalSolution: `def two_sum(numbers: list[int], target: int) -> list[int]:
    # l starts at the smallest number, r starts at the largest number
    l = 0
    r = len(numbers) - 1

    # Shrink the window until the target sum is found
    while l < r:
        # Calculate the sum of the numbers at the two pointers
        current_sum = numbers[l] + numbers[r]

        # Check if the current sum matches target
        if current_sum == target:
            # Return 1-based indices as required
            return [l + 1, r + 1]
        elif current_sum < target:
            # Sum is too small: move left pointer forward to increase the sum
            l += 1
        else:
            # Sum is too large: move right pointer backward to decrease the sum
            r -= 1

    # The problem guarantees exactly one solution exists
    return []
`,
    bruteForceSolution: `def two_sum(numbers: list[int], target: int) -> list[int]:
    # Check every possible pair
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]
    return []
`,
    harness: { kind: "function", entry: "two_sum" },
    testCases: [
      {
        input: { numbers: [2, 7, 11, 15], target: 9 },
        expected: [1, 2],
        description: "The sum of 2 and 7 is 9. In 1-based indexing, their positions are 1 and 2.",
      },
      {
        input: { numbers: [2, 3, 4], target: 6 },
        expected: [1, 3],
        description: "2 + 4 = 6. In 1-based indexing, positions are 1 and 3.",
      },
      {
        input: { numbers: [-1, 0], target: -1 },
        expected: [1, 2],
        description: "Works with negative numbers: -1 + 0 = -1. Positions are 1 and 2.",
      },
      { input: { numbers: [1, 2, 3, 4, 4, 9, 56, 90], target: 8 }, expected: [4, 5] },
      { input: { numbers: [5, 25, 75], target: 100 }, expected: [2, 3] },
      { input: { numbers: [-5, -3, 0, 2, 4, 7], target: 1 }, expected: [2, 5] },
      { input: { numbers: [-10, -8, -2, 1, 2, 5], target: -7 }, expected: [2, 4] },
    ],
  },

  // ------------------------------------------------------------------ 3sum
  {
    id: "3sum",
    summary:
      "Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets, and the triplets can be returned in any order.",
    constraints: [
      "3 ≤ len(nums) ≤ 3,000",
      "-100,000 ≤ nums[i] ≤ 100,000",
    ],
    pattern: "Sort the array, fix one number, then run Two Sum II with two pointers",
    timeComplexity: {
      bruteForce: "O(n³)",
      optimal: "O(n²)",
      explanation:
        "Sorting `nums` takes O(n log n). Then we iterate through `nums` with an outer loop running n times, and for each fixed number we run a two-pointer scan taking O(n) time. Total time is O(n log n + n²) = O(n²).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Ignoring the output list that holds the triplets, we only keep a few pointer variables. In Python, `nums.sort()` takes O(n) space internally, but no additional data structures are created.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "nums.sort()",
        plainEnglishExplanation:
          "`.sort()` rearranges a list in-place from smallest to largest value. It changes `nums` directly and returns `None`.",
        exampleSnippet: "vals = [5, 1, 4, 2]\nvals.sort()\nprint(vals)",
        whyWeUseItHere:
          "Sorting groups identical numbers together (making it easy to skip duplicates) and lets us use two pointers to find pairs summing to a target.",
      },
      {
        keywordOrMethod: "continue",
        plainEnglishExplanation:
          "`continue` immediately skips the rest of the current loop iteration and moves to the next iteration.",
        exampleSnippet: "for i in range(4):\n    if i == 2:\n        continue\n    print(i)",
        whyWeUseItHere:
          "When `nums[i] == nums[i - 1]`, we skip `i` so we don't produce duplicate triplets for the same first number.",
      },
      {
        keywordOrMethod: "res.append([nums[i], nums[l], nums[r]])",
        plainEnglishExplanation:
          "`.append()` adds a new item to the end of a list. Here we append a 3-element list `[a, b, c]` to our answer list `res`.",
        exampleSnippet: "triplets = []\ntriplets.append([1, 2, 3])\nprint(triplets)",
        whyWeUseItHere:
          "When the three numbers add up to 0, we record that triplet in our final result.",
      },
      {
        keywordOrMethod: "while l < r and nums[l] == nums[l - 1]: l += 1",
        plainEnglishExplanation:
          "Advances pointer `l` forward as long as the value at `l` is the same as the previous one we just used.",
        exampleSnippet: "nums = [1, 2, 2, 3]\nl = 2\nwhile l < len(nums) and nums[l] == nums[l - 1]:\n    l += 1\nprint(l)",
        whyWeUseItHere:
          "After finding a valid triplet, skipping duplicate numbers at pointer `l` ensures we don't add the exact same triplet twice.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [-1, 0, 1, 2, -1, -4] },
      pointers: { nums: ["i", "l", "r"] },
      focus: ["nums", "i", "l", "r", "res", "total"],
    },
    intuitiveExplanation: {
      intuition:
        "Finding three numbers that add to 0 sounds much harder than finding two. But notice: if you pick and fix the first number `nums[i]`, the problem simplifies to: 'find two OTHER numbers that add up to `-nums[i]`'. That is just Two Sum II! By sorting the array first, identical values are clustered together, allowing us to cleanly skip duplicate numbers both for the first choice and for the two pointers. This guarantees every triplet in our result is completely unique.",
      edgeCases: [
        "All zeros `[0, 0, 0, 0]`: only one unique triplet `[0, 0, 0]` should be returned, not multiple identical copies.",
        "No triplets sum to 0 (e.g. `[0, 1, 1]`): correctly returns an empty list `[]`.",
        "Multiple distinct triplets containing repeated values: e.g. `[-2, 0, 1, 1, 2]` produces both `[-2, 0, 2]` and `[-2, 1, 1]`.",
      ],
      stepByStepWalkthrough: [
        "Sort `nums` in ascending order.",
        "Iterate `i` from 0 to `len(nums) - 1`. If `nums[i] > 0`, break early (three positive numbers can never add up to 0).",
        "If `i > 0` and `nums[i] == nums[i - 1]`, skip with `continue` to avoid duplicate triplets.",
        "Set `l = i + 1` and `r = len(nums) - 1`.",
        "While `l < r`, calculate `total = nums[i] + nums[l] + nums[r]`.",
        "If `total < 0`, the sum is too small: advance `l += 1`.",
        "If `total > 0`, the sum is too large: retreat `r -= 1`.",
        "If `total == 0`, append `[nums[i], nums[l], nums[r]]` to `res`. Move both `l += 1` and `r -= 1`, then advance `l` past any duplicates with `while l < r and nums[l] == nums[l - 1]: l += 1`.",
        "Return `res`.",
      ],
    },
    hints: {
      conceptual:
        "If you sort the list and fix one number as the first element of the triplet, what does the rest of the problem become? Have you solved finding two numbers that sum to a target before?",
      structural:
        "Sort `nums`. Loop `i` through the list. For each `nums[i]`, use two pointers `l = i + 1` and `r = len(nums) - 1` to search for pairs summing to `-nums[i]`. Skip duplicate values of `nums[i]` and `nums[l]`.",
    },
    commonMistakes: [
      "Not skipping duplicates, resulting in repeated identical triplets like `[[-1, 0, 1], [-1, 0, 1]]`.",
      "Checking duplicates with `nums[i] == nums[i + 1]` before processing `i`, which skips the first occurrence and breaks valid triplets like `[-1, -1, 2]`.",
      "Forgetting to increment `l` or decrement `r` after finding a matching triplet, causing an infinite while loop.",
    ],
    starterCode: `def three_sum(nums: list[int]) -> list[list[int]]:
    # Return all unique triplets that add up to 0.
    # Tip: sort the list first, then fix one element and use two pointers.
    pass
`,
    optimalSolution: `def three_sum(nums: list[int]) -> list[list[int]]:
    # Sort the array so we can use two pointers and easily skip duplicates
    nums.sort()
    res = []

    # Iterate through the array, fixing each element as the first of the triplet
    for i in range(len(nums)):
        # If the smallest number is positive, three numbers cannot sum to 0
        if nums[i] > 0:
            break

        # Skip duplicate values for the first element to avoid repeated triplets
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        # Two pointers for the remaining two elements
        l = i + 1
        r = len(nums) - 1

        # Search for pairs that sum to -nums[i]
        while l < r:
            total = nums[i] + nums[l] + nums[r]

            if total < 0:
                # Sum is too small: move left pointer forward
                l += 1
            elif total > 0:
                # Sum is too large: move right pointer backward
                r -= 1
            else:
                # Found a valid triplet summing to 0
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1

                # Skip duplicate values for the second element
                while l < r and nums[l] == nums[l - 1]:
                    l += 1

    return res
`,
    bruteForceSolution: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = set()
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    res.add((nums[i], nums[j], nums[k]))
    return [list(t) for t in res]
`,
    harness: { kind: "function", entry: "three_sum", compare: "unordered-nested" },
    testCases: [
      {
        input: { nums: [-1, 0, 1, 2, -1, -4] },
        expected: [[-1, -1, 2], [-1, 0, 1]],
        description: "Triplets [-1, 0, 1] and [-1, -1, 2] both sum to 0. Notice -1 is used twice in the second triplet from different indices.",
      },
      {
        input: { nums: [0, 1, 1] },
        expected: [],
        description: "No three numbers in the list add up to 0.",
      },
      {
        input: { nums: [0, 0, 0] },
        expected: [[0, 0, 0]],
        description: "0 + 0 + 0 = 0 is the only unique triplet.",
      },
      {
        input: { nums: [0, 0, 0, 0] },
        expected: [[0, 0, 0]],
        description: "Only one unique triplet [0, 0, 0] should be returned without duplicates.",
      },
      { input: { nums: [-2, 0, 1, 1, 2] }, expected: [[-2, 0, 2], [-2, 1, 1]] },
      { input: { nums: [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6] }, expected: [[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]] },
      { input: { nums: [1, 2, -2, -1] }, expected: [] },
    ],
  },

  // ------------------------------------------------------------------ container-with-most-water
  {
    id: "container-with-most-water",
    summary:
      "You are given an integer list `height` of length `n`. There are `n` vertical lines drawn where the line at index `i` has height `height[i]`. Choose two lines that, together with the horizontal x-axis, form a container that holds the most water. Return the **maximum area** of water the container can store (you may not slant the container).",
    constraints: [
      "2 ≤ len(height) ≤ 100,000",
      "0 ≤ height[i] ≤ 10,000",
    ],
    pattern: "Two pointers starting at the outermost boundaries, moving the shorter line inward",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force checks all pairs of lines in O(n²) time. The two-pointer approach starts at the two ends and moves one pointer inward on each step. With at most n steps and O(1) math per step, the total time is O(n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep a few scalar variables (`l`, `r`, `max_water`, `width`, `current_area`), using constant O(1) extra space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "min(height[l], height[r])",
        plainEnglishExplanation:
          "`min(a, b)` returns whichever number is smaller.",
        exampleSnippet: "print(min(8, 7))\nprint(min(3, 9))",
        whyWeUseItHere:
          "The water height is limited by the shorter of the two walls; water would spill over if filled higher.",
      },
      {
        keywordOrMethod: "width = r - l",
        plainEnglishExplanation:
          "Subtracts the left index `l` from the right index `r` to find the horizontal distance between the two walls.",
        exampleSnippet: "l = 1\nr = 8\nprint(r - l)",
        whyWeUseItHere:
          "The area of a rectangle is width multiplied by height.",
      },
      {
        keywordOrMethod: "max_water = max(max_water, current_area)",
        plainEnglishExplanation:
          "`max(a, b)` returns whichever number is larger. Assigning it back to `max_water` keeps the highest area seen so far.",
        exampleSnippet: "best = 10\nprint(max(best, 15))\nprint(max(best, 8))",
        whyWeUseItHere:
          "We want to track the overall maximum area across all tested container configurations.",
      },
      {
        keywordOrMethod: "def max_area(height: list[int]) -> int:",
        plainEnglishExplanation:
          "`def` defines a function taking a list of integers `height` and returning an integer area.",
        exampleSnippet: "def double_max(vals: list[int]) -> int:\n    return max(vals) * 2\n\nprint(double_max([1, 4, 3]))",
        whyWeUseItHere:
          "The required function entry point called by the test runner.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
      pointers: { height: ["l", "r"] },
      focus: ["height", "l", "r", "max_water", "current_area"],
    },
    intuitiveExplanation: {
      intuition:
        "Start as wide as possible: one wall at the far left (`l = 0`) and one at the far right (`r = len(height) - 1`). The water volume is `width × min(height[l], height[r])`. As we move the walls closer together, the width *always shrinks*. The only hope of getting a larger area is finding a much taller wall! If you move the taller wall inward, the new container is both narrower AND capped by the same or even shorter wall, so it can NEVER beat your current area. But moving the SHORTER wall inward might discover a much taller wall that overcomes the lost width. Therefore, you should always discard the shorter wall!",
      edgeCases: [
        "Only two lines: there is only one possible container formed by the two lines.",
        "All lines have identical height (e.g. `[4, 4, 4, 4]`): the widest pair (index 0 and index 3) gives the maximum area.",
        "A pair of very tall lines close together vs moderate lines far apart: the two-pointer scan correctly considers both.",
      ],
      stepByStepWalkthrough: [
        "Initialize `l = 0` and `r = len(height) - 1`.",
        "Initialize `max_water = 0`.",
        "While `l < r`, calculate `width = r - l`.",
        "Calculate `current_area = width * min(height[l], height[r])`.",
        "Update `max_water = max(max_water, current_area)`.",
        "If `height[l] < height[r]`, move `l += 1` to search for a taller left wall.",
        "Otherwise, move `r -= 1` to search for a taller right wall.",
        "Return `max_water` once the pointers meet.",
      ],
    },
    hints: {
      conceptual:
        "Start with the widest container using pointers at the two ends. If you must move one pointer inward, which one should you move: the taller one or the shorter one? Can moving the taller one ever increase the volume?",
      structural:
        "Set `l = 0`, `r = len(height) - 1`, and `max_water = 0`. In a `while l < r:` loop, compute `min(height[l], height[r]) * (r - l)`. Advance `l` if `height[l] < height[r]`, else decrement `r`.",
    },
    commonMistakes: [
      "Moving the taller line inward instead of the shorter line: since width decreases, area can only increase if the bottleneck (the shorter line) is improved.",
      "Moving both pointers inward simultaneously: you might step over the optimal line configuration.",
      "Using a nested loop (brute force): with n up to 100,000, an O(n²) solution will exceed the time limit.",
    ],
    starterCode: `def max_area(height: list[int]) -> int:
    # Return the maximum area of water a container can hold.
    # Tip: start wide with two pointers and always move the shorter line.
    pass
`,
    optimalSolution: `def max_area(height: list[int]) -> int:
    # l starts at the leftmost line, r starts at the rightmost line
    l = 0
    r = len(height) - 1
    max_water = 0

    # Narrow the window until the two pointers meet
    while l < r:
        # Distance between the two lines
        width = r - l

        # Water level is limited by the shorter line
        current_area = width * min(height[l], height[r])

        # Record the maximum area found so far
        max_water = max(max_water, current_area)

        # Move the pointer pointing to the shorter line inward
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1

    return max_water
`,
    bruteForceSolution: `def max_area(height: list[int]) -> int:
    max_water = 0
    n = len(height)
    for i in range(n):
        for j in range(i + 1, n):
            area = (j - i) * min(height[i], height[j])
            max_water = max(max_water, area)
    return max_water
`,
    harness: { kind: "function", entry: "max_area" },
    testCases: [
      {
        input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
        expected: 49,
        description: "The lines at index 1 (height 8) and index 8 (height 7) give width 7 and height min(8, 7) = 7, giving area 7 * 7 = 49.",
      },
      {
        input: { height: [1, 1] },
        expected: 1,
        description: "With only two lines of height 1, area is (1 - 0) * min(1, 1) = 1.",
      },
      {
        input: { height: [4, 3, 2, 1, 4] },
        expected: 16,
        description: "First and last lines both have height 4 with width 4: 4 * 4 = 16.",
      },
      { input: { height: [1, 2, 1] }, expected: 2 },
      { input: { height: [2, 3, 10, 5, 7, 8, 9] }, expected: 36 },
      { input: { height: [1, 2, 4, 3] }, expected: 4 },
      { input: { height: [1, 1000, 1000, 1] }, expected: 1000 },
    ],
  },

  // ------------------------------------------------------------------ trapping-rain-water
  {
    id: "trapping-rain-water",
    summary:
      "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much rainwater can be trapped between the bars after raining.",
    constraints: [
      "1 ≤ len(height) ≤ 20,000",
      "0 ≤ height[i] ≤ 100,000",
    ],
    pattern: "Two pointers tracking the running maximum heights from left and right",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "The two pointers start at opposite ends and move inward until they meet. Each bar is visited and processed exactly once in O(1) time, so total time is O(n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep scalar variables (`l`, `r`, `left_max`, `right_max`, `water`), using constant O(1) extra space without any extra prefix/suffix arrays.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "left_max = max(left_max, height[l])",
        plainEnglishExplanation:
          "Updates `left_max` to be the tallest bar seen so far on the left side of the current position.",
        exampleSnippet: "l_max = 2\nval = 3\nl_max = max(l_max, val)\nprint(l_max)",
        whyWeUseItHere:
          "Water trapped above bar `l` is determined by the minimum of the highest wall to its left and right minus `height[l]`.",
      },
      {
        keywordOrMethod: "water += left_max - height[l]",
        plainEnglishExplanation:
          "`+=` adds to the running total. It computes the water depth above bar `l` and adds it to `water`.",
        exampleSnippet: "total = 0\ntrapped = 2\ntotal += trapped\nprint(total)",
        whyWeUseItHere:
          "Each bar holds `left_max - height[l]` units of water when `left_max < right_max`.",
      },
      {
        keywordOrMethod: "while l < r:",
        plainEnglishExplanation:
          "A `while` loop that continues until the left and right pointers meet at the highest peak.",
        exampleSnippet: "l = 0\nr = 3\nwhile l < r:\n    print(l, r)\n    l += 1",
        whyWeUseItHere:
          "We process bars moving inward from the boundaries towards the center peak.",
      },
      {
        keywordOrMethod: "def trap(height: list[int]) -> int:",
        plainEnglishExplanation:
          "`def` defines a function taking a list of bar heights and returning the integer count of trapped rainwater.",
        exampleSnippet: "def count_items(items: list[int]) -> int:\n    return len(items)\n\nprint(count_items([1, 2, 3]))",
        whyWeUseItHere:
          "Entry point called by the test runner.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
      pointers: { height: ["l", "r"] },
      focus: ["height", "l", "r", "left_max", "right_max", "water"],
    },
    intuitiveExplanation: {
      intuition:
        "How much water sits on top of any single bar? Water can only rise as high as the shorter of the two tallest walls on its sides: `min(tallest_wall_to_left, tallest_wall_to_right)`. If we keep track of `left_max` and `right_max` with two pointers `l` and `r`, whenever `left_max < right_max`, we know for sure that `left_max` is the true bottleneck for bar `l` (even if there is an even taller wall somewhere far to the right, `left_max` is already strictly smaller than `right_max`). So bar `l` can trap `left_max - height[l]` water immediately! Symmetrically, when `right_max <= left_max`, `right_max` is the bottleneck for bar `r`.",
      edgeCases: [
        "Fewer than 3 bars: impossible to trap water (needs at least a left wall, a valley, and a right wall), returns 0.",
        "Strictly increasing or strictly decreasing heights (staircase): water flows off the edge, returns 0.",
        "All bars have the same height: flat surface with no valleys, returns 0.",
      ],
      stepByStepWalkthrough: [
        "If `height` is empty, return 0.",
        "Initialize `l = 0`, `r = len(height) - 1`.",
        "Initialize `left_max = height[l]`, `right_max = height[r]`, and `water = 0`.",
        "While `l < r`:",
        "If `left_max < right_max`, increment `l += 1`, update `left_max = max(left_max, height[l])`, and add `left_max - height[l]` to `water`.",
        "Otherwise, decrement `r -= 1`, update `right_max = max(right_max, height[r])`, and add `right_max - height[r]` to `water`.",
        "Return `water`.",
      ],
    },
    hints: {
      conceptual:
        "How much water sits on top of each individual column? It depends on the tallest bar to its left and the tallest bar to its right. Can you track these running maximums from both ends without storing full prefix arrays?",
      structural:
        "Use two pointers `l = 0` and `r = len(height) - 1`, tracking `left_max` and `right_max`. If `left_max < right_max`, advance `l` and add `left_max - height[l]` to water. Otherwise, retreat `r` and add `right_max - height[r]`.",
    },
    commonMistakes: [
      "Trying to calculate water by whole horizontal containers instead of column by column.",
      "Adding water before updating `left_max`, which could add a negative number if the current bar is a new peak.",
      "Using extra O(n) arrays for prefix-max and suffix-max: while O(n) time, two pointers does it in O(1) space.",
    ],
    starterCode: `def trap(height: list[int]) -> int:
    # Return the total volume of rainwater trapped between the bars.
    # Tip: two pointers can track the maximum heights seen from each side.
    pass
`,
    optimalSolution: `def trap(height: list[int]) -> int:
    # If there are fewer than 3 bars, no water can be trapped
    if not height:
        return 0

    l = 0
    r = len(height) - 1
    left_max = height[l]
    right_max = height[r]
    water = 0

    # Move inward from both boundaries until pointers meet
    while l < r:
        # The smaller boundary determines the water level
        if left_max < right_max:
            l += 1
            # Update the highest wall seen from the left
            left_max = max(left_max, height[l])
            # Water trapped above bar l is the bottleneck minus bar height
            water += left_max - height[l]
        else:
            r -= 1
            # Update the highest wall seen from the right
            right_max = max(right_max, height[r])
            # Water trapped above bar r is the bottleneck minus bar height
            water += right_max - height[r]

    return water
`,
    bruteForceSolution: `def trap(height: list[int]) -> int:
    water = 0
    n = len(height)
    for i in range(n):
        left_max = max(height[:i + 1])
        right_max = max(height[i:])
        water += min(left_max, right_max) - height[i]
    return water
`,
    harness: { kind: "function", entry: "trap" },
    testCases: [
      {
        input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
        expected: 6,
        description: "6 units of rain water are trapped in the valleys between the bars.",
      },
      {
        input: { height: [4, 2, 0, 3, 2, 5] },
        expected: 9,
        description: "Water trapped above each column: 0 + 2 + 4 + 1 + 2 + 0 = 9 units.",
      },
      {
        input: { height: [] },
        expected: 0,
        description: "No bars means 0 trapped water.",
      },
      {
        input: { height: [3, 4, 3] },
        expected: 0,
        description: "A single peak with sloping sides traps no water.",
      },
      { input: { height: [5, 4, 1, 2] }, expected: 1 },
      { input: { height: [2, 0, 2] }, expected: 2 },
      { input: { height: [5, 2, 1, 2, 1, 5] }, expected: 14 },
    ],
  },
];

export default problems;
