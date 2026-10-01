import type { ProblemContent } from "../types";

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ invert-binary-tree
  {
    id: "invert-binary-tree",
    summary:
      "You're given the `root` of a binary tree. Turn the tree into its **mirror image**: at every single node, the left child and the right child trade places. Return the root of the mirrored tree. It's the same root node as before, just with everything below it flipped.",
    constraints: [
      "0 ≤ number of nodes ≤ 100",
      "-100 ≤ node value ≤ 100",
      "The tree can be empty (`root` is `None`)",
    ],
    pattern: "Recursive DFS: swap the two children, then repeat on each child",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Every node is visited exactly once, and each visit does one swap, which takes the same tiny amount of time no matter how big the tree is. n nodes × one swap each = O(n). Nothing can be faster, because every node's children must be swapped. (The alternative solution, which walks the tree level by level with a queue, is also O(n).)",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "h is the height of the tree (how many levels it has). While we work deep down, Python keeps one paused call per level on the call stack. A bushy, balanced tree has about log n levels; a tree shaped like a straight stick has n levels, so the worst case is O(n).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` is a small object with three labelled slots: `val` (the number stored in it), `left` (the left child) and `right` (the right child). A child is either another `TreeNode` or `None`, which means 'nothing here'. The dot reads a slot: `node.left` means 'the left child of node'. This site already defines `TreeNode` for you, just like LeetCode does.",
        exampleSnippet:
          "leaf = TreeNode(2)\nroot = TreeNode(1, leaf, None)\nprint(root.val)\nprint(root.left.val)\nprint(root.right)",
        whyWeUseItHere:
          "The whole tree is just TreeNodes linked through their `left` and `right` slots. Inverting it means rewiring those two slots at every node.",
      },
      {
        keywordOrMethod: "def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:",
        plainEnglishExplanation:
          "`def` creates a function. The parts after the colons are *type hints*, notes for humans that Python doesn't enforce. `Optional[TreeNode]` means 'either a TreeNode or `None`'. `Optional` has to be imported first with `from typing import Optional`.",
        exampleSnippet:
          "from typing import Optional\n\ndef describe(node: Optional[TreeNode]) -> str:\n    if node is None:\n        return 'empty'\n    return 'a node holding ' + str(node.val)\n\nprint(describe(TreeNode(7)))\nprint(describe(None))",
        whyWeUseItHere:
          "The input can be an empty tree (`None`) and so can the output, so both are marked `Optional[TreeNode]`.",
      },
      {
        keywordOrMethod: "if root is None: return None",
        plainEnglishExplanation:
          "`x is None` asks 'is x the special nothing value?' and gives `True` or `False`. In a recursive function, this check is the **base case**: the situation simple enough to answer immediately, without calling the function again. Without it, the calls would never stop.",
        exampleSnippet:
          "empty = None\nprint(empty is None)\nnode = TreeNode(5)\nprint(node is None)",
        whyWeUseItHere:
          "Every path down the tree eventually reaches an empty spot. An empty tree is already its own mirror image, so we return right away.",
      },
      {
        keywordOrMethod: "root.left, root.right = root.right, root.left",
        plainEnglishExplanation:
          "This swaps two values in one line. Python first reads everything on the right side of `=` (the current right child, then the current left child), and only then stores them into the slots on the left side. So nothing gets overwritten too early.",
        exampleSnippet:
          "a = 'apple'\nb = 'banana'\na, b = b, a\nprint(a, b)",
        whyWeUseItHere:
          "Swapping the two children is the one job each node has to do.",
      },
      {
        keywordOrMethod: "invert_tree(root.left)  (a function calling itself)",
        plainEnglishExplanation:
          "This is **recursion**: a function that calls itself on a smaller piece of the problem. When it does, Python *pauses* the current call, remembers exactly where it was, and puts the new call on top of the **call stack**. When the new call finishes, it is removed from the stack and the paused call continues from the very next line.",
        exampleSnippet:
          "def visit(node):\n    if node is None:\n        return\n    print('start', node.val)\n    visit(node.left)\n    visit(node.right)\n    print('finish', node.val)\n\nvisit(TreeNode(1, TreeNode(2), TreeNode(3)))",
        whyWeUseItHere:
          "Each child is the root of a smaller tree that needs the exact same treatment, so we hand it to the same function. Watch the stack grow as we go down and shrink as calls finish.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [4, 2, 7, 1, 3, 6, 9] },
      focus: ["root"],
    },
    intuitiveExplanation: {
      intuition:
        "Hold a picture of a tree up to a mirror: everything that pointed left now points right. You don't need to think about the whole tree at once. Stand at one node and do one tiny job: swap your two children. Then give the same instruction to each child: 'now you do the same for your kids.' That's recursion, like a manager who hands the same task to each team lead, who hands it to their own team, and so on. Each manager waits (a paused call on the call stack) until their team reports back. When the last person finishes, every node has swapped its children, and the whole tree is mirrored.",
      edgeCases: [
        "Empty tree (`root` is `None`): the base case returns `None` immediately, and the answer is an empty tree.",
        "A single node: it swaps two `None` children, which changes nothing, so the tree looks the same.",
        "A lopsided tree with only left children becomes a tree with only right children. The code doesn't care about the shape.",
      ],
      stepByStepWalkthrough: [
        "Start a call for the root. If it's `None` (an empty spot), there's nothing to flip, so return `None`. This base case is what stops the recursion.",
        "Swap this node's two children: `root.left, root.right = root.right, root.left`.",
        "Call `invert_tree(root.left)`. The current call pauses and a new call for the left child goes on top of the stack. Watch the stack grow.",
        "That call does the same thing for its own children, going deeper until it reaches `None`. Each finished call is removed from the stack, and the call underneath it continues.",
        "Back in the paused call, do the same for the right child with `invert_tree(root.right)`.",
        "Both sides below are now mirrored, so `return root`. When the very first call returns, the whole tree is done.",
      ],
    },
    hints: {
      conceptual:
        "What does the mirror image of a tree look like? The root stays where it is, its left and right subtrees trade places, and each of those subtrees is *also* mirrored. The problem contains smaller copies of itself.",
      structural:
        "Write a recursive function. Base case: `if root is None: return None`. Otherwise swap with `root.left, root.right = root.right, root.left`, call the same function on `root.left` and on `root.right`, then `return root`.",
    },
    commonMistakes: [
      "Swapping on two separate lines: `root.left = root.right` and then `root.right = root.left`. After the first line the original left child is gone, so both slots end up holding the old right child.",
      "Forgetting the base case. The function then reaches `None` and tries `None.left`, which crashes with `AttributeError: 'NoneType' object has no attribute 'left'`.",
      "Forgetting `return root` at the end. The function then returns `None`, and the judge sees an empty tree.",
      "Swapping only the root's children and not recursing. The top level flips, but every level below it stays the same.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    # Mirror the tree: at every node, the left and right children trade places.
    # Tip: an empty tree (None) is already mirrored. That's your base case.
    pass
`,
    optimalSolution: `from typing import Optional


# A new call starts. It is responsible for one node (root) and everything below it
def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    # Base case: is this an empty spot?
    if root is None:
        return None  # nothing to flip, so this call ends right away

    # Swap this node's two children in a single move
    root.left, root.right = root.right, root.left

    # Pause this call and mirror the whole left subtree (a new call goes on the stack)
    invert_tree(root.left)
    # The left side is finished. Now pause again and mirror the right subtree
    invert_tree(root.right)

    # Both sides below us are mirrored, so this whole subtree is done: hand it back
    return root
`,
    bruteForceSolution: `from collections import deque
from typing import Optional


def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    # Same idea without recursion: visit the nodes level by level using a queue
    if root is None:
        return None
    queue = deque([root])
    while queue:
        node = queue.popleft()
        # Swap this node's children, then line them up to be visited later
        node.left, node.right = node.right, node.left
        if node.left is not None:
            queue.append(node.left)
        if node.right is not None:
            queue.append(node.right)
    return root
`,
    harness: { kind: "function", entry: "invert_tree", argTypes: { root: "tree" }, returnType: "tree" },
    testCases: [
      {
        input: { root: [4, 2, 7, 1, 3, 6, 9] },
        expected: [4, 7, 2, 9, 6, 3, 1],
        description: "2 and 7 trade places, and so do their children, so the bottom row 1, 3, 6, 9 reads 9, 6, 3, 1.",
      },
      {
        input: { root: [2, 1, 3] },
        expected: [2, 3, 1],
        description: "The root keeps its place; its two children swap.",
      },
      {
        input: { root: [] },
        expected: [],
        description: "An empty tree mirrored is still empty.",
      },
      { input: { root: [1] }, expected: [1], description: "A single node has nothing to swap." },
      { input: { root: [1, 2] }, expected: [1, null, 2], description: "A lone left child becomes a lone right child." },
      { input: { root: [1, 2, 3, 4, 5] }, expected: [1, 3, 2, null, null, 5, 4] },
      { input: { root: [1, 2, null, 3, null, 4] }, expected: [1, null, 2, null, 3, null, 4] },
      { input: { root: [-10, 20, -30, 40, -50, 60, -70] }, expected: [-10, -30, 20, -70, 60, -50, 40] },
    ],
  },

  // ------------------------------------------------------------------ maximum-depth-of-binary-tree
  {
    id: "maximum-depth-of-binary-tree",
    summary:
      "You're given the `root` of a binary tree. Return its **depth**: the number of nodes on the longest path that starts at the root and walks down to a leaf (a node with no children). An empty tree has depth 0.",
    constraints: [
      "0 ≤ number of nodes ≤ 10,000",
      "-100 ≤ node value ≤ 100",
    ],
    pattern: "Recursive DFS: a node's depth is 1 + the deeper of its two children",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Each node is visited once, and at each one we do a constant amount of work (one addition and one `max`). So the total is O(n). The level-by-level queue version also touches each node once: O(n).",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "h is the height of the tree. The call stack holds one paused call per level we're currently inside. That's about log n for a balanced tree, and up to n for a tree shaped like a straight line.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` is a small object with three slots: `val` (its number), `left` and `right` (its children). A child is either another `TreeNode` or `None`, meaning 'nothing here'. `root.left` reads the left slot. This site already defines `TreeNode` for you.",
        exampleSnippet:
          "root = TreeNode(3, TreeNode(9), None)\nprint(root.val)\nprint(root.left.val)\nprint(root.right)",
        whyWeUseItHere:
          "To measure the depth we follow the `left` and `right` slots down from the root.",
      },
      {
        keywordOrMethod: "def max_depth(root: Optional[TreeNode]) -> int:",
        plainEnglishExplanation:
          "`def` creates a function. `Optional[TreeNode]` is a type hint meaning 'a TreeNode or `None`' (imported with `from typing import Optional`), and `-> int` says the function gives back a whole number. Python doesn't enforce hints; they're notes for readers.",
        exampleSnippet:
          "from typing import Optional\n\ndef has_value(node: Optional[TreeNode]) -> bool:\n    return node is not None\n\nprint(has_value(TreeNode(1)))\nprint(has_value(None))",
        whyWeUseItHere:
          "The tree may be empty (`None`), and the answer is a count of levels.",
      },
      {
        keywordOrMethod: "if root is None: return 0  (the base case)",
        plainEnglishExplanation:
          "A recursive function needs a **base case**: an input so simple that you can answer it directly, without calling the function again. `root is None` checks whether we've stepped onto an empty spot below a leaf.",
        exampleSnippet:
          "def count_down(n):\n    if n == 0:\n        print('liftoff!')\n        return\n    print(n)\n    count_down(n - 1)\n\ncount_down(3)",
        whyWeUseItHere:
          "An empty spot has zero levels. That's the answer every path down the tree eventually reaches, and it's what makes the recursion stop.",
      },
      {
        keywordOrMethod: "left_depth = max_depth(root.left)  (recursion and the call stack)",
        plainEnglishExplanation:
          "The function calls itself on the left child. Python pauses the current call, remembers where it was, and starts a fresh call on top of the **call stack**, with its own separate variables. When that call returns a number, it's removed from the stack, and the paused call continues with the result stored in `left_depth`.",
        exampleSnippet:
          "def depth(node):\n    if node is None:\n        return 0\n    return 1 + max(depth(node.left), depth(node.right))\n\ntree = TreeNode(1, TreeNode(2, TreeNode(3)), TreeNode(4))\nprint(depth(tree))",
        whyWeUseItHere:
          "The depth of a tree depends on the depths of its two smaller subtrees, and those are the same question asked one level down.",
      },
      {
        keywordOrMethod: "max(a, b)",
        plainEnglishExplanation:
          "`max` gives back the largest of the values you pass it.",
        exampleSnippet: "print(max(2, 5))\nprint(max(7, 7))\nprint(max(0, 3, 1))",
        whyWeUseItHere:
          "The longest path continues down whichever side is deeper, so we keep the bigger of the two depths.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { root: [3, 9, 20, null, null, 15, 7] },
      focus: ["root", "left_depth", "right_depth"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you're the boss at the top of a company chart and you want to know how many levels of management there are. You don't walk the whole building yourself. You ask your two direct reports: 'How many levels are there under you, counting yourself?' They each ask *their* reports the same question, and so on. Someone with nobody below them answers '1'. Each manager then answers '1 + whichever of my reports gave the bigger number'. On the call stack you'll see this exactly: questions pile up as calls go down the tree, and answers flow back up as each call returns.",
      edgeCases: [
        "Empty tree: the very first call hits the base case and returns 0.",
        "A single node: both children are `None` (depth 0 each), so the answer is 1 + 0 = 1.",
        "A tree that's a straight line, like 1 → 2 → 3 → 4 → 5: the depth equals the number of nodes, and the call stack gets that tall too.",
      ],
      stepByStepWalkthrough: [
        "Call `max_depth(root)`. If `root` is `None`, the tree has no levels: return 0.",
        "Otherwise pause and call `max_depth(root.left)`. A new call for the left child is added on top of the stack.",
        "That call does the same thing: it goes left again and again until it reaches `None`, which returns 0. Then the stack starts shrinking as answers come back.",
        "Store the left answer in `left_depth`, then do the same for the right child to get `right_depth`.",
        "Return `1 + max(left_depth, right_depth)`: this node is one level, sitting on top of its deeper side.",
        "The first call (for the real root) is the last one to finish. Its return value is the depth of the whole tree.",
      ],
    },
    hints: {
      conceptual:
        "If someone told you the depth of the left subtree and the depth of the right subtree, could you work out the depth of the whole tree? What's the depth of an empty tree?",
      structural:
        "Recursive function: `if root is None: return 0`. Otherwise get `max_depth(root.left)` and `max_depth(root.right)`, and return `1 + max(...)` of the two.",
    },
    commonMistakes: [
      "Returning 1 for `None` instead of 0. Every path then counts one extra level, so a single node would have depth 2.",
      "Forgetting the `1 +`. The function then returns 0 for every tree, because the only number ever produced is the base case's 0.",
      "Using `min` instead of `max`: that finds the *shortest* path to an empty spot, which is a different question.",
      "Calling `max_depth(root.left)` but not using its result (e.g. not storing or returning it). A recursive call's answer only helps if you use it.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def max_depth(root: Optional[TreeNode]) -> int:
    # Return how many nodes are on the longest root-to-leaf path.
    # Tip: if you knew the depth of each child's subtree, what would this tree's depth be?
    pass
`,
    optimalSolution: `from typing import Optional


# A new call starts: how many levels does the subtree under root have?
def max_depth(root: Optional[TreeNode]) -> int:
    # Base case: is this an empty spot?
    if root is None:
        return 0  # an empty spot adds no levels

    # Pause and ask the left child: how deep does your side go?
    left_depth = max_depth(root.left)
    # Now ask the right child the same question
    right_depth = max_depth(root.right)

    # This node is 1 level, sitting on top of whichever side is deeper
    return 1 + max(left_depth, right_depth)
`,
    bruteForceSolution: `from collections import deque
from typing import Optional


def max_depth(root: Optional[TreeNode]) -> int:
    # Alternative: count the levels one by one with a queue (breadth-first search)
    if root is None:
        return 0
    depth = 0
    queue = deque([root])
    while queue:
        depth += 1
        # Everything in the queue right now is one level; replace it with the next level
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
    return depth
`,
    harness: { kind: "function", entry: "max_depth", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [3, 9, 20, null, null, 15, 7] },
        expected: 3,
        description: "The longest path is 3 → 20 → 15 (or 3 → 20 → 7): three nodes.",
      },
      {
        input: { root: [1, null, 2] },
        expected: 2,
        description: "1 → 2 is the only path, and it has two nodes.",
      },
      {
        input: { root: [] },
        expected: 0,
        description: "An empty tree has no levels at all.",
      },
      { input: { root: [0] }, expected: 1, description: "Just the root: one level." },
      { input: { root: [1, 2, 3, 4, null, null, 5, 6] }, expected: 4, description: "1 → 2 → 4 → 6 is the longest path." },
      { input: { root: [1, 2, null, 3, null, 4, null, 5] }, expected: 5, description: "A straight line of five nodes." },
      { input: { root: [1, 2, 3, 4, 5, 6, 7] }, expected: 3 },
      { input: { root: [-5, -3, 8, null, -1, null, 9, 2] }, expected: 4 },
    ],
  },

  // ------------------------------------------------------------------ diameter-of-binary-tree
  {
    id: "diameter-of-binary-tree",
    summary:
      "You're given the `root` of a binary tree. Find the **longest path between any two nodes** and return its length, counted in *edges* (the links between nodes, not the nodes themselves). The path can bend at any node, and it doesn't have to go through the root.",
    constraints: [
      "1 ≤ number of nodes ≤ 10,000",
      "-100 ≤ node value ≤ 100",
    ],
    pattern: "Post-order DFS: return the height, record the best 'bend' as a side effect",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "The brute force tries every node as the bend of the path and re-measures both subtrees from scratch each time: n nodes × up to n steps of measuring = O(n²). The optimal solution measures each subtree's height once and, *while it's already there*, checks the path that bends at that node. One visit per node = O(n).",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "h is the tree's height. The recursion keeps one paused `height` call per level on the call stack: about log n for a balanced tree, up to n for a straight-line tree.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` is an object with three slots: `val` (its number), `left` and `right` (its children, each another `TreeNode` or `None`). `node.left` reads the left slot. This site already defines `TreeNode` for you.",
        exampleSnippet:
          "root = TreeNode(1, TreeNode(2), TreeNode(3))\nprint(root.val, root.left.val, root.right.val)",
        whyWeUseItHere:
          "We walk down the tree through the `left` and `right` slots to measure each side.",
      },
      {
        keywordOrMethod: "def height(node): ...  (a function inside a function)",
        plainEnglishExplanation:
          "You can define a function *inside* another function. The inner one is a helper that only exists while the outer function runs, and it can read the outer function's variables.",
        exampleSnippet:
          "def greet_all(names):\n    def greet(name):\n        return 'Hi ' + name\n    for n in names:\n        print(greet(n))\n\ngreet_all(['Ana', 'Bo'])",
        whyWeUseItHere:
          "The helper `height` does the recursive work and shares the `diameter` variable with the outer function, which returns the final answer.",
      },
      {
        keywordOrMethod: "nonlocal diameter",
        plainEnglishExplanation:
          "Normally, assigning to a variable inside a function creates a brand-new local variable. `nonlocal diameter` tells Python: 'when I assign to `diameter` here, I mean the one that belongs to the outer function'. Without it, `diameter = ...` would make a separate local copy and the outer one would never change.",
        exampleSnippet:
          "def counter():\n    total = 0\n    def add(n):\n        nonlocal total\n        total = total + n\n    add(5)\n    add(10)\n    print(total)\n\ncounter()",
        whyWeUseItHere:
          "Every `height` call, at every depth of the recursion, may find a longer path. They all need to update the *same* best-so-far variable.",
      },
      {
        keywordOrMethod: "left_height = height(node.left)  (recursion and the call stack)",
        plainEnglishExplanation:
          "When a function calls itself, Python pauses the current call and puts a new one on top of the **call stack**, with its own separate variables. When the new call returns, it is removed from the stack, and the paused call continues with the returned value. A **base case** (`if node is None: return 0`) is what stops the calls going on forever.",
        exampleSnippet:
          "def height(node):\n    if node is None:\n        return 0\n    return 1 + max(height(node.left), height(node.right))\n\ntree = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))\nprint(height(tree))",
        whyWeUseItHere:
          "A node can only work out its height after both children have reported theirs. That's why the answers are computed on the way back *up* the stack.",
      },
      {
        keywordOrMethod: "diameter = max(diameter, left_height + right_height)",
        plainEnglishExplanation:
          "`max` returns the larger of its inputs. Writing `best = max(best, candidate)` is a common pattern meaning 'keep whichever is bigger: what I had, or this new candidate'.",
        exampleSnippet:
          "best = 0\nfor candidate in [3, 1, 4, 2]:\n    best = max(best, candidate)\nprint(best)",
        whyWeUseItHere:
          "Each node is a possible bend in the path. We compare the path through it with the best one found so far.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { root: [1, 2, 3, 4, 5] },
      focus: ["diameter", "left_height", "right_height"],
      hide: ["height"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of the tree as a set of hanging ropes. The longest path is like stretching a string from one bottom tip, up to some node where it bends, and back down to another tip. At the bend, the string goes down the left side as far as it can and down the right side as far as it can. So at each node, the longest path that bends *there* is (height of left side) + (height of right side). We need the height of every subtree anyway, so we measure heights bottom-up and, at each node, check whether bending here beats our record. The record is kept in one shared variable, `diameter`, which every call on the stack can update.",
      edgeCases: [
        "A single node: both heights are 0, so the diameter is 0 edges.",
        "The longest path doesn't pass through the root. For example, the root may have one short child while a deep, bushy subtree hangs off the other side. Checking every node as a bend handles this.",
        "A straight-line tree of n nodes has diameter n − 1: the path runs from top to bottom.",
      ],
      stepByStepWalkthrough: [
        "Set `diameter = 0`. This is our record, measured in edges.",
        "Define the helper `height(node)`. It returns how many nodes tall the subtree under `node` is (0 for `None`).",
        "In `height`, first recurse into the left child and then the right child. The stack grows until it reaches empty spots, which return 0.",
        "As answers come back up, each node has `left_height` and `right_height`. Going down from this node, there are `left_height` edges to the deepest node on the left, and `right_height` edges to the deepest node on the right.",
        "So the longest path bending at this node has `left_height + right_height` edges. Update `diameter` if that's a new record (`nonlocal` lets us change the outer variable).",
        "Return `1 + max(left_height, right_height)` so the parent knows how tall we are.",
        "After `height(root)` finishes, every node has been checked, and `diameter` holds the answer.",
      ],
    },
    hints: {
      conceptual:
        "Any path has one highest node where it bends. If you knew how far you can go down the left side and down the right side from that node, how long would the path through it be? You need subtree heights for this, so can you check every bend *while* you compute heights?",
      structural:
        "Keep `diameter = 0` in the outer function. Write a nested `height(node)` helper that returns `0` for `None`, recurses into both children, updates `diameter = max(diameter, left + right)` (with `nonlocal diameter`), and returns `1 + max(left, right)`.",
    },
    commonMistakes: [
      "Only checking the path through the root: `height(root.left) + height(root.right)`. The longest path may bend at a lower node (see the test where the root has only one child).",
      "Forgetting `nonlocal diameter`. Python then treats `diameter` inside the helper as a new local variable and raises `UnboundLocalError` (it's read before it's assigned).",
      "Counting nodes instead of edges, e.g. returning `left + right + 1`. A path of 3 nodes has only 2 edges.",
      "Returning `diameter` from the helper instead of the height. The parent needs the height to do its own calculation; the record is kept separately.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def diameter_of_binary_tree(root: Optional[TreeNode]) -> int:
    # Return the number of edges on the longest path between any two nodes.
    # Tip: a helper that returns each subtree's height can also check the path that bends there.
    pass
`,
    optimalSolution: `from typing import Optional


def diameter_of_binary_tree(root: Optional[TreeNode]) -> int:
    # Our record: the longest path found so far, counted in edges
    diameter = 0

    # A new helper call: measure how many nodes tall the subtree under node is
    def height(node: Optional[TreeNode]) -> int:
        # Let this helper change the 'diameter' that belongs to the outer function
        nonlocal diameter
        # Base case: is this an empty spot?
        if node is None:
            return 0  # an empty spot has height 0

        # Pause and measure how tall the left side is
        left_height = height(node.left)
        # Then pause again and measure the right side
        right_height = height(node.right)

        # A path that bends here goes left_height edges down one side
        # and right_height edges down the other. Is that a new record?
        diameter = max(diameter, left_height + right_height)

        # Tell our parent how tall we are: this node plus our taller side
        return 1 + max(left_height, right_height)

    # Measuring the whole tree visits every node and tries it as a bend
    height(root)
    # Every node has been checked, so the record is the answer
    return diameter
`,
    bruteForceSolution: `from typing import Optional


def height(node: Optional[TreeNode]) -> int:
    # Number of nodes on the longest downward path from node
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


def diameter_of_binary_tree(root: Optional[TreeNode]) -> int:
    # Try every node as the bend, re-measuring both sides from scratch each time
    if root is None:
        return 0
    through_here = height(root.left) + height(root.right)
    best_left = diameter_of_binary_tree(root.left)
    best_right = diameter_of_binary_tree(root.right)
    return max(through_here, best_left, best_right)
`,
    harness: { kind: "function", entry: "diameter_of_binary_tree", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [1, 2, 3, 4, 5] },
        expected: 3,
        description: "4 → 2 → 1 → 3 (or 5 → 2 → 1 → 3) uses 3 edges.",
      },
      {
        input: { root: [1, 2] },
        expected: 1,
        description: "Just one edge, between 1 and 2.",
      },
      {
        input: { root: [1] },
        expected: 0,
        description: "One node alone: a path with no edges.",
      },
      {
        input: { root: [1, 2, null, 3, 4, 5, null, null, 6, 7, null, null, 8] },
        expected: 6,
        description: "The longest path 7 → 5 → 3 → 2 → 4 → 6 → 8 bends at 2 and never visits the root.",
      },
      { input: { root: [1, 2, 3, 4, 5, 6, 7] }, expected: 4 },
      { input: { root: [1, 2, null, 3, null, 4] }, expected: 3, description: "A straight line of 4 nodes has 3 edges." },
      { input: { root: [3, 1, null, null, 2] }, expected: 2 },
      { input: { root: [-1, -2, -3, null, -4, -5, -6, -7] }, expected: 5 },
    ],
  },

  // ------------------------------------------------------------------ balanced-binary-tree
  {
    id: "balanced-binary-tree",
    summary:
      "You're given the `root` of a binary tree. Return `True` if the tree is **height-balanced**, otherwise `False`. A tree is height-balanced when, at **every** node, the heights of its left subtree and right subtree differ by at most 1.",
    constraints: [
      "0 ≤ number of nodes ≤ 5,000",
      "-10,000 ≤ node value ≤ 10,000",
      "An empty tree counts as balanced",
    ],
    pattern: "Post-order DFS that returns a height, or -1 as an 'unbalanced' alarm",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "The brute force checks each node by measuring its two subtrees from scratch, so nodes deep in the tree get measured again and again: up to n × n steps. The optimal solution measures every subtree once, bottom-up, and checks the balance rule at the same time: one visit per node, O(n).",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "h is the height of the tree. The call stack holds one paused call per level: about log n for a balanced tree, up to n for a straight-line tree.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` is an object with three slots: `val` (its number), `left` and `right` (its children, each another `TreeNode` or `None`). This site already defines `TreeNode` for you.",
        exampleSnippet:
          "root = TreeNode(1, TreeNode(2), None)\nprint(root.left.val)\nprint(root.right is None)",
        whyWeUseItHere:
          "We follow `left` and `right` down the tree to measure the height of each side.",
      },
      {
        keywordOrMethod: "def check(node): ...  (a helper inside the function)",
        plainEnglishExplanation:
          "A function can be defined inside another function. The inner helper exists only while the outer function runs. Here the helper can return a different kind of answer (a number) from the outer function (a `True`/`False`).",
        exampleSnippet:
          "def shout_all(words):\n    def shout(w):\n        return w.upper() + '!'\n    for w in words:\n        print(shout(w))\n\nshout_all(['hi', 'bye'])",
        whyWeUseItHere:
          "The recursion needs to pass heights up the tree, but the problem wants a yes/no answer. The helper does the height work; the outer function turns the result into `True` or `False`.",
      },
      {
        keywordOrMethod: "left_height = check(node.left)  (recursion and the call stack)",
        plainEnglishExplanation:
          "When a function calls itself, Python pauses the current call and starts a new one on top of the **call stack**, with its own separate variables. When it returns, it's removed from the stack and the paused call continues with the result. The **base case** (`if node is None: return 0`) stops the calls.",
        exampleSnippet:
          "def height(node):\n    if node is None:\n        return 0\n    return 1 + max(height(node.left), height(node.right))\n\nprint(height(TreeNode(1, TreeNode(2, TreeNode(3)))))",
        whyWeUseItHere:
          "A node can only judge its balance once both children have reported their heights, so the answers are worked out on the way back up the stack.",
      },
      {
        keywordOrMethod: "return -1  (a 'sentinel' value)",
        plainEnglishExplanation:
          "A *sentinel* is a special value that can never be a real answer, so it can carry a message instead. A height is never negative, so `-1` can safely mean 'something below me is broken'.",
        exampleSnippet:
          "def safe_divide(a, b):\n    if b == 0:\n        return -1\n    return a // b\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
        whyWeUseItHere:
          "One returned number carries two pieces of information: a height when things are fine, or `-1` meaning 'unbalanced, stop checking'.",
      },
      {
        keywordOrMethod: "abs(left_height - right_height) > 1",
        plainEnglishExplanation:
          "`abs` gives the distance from zero, so it drops a minus sign: `abs(-3)` is `3`. `abs(a - b)` is 'how far apart a and b are', whichever one is bigger.",
        exampleSnippet: "print(abs(3 - 1))\nprint(abs(1 - 3))\nprint(abs(2 - 2))",
        whyWeUseItHere:
          "We don't care which side is taller, only whether the two heights differ by more than 1.",
      },
      {
        keywordOrMethod: "return check(root) != -1",
        plainEnglishExplanation:
          "`!=` means 'is not equal to'. A comparison produces `True` or `False`, and you can return that result directly.",
        exampleSnippet: "print(3 != -1)\nprint(-1 != -1)",
        whyWeUseItHere:
          "If the alarm value `-1` never reached the top, the tree is balanced.",
      },
    ],
    visualizerType: "recursion",
    visualization: {
      input: { root: [1, 2, 2, 3, 3, null, null, 4, 4] },
      focus: ["left_height", "right_height"],
      hide: ["check"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine inspecting a mobile hanging from the ceiling. To know if it's balanced, every joint has to be checked, not just the top one. The quick way is to inspect from the bottom up: each joint reports its height to the joint above it. But if any joint finds its two sides differ by more than one level, it shouts an alarm (`-1`) instead of a height. An alarm gets passed straight up without any more checking, all the way to the top. On the call stack you'll see heights travel upward as calls finish. If an alarm is raised, every paused call above returns `-1` right away.",
      edgeCases: [
        "Empty tree: the helper returns 0 (not -1), so the answer is `True`.",
        "The root's two sides have equal heights, but some node lower down is lopsided. The tree is still unbalanced, which is why every node must be checked.",
        "A straight line of 3 or more nodes is unbalanced: the node at the top has height 2 on one side and 0 on the other.",
      ],
      stepByStepWalkthrough: [
        "Define a helper `check(node)` that returns the subtree's height, or `-1` if it's unbalanced anywhere inside.",
        "Base case: an empty spot is balanced and has height 0.",
        "Recurse into the left child. If it returned `-1`, return `-1` right away: there's no point checking more.",
        "Do the same for the right child.",
        "Both sides are balanced on their own. Now check this node: if `abs(left_height - right_height) > 1`, return `-1`.",
        "Otherwise this subtree is balanced: return its height, `1 + max(left_height, right_height)`.",
        "The outer function returns `check(root) != -1`.",
      ],
    },
    hints: {
      conceptual:
        "To decide whether a node is balanced you need the heights of both of its subtrees, and both subtrees must be balanced themselves. Can one bottom-up pass give each parent both pieces of information at once?",
      structural:
        "Nested helper `check(node) -> int`: return `0` for `None`; recurse left and right; if either is `-1` or `abs(left - right) > 1`, return `-1`; else return `1 + max(left, right)`. The main function returns `check(root) != -1`.",
    },
    commonMistakes: [
      "Only comparing heights at the root. A tree can have equal heights at the top but a lopsided node lower down (see the test with two long 'arms').",
      "Measuring heights with a separate function at every node. It gives the right answer, but the same subtrees get measured over and over, which is O(n²).",
      "Writing `left_height - right_height > 1` without `abs`. That only catches a taller *left* side and misses a taller right side.",
      "Returning `True`/`False` from the helper. The parent then knows whether the child is balanced, but not how tall it is, and it needs both.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def is_balanced(root: Optional[TreeNode]) -> bool:
    # True if, at EVERY node, the left and right subtree heights differ by at most 1.
    # Tip: a helper could return a subtree's height, or a special value meaning "unbalanced".
    pass
`,
    optimalSolution: `from typing import Optional


def is_balanced(root: Optional[TreeNode]) -> bool:
    # A new helper call: return node's height, or -1 if it's unbalanced anywhere inside
    def check(node: Optional[TreeNode]) -> int:
        # Base case: is this an empty spot?
        if node is None:
            return 0  # empty is balanced, with height 0

        # Pause and get the left side's height (or the -1 alarm)
        left_height = check(node.left)
        # If the left side is already broken, pass the alarm straight up
        if left_height == -1:
            return -1

        # Pause again and get the right side's height (or the alarm)
        right_height = check(node.right)
        # Same thing: a broken right side means this whole subtree is broken
        if right_height == -1:
            return -1

        # Both sides are fine on their own. Do their heights differ by more than 1?
        if abs(left_height - right_height) > 1:
            return -1  # this node is lopsided: raise the alarm

        # Balanced here too: tell the parent our height
        return 1 + max(left_height, right_height)

    # The tree is balanced if the alarm never reached the top
    return check(root) != -1
`,
    bruteForceSolution: `from typing import Optional


def height(node: Optional[TreeNode]) -> int:
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


def is_balanced(root: Optional[TreeNode]) -> bool:
    # Check this node's balance by measuring both sides from scratch,
    # then check every node below it the same way
    if root is None:
        return True
    if abs(height(root.left) - height(root.right)) > 1:
        return False
    return is_balanced(root.left) and is_balanced(root.right)
`,
    harness: { kind: "function", entry: "is_balanced", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [3, 9, 20, null, null, 15, 7] },
        expected: true,
        description: "At the root, the left side is 1 level tall and the right side 2: a difference of 1 is allowed. Every other node is fine too.",
      },
      {
        input: { root: [1, 2, 2, 3, 3, null, null, 4, 4] },
        expected: false,
        description: "At the root, the left side is 3 levels tall but the right side only 1: a difference of 2.",
      },
      {
        input: { root: [] },
        expected: true,
        description: "An empty tree has nothing that could be lopsided.",
      },
      { input: { root: [1] }, expected: true },
      { input: { root: [1, 2, null, 3] }, expected: false, description: "A straight line of 3: the top node has heights 2 and 0." },
      {
        input: { root: [1, 2, 2, 3, null, null, 3, 4, null, null, 4] },
        expected: false,
        description: "The root's two sides are equally tall, but each 2 has a 2-level arm on one side and nothing on the other.",
      },
      { input: { root: [1, 2, 3, 4, null, null, 5] }, expected: true },
      { input: { root: [1, 2, 3, 4, 5, 6, null, 8] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ same-tree
  {
    id: "same-tree",
    summary:
      "You're given the roots of two binary trees, `p` and `q`. Determine if they are **identical**. Two binary trees are identical when they have the exact same structure (every node has children in the exact same positions) and every corresponding node holds the exact same value. Return `True` if they are identical, otherwise `False`.",
    constraints: [
      "0 ≤ number of nodes in each tree ≤ 100",
      "-10,000 ≤ node value ≤ 10,000",
      "Both trees can be empty (`root` is `None`)",
    ],
    pattern: "Simultaneous recursive DFS: compare current nodes, then recurse on both pairs of children",
    timeComplexity: {
      bruteForce: "O(min(n, m))",
      optimal: "O(min(n, m))",
      explanation:
        "We visit pairs of matching nodes simultaneously. If the trees differ, we stop as soon as a mismatch is spotted. If they are identical, we visit all nodes. Visiting each pair takes O(1) time, so total time is O(min(n, m)) where n and m are the node counts of p and q.",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "h is the height of the smaller tree. The call stack holds one paused call per level down to the leaves, which is O(log n) for a balanced tree and O(n) for a completely skewed tree.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` is an object with three slots: `val` (the number stored in it), `left` and `right` (its children, each another `TreeNode` or `None`). Reading `p.left` gets p's left child.",
        exampleSnippet:
          "node = TreeNode(5)\nprint(node.val)",
        whyWeUseItHere:
          "We inspect the values and child links of both trees to see if they match.",
      },
      {
        keywordOrMethod: "if p is None and q is None: return True",
        plainEnglishExplanation:
          "`and` checks that both conditions are True. If both trees have reached an empty spot simultaneously, this branch is identical on both sides.",
        exampleSnippet:
          "a = None\nb = None\nprint(a is None and b is None)",
        whyWeUseItHere:
          "Reaching the bottom of matching branches at the exact same time is the success base case.",
      },
      {
        keywordOrMethod: "if p is None or q is None: return False",
        plainEnglishExplanation:
          "`or` is True if at least one condition is True. Because we already handled both being None above, if this line is reached it means one tree has a node where the other has nothing.",
        exampleSnippet:
          "a = None\nb = 10\nprint(a is None or b is None)",
        whyWeUseItHere:
          "If one tree has a branch where the other has empty space, the tree structures are different.",
      },
      {
        keywordOrMethod: "p.val != q.val",
        plainEnglishExplanation:
          "`!=` tests whether two values are not equal. If the numbers stored on matching nodes differ, the trees cannot be identical.",
        exampleSnippet:
          "print(5 != 5)\nprint(5 != 3)",
        whyWeUseItHere:
          "Nodes in the same relative position must hold identical values.",
      },
      {
        keywordOrMethod: "return left_match and right_match",
        plainEnglishExplanation:
          "Combining recursive results with `and` ensures that the function only returns `True` if both the entire left subtree and the entire right subtree are identical.",
        exampleSnippet:
          "print(True and True)\nprint(True and False)",
        whyWeUseItHere:
          "Both sides of the tree must match for the whole trees to be identical.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { p: [1, 2, 3], q: [1, 2, 3] },
      focus: ["p", "q"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you are comparing two physical trees branch by branch to see if they are identical twins. Stand at the roots: do both trees exist? Do their tags show the exact same number? If so, you give two assistants the same job: one compares the entire left branches against each other, and the other compares the entire right branches. If both pairs of branches are identical twins, then the two whole trees are identical twins. If at any point one tree has a branch where the other has nothing, or the numbers on the tags don't match, you immediately know they are not identical.",
      edgeCases: [
        "Both trees are empty (p is None and q is None): they match completely, returning True.",
        "One tree is empty while the other is not: the structures differ, returning False.",
        "Trees have the same values but in mirrored positions (e.g. left vs right): structure matters, returning False.",
      ],
      stepByStepWalkthrough: [
        "Start at the roots p and q.",
        "Base case 1: if both p and q are None, we reached the bottom of matching branches. Return True.",
        "Base case 2: if one node is None and the other is not, the shapes don't match. Return False.",
        "Base case 3: if both nodes exist but p.val != q.val, the values don't match. Return False.",
        "Recurse down both left subtrees: left_match = is_same_tree(p.left, q.left).",
        "Recurse down both right subtrees: right_match = is_same_tree(p.right, q.right).",
        "Return left_match and right_match: both halves must match for the whole tree to be identical.",
      ],
    },
    hints: {
      conceptual:
        "If you walk down both trees together in lockstep, what condition makes a pair of positions match? What makes them mismatch?",
      structural:
        "Write a recursive function with base cases: if both nodes are None return True; if one is None or values differ return False; otherwise return the logical 'and' of recursing on both left children and both right children.",
    },
    commonMistakes: [
      "Reading p.val or q.val before verifying that neither p nor q is None, which crashes with AttributeError: 'NoneType' object has no attribute 'val'.",
      "Writing if p is None or q is None: return True without first checking if both are None. That would claim an empty tree and a non-empty tree are identical.",
      "Checking only root values and forgetting to recurse down to the children.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def is_same_tree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Return True if two binary trees have the exact same structure and node values.
    # Tip: check the current pair of nodes, then compare both left and right subtrees.
    pass
`,
    optimalSolution: `from typing import Optional


# Compare two trees rooted at p and q simultaneously
def is_same_tree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Base case 1: both branches ended at the same time, so this path matches
    if p is None and q is None:
        return True

    # Base case 2: one branch ended but the other did not, so the structures differ
    if p is None or q is None:
        return False

    # Base case 3: both nodes exist, but their numbers are not equal
    if p.val != q.val:
        return False

    # Pause and check if the entire left subtrees are identical
    left_match = is_same_tree(p.left, q.left)
    # Pause and check if the entire right subtrees are identical
    right_match = is_same_tree(p.right, q.right)

    # The trees match only if both the left sides and the right sides match
    return left_match and right_match
`,
    bruteForceSolution: `from collections import deque
from typing import Optional


def is_same_tree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Iterative BFS: pair up corresponding nodes in a queue
    queue = deque([(p, q)])
    while queue:
        node_p, node_q = queue.popleft()
        if node_p is None and node_q is None:
            continue
        if node_p is None or node_q is None:
            return False
        if node_p.val != node_q.val:
            return False
        queue.append((node_p.left, node_q.left))
        queue.append((node_p.right, node_q.right))
    return True
`,
    harness: { kind: "function", entry: "is_same_tree", argTypes: { p: "tree", q: "tree" } },
    testCases: [
      {
        input: { p: [1, 2, 3], q: [1, 2, 3] },
        expected: true,
        description: "Both trees have root 1 with left child 2 and right child 3.",
      },
      {
        input: { p: [1, 2], q: [1, null, 2] },
        expected: false,
        description: "p has a left child 2, whereas q has a right child 2: structure differs.",
      },
      {
        input: { p: [1, 2, 1], q: [1, 1, 2] },
        expected: false,
        description: "Same structure but node values are reversed on the children.",
      },
      {
        input: { p: [], q: [] },
        expected: true,
        description: "Two empty trees are identical.",
      },
      { input: { p: [1], q: [] }, expected: false },
      { input: { p: [1], q: [1] }, expected: true },
      { input: { p: [1, 2, 3, 4, 5], q: [1, 2, 3, 4, 5] }, expected: true },
      { input: { p: [1, 2, 3, 4, 5], q: [1, 2, 3, 4, null] }, expected: false },
    ],
  },

  // ------------------------------------------------------------------ subtree-of-another-tree
  {
    id: "subtree-of-another-tree",
    summary:
      "You're given the roots of two binary trees, `root` and `sub_root`. Return `True` if `sub_root` is a **subtree** of `root`, otherwise return `False`. A subtree of a binary tree is formed by taking a node in that tree along with **all** of its descendants down to the leaves. The tree must match `sub_root` in both structure and values.",
    constraints: [
      "1 ≤ number of nodes in root ≤ 2,000",
      "1 ≤ number of nodes in sub_root ≤ 1,000",
      "-10,000 ≤ node value ≤ 10,000",
    ],
    pattern: "Tree traversal with is_same equality check at each candidate node",
    timeComplexity: {
      bruteForce: "O(n × m)",
      optimal: "O(n × m)",
      explanation:
        "In the worst case (e.g. trees with identical values repeated throughout), at every node of root (n nodes) we may compare against sub_root (m nodes). n × m comparisons gives O(n × m) time.",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "h is the height of root. The recursion stack reaches depth h, which is O(log n) for a balanced tree and O(n) for a line-shaped tree.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` is an object with three slots: `val` (the number stored in it), `left` and `right` (its children, each another `TreeNode` or `None`).",
        exampleSnippet:
          "node = TreeNode(10, TreeNode(5))\nprint(node.left.val)",
        whyWeUseItHere:
          "We traverse the nodes of root and inspect their children.",
      },
      {
        keywordOrMethod: "def is_same(p, q): ...  (helper function)",
        plainEnglishExplanation:
          "You can define a helper function to perform a specific sub-task. Here, the helper checks whether two subtrees are exact duplicates.",
        exampleSnippet:
          "def is_same(a, b):\n    return a == b\nprint(is_same(4, 4))",
        whyWeUseItHere:
          "We need to compare the candidate subtree against sub_root at each node.",
      },
      {
        keywordOrMethod: "if sub_root is None: return True",
        plainEnglishExplanation:
          "An empty subtree is considered a subtree of every tree (even an empty one). Checking this base case early prevents unnecessary recursion.",
        exampleSnippet:
          "sub = None\nprint(sub is None)",
        whyWeUseItHere:
          "An empty tree is always a valid subtree.",
      },
      {
        keywordOrMethod: "return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)",
        plainEnglishExplanation:
          "`or` evaluates to `True` if either the left recursive call or the right recursive call finds a match.",
        exampleSnippet:
          "print(False or True)\nprint(False or False)",
        whyWeUseItHere:
          "If the current root doesn't match, the target subtree might be located in the left branch or the right branch.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [3, 4, 5, 1, 2], sub_root: [4, 1, 2] },
      focus: ["root", "sub_root"],
    },
    intuitiveExplanation: {
      intuition:
        "Searching for a subtree is like searching for a stamp on a large patterned quilt. You hold the stamp (sub_root) up against the current patch of quilt (root). Do the patch and the stamp match stitch for stitch, all the way to the edges? If yes, you found it! If not, you slide the stamp down to the left sub-patch, and if that still doesn't match, down to the right sub-patch. Remember: the match must include all descendants down to the leaves—you cannot just match the top half of a branch and ignore extra children below it.",
      edgeCases: [
        "sub_root is None: an empty tree is technically a subtree of any tree, returning True.",
        "root is None (fell off the tree) while sub_root is not: cannot find the stamp in an empty patch, returning False.",
        "A subtree matches sub_root's values but has extra children attached underneath: this is NOT a subtree, because all descendants must match.",
      ],
      stepByStepWalkthrough: [
        "Base case: if sub_root is None, an empty tree is always a subtree, so return True.",
        "Base case: if root is None, we ran out of tree without finding a match, so return False.",
        "Use a helper is_same(p, q) to check if the tree starting at current root is an exact match for sub_root.",
        "If is_same(root, sub_root) returns True, we found our subtree! Return True immediately.",
        "Otherwise, search deeper: call is_subtree on root.left, or is_subtree on root.right.",
        "Return True if either child branch contains the matching subtree.",
      ],
    },
    hints: {
      conceptual:
        "Can you break this into two tasks: first, checking if two trees are exact clones; second, checking whether sub_root matches at the current node OR somewhere in the left or right branch?",
      structural:
        "Write a helper `is_same(p, q)` that checks exact equality. Then in `is_subtree`, return True if `is_same(root, sub_root)` is True, otherwise return the `or` of recursing on `root.left` and `root.right`.",
    },
    commonMistakes: [
      "Assuming that because a node matches sub_root's root value, it must be the answer, without checking that all descendants match down to the leaves.",
      "Returning False immediately if the main root doesn't match sub_root, forgetting to check the left and right children.",
      "Allowing a match when the main tree has extra children below where sub_root ends.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def is_subtree(root: Optional[TreeNode], sub_root: Optional[TreeNode]) -> bool:
    # Return True if sub_root has the exact same structure and values as a subtree of root.
    # Tip: at each node of root, check if the trees match, or recurse into left/right children.
    pass
`,
    optimalSolution: `from typing import Optional


# Helper to check if two trees are exact duplicates in structure and values
def is_same(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Both reached empty spots together: identical leaf positions
    if p is None and q is None:
        return True
    # One is empty or values differ: not identical
    if p is None or q is None or p.val != q.val:
        return False
    # Check that both left and right child branches match
    return is_same(p.left, q.left) and is_same(p.right, q.right)


def is_subtree(root: Optional[TreeNode], sub_root: Optional[TreeNode]) -> bool:
    # An empty tree is always a valid subtree
    if sub_root is None:
        return True

    # If the main tree is exhausted without finding sub_root, it cannot be a subtree
    if root is None:
        return False

    # Check if the tree starting right here matches sub_root completely
    if is_same(root, sub_root):
        return True

    # Otherwise, search in the left child or the right child
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)
`,
    bruteForceSolution: `from typing import Optional


def is_subtree(root: Optional[TreeNode], sub_root: Optional[TreeNode]) -> bool:
    # Serialize both trees into comma-separated strings with '#' for None
    def serialize(node: Optional[TreeNode]) -> str:
        if node is None:
            return ",#"
        return f",{node.val}" + serialize(node.left) + serialize(node.right)

    # sub_root is a subtree if its full serialization is a substring of root's
    return serialize(sub_root) in serialize(root)
`,
    harness: { kind: "function", entry: "is_subtree", argTypes: { root: "tree", sub_root: "tree" } },
    testCases: [
      {
        input: { root: [3, 4, 5, 1, 2], sub_root: [4, 1, 2] },
        expected: true,
        description: "The node with value 4 and its children 1 and 2 match sub_root exactly.",
      },
      {
        input: { root: [3, 4, 5, 1, 2, null, null, null, null, 0], sub_root: [4, 1, 2] },
        expected: false,
        description: "The candidate node 4 has an extra child 0 under node 2, so it is not an exact subtree.",
      },
      {
        input: { root: [1, 1], sub_root: [1] },
        expected: true,
        description: "The leaf node 1 matches sub_root.",
      },
      { input: { root: [1], sub_root: [1] }, expected: true },
      { input: { root: [1, 2, 3], sub_root: [2] }, expected: true },
      { input: { root: [1, 2, 3], sub_root: [4] }, expected: false },
      { input: { root: [3, 4, 5, 1, null, 2], sub_root: [3, 1, 2] }, expected: false },
      { input: { root: [1, null, 1, null, 1, null, 1, null, 1, 2], sub_root: [1, 2] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ lowest-common-ancestor-of-a-binary-search-tree
  {
    id: "lowest-common-ancestor-of-a-binary-search-tree",
    summary:
      "Given the `root` of a **Binary Search Tree** (BST) and two nodes `p` and `q`, find their **lowest common ancestor** (LCA). The lowest common ancestor is defined as the lowest node in the tree that has both `p` and `q` as descendants, where a node is allowed to be a descendant of itself.",
    constraints: [
      "2 ≤ number of nodes in the BST ≤ 100,000",
      "-10^9 ≤ node value ≤ 10^9",
      "All node values are unique",
      "p and q exist in the BST and p != q",
    ],
    pattern: "BST property traversal: walk toward where p and q diverge",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(h)",
      explanation:
        "At each node, we compare values and choose exactly one direction to travel (left or right). We never search both sides. This takes time proportional to the height h of the BST: O(log n) for a balanced tree, and O(n) for a completely skewed tree.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The iterative walk uses a single pointer curr without any recursion or auxiliary data structures, using O(1) extra space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "A `TreeNode` stores `val` (an integer), `left` (left child node or `None`), and `right` (right child node or `None`).",
        exampleSnippet:
          "curr = TreeNode(6)\nprint(curr.val)",
        whyWeUseItHere:
          "We read `curr.val` to compare against `p.val` and `q.val`.",
      },
      {
        keywordOrMethod: "p.val < curr.val and q.val < curr.val",
        plainEnglishExplanation:
          "Compares two target values against the current node's value. In a BST, smaller values always reside in the left subtree.",
        exampleSnippet:
          "p = 2\nq = 4\ncurr = 6\nprint(p < curr and q < curr)",
        whyWeUseItHere:
          "If both targets are smaller than the current node, their lowest common ancestor must be in the left subtree.",
      },
      {
        keywordOrMethod: "while curr is not None:",
        plainEnglishExplanation:
          "Repeats the loop body as long as `curr` points to a real node, stepping down the tree until the destination is reached.",
        exampleSnippet:
          "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1",
        whyWeUseItHere:
          "We step down through nodes one by one until finding the split point.",
      },
      {
        keywordOrMethod: "curr = curr.left",
        plainEnglishExplanation:
          "Reassigns `curr` to point to its left child, moving one level down into the left subtree.",
        exampleSnippet:
          "node = TreeNode(10, TreeNode(5))\ncurr = node\ncurr = curr.left\nprint(curr.val)",
        whyWeUseItHere:
          "Moves our search pointer into the left subtree.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
      focus: ["curr"],
    },
    intuitiveExplanation: {
      intuition:
        "In a Binary Search Tree, every node acts like a directional road sign: all smaller values are down the left road, and all larger values are down the right road. If both destinations (p and q) are smaller than where you are standing, both must lie somewhere down the left road. If both are larger, both must lie down the right road. But the instant the two destinations split—one lies to the left and one to the right, or you are standing right on one of them—this intersection is the lowest common point where their paths meet. That is the lowest common ancestor!",
      edgeCases: [
        "One of the nodes is the ancestor of the other (e.g. p is 2 and q is 4, where 4 is a child of 2): the LCA is 2 itself, because a node can be a descendant of itself.",
        "Both nodes are in the left subtree: keep walking left.",
        "Both nodes are in the right subtree: keep walking right.",
      ],
      stepByStepWalkthrough: [
        "Start a pointer curr at the root of the BST.",
        "Check if both p.val and q.val are strictly smaller than curr.val.",
        "If so, both targets are in the left subtree: move curr = curr.left.",
        "Else, check if both p.val and q.val are strictly larger than curr.val.",
        "If so, both targets are in the right subtree: move curr = curr.right.",
        "If neither condition holds, we found the split point (one is on the left and one on the right, or curr is p or q). Return curr.",
      ],
    },
    hints: {
      conceptual:
        "How does the BST ordering (left is smaller, right is larger) tell you whether p and q are on the same side or different sides of the current node?",
      structural:
        "Use a while loop. Compare p.val and q.val to curr.val. If both are smaller, go left. If both are larger, go right. Otherwise, return curr.",
    },
    commonMistakes: [
      "Ignoring the BST property and searching all nodes like a general binary tree in O(n) time.",
      "Forgetting that a node can be an ancestor of itself, e.g. when curr.val == p.val.",
      "Checking node references instead of node values when comparing positions.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    # Return the lowest common ancestor node of p and q in the BST.
    # Tip: use the BST ordering (left < root < right) to decide which branch to follow.
    pass
`,
    optimalSolution: `from typing import Optional


# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    # Start traversing down from the root of the BST
    curr = root

    # Walk down the tree until we reach the split point
    while curr is not None:
        # If both values are smaller, LCA must be in the left subtree
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        # If both values are larger, LCA must be in the right subtree
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            # One value is on the left and one on the right, or curr equals p or q.
            # This is the lowest common ancestor!
            return curr

    # Fallback return (problem guarantees p and q exist in the tree)
    return root
`,
    bruteForceSolution: `def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    # Recursive version following the split point
    if p.val < root.val and q.val < root.val:
        return lowest_common_ancestor(root.left, p, q)
    if p.val > root.val and q.val > root.val:
        return lowest_common_ancestor(root.right, p, q)
    return root
`,
    harness: {
      kind: "function",
      entry: "lowest_common_ancestor",
      argTypes: { root: "tree", p: "tree-node", q: "tree-node" },
      returnType: "tree-node-val",
    },
    testCases: [
      {
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
        expected: 6,
        description: "2 is in 6's left subtree and 8 is in 6's right subtree; 6 is their LCA.",
      },
      {
        input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 },
        expected: 2,
        description: "2 is the ancestor of 4; a node can be a descendant of itself so LCA is 2.",
      },
      {
        input: { root: [2, 1], p: 2, q: 1 },
        expected: 2,
        description: "Root 2 is the parent of 1, so LCA is 2.",
      },
      { input: { root: [5, 3, 6, 2, 4, null, null, 1], p: 1, q: 4 }, expected: 3 },
      { input: { root: [5, 3, 6, 2, 4, null, null, 1], p: 4, q: 6 }, expected: 5 },
      { input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 3, q: 5 }, expected: 4 },
      { input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 7, q: 9 }, expected: 8 },
    ],
  },

  // ------------------------------------------------------------------ binary-tree-level-order-traversal
  {
    id: "binary-tree-level-order-traversal",
    summary:
      "Given the `root` of a binary tree, return its **level order traversal** as a list of lists of integers. Each sublist should contain the values of the nodes on that level, ordered from left to right.",
    constraints: [
      "0 ≤ number of nodes in the tree ≤ 2,000",
      "-1,000 ≤ node value ≤ 1,000",
      "The tree can be empty (`root` is `None`)",
    ],
    pattern: "Breadth-First Search (BFS) using a double-ended queue (deque)",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Every node enters the queue once and is popped once. deque operations (append and popleft) are O(1). Visiting each node takes constant time, giving O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "In a complete binary tree, the widest level holds about n/2 nodes, so the queue can hold up to O(n) nodes at its peak.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import deque",
        plainEnglishExplanation:
          "`deque` is a double-ended queue. Unlike a normal Python list where removing from the front takes O(n) time, `deque.popleft()` takes O(1) instantaneous time.",
        exampleSnippet:
          "from collections import deque\nq = deque([1, 2])\nq.append(3)\nprint(q.popleft())\nprint(list(q))",
        whyWeUseItHere:
          "A queue allows us to visit nodes in first-in, first-out order (level by level).",
      },
      {
        keywordOrMethod: "level_size = len(queue)",
        plainEnglishExplanation:
          "`len(queue)` measures how many items are currently in the queue. Calling this at the start of a level captures the exact number of nodes on that level before new children are added.",
        exampleSnippet:
          "q = [10, 20, 30]\nprint(len(q))",
        whyWeUseItHere:
          "We must process only the nodes belonging to the current level before moving to the next.",
      },
      {
        keywordOrMethod: "for _ in range(level_size):",
        plainEnglishExplanation:
          "Runs a loop a fixed number of times (`level_size`). Using `_` as the variable name is Python convention when you only care about repeating the action, not the loop index.",
        exampleSnippet:
          "for _ in range(3):\n    print('tick')",
        whyWeUseItHere:
          "Pops and processes exactly all the nodes on the current level.",
      },
      {
        keywordOrMethod: "result.append(current_level)",
        plainEnglishExplanation:
          "Appends a completed list of numbers into our main list of lists.",
        exampleSnippet:
          "res = []\nres.append([1, 2])\nres.append([3, 4])\nprint(res)",
        whyWeUseItHere:
          "Builds the nested list structure where each inner list represents one tree level.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [3, 9, 20, null, null, 15, 7] },
      focus: ["queue", "current_level"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine taking a group photo of a family generation by generation. First, the oldest ancestor (the root) sits in the front row alone. Then, their direct children stand in the second row. Then, their grandchildren stand in the third row. A queue (first-in, first-out line) makes this effortless: you line up the root. Before processing the next generation, you count how many people are currently in line (`level_size`). You help exactly that many people, recording their names in a sublist and asking their kids to join the back of the line. When that batch finishes, one whole generation is recorded!",
      edgeCases: [
        "Empty tree (root is None): returns an empty list [].",
        "Single node tree: returns [[root.val]].",
        "Skewed tree (only left or only right children): each level contains exactly one element.",
      ],
      stepByStepWalkthrough: [
        "If root is None, return [] immediately.",
        "Initialize result = [] and queue = deque([root]).",
        "While queue has nodes:",
        "Count the nodes on the current level: level_size = len(queue).",
        "Create an empty list current_level = [].",
        "Repeat level_size times: popleft a node, add its value to current_level, and append its left/right children (if they exist) to queue.",
        "Append current_level to result.",
        "Return result when the queue is empty.",
      ],
    },
    hints: {
      conceptual:
        "What data structure allows you to process nodes in first-in, first-out order so higher levels are finished before lower levels begin?",
      structural:
        "Use collections.deque. In a while loop, record `level_size = len(queue)`, loop that many times to pop nodes and enqueue children, and collect the level's values into a sublist.",
    },
    commonMistakes: [
      "Using list.pop(0) instead of deque.popleft(), which runs in O(k) per pop and slows down to O(n²).",
      "Not snapshotting len(queue) before the loop, causing children added during this level to be processed in the same batch.",
      "Forgetting to check if root is None, causing AttributeError on None.left or returning [[]].",
    ],
    starterCode: `from collections import deque
from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def level_order(root: Optional[TreeNode]) -> list[list[int]]:
    # Return nodes level by level from left to right as a list of lists.
    # Tip: use a deque to traverse nodes in BFS order, batching each level by queue size.
    pass
`,
    optimalSolution: `from collections import deque
from typing import Optional


def level_order(root: Optional[TreeNode]) -> list[list[int]]:
    # An empty tree has zero levels to record
    if root is None:
        return []

    # Final list of level lists
    result = []
    # Queue for breadth-first traversal; start with the root
    queue = deque([root])

    # Continue until every level has been visited
    while queue:
        # Number of nodes currently in queue equals the count for this level
        level_size = len(queue)
        # Store values for all nodes on this level
        current_level = []

        # Process exactly the nodes belonging to this level
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            # Enqueue left child if it exists
            if node.left is not None:
                queue.append(node.left)
            # Enqueue right child if it exists
            if node.right is not None:
                queue.append(node.right)

        # Add this completed level to our final result
        result.append(current_level)

    return result
`,
    bruteForceSolution: `from typing import Optional


def level_order(root: Optional[TreeNode]) -> list[list[int]]:
    # Recursive DFS passing the depth index to group values by level
    result = []

    def dfs(node: Optional[TreeNode], depth: int) -> None:
        if node is None:
            return
        if depth == len(result):
            result.append([])
        result[depth].append(node.val)
        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)

    dfs(root, 0)
    return result
`,
    harness: { kind: "function", entry: "level_order", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [3, 9, 20, null, null, 15, 7] },
        expected: [[3], [9, 20], [15, 7]],
        description: "Level 0 has [3], level 1 has [9, 20], level 2 has [15, 7].",
      },
      {
        input: { root: [1] },
        expected: [[1]],
        description: "Single node tree has only one level.",
      },
      {
        input: { root: [] },
        expected: [],
        description: "An empty tree has no levels.",
      },
      { input: { root: [1, 2, 3, 4, 5] }, expected: [[1], [2, 3], [4, 5]] },
      { input: { root: [1, 2, null, 3, null, 4] }, expected: [[1], [2], [3], [4]] },
      { input: { root: [1, 2, 3, null, null, 4, 5] }, expected: [[1], [2, 3], [4, 5]] },
      { input: { root: [-10, 5, 20, -15, 0] }, expected: [[-10], [5, 20], [-15, 0]] },
    ],
  },

  // ------------------------------------------------------------------ binary-tree-right-side-view
  {
    id: "binary-tree-right-side-view",
    summary:
      "Given the `root` of a binary tree, imagine you are standing on the **right side** of the tree. Return the values of the nodes you can see from top to bottom.",
    constraints: [
      "0 ≤ number of nodes in the tree ≤ 100",
      "-100 ≤ node value ≤ 100",
      "The tree can be empty (`root` is `None`)",
    ],
    pattern: "BFS level-order traversal collecting the rightmost node at each depth",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Every node is added and removed from the queue once. Level inspection and array appends are O(1), leading to O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The queue holds at most the maximum number of nodes on any one level, which is up to O(n) for a full tree.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "from collections import deque",
        plainEnglishExplanation:
          "`deque` provides efficient O(1) popping from the left end of the queue with `popleft()`.",
        exampleSnippet:
          "from collections import deque\nq = deque(['a', 'b'])\nprint(q.popleft())",
        whyWeUseItHere:
          "Allows visiting tree nodes level by level.",
      },
      {
        keywordOrMethod: "if i == level_size - 1:",
        plainEnglishExplanation:
          "Checks if `i` is the last index in a 0-indexed loop running `level_size` times.",
        exampleSnippet:
          "for i in range(3):\n    if i == 2:\n        print('last:', i)",
        whyWeUseItHere:
          "The last node processed on each level is the rightmost node visible from the right side.",
      },
      {
        keywordOrMethod: "result.append(node.val)",
        plainEnglishExplanation:
          "Adds the single visible integer value to the output list.",
        exampleSnippet:
          "ans = []\nans.append(42)\nprint(ans)",
        whyWeUseItHere:
          "Records the visible node for the current level.",
      },
      {
        keywordOrMethod: "TreeNode: node.left, node.right",
        plainEnglishExplanation:
          "`node.left` and `node.right` access the child pointers of a binary tree node.",
        exampleSnippet:
          "node = TreeNode(1, None, TreeNode(3))\nprint(node.right.val)",
        whyWeUseItHere:
          "Enqueues children for the next lower level of the tree.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [1, 2, 3, null, 5, null, 4] },
      focus: ["queue", "result"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture looking at a tree through a window on its right side. At each horizontal floor (level), you can only see the person standing closest to the window—the rightmost node on that floor. Any nodes to their left are blocked from sight. If you do a level-by-level tour with a queue, you visit every node on a floor from left to right. The very last node you visit on each floor is the one closest to the window!",
      edgeCases: [
        "Empty tree: return [].",
        "Left branch is taller than right branch: the bottom of the left branch is visible from the right side because nothing on the right blocks it.",
        "Tree only has left children: every single node is visible from the right.",
      ],
      stepByStepWalkthrough: [
        "If root is None, return [].",
        "Initialize result = [] and queue = deque([root]).",
        "While queue has nodes:",
        "Get level_size = len(queue).",
        "Iterate i from 0 up to level_size - 1:",
        "Pop the next node from queue.",
        "If i == level_size - 1, this is the rightmost node on this level: append node.val to result.",
        "Append node.left and node.right to queue if they exist.",
        "Return result.",
      ],
    },
    hints: {
      conceptual:
        "From the right side, how many nodes are visible on each level? Exactly one: the last node on that level from left to right.",
      structural:
        "Run a level-order BFS using a deque. On each level, loop through all nodes on that level. When the index equals `level_size - 1`, append its value to your answer list.",
    },
    commonMistakes: [
      "Only traversing root.right! If the left subtree has more levels than the right subtree, nodes in the left subtree will be visible from the right at lower levels.",
      "Enqueuing right child before left child without adjusting which index is picked.",
      "Forgetting to handle the empty tree case.",
    ],
    starterCode: `from collections import deque
from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def right_side_view(root: Optional[TreeNode]) -> list[int]:
    # Return the values of nodes visible from the right side, from top to bottom.
    # Tip: traverse level by level; the last node processed on each level is visible.
    pass
`,
    optimalSolution: `from collections import deque
from typing import Optional


def right_side_view(root: Optional[TreeNode]) -> list[int]:
    # If the tree is empty, nothing is visible
    if root is None:
        return []

    # Stores the values of nodes visible from the right
    result = []
    # Queue for level-by-level BFS traversal
    queue = deque([root])

    # Visit each level from top to bottom
    while queue:
        level_size = len(queue)

        # Iterate through every node on the current level from left to right
        for i in range(level_size):
            node = queue.popleft()

            # The last node on this level is the rightmost one
            if i == level_size - 1:
                result.append(node.val)

            # Add left and right children for the next level
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)

    return result
`,
    bruteForceSolution: `from typing import Optional


def right_side_view(root: Optional[TreeNode]) -> list[int]:
    # DFS prioritizing right child first: the first node reached at each depth is visible
    result = []

    def dfs(node: Optional[TreeNode], depth: int) -> None:
        if node is None:
            return
        if depth == len(result):
            result.append(node.val)
        dfs(node.right, depth + 1)
        dfs(node.left, depth + 1)

    dfs(root, 0)
    return result
`,
    harness: { kind: "function", entry: "right_side_view", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [1, 2, 3, null, 5, null, 4] },
        expected: [1, 3, 4],
        description: "At level 0 we see 1, at level 1 we see 3, at level 2 we see 4.",
      },
      {
        input: { root: [1, null, 3] },
        expected: [1, 3],
        description: "Tree only has right children, so both 1 and 3 are visible.",
      },
      {
        input: { root: [] },
        expected: [],
        description: "Empty tree has no nodes visible.",
      },
      {
        input: { root: [1, 2, 3, 4] },
        expected: [1, 3, 4],
        description: "4 is the only node on level 2, so it is visible even though it is on the left branch.",
      },
      { input: { root: [1, 2] }, expected: [1, 2] },
      { input: { root: [1, 2, 3, 4, 5, 6, 7] }, expected: [1, 3, 7] },
      { input: { root: [1, 2, null, 3, null, 4] }, expected: [1, 2, 3, 4] },
    ],
  },

  // ------------------------------------------------------------------ count-good-nodes-in-binary-tree
  {
    id: "count-good-nodes-in-binary-tree",
    summary:
      "Given the `root` of a binary tree, a node `X` in the tree is called **good** if in the path from the root to `X`, there are no nodes with a value strictly greater than `X` (in other words, `X.val` is greater than or equal to every ancestor value along the path). Return the total number of good nodes in the tree.",
    constraints: [
      "1 ≤ number of nodes in the tree ≤ 100,000",
      "-10,000 ≤ node value ≤ 10,000",
      "The root is always a good node (it has no ancestors)",
    ],
    pattern: "DFS passing the maximum value seen so far along the path from root",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "We visit every node once with DFS. At each node, comparing against the running maximum takes O(1) time. Total time: O(n).",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "The recursion stack holds calls up to the tree's height h, which is O(log n) for a balanced tree and O(n) for a line-shaped tree.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def dfs(node, max_so_far): ...",
        plainEnglishExplanation:
          "Functions can pass down contextual state as arguments. Here, `max_so_far` tracks the highest number encountered on the path down from the root.",
        exampleSnippet:
          "def dfs(val, high):\n    print(val, high)\ndfs(3, 3)",
        whyWeUseItHere:
          "A node only knows whether it is 'good' if it knows the maximum of its ancestors.",
      },
      {
        keywordOrMethod: "1 if node.val >= max_so_far else 0",
        plainEnglishExplanation:
          "A ternary conditional expression that evaluates to 1 if the condition is True, and 0 otherwise.",
        exampleSnippet:
          "score = 85\nstatus = 'pass' if score >= 50 else 'fail'\nprint(status)",
        whyWeUseItHere:
          "Scores 1 good node if current node is greater than or equal to all ancestors.",
      },
      {
        keywordOrMethod: "max(max_so_far, node.val)",
        plainEnglishExplanation:
          "`max(a, b)` returns whichever number is larger, updating our running record high.",
        exampleSnippet:
          "print(max(3, 7))\nprint(max(10, 4))",
        whyWeUseItHere:
          "Updates the peak value for descendants further down this path.",
      },
      {
        keywordOrMethod: "return count + left_count + right_count",
        plainEnglishExplanation:
          "Sums up the count for the current node with the counts found in both children subtrees.",
        exampleSnippet:
          "a = 1\nb = 2\nc = 3\nprint(a + b + c)",
        whyWeUseItHere:
          "Combines counts from all branches into a single total.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [3, 1, 4, 3, null, 1, 5] },
      focus: ["node", "max_so_far"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you are hiking down a mountain trail starting at the summit (the root). You want to count every lookout point that offers a clear view backwards toward the summit. A lookout point has an unobstructed view if it is at least as tall as every hill you crossed on your way down. You only need to remember one number in your backpack: the highest elevation you have encountered so far on this particular trail. If your current elevation is greater than or equal to that record high, you found a good lookout! You update your record high and keep hiking down each fork in the path.",
      edgeCases: [
        "Single node tree: the root has no ancestors, so it is always good (returns 1).",
        "All nodes have identical values: every node is >= all ancestors, so all nodes are good.",
        "All negative node values (e.g. root is -5, children are -10 and -3): max_so_far must start at root.val, not 0!",
      ],
      stepByStepWalkthrough: [
        "Define a helper dfs(node, max_so_far).",
        "Base case: if node is None, return 0.",
        "If node.val >= max_so_far, this node is good (count = 1). Otherwise count = 0.",
        "Update the running path maximum: new_max = max(max_so_far, node.val).",
        "Recurse down the left child with new_max, and down the right child with new_max.",
        "Return count + left_count + right_count.",
        "Start by calling dfs(root, root.val).",
      ],
    },
    hints: {
      conceptual:
        "What single piece of information do you need to pass from parent to child to know if the child is a good node?",
      structural:
        "Write a recursive helper dfs(node, max_so_far). Check if node.val >= max_so_far, update the max with max(max_so_far, node.val), and sum the counts from both children.",
    },
    commonMistakes: [
      "Initializing max_so_far to 0 instead of root.val. If tree nodes are negative (e.g. -5, -3), 0 is larger than all of them and corrupts the count.",
      "Only comparing node.val to its immediate parent instead of all ancestors along the path.",
      "Sharing a single global max variable across different branches of the tree instead of passing the path's max as a parameter.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def good_nodes(root: TreeNode) -> int:
    # Return the count of nodes whose values are >= all ancestors on the path from root.
    # Tip: carry the running maximum value seen along the path down into recursive calls.
    pass
`,
    optimalSolution: `from typing import Optional


# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


def good_nodes(root: TreeNode) -> int:
    # Helper function that counts good nodes in the subtree under node
    def dfs(node: Optional[TreeNode], max_so_far: int) -> int:
        # Base case: empty spot adds 0 good nodes
        if node is None:
            return 0

        # This node is good if its value is at least as large as the highest ancestor
        count = 1 if node.val >= max_so_far else 0

        # Update the highest value seen so far on this path
        new_max = max(max_so_far, node.val)

        # Count good nodes in both left and right branches with the updated max
        left_count = dfs(node.left, new_max)
        right_count = dfs(node.right, new_max)

        # Return total good nodes in this subtree
        return count + left_count + right_count

    # The root's value is the starting maximum for the path
    return dfs(root, root.val)
`,
    bruteForceSolution: `from collections import deque


def good_nodes(root: TreeNode) -> int:
    # BFS queue storing (node, max_on_path)
    count = 0
    queue = deque([(root, root.val)])
    while queue:
        node, max_so_far = queue.popleft()
        if node.val >= max_so_far:
            count += 1
        new_max = max(max_so_far, node.val)
        if node.left is not None:
            queue.append((node.left, new_max))
        if node.right is not None:
            queue.append((node.right, new_max))
    return count
`,
    harness: { kind: "function", entry: "good_nodes", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [3, 1, 4, 3, null, 1, 5] },
        expected: 4,
        description: "Root 3, 4, 5, and the 3 (left child of 4) are good nodes.",
      },
      {
        input: { root: [3, 3, null, 4, 2] },
        expected: 3,
        description: "Root 3, left child 3, and 4 are good; 2 is smaller than ancestor 3.",
      },
      {
        input: { root: [1] },
        expected: 1,
        description: "A lone root node is always good.",
      },
      { input: { root: [2, null, 4, 10, 8, null, null, 4] }, expected: 4 },
      { input: { root: [-1, 5, -2, 4, 4, 2, -2] }, expected: 3 },
      { input: { root: [9, null, 3, 6] }, expected: 1, description: "Only 9 is good because all other nodes are smaller than 9." },
      { input: { root: [5, 5, 5, 5, 5] }, expected: 5, description: "All equal values count as good because 5 >= 5." },
    ],
  },

  // ------------------------------------------------------------------ validate-binary-search-tree
  {
    id: "validate-binary-search-tree",
    summary:
      "Given the `root` of a binary tree, determine if it is a **valid Binary Search Tree** (BST). A binary tree is a valid BST if and only if for every node: all values in its left subtree are **strictly less** than the node's value, and all values in its right subtree are **strictly greater** than the node's value.",
    constraints: [
      "1 ≤ number of nodes in the tree ≤ 10,000",
      "-2^31 ≤ node value ≤ 2^31 - 1",
    ],
    pattern: "DFS passing valid range (low, high) bounds down the tree",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "We visit each node once. Checking if node.val falls between low and high takes O(1) time. Total time: O(n).",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "The recursion stack holds calls up to the tree height h: O(log n) for a balanced tree, O(n) for a straight line.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "float('-inf') and float('inf')",
        plainEnglishExplanation:
          "`float('-inf')` and `float('inf')` represent negative and positive infinity in Python, smaller and larger than any real number.",
        exampleSnippet:
          "low = float('-inf')\nhigh = float('inf')\nprint(low < -999999)\nprint(high > 999999)",
        whyWeUseItHere:
          "The root of the BST has no ancestor constraints, so its allowed range begins at (-inf, +inf).",
      },
      {
        keywordOrMethod: "not (low < node.val < high)",
        plainEnglishExplanation:
          "Python supports chained comparisons. `low < node.val < high` checks that `node.val` is strictly between `low` and `high`.",
        exampleSnippet:
          "x = 5\nprint(1 < x < 10)\nprint(5 < x < 10)",
        whyWeUseItHere:
          "Every node in a BST must strictly fall between its allowed lower and upper boundaries.",
      },
      {
        keywordOrMethod: "validate(node.left, low, node.val)",
        plainEnglishExplanation:
          "Recursing into the left child updates the upper bound to `node.val`, enforcing that all left descendants are strictly smaller.",
        exampleSnippet:
          "def check(x):\n    return x > 0\nprint(check(5) and check(10))",
        whyWeUseItHere:
          "Shrinks the allowed range for all nodes in the left subtree.",
      },
      {
        keywordOrMethod: "TreeNode: node.val, node.left, node.right",
        plainEnglishExplanation:
          "Accesses the integer value and children of a binary tree node.",
        exampleSnippet:
          "node = TreeNode(7)\nprint(node.val)",
        whyWeUseItHere:
          "Reads the value of the current node to check bounds and pass as new limits.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [2, 1, 3] },
      focus: ["node", "low", "high"],
    },
    intuitiveExplanation: {
      intuition:
        "A common trap is to only check whether a node is greater than its left child and smaller than its right child. But BST rules apply to ALL descendants! If a root has value 5, NO node anywhere in its left subtree can be ≥ 5, and NO node anywhere in its right subtree can be ≤ 5. Think of it like giving each node an allowed window (low, high). The root has the entire universe (-inf, +inf) as its window. When you step to the left, the current node sets a ceiling: you can never exceed it. When you step to the right, the current node sets a floor: you can never go below it. Every node must stay strictly inside its window!",
      edgeCases: [
        "Duplicate values: BST requires strictly less and strictly greater, so duplicate values (e.g. [2, 2, 2]) make the tree invalid.",
        "Valid locally but invalid globally: e.g. root is 5, right child is 6, 6's left child is 3. 3 < 6 is valid locally, but 3 is in 5's right subtree where all values must exceed 5!",
        "Extreme 32-bit values: using float('-inf') and float('inf') prevents bugs when node values match -2^31 or 2^31 - 1.",
      ],
      stepByStepWalkthrough: [
        "Define a helper validate(node, low, high).",
        "Base case: if node is None, an empty spot is always valid: return True.",
        "Check if node.val is strictly inside the bounds: if not (low < node.val < high), return False.",
        "Recurse on the left child with bounds (low, node.val): ceiling tightens to node.val.",
        "Recurse on the right child with bounds (node.val, high): floor tightens to node.val.",
        "Return True only if both the left and right subtrees are valid.",
        "Call validate(root, float('-inf'), float('inf')).",
      ],
    },
    hints: {
      conceptual:
        "Why is checking node.left.val < node.val < node.right.val not enough? What if a node deep in the right subtree is smaller than the tree's root?",
      structural:
        "Write a recursive helper validate(node, low, high). When moving to node.left, pass high = node.val. When moving to node.right, pass low = node.val. Initial bounds are -inf and +inf.",
    },
    commonMistakes: [
      "Only comparing each node to its direct children. A grandchild could easily violate the root's constraint.",
      "Allowing <= or >= instead of strict < and >. Equal values are not allowed in a standard BST.",
      "Using integer minimum (-2147483648) as the initial lower bound, which falsely rejects a tree whose node value is that exact minimum.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def is_valid_bst(root: Optional[TreeNode]) -> bool:
    # Return True if the tree is a valid Binary Search Tree, False otherwise.
    # Tip: each node must fall strictly between an allowed lower and upper bound.
    pass
`,
    optimalSolution: `from typing import Optional


def is_valid_bst(root: Optional[TreeNode]) -> bool:
    # Helper that checks whether all nodes in subtree fall strictly within (low, high)
    def validate(node: Optional[TreeNode], low: float, high: float) -> bool:
        # An empty node is valid by definition
        if node is None:
            return True

        # Value must be strictly greater than low and strictly less than high
        if not (low < node.val < high):
            return False

        # Going left: upper bound becomes node.val (all left descendants must be < node.val)
        # Going right: lower bound becomes node.val (all right descendants must be > node.val)
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)

    # The root can have any value from negative infinity to positive infinity
    return validate(root, float("-inf"), float("inf"))
`,
    bruteForceSolution: `from typing import Optional


def is_valid_bst(root: Optional[TreeNode]) -> bool:
    # In-order traversal of a valid BST must produce strictly increasing values
    values = []

    def inorder(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        inorder(node.left)
        values.append(node.val)
        inorder(node.right)

    inorder(root)
    for i in range(len(values) - 1):
        if values[i] >= values[i + 1]:
            return False
    return True
`,
    harness: { kind: "function", entry: "is_valid_bst", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [2, 1, 3] },
        expected: true,
        description: "1 < 2 < 3; perfectly valid BST.",
      },
      {
        input: { root: [5, 1, 4, null, null, 3, 6] },
        expected: false,
        description: "Root is 5, but its right child is 4 which is smaller than 5.",
      },
      {
        input: { root: [5, 4, 6, null, null, 3, 7] },
        expected: false,
        description: "Node 3 is in 5's right subtree, but 3 is not greater than 5.",
      },
      {
        input: { root: [1] },
        expected: true,
        description: "A single node is always a valid BST.",
      },
      {
        input: { root: [2, 2, 2] },
        expected: false,
        description: "Duplicate values violate strict inequality.",
      },
      {
        input: { root: [10, 5, 15, null, null, 6, 20] },
        expected: false,
        description: "6 is in 10's right subtree, but 6 < 10.",
      },
      { input: { root: [2147483647] }, expected: true },
      { input: { root: [1, null, 2, null, 3] }, expected: true },
    ],
  },

  // ------------------------------------------------------------------ kth-smallest-element-in-a-bst
  {
    id: "kth-smallest-element-in-a-bst",
    summary:
      "Given the `root` of a binary search tree and an integer `k`, return the `k`th smallest value (**1-indexed**) among all node values in the tree.",
    constraints: [
      "The number of nodes in the tree is n",
      "1 ≤ k ≤ n ≤ 10,000",
      "0 ≤ node value ≤ 10,000",
    ],
    pattern: "In-order traversal (Left, Root, Right) visits nodes in strictly ascending order",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(h + k)",
      explanation:
        "We traverse down to the leftmost node in O(h) time, then visit exactly k nodes before returning immediately. We never need to visit the remaining n - k nodes.",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "The stack stores nodes along one branch down the tree, which takes O(h) space (O(log n) for balanced, O(n) for skewed).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "stack = []",
        plainEnglishExplanation:
          "A Python list used as a stack (pushing with `append()` and popping with `pop()`).",
        exampleSnippet:
          "st = []\nst.append(1)\nst.append(2)\nprint(st.pop())",
        whyWeUseItHere:
          "Simulates recursion to traverse in-order and pause the moment the kth node is reached.",
      },
      {
        keywordOrMethod: "while curr is not None or stack:",
        plainEnglishExplanation:
          "Loops as long as there is an active node being inspected or nodes waiting to be processed on the stack.",
        exampleSnippet:
          "items = [1, 2]\nwhile items:\n    print(items.pop())",
        whyWeUseItHere:
          "Coordinates the iterative in-order traversal of the BST.",
      },
      {
        keywordOrMethod: "k -= 1; if k == 0: return curr.val",
        plainEnglishExplanation:
          "Decrements `k` for each node visited in sorted order. When `k` reaches 0, the current node is the answer.",
        exampleSnippet:
          "k = 3\nwhile k > 0:\n    k -= 1\n    if k == 0:\n        print('k is zero')",
        whyWeUseItHere:
          "Counts down from k to stop immediately when the kth smallest value is visited.",
      },
      {
        keywordOrMethod: "curr = curr.right",
        plainEnglishExplanation:
          "After visiting a node, moves to its right child to explore the next larger values in the tree.",
        exampleSnippet:
          "node = TreeNode(2, None, TreeNode(3))\ncurr = node.right\nprint(curr.val)",
        whyWeUseItHere:
          "Follows in-order traversal sequence: Left, Root, Right.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [3, 1, 4, null, 2], k: 1 },
      focus: ["curr", "k", "stack"],
    },
    intuitiveExplanation: {
      intuition:
        "In a Binary Search Tree, an in-order traversal (exploring left, visiting current, exploring right) visits every node in perfectly sorted ascending order—like flipping through pages of a dictionary in alphabetical order. If you want the kth smallest word, you don't need to read the entire dictionary! You just open to page 1, count up to page k, and read that word. By using a stack to walk in-order iteratively, you stop the moment your counter hits k.",
      edgeCases: [
        "k = 1: the very smallest element, located at the leftmost leaf.",
        "k = n: the largest element, located at the rightmost leaf.",
        "Skewed tree: stack holds all nodes on the branch, still finds the correct answer.",
      ],
      stepByStepWalkthrough: [
        "Create an empty stack = [] and start a pointer curr = root.",
        "While curr is not None or stack is not empty:",
        "Push curr and all of its left descendants onto stack until reaching None (the smallest remaining node).",
        "Pop the top node from stack into curr.",
        "Decrement k by 1.",
        "If k reaches 0, curr is our kth smallest node: return curr.val.",
        "Set curr = curr.right to move to the next larger values in the tree.",
      ],
    },
    hints: {
      conceptual:
        "In what order does an in-order traversal visit nodes in a BST? How can you use that order to find the kth smallest element without sorting?",
      structural:
        "Use an explicit stack for iterative in-order traversal. Push all left nodes, pop one, decrement k, and if k == 0 return that node's value. Otherwise set curr = curr.right.",
    },
    commonMistakes: [
      "Collecting all n nodes into an array and sorting them. The in-order traversal is already sorted, so sorting is redundant and wastes O(n log n) time.",
      "Traversing the whole tree even when k = 1. Stopping early after k visits is much faster.",
      "Off-by-one errors with k, since k is 1-indexed.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def kth_smallest(root: Optional[TreeNode], k: int) -> int:
    # Return the kth smallest value (1-indexed) in the binary search tree.
    # Tip: an in-order traversal visits nodes in ascending order; stop at the kth node.
    pass
`,
    optimalSolution: `from typing import Optional


def kth_smallest(root: Optional[TreeNode], k: int) -> int:
    # Explicit stack to walk the tree in in-order without recursing
    stack = []
    curr = root

    # Loop while we have unvisited nodes or nodes waiting on the stack
    while curr is not None or stack:
        # Go as deep left as possible, pushing every node along the way
        while curr is not None:
            stack.append(curr)
            curr = curr.left

        # The top of the stack is the smallest remaining node
        curr = stack.pop()
        # Count this visited node
        k -= 1

        # If this is the kth node visited, we have found our answer
        if k == 0:
            return curr.val

        # Move to the right child to inspect the next larger values
        curr = curr.right

    return -1
`,
    bruteForceSolution: `from typing import Optional


def kth_smallest(root: Optional[TreeNode], k: int) -> int:
    # Full recursive in-order traversal collecting all values into a list
    elements = []

    def inorder(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        inorder(node.left)
        elements.append(node.val)
        inorder(node.right)

    inorder(root)
    # k is 1-indexed, so kth smallest is at index k - 1
    return elements[k - 1]
`,
    harness: { kind: "function", entry: "kth_smallest", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [3, 1, 4, null, 2], k: 1 },
        expected: 1,
        description: "Sorted values are [1, 2, 3, 4]; the 1st smallest is 1.",
      },
      {
        input: { root: [5, 3, 6, 2, 4, null, null, 1], k: 3 },
        expected: 3,
        description: "Sorted values are [1, 2, 3, 4, 5, 6]; the 3rd smallest is 3.",
      },
      {
        input: { root: [1], k: 1 },
        expected: 1,
        description: "Single node tree, 1st smallest is root itself.",
      },
      { input: { root: [2, 1, 3], k: 2 }, expected: 2 },
      { input: { root: [2, 1, 3], k: 3 }, expected: 3 },
      { input: { root: [4, 2, 5, null, 3], k: 2 }, expected: 3 },
      { input: { root: [5, 1, 7], k: 1 }, expected: 1 },
    ],
  },

  // ------------------------------------------------------------------ construct-binary-tree-from-preorder-and-inorder-traversal
  {
    id: "construct-binary-tree-from-preorder-and-inorder-traversal",
    summary:
      "Given two integer arrays `preorder` and `inorder` where `preorder` is the **preorder traversal** and `inorder` is the **inorder traversal** of the same binary tree (with all unique values), construct and return the binary tree.",
    constraints: [
      "1 ≤ preorder.length ≤ 3,000",
      "inorder.length == preorder.length",
      "-3,000 ≤ preorder[i], inorder[i] ≤ 3,000",
      "All values in preorder and inorder are unique",
      "preorder and inorder are guaranteed to be valid traversals of the same tree",
    ],
    pattern: "Divide and conquer with hash map for O(1) inorder index lookups",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Building the index map for inorder takes O(n). Each recursive step creates one TreeNode in O(1) time using boundary indices rather than copying array slices. Total time: O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The hash map stores n entries. The call stack depth is bounded by tree height h (up to n for skewed trees). Total space: O(n).",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "inorder_map = {val: i for i, val in enumerate(inorder)}",
        plainEnglishExplanation:
          "A dictionary comprehension using `enumerate()` to map each value to its index in the `inorder` list.",
        exampleSnippet:
          "nums = ['a', 'b', 'c']\nidx_map = {v: i for i, v in enumerate(nums)}\nprint(idx_map)",
        whyWeUseItHere:
          "Enables instant O(1) lookup of where the root sits in the inorder traversal.",
      },
      {
        keywordOrMethod: "nonlocal pre_idx",
        plainEnglishExplanation:
          "Allows the nested helper function to modify the `pre_idx` variable belonging to the enclosing function.",
        exampleSnippet:
          "def demo():\n    counter = 0\n    def bump():\n        nonlocal counter\n        counter += 1\n    bump()\n    print(counter)\ndemo()",
        whyWeUseItHere:
          "Steps forward through `preorder` sequentially across recursive calls.",
      },
      {
        keywordOrMethod: "root = TreeNode(root_val)",
        plainEnglishExplanation:
          "Creates a new tree node holding the integer `root_val`.",
        exampleSnippet:
          "node = TreeNode(42)\nprint(node.val)",
        whyWeUseItHere:
          "Constructs the root node of the current subtree.",
      },
      {
        keywordOrMethod: "helper(in_left, mid - 1)",
        plainEnglishExplanation:
          "Passes integer boundary indices into the recursive call instead of slicing the array.",
        exampleSnippet:
          "def helper(l, r):\n    print(l, r)\nhelper(0, 5)",
        whyWeUseItHere:
          "Avoids copying arrays, keeping time complexity strictly O(n).",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] },
      focus: ["root", "root_val"],
    },
    intuitiveExplanation: {
      intuition:
        "Preorder traversal always visits [Root, Left Subtree, Right Subtree]. That means the very first number in preorder is guaranteed to be the root of the tree! Once you know the root's value, look for it in the inorder array. Inorder traversal visits [Left Subtree, Root, Right Subtree]. So in inorder, everything to the left of that root belongs to its left subtree, and everything to the right belongs to its right subtree! By using a hash map to find the root's position in inorder instantly, you can split the problem into two smaller subtrees and build the entire tree recursively.",
      edgeCases: [
        "Single node tree: preorder = [1], inorder = [1].",
        "Tree only has left children: every root's mid index equals in_right, so all nodes go to the left.",
        "Tree only has right children: every root's mid index equals in_left, so all nodes go to the right.",
      ],
      stepByStepWalkthrough: [
        "Create a hash map inorder_map mapping each value to its index in inorder.",
        "Keep a pointer pre_idx = 0 to track the next root in preorder.",
        "Define helper(in_left, in_right):",
        "If in_left > in_right, there are no nodes in this subtree: return None.",
        "Read root_val = preorder[pre_idx], increment pre_idx += 1, and create root = TreeNode(root_val).",
        "Find mid = inorder_map[root_val] to locate root in inorder.",
        "Build left subtree: root.left = helper(in_left, mid - 1).",
        "Build right subtree: root.right = helper(mid + 1, in_right).",
        "Return root.",
        "Start by calling helper(0, len(inorder) - 1).",
      ],
    },
    hints: {
      conceptual:
        "What does preorder tell you about the root of any subtree? Once you know the root, what does inorder tell you about which elements belong to the left and right subtrees?",
      structural:
        "Map each value in inorder to its index using a dictionary. Recursively construct the tree by advancing an index through preorder and splitting the inorder range [left, right] around mid.",
    },
    commonMistakes: [
      "Slicing arrays at each recursive step (e.g. preorder[1:mid]). Slicing copies elements and inflates time complexity to O(n²). Use index bounds instead.",
      "Building the right child before the left child. Because preorder traverses left children before right children, the left child must be built first.",
      "Calling inorder.index(root_val) inside the recursion, which scans in O(n) each time. Build a dictionary once upfront.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def build_tree(preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:
    # Construct binary tree from preorder and inorder traversal arrays.
    # Tip: preorder[0] is the root; find its index in inorder to divide left and right subtrees.
    pass
`,
    optimalSolution: `from typing import Optional


def build_tree(preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:
    # Map each value to its index in inorder for instant O(1) lookups
    inorder_map = {val: i for i, val in enumerate(inorder)}

    # Index of the next root node to take from preorder
    pre_idx = 0

    # Recursive helper that constructs subtree within inorder range [in_left, in_right]
    def helper(in_left: int, in_right: int) -> Optional[TreeNode]:
        nonlocal pre_idx

        # Base case: if there are no elements left in this subtree range
        if in_left > in_right:
            return None

        # The next element in preorder is always the root of the current subtree
        root_val = preorder[pre_idx]
        pre_idx += 1

        # Create the root node
        root = TreeNode(root_val)

        # Find where this root sits in inorder to split left and right subtrees
        mid = inorder_map[root_val]

        # Must build left subtree first because preorder lists left children before right
        root.left = helper(in_left, mid - 1)
        root.right = helper(mid + 1, in_right)

        return root

    # Build the entire tree spanning the full length of the inorder list
    return helper(0, len(inorder) - 1)
`,
    bruteForceSolution: `from typing import Optional


def build_tree(preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:
    # Recursive solution using array slicing
    if not preorder or not inorder:
        return None

    root_val = preorder[0]
    root = TreeNode(root_val)
    mid = inorder.index(root_val)

    root.left = build_tree(preorder[1 : mid + 1], inorder[:mid])
    root.right = build_tree(preorder[mid + 1 :], inorder[mid + 1 :])
    return root
`,
    harness: { kind: "function", entry: "build_tree", returnType: "tree" },
    testCases: [
      {
        input: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] },
        expected: [3, 9, 20, null, null, 15, 7],
        description: "3 is the root; 9 is left child; 20 is right child with children 15 and 7.",
      },
      {
        input: { preorder: [-1], inorder: [-1] },
        expected: [-1],
        description: "Single node tree.",
      },
      {
        input: { preorder: [1, 2, 3], inorder: [2, 1, 3] },
        expected: [1, 2, 3],
        description: "1 is root with left child 2 and right child 3.",
      },
      { input: { preorder: [1, 2], inorder: [2, 1] }, expected: [1, 2] },
      { input: { preorder: [1, 2], inorder: [1, 2] }, expected: [1, null, 2] },
      { input: { preorder: [1, 2, 4, 5, 3], inorder: [4, 2, 5, 1, 3] }, expected: [1, 2, 3, 4, 5] },
      { input: { preorder: [4, 2, 1, 3, 6, 5, 7], inorder: [1, 2, 3, 4, 5, 6, 7] }, expected: [4, 2, 6, 1, 3, 5, 7] },
    ],
  },

  // ------------------------------------------------------------------ binary-tree-maximum-path-sum
  {
    id: "binary-tree-maximum-path-sum",
    summary:
      "A **path** in a binary tree is a sequence of nodes where each adjacent pair is connected by an edge. A node can appear at most once in the path. The **path sum** is the sum of the node values in the path. Given the `root` of a binary tree, return the **maximum path sum** of any non-empty path. The path does **not** have to go through the root.",
    constraints: [
      "1 ≤ number of nodes in the tree ≤ 30,000",
      "-1,000 ≤ node value ≤ 1,000",
    ],
    pattern: "Post-order DFS: return max branch sum to parent while recording global max arched path",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "We visit every node once during the post-order DFS. At each node, computing branch gains and updating the global record takes O(1) time. Total time: O(n).",
    },
    spaceComplexity: {
      optimal: "O(h)",
      explanation:
        "The recursion stack holds calls up to the tree height h: O(log n) for a balanced tree, O(n) for a straight line.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "max_sum = float('-inf')",
        plainEnglishExplanation:
          "Initializes the record variable to negative infinity so that even if all node values are negative, the highest negative value can still be found.",
        exampleSnippet:
          "best = float('-inf')\nfor val in [-50, -20, -5]:\n    best = max(best, val)\nprint(best)",
        whyWeUseItHere:
          "A path sum can be negative if all node values in the tree are negative.",
      },
      {
        keywordOrMethod: "nonlocal max_sum",
        plainEnglishExplanation:
          "Allows the nested `dfs` helper to reassign `max_sum` in the outer function's scope.",
        exampleSnippet:
          "def demo():\n    total = 0\n    def add(x):\n        nonlocal total\n        total += x\n    add(5)\n    print(total)\ndemo()",
        whyWeUseItHere:
          "Every recursive call can update the shared global record.",
      },
      {
        keywordOrMethod: "max(dfs(node.left), 0)",
        plainEnglishExplanation:
          "Clamping with `max(..., 0)` chooses to completely ignore a branch if its total contribution would be negative.",
        exampleSnippet:
          "branch_gain = -15\ncontribution = max(branch_gain, 0)\nprint(contribution)",
        whyWeUseItHere:
          "A path never has to extend into a child branch that reduces its total sum.",
      },
      {
        keywordOrMethod: "return node.val + max(left_gain, right_gain)",
        plainEnglishExplanation:
          "Returns the node's value plus the single best child branch extending down from it.",
        exampleSnippet:
          "print(5 + 3 + 4)",
        whyWeUseItHere:
          "To extend upward to its parent, a path can only travel down ONE of its children.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [-10, 9, 20, null, null, 15, 7] },
      focus: ["node", "current_path_sum"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of the tree as a network of toll roads and treasure troves: some nodes give you money (positive values), and some cost you money (negative values). Any valid path has one highest node where it bends—the apex of the arch. At that apex, the path can gather the treasure from its left branch and its right branch: node.val + left_gain + right_gain. If a branch loses money overall (sum < 0), you simply ignore that branch by choosing 0 instead! But here is the catch: when this apex node reports back up to its parent, it cannot send both branches. A road cannot split into two directions! It can only send the best single branch upward: node.val + max(left_gain, right_gain).",
      edgeCases: [
        "All negative nodes (e.g. [-3]): the path must be non-empty, so the answer is the single highest negative value (-3). Initializing max_sum to float('-inf') handles this correctly.",
        "Single node tree: returns root.val.",
        "Maximum path is contained entirely within a deep branch and never passes through the root.",
      ],
      stepByStepWalkthrough: [
        "Initialize max_sum = float('-inf') to track the best complete path found anywhere.",
        "Define a helper dfs(node) that returns the maximum single branch sum extending down from node.",
        "Base case: if node is None, return 0.",
        "Recursively compute left_gain = max(dfs(node.left), 0). Clamping with 0 ignores negative branches.",
        "Recursively compute right_gain = max(dfs(node.right), 0).",
        "The best path bending at this node is current_path_sum = node.val + left_gain + right_gain.",
        "Update our record: max_sum = max(max_sum, current_path_sum).",
        "Return node.val + max(left_gain, right_gain) to the parent caller.",
        "Call dfs(root) and return int(max_sum).",
      ],
    },
    hints: {
      conceptual:
        "At each node, what is the best path that has this node as its highest point? What is the best path this node can offer to its parent above?",
      structural:
        "Use post-order DFS. For each child, compute max(dfs(child), 0) to discard negative sums. Update a nonlocal max_sum with node.val + left + right. Return node.val + max(left, right).",
    },
    commonMistakes: [
      "Returning node.val + left + right to the parent. That would form a fork/branch in the path, which is illegal for a simple path.",
      "Initializing max_sum to 0. If all node values are negative (e.g. [-3]), the code would return 0 instead of -3.",
      "Forgetting max(gain, 0), so negative branches drag down the total sum when they could just be excluded.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def max_path_sum(root: Optional[TreeNode]) -> int:
    # Return the maximum path sum of any non-empty path in the binary tree.
    # Tip: at each node, consider the path bending there, and return only the best single branch upward.
    pass
`,
    optimalSolution: `from typing import Optional


def max_path_sum(root: Optional[TreeNode]) -> int:
    # Track the best path sum across the entire tree; start at negative infinity
    max_sum = float("-inf")

    # Helper returns the maximum single-branch path sum extending down from node
    def dfs(node: Optional[TreeNode]) -> int:
        nonlocal max_sum

        # Base case: empty spot contributes 0
        if node is None:
            return 0

        # Recursively get best sum from left and right children;
        # clamp to 0 with max(..., 0) so we ignore branches with negative sums
        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)

        # The path that bends at this node combines both left and right branches
        current_path_sum = node.val + left_gain + right_gain

        # Check if this bent path beats our overall record
        max_sum = max(max_sum, current_path_sum)

        # To the parent above, we can only continue down ONE branch
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return int(max_sum)
`,
    bruteForceSolution: `from typing import Optional


def max_path_sum(root: Optional[TreeNode]) -> int:
    # Alternative checking each node as the peak of the path
    def branch_gain(node: Optional[TreeNode]) -> int:
        if node is None:
            return 0
        return node.val + max(0, max(branch_gain(node.left), branch_gain(node.right)))

    best = float("-inf")

    def check_peaks(node: Optional[TreeNode]) -> None:
        nonlocal best
        if node is None:
            return
        left = max(0, branch_gain(node.left))
        right = max(0, branch_gain(node.right))
        best = max(best, node.val + left + right)
        check_peaks(node.left)
        check_peaks(node.right)

    check_peaks(root)
    return int(best)
`,
    harness: { kind: "function", entry: "max_path_sum", argTypes: { root: "tree" } },
    testCases: [
      {
        input: { root: [1, 2, 3] },
        expected: 6,
        description: "The path 2 -> 1 -> 3 has sum 2 + 1 + 3 = 6.",
      },
      {
        input: { root: [-10, 9, 20, null, null, 15, 7] },
        expected: 42,
        description: "The path 15 -> 20 -> 7 has sum 15 + 20 + 7 = 42.",
      },
      {
        input: { root: [-3] },
        expected: -3,
        description: "Single negative node; path must be non-empty so answer is -3.",
      },
      {
        input: { root: [2, -1] },
        expected: 2,
        description: "Node 2 alone is better than including negative child -1.",
      },
      { input: { root: [-2, 1] }, expected: 1 },
      { input: { root: [-2, -1] }, expected: -1 },
      { input: { root: [1, -2, 3] }, expected: 4 },
      { input: { root: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1] }, expected: 48 },
    ],
  },

  // ------------------------------------------------------------------ serialize-and-deserialize-binary-tree
  {
    id: "serialize-and-deserialize-binary-tree",
    summary:
      "Design an algorithm to **serialize** and **deserialize** a binary tree. Serialization converts a binary tree into a string so it can be saved to storage or transmitted across a network. Deserialization reconstructs the original binary tree from that serialized string. You can use any encoding format as long as `deserialize(serialize(root))` restores the exact original tree structure and values.",
    constraints: [
      "0 ≤ number of nodes in the tree ≤ 10,000",
      "-1,000 ≤ node value ≤ 1,000",
      "The tree can be empty (`root` is `None`)",
    ],
    pattern: "Pre-order DFS serialization with delimiters and null sentinels",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Both serialize and deserialize visit each node (and its null child markers) once. String joining and token iteration take linear time O(n).",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "The token list, serialized string, and recursion call stack all use O(n) memory for a tree with n nodes.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class Codec:",
        plainEnglishExplanation:
          "`class` defines an object blueprint. Methods inside take `self` as their first parameter, referring to the specific instance.",
        exampleSnippet:
          "class Dog:\n    def speak(self):\n        return 'woof'\nprint(Dog().speak())",
        whyWeUseItHere:
          "The problem expects a class `Codec` bundling both `serialize` and `deserialize` methods.",
      },
      {
        keywordOrMethod: "','.join(tokens)",
        plainEnglishExplanation:
          "`','.join(list)` concatenates a list of strings into one single string separated by commas.",
        exampleSnippet:
          "items = ['a', 'b', 'c']\nprint(','.join(items))",
        whyWeUseItHere:
          "Creates a compact comma-separated string representation of the tree.",
      },
      {
        keywordOrMethod: "data.split(',')",
        plainEnglishExplanation:
          "`split(',')` breaks a string apart wherever a comma occurs, returning a list of substring tokens.",
        exampleSnippet:
          "text = '1,2,3'\nprint(text.split(','))",
        whyWeUseItHere:
          "Unpacks the serialized string into individual node tokens.",
      },
      {
        keywordOrMethod: "vals = iter(...) and next(vals)",
        plainEnglishExplanation:
          "`iter()` turns a list into an iterator. `next(vals)` grabs the next item from the front one by one, keeping track of position automatically.",
        exampleSnippet:
          "it = iter(['apple', 'banana'])\nprint(next(it))\nprint(next(it))",
        whyWeUseItHere:
          "Allows each recursive call in pre-order reconstruction to consume its own token without managing an explicit index.",
      },
    ],
    visualizerType: "tree",
    visualization: {
      input: { root: [1, 2, 3, null, null, 4, 5] },
      focus: ["tokens", "data"],
    },
    intuitiveExplanation: {
      intuition:
        "Usually, knowing just the pre-order traversal of a tree isn't enough to rebuild it, because you can't tell whether a node was a left child or a right child. But if you write down an explicit symbol like 'N' every time you hit an empty spot (None), the mystery disappears! Pre-order visits [Root, Left, Right]. When reading the string back, an iterator feeds you tokens one by one: if the next token is 'N', you know that branch is empty. If it's a number, you make that node, and immediately hand the remaining tokens to its left child, then its right child. Every piece snaps right back into its original place!",
      edgeCases: [
        "Empty tree (root is None): serializes to 'N' and deserializes back to None (which represents []).",
        "Single node tree: serializes to '1,N,N' and deserializes back to TreeNode(1).",
        "Skewed tree (e.g. only right children): serializes correctly with 'N' markers on all missing left children.",
      ],
      stepByStepWalkthrough: [
        "In serialize(root):",
        "Initialize tokens = [].",
        "Define dfs(node): if node is None, append 'N' and return; otherwise append str(node.val), then dfs(node.left), then dfs(node.right).",
        "Call dfs(root) and return ','.join(tokens).",
        "In deserialize(data):",
        "Turn tokens into an iterator: vals = iter(data.split(',')).",
        "Define dfs(): pop next token with next(vals). If 'N', return None. Otherwise make TreeNode(int(val)), recurse node.left = dfs(), node.right = dfs(), and return node.",
        "Return dfs().",
      ],
    },
    hints: {
      conceptual:
        "If you record an explicit marker like 'N' for every None child, how does pre-order traversal allow you to uniquely rebuild the entire tree?",
      structural:
        "In Codec, write serialize using recursive DFS adding node values or 'N' to a list and joining with commas. In deserialize, convert data.split(',') into an iterator and consume tokens recursively in pre-order.",
    },
    commonMistakes: [
      "Not recording None children in the serialized string, making it impossible to reconstruct the exact structure.",
      "Using repeated string concatenation (s += ...) instead of appending to a list and using ','.join(tokens)'. In Python, string concatenation in a loop is O(n²).",
      "Not handling an empty tree (root is None) gracefully.",
    ],
    starterCode: `from typing import Optional

# Definition for a binary tree node (already provided for you):
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        # Encodes a binary tree to a single string.
        # Tip: pre-order DFS recording a marker like 'N' for None nodes uniquely encodes the tree.
        pass

    def deserialize(self, data: str) -> Optional[TreeNode]:
        # Decodes your encoded data back to the original binary tree.
        # Tip: consume tokens using an iterator to reconstruct nodes in pre-order.
        pass
`,
    optimalSolution: `from typing import Optional


class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        # Encode the tree into a single string using pre-order traversal
        tokens = []

        def dfs(node: Optional[TreeNode]) -> None:
            # Base case: record 'N' for empty spots to preserve structure
            if node is None:
                tokens.append("N")
                return

            # Record the current node's value
            tokens.append(str(node.val))
            # Recurse on left child, then right child
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        # Join all tokens with commas
        return ",".join(tokens)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        # Decode the string back into a binary tree
        # Use an iterator so each recursive call consumes the next token
        vals = iter(data.split(","))

        def dfs() -> Optional[TreeNode]:
            val = next(vals)
            # If the token is 'N', this was an empty spot
            if val == "N":
                return None

            # Reconstruct the node with its integer value
            node = TreeNode(int(val))
            # Pre-order: left child was encoded first, then right child
            node.left = dfs()
            node.right = dfs()
            return node

        return dfs()
`,
    bruteForceSolution: `from collections import deque
from typing import Optional


class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        # BFS level-order serialization
        if root is None:
            return ""
        queue = deque([root])
        tokens = []
        while queue:
            node = queue.popleft()
            if node is None:
                tokens.append("N")
            else:
                tokens.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
        return ",".join(tokens)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        # BFS level-order deserialization
        if not data:
            return None
        vals = data.split(",")
        root = TreeNode(int(vals[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(vals):
            node = queue.popleft()
            if vals[i] != "N":
                node.left = TreeNode(int(vals[i]))
                queue.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != "N":
                node.right = TreeNode(int(vals[i]))
                queue.append(node.right)
            i += 1
        return root
`,
    harness: { kind: "custom", entry: "Codec", runner: "codec-roundtrip" },
    testCases: [
      {
        input: { root: [1, 2, 3, null, null, 4, 5] },
        expected: [1, 2, 3, null, null, 4, 5],
        description: "Classic binary tree roundtrip test.",
      },
      {
        input: { root: [] },
        expected: [],
        description: "Empty tree roundtrip.",
      },
      {
        input: { root: [1] },
        expected: [1],
        description: "Single node tree roundtrip.",
      },
      {
        input: { root: [1, 2] },
        expected: [1, 2],
        description: "Left child only.",
      },
      {
        input: { root: [1, null, 2] },
        expected: [1, null, 2],
        description: "Right child only.",
      },
      { input: { root: [1, 2, 3, 4, 5, 6, 7] }, expected: [1, 2, 3, 4, 5, 6, 7] },
      { input: { root: [-10, 5, 20, -15, 0] }, expected: [-10, 5, 20, -15, 0] },
    ],
  },
];

export default problems;
