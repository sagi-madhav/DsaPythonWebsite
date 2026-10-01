import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ best-time-to-buy-and-sell-stock
  {
    id: "best-time-to-buy-and-sell-stock",
    summary:
      "`prices[i]` is the price of one stock on day `i`. You may **buy once** and then **sell once on a later day**. Return the biggest profit (sell price minus buy price) you can make. If every possible trade loses money, don't trade at all and return `0`.",
    constraints: [
      "1 ≤ len(prices) ≤ 100,000",
      "0 ≤ prices[i] ≤ 10,000",
      "The sell day must come after the buy day",
    ],
    pattern: "Sliding window: left = cheapest buy day, right = sell day",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force tries every (buy, sell) pair: for each of the n days it looks at up to n later days, so about n × n subtractions. The optimal version walks the list once with `r`, doing a constant amount of work (one comparison, maybe one subtraction and one `max`) per day, so it is O(n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep three numbers (`l`, `r` and `best`) no matter how long the price list is.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def max_profit(prices: list[int]) -> int:",
        plainEnglishExplanation:
          "`def` creates a function named `max_profit` with one input called `prices`. `: list[int]` is a *type hint* saying 'prices is a list of whole numbers', and `-> int` says the function gives back one whole number. Python doesn't enforce hints; they are notes for humans.",
        exampleSnippet: "def double(x: int) -> int:\n    return x * 2\n\nprint(double(21))",
        whyWeUseItHere:
          "The tests call `max_profit(...)` with different price lists and compare what you `return` with the expected profit.",
      },
      {
        keywordOrMethod: "for r in range(1, len(prices)):",
        plainEnglishExplanation:
          "`len(prices)` is how many items the list has. `range(1, n)` produces the numbers 1, 2, …, n - 1 (the end number is *not* included). The `for` loop runs its indented block once for each of those numbers, storing the current one in `r`.",
        exampleSnippet: "prices = [7, 1, 5]\nfor r in range(1, len(prices)):\n    print(r)",
        whyWeUseItHere:
          "`r` is the day we try selling on. Day 0 can never be a sell day (there's no earlier day to buy on), so we start at 1.",
      },
      {
        keywordOrMethod: "prices[r]",
        plainEnglishExplanation:
          "Square brackets after a list read the item at that position. Positions (indices) start at 0, so `prices[0]` is the first price and `prices[2]` is the third.",
        exampleSnippet: "prices = [7, 1, 5]\nprint(prices[0])\nprint(prices[2])",
        whyWeUseItHere:
          "We compare the price on the sell day `prices[r]` with the price on the buy day `prices[l]`.",
      },
      {
        keywordOrMethod: "if ... : / else:",
        plainEnglishExplanation:
          "`if condition:` runs its indented block only when the condition is `True`. The `else:` block runs when it is `False`. Exactly one of the two blocks runs.",
        exampleSnippet:
          "price = 3\ncheapest = 5\nif price < cheapest:\n    print('new cheapest day')\nelse:\n    print('try selling')",
        whyWeUseItHere:
          "Each day is either a better day to *buy* (cheaper than our current buy day) or a day worth trying to *sell* on.",
      },
      {
        keywordOrMethod: "best = max(best, profit)",
        plainEnglishExplanation:
          "`max(a, b)` gives back whichever of the two numbers is bigger. Assigning it back to `best` means 'keep the record, unless the new number beats it'.",
        exampleSnippet: "best = 4\nprint(max(best, 2))\nprint(max(best, 9))",
        whyWeUseItHere:
          "`best` should always hold the biggest profit seen so far.",
      },
    ],
    visualizerType: "sliding-window",
    visualization: {
      input: { prices: [7, 1, 5, 3, 6, 4] },
      pointers: { prices: ["l", "r"] },
      windows: [{ array: "prices", start: "l", end: "r" }],
      focus: ["prices", "best", "profit"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture yourself flipping through a calendar of prices one day at a time, holding a sticky note with the cheapest day you've seen so far. On each new day you ask one question: 'if I had bought on my sticky-note day and sold today, how much would I make?' If today's price is even lower than your sticky note, you don't sell: you move the sticky note to today, because any future sale is better from a cheaper starting point. The window stretches from the sticky-note day (`l`) to today (`r`), and you remember the best gap you ever saw.",
      edgeCases: [
        "Prices only go down, like `[7, 6, 4, 3, 1]`: every sale loses money, so we never update `best` and return 0.",
        "A single day `[5]`: there's no later day to sell on, so the loop body never runs and the answer is 0.",
        "The best sale happens *before* the cheapest day, like `[2, 4, 1]`: buying at 2 and selling at 4 gives 2. Moving `l` to the 1 later doesn't erase that, because `best` already remembers it.",
      ],
      stepByStepWalkthrough: [
        "Start with `l = 0` (buy on the first day) and `best = 0` (no trade yet).",
        "Move `r` forward one day at a time, from day 1 to the last day.",
        "If `prices[r]` is cheaper than `prices[l]`, day `r` is a better buy day: set `l = r`.",
        "Otherwise compute `profit = prices[r] - prices[l]`, the profit from buying on day `l` and selling today.",
        "Update `best = max(best, profit)` so it always holds the record.",
        "After the loop, return `best`.",
      ],
    },
    hints: {
      conceptual:
        "If you knew you were selling on a particular day, which day would you want to have bought on? Can you keep track of that as you walk forward, instead of looking backwards every time?",
      structural:
        "Use one index `l` for the cheapest buy day so far and loop `for r in range(1, len(prices)):` for the sell day. Inside, either move `l` to `r` (cheaper price found) or compare `prices[r] - prices[l]` with your best.",
    },
    commonMistakes: [
      "Taking `max(prices) - min(prices)`: the maximum might come *before* the minimum, and you can't sell before you buy. For `[7, 1]` that would say 6, but the answer is 0.",
      "Starting `best` at a negative number or returning a negative profit. If every trade loses money, the answer is 0 (just don't trade).",
      "Using two nested loops. It gives the right answer but is O(n²), far too slow for 100,000 days.",
    ],
    starterCode: `def max_profit(prices: list[int]) -> int:
    # Return the biggest profit from buying on one day and selling on a LATER day.
    # Tip: remember the cheapest price you've seen so far as you walk forward.
    pass
`,
    optimalSolution: `def max_profit(prices: list[int]) -> int:
    # l is the day we buy: always the cheapest day seen so far
    l = 0
    # best is the biggest profit found so far (0 means "don't trade")
    best = 0

    # r is the day we try selling, moving forward one day at a time
    for r in range(1, len(prices)):
        # Is today even cheaper than our buy day? Then buy today instead
        if prices[r] < prices[l]:
            l = r  # cheaper buy day found: the window restarts here
        else:
            # Profit if we bought on day l and sold today
            profit = prices[r] - prices[l]
            # Keep it only if it beats the record
            best = max(best, profit)

    # The biggest gap between a buy day and a later sell day
    return best
`,
    bruteForceSolution: `def max_profit(prices: list[int]) -> int:
    best = 0
    # Try buying on every day i and selling on every later day j
    for i in range(len(prices)):
        for j in range(i + 1, len(prices)):
            best = max(best, prices[j] - prices[i])
    return best
`,
    harness: { kind: "function", entry: "max_profit" },
    testCases: [
      {
        input: { prices: [7, 1, 5, 3, 6, 4] },
        expected: 5,
        description: "Buy on day 1 at price 1, sell on day 4 at price 6: profit 6 - 1 = 5.",
      },
      {
        input: { prices: [7, 6, 4, 3, 1] },
        expected: 0,
        description: "Prices only fall, so any trade loses money. Don't trade: profit 0.",
      },
      {
        input: { prices: [2, 4, 1] },
        expected: 2,
        description: "Buy at 2, sell at 4. The cheapest price (1) comes last, too late to sell after it.",
      },
      { input: { prices: [5] }, expected: 0, description: "Only one day: nothing to sell on." },
      { input: { prices: [1, 2] }, expected: 1 },
      { input: { prices: [3, 3, 3, 3] }, expected: 0, description: "A flat price never makes money." },
      { input: { prices: [2, 1, 2, 1, 0, 1, 2] }, expected: 2 },
      { input: { prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] }, expected: 8, description: "Buy at 1 (day 0), sell at 9 (day 8)." },
      { input: { prices: [3, 2, 6, 5, 0, 3] }, expected: 4 },
    ],
  },

  // ------------------------------------------------------------------ longest-substring-without-repeating-characters
  {
    id: "longest-substring-without-repeating-characters",
    summary:
      "Given a string `s`, find the longest stretch of **consecutive** characters in which no character appears twice, and return its **length**. For example, in `\"abcabcbb\"` the longest such stretch is `\"abc\"`, so the answer is 3.",
    constraints: [
      "0 ≤ len(s) ≤ 50,000",
      "s can contain letters, digits, symbols and spaces",
      "The stretch must be contiguous (no skipping characters)",
    ],
    pattern: "Variable-size sliding window + a set of characters in the window",
    timeComplexity: {
      bruteForce: "O(n³)",
      optimal: "O(n)",
      explanation:
        "Brute force checks every start and end position (about n² substrings) and builds a set for each one (up to n more work). In the optimal version, `r` moves forward n times and `l` also only ever moves forward, at most n times in total. Every character is added to the set once and removed at most once, each in O(1), so the whole thing is O(n).",
    },
    spaceComplexity: {
      optimal: "O(m)",
      explanation:
        "The set holds the characters inside the window, and they are all different. So it never holds more than m items, where m is the number of different characters that can appear (at most n).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "window = set()",
        plainEnglishExplanation:
          "A *set* is a bag of values with no duplicates and no order. `set()` makes an empty one (note: `{}` would make an empty dictionary, not a set). `.add(x)` puts `x` in, `.remove(x)` takes it out.",
        exampleSnippet: "window = set()\nwindow.add('a')\nwindow.add('b')\nwindow.add('a')  # already there, nothing changes\nprint(window)\nwindow.remove('a')\nprint(window)",
        whyWeUseItHere:
          "The set holds exactly the characters currently inside the window, so we can instantly tell whether a new character would be a repeat.",
      },
      {
        keywordOrMethod: "s[r] in window",
        plainEnglishExplanation:
          "`x in some_set` asks 'is x in the set?' and gives `True` or `False`. For sets this check is instant (O(1)) no matter how big the set is, unlike searching a list.",
        exampleSnippet: "window = {'a', 'b'}\nprint('a' in window)\nprint('z' in window)",
        whyWeUseItHere:
          "Before adding the new character `s[r]`, we need to know if it's already in the window.",
      },
      {
        keywordOrMethod: "for r in range(len(s)):  and  s[r]",
        plainEnglishExplanation:
          "`range(len(s))` produces 0, 1, …, len(s) - 1: every valid index of the string. Strings can be indexed like lists: `s[0]` is the first character, `s[r]` is the character at position `r`.",
        exampleSnippet: "s = 'cat'\nfor r in range(len(s)):\n    print(r, s[r])",
        whyWeUseItHere:
          "`r` is the right edge of the window. Each loop step pulls one more character, `s[r]`, into the window.",
      },
      {
        keywordOrMethod: "while condition:",
        plainEnglishExplanation:
          "A `while` loop repeats its block for as long as the condition stays `True`, checking it again before each repetition. It's for 'keep doing this until something changes', when you don't know in advance how many times.",
        exampleSnippet: "n = 1\nwhile n < 20:\n    n = n * 2\nprint(n)",
        whyWeUseItHere:
          "If the new character is a repeat, we don't know how many characters must leave from the left until the old copy is gone. So we keep shrinking *while* it's still in the window.",
      },
      {
        keywordOrMethod: "l += 1",
        plainEnglishExplanation:
          "`l += 1` is short for `l = l + 1`: add one to `l` and store the result back in `l`.",
        exampleSnippet: "l = 0\nl += 1\nl += 1\nprint(l)",
        whyWeUseItHere:
          "Moving the left edge one step to the right shrinks the window by one character.",
      },
      {
        keywordOrMethod: "r - l + 1",
        plainEnglishExplanation:
          "If a window starts at index `l` and ends at index `r` (both included), it contains `r - l + 1` items. The `+ 1` is because both ends count: from 2 to 4 is 2, 3, 4, which is three items.",
        exampleSnippet: "l, r = 2, 4\nprint(r - l + 1)",
        whyWeUseItHere:
          "That's the length of the current repeat-free window, which we compare with `best`.",
      },
    ],
    visualizerType: "sliding-window",
    visualization: {
      input: { s: "abcabcbb" },
      pointers: { s: ["l", "r"] },
      windows: [{ array: "s", start: "l", end: "r" }],
      focus: ["s", "window", "best"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a caterpillar crawling along the string. Its head (`r`) eats one new character at a time. The caterpillar refuses to have two of the same character in its body. When the head is about to eat a character it already contains, the tail (`l`) crawls forward, dropping characters, until the old copy is gone. The caterpillar's body is always repeat-free, and we just remember the longest it ever got. Because the head and tail only move forward, each character is eaten once and dropped at most once.",
      edgeCases: [
        "The empty string `\"\"`: the loop never runs and the answer is 0.",
        "All the same character, like `\"bbbbb\"`: every new `b` pushes the previous one out, so the window is never longer than 1.",
        "`\"abba\"`: when the second `a` arrives, the window has already shrunk past the first `a`, so it isn't a repeat any more. Tracking the window with a set handles this naturally.",
        "Spaces and symbols count as characters too: `\" \"` has a longest stretch of 1.",
      ],
      stepByStepWalkthrough: [
        "Start with an empty set `window`, the left edge `l = 0` and `best = 0`.",
        "Move the right edge `r` across the string, one character at a time.",
        "While `s[r]` is already in the set, remove `s[l]` from the set and move `l` right. This shrinks the window until the repeat is gone.",
        "Add `s[r]` to the set: the window `s[l..r]` now has no repeats.",
        "Update `best` with the window's length `r - l + 1`.",
        "After the loop, return `best`.",
      ],
    },
    hints: {
      conceptual:
        "Once you have a stretch with no repeats, adding one more character either keeps it repeat-free or creates exactly one repeat. When it creates a repeat, how much of the left side must you throw away?",
      structural:
        "Use two indices `l` and `r` and a `set` holding the characters between them. Loop `for r in range(len(s)):`, use `while s[r] in window:` to remove `s[l]` and do `l += 1`, then add `s[r]` and update the best length.",
    },
    commonMistakes: [
      "Resetting the whole window to empty when you hit a repeat. For `\"dvdf\"` that loses the `v` and gives 2 instead of 3 (`\"vdf\"`).",
      "Removing the *new* character instead of the leftmost one. The window must shrink from the left, otherwise it stops being one contiguous stretch.",
      "Computing the length as `r - l` and coming up one short. A window from `l` to `r` inclusive has `r - l + 1` characters.",
      "Counting distinct characters in the whole string (`len(set(s))`). The stretch must be contiguous: `\"abca\"` has 3 distinct letters, but so does `\"aabbcc\"`, whose answer is only 2.",
    ],
    starterCode: `def length_of_longest_substring(s: str) -> int:
    # Return the length of the longest stretch of s with no repeated character.
    # Tip: grow a window on the right; shrink it from the left when you hit a repeat.
    pass
`,
    optimalSolution: `def length_of_longest_substring(s: str) -> int:
    # window holds the characters currently inside s[l..r]
    window = set()
    # l is the left edge of the window
    l = 0
    # best is the longest repeat-free window seen so far
    best = 0

    # r is the right edge: each step pulls one new character into the window
    for r in range(len(s)):
        # s[r] is already in the window: shrink from the left until it's gone
        while s[r] in window:
            # Drop the leftmost character from the window...
            window.remove(s[l])
            # ...and move the left edge one step right
            l += 1

        # s[r] is new to the window now, so add it
        window.add(s[r])
        # The window s[l..r] has r - l + 1 characters, all different
        best = max(best, r - l + 1)

    return best  # the longest repeat-free window we ever saw
`,
    bruteForceSolution: `def length_of_longest_substring(s: str) -> int:
    best = 0
    # Try every start i and every end j
    for i in range(len(s)):
        for j in range(i, len(s)):
            piece = s[i:j + 1]
            # No repeats means the set is as big as the piece itself
            if len(set(piece)) == len(piece):
                best = max(best, len(piece))
    return best
`,
    harness: { kind: "function", entry: "length_of_longest_substring" },
    testCases: [
      {
        input: { s: "abcabcbb" },
        expected: 3,
        description: "`\"abc\"` has no repeats. Any 4 characters in a row contain a repeat.",
      },
      {
        input: { s: "bbbbb" },
        expected: 1,
        description: "Every stretch longer than one character contains two b's.",
      },
      {
        input: { s: "pwwkew" },
        expected: 3,
        description: "`\"wke\"` works. `\"pwke\"` isn't allowed: it skips a character, so it isn't contiguous.",
      },
      { input: { s: "" }, expected: 0, description: "An empty string has no characters at all." },
      { input: { s: " " }, expected: 1, description: "A space is a character too." },
      { input: { s: "dvdf" }, expected: 3, description: "`\"vdf\"`: shrink only past the first d, not all the way." },
      { input: { s: "abba" }, expected: 2 },
      { input: { s: "abcdef" }, expected: 6, description: "No repeats at all: the whole string." },
      { input: { s: "tmmzuxt" }, expected: 5, description: "`\"mzuxt\"`, which ends at the very last character." },
    ],
  },

  // ------------------------------------------------------------------ longest-repeating-character-replacement
  {
    id: "longest-repeating-character-replacement",
    summary:
      "You get a string `s` of uppercase letters and a number `k`. You may change **at most `k`** characters into any other uppercase letter. After your changes, what is the length of the longest stretch of consecutive characters that are **all the same letter**? Return that length.",
    constraints: [
      "1 ≤ len(s) ≤ 100,000",
      "s contains only uppercase English letters (A-Z)",
      "0 ≤ k ≤ len(s)",
    ],
    pattern: "Variable-size sliding window + letter counts",
    timeComplexity: {
      bruteForce: "O(26 · n²)",
      optimal: "O(26 · n) = O(n)",
      explanation:
        "Brute force tries every start position and extends the end one letter at a time (about n² windows), checking the biggest count each time (up to 26 letters). In the optimal version `r` and `l` each move forward at most n times in total. Each step calls `max(count.values())`, which looks at most 26 entries because there are only 26 letters. 26 is a fixed number, so O(26 · n) is just O(n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The dictionary `count` has at most 26 keys (one per uppercase letter), no matter how long the string is.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "count = {}",
        plainEnglishExplanation:
          "Curly braces make an empty *dictionary*: a lookup table from keys to values. `count['A'] = 2` stores the value 2 under the key `'A'`, and `count['A']` reads it back.",
        exampleSnippet: "count = {}\ncount['A'] = 2\ncount['B'] = 1\nprint(count)\nprint(count['A'])",
        whyWeUseItHere:
          "`count` tells us how many times each letter appears inside the current window.",
      },
      {
        keywordOrMethod: "count.get(ch, 0) + 1",
        plainEnglishExplanation:
          "`d.get(key, default)` reads the value stored under `key`, but if the key isn't there yet it gives back `default` instead of crashing. So `count.get(ch, 0) + 1` means 'the old count (or 0 if we've never seen it), plus one'.",
        exampleSnippet: "count = {'A': 2}\ncount['A'] = count.get('A', 0) + 1\ncount['B'] = count.get('B', 0) + 1\nprint(count)",
        whyWeUseItHere:
          "It's the standard way to add one to a counter, even for a letter we're seeing for the first time.",
      },
      {
        keywordOrMethod: "max(count.values())",
        plainEnglishExplanation:
          "`d.values()` gives all the values stored in a dictionary (ignoring the keys). `max(...)` of those gives the biggest one.",
        exampleSnippet: "count = {'A': 3, 'B': 1, 'C': 2}\nprint(list(count.values()))\nprint(max(count.values()))",
        whyWeUseItHere:
          "The biggest count is how many letters in the window are already the most common letter. Those are the ones we *keep*; everything else must be replaced.",
      },
      {
        keywordOrMethod: "count[s[l]] -= 1",
        plainEnglishExplanation:
          "`x -= 1` is short for `x = x - 1`. Here `x` is the dictionary entry for the letter `s[l]`, so this lowers that letter's count by one.",
        exampleSnippet: "count = {'A': 3}\ncount['A'] -= 1\nprint(count)",
        whyWeUseItHere:
          "When the leftmost letter leaves the window, it no longer counts.",
      },
      {
        keywordOrMethod: "while (r - l + 1) - max(count.values()) > k:",
        plainEnglishExplanation:
          "A `while` loop repeats its block for as long as its condition is `True`. `r - l + 1` is the window's length (both ends included). The brackets just group that calculation so it's done first.",
        exampleSnippet: "l, r = 0, 3\nprint(r - l + 1)\nwhile (r - l + 1) > 2:\n    l += 1\nprint(l)",
        whyWeUseItHere:
          "Window length minus the most common letter's count is how many letters we'd have to replace. If that's more than `k`, the window is too big, so we keep shrinking it from the left.",
      },
    ],
    visualizerType: "sliding-window",
    visualization: {
      input: { s: "AABABBA", k: 1 },
      pointers: { s: ["l", "r"] },
      windows: [{ array: "s", start: "l", end: "r" }],
      focus: ["s", "count", "best"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine painting a stretch of fence boards so they're all one colour, but you only have enough paint for `k` boards. For any stretch, the cheapest plan is to keep the most common colour and repaint everything else. So a stretch is affordable when `length - (count of most common letter) ≤ k`. Slide a window along the fence: grow it on the right, and whenever the repaint bill goes over `k`, drop boards from the left until it's affordable again. The biggest affordable window you ever see is the answer.",
      edgeCases: [
        "`k = 0`: no replacements allowed, so the answer is the longest run of one letter as it already is (e.g. `\"ABAA\"` gives 2).",
        "`k` is at least the length of the string: every window is affordable, so the answer is `len(s)`.",
        "All letters different, like `\"ABCDE\"` with `k = 1`: you can fix one letter in a pair, so the answer is 2.",
      ],
      stepByStepWalkthrough: [
        "Start with an empty dictionary `count`, the left edge `l = 0` and `best = 0`.",
        "Move `r` across the string. Add `s[r]` to the window by increasing `count[s[r]]`.",
        "Work out the replacements needed: window length `r - l + 1` minus the biggest count in `count`.",
        "While that's more than `k`, shrink the window: lower `count[s[l]]` and move `l` one step right.",
        "The window is now affordable. Update `best` with its length `r - l + 1`.",
        "After the loop, return `best`.",
      ],
    },
    hints: {
      conceptual:
        "For one fixed stretch of the string, which letter should you turn everything into, and how many replacements does that cost? Now: as a stretch grows by one letter, can that cost only stay the same or go up?",
      structural:
        "Use a dictionary of letter counts for the window and two indices `l` and `r`. Loop `for r in range(len(s)):`, add `s[r]` to the counts, and use `while (r - l + 1) - max(count.values()) > k:` to shrink from the left.",
    },
    commonMistakes: [
      "Only considering windows made of the *first* letter in the window. The letter to keep is the most common one in the window, whatever it is.",
      "Forgetting to lower `count[s[l]]` when the left edge moves. The counts then describe letters that are no longer in the window, and the cost check goes wrong.",
      "Thinking you must actually change the string. You only need the *length*, so just count; never build new strings.",
    ],
    starterCode: `def character_replacement(s: str, k: int) -> int:
    # Return the longest stretch that can become one repeated letter with <= k changes.
    # Tip: a window is fine if (its length - count of its most common letter) <= k.
    pass
`,
    optimalSolution: `def character_replacement(s: str, k: int) -> int:
    # count[letter] = how many times that letter appears in the window s[l..r]
    count = {}
    # l is the left edge of the window
    l = 0
    # best is the longest affordable window seen so far
    best = 0

    # r is the right edge: each step pulls one new letter into the window
    for r in range(len(s)):
        # Count the new letter s[r]
        count[s[r]] = count.get(s[r], 0) + 1

        # Replacements needed = window length - count of its most common letter.
        # More than k? Too expensive: shrink the window from the left
        while (r - l + 1) - max(count.values()) > k:
            # The leftmost letter leaves the window, so it stops counting...
            count[s[l]] -= 1
            # ...and the left edge moves one step right
            l += 1

        # This window can be made all one letter: is it the longest so far?
        best = max(best, r - l + 1)

    return best  # the longest window we could turn into one repeated letter
`,
    bruteForceSolution: `def character_replacement(s: str, k: int) -> int:
    best = 0
    # Try every start i, then grow the end j one letter at a time
    for i in range(len(s)):
        count = {}
        for j in range(i, len(s)):
            count[s[j]] = count.get(s[j], 0) + 1
            # Affordable if the letters that aren't the most common fit in k changes
            if (j - i + 1) - max(count.values()) <= k:
                best = max(best, j - i + 1)
    return best
`,
    harness: { kind: "function", entry: "character_replacement" },
    testCases: [
      {
        input: { s: "ABAB", k: 2 },
        expected: 4,
        description: "Change both B's to A (or both A's to B) to get 4 equal letters.",
      },
      {
        input: { s: "AABABBA", k: 1 },
        expected: 4,
        description: "Change the B in `\"AABA\"` to get `\"AAAA\"`. No window of 5 can be fixed with only one change.",
      },
      {
        input: { s: "A", k: 0 },
        expected: 1,
        description: "A single letter is already a run of length 1.",
      },
      { input: { s: "AAAA", k: 0 }, expected: 4, description: "Already all the same: no changes needed." },
      { input: { s: "ABCDE", k: 1 }, expected: 2, description: "All different: one change fixes a pair, like `\"AB\"` into `\"AA\"`." },
      { input: { s: "ABAA", k: 0 }, expected: 2, description: "With no changes allowed, the best is the existing `\"AA\"` at the end." },
      { input: { s: "ABBB", k: 2 }, expected: 4 },
      { input: { s: "AAABBBCCC", k: 2 }, expected: 5 },
      { input: { s: "ABCABCAB", k: 0 }, expected: 1 },
      { input: { s: "BAAAB", k: 2 }, expected: 5, description: "k covers both B's, so the whole string works." },
    ],
  },

  // ------------------------------------------------------------------ permutation-in-string
  {
    id: "permutation-in-string",
    summary:
      "You get two strings, `s1` and `s2`. Return `True` if some stretch of consecutive characters in `s2` is a **rearrangement** of `s1` (same letters, same amounts, any order). Otherwise return `False`. For example, `\"ba\"` appears inside `\"eidbaooo\"`, and it's a rearrangement of `\"ab\"`.",
    constraints: [
      "1 ≤ len(s1), len(s2) ≤ 10,000",
      "Both strings contain only lowercase English letters",
    ],
    pattern: "Fixed-size sliding window + letter counts",
    timeComplexity: {
      bruteForce: "O(n · m log m)",
      optimal: "O(26 · n) = O(n)",
      explanation:
        "Here n = len(s2) and m = len(s1). Brute force looks at every stretch of length m in `s2` (about n of them) and sorts it (m log m each). The optimal version moves `r` across `s2` once. Each step adds one letter, maybe removes one, and compares two dictionaries. Each dictionary has at most 26 keys (one per letter), so the comparison costs at most 26 steps: a fixed amount, so the total is O(n).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Both dictionaries have at most 26 keys, however long the strings are.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "for ch in s1:",
        plainEnglishExplanation:
          "A `for` loop over a string visits its characters one at a time, from left to right, storing the current one in `ch`.",
        exampleSnippet: "for ch in 'dog':\n    print(ch)",
        whyWeUseItHere:
          "We walk through `s1` once to count how many of each letter it has.",
      },
      {
        keywordOrMethod: "need[ch] = need.get(ch, 0) + 1",
        plainEnglishExplanation:
          "`need` is a dictionary (a key → value lookup table). `need.get(ch, 0)` reads the count stored for `ch`, or gives `0` if `ch` isn't a key yet. Adding 1 and storing it back increases the count.",
        exampleSnippet: "need = {}\nfor ch in 'aab':\n    need[ch] = need.get(ch, 0) + 1\nprint(need)",
        whyWeUseItHere:
          "Two strings are rearrangements of each other exactly when their letter counts match, so we count letters.",
      },
      {
        keywordOrMethod: "del window[key]",
        plainEnglishExplanation:
          "`del d[key]` removes that key (and its value) from the dictionary completely.",
        exampleSnippet: "window = {'a': 1, 'b': 0}\ndel window['b']\nprint(window)",
        whyWeUseItHere:
          "When a letter's count in the window drops to 0, we delete it. Otherwise `{'a': 1, 'b': 0}` would not be equal to `{'a': 1}`, even though they describe the same letters.",
      },
      {
        keywordOrMethod: "window == need",
        plainEnglishExplanation:
          "`==` on two dictionaries is `True` when they have exactly the same keys with exactly the same values. The order the keys were added in doesn't matter.",
        exampleSnippet: "print({'a': 1, 'b': 2} == {'b': 2, 'a': 1})\nprint({'a': 1} == {'a': 2})",
        whyWeUseItHere:
          "If the window's letter counts equal `s1`'s letter counts, the window is a rearrangement of `s1`.",
      },
      {
        keywordOrMethod: "if r - l + 1 > len(s1):",
        plainEnglishExplanation:
          "`r - l + 1` is the number of characters from index `l` to index `r`, both ends included. `len(s1)` is the length of `s1`.",
        exampleSnippet: "l, r = 1, 3\nprint(r - l + 1)\nprint(r - l + 1 > 2)",
        whyWeUseItHere:
          "The window must stay exactly as long as `s1`. As soon as it's one character too long, we drop the leftmost character.",
      },
    ],
    visualizerType: "sliding-window",
    visualization: {
      input: { s1: "ab", s2: "eidbaooo" },
      pointers: { s2: ["l", "r"] },
      windows: [{ array: "s2", start: "l", end: "r" }],
      focus: ["s2", "need", "window"],
      hide: ["ch"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine `s1` is a handful of Scrabble tiles, and `s2` is a long row of tiles on the table. You slide a frame exactly as wide as your hand along the row. Each time the frame moves one step right, one tile enters on the right and one leaves on the left. You don't care about the order of the tiles inside the frame, only *which* tiles and *how many* of each. So keep a tally of the frame's tiles, update it with the one tile that came in and the one that left, and check whether the tally matches your hand.",
      edgeCases: [
        "`s1` is longer than `s2`: no window of that size fits, so return `False` straight away.",
        "Repeated letters, like `s1 = \"aab\"`: counts matter, not just which letters appear. `\"abb\"` has the same letters but the wrong amounts.",
        "The match is at the very end of `s2`: we compare after every step, including the last one.",
        "`s1` and `s2` are equal-length rearrangements of each other: the very first full window matches.",
      ],
      stepByStepWalkthrough: [
        "If `s1` is longer than `s2`, return `False`.",
        "Count the letters of `s1` into a dictionary `need`.",
        "Move `r` across `s2`, adding `s2[r]` to the window's dictionary `window`.",
        "If the window is now longer than `s1`, remove `s2[l]` from `window` (deleting it if its count hits 0) and move `l` right.",
        "If `window == need`, the window is a rearrangement of `s1`: return `True`.",
        "If the loop ends without a match, return `False`.",
      ],
    },
    hints: {
      conceptual:
        "A rearrangement of `s1` always has exactly `len(s1)` characters. So you only ever need to look at stretches of that one length. How can you get from one stretch to the next without recounting everything?",
      structural:
        "Count `s1` into a dictionary. Then loop `for r in range(len(s2)):` with a second dictionary for the window: add `s2[r]`, and when the window gets longer than `len(s1)` remove `s2[l]` and do `l += 1`. Compare the two dictionaries with `==`.",
    },
    commonMistakes: [
      "Checking only *which* letters appear (with a set) instead of how many. `s1 = \"aab\"` is not matched by `\"abb\"`.",
      "Leaving zero counts in the window dictionary. `{'a': 1, 'b': 0}` is not equal to `{'a': 1}`, so a real match gets missed. Delete keys that reach 0.",
      "Re-counting or sorting every window from scratch. It works but is much slower; slide the window and update the counts for just the two letters that changed.",
    ],
    starterCode: `def check_inclusion(s1: str, s2: str) -> bool:
    # Return True if some stretch of s2 is a rearrangement of s1.
    # Tip: slide a window of length len(s1) over s2 and compare letter counts.
    pass
`,
    optimalSolution: `def check_inclusion(s1: str, s2: str) -> bool:
    # A window as long as s1 can't fit inside a shorter s2
    if len(s1) > len(s2):
        return False

    # need[letter] = how many of that letter s1 has
    need = {}
    for ch in s1:
        need[ch] = need.get(ch, 0) + 1

    # window[letter] = how many of that letter the window s2[l..r] has
    window = {}
    # l is the left edge of the window
    l = 0

    # r is the right edge: each step pulls one new letter into the window
    for r in range(len(s2)):
        # Count the new letter on the right
        window[s2[r]] = window.get(s2[r], 0) + 1

        # The window is one letter too long: the leftmost letter leaves
        if r - l + 1 > len(s1):
            window[s2[l]] -= 1
            # A count of 0 means "not in the window": delete it so == works
            if window[s2[l]] == 0:
                del window[s2[l]]
            # Move the left edge one step right
            l += 1

        # Same letters with the same counts: this window rearranges into s1
        if window == need:
            return True

    # No window matched
    return False
`,
    bruteForceSolution: `def check_inclusion(s1: str, s2: str) -> bool:
    target = sorted(s1)
    # Try every stretch of s2 that is exactly len(s1) long
    for start in range(len(s2) - len(s1) + 1):
        piece = s2[start:start + len(s1)]
        # Rearrangements become identical once both are sorted
        if sorted(piece) == target:
            return True
    return False
`,
    harness: { kind: "function", entry: "check_inclusion" },
    testCases: [
      {
        input: { s1: "ab", s2: "eidbaooo" },
        expected: true,
        description: "`\"ba\"` (positions 3-4) uses the same letters as `\"ab\"`.",
      },
      {
        input: { s1: "ab", s2: "eidboaoo" },
        expected: false,
        description: "The b and the a are never next to each other, so no 2-letter stretch matches.",
      },
      {
        input: { s1: "abc", s2: "ab" },
        expected: false,
        description: "`s1` is longer than `s2`, so it can't fit.",
      },
      { input: { s1: "a", s2: "a" }, expected: true },
      { input: { s1: "adc", s2: "dcda" }, expected: true, description: "`\"cda\"` at the end rearranges into `\"adc\"`." },
      { input: { s1: "hello", s2: "ooolleoooleh" }, expected: false },
      { input: { s1: "aab", s2: "abbb" }, expected: false, description: "`\"abb\"` has the right letters but the wrong amounts." },
      { input: { s1: "aab", s2: "cbaab" }, expected: true },
      { input: { s1: "xyz", s2: "abcxzy" }, expected: true, description: "The match is the last three letters." },
      { input: { s1: "ab", s2: "ba" }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ minimum-window-substring
  {
    id: "minimum-window-substring",
    summary:
      "You get two strings, `s` and `t`. Find the **shortest stretch of consecutive characters in `s`** that contains every character of `t`, including repeats (if `t` has two `a`s, the stretch needs at least two `a`s). Return that stretch. If no stretch works, return the empty string `\"\"`. Upper and lower case count as different letters. The answer is guaranteed to be unique.",
    constraints: [
      "1 ≤ len(s), len(t) ≤ 100,000",
      "s and t contain upper- and lowercase English letters",
      "The shortest window is unique when it exists",
    ],
    pattern: "Variable-size sliding window: grow until valid, shrink while valid",
    timeComplexity: {
      bruteForce: "O(n² · m)",
      optimal: "O(n + m)",
      explanation:
        "Here n = len(s) and m = len(t). Brute force tries every start and end (about n² windows) and checks the counts each time. The optimal version counts `t` once (m steps), then `r` moves across `s` once and `l` also only ever moves forward, so each character of `s` enters the window once and leaves at most once. Every step inside is O(1) dictionary work, so the total is O(n + m).",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The two dictionaries have at most 52 keys (upper- and lowercase letters), which is a fixed number. (If any character were allowed, it would be O(number of different characters).)",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "need[ch] = need.get(ch, 0) + 1",
        plainEnglishExplanation:
          "`need` is a dictionary: a lookup table from keys to values. `need.get(ch, 0)` reads the value for `ch`, or `0` if `ch` isn't a key yet. Adding 1 and storing it back counts one more `ch`.",
        exampleSnippet: "need = {}\nfor ch in 'ABA':\n    need[ch] = need.get(ch, 0) + 1\nprint(need)",
        whyWeUseItHere:
          "`need` records how many of each letter `t` has; `window` records the same for the current window.",
      },
      {
        keywordOrMethod: "best_len = float(\"inf\")",
        plainEnglishExplanation:
          "`float(\"inf\")` is Python's *infinity*: a number bigger than every other number. Any real length is smaller than it.",
        exampleSnippet: "best_len = float('inf')\nprint(5 < best_len)\nprint(best_len)",
        whyWeUseItHere:
          "It means 'no valid window found yet'. The first valid window we find is automatically smaller, so it replaces infinity.",
      },
      {
        keywordOrMethod: "if ch in need and window[ch] == need[ch]:",
        plainEnglishExplanation:
          "`ch in need` checks whether `ch` is a key of the dictionary. `and` is `True` only if both sides are `True`, and Python stops early if the left side is `False`, so the right side never runs for a letter that isn't in `need` (which would crash).",
        exampleSnippet: "need = {'A': 1}\nch = 'Z'\nprint(ch in need and need[ch] == 1)\nch = 'A'\nprint(ch in need and need[ch] == 1)",
        whyWeUseItHere:
          "We only care about letters that `t` needs, and only at the exact moment their count reaches the required amount.",
      },
      {
        keywordOrMethod: "while have == required:",
        plainEnglishExplanation:
          "A `while` loop repeats its block as long as its condition stays `True`, re-checking before each repetition.",
        exampleSnippet: "have = 3\nwhile have == 3:\n    print('still valid')\n    have -= 1\nprint(have)",
        whyWeUseItHere:
          "As long as the window still contains everything `t` needs, we keep trying to make it shorter from the left.",
      },
      {
        keywordOrMethod: "s[best_start:best_start + best_len]",
        plainEnglishExplanation:
          "`s[a:b]` is *slicing*: it gives a new string with the characters from index `a` up to, but **not including**, index `b`.",
        exampleSnippet: "s = 'ADOBECODEBANC'\nprint(s[9:13])\nprint(s[0:3])",
        whyWeUseItHere:
          "We only remember where the best window starts and how long it is, then cut it out of `s` once at the end.",
      },
    ],
    visualizerType: "sliding-window",
    visualization: {
      input: { s: "XAYBZCAB", t: "ABC" },
      pointers: { s: ["l", "r"] },
      windows: [{ array: "s", start: "l", end: "r" }],
      focus: ["s", "need", "window", "have", "best_len"],
      hide: ["ch"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a shopping list (`t`) and a long aisle of items (`s`). You walk forward through the aisle, dropping items into your basket (`r` moves right), until the basket holds everything on the list. Now the basket is 'complete', but it's probably full of junk you picked up at the start. So you take items out from the front (`l` moves right) for as long as the basket stays complete, noting the smallest complete basket you've seen. The moment removing an item breaks the list, you go back to walking forward. Instead of re-checking the whole list each time, you keep a counter `have`: how many list items currently have enough copies in the basket.",
      edgeCases: [
        "`t` is longer than `s`, or needs more copies than `s` has (like `s = \"a\"`, `t = \"aa\"`): no window is ever complete, so return `\"\"`.",
        "Repeated letters in `t`: a letter only counts as 'satisfied' once the window holds *as many* copies as `t` has.",
        "Case matters: `\"a\"` and `\"A\"` are different characters.",
        "The whole of `s` is the answer, e.g. `s = \"aa\"`, `t = \"aa\"`.",
      ],
      stepByStepWalkthrough: [
        "Count the letters of `t` into `need`. `required` is how many *different* letters `t` has.",
        "Move `r` across `s`. Add `s[r]` to the `window` counts. If that letter's count just reached exactly what `t` needs, increase `have`.",
        "While `have == required`, the window is complete: if it's shorter than the best so far, remember its start and length.",
        "Still inside that loop, remove `s[l]` from the window. If that drops a needed letter below its required amount, decrease `have`. Move `l` right.",
        "Keep going until `r` reaches the end of `s`.",
        "If no complete window was found, return `\"\"`. Otherwise slice out the best window and return it.",
      ],
    },
    hints: {
      conceptual:
        "If a window contains everything you need, so does any bigger window around it. So: grow the window until it's complete, then shrink it from the left as far as you can. Also, rather than comparing whole count tables at every step, can you keep one number that tells you how many letters are fully satisfied?",
      structural:
        "Use two dictionaries (`need` for `t`, `window` for the current window), a counter `have`, and two indices. The outer loop is `for r in range(len(s)):`; inside it, a `while have == required:` loop records the window and shrinks it with `l += 1`. Track the best window by its start and length, and slice it out at the end.",
    },
    commonMistakes: [
      "Increasing `have` every time a needed letter is added, instead of only when its count *reaches exactly* the required amount. Extra copies would then be counted again and again.",
      "Decreasing `have` whenever a needed letter leaves. It should only drop when the count falls *below* what `t` needs; extra copies can leave freely.",
      "Recording the window only once per `r`. You must check the length inside the shrinking loop, because the window gets shorter on every pass.",
      "Building and storing substrings at every step (slow). Store just the start index and length, and slice once at the end.",
    ],
    starterCode: `def min_window(s: str, t: str) -> str:
    # Return the shortest stretch of s that contains every character of t (with repeats).
    # Tip: grow the window until it has everything, then shrink it from the left.
    pass
`,
    optimalSolution: `def min_window(s: str, t: str) -> str:
    # need[letter] = how many of that letter t contains
    need = {}
    for ch in t:
        need[ch] = need.get(ch, 0) + 1

    # window[letter] = how many of that letter the window s[l..r] contains
    window = {}
    # have = how many different letters have enough copies in the window right now
    have = 0
    # The window is complete when every different letter of t has enough copies
    required = len(need)

    # Where the shortest complete window starts, and its length (infinity = none yet)
    best_start = 0
    best_len = float("inf")
    # l is the left edge of the window
    l = 0

    # r is the right edge: each step pulls one new character into the window
    for r in range(len(s)):
        # Count the new character
        ch = s[r]
        window[ch] = window.get(ch, 0) + 1
        # Did this letter just reach the amount t needs? One more letter satisfied
        if ch in need and window[ch] == need[ch]:
            have += 1

        # The window has everything: remember it, then try to make it shorter
        while have == required:
            # Shorter than the best complete window so far? Remember it
            if r - l + 1 < best_len:
                best_start = l  # where the new best window starts
                best_len = r - l + 1  # and how long it is
            # The leftmost character leaves the window
            left_ch = s[l]
            window[left_ch] -= 1
            # Did that leave a needed letter short? Then the window is incomplete
            if left_ch in need and window[left_ch] < need[left_ch]:
                have -= 1
            # Move the left edge one step right
            l += 1

    # Still infinity: no window ever contained all of t
    if best_len == float("inf"):
        return ""
    # Cut the shortest complete window out of s
    return s[best_start:best_start + best_len]
`,
    bruteForceSolution: `def min_window(s: str, t: str) -> str:
    need = {}
    for ch in t:
        need[ch] = need.get(ch, 0) + 1

    best = ""
    # Try every start i; grow the end j until the window has everything
    for i in range(len(s)):
        counts = {}
        for j in range(i, len(s)):
            counts[s[j]] = counts.get(s[j], 0) + 1
            complete = True
            for ch in need:
                if counts.get(ch, 0) < need[ch]:
                    complete = False
            if complete:
                if best == "" or j - i + 1 < len(best):
                    best = s[i:j + 1]
                # Any longer window from this start would only be worse
                break
    return best
`,
    harness: { kind: "function", entry: "min_window" },
    testCases: [
      {
        input: { s: "ADOBECODEBANC", t: "ABC" },
        expected: "BANC",
        description: "`\"BANC\"` (the last four letters) holds an A, a B and a C. No shorter stretch has all three.",
      },
      {
        input: { s: "a", t: "a" },
        expected: "a",
        description: "The whole string is the window.",
      },
      {
        input: { s: "a", t: "aa" },
        expected: "",
        description: "`t` needs two a's but `s` only has one, so no window works.",
      },
      { input: { s: "ab", t: "b" }, expected: "b" },
      { input: { s: "aa", t: "aa" }, expected: "aa" },
      { input: { s: "bba", t: "ab" }, expected: "ba" },
      { input: { s: "abc", t: "xyz" }, expected: "", description: "None of the letters exist in `s`." },
      { input: { s: "cabwefgewcwaefgcf", t: "cae" }, expected: "cwae" },
      { input: { s: "AaBb", t: "ab" }, expected: "aBb", description: "Case matters: the uppercase A and B don't count." },
      { input: { s: "aaflslflsldkalskaaa", t: "aaa" }, expected: "aaa", description: "Three a's in a row, right at the end." },
    ],
  },

  // ------------------------------------------------------------------ sliding-window-maximum
  {
    id: "sliding-window-maximum",
    summary:
      "You get a list of numbers `nums` and a window size `k`. Imagine a frame exactly `k` numbers wide that starts at the left end and slides right one position at a time until it reaches the right end. Return a list with the **largest number inside the frame** at each position, from left to right.",
    constraints: [
      "1 ≤ len(nums) ≤ 100,000",
      "-10,000 ≤ nums[i] ≤ 10,000",
      "1 ≤ k ≤ len(nums)",
    ],
    pattern: "Sliding window + monotonic deque (indices, values decreasing)",
    timeComplexity: {
      bruteForce: "O(n · k)",
      optimal: "O(n)",
      explanation:
        "Brute force takes `max` of every window, which looks at k numbers for each of about n windows. In the optimal version, each index is added to the deque exactly once and removed at most once (from the back or the front). All deque operations are O(1), so even though there's a `while` inside the `for`, the total work across the whole run is O(n).",
    },
    spaceComplexity: {
      optimal: "O(k)",
      explanation:
        "The deque only ever holds indices from the current window, so at most k of them. (The output list holds n - k + 1 numbers, which we don't usually count as extra space.)",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import deque",
        plainEnglishExplanation:
          "`collections` is a module (a toolbox) that ships with Python. This line brings its `deque` tool into your file. A *deque* (say 'deck', short for double-ended queue) is like a list where adding or removing at **either end** is instant.",
        exampleSnippet: "from collections import deque\nq = deque()\nq.append(1)\nq.append(2)\nprint(q)",
        whyWeUseItHere:
          "We need to remove from the *front* (old indices sliding out) and the *back* (smaller values being replaced). A normal list's `pop(0)` is slow because it shifts everything left; `deque.popleft()` is O(1).",
      },
      {
        keywordOrMethod: "q.append(x) / q.pop() / q.popleft()",
        plainEnglishExplanation:
          "`append(x)` adds `x` at the right (back) end. `pop()` removes and returns the item at the back. `popleft()` removes and returns the item at the front (left end).",
        exampleSnippet: "from collections import deque\nq = deque([10, 20, 30])\nq.pop()\nprint(q)\nq.popleft()\nprint(q)",
        whyWeUseItHere:
          "New indices join at the back; useless smaller ones are popped from the back; indices that slid out of the window are popped from the front.",
      },
      {
        keywordOrMethod: "q[0] and q[-1]",
        plainEnglishExplanation:
          "`q[0]` reads the first (front) item without removing it. A negative index counts from the end, so `q[-1]` reads the last (back) item.",
        exampleSnippet: "from collections import deque\nq = deque([4, 7, 9])\nprint(q[0])\nprint(q[-1])",
        whyWeUseItHere:
          "The front holds the index of the window's maximum; the back is where we compare against the incoming number.",
      },
      {
        keywordOrMethod: "while q and nums[q[-1]] < nums[r]:",
        plainEnglishExplanation:
          "An empty deque (or list) counts as `False` in a condition, and a non-empty one counts as `True`. So `q and ...` means 'q is not empty, and also ...'. Python checks the left side first and skips the right side if q is empty, which avoids reading `q[-1]` from an empty deque (a crash).",
        exampleSnippet: "from collections import deque\nq = deque()\nprint(bool(q))\nq.append(5)\nprint(bool(q))",
        whyWeUseItHere:
          "We keep popping from the back while there is something to pop and it's smaller than the new number.",
      },
      {
        keywordOrMethod: "result.append(nums[q[0]])",
        plainEnglishExplanation:
          "`q[0]` is an index; `nums[q[0]]` reads the number at that index. `result.append(...)` adds it to the end of the `result` list.",
        exampleSnippet: "nums = [5, 8, 2]\nresult = []\nresult.append(nums[1])\nprint(result)",
        whyWeUseItHere:
          "The deque stores *positions*, not values, so we look the value up before adding it to the answer.",
      },
    ],
    visualizerType: "sliding-window",
    visualization: {
      input: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 },
      pointers: { nums: ["l", "r"] },
      windows: [{ array: "nums", start: "l", end: "r" }],
      focus: ["nums", "q", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine a queue of people waiting to be crowned 'tallest in the window'. When a new person arrives, everyone at the back of the queue who is shorter than them leaves for good: the newcomer is taller *and* will stay in the window longer, so those shorter people can never be the tallest again. That keeps the queue sorted from tallest (front) to shortest (back). The person at the front is always the current tallest, unless they've already walked out of the window on the left, in which case they leave from the front. We store each person's position (index) so we can tell when they've slid out.",
      edgeCases: [
        "`k = 1`: every window is a single number, so the answer is just `nums` itself.",
        "`k = len(nums)`: there's only one window, so the answer is a one-item list with the overall maximum.",
        "Equal numbers like `[4, 4, 4, 4]`: we only pop strictly smaller values, so an equal older index stays in front. Either way the maximum value is the same.",
        "A strictly decreasing list: nothing is ever popped from the back, so the front must be removed when it slides out of the window.",
      ],
      stepByStepWalkthrough: [
        "Create an empty deque `q` (it will hold indices) and an empty `result` list. Set the window's left edge `l = 0`.",
        "Move `r` across `nums`. While the back of `q` points at a number smaller than `nums[r]`, pop it: it can never be a maximum again.",
        "Append `r` to the back of `q`.",
        "If the front index `q[0]` is less than `l`, it has slid out of the window: `popleft()` it.",
        "Once the window holds `k` numbers (`r + 1 >= k`), the front of `q` is the window's maximum: append `nums[q[0]]` to `result`, then move `l` right by one.",
        "After the loop, return `result`.",
      ],
    },
    hints: {
      conceptual:
        "When a big number enters the window, every smaller number that entered *before* it is now useless: it will leave the window sooner and it's smaller. So which numbers are worth remembering at all?",
      structural:
        "Use a `deque` of indices whose values decrease from front to back. In `for r in range(len(nums)):`, pop smaller values off the back with a `while` loop, append `r`, drop the front if it's left the window, and once `r + 1 >= k` record `nums[q[0]]`.",
    },
    commonMistakes: [
      "Storing values instead of indices in the deque. Then you can't tell when the front has slid out of the window.",
      "Calling `max()` on every window. It's correct but O(n · k), too slow when both n and k are large.",
      "Using a plain list and `pop(0)` for the front. That shifts every remaining item, which is O(k) each time.",
      "Recording a result before the first window is full. Results only start once `r + 1 >= k`, so there are `len(nums) - k + 1` of them.",
    ],
    starterCode: `from collections import deque


def max_sliding_window(nums: list[int], k: int) -> list[int]:
    # Return the largest number in every window of size k, from left to right.
    # Tip: a deque of indices whose numbers keep decreasing makes the max easy to find.
    pass
`,
    optimalSolution: `from collections import deque


def max_sliding_window(nums: list[int], k: int) -> list[int]:
    # result collects the maximum of each window, from left to right
    result = []
    # q holds indices whose numbers DEcrease from front to back,
    # so the front is always the index of the window's biggest number
    q = deque()
    # l is the left edge of the window
    l = 0

    # r is the right edge: each step pulls one new number into the window
    for r in range(len(nums)):
        # Numbers at the back that are smaller than nums[r] can never be a max again
        while q and nums[q[-1]] < nums[r]:
            q.pop()
        # The new index joins at the back
        q.append(r)

        # The front index has slid out of the window on the left: drop it
        if q[0] < l:
            q.popleft()

        # Once the window holds k numbers, its maximum is at the front of q
        if r + 1 >= k:
            result.append(nums[q[0]])
            # Slide the left edge so the next window starts one step further right
            l += 1

    return result
`,
    bruteForceSolution: `def max_sliding_window(nums: list[int], k: int) -> list[int]:
    result = []
    # Look at every window nums[start .. start + k - 1] and take its max
    for start in range(len(nums) - k + 1):
        result.append(max(nums[start:start + k]))
    return result
`,
    harness: { kind: "function", entry: "max_sliding_window" },
    testCases: [
      {
        input: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 },
        expected: [3, 3, 5, 5, 6, 7],
        description: "Windows: [1,3,-1] → 3, [3,-1,-3] → 3, [-1,-3,5] → 5, [-3,5,3] → 5, [5,3,6] → 6, [3,6,7] → 7.",
      },
      {
        input: { nums: [1], k: 1 },
        expected: [1],
        description: "One number, one window.",
      },
      {
        input: { nums: [1, -1], k: 1 },
        expected: [1, -1],
        description: "With k = 1 each window is a single number, so the answer is the list itself.",
      },
      { input: { nums: [9, 8, 7, 6, 5], k: 2 }, expected: [9, 8, 7, 6], description: "Decreasing: the max is always the window's first number." },
      { input: { nums: [1, 2, 3, 4, 5], k: 2 }, expected: [2, 3, 4, 5], description: "Increasing: the max is always the newest number." },
      { input: { nums: [4, 4, 4, 4], k: 2 }, expected: [4, 4, 4] },
      { input: { nums: [7, 2, 4], k: 3 }, expected: [7], description: "k equals the length: a single window." },
      { input: { nums: [1, 3, 1, 2, 0, 5], k: 3 }, expected: [3, 3, 2, 5] },
      { input: { nums: [-7, -8, 7, 5, 7, 1, 6, 0], k: 4 }, expected: [7, 7, 7, 7, 7] },
    ],
  },
];

export default problems;
