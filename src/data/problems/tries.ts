import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ implement-trie-prefix-tree
  {
    id: "implement-trie-prefix-tree",
    summary:
      "A **Trie** (pronounced 'try') or **prefix tree** is a tree data structure used to store and search strings efficiently. Implement the `Trie` class with three methods: `insert(word)` to store a word, `search(word)` to check if the exact word exists, and `starts_with(prefix)` to check if any word starts with the given prefix.",
    constraints: [
      "1 ≤ len(word), len(prefix) ≤ 2,000",
      "word and prefix consist only of lowercase English letters",
      "At most 30,000 calls will be made in total across insert, search, and starts_with",
    ],
    pattern: "Tree of character branches with end-of-word markers",
    timeComplexity: {
      bruteForce: "O(n × m) where n is word count and m is length",
      optimal: "O(m) per operation, where m is word length",
      explanation:
        "In a flat list of words, checking whether any word starts with a prefix takes O(n × m) because you might check every word. In a Trie, each character corresponds to one edge traversal, taking exactly m steps for a word of length m, completely independent of how many total words are stored.",
    },
    spaceComplexity: {
      optimal: "O(total characters inserted × 26)",
      explanation:
        "In the worst case where words share no common prefixes, each character creates one TrieNode. Each node stores a dictionary of character branches.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class TrieNode: self.children = {}",
        plainEnglishExplanation:
          "Each node in the tree stores a dictionary `children` mapping a character to the next `TrieNode`. For example, if 'cat' is stored, the root node's children will have a key `'c'` pointing to a child node.",
        exampleSnippet:
          "class Node:\n    def __init__(self):\n        self.children = {}\nroot = Node()\nroot.children['a'] = Node()\nprint('a' in root.children)",
        whyWeUseItHere:
          "Dictionaries allow O(1) branching on any character without needing fixed-size arrays.",
      },
      {
        keywordOrMethod: "node = node.children[char]",
        plainEnglishExplanation:
          "Advances our traversal pointer from the current node down to its child node matching `char`, moving one step deeper into the tree.",
        exampleSnippet:
          "class Step:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\na = Step('first')\na.next = Step('second')\ncurr = a\ncurr = curr.next\nprint(curr.val)",
        whyWeUseItHere:
          "We walk letter-by-letter down the tree to insert, search, or check prefixes.",
      },
      {
        keywordOrMethod: "node.is_end_of_word = True",
        plainEnglishExplanation:
          "A boolean flag that distinguishes a complete inserted word from a mere prefix. For instance, inserting 'apple' creates nodes for 'a', 'p', 'p', 'l', 'e', but only 'e' has `is_end_of_word = True`.",
        exampleSnippet:
          "class Box:\n    def __init__(self):\n        self.is_full = False\nb = Box()\nb.is_full = True\nprint(b.is_full)",
        whyWeUseItHere:
          "Allows `search('app')` to return False even though `starts_with('app')` returns True.",
      },
      {
        keywordOrMethod: "if char not in node.children:",
        plainEnglishExplanation:
          "Checks whether the current node already has a branch for `char`. If not, we create one during `insert`, or return `False` during `search`.",
        exampleSnippet:
          "lookup = {'x': 1}\nprint('y' not in lookup)",
        whyWeUseItHere:
          "Safely checks if the character path exists before indexing into `node.children`.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: {
        operations: ["Trie", "insert", "search", "search", "starts_with", "insert", "search"],
        arguments: [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
      },
    },
    intuitiveExplanation: {
      intuition:
        "Think of an alphabetical dictionary or contact book. Words that share the same start (like 'app', 'apple', 'application') share the same beginning path. Instead of writing 'app', 'apple', and 'application' completely separately, you write 'a' -> 'p' -> 'p'. At the second 'p', you place a small bookmark saying 'app ends here'. Then you continue branching off to 'l' -> 'e' ('apple'). To search for a word, follow the letters: if you reach the end and see a bookmark, the word exists! To check a prefix, you just check if the path exists.",
      edgeCases: [
        "Searching for a prefix that is not a complete word: `starts_with('app')` should return `True`, but `search('app')` must return `False` if only `'apple'` was inserted.",
        "Inserting duplicate words: inserting the same word multiple times simply traverses existing nodes and re-marks the end node as `True`.",
        "Single-character words: a one-letter word creates one node off the root and marks `is_end_of_word = True`.",
      ],
      stepByStepWalkthrough: [
        "Define a helper class `TrieNode` with `self.children = {}` and `self.is_end_of_word = False`.",
        "In `Trie.__init__`, create an empty root node `self.root = TrieNode()` representing the empty prefix.",
        "In `insert(word)`, start at `node = self.root`. For each character, if it isn't in `node.children`, create a new `TrieNode()`. Move `node = node.children[char]`. At the end of the word, set `node.is_end_of_word = True`.",
        "In `search(word)`, walk from `self.root`. If any character is missing from `node.children`, return `False`. At the end, return `node.is_end_of_word`.",
        "In `starts_with(prefix)`, walk from `self.root`. If any character is missing, return `False`. If all characters exist, return `True`.",
      ],
    },
    hints: {
      conceptual:
        "How can words with common prefixes share nodes so you only need to store each prefix once?",
      structural:
        "Create a `TrieNode` class with a dictionary `children` and a boolean `is_end_of_word`. In `Trie`, `self.root = TrieNode()`. Follow characters down the tree using `node = node.children[char]`.",
    },
    commonMistakes: [
      "Returning `True` in `search` just because the characters exist, without checking `node.is_end_of_word`. That would make `search('app')` return `True` when only `'apple'` was inserted.",
      "Using a fixed list of size 26 instead of a dictionary: while valid, dictionaries (`{}`) are more flexible and idiomatic in Python.",
      "Recreating `self.root` inside `insert`, wiping out previously inserted words.",
    ],
    starterCode: `class Trie:
    def __init__(self):
        # Initialize your data structure here.
        pass

    def insert(self, word: str) -> None:
        # Inserts a word into the trie.
        pass

    def search(self, word: str) -> bool:
        # Returns True if the word is in the trie, False otherwise.
        pass

    def starts_with(self, prefix: str) -> bool:
        # Returns True if there is any word in the trie that starts with the given prefix.
        pass
`,
    optimalSolution: `class TrieNode:
    def __init__(self):
        # Map character -> child TrieNode
        self.children = {}
        # True if this node marks the end of a valid inserted word
        self.is_end_of_word = False


class Trie:
    def __init__(self):
        # The root node represents an empty prefix
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            # If the branch doesn't exist yet, create a new child node
            if char not in node.children:
                node.children[char] = TrieNode()
            # Advance to the child node
            node = node.children[char]
        # Mark the final node as a complete word
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            # If any character path is missing, the word was never inserted
            if char not in node.children:
                return False
            node = node.children[char]
        # Must be marked as the end of a word (not just a prefix)
        return node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            # If any character path is missing, no word starts with prefix
            if char not in node.children:
                return False
            node = node.children[char]
        # Successfully walked the entire prefix
        return True
`,
    bruteForceSolution: `class Trie:
    def __init__(self):
        self.words = set()

    def insert(self, word: str) -> None:
        self.words.add(word)

    def search(self, word: str) -> bool:
        return word in self.words

    def starts_with(self, prefix: str) -> bool:
        return any(w.startswith(prefix) for w in self.words)
`,
    harness: { kind: "design", entry: "Trie" },
    testCases: [
      {
        input: {
          operations: ["Trie", "insert", "search", "search", "starts_with", "insert", "search"],
          arguments: [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
        },
        expected: [null, null, true, false, true, null, true],
        description:
          "Insert 'apple': search('apple') is True, but search('app') is False until 'app' is inserted. starts_with('app') is True throughout.",
      },
      {
        input: {
          operations: ["Trie", "insert", "search", "starts_with"],
          arguments: [[], ["dog"], ["cat"], ["do"]],
        },
        expected: [null, null, false, true],
        description:
          "Searching for missing word 'cat' returns False; starts_with('do') returns True for prefix of 'dog'.",
      },
      {
        input: {
          operations: ["Trie", "insert", "insert", "search", "search", "starts_with", "starts_with"],
          arguments: [[], ["a"], ["ab"], ["a"], ["ab"], ["a"], ["b"]],
        },
        expected: [null, null, null, true, true, true, false],
        description: "Single-letter word 'a' and two-letter word 'ab'.",
      },
      {
        input: {
          operations: ["Trie", "starts_with", "search"],
          arguments: [[], ["hello"], ["hello"]],
        },
        expected: [null, false, false],
      },
      {
        input: {
          operations: ["Trie", "insert", "insert", "search", "starts_with"],
          arguments: [[], ["banana"], ["band"], ["ban"], ["ban"]],
        },
        expected: [null, null, null, false, true],
      },
      {
        input: {
          operations: ["Trie", "insert", "insert", "search", "search"],
          arguments: [[], ["same"], ["same"], ["same"], ["diff"]],
        },
        expected: [null, null, null, true, false],
      },
    ],
  },

  // ------------------------------------------------------------------ design-add-and-search-words-data-structure
  {
    id: "design-add-and-search-words-data-structure",
    summary:
      "Design a data structure that supports adding new words and finding if a string matches any previously added word. Implement the `WordDictionary` class with methods `add_word(word)` and `search(word)`. In `search(word)`, the dot character `'.'` can match any letter.",
    constraints: [
      "1 ≤ len(word) ≤ 25",
      "word in add_word consists of lowercase English letters",
      "word in search consists of '.' or lowercase English letters",
      "At most 2 dots in any search query",
      "At most 10,000 calls will be made in total",
    ],
    pattern: "Trie with DFS backtracking for wildcard dot character",
    timeComplexity: {
      bruteForce: "O(n × m) where n is word count and m is length",
      optimal: "O(m) without wildcards, O(26^k × m) for k dots",
      explanation:
        "Adding a word takes O(m) where m is word length. Searching a word without dots takes O(m). When a dot appears, the search checks all existing child branches. Since there are at most 2 dots, the search explores at most 26² = 676 branches, making search extremely fast.",
    },
    spaceComplexity: {
      optimal: "O(total characters inserted × 26)",
      explanation:
        "Each character node stores a dictionary of children links.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def dfs(index: int, node: TrieNode) -> bool:",
        plainEnglishExplanation:
          "A recursive helper function. `index` tells us which letter in the search string we are inspecting, and `node` is the current spot in the Trie.",
        exampleSnippet:
          "def search_num(idx, nums, target):\n    if idx == len(nums): return False\n    if nums[idx] == target: return True\n    return search_num(idx + 1, nums, target)\nprint(search_num(0, [1, 2, 3], 2))",
        whyWeUseItHere:
          "Because the dot `.` can match multiple different paths, recursion lets us explore each possible branch.",
      },
      {
        keywordOrMethod: "for child in node.children.values():",
        plainEnglishExplanation:
          "`node.children.values()` gives all child `TrieNode` objects that exist below this node, regardless of what character they represent.",
        exampleSnippet:
          "d = {'a': 1, 'b': 2}\nfor val in d.values():\n    print(val)",
        whyWeUseItHere:
          "When the query character is `.` (wildcard), we must test every valid branch that starts from this node.",
      },
      {
        keywordOrMethod: "if char == '.':",
        plainEnglishExplanation:
          "Checks if the current query character is the wildcard dot `.`.",
        exampleSnippet:
          "query = '.ad'\nprint(query[0] == '.')",
        whyWeUseItHere:
          "Diverts execution between normal single-character lookup and multi-branch wildcard exploration.",
      },
      {
        keywordOrMethod: "if index == len(word): return node.is_end_of_word",
        plainEnglishExplanation:
          "The recursion base case. Once we've matched all characters in `word`, we check if the node we landed on is marked as a complete word.",
        exampleSnippet:
          "class Node:\n    is_end = True\nnode = Node()\nprint(node.is_end)",
        whyWeUseItHere:
          "Prevents matching prefixes that aren't complete words.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: {
        operations: ["WordDictionary", "add_word", "add_word", "add_word", "search", "search", "search", "search"],
        arguments: [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
      },
    },
    intuitiveExplanation: {
      intuition:
        "The words are stored in a standard Trie just like the prefix tree problem. The exciting twist is the wildcard `'.'`. When searching, if you see a normal letter like `'a'`, you take the single path for `'a'`. But when you see `'.'`, it can match ANY letter! So you branch out and try every child that currently exists at this node. If any branch finds a match, the whole search succeeds. This branching search is recursive Depth-First Search (DFS).",
      edgeCases: [
        "Search pattern with only dots like `'...'`: matches any 3-letter word stored in the dictionary.",
        "Dots at the end of the word: must verify that the matched child node has `is_end_of_word == True`.",
        "Searching for a prefix that is not a word: e.g. `'ba'` when only `'bad'` is added should return `False`.",
      ],
      stepByStepWalkthrough: [
        "Define `TrieNode` with `children = {}` and `is_end_of_word = False`.",
        "In `add_word(word)`, traverse from `self.root`, creating child nodes as needed, and mark `node.is_end_of_word = True` at the end.",
        "In `search(word)`, define a recursive helper `dfs(index, node)`.",
        "If `index == len(word)`, return `node.is_end_of_word`.",
        "If `word[index] == '.'`: iterate through all `child in node.children.values()`. If `dfs(index + 1, child)` returns `True` for any child, return `True`. If none match, return `False`.",
        "If `word[index]` is a letter: check if it exists in `node.children`. If not, return `False`. If it does, return `dfs(index + 1, node.children[word[index]])`.",
        "Call `dfs(0, self.root)`.",
      ],
    },
    hints: {
      conceptual:
        "For regular characters, you follow one path down the Trie. What must you do when you hit a wildcard `'.'`? You need to explore every branch that exists from this node!",
      structural:
        "Use a recursive DFS helper: `dfs(index, node)`. If `word[index] == '.'`, loop over `node.children.values()` and recurse. If it's a letter, follow that child directly.",
    },
    commonMistakes: [
      "Looping through all 26 lowercase alphabet letters when hitting `'.'`: iterating over `node.children.values()` is much faster because it only checks characters that were actually inserted.",
      "Forgetting to check `node.is_end_of_word` when `index == len(word)`: returning `True` immediately at the end of the word matches prefixes that are not complete words.",
      "Using regular expressions on a list of words: storing words in a list and running regex checks is O(n × m) and times out on 10,000 queries.",
    ],
    starterCode: `class WordDictionary:
    def __init__(self):
        # Initialize your data structure here.
        pass

    def add_word(self, word: str) -> None:
        # Adds a word into the data structure.
        pass

    def search(self, word: str) -> bool:
        # Returns True if the word matches any added word, where '.' matches any letter.
        pass
`,
    optimalSolution: `class TrieNode:
    def __init__(self):
        # Maps character -> child TrieNode
        self.children = {}
        # True if this node completes an added word
        self.is_end_of_word = False


class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def add_word(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        def dfs(index: int, node: TrieNode) -> bool:
            # Reached the end of the search pattern
            if index == len(word):
                return node.is_end_of_word

            char = word[index]
            # Wildcard: check every available child branch
            if char == ".":
                for child in node.children.values():
                    if dfs(index + 1, child):
                        return True
                return False

            # Specific character: verify branch exists
            if char not in node.children:
                return False

            # Move to the matching child node
            return dfs(index + 1, node.children[char])

        # Start recursive search at the root from character index 0
        return dfs(0, self.root)
`,
    harness: { kind: "design", entry: "WordDictionary" },
    testCases: [
      {
        input: {
          operations: ["WordDictionary", "add_word", "add_word", "add_word", "search", "search", "search", "search"],
          arguments: [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
        },
        expected: [null, null, null, null, false, true, true, true],
        description:
          "'pad' was never added (False). 'bad' is found (True). '.ad' matches 'bad', 'dad', and 'mad' (True). 'b..' matches 'bad' (True).",
      },
      {
        input: {
          operations: ["WordDictionary", "add_word", "search", "search"],
          arguments: [[], ["a"], ["."], [".."]],
        },
        expected: [null, null, true, false],
        description:
          "'.' matches single-letter word 'a'; '..' fails because length is 2 but 'a' has length 1.",
      },
      {
        input: {
          operations: ["WordDictionary", "add_word", "search", "search", "search"],
          arguments: [[], ["at"], ["a"], [".at"], ["an."]],
        },
        expected: [null, null, false, false, false],
        description: "Searching for prefixes or wrong-length words returns False.",
      },
      {
        input: {
          operations: ["WordDictionary", "add_word", "add_word", "search", "search"],
          arguments: [[], ["cat"], ["car"], ["ca."], ["c.."]],
        },
        expected: [null, null, null, true, true],
      },
      {
        input: {
          operations: ["WordDictionary", "add_word", "search", "search"],
          arguments: [[], ["hello"], ["h...o"], ["h...."]],
        },
        expected: [null, null, true, true],
      },
      {
        input: {
          operations: ["WordDictionary", "search"],
          arguments: [[], ["anything"]],
        },
        expected: [null, false],
      },
    ],
  },

  // ------------------------------------------------------------------ word-search-ii
  {
    id: "word-search-ii",
    summary:
      "Given an `m x n` `board` of characters and a list of strings `words`, return all words from the list that can be found in the board. Words must be formed by sequentially adjacent cells (horizontally or vertically neighboring). The same letter cell cannot be used more than once within the same word.",
    constraints: [
      "m == len(board), n == len(board[i])",
      "1 ≤ m, n ≤ 12",
      "board[i][j] is a lowercase English letter",
      "1 ≤ len(words) ≤ 30,000",
      "1 ≤ len(words[i]) ≤ 10",
      "All strings in words are unique",
    ],
    pattern: "Trie-guided 2D Grid DFS backtracking",
    timeComplexity: {
      bruteForce: "O(W × M × N × 4^L) where W is number of words and L is word length",
      optimal: "O(M × N × 4^L)",
      explanation:
        "Running a separate Word Search DFS for every single word in the list of 30,000 words takes O(W × M × N × 4^L) and times out. By loading all words into a single Trie, we search for ALL words simultaneously during a single grid DFS. If a path of letters in the grid does not exist in the Trie, we prune the search immediately.",
    },
    spaceComplexity: {
      optimal: "O(total characters in words)",
      explanation:
        "The Trie stores all words. The grid recursion stack goes at most L levels deep, where L is the maximum word length (up to 10).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class TrieNode: self.word = None",
        plainEnglishExplanation:
          "Instead of just storing `is_end_of_word = True`, we store the full string of the word (`self.word = 'oath'`) at the leaf node.",
        exampleSnippet:
          "class Node:\n    def __init__(self):\n        self.children = {}\n        self.word = None\nroot = Node()\nroot.word = 'oath'\nprint(root.word)",
        whyWeUseItHere:
          "When DFS reaches a completed word node, we can instantly read the word string without reconstructing it from characters.",
      },
      {
        keywordOrMethod: "board[r][c] = '#' (marking visited in-place)",
        plainEnglishExplanation:
          "Temporarily replaces the letter at `(r, c)` with `'#'` so the current path won't reuse this cell. After recursing, we restore the original letter.",
        exampleSnippet:
          "grid = [['a', 'b'], ['c', 'd']]\norig = grid[0][0]\ngrid[0][0] = '#'\nprint('visited:', grid[0][0])\ngrid[0][0] = orig\nprint('restored:', grid[0][0])",
        whyWeUseItHere:
          "Avoids creating an expensive `visited` set by modifying the board directly.",
      },
      {
        keywordOrMethod: "del parent.children[letter] (Trie pruning)",
        plainEnglishExplanation:
          "If a child node has no remaining children of its own, we delete it from the parent's children dictionary.",
        exampleSnippet:
          "children = {'a': 1, 'b': 2}\ndel children['a']\nprint(children)",
        whyWeUseItHere:
          "Once all words down a branch are found, pruning that branch prevents subsequent searches from re-exploring dead ends.",
      },
      {
        keywordOrMethod: "for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:",
        plainEnglishExplanation:
          "Loops through the 4 orthogonal direction deltas: up `(-1, 0)`, down `(1, 0)`, left `(0, -1)`, and right `(0, 1)`.",
        exampleSnippet:
          "r, c = 1, 1\nfor dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n    print(r + dr, c + dc)",
        whyWeUseItHere:
          "Explores all valid neighboring cells on the 2D grid.",
      },
    ],
    visualizerType: "grid",
    visualization: {
      input: {
        board: [
          ["o", "a", "b"],
          ["e", "t", "a"],
          ["i", "h", "k"],
        ],
        words: ["oath", "eat", "tea"],
      },
      focus: ["board", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Searching a 12x12 grid 30,000 times for 30,000 different words is impossible within the time limit. Instead, put all 30,000 words into a Trie. Now explore the board once. From any cell, ask the Trie: 'Do any words begin with this letter?' If yes, step onto a neighboring cell and ask: 'Do any words begin with these two letters?' If the Trie ever says 'no words share this prefix', you immediately STOP exploring that direction (pruning)! Storing the full word string right inside the end TrieNode makes recording found words instant.",
      edgeCases: [
        "Finding the same word multiple times from different paths: after adding `curr_node.word` to `result`, set `curr_node.word = None` to ensure it is never added again.",
        "Single-cell board: e.g. `[['a']]` with word `'a'` matches immediately.",
        "Dead-end branches: removing leaf nodes from the Trie (`del parent.children[letter]`) when they have no children dramatically speeds up the remaining search.",
      ],
      stepByStepWalkthrough: [
        "Define `TrieNode` with `children = {}` and `word = None` (storing the complete word string at end nodes avoids string concatenation during DFS).",
        "Insert every word from `words` into the Trie.",
        "Initialize `result = []`, `rows = len(board)`, and `cols = len(board[0])`.",
        "Define `dfs(r, c, parent)`: read `letter = board[r][c]`. Get `curr_node = parent.children[letter]`.",
        "If `curr_node.word` is not `None`: append `curr_node.word` to `result` and set `curr_node.word = None`.",
        "Temporarily mark the cell as visited with `board[r][c] = '#'`.",
        "For each of the 4 directions `(r + dr, c + dc)`, if the neighbor is in bounds and its letter is in `curr_node.children`, recursively call `dfs` on it.",
        "Restore the original letter `board[r][c] = letter` (backtracking).",
        "Prune the Trie: if `not curr_node.children`, remove `letter` from `parent.children`.",
        "Call `dfs(r, c, root)` for every cell `(r, c)` whose letter is in `root.children`.",
        "Return `result`.",
      ],
    },
    hints: {
      conceptual:
        "Running Word Search I for each word one-by-one is way too slow. How can a prefix tree help you search for thousands of words simultaneously and abandon dead ends instantly?",
      structural:
        "Insert all words into a Trie. Run a DFS over the grid passing the current `TrieNode`. Only step onto neighbors whose characters exist in `node.children`. Set `node.word = None` after adding to avoid duplicate results.",
    },
    commonMistakes: [
      "Running a separate DFS for every word: with 30,000 words, this results in Time Limit Exceeded.",
      "Adding duplicate words to the output: a word might be reachable via multiple distinct paths on the grid. Clear `node.word = None` after finding it.",
      "Forgetting to restore `board[r][c] = letter` after recursing: this corrupts the board for other paths.",
      "Building strings by concatenating characters at every step: storing the full word string directly on the TrieNode saves both time and memory.",
    ],
    starterCode: `def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    # Find all words from words that can be formed on the board.
    # Tip: insert words into a Trie, then explore the grid with DFS.
    pass
`,
    optimalSolution: `class TrieNode:
    def __init__(self):
        # Maps letter -> child TrieNode
        self.children = {}
        # Stores the complete word string at end-of-word nodes, None otherwise
        self.word = None


def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    # Build a Trie containing all target words
    root = TrieNode()
    for w in words:
        node = root
        for char in w:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = w

    rows, cols = len(board), len(board[0])
    result = []

    def dfs(r: int, c: int, parent: TrieNode) -> None:
        letter = board[r][c]
        curr_node = parent.children[letter]

        # If curr_node marks the end of a word, record it
        if curr_node.word is not None:
            result.append(curr_node.word)
            # Set to None so the same word is not added twice from different paths
            curr_node.word = None

        # Mark this cell as visited by overwriting with a placeholder
        board[r][c] = "#"

        # Explore all 4 adjacent cells (up, down, left, right)
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] in curr_node.children:
                dfs(nr, nc, curr_node)

        # Restore original character for backtracking
        board[r][c] = letter

        # Prune leaf nodes to speed up future searches
        if not curr_node.children:
            del parent.children[letter]

    # Start DFS from every cell whose letter starts at least one word in the Trie
    for r in range(rows):
        for c in range(cols):
            if board[r][c] in root.children:
                dfs(r, c, root)

    return result
`,
    bruteForceSolution: `def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    rows, cols = len(board), len(board[0])

    def exists(word: str) -> bool:
        def dfs(r: int, c: int, idx: int) -> bool:
            if idx == len(word):
                return True
            if not (0 <= r < rows and 0 <= c < cols and board[r][c] == word[idx]):
                return False
            temp = board[r][c]
            board[r][c] = "#"
            found = (
                dfs(r + 1, c, idx + 1) or
                dfs(r - 1, c, idx + 1) or
                dfs(r, c + 1, idx + 1) or
                dfs(r, c - 1, idx + 1)
            )
            board[r][c] = temp
            return found

        for r in range(rows):
            for c in range(cols):
                if dfs(r, c, 0):
                    return True
        return False

    # Search for each word individually on the grid
    return [w for w in set(words) if exists(w)]
`,
    harness: { kind: "function", entry: "find_words", compare: "unordered" },
    testCases: [
      {
        input: {
          board: [
            ["o", "a", "a", "n"],
            ["e", "t", "a", "e"],
            ["i", "h", "k", "r"],
            ["i", "f", "l", "v"],
          ],
          words: ["oath", "pea", "eat", "rain"],
        },
        expected: ["eat", "oath"],
        description: "'eat' and 'oath' are found on the board. 'pea' and 'rain' cannot be formed.",
      },
      {
        input: {
          board: [
            ["a", "b"],
            ["c", "d"],
          ],
          words: ["abcb"],
        },
        expected: [],
        description: "Letters cannot be reused within the same word, so 'abcb' cannot be formed.",
      },
      {
        input: {
          board: [["a"]],
          words: ["a"],
        },
        expected: ["a"],
        description: "Single cell matching single-letter word.",
      },
      {
        input: {
          board: [
            ["a", "b"],
            ["c", "d"],
          ],
          words: ["ab", "ac", "bd", "ca"],
        },
        expected: ["ab", "ac", "bd", "ca"],
      },
      {
        input: {
          board: [
            ["a", "a"],
          ],
          words: ["aaa"],
        },
        expected: [],
      },
      {
        input: {
          board: [
            ["o", "a", "b"],
            ["e", "t", "a"],
            ["i", "h", "k"],
          ],
          words: ["oath", "bat", "tab", "xyz"],
        },
        expected: ["oath", "bat", "tab"],
      },
    ],
  },
];

export default problems;
