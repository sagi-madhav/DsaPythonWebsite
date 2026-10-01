import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  {
    id: "single-number",
    summary:
      "Given a non-empty list of integers `nums`, every element appears **twice** except for one unique element which appears only once. Find and return that unique single element. You must implement a solution with linear runtime complexity and use only constant extra space.",
    constraints: [
      "1 ≤ nums.length ≤ 30,000",
      "-30,000 ≤ nums[i] ≤ 30,000",
      "Each element in the array appears twice except for one element which appears once.",
    ],
    pattern: "Bitwise XOR cancellation",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "We iterate through the n elements of nums once, performing a single O(1) bitwise XOR operation at each step.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a single integer accumulator variable `result` is used.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "a ^ b",
        plainEnglishExplanation:
          "The bitwise XOR (exclusive OR) operator. Comparing two identical bits produces 0 (`1 ^ 1 = 0`, `0 ^ 0 = 0`), and comparing different bits produces 1 (`1 ^ 0 = 1`).",
        exampleSnippet:
          "print(5 ^ 5)  # 0: identical numbers cancel out\nprint(5 ^ 0)  # 5: XOR with 0 preserves value",
        whyWeUseItHere:
          "Because `x ^ x == 0`, XORing duplicate numbers together cancels them out completely.",
      },
      {
        keywordOrMethod: "result ^= num",
        plainEnglishExplanation:
          "In-place XOR assignment. Computes `result = result ^ num` and reassigns to `result`.",
        exampleSnippet:
          "res = 0\nres ^= 4\nres ^= 2\nres ^= 4\nprint(res)  # 4 canceled with 4, leaving 2",
        whyWeUseItHere:
          "Accumulates the XOR sum as we walk through the list.",
      },
      {
        keywordOrMethod: "for i, num in enumerate(nums):",
        plainEnglishExplanation:
          "`enumerate` provides both the index `i` and the value `num` during loop iteration.",
        exampleSnippet:
          "for i, v in enumerate([10, 20]):\n    print(i, v)",
        whyWeUseItHere:
          "Allows the visualizer to show an active pointer over the array while looping.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [2, 2, 1] },
      pointers: { nums: ["i"] },
      focus: ["result", "num"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a light switch that toggles on and off. If you flip it twice, it ends up back where it started. Bitwise XOR is the binary equivalent of that toggle! Any number XORed with itself cancels out to 0 (`a ^ a = 0`), and any number XORed with 0 stays itself (`a ^ 0 = a`). Because XOR is both commutative and associative (order does not matter), all the paired duplicate numbers annihilate each other, leaving only the lonely unique number standing!",
      edgeCases: [
        "Single-element array [1]: 0 ^ 1 = 1, handles correctly.",
        "Single number at the beginning or end of nums: order does not affect XOR.",
        "Negative numbers: two's complement binary representation handles negative numbers identically.",
      ],
      stepByStepWalkthrough: [
        "Initialize result = 0 (the identity element for XOR).",
        "Iterate through each number `num` in `nums`.",
        "Compute `result ^= num`.",
        "All duplicate values cancel in pairs (num ^ num = 0).",
        "Return `result`, which now holds the single unique value.",
      ],
    },
    hints: {
      conceptual:
        "Every number appears twice except one. Is there a mathematical operation where doing it twice cancels out completely? What happens when you XOR a number with itself?",
      structural:
        "Initialize `result = 0`. Loop `for i, num in enumerate(nums):` and update `result ^= num`. Return `result`.",
    },
    commonMistakes: [
      "Using a hash set or dictionary: while O(n) time, it uses O(n) auxiliary space, violating the O(1) space constraint.",
      "Using `nums.count(x)` inside a loop: it scans the list repeatedly, causing O(n²) time complexity.",
      "Starting with `result = 1` instead of `0`: 0 is the identity element for XOR (`0 ^ x = x`).",
    ],
    starterCode: `def single_number(nums: list[int]) -> int:
    # Find the element that appears only once in nums.
    # Aim for O(n) time and O(1) space.
    pass
`,
    optimalSolution: `def single_number(nums: list[int]) -> int:
    result = 0

    # XOR each number into result
    # Duplicate pairs cancel out because x ^ x == 0 and x ^ 0 == x
    for i, num in enumerate(nums):
        result ^= num

    return result
`,
    bruteForceSolution: `def single_number(nums: list[int]) -> int:
    # Hash set approach: add on first sight, remove on second
    seen = set()
    for num in nums:
        if num in seen:
            seen.remove(num)
        else:
            seen.add(num)
    return seen.pop()
`,
    harness: { kind: "function", entry: "single_number" },
    testCases: [
      {
        input: { nums: [2, 2, 1] },
        expected: 1,
        description: "2 cancels with 2, leaving 1.",
      },
      {
        input: { nums: [4, 1, 2, 1, 2] },
        expected: 4,
        description: "1s cancel and 2s cancel, leaving 4.",
      },
      {
        input: { nums: [1] },
        expected: 1,
        description: "Single-element list returns that element.",
      },
      {
        input: { nums: [-1, -1, -2] },
        expected: -2,
        description: "Negative numbers work identically with bitwise XOR.",
      },
      {
        input: { nums: [7, 3, 5, 3, 7] },
        expected: 5,
      },
      {
        input: { nums: [0, 1, 0] },
        expected: 1,
      },
      {
        input: { nums: [99, 100, 99] },
        expected: 100,
      },
    ],
  },
  {
    id: "number-of-1-bits",
    summary:
      "Given a positive integer `n`, write a function that returns the number of **set bits** (also known as the Hamming weight) in its binary representation.",
    constraints: ["1 ≤ n ≤ 2^31 - 1"],
    pattern: "Brian Kernighan's algorithm (n & (n - 1) clears lowest set bit)",
    timeComplexity: {
      bruteForce: "O(32) = O(1)",
      optimal: "O(k) where k is the number of 1-bits (at most 32)",
      explanation:
        "Brian Kernighan's algorithm drops directly to each 1-bit, clearing one set bit per loop iteration. The loop runs exactly as many times as there are 1s (at most 32 iterations).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a single integer counter `count` is stored.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "n & (n - 1)",
        plainEnglishExplanation:
          "Subtracting 1 flips the lowest set bit (and all trailing 0s). ANDing `n` with `n - 1` clears that lowest set bit to 0 in a single operation.",
        exampleSnippet:
          "n = 12  # binary 1100\nprint(bin(n & (n - 1)))  # binary 1000",
        whyWeUseItHere:
          "Clears set bits directly, skipping over all the zero bits in between.",
      },
      {
        keywordOrMethod: "while n > 0:",
        plainEnglishExplanation:
          "Runs as long as there is at least one set bit remaining in `n`.",
        exampleSnippet:
          "val = 4\nwhile val > 0:\n    print(val)\n    val //= 2",
        whyWeUseItHere:
          "Terminates immediately once all 1-bits have been cleared.",
      },
      {
        keywordOrMethod: "count += 1",
        plainEnglishExplanation:
          "Increments the counter variable by 1.",
        exampleSnippet:
          "c = 0\nc += 1\nprint(c)",
        whyWeUseItHere:
          "Records that another 1-bit was found and cleared.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { n: 11 },
      focus: ["count", "n"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a line of standing dominoes where only some represent 1s. When you subtract 1 from an integer, the lowest 1-bit flips to 0, and all the trailing 0s flip to 1s (for example, `1100 - 1 = 1011`). When you take `n & (n - 1)`, that lowest 1-bit and everything to its right becomes 0! This snuffs out the lowest 1-bit like blowing out a candle, letting us count only the 1-bits while completely ignoring all the 0s.",
      edgeCases: [
        "Power of two (e.g. 16 = 10000 in binary): has exactly one set bit, loop runs once.",
        "All ones (e.g. 7 = 111 in binary): loop runs 3 times.",
        "Alternating bits (e.g. 101010 in binary): skips 0s efficiently.",
      ],
      stepByStepWalkthrough: [
        "Initialize count = 0.",
        "While n > 0:",
        "Perform `n &= n - 1` to clear the lowest set bit.",
        "Increment count += 1.",
        "Return count.",
      ],
    },
    hints: {
      conceptual:
        "Can you count the 1-bits without checking all 32 positions? What happens algebraically to the binary representation of a number when you subtract 1?",
      structural:
        "Run `while n > 0:`. In each iteration, use `n &= n - 1` to clear the lowest set bit and add 1 to `count`. Return `count`.",
    },
    commonMistakes: [
      "Using `bin(n).count('1')`: while valid in Python, it converts the number to a string and bypasses the bit manipulation skill being tested.",
      "Always looping 32 times instead of stopping when `n == 0`.",
      "Confusing bitwise AND `&` with logical AND `and`.",
    ],
    starterCode: `def hamming_weight(n: int) -> int:
    # Return the number of '1' bits in n's binary representation.
    # Tip: n & (n - 1) clears the lowest set bit in one operation.
    pass
`,
    optimalSolution: `def hamming_weight(n: int) -> int:
    count = 0

    # Brian Kernighan's algorithm: clears the lowest set bit in each step
    while n > 0:
        # Subtracting 1 flips the rightmost 1 to 0; bitwise AND clears it
        n &= n - 1
        count += 1

    return count
`,
    bruteForceSolution: `def hamming_weight(n: int) -> int:
    count = 0
    # Check each bit one by one by shifting right
    while n > 0:
        count += n & 1
        n >>= 1
    return count
`,
    harness: { kind: "function", entry: "hamming_weight" },
    testCases: [
      {
        input: { n: 11 },
        expected: 3,
        description: "11 in binary is 1011, which has 3 set bits.",
      },
      {
        input: { n: 128 },
        expected: 1,
        description: "128 in binary is 10000000 (2⁷), which has 1 set bit.",
      },
      {
        input: { n: 2147483645 },
        expected: 30,
        description: "2147483645 has thirty 1s in binary.",
      },
      {
        input: { n: 1 },
        expected: 1,
      },
      {
        input: { n: 2 },
        expected: 1,
      },
      {
        input: { n: 3 },
        expected: 2,
      },
      {
        input: { n: 7 },
        expected: 3,
      },
      {
        input: { n: 15 },
        expected: 4,
      },
    ],
  },
  {
    id: "counting-bits",
    summary:
      "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 ≤ i ≤ n`), `ans[i]` is the **number of 1's** in the binary representation of `i`. Solve it in **O(n)** time without using built-in bit counting functions.",
    constraints: ["0 ≤ n ≤ 100,000"],
    pattern: "Dynamic programming with bit shifting (ans[i] = ans[i >> 1] + (i & 1))",
    timeComplexity: {
      bruteForce: "O(n log n)",
      optimal: "O(n)",
      explanation:
        "We compute each of the n + 1 entries in `ans` using a single O(1) DP lookup and addition.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Excluding the output array of size n + 1, no extra memory is allocated.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "i >> 1",
        plainEnglishExplanation:
          "Right shift by 1 bit, which drops the last bit (equivalent to integer division `i // 2`).",
        exampleSnippet:
          "print(6 >> 1)  # 6 is 110 in binary; 6 >> 1 is 3 (11 in binary)",
        whyWeUseItHere:
          "The number of 1-bits in `i >> 1` was already computed in an earlier DP step.",
      },
      {
        keywordOrMethod: "i & 1",
        plainEnglishExplanation:
          "Bitwise AND with 1 tests whether the last bit is set (1 if `i` is odd, 0 if `i` is even).",
        exampleSnippet:
          "print(5 & 1)  # 1 (odd)\nprint(4 & 1)  # 0 (even)",
        whyWeUseItHere:
          "Tells us whether the dropped last bit contributed a 1.",
      },
      {
        keywordOrMethod: "ans = [0] * (n + 1)",
        plainEnglishExplanation:
          "Creates a list of length `n + 1` pre-filled with zeros.",
        exampleSnippet:
          "print([0] * 4)",
        whyWeUseItHere:
          "Stores the bit counts for all integers from 0 to n.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { n: 4 },
      pointers: { ans: ["i"] },
      focus: ["ans", "i"],
    },
    intuitiveExplanation: {
      intuition:
        "Notice what happens to a binary number when you shift it right by 1 bit: you discard its last bit! For example, 6 is `110` in binary, and shifting right gives 3 (`11` in binary). The number of 1-bits in 6 is simply the number of 1-bits in 3, plus whatever bit was dropped (which is 0 for 6). Because 3 < 6, we already solved 3 earlier! Every number's answer is just `ans[i >> 1] + (i & 1)`.",
      edgeCases: [
        "n = 0: returns [0].",
        "n = 1: returns [0, 1].",
        "Powers of two (2, 4, 8): have ans[i] = 1 because i >> 1 has 1 and last bit is 0.",
      ],
      stepByStepWalkthrough: [
        "Initialize `ans = [0] * (n + 1)`.",
        "Loop `i` from 1 up to `n`.",
        "Look up the precomputed count for `i >> 1` (which is `ans[i >> 1]`).",
        "Add `i & 1` (1 if odd, 0 if even).",
        "Set `ans[i] = ans[i >> 1] + (i & 1)`.",
        "Return `ans`.",
      ],
    },
    hints: {
      conceptual:
        "If you already know the number of 1-bits in i // 2, how does that relate to the number of 1-bits in i?",
      structural:
        "Allocate `ans = [0] * (n + 1)`. Loop `for i in range(1, n + 1):` and set `ans[i] = ans[i >> 1] + (i & 1)`. Return `ans`.",
    },
    commonMistakes: [
      "Counting bits individually with `bin(i).count('1')`, which runs in O(n log n) time instead of O(n).",
      "Allocating an array of size `n` instead of `n + 1`, causing an IndexError at `ans[n]`.",
      "Confusing right shift `i >> 1` with `i - 1`.",
    ],
    starterCode: `def count_bits(n: int) -> list[int]:
    # Return an array ans where ans[i] is the number of 1s in binary of i.
    # Solve in O(n) time using dynamic programming.
    pass
`,
    optimalSolution: `def count_bits(n: int) -> list[int]:
    ans = [0] * (n + 1)

    # DP relation: i >> 1 removes the last bit; (i & 1) checks if that bit was a 1
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)

    return ans
`,
    bruteForceSolution: `def count_bits(n: int) -> list[int]:
    ans = []
    for i in range(n + 1):
        # Count set bits individually for each integer
        count = 0
        val = i
        while val > 0:
            val &= val - 1
            count += 1
        ans.append(count)
    return ans
`,
    harness: { kind: "function", entry: "count_bits" },
    testCases: [
      {
        input: { n: 2 },
        expected: [0, 1, 1],
        description: "0 -> 0, 1 -> 1, 2 (10) -> 1.",
      },
      {
        input: { n: 5 },
        expected: [0, 1, 1, 2, 1, 2],
        description: "0 to 5 bit counts: [0, 1, 1, 2, 1, 2].",
      },
      {
        input: { n: 0 },
        expected: [0],
        description: "n = 0 returns [0].",
      },
      {
        input: { n: 1 },
        expected: [0, 1],
      },
      {
        input: { n: 4 },
        expected: [0, 1, 1, 2, 1],
      },
      {
        input: { n: 7 },
        expected: [0, 1, 1, 2, 1, 2, 2, 3],
      },
      {
        input: { n: 8 },
        expected: [0, 1, 1, 2, 1, 2, 2, 3, 1],
      },
    ],
  },
  {
    id: "reverse-bits",
    summary:
      "Reverse the bits of a given 32-bit unsigned integer `n` and return the resulting integer.",
    constraints: [
      "The input must be a 32-bit unsigned integer.",
      "0 ≤ n ≤ 2^32 - 1",
    ],
    pattern: "Bit-by-bit extraction and accumulation with bit shifting",
    timeComplexity: {
      bruteForce: "O(1)",
      optimal: "O(1)",
      explanation:
        "The loop executes exactly 32 iterations (once per bit of a 32-bit integer). Each iteration performs constant-time bit operations.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a single integer `result` is used.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "(result << 1) | (n & 1)",
        plainEnglishExplanation:
          "`result << 1` shifts existing bits left by 1 to make room. `n & 1` extracts the lowest bit of `n`. `|` merges the new bit into the empty slot.",
        exampleSnippet:
          "res = 1\nbit = 0\nprint((res << 1) | bit)",
        whyWeUseItHere:
          "Appends bits one by one to build the reversed 32-bit integer.",
      },
      {
        keywordOrMethod: "n >>= 1",
        plainEnglishExplanation:
          "Shifts `n` right by 1 bit in place, discarding the bit we just processed.",
        exampleSnippet:
          "val = 6\nval >>= 1\nprint(val)",
        whyWeUseItHere:
          "Brings the next bit of `n` into the least-significant position.",
      },
      {
        keywordOrMethod: "for _ in range(32):",
        plainEnglishExplanation:
          "Runs a loop exactly 32 times. The underscore `_` is a convention indicating the loop index is not needed.",
        exampleSnippet:
          "for _ in range(3):\n    print('tick')",
        whyWeUseItHere:
          "Ensures all 32 bit positions are processed, including leading and trailing zeros.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { n: 43261596 },
      focus: ["result", "n"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a conveyor belt with 32 slots. You peel the last bit off number `n` from the right (`n & 1`), slide your new number left by one slot to make room (`result << 1`), and drop that bit onto the end (`| bit`). Then you discard the bit you just processed from `n` (`n >>= 1`). Repeating this 32 times completely flips the 32 bits backwards!",
      edgeCases: [
        "n = 0: all 32 zeros reversed remains 0.",
        "n = 1 (bit 0 is 1): becomes 2³¹ = 2147483648.",
        "All 32 bits set to 1 (4294967295): reversed remains 4294967295.",
      ],
      stepByStepWalkthrough: [
        "Initialize result = 0.",
        "Loop 32 times (once for each bit position).",
        "Shift result left by 1 and OR the lowest bit of n: `result = (result << 1) | (n & 1)`.",
        "Shift n right by 1: `n >>= 1`.",
        "After 32 iterations, return `result`.",
      ],
    },
    hints: {
      conceptual:
        "How do you extract the last bit of a number? And how do you append that bit to a new number that is growing from the other side?",
      structural:
        "Loop 32 times using `for _ in range(32):`. In each round, update `result = (result << 1) | (n & 1)` and `n >>= 1`. Return `result`.",
    },
    commonMistakes: [
      "Stopping when `n == 0`: if `n` becomes 0 early, you must still shift the remaining bits so that trailing zeros become leading zeros!",
      "Using string conversion `bin(n)[2:].zfill(32)[::-1]`: it works, but interviewers look for bit manipulation.",
      "Shifting by 32 bits at once instead of incrementally.",
    ],
    starterCode: `def reverse_bits(n: int) -> int:
    # Reverse bits of the given 32-bit unsigned integer.
    # Tip: loop exactly 32 times to ensure all 32 bit positions are processed.
    pass
`,
    optimalSolution: `def reverse_bits(n: int) -> int:
    result = 0

    # Process all 32 bits from right to left
    for _ in range(32):
        # Shift result left to make room, then insert the lowest bit of n
        result = (result << 1) | (n & 1)
        # Shift n right to inspect the next bit
        n >>= 1

    return result
`,
    bruteForceSolution: `def reverse_bits(n: int) -> int:
    # String formatting and reversal approach
    bit_str = bin(n)[2:].zfill(32)
    reversed_str = bit_str[::-1]
    return int(reversed_str, 2)
`,
    harness: { kind: "function", entry: "reverse_bits" },
    testCases: [
      {
        input: { n: 43261596 },
        expected: 964176192,
        description:
          "00000010100101000001111010011100 reversed is 00111001011110000010100101000000 (964176192).",
      },
      {
        input: { n: 1 },
        expected: 2147483648,
        description: "1 at position 0 moves to position 31 (2³¹ = 2147483648).",
      },
      {
        input: { n: 0 },
        expected: 0,
        description: "32 zeros reversed is 0.",
      },
      {
        input: { n: 4294967295 },
        expected: 4294967295,
        description: "All 32 bits set to 1.",
      },
      {
        input: { n: 2 },
        expected: 1073741824,
      },
      {
        input: { n: 2147483648 },
        expected: 1,
      },
      {
        input: { n: 3 },
        expected: 3221225472,
      },
    ],
  },
  {
    id: "missing-number",
    summary:
      "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    constraints: [
      "n == nums.length",
      "1 ≤ n ≤ 10,000",
      "0 ≤ nums[i] ≤ n",
      "All the numbers of nums are unique.",
    ],
    pattern: "Bitwise XOR cancellation against the complete range [0..n]",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "We iterate through the n elements of nums once, performing O(1) XOR operations at each step.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a single integer `result` is used.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "result ^= i ^ num",
        plainEnglishExplanation:
          "XORs the current index `i` (representing an expected number) and the actual value `num` into `result`. Every matching number cancels out with its corresponding index.",
        exampleSnippet:
          "res = 3\nfor i, x in enumerate([0, 1]):\n    res ^= i ^ x\nprint(res)  # 2 is missing",
        whyWeUseItHere:
          "Matches each present number against an expected index to cancel them.",
      },
      {
        keywordOrMethod: "n = len(nums)",
        plainEnglishExplanation:
          "`len()` returns the count of items in the list, which equals `n`.",
        exampleSnippet:
          "nums = [3, 0, 1]\nprint(len(nums))",
        whyWeUseItHere:
          "The expected numbers range from 0 up to n.",
      },
      {
        keywordOrMethod: "for i, num in enumerate(nums):",
        plainEnglishExplanation:
          "`enumerate` generates pairs `(0, nums[0]), (1, nums[1]), ...`.",
        exampleSnippet:
          "for i, v in enumerate(['a', 'b']):\n    print(i, v)",
        whyWeUseItHere:
          "Provides the indices `0` through `n - 1` to pair against the values in `nums`.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [3, 0, 1] },
      pointers: { nums: ["i"] },
      focus: ["result", "num"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a roll call where every student from 0 to n is supposed to be present. If you pair up the student roster numbers [0, 1, ..., n] with the students actually sitting in the classroom, every present student appears twice (once on the roster and once in person). If you XOR everything together, all matching pairs cancel out into 0! The only number left over will be the student who didn't show up.",
      edgeCases: [
        "Missing number is 0: [1, 2] missing 0.",
        "Missing number is n: [0, 1] missing 2.",
        "Single-element array: [0] missing 1, or [1] missing 0.",
      ],
      stepByStepWalkthrough: [
        "Let n = len(nums).",
        "Initialize result = n (since the loop indices only go from 0 to n - 1).",
        "For each index i and value num in enumerate(nums):",
        "Compute result ^= i ^ num.",
        "Every number present in nums cancels with its matching index.",
        "Return result, which is the missing number.",
      ],
    },
    hints: {
      conceptual:
        "You have numbers from 0 to n, and one is missing. What happens if you XOR all numbers from 0 to n together with all the numbers in nums?",
      structural:
        "Initialize `result = len(nums)`. Loop `for i, num in enumerate(nums):` and update `result ^= i ^ num`. Return `result`.",
    },
    commonMistakes: [
      "Forgetting to include `n` in the XOR set, which causes the function to fail when `n` itself is missing.",
      "Using `sum(range(n + 1)) - sum(nums)`: while valid in Python, in languages with fixed-width integers it can cause arithmetic overflow.",
      "Sorting `nums` first: sorting costs O(n log n) time when an O(n) solution is possible.",
    ],
    starterCode: `def missing_number(nums: list[int]) -> int:
    # Return the only number in range [0, n] missing from nums.
    # Aim for O(n) time and O(1) space.
    pass
`,
    optimalSolution: `def missing_number(nums: list[int]) -> int:
    n = len(nums)
    # Start with n, because loop indices only cover 0 to n - 1
    result = n

    # XOR each expected index and actual number
    # Every present number cancels with its index counterpart
    for i, num in enumerate(nums):
        result ^= i ^ num

    return result
`,
    bruteForceSolution: `def missing_number(nums: list[int]) -> int:
    # Mathematical Gauss formula: sum(0..n) = n * (n + 1) // 2
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum
`,
    harness: { kind: "function", entry: "missing_number" },
    testCases: [
      {
        input: { nums: [3, 0, 1] },
        expected: 2,
        description: "n = 3, range [0, 3], 2 is missing.",
      },
      {
        input: { nums: [0, 1] },
        expected: 2,
        description: "n = 2, range [0, 2], 2 is missing.",
      },
      {
        input: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] },
        expected: 8,
        description: "n = 9, 8 is missing.",
      },
      {
        input: { nums: [0] },
        expected: 1,
        description: "Single element [0], 1 is missing.",
      },
      {
        input: { nums: [1] },
        expected: 0,
        description: "Single element [1], 0 is missing.",
      },
      {
        input: { nums: [1, 2] },
        expected: 0,
      },
      {
        input: { nums: [0, 2] },
        expected: 1,
      },
    ],
  },
  {
    id: "sum-of-two-integers",
    summary:
      "Given two integers `a` and `b`, return their sum without using the `+` and `-` operators.",
    constraints: ["-1000 ≤ a, b ≤ 1000"],
    pattern: "Bitwise addition with carry using XOR and AND",
    timeComplexity: {
      bruteForce: "O(1)",
      optimal: "O(1)",
      explanation:
        "Carries in 32-bit integer addition can propagate at most 32 times, so the loop terminates in at most 32 iterations.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a few integer bit-masking variables are used.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "(a & b) << 1",
        plainEnglishExplanation:
          "`a & b` finds columns where both bits are 1 (creating a carry). `<< 1` shifts that carry left by 1 column into the next higher bit position.",
        exampleSnippet:
          "a, b = 3, 5\ncarry = (a & b) << 1\nprint(carry)",
        whyWeUseItHere:
          "Calculates the carry bits to be added in the next round.",
      },
      {
        keywordOrMethod: "mask = 0xFFFFFFFF",
        plainEnglishExplanation:
          "`0xFFFFFFFF` is the hexadecimal representation of 32 ones (`2^32 - 1`). In Python, integers have arbitrary precision, so masking keeps values bounded within 32 bits.",
        exampleSnippet:
          "mask = 0xFFFFFFFF\nprint(hex(-1 & mask))",
        whyWeUseItHere:
          "Simulates 32-bit hardware integer overflow behavior in Python.",
      },
      {
        keywordOrMethod: "~(a ^ mask)",
        plainEnglishExplanation:
          "Converts a 32-bit unsigned two's complement integer with the sign bit set back into Python's negative integer.",
        exampleSnippet:
          "mask = 0xFFFFFFFF\nval = 0xFFFFFFFF  # -1 in 32-bit two's complement\nprint(~(val ^ mask))",
        whyWeUseItHere:
          "Restores negative results correctly in Python.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { a: 1, b: 2 },
      focus: ["a", "b", "carry"],
    },
    intuitiveExplanation: {
      intuition:
        "When adding two binary numbers, two things happen at each column: the sum of bits without carry is given by XOR (`1 ^ 1 = 0`, `1 ^ 0 = 1`), and the carry to the next column is given by AND shifted left by one (`(1 & 1) << 1`). By repeatedly calculating the sum without carry and adding the carry back in, the carry bits keep shifting left until no carries remain! In Python, because integers can grow infinitely large, we use a 32-bit mask `0xFFFFFFFF` to simulate fixed-width hardware registers.",
      edgeCases: [
        "Positive + Positive: 1 + 2 = 3.",
        "Positive + Negative: 2 + (-3) = -1.",
        "Negative + Negative: -2 + (-3) = -5.",
        "Adding 0: 0 + 5 = 5.",
        "Summing to 0: -1 + 1 = 0.",
      ],
      stepByStepWalkthrough: [
        "Define 32-bit mask = 0xFFFFFFFF.",
        "While the carry `b` (masked by `mask`) is non-zero:",
        "Calculate carry: `carry = (a & b) << 1`.",
        "Calculate sum without carry: `a = (a ^ b) & mask`.",
        "Set `b = carry`.",
        "If the sign bit is set (`a > 0x7FFFFFFF`), convert from two's complement using `~(a ^ mask)`.",
        "Otherwise return `a` directly.",
      ],
    },
    hints: {
      conceptual:
        "How does a computer add two numbers without an addition instruction? XOR computes the sum without carries. What operation finds the carries?",
      structural:
        "Use `mask = 0xFFFFFFFF`. Loop `while (b & mask) != 0:`. Inside, compute `carry = (a & b) << 1`, update `a = (a ^ b) & mask`, and set `b = carry`. At the end, if `a > 0x7FFFFFFF`, return `~(a ^ mask)`.",
    },
    commonMistakes: [
      "Using `+` or `-` anywhere in the code, which violates the core problem requirement.",
      "Infinite loop on negative numbers in Python: in C++, integers overflow naturally to 0, but in Python negative numbers have infinite leading 1s unless constrained with a 32-bit mask.",
      "Forgetting to convert 32-bit two's complement back to Python negative integers.",
    ],
    starterCode: `def get_sum(a: int, b: int) -> int:
    # Return the sum of a and b without using + or -.
    # Tip: XOR computes sum without carry; AND shifted left computes carry.
    pass
`,
    optimalSolution: `def get_sum(a: int, b: int) -> int:
    # 32-bit integer mask (0xFFFFFFFF)
    mask = 0xFFFFFFFF

    # Repeat until there are no carries left to add
    while (b & mask) != 0:
        # Carry is formed where both bits are 1, shifted to the next position
        carry = (a & b) << 1
        # XOR calculates the sum without carry; mask keeps it within 32 bits
        a = (a ^ b) & mask
        b = carry

    # If b had bits pushed beyond 32 bits, mask a down to 32 bits
    a = a & mask

    # If the 31st sign bit is 1 (a > 0x7FFFFFFF), convert two's complement to negative
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)
`,
    bruteForceSolution: `def get_sum(a: int, b: int) -> int:
    # Full adder simulation bit by bit
    mask = 0xFFFFFFFF
    carry = 0
    res = 0
    for i in range(32):
        b1 = (a >> i) & 1
        b2 = (b >> i) & 1
        bit_sum = b1 ^ b2 ^ carry
        carry = (b1 & b2) | (carry & (b1 ^ b2))
        res |= bit_sum << i
    return res if res <= 0x7FFFFFFF else ~(res ^ mask)
`,
    harness: { kind: "function", entry: "get_sum" },
    testCases: [
      {
        input: { a: 1, b: 2 },
        expected: 3,
        description: "1 + 2 = 3.",
      },
      {
        input: { a: 2, b: 3 },
        expected: 5,
        description: "2 + 3 = 5.",
      },
      {
        input: { a: -1, b: 1 },
        expected: 0,
        description: "-1 + 1 = 0.",
      },
      {
        input: { a: -2, b: 3 },
        expected: 1,
        description: "-2 + 3 = 1.",
      },
      {
        input: { a: -2, b: -3 },
        expected: -5,
        description: "Both negative: -2 + -3 = -5.",
      },
      {
        input: { a: 0, b: 0 },
        expected: 0,
      },
      {
        input: { a: 10, b: -20 },
        expected: -10,
      },
      {
        input: { a: 100, b: 200 },
        expected: 300,
      },
    ],
  },
  {
    id: "reverse-integer",
    summary:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, return `0`.",
    constraints: ["-2^31 ≤ x ≤ 2^31 - 1"],
    pattern: "Digit extraction with 32-bit overflow boundary checking",
    timeComplexity: {
      bruteForce: "O(log₁₀ |x|)",
      optimal: "O(log₁₀ |x|)",
      explanation:
        "The number of decimal digits in a 32-bit integer is at most 10. The while loop runs at most 10 times, performing O(1) arithmetic operations per digit.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a few integer variables are used.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "x % 10 and x //= 10",
        plainEnglishExplanation:
          "`x % 10` extracts the rightmost decimal digit. `x //= 10` strips that digit away.",
        exampleSnippet:
          "val = 123\nprint(val % 10, val // 10)",
        whyWeUseItHere:
          "Peels off digits from right to left to construct the reversed number.",
      },
      {
        keywordOrMethod: "sign = -1 if x < 0 else 1",
        plainEnglishExplanation:
          "A ternary conditional expression that records `-1` for negative numbers and `1` for positive numbers.",
        exampleSnippet:
          "n = -42\nsign = -1 if n < 0 else 1\nprint(sign)",
        whyWeUseItHere:
          "Allows working with positive magnitude `abs(x)` and restoring the sign at the end.",
      },
      {
        keywordOrMethod: "min_int, max_int = -2**31, 2**31 - 1",
        plainEnglishExplanation:
          "`2**31` computes 2 raised to power 31. This defines the minimum (-2147483648) and maximum (2147483647) boundaries of a signed 32-bit integer.",
        exampleSnippet:
          "print(-2**31, 2**31 - 1)",
        whyWeUseItHere:
          "Used to test whether the reversed integer overflows 32 bits.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { x: 123 },
      focus: ["reversed_num", "x", "digit"],
    },
    intuitiveExplanation: {
      intuition:
        "Reversing the digits of a decimal number is like pulling letters off one word and sticking them onto the end of a new word. Using `% 10`, you pop the last digit off `x`. Multiplying your new number by 10 and adding that digit shifts the existing digits left to make room. If at the end the resulting number spills over the 32-bit signed limits `[-2147483648, 2147483647]`, it overflows and we return 0.",
      edgeCases: [
        "Negative numbers: -123 reverses to -321 (the sign remains in front).",
        "Trailing zeros: 120 reverses to 21 (leading zeros are dropped).",
        "Zero: 0 reverses to 0.",
        "Overflow: 1534236469 reversed would be 9646324351, which exceeds 2³¹ - 1, so return 0.",
      ],
      stepByStepWalkthrough: [
        "Record the sign of x: sign = -1 if x < 0 else 1.",
        "Take the absolute value: x = abs(x).",
        "Initialize reversed_num = 0.",
        "While x > 0:",
        "Extract the last digit: digit = x % 10.",
        "Drop the last digit: x //= 10.",
        "Push digit onto reversed_num: reversed_num = reversed_num * 10 + digit.",
        "Restore the sign: reversed_num *= sign.",
        "If reversed_num < -2³¹ or reversed_num > 2³¹ - 1, return 0.",
        "Return reversed_num.",
      ],
    },
    hints: {
      conceptual:
        "How do you pop the last digit from a number and append it to another? Don't forget that 32-bit signed integers have strict upper and lower limits!",
      structural:
        "Record `sign = -1 if x < 0 else 1` and let `x = abs(x)`. In a `while x > 0:` loop, extract `digit = x % 10`, divide `x //= 10`, and build `reversed_num = reversed_num * 10 + digit`. Restore the sign and check if it exceeds `[-2**31, 2**31 - 1]`.",
    },
    commonMistakes: [
      "Handling negative numbers with modulo without `abs(x)`: in Python `-123 % 10` is `7`, not `-3`. Working with `abs(x)` avoids this surprise.",
      "Forgetting the 32-bit overflow check and returning values larger than 2³¹ - 1.",
      "Keeping trailing zeros as leading zeros (e.g. returning `021` instead of `21`).",
    ],
    starterCode: `def reverse(x: int) -> int:
    # Reverse digits of a 32-bit signed integer.
    # Return 0 if the reversed integer overflows [-2^31, 2^31 - 1].
    pass
`,
    optimalSolution: `def reverse(x: int) -> int:
    # Signed 32-bit integer limits
    min_int = -2**31
    max_int = 2**31 - 1

    # Preserve sign and work with positive magnitude
    sign = -1 if x < 0 else 1
    x = abs(x)
    reversed_num = 0

    # Pop digits from x and push onto reversed_num
    while x > 0:
        digit = x % 10
        x //= 10
        reversed_num = reversed_num * 10 + digit

    # Restore original sign
    reversed_num *= sign

    # Check 32-bit signed integer overflow
    if reversed_num < min_int or reversed_num > max_int:
        return 0

    return reversed_num
`,
    bruteForceSolution: `def reverse(x: int) -> int:
    # String conversion approach
    sign = -1 if x < 0 else 1
    s = str(abs(x))[::-1]
    res = sign * int(s)
    if res < -2**31 or res > 2**31 - 1:
        return 0
    return res
`,
    harness: { kind: "function", entry: "reverse" },
    testCases: [
      {
        input: { x: 123 },
        expected: 321,
        description: "123 reversed is 321.",
      },
      {
        input: { x: -123 },
        expected: -321,
        description: "Negative sign is preserved: -123 becomes -321.",
      },
      {
        input: { x: 120 },
        expected: 21,
        description: "Trailing zeros become leading zeros and are dropped.",
      },
      {
        input: { x: 0 },
        expected: 0,
        description: "0 reversed is 0.",
      },
      {
        input: { x: 1534236469 },
        expected: 0,
        description: "Reversing produces 9646324351 which exceeds 2³¹ - 1, so returns 0.",
      },
      {
        input: { x: -2147483648 },
        expected: 0,
        description: "Minimum 32-bit integer overflows when reversed.",
      },
      {
        input: { x: 1563847412 },
        expected: 0,
      },
      {
        input: { x: 1000000003 },
        expected: 0,
      },
      {
        input: { x: 1463847412 },
        expected: 2147483641,
      },
    ],
  },
];

export default problems;
