import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "classes-and-nodes",
  title: "Classes & Linked Nodes",
  goal: "Understand Python classes, self, and constructors, and build and traverse ListNode and TreeNode data structures.",
  estimatedMinutes: 30,
  icon: "boxes",
  blocks: [
    {
      kind: "text",
      markdown:
        "### Beyond built-in lists\nUp to now, we have stored data in Python's built-in collections: lists, dictionaries, and sets. But when you arrive at **Linked Lists** and **Trees** on LeetCode, problems won't hand you a flat list of numbers.\n\nInstead, they give you custom Python objects called **Nodes** connected to one another through pointers in memory. To solve these problems with confidence, you need to understand how Python **classes** work, what `__init__` and `self` do, and how to navigate from one node to the next.",
    },
    {
      kind: "text",
      markdown:
        "### 1. What is a Class?\nThink of a **class** as a cookie cutter. The cutter itself isn't a cookie—it's the blueprint. Every cookie you stamp out using that cutter is an **object** (or instance).\n\nWhen creating a class in Python:\n- `class Player:` names your blueprint.\n- `def __init__(self, ...):` is the **constructor**. It runs automatically whenever a new object is created.\n- `self` is Python's name for *the specific object being created or modified right now*.\n- `self.score = score` attaches an attribute called `score` to that specific object.",
    },
    {
      kind: "code",
      caption: "`__init__` initializes attributes on the newly created object referenced by `self`.",
      code: `class Player:
    def __init__(self, name, score=0):
        self.name = name
        self.score = score

# Create two independent player instances
p1 = Player("Alice", 100)
p2 = Player("Bob")  # score defaults to 0

print(p1.name, "has score:", p1.score)
print(p2.name, "has score:", p2.score)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "In a Python class method like `def __init__(self, val):`, what does `self` represent?",
        options: [
          "The specific object instance that was just created or called.",
          "A Python keyword that automatically imports external libraries.",
          "A global variable shared across every class in your file.",
          "The name of the class blueprint itself.",
        ],
        answerIndex: 0,
        explanation:
          "`self` represents the specific instance being operated on. When you write `node = ListNode(5)`, Python passes that new node instance to `__init__` as `self`, so `self.val = 5` sets the value on that specific node.",
      },
    },
    {
      kind: "text",
      markdown:
        "### 2. `ListNode`: The Building Block of Linked Lists\nImagine a scavenger hunt. Each clue card has two things:\n1. A piece of treasure or information (`val`)\n2. The address of where the next clue is hidden (`next`)\n\nThe last clue points to `None`, which means the hunt has ended.\n\nIn Python, we model this as a `ListNode` class:",
    },
    {
      kind: "code",
      caption: "Press Visualize to see three node objects created in memory and linked together with `.next` pointers.",
      visualize: true,
      code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Create 3 separate nodes
node1 = ListNode(10)
node2 = ListNode(20)
node3 = ListNode(30)

# Link them together: 10 -> 20 -> 30 -> None
node1.next = node2
node2.next = node3

print("Node 1 value:", node1.val)
print("Node 2 value via node1.next:", node1.next.val)
print("Node 3 value via node1.next.next:", node1.next.next.val)
`,
    },
    {
      kind: "text",
      markdown:
        "### 3. Traversing a Linked List\nIf you want to visit every node in a linked list, you **never** move `head` directly—otherwise you will lose the start of your list!\n\nInstead, create a runner pointer: `curr = head`. Then advance it node by node using `curr = curr.next` inside a `while` loop until `curr` becomes `None`.",
    },
    {
      kind: "code",
      caption: "The canonical while loop traversal pattern for linked lists.",
      code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Build 1 -> 2 -> 3
head = ListNode(1, ListNode(2, ListNode(3)))

# Traverse with a moving pointer
curr = head
while curr:
    print(f"Visiting node with value: {curr.val}")
    curr = curr.next
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = ListNode(5, ListNode(15))
curr = head
total = 0
while curr:
    total += curr.val
    curr = curr.next
print(total)`,
        options: ["5", "15", "20", "0"],
        answerIndex: 2,
        explanation:
          "`curr` visits node 5 (`total = 5`), then advances to node 15 (`total = 5 + 15 = 20`), then advances to `None` and the while loop finishes.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 4. `__repr__` for Friendly Debugging\nBy default, printing a Python object outputs an unhelpful memory address like `<__main__.ListNode object at 0x7f9a1b>`. That tells you nothing when debugging!\n\nDefining the `__repr__` method tells Python how to format the object into human-readable text whenever it's printed or inspected in an interactive shell.",
    },
    {
      kind: "code",
      caption: "`__repr__` gives custom objects clear, friendly representations during print() calls.",
      code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __repr__(self):
        return f"ListNode({self.val})"

node = ListNode(42)
print("With __repr__ defined:", node)
`,
    },
    {
      kind: "text",
      markdown:
        "### 5. `TreeNode`: Branching into Left and Right\nA linked list node points to **one** next node. A binary tree node branches out, pointing to **two** possible children: `left` and `right`.\n\nThink of a family tree or a fork in a hiking trail where you can choose the left path or the right path. If a child doesn't exist, its pointer is `None`.",
    },
    {
      kind: "code",
      caption: "A TreeNode holds a value and references to its left and right child nodes.",
      code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Construct a small tree:
#       1
#      / \\
#     2   3
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)

print("Root value:", root.val)
print("Left child value:", root.left.val)
print("Right child value:", root.right.val)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

root = TreeNode(10, TreeNode(5), TreeNode(20))
print(root.left.val + root.right.val)`,
        options: ["15", "25", "30", "35"],
        answerIndex: 1,
        explanation:
          "`root.left.val` is 5 and `root.right.val` is 20. `5 + 20 = 25`.",
        predictsOutput: true,
      },
    },
    {
      kind: "callout",
      tone: "insight",
      title: "Pre-defined classes on LeetCode",
      markdown:
        "When solving problems on LeetCode or this website, you do **not** need to define `class ListNode` or `class TreeNode` yourself. The testing environment provides them automatically! Your job is simply to write the algorithm that navigates and connects them.",
    },
    {
      kind: "exercise",
      exercise: {
        id: "classes-count-nodes",
        title: "Count Linked List Nodes",
        prompt:
          "Write a function `count_nodes(head)` that takes the `head` node of a singly-linked list (or `None` if the list is empty) and returns the total number of nodes in the list using a `while` loop.\n\nThe `ListNode` class is already defined for you.",
        starterCode: `# Definition for a singly-linked list node:
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def count_nodes(head) -> int:
    # Traverse the list using a runner pointer and count each node
    return 0
`,
        solution: `def count_nodes(head) -> int:
    count = 0
    curr = head
    while curr is not None:
        count += 1
        curr = curr.next
    return count
`,
        harness: { kind: "function", entry: "count_nodes", argTypes: { head: "linked-list" } },
        testCases: [
          { input: { head: [1, 2, 3, 4] }, expected: 4, description: "List with 4 nodes." },
          { input: { head: [10] }, expected: 1, description: "Single node list." },
          { input: { head: [] }, expected: 0, description: "Empty list has 0 nodes." },
          { input: { head: [7, 7, 7] }, expected: 3 },
          { input: { head: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, expected: 10 },
        ],
        hint: "Initialize `count = 0` and `curr = head`. Inside `while curr is not None:`, increment `count += 1` and move `curr = curr.next`. Return `count`.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "classes-sum-tree",
        title: "Sum Tree Nodes",
        prompt:
          "Write a function `sum_tree(root)` that takes the `root` of a binary tree (or `None`) and returns the sum of all node values in the tree. If the tree is empty (`root is None`), return `0`.\n\nThe `TreeNode` class is already defined for you.",
        starterCode: `# Definition for a binary tree node:
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def sum_tree(root) -> int:
    # If root is None, return 0; otherwise sum root.val and children
    return -1
`,
        solution: `def sum_tree(root) -> int:
    if root is None:
        return 0
    return root.val + sum_tree(root.left) + sum_tree(root.right)
`,
        harness: { kind: "function", entry: "sum_tree", argTypes: { root: "tree" } },
        testCases: [
          { input: { root: [1, 2, 3] }, expected: 6, description: "1 + 2 + 3 = 6." },
          { input: { root: [4, 2, 7, 1, 3] }, expected: 17, description: "4 + 2 + 7 + 1 + 3 = 17." },
          { input: { root: [5] }, expected: 5, description: "Single node." },
          { input: { root: [] }, expected: 0, description: "Empty tree sums to 0." },
          { input: { root: [10, -5, 15] }, expected: 20 },
        ],
        hint: "Base case: `if root is None: return 0`. Recursive step: `return root.val + sum_tree(root.left) + sum_tree(root.right)`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nClasses and node pointers form the foundation of two major NeetCode categories:\n\n- **Reverse Linked List**: reassigns `.next` pointers so the entire list points backward.\n- **Merge Two Sorted Lists**: creates a dummy node and weaves two linked lists together.\n- **Linked List Cycle**: uses two pointers traversing at different speeds to detect loops.\n- **Invert Binary Tree**: swaps `root.left` and `root.right` recursively.\n- **Maximum Depth of Binary Tree**: computes the height of a tree by inspecting left and right subtrees.",
    },
  ],
};

export default lesson;
