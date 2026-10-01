import type { ProblemContent } from "../types";

const LIST_NODE_COMMENT = `# Definition for a singly-linked list node (already provided for you):
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
`;

const RANDOM_NODE_COMMENT = `# Definition for a Node with a random pointer (already provided for you):
# class Node:
#     def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
#         self.val = int(x)
#         self.next = next
#         self.random = random
`;

const problems: ProblemContent[] = [
  // ------------------------------------------------------------------ reverse-linked-list
  {
    id: "reverse-linked-list",
    summary:
      "A **linked list** is a chain of nodes. Each node holds a value (`.val`) and an arrow (`.next`) to the node after it; the last node's arrow is `None`, meaning 'nothing comes after me'. You're given `head`, the first node. Turn every arrow around so the chain runs backwards, then return the new first node (which is the old last node). An empty list arrives as `head = None`.",
    constraints: [
      "0 ≤ number of nodes ≤ 5,000",
      "-5,000 ≤ node value ≤ 5,000",
      "Try to do it without building a second list",
    ],
    pattern: "Walk once, flip each arrow (prev / curr pointers)",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Both approaches visit each of the n nodes a fixed number of times. The brute force walks the list once to copy the values and once more to build new nodes. The optimal version walks it once, doing 4 small assignments per node.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only keep three variables (`prev`, `curr`, `next_node`) no matter how long the list is, and we reuse the existing nodes instead of making new ones. The brute force needs O(n) extra memory for its Python list and its n new nodes.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "ListNode, .val and .next",
        plainEnglishExplanation:
          "A `ListNode` is a tiny object with two slots: `.val` (the value it stores) and `.next` (the node that comes after it). `ListNode(2, third)` makes a node holding 2 whose arrow points at `third`. The dot means 'look inside this object', so `first.next.val` reads 'the value of the node after `first`'. The site already defines `ListNode` for you, just like LeetCode does.",
        exampleSnippet:
          "third = ListNode(3)\nsecond = ListNode(2, third)\nfirst = ListNode(1, second)\nprint(first.val)\nprint(first.next.val)\nprint(first.next.next.val)\nprint(third.next)",
        whyWeUseItHere:
          "The whole problem is about changing which node each `.next` arrow points at.",
      },
      {
        keywordOrMethod: "None, is None, is not None",
        plainEnglishExplanation:
          "`None` is Python's word for 'nothing here'. The last node's `.next` is `None`, and an empty list is just `head = None`. To test for it, write `x is None` or `x is not None` (both give `True` or `False`).",
        exampleSnippet:
          "node = ListNode(7)\nprint(node.next)\nprint(node.next is None)\nprint(node is not None)",
        whyWeUseItHere:
          "`None` marks the end of the list. Our loop keeps going until `curr` becomes `None`, and the new tail's arrow must be `None`.",
      },
      {
        keywordOrMethod: "Optional[ListNode]",
        plainEnglishExplanation:
          "A type hint that means 'either a `ListNode` or `None`'. Like every type hint it's only a note for humans; Python doesn't check it. `Optional` comes from Python's `typing` module, which the site imports for you (on your own computer you'd write `from typing import Optional`).",
        exampleSnippet:
          "def first_value(head: Optional[ListNode]) -> int:\n    if head is None:\n        return -1\n    return head.val\n\nprint(first_value(ListNode(5)))\nprint(first_value(None))",
        whyWeUseItHere:
          "`head` might be `None` (an empty list), and so might the answer we return.",
      },
      {
        keywordOrMethod: "while curr is not None:",
        plainEnglishExplanation:
          "A `while` loop repeats its indented block as long as the condition is `True`. Walking a linked list always looks like this: start a variable at the head, do something with it, then move it forward with `curr = curr.next`. When it steps past the last node it becomes `None` and the loop stops.",
        exampleSnippet:
          "head = ListNode(1, ListNode(2, ListNode(3)))\ncurr = head\nwhile curr is not None:\n    print(curr.val)\n    curr = curr.next",
        whyWeUseItHere:
          "We visit every node exactly once, front to back, flipping its arrow as we pass.",
      },
      {
        keywordOrMethod: "curr.next = prev  vs  curr = next_node",
        plainEnglishExplanation:
          "A variable is a **name tag** stuck on an object, not a box holding a copy. `curr = next_node` just moves the tag `curr` onto another node; no node changes. But `curr.next = prev` reaches *inside* the node and re-points its arrow, which changes the list itself. Every tag on that node sees the change.",
        exampleSnippet:
          "a = ListNode(1)\nb = ListNode(2)\na.next = b\nprint(a.next.val)\ntag = a\ntag.next = None\nprint(a.next)",
        whyWeUseItHere:
          "`curr.next = prev` is the actual flip. The other three lines only move our name tags along the chain.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { head: [1, 2, 3, 4, 5] },
      focus: ["prev", "curr", "next_node"],
    },
    intuitiveExplanation: {
      intuition:
        "Picture a row of people, each pointing at the person to their right. You want everyone to point left instead. Walk along the row: for each person, first note who they're pointing at (so you don't lose the rest of the row), then turn their arm to point at the person behind them, then step forward. You need three fingers: one on the person behind you (`prev`), one on the person you're turning (`curr`), and one on the person ahead (`next_node`). When you walk off the end, the last person you turned is the new front of the row.",
      edgeCases: [
        "Empty list (`head` is `None`): the loop never runs and we return `prev`, which is still `None`.",
        "A single node: its arrow gets flipped to point at `None` (which it already did) and it is returned as the head.",
        "The old head must end up pointing at `None`, which is exactly why `prev` starts as `None`.",
      ],
      stepByStepWalkthrough: [
        "Set `prev = None` (nothing is behind the first node yet) and `curr = head`.",
        "While `curr` is a real node: save the rest of the list with `next_node = curr.next`.",
        "Flip the arrow: `curr.next = prev`. Now `curr` points backwards.",
        "Move both tags one step forward: `prev = curr`, then `curr = next_node`.",
        "When `curr` becomes `None`, we've flipped every node. `prev` is on the old last node.",
        "Return `prev`: it is the head of the reversed list.",
      ],
    },
    hints: {
      conceptual:
        "You can't move backwards in a singly linked list, so walk forward once and flip each arrow as you pass it. The catch: the moment you flip a node's arrow, you lose your only way to reach the rest of the list. What must you remember *before* each flip?",
      structural:
        "Keep `prev = None` and `curr = head`. Loop `while curr is not None:`; inside, save `next_node = curr.next`, set `curr.next = prev`, then `prev = curr` and `curr = next_node`. Return `prev`.",
    },
    commonMistakes: [
      "Flipping `curr.next` before saving it in `next_node`. The rest of the list is lost and the loop ends after one node.",
      "Returning `head` at the end. After the flip, the old head is the *last* node (its `.next` is `None`), so you'd hand back a one-node list. The new head is `prev`.",
      "Starting `prev` at `head` instead of `None`. The first node then points at itself, creating a loop that never ends.",
      "Looping `while curr.next is not None:`. That stops one node early, and it crashes on an empty list because `None` has no `.next`.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    # Return the head of the reversed list.
    # Tip: walk the list once, flipping each node's .next to point backwards.
    pass
`,
    optimalSolution: `def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    # prev is the node that will sit BEFORE curr after flipping.
    # Nothing comes before the old head, so prev starts as None.
    prev = None
    # curr is the node we are about to flip. Start at the front.
    curr = head

    # Keep going until we step past the last node (curr becomes None)
    while curr is not None:
        # Remember the rest of the list BEFORE we cut the arrow to it
        next_node = curr.next
        # The flip: curr now points backwards, at prev
        curr.next = prev
        # curr is now the front of the reversed part, so prev moves onto it
        prev = curr
        # Step forward to the node we saved
        curr = next_node

    # curr fell off the end, so prev sits on the old last node: the new head
    return prev
`,
    bruteForceSolution: `def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    # Copy every value into an ordinary Python list
    values = []
    node = head
    while node is not None:
        values.append(node.val)
        node = node.next

    # Build brand-new nodes, reading the values from the back
    dummy = ListNode()
    tail = dummy
    for value in reversed(values):
        tail.next = ListNode(value)
        tail = tail.next
    return dummy.next
`,
    harness: {
      kind: "function",
      entry: "reverse_list",
      argTypes: { head: "linked-list" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { head: [1, 2, 3, 4, 5] },
        expected: [5, 4, 3, 2, 1],
        description: "Every arrow is flipped, so the old last node (5) becomes the new head and 1 now points at None.",
      },
      {
        input: { head: [1, 2] },
        expected: [2, 1],
        description: "Two nodes: 2 now points at 1, and 1 points at None.",
      },
      {
        input: { head: [] },
        expected: [],
        description: "An empty list (head is None) reversed is still empty.",
      },
      { input: { head: [7] }, expected: [7], description: "A single node is its own reverse." },
      { input: { head: [1, 1, 2, 2] }, expected: [2, 2, 1, 1], description: "Duplicate values are fine: we move nodes, not values." },
      { input: { head: [-3, 0, 3] }, expected: [3, 0, -3], description: "Negative values and zero." },
      { input: { head: [5000, -5000] }, expected: [-5000, 5000] },
      {
        input: { head: Array.from({ length: 5000 }, (_, i) => i) },
        expected: Array.from({ length: 5000 }, (_, i) => 4999 - i),
        description: "The longest allowed list (5,000 nodes).",
      },
    ],
  },

  // ------------------------------------------------------------------ merge-two-sorted-lists
  {
    id: "merge-two-sorted-lists",
    summary:
      "You get the heads of two linked lists, `list1` and `list2`. Each list is already sorted from smallest to largest. Combine them into **one** sorted linked list by re-linking the existing nodes (no need to create new ones), and return the head of the combined list. Either list may be empty (`None`).",
    constraints: [
      "0 ≤ nodes in each list ≤ 50",
      "-100 ≤ node value ≤ 100",
      "Both lists are sorted in non-decreasing order",
    ],
    pattern: "Dummy head + always take the smaller front node",
    timeComplexity: {
      bruteForce: "O((n + m) log(n + m))",
      optimal: "O(n + m)",
      explanation:
        "The brute force copies all n + m values, sorts them (sorting costs about k log k for k items), and builds new nodes. The optimal version makes one comparison per node it attaches, so with n nodes in one list and m in the other it does at most n + m steps.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only create one extra node (`dummy`) and a couple of variables. Every node in the answer is an original node that we re-linked.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "ListNode, .val and .next",
        plainEnglishExplanation:
          "A `ListNode` is a tiny object with two slots: `.val` (its value) and `.next` (the node after it, or `None` at the end). The site defines `ListNode` for you. `ListNode()` with no arguments makes a node with value 0 and no next node.",
        exampleSnippet:
          "head = ListNode(1, ListNode(2))\nprint(head.val, head.next.val)\nblank = ListNode()\nprint(blank.val, blank.next)",
        whyWeUseItHere:
          "We compare `.val` of the two front nodes and re-point `.next` arrows to stitch the answer together.",
      },
      {
        keywordOrMethod: "dummy = ListNode()  (the dummy-node trick)",
        plainEnglishExplanation:
          "A *dummy* node is a throwaway placeholder that sits in front of the list you're building. You always attach after the current last node. Without a dummy, the very first attachment is special (there is no 'last node' yet). With a dummy there always is one. At the end, the real list starts at `dummy.next`.",
        exampleSnippet:
          "dummy = ListNode()\ntail = dummy\nfor v in [4, 5, 6]:\n    tail.next = ListNode(v)\n    tail = tail.next\nprint(dummy.next.val)\nprint(tail.val)",
        whyWeUseItHere:
          "We don't know in advance which list provides the first node, so the dummy lets every attachment look the same.",
      },
      {
        keywordOrMethod: "while list1 is not None and list2 is not None:",
        plainEnglishExplanation:
          "`and` is `True` only when both sides are `True`. `x is not None` checks that `x` is a real node and not the 'nothing here' value `None`. So this loop runs only while *both* lists still have nodes to compare.",
        exampleSnippet:
          "a = ListNode(1)\nb = None\nprint(a is not None and b is not None)\nprint(a is not None and a is not None)",
        whyWeUseItHere:
          "Comparing front nodes only makes sense while both lists have a front node.",
      },
      {
        keywordOrMethod: "tail.next = list1  (attaching, not copying)",
        plainEnglishExplanation:
          "Variables are name tags on objects. `tail.next = list1` doesn't copy anything: it points `tail`'s arrow at the node that `list1` is currently on. Then `list1 = list1.next` just moves the `list1` tag forward; the node we attached stays attached.",
        exampleSnippet:
          "tail = ListNode(0)\nlist1 = ListNode(5, ListNode(8))\ntail.next = list1\nlist1 = list1.next\nprint(tail.next.val)\nprint(list1.val)",
        whyWeUseItHere:
          "This is how we move a node from an input list into the answer without making new nodes.",
      },
      {
        keywordOrMethod: "Optional[ListNode]",
        plainEnglishExplanation:
          "A type hint meaning 'a `ListNode` or `None`'. It's only a note for humans. `Optional` comes from Python's `typing` module, which the site imports for you.",
        exampleSnippet:
          "def size_hint(node: Optional[ListNode]) -> str:\n    return 'empty' if node is None else 'has nodes'\n\nprint(size_hint(None))\nprint(size_hint(ListNode(3)))",
        whyWeUseItHere:
          "Either input can be an empty list, which arrives as `None`.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { list1: [1, 2, 4], list2: [1, 3, 4] },
      focus: ["dummy", "tail", "list1", "list2"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine two queues of people already sorted by height, and you're forming one combined sorted queue. You only ever need to look at the two people at the *front*: whoever is shorter steps into the new queue next. Repeat until one queue is empty, then the whole remaining queue walks over in one go, because it's already in order. The dummy node is like a 'START' sign planted at the front of the new queue, so the first person has something to stand behind.",
      edgeCases: [
        "One or both lists are empty: the loop never runs and we attach whichever list is left (possibly `None`).",
        "Equal values: taking from `list1` when values tie (`<=`) is fine; either choice gives a sorted answer.",
        "One list runs out long before the other, e.g. `[5]` and `[1, 2, 3]`: the leftover `5` is attached in one step at the end.",
      ],
      stepByStepWalkthrough: [
        "Create `dummy = ListNode()` as a placeholder, and `tail = dummy` (the last node of the answer so far).",
        "While both lists have nodes, compare `list1.val` and `list2.val`.",
        "Attach the smaller node: `tail.next = list1` (or `list2`), then move that list forward one node.",
        "Move `tail` onto the node we just attached: `tail = tail.next`.",
        "When one list is empty, attach the other list's remaining nodes with a single `tail.next = ...`.",
        "Return `dummy.next`, the first real node of the merged list.",
      ],
    },
    hints: {
      conceptual:
        "The smallest node overall must be one of the two front nodes. After you take it, the same is true again for what's left. Also think: how do you avoid special-casing 'the answer is still empty'?",
      structural:
        "Make `dummy = ListNode()` and `tail = dummy`. Loop `while list1 is not None and list2 is not None:` and attach the smaller front with `tail.next = ...`. After the loop, attach whichever list is left. Return `dummy.next`.",
    },
    commonMistakes: [
      "Forgetting to move `tail` forward after attaching. Each new node then overwrites the previous one and the answer keeps only the last node.",
      "Forgetting the leftovers after the loop. When one list empties, the other may still hold several nodes that must be attached.",
      "Returning `dummy` instead of `dummy.next`: the answer would start with a fake 0.",
      "Moving `tail` but not the list you took from, so the same node gets compared (and attached) forever.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def merge_two_lists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    # Return the head of one sorted list made from both lists' nodes.
    # Tip: a placeholder "dummy" node makes attaching the first node easy.
    pass
`,
    optimalSolution: `def merge_two_lists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    # dummy is a placeholder in front of the answer. It means there is
    # always a node to attach after, even before the answer has any nodes.
    dummy = ListNode()
    # tail is always the LAST node of the merged list so far
    tail = dummy

    # Compare front nodes while BOTH lists still have nodes
    while list1 is not None and list2 is not None:
        if list1.val <= list2.val:
            # list1's front is smaller (or equal): attach it after tail
            tail.next = list1
            # list1 now starts one node later
            list1 = list1.next
        else:
            # list2's front is smaller: attach it after tail
            tail.next = list2
            # list2 now starts one node later
            list2 = list2.next
        # The node we just attached is the new end of the answer
        tail = tail.next

    # One list ran out. The other is already sorted, so attach all of it
    if list1 is not None:
        tail.next = list1
    else:
        tail.next = list2

    # Skip the placeholder: the real answer starts right after it
    return dummy.next
`,
    bruteForceSolution: `def merge_two_lists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    # Collect every value from both lists
    values = []
    for node in (list1, list2):
        while node is not None:
            values.append(node.val)
            node = node.next

    # Sort them and build a fresh list
    values.sort()
    dummy = ListNode()
    tail = dummy
    for value in values:
        tail.next = ListNode(value)
        tail = tail.next
    return dummy.next
`,
    harness: {
      kind: "function",
      entry: "merge_two_lists",
      argTypes: { list1: "linked-list", list2: "linked-list" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { list1: [1, 2, 4], list2: [1, 3, 4] },
        expected: [1, 1, 2, 3, 4, 4],
        description: "Always take the smaller front node: 1, 1, 2, 3, 4, then the leftover 4.",
      },
      {
        input: { list1: [], list2: [] },
        expected: [],
        description: "Two empty lists merge into an empty list.",
      },
      {
        input: { list1: [], list2: [0] },
        expected: [0],
        description: "If one list is empty, the answer is simply the other list.",
      },
      { input: { list1: [5], list2: [1, 2, 3] }, expected: [1, 2, 3, 5], description: "list2 is used up first, then 5 is attached." },
      { input: { list1: [1, 2, 3], list2: [4, 5, 6] }, expected: [1, 2, 3, 4, 5, 6], description: "Every node of list1 comes first." },
      { input: { list1: [-3, -1, 2], list2: [-2, 0, 2] }, expected: [-3, -2, -1, 0, 2, 2], description: "Negative values interleave." },
      { input: { list1: [1, 1, 1], list2: [1, 1] }, expected: [1, 1, 1, 1, 1] },
      { input: { list1: [2], list2: [1] }, expected: [1, 2] },
      { input: { list1: [-100, 100], list2: [] }, expected: [-100, 100] },
    ],
  },

  // ------------------------------------------------------------------ linked-list-cycle
  {
    id: "linked-list-cycle",
    summary:
      "You get `head`, the first node of a linked list. Normally the last node's `.next` is `None`. But in some lists the last node points **back** to an earlier node, so following `.next` would go round in a loop forever. Return `True` if the list contains such a loop and `False` if it ends normally. (In the tests, `pos` says which index the tail links back to, or -1 for no loop. Your function never sees `pos`; it only gets `head`.)",
    constraints: [
      "0 ≤ number of nodes ≤ 10,000",
      "-100,000 ≤ node value ≤ 100,000",
      "Follow-up: can you do it using O(1) extra memory?",
    ],
    pattern: "Fast and slow pointers (Floyd's tortoise and hare)",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "The brute force visits each node once and does an O(1) set check per node. In the optimal version, if there is no loop, `fast` reaches the end after about n / 2 steps. If there is a loop, once `slow` enters it, `fast` closes the gap by one node per step, so they meet within one more lap: O(n) steps in total.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Just two variables, `slow` and `fast`, whatever the list's length. The brute force stores every node it visits in a set, which is O(n) memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "ListNode, .val and .next",
        plainEnglishExplanation:
          "A `ListNode` holds a value (`.val`) and an arrow (`.next`) to the next node. The site defines it for you. Nothing stops an arrow from pointing back to an earlier node, which is exactly what makes a loop.",
        exampleSnippet:
          "a = ListNode(1)\nb = ListNode(2)\na.next = b\nb.next = a  # b points back to a: a loop!\nprint(a.next.val, a.next.next.val, a.next.next.next.val)",
        whyWeUseItHere:
          "We follow `.next` arrows and must notice if they lead us back to a node we've already been on.",
      },
      {
        keywordOrMethod: "fast.next.next",
        plainEnglishExplanation:
          "You can chain dots: `fast.next` is the node after `fast`, so `fast.next.next` is the node two steps ahead. Reading `.next` on `None` crashes, so you must first check that `fast` and `fast.next` are real nodes.",
        exampleSnippet:
          "head = ListNode(1, ListNode(2, ListNode(3)))\nprint(head.next.next.val)",
        whyWeUseItHere:
          "The fast pointer moves two nodes per step.",
      },
      {
        keywordOrMethod: "while fast is not None and fast.next is not None:",
        plainEnglishExplanation:
          "`and` checks its left side first and *only if that's `True`* checks the right side. So if `fast` is `None`, Python never tries `fast.next` (which would crash). This is called short-circuiting.",
        exampleSnippet:
          "fast = None\nprint(fast is not None and fast.next is not None)  # safe: stops at the first False",
        whyWeUseItHere:
          "It guards the two-step jump: we may only do `fast.next.next` when both `fast` and `fast.next` exist.",
      },
      {
        keywordOrMethod: "slow is fast",
        plainEnglishExplanation:
          "`is` asks 'are these two names stuck on the *very same object*?' That's different from `==`, which asks 'do these look equal?'. Two separate nodes can both hold the value 5, but they're still different nodes.",
        exampleSnippet:
          "a = ListNode(5)\nb = ListNode(5)\nc = a\nprint(a.next is b)\nprint(a is c)",
        whyWeUseItHere:
          "We need to know whether the two pointers landed on the same node, not just on nodes with equal values.",
      },
      {
        keywordOrMethod: "return True / return False",
        plainEnglishExplanation:
          "`True` and `False` are Python's two yes/no values (note the capital letters). `return` hands the answer back and ends the function immediately, even from inside a loop.",
        exampleSnippet:
          "def is_even(n: int) -> bool:\n    if n % 2 == 0:\n        return True\n    return False\n\nprint(is_even(4), is_even(7))",
        whyWeUseItHere:
          "We return `True` the moment the pointers meet, and `False` if `fast` reaches the end.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { head: { values: [1, 2, 3, 4, 5, 6], pos: 2 } },
      focus: ["slow", "fast"],
    },
    intuitiveExplanation: {
      intuition:
        "Two runners start on a track: a slow one taking one step at a time and a fast one taking two. If the track is a straight road (no loop), the fast runner simply reaches the end. If the track bends back into a circle, both runners end up going round it, and the fast one gains one step on the slow one every turn. It can't jump over the slow runner, so eventually it lands exactly on the same spot: they meet. Meeting means 'loop'; reaching the end means 'no loop'.",
      edgeCases: [
        "Empty list (`head` is `None`): `fast` is `None`, the loop never runs, return `False`.",
        "One node that points to itself (`pos = 0`): after one step `slow` and `fast` are both that node, so we return `True`.",
        "Duplicate values without a loop, like `[1, 1, 1, 1]`: comparing values would wrongly 'see' a loop. We compare nodes with `is`.",
      ],
      stepByStepWalkthrough: [
        "Put both `slow` and `fast` on `head`.",
        "Loop while `fast` and `fast.next` are real nodes (otherwise `fast` has reached the end).",
        "Move `slow` one node: `slow = slow.next`.",
        "Move `fast` two nodes: `fast = fast.next.next`.",
        "If `slow is fast`, the fast runner has lapped the slow one: return `True`.",
        "If the loop ends because `fast` ran out of list, return `False`.",
      ],
    },
    hints: {
      conceptual:
        "One idea: remember every node you've visited, and stop if you see one again. That uses memory proportional to the list. Can two pointers moving at different speeds tell you the same thing?",
      structural:
        "`slow = head`, `fast = head`. Loop `while fast is not None and fast.next is not None:`; move `slow` one step and `fast` two steps; `if slow is fast: return True`. After the loop, `return False`.",
    },
    commonMistakes: [
      "Checking `slow is fast` before moving: they both start on `head`, so the function would always say `True`.",
      "Only checking `fast is not None` and then doing `fast.next.next`: when `fast` is the last node, `fast.next` is `None` and `None.next` crashes.",
      "Comparing values (`slow.val == fast.val`) instead of nodes (`slow is fast`). A list with repeated values would look like it has a loop.",
      "Walking the list until you hit `None` to see if it ends: with a loop you never hit `None`, so the program runs forever.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def has_cycle(head: Optional[ListNode]) -> bool:
    # Return True if following .next ever loops back to an earlier node.
    # Tip: what happens if one pointer moves twice as fast as another?
    pass
`,
    optimalSolution: `def has_cycle(head: Optional[ListNode]) -> bool:
    # Two runners both start on the first node
    slow = head
    fast = head

    # fast jumps 2 nodes, so it needs fast AND fast.next to be real nodes.
    # If either is None, fast has reached the end: the list has no loop.
    while fast is not None and fast.next is not None:
        # slow takes one step
        slow = slow.next
        # fast takes two steps
        fast = fast.next.next
        # Same node? fast has lapped slow, which only happens in a loop
        if slow is fast:
            return True

    # fast ran off the end of the list, so there is no loop
    return False
`,
    bruteForceSolution: `def has_cycle(head: Optional[ListNode]) -> bool:
    # Remember every node we've stood on (the node objects, not their values)
    seen = set()
    node = head
    while node is not None:
        # Standing on a node we've already visited means we went round a loop
        if node in seen:
            return True
        seen.add(node)
        node = node.next
    # We reached None, so the list ends normally
    return False
`,
    harness: {
      kind: "function",
      entry: "has_cycle",
      argTypes: { head: "cycle-list" },
    },
    testCases: [
      {
        input: { head: { values: [3, 2, 0, -4], pos: 1 } },
        expected: true,
        description: "The last node (-4) points back to the node at index 1 (value 2), so you can go round 2 → 0 → -4 → 2 forever.",
      },
      {
        input: { head: { values: [1, 2], pos: 0 } },
        expected: true,
        description: "The second node points back to the first: a two-node loop.",
      },
      {
        input: { head: { values: [1], pos: -1 } },
        expected: false,
        description: "One node whose .next is None: the list simply ends.",
      },
      { input: { head: { values: [], pos: -1 } }, expected: false, description: "An empty list can't loop." },
      { input: { head: { values: [1], pos: 0 } }, expected: true, description: "A single node pointing at itself is a loop." },
      { input: { head: { values: [1, 2, 3, 4, 5], pos: -1 } }, expected: false },
      { input: { head: { values: [1, 2, 3, 4, 5, 6], pos: 5 } }, expected: true, description: "The last node points at itself." },
      {
        input: { head: { values: [1, 1, 1, 1], pos: -1 } },
        expected: false,
        description: "Repeated values but no loop: compare nodes, not values.",
      },
      {
        input: { head: { values: Array.from({ length: 10000 }, (_, i) => i), pos: 0 } },
        expected: true,
        description: "10,000 nodes, and the tail links back to the very first node.",
      },
    ],
  },

  // ------------------------------------------------------------------ reorder-list
  {
    id: "reorder-list",
    summary:
      "You are given `head`, the first node of a singly linked list. Suppose the nodes in the list are arranged as $L_0 \\rightarrow L_1 \\rightarrow \\dots \\rightarrow L_{n-1} \\rightarrow L_n$. Reorder the list **in place** so that the nodes follow the sequence $L_0 \\rightarrow L_n \\rightarrow L_1 \\rightarrow L_{n-1} \\rightarrow L_2 \\rightarrow L_{n-2} \\rightarrow \\dots$. In other words, weave nodes from the front and back alternately. Do not modify the values inside nodes, only change their `.next` pointers, and do not return anything.",
    constraints: [
      "1 ≤ number of nodes ≤ 50,000",
      "1 ≤ node value ≤ 1,000",
      "Do not return anything; modify the linked list in place",
    ],
    pattern: "Find midpoint, reverse second half, weave two halves together",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Finding the middle takes n/2 steps, reversing the second half takes n/2 steps, and interleaving the two halves takes n steps. Overall, the algorithm makes a constant number of passes over the n nodes, resulting in O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "We only rearrange existing node pointers using a few reference variables (`slow`, `fast`, `prev`, `curr`, `first`, `second`). No extra nodes or arrays are allocated.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "while fast.next is not None and fast.next.next is not None:",
        plainEnglishExplanation:
          "Checks that both the next node and the node two steps ahead exist before making a two-node jump. This prevents Python from attempting to access `.next` on `None`, which would raise an `AttributeError`.",
        exampleSnippet:
          "head = ListNode(1, ListNode(2, ListNode(3)))\nprint(head.next is not None and head.next.next is not None)",
        whyWeUseItHere:
          "Allows the fast pointer to safely leap two nodes per turn while searching for the midpoint.",
      },
      {
        keywordOrMethod: "slow.next = None  (cutting the chain)",
        plainEnglishExplanation:
          "Setting `.next = None` on a node terminates that chain, making it the final node of its own separate linked list. Any nodes that were attached after it are now unreachable from this head unless referenced elsewhere.",
        exampleSnippet:
          "first = ListNode(1, ListNode(2, ListNode(3)))\nfirst.next.next = None\nprint(first.next.val)\nprint(first.next.next)",
        whyWeUseItHere:
          "We cut the list into two distinct, independent halves so they don't form a cycle when woven together.",
      },
      {
        keywordOrMethod: "prev = None / curr = second  (reversal pattern)",
        plainEnglishExplanation:
          "The standard three-pointer technique to reverse arrows in a linked list. By saving `next_node = curr.next` before assigning `curr.next = prev`, we can reverse each connection without losing the remaining nodes.",
        exampleSnippet:
          "a = ListNode(10, ListNode(20))\nprev = None\ncurr = a\nwhile curr is not None:\n    nxt = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nxt\nprint(prev.val, prev.next.val)",
        whyWeUseItHere:
          "Reverses the second half of the list so that nodes originally at the tail can be read from back to front.",
      },
      {
        keywordOrMethod: "tmp1 = first.next / tmp2 = second.next  (saving next steps)",
        plainEnglishExplanation:
          "Before redirecting a pointer, we must save what it currently points to in a temporary variable (`tmp1`). Otherwise, re-linking `first.next = second` breaks our only connection to the remainder of the first half.",
        exampleSnippet:
          "a = ListNode(1, ListNode(2))\nb = ListNode(9, ListNode(8))\ntmp1 = a.next\na.next = b\nprint(a.next.val, tmp1.val)",
        whyWeUseItHere:
          "Safely interweaves the two chains without dropping the rest of either chain.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { head: [1, 2, 3, 4, 5] },
      focus: ["first", "second"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine you have a long deck of cards dealt in order 1, 2, 3, 4, 5. You want to pick the first card (1), then the last card (5), then the second card (2), then the second-to-last card (4), and so on. Since a singly linked list only lets you walk forward, you cannot easily grab cards from the back. But if you cut the deck exactly in half, flip the second half upside down (so 4, 5 becomes 5, 4), you now hold two smaller decks that both face forward! Now you simply alternate drawing one card from the first deck, then one card from the flipped second deck, weaving them into a single zipper.",
      edgeCases: [
        "Lists with 0, 1, or 2 nodes: already in the correct order, so no reordering is required.",
        "Even number of nodes (e.g. 4 nodes): splits cleanly into two halves of 2 nodes each.",
        "Odd number of nodes (e.g. 5 nodes): the first half gets the extra middle node (3 nodes in first half, 2 in second half), which naturally becomes the final tail node.",
      ],
      stepByStepWalkthrough: [
        "If the list has fewer than 3 nodes, return immediately since no changes are needed.",
        "Use slow (1 step) and fast (2 steps) pointers to locate the middle node.",
        "Split the list into two halves: cut the first half by setting `slow.next = None`, and let `second` point to the head of the second half.",
        "Reverse the second half using `prev` and `curr` pointers.",
        "Weave the two halves together: point `first.next` to `second`, point `second.next` to the old `first.next`, and step both forward.",
        "Stop when `second` is exhausted; the list is now completely reordered in place.",
      ],
    },
    hints: {
      conceptual:
        "A singly linked list cannot move backwards from the tail. How could you rearrange the back half of the list so its nodes can be accessed from back to front in forward order?",
      structural:
        "Break the problem into three phases: (1) Find the middle node with `slow` and `fast` pointers. (2) Cut the list in half and reverse the second half with `prev` and `curr`. (3) Merge the two chains by alternating connections in a `while second is not None:` loop.",
    },
    commonMistakes: [
      "Forgetting to cut the first half with `slow.next = None`. Without terminating the first half, the list will retain an old forward link and create an infinite cycle.",
      "Overwriting `first.next` or `second.next` before storing the next node in a temporary variable, losing access to the rest of the list.",
      "Returning a new list or node values instead of modifying the existing list nodes in place as required.",
      "Stopping the middle-finding loop too late, which misbalances the split between even and odd length lists.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def reorder_list(head: Optional[ListNode]) -> None:
    # Reorder the list in place: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
    # Do not return anything, modify head in-place instead.
    pass
`,
    optimalSolution: `def reorder_list(head: Optional[ListNode]) -> None:
    # If the list is empty or has at most two nodes, it is already reordered
    if head is None or head.next is None or head.next.next is None:
        return

    # Step 1: Use slow and fast pointers to find the midpoint of the list
    slow = head
    fast = head
    while fast.next is not None and fast.next.next is not None:
        # slow moves one step at a time
        slow = slow.next
        # fast moves two steps at a time
        fast = fast.next.next

    # Step 2: Split the list into two halves and reverse the second half
    # second will be the start of the second half
    second = slow.next
    # Cut the first half so it terminates with None
    slow.next = None

    # Reverse the second half using prev and curr pointers
    prev = None
    curr = second
    while curr is not None:
        # Save the next node before overwriting the pointer
        next_node = curr.next
        # Reverse the arrow to point backwards
        curr.next = prev
        # Advance prev to the current node
        prev = curr
        # Move curr to the next node in the original order
        curr = next_node
    # prev is now the head of the reversed second half
    second = prev

    # Step 3: Weave the two halves together node-by-node
    first = head
    while second is not None:
        # Save the next nodes in both halves
        tmp1 = first.next
        tmp2 = second.next
        # Connect first half node to second half node
        first.next = second
        # Connect second half node to the remaining first half
        second.next = tmp1
        # Step forward in both chains
        first = tmp1
        second = tmp2
`,
    bruteForceSolution: `def reorder_list(head: Optional[ListNode]) -> None:
    if head is None or head.next is None:
        return
    # Collect all nodes in a list
    nodes = []
    curr = head
    while curr is not None:
        nodes.append(curr)
        curr = curr.next
    # Reorder using two pointers
    left = 0
    right = len(nodes) - 1
    while left < right:
        nodes[left].next = nodes[right]
        left += 1
        if left >= right:
            break
        nodes[right].next = nodes[left]
        right -= 1
    nodes[left].next = None
`,
    harness: {
      kind: "function",
      entry: "reorder_list",
      inPlace: "head",
      argTypes: { head: "linked-list" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { head: [1, 2, 3, 4] },
        expected: [1, 4, 2, 3],
        description: "Even number of nodes: weaves 1, 4, 2, 3.",
      },
      {
        input: { head: [1, 2, 3, 4, 5] },
        expected: [1, 5, 2, 4, 3],
        description: "Odd number of nodes: middle node 3 becomes the tail.",
      },
      {
        input: { head: [1] },
        expected: [1],
        description: "A single node list remains unchanged.",
      },
      { input: { head: [1, 2] }, expected: [1, 2], description: "Two nodes are already in L0 -> L1 order." },
      { input: { head: [1, 2, 3] }, expected: [1, 3, 2] },
      { input: { head: [10, 20, 30, 40, 50, 60] }, expected: [10, 60, 20, 50, 30, 40] },
      { input: { head: [5, 5, 5, 5] }, expected: [5, 5, 5, 5] },
    ],
  },

  // ------------------------------------------------------------------ remove-nth-node-from-end-of-list
  {
    id: "remove-nth-node-from-end-of-list",
    summary:
      "Given `head`, the first node of a linked list, and an integer `n`, remove the **n-th node from the end** of the list and return the head of the updated list. For example, if the list is `1 → 2 → 3 → 4 → 5` and `n = 2`, the second node from the end is `4`. Removing it produces `1 → 2 → 3 → 5`.",
    constraints: [
      "The number of nodes in the list is sz",
      "1 ≤ sz ≤ 30",
      "0 ≤ Node.val ≤ 100",
      "1 ≤ n ≤ sz",
    ],
    pattern: "Two pointers separated by an n-node gap + dummy node",
    timeComplexity: {
      bruteForce: "O(sz)",
      optimal: "O(sz)",
      explanation:
        "The brute-force method makes two passes (one to count the length L, and another to step L - n nodes). The optimal two-pointer solution finds and deletes the target node in a single traversal of sz nodes.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a single dummy node and two pointer variables (`left` and `right`) are created, using constant extra memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "dummy = ListNode(0, head)",
        plainEnglishExplanation:
          "Creates a temporary placeholder node whose `.next` points to `head`. This allows operations on the very first node (like deleting it) to be treated identically to operations on any other node.",
        exampleSnippet:
          "head = ListNode(10)\ndummy = ListNode(0, head)\nprint(dummy.val, dummy.next.val)",
        whyWeUseItHere:
          "If `n` equals the list length, the node to delete is `head` itself. A dummy node gives us a preceding node to update without special-casing.",
      },
      {
        keywordOrMethod: "for _ in range(n + 1):",
        plainEnglishExplanation:
          "A `for` loop that runs exactly `n + 1` times. The underscore `_` is a common Python convention meaning 'we only care about repeating the action, not the counter number itself'.",
        exampleSnippet:
          "steps = 0\nfor _ in range(3):\n    steps += 1\nprint(steps)",
        whyWeUseItHere:
          "Advances the `right` pointer `n + 1` steps ahead of `left` so the gap between them spans `n` nodes.",
      },
      {
        keywordOrMethod: "left.next = left.next.next",
        plainEnglishExplanation:
          "Bypasses the node immediately following `left`. `left.next` now points to the node two steps ahead, effectively dropping the intermediate node from the chain.",
        exampleSnippet:
          "c = ListNode(3)\nb = ListNode(2, c)\na = ListNode(1, b)\na.next = a.next.next\nprint(a.next.val)",
        whyWeUseItHere:
          "Deletes the target n-th node from the end in O(1) time.",
      },
      {
        keywordOrMethod: "return dummy.next",
        plainEnglishExplanation:
          "Returns the node right after the placeholder dummy node. If the original head was deleted, `dummy.next` points to the new head.",
        exampleSnippet:
          "dummy = ListNode(0, ListNode(99))\nprint(dummy.next.val)",
        whyWeUseItHere:
          "Hands back the true head of the list, even when the original head was removed.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { head: [1, 2, 3, 4, 5], n: 2 },
      focus: ["left", "right"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine two people walking down a path holding a measuring stick that is exactly n steps long. The first person (right pointer) starts walking first. Once they have taken n steps, the second person (left pointer) starts walking too, keeping the measuring stick taut between them. When the leader steps off the edge of the path (hits `None`), the follower must be standing exactly n steps away from the end! By attaching a dummy node at the start and widening the gap by 1 extra step, the follower ends up standing right before the node to remove, ready to snip it out.",
      edgeCases: [
        "Removing the head node (n equals the total length of the list): the dummy node ensures `left` stands before the head, cleanly setting `dummy.next = head.next`.",
        "Removing the last node (n = 1): `right` reaches `None`, and `left` stands at the second-to-last node, pointing its `.next` to `None`.",
        "List with only one node and n = 1: removing the only node leaves an empty list (`dummy.next = None`).",
      ],
      stepByStepWalkthrough: [
        "Create a `dummy` node pointing to `head` and place both `left` and `right` at `dummy`.",
        "Advance `right` forward by `n + 1` steps to create a fixed buffer between `left` and `right`.",
        "Walk both `left` and `right` forward one node at a time until `right` reaches `None`.",
        "`left` is now positioned on the node directly before the target node.",
        "Update `left.next = left.next.next` to remove the target node from the chain.",
        "Return `dummy.next`, which points to the head of the updated list.",
      ],
    },
    hints: {
      conceptual:
        "If you maintain a fixed distance of n nodes between two pointers, what happens to the trailing pointer when the leading pointer steps off the end of the list?",
      structural:
        "Use `dummy = ListNode(0, head)`. Set `left = dummy` and `right = dummy`. Advance `right` by `n + 1` steps using a `for` loop, then move both pointers in a `while right is not None:` loop. Finally, bypass the node with `left.next = left.next.next`.",
    },
    commonMistakes: [
      "Not using a dummy node. If you need to remove the first node (`head`), having no previous node makes updating the list awkward.",
      "Advancing `right` by `n` steps instead of `n + 1` steps. Moving `n` steps leaves `left` on the node to be deleted, rather than on the node before it.",
      "Assuming `n` is always smaller than the length of the list; forgetting the case where `n == len(list)`.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def remove_nth_from_end(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    # Remove the n-th node from the end of the list and return its head.
    # Tip: maintaining a gap of n nodes between two pointers helps you find the target in one pass.
    pass
`,
    optimalSolution: `def remove_nth_from_end(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    # dummy node points to head so removing the head node is not a special case
    dummy = ListNode(0, head)
    left = dummy
    right = dummy

    # Advance right pointer so there is an n-node gap between left and right
    for _ in range(n + 1):
        right = right.next

    # Move both pointers until right falls off the end of the list
    while right is not None:
        left = left.next
        right = right.next

    # left is now right before the node to remove; skip over it
    left.next = left.next.next

    # Return the head of the updated list
    return dummy.next
`,
    bruteForceSolution: `def remove_nth_from_end(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    # Pass 1: count the total number of nodes
    length = 0
    curr = head
    while curr is not None:
        length += 1
        curr = curr.next

    # Pass 2: move to the node just before the one to remove
    dummy = ListNode(0, head)
    curr = dummy
    for _ in range(length - n):
        curr = curr.next

    # Delete the target node
    curr.next = curr.next.next
    return dummy.next
`,
    harness: {
      kind: "function",
      entry: "remove_nth_from_end",
      argTypes: { head: "linked-list" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { head: [1, 2, 3, 4, 5], n: 2 },
        expected: [1, 2, 3, 5],
        description: "The 2nd node from the end is 4. Removing it yields [1, 2, 3, 5].",
      },
      {
        input: { head: [1], n: 1 },
        expected: [],
        description: "Removing the only node leaves an empty list.",
      },
      {
        input: { head: [1, 2], n: 1 },
        expected: [1],
        description: "Removing the tail node from a 2-node list.",
      },
      { input: { head: [1, 2], n: 2 }, expected: [2], description: "Removing the head node from a 2-node list." },
      { input: { head: [1, 2, 3], n: 3 }, expected: [2, 3] },
      { input: { head: [1, 2, 3, 4], n: 1 }, expected: [1, 2, 3] },
      { input: { head: [10, 20, 30, 40, 50, 60], n: 4 }, expected: [10, 20, 40, 50, 60] },
      { input: { head: [7, 7, 7], n: 2 }, expected: [7, 7] },
    ],
  },

  // ------------------------------------------------------------------ copy-list-with-random-pointer
  {
    id: "copy-list-with-random-pointer",
    summary:
      "You are given the `head` of a linked list of length $n$ with a twist: each node has an extra pointer called `random` that can point to any node in the list, or to `None`. Construct a **deep copy** of this list. A deep copy means creating $n$ brand-new `Node` objects with the exact same values, where both the `next` and `random` pointers point to nodes within the new copy, mirroring the structure of the original list. None of the pointers in your copied list should point to any node in the original list.",
    constraints: [
      "0 ≤ number of nodes ≤ 1,000",
      "-10,000 ≤ Node.val ≤ 10,000",
      "Node.random is None or points to some node in the linked list",
    ],
    pattern: "Two-pass dictionary mapping {original_node: cloned_node}",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force copies nodes and then searches the entire list from the start for every random pointer target (taking O(n) per node, O(n²) total). The optimal hash map solution maps each original node to its copy in O(1) time, finishing in two linear passes of O(n) each.",
    },
    spaceComplexity: {
      optimal: "O(n)",
      explanation:
        "A dictionary stores n key-value pairs mapping each original node to its newly allocated clone.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class Node: (val, next, random)",
        plainEnglishExplanation:
          "A node with three fields: `.val` (the integer value), `.next` (pointer to the subsequent node), and `.random` (pointer to any arbitrary node in the list, or `None`). Provided automatically by the platform.",
        exampleSnippet:
          "class Node:\n    def __init__(self, val, next=None, random=None):\n        self.val = val\n        self.next = next\n        self.random = random\n\na = Node(1)\nb = Node(2)\na.next = b\na.random = b\nprint(a.val, a.next.val, a.random.val)",
        whyWeUseItHere:
          "The problem uses this custom node class instead of the standard `ListNode`.",
      },
      {
        keywordOrMethod: "old_to_copy = {None: None}",
        plainEnglishExplanation:
          "A Python dictionary that starts with `None` mapped to `None`. When looking up `old_to_copy[node.next]`, if `node.next` is `None`, it safely returns `None` without needing an `if` check.",
        exampleSnippet:
          "mapping = {None: None}\nprint(mapping[None])\nprint(mapping.get(None) is None)",
        whyWeUseItHere:
          "Handles null pointers seamlessly for both `.next` and `.random`.",
      },
      {
        keywordOrMethod: "old_to_copy[curr] = Node(curr.val)",
        plainEnglishExplanation:
          "Creates a new `Node` holding the current node's value and records it in the dictionary using the original node object itself as the key.",
        exampleSnippet:
          "orig = Node(42)\nclone = Node(orig.val)\nlookup = {orig: clone}\nprint(lookup[orig].val)",
        whyWeUseItHere:
          "First pass: creates all clone nodes in memory before wiring any pointers.",
      },
      {
        keywordOrMethod: "copy.random = old_to_copy[curr.random]",
        plainEnglishExplanation:
          "Looks up the clone that corresponds to `curr.random` in the dictionary and assigns it to `copy.random`.",
        exampleSnippet:
          "class Node:\n    def __init__(self, val, random=None):\n        self.val = val\n        self.random = random\n\nn1 = Node(5)\nlookup = {n1: Node(n1.val), None: None}\nlookup[n1].random = lookup[n1.random]\nprint(lookup[n1].val, lookup[n1].random)",
        whyWeUseItHere:
          "Second pass: connects all cloned random pointers to their corresponding cloned targets.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { head: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]] },
      focus: ["curr", "copy"],
    },
    intuitiveExplanation: {
      intuition:
        "Imagine cloning a building with rooms and hallways (`next`), but each room also has a secret teleporter (`random`) to another room. If you try to copy room 1 and connect its teleporter to room 5 before room 5 has even been built, you have nowhere to point it! The cleanest solution is a two-pass blueprint: in Pass 1, build all the new empty rooms and write down a registry pairing every old room with its new clone (`old_to_copy`). In Pass 2, walk through the original building again: for every room, look up its hallway partner and teleporter target in your registry, and connect the matching new rooms together.",
      edgeCases: [
        "Empty list (`head is None`): returns `None` immediately.",
        "A node whose `random` pointer points to `None`: `{None: None}` cleanly assigns `None` without errors.",
        "A node whose `random` pointer points to itself: the dictionary maps `old` to `new`, so `copy.random = copy` connects correctly.",
      ],
      stepByStepWalkthrough: [
        "If `head` is `None`, return `None`.",
        "Initialize a dictionary `old_to_copy = {None: None}`.",
        "Pass 1: Traverse the original list. For each node, create `Node(curr.val)` and store it in `old_to_copy[curr]`.",
        "Pass 2: Traverse the original list a second time. For each node, fetch its clone `copy = old_to_copy[curr]`.",
        "Set `copy.next = old_to_copy[curr.next]` and `copy.random = old_to_copy[curr.random]`.",
        "Return `old_to_copy[head]`, the clone of the original head node.",
      ],
    },
    hints: {
      conceptual:
        "You cannot connect a copy's random pointer to another copy until that target copy actually exists. How can you create all the nodes first and link them second?",
      structural:
        "Use a hash map `{None: None}`. In a first `while curr:` loop, create a new `Node(curr.val)` for every node and record `old_to_copy[curr] = copy`. In a second `while curr:` loop, wire `copy.next` and `copy.random` using dictionary lookups.",
    },
    commonMistakes: [
      "Pointing the copy's pointers back to nodes in the original list instead of nodes in the newly cloned list.",
      "Not handling `None` in the hash map, causing `KeyError: None` when a node's `random` or `next` pointer is `None`.",
      "Trying to copy and wire pointers in a single pass without handling forward-pointing random references.",
    ],
    starterCode: `${RANDOM_NODE_COMMENT}
def copy_random_list(head: Optional[Node]) -> Optional[Node]:
    # Return a deep copy of the list with random pointers.
    # Tip: use a dictionary to map each original node to its newly created copy.
    pass
`,
    optimalSolution: `def copy_random_list(head: Optional[Node]) -> Optional[Node]:
    # If the list is empty, return None
    if head is None:
        return None

    # Map each old node to its new copy; None maps to None for null pointers
    old_to_copy = {None: None}

    # Pass 1: Create a clone node for every node in the original list
    curr = head
    while curr is not None:
        # Create copy with the same value, leaving pointers unset for now
        old_to_copy[curr] = Node(curr.val)
        curr = curr.next

    # Pass 2: Connect next and random pointers using our map
    curr = head
    while curr is not None:
        # Retrieve the clone corresponding to curr
        copy = old_to_copy[curr]
        # Point the clone's next to the clone of curr.next
        copy.next = old_to_copy[curr.next]
        # Point the clone's random to the clone of curr.random
        copy.random = old_to_copy[curr.random]
        curr = curr.next

    # Return the clone of the head node
    return old_to_copy[head]
`,
    bruteForceSolution: `def copy_random_list(head: Optional[Node]) -> Optional[Node]:
    if head is None:
        return None

    # Collect all original nodes in a list
    orig_nodes = []
    curr = head
    while curr is not None:
        orig_nodes.append(curr)
        curr = curr.next

    # Create new nodes
    new_nodes = [Node(node.val) for node in orig_nodes]

    # Link next pointers and random pointers by indexing
    for i in range(len(orig_nodes)):
        if i + 1 < len(new_nodes):
            new_nodes[i].next = new_nodes[i + 1]
        # Find target index for random pointer
        if orig_nodes[i].random is not None:
            r_idx = orig_nodes.index(orig_nodes[i].random)
            new_nodes[i].random = new_nodes[r_idx]

    return new_nodes[0]
`,
    harness: {
      kind: "function",
      entry: "copy_random_list",
      argTypes: { head: "random-list" },
      returnType: "random-list",
    },
    testCases: [
      {
        input: { head: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]] },
        expected: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        description: "5-node list with random pointers linking across nodes and to null.",
      },
      {
        input: { head: [[1, 1], [2, 1]] },
        expected: [[1, 1], [2, 1]],
        description: "Both nodes have random pointers pointing to node at index 1.",
      },
      {
        input: { head: [[3, null], [3, 0], [3, null]] },
        expected: [[3, null], [3, 0], [3, null]],
        description: "Duplicate values: node identity matters, not just value.",
      },
      { input: { head: [] }, expected: [], description: "Empty list deep copies to an empty list." },
      { input: { head: [[1, null]] }, expected: [[1, null]], description: "Single node with no random link." },
      { input: { head: [[1, 0]] }, expected: [[1, 0]], description: "Single node whose random pointer loops to itself." },
      { input: { head: [[2, null], [4, 0], [6, 1], [8, null]] }, expected: [[2, null], [4, 0], [6, 1], [8, null]] },
    ],
  },

  // ------------------------------------------------------------------ add-two-numbers
  {
    id: "add-two-numbers",
    summary:
      "You are given two non-empty linked lists, `l1` and `l2`, representing two non-negative integers. The digits are stored in **reverse order**, meaning the 1's place comes first, followed by the 10's place, and so on. Each node holds a single digit between `0` and `9`. Add the two numbers together and return the sum as a linked list, also in reverse order.",
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros (except 0 itself)",
    ],
    pattern: "Column-by-column addition with carry tracking + dummy node",
    timeComplexity: {
      bruteForce: "O(max(n, m))",
      optimal: "O(max(n, m))",
      explanation:
        "Both approaches iterate through the digits of the numbers. If l1 has n digits and l2 has m digits, the loop runs max(n, m) times (plus at most one additional step if there is a trailing carry). Each step takes O(1) time.",
    },
    spaceComplexity: {
      optimal: "O(max(n, m))",
      explanation:
        "The new linked list contains at most max(n, m) + 1 nodes to represent the sum.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "total // 10 and total % 10",
        plainEnglishExplanation:
          "`//` performs integer division (flooring the result), giving the carry digit. `%` computes the remainder (modulo), giving the digit to place in the current column. For example, `17 // 10` is `1` and `17 % 10` is `7`.",
        exampleSnippet:
          "total = 17\ncarry = total // 10\ndigit = total % 10\nprint(carry, digit)",
        whyWeUseItHere:
          "Splits a column sum into a digit for the new node and a carry for the next column.",
      },
      {
        keywordOrMethod: "val1 = l1.val if l1 is not None else 0",
        plainEnglishExplanation:
          "A Python ternary (one-line conditional) expression. If `l1` is a valid node, it evaluates to `l1.val`; if `l1` has reached `None` (because that number was shorter), it safely uses `0`.",
        exampleSnippet:
          "node = None\nval = node.val if node is not None else 0\nprint(val)",
        whyWeUseItHere:
          "Allows adding numbers of unequal lengths without crashing when one list ends early.",
      },
      {
        keywordOrMethod: "while l1 is not None or l2 is not None or carry != 0:",
        plainEnglishExplanation:
          "The loop continues as long as *any* of the three conditions is true: there are more digits in `l1`, more digits in `l2`, or a non-zero carry remains to be written.",
        exampleSnippet:
          "l1, l2, carry = None, None, 1\nprint(l1 is not None or l2 is not None or carry != 0)",
        whyWeUseItHere:
          "Ensures an extra final node is created when a carry overflows (e.g. 50 + 50 = 100).",
      },
      {
        keywordOrMethod: "tail.next = ListNode(digit)",
        plainEnglishExplanation:
          "Creates a brand-new node holding `digit` and attaches it to the end of the sum list being constructed.",
        exampleSnippet:
          "dummy = ListNode()\ntail = dummy\ntail.next = ListNode(7)\nprint(dummy.next.val)",
        whyWeUseItHere:
          "Constructs the result list one digit at a time.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { l1: [2, 4, 3], l2: [5, 6, 4] },
      focus: ["tail", "l1", "l2"],
    },
    intuitiveExplanation: {
      intuition:
        "This is exactly how you add numbers by hand on paper! When you add 342 and 465, you align them on the right and add column-by-column starting from the ones digit: 2 + 5 = 7. Next, 4 + 6 = 10: you write down 0 and carry over the 1. Then 3 + 4 + 1 = 8: write down 8. The beauty of storing digits in reverse order is that the heads of both lists are already the ones digits! You can walk forward through both lists in lockstep, adding matching columns and carrying over any overflow to the next step.",
      edgeCases: [
        "Numbers of different lengths (e.g. `[9, 9]` and `[1]`): treat missing digits in the shorter list as 0.",
        "Final carry overflow (e.g. `[5]` + `[5]` = `[0, 1]`): the carry creates an extra node after both lists have ended.",
        "Both inputs are single zeros (`[0]` + `[0]`): correctly yields `[0]`.",
      ],
      stepByStepWalkthrough: [
        "Initialize `dummy = ListNode()` as an anchor and set `tail = dummy`. Set `carry = 0`.",
        "Loop while `l1` has nodes, `l2` has nodes, or `carry != 0`.",
        "Get the value of `l1` (or 0 if exhausted) and `l2` (or 0 if exhausted).",
        "Calculate `total = val1 + val2 + carry`. Update `carry = total // 10` and `digit = total % 10`.",
        "Create a new node `ListNode(digit)`, attach it to `tail.next`, and advance `tail = tail.next`.",
        "Advance `l1` and `l2` if they are not `None`.",
        "Return `dummy.next`.",
      ],
    },
    hints: {
      conceptual:
        "Since the digits are already reversed, the first node is the 1's place. How do you simulate elementary school addition digit by digit?",
      structural:
        "Use a dummy node and a `carry` integer initialized to 0. Loop `while l1 is not None or l2 is not None or carry != 0:`, compute the column sum, create `ListNode(total % 10)`, and set `carry = total // 10`.",
    },
    commonMistakes: [
      "Forgetting the final carry. If the loop ends with `carry = 1`, that extra digit must be appended (e.g. 99 + 1 = 100).",
      "Crashing when one list is shorter than the other by trying to read `l1.val` when `l1` is `None`.",
      "Trying to convert linked lists to Python integers first; while it works in Python, it misses the purpose of pointer traversal.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def add_two_numbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    # Add two numbers represented as reversed linked lists.
    # Tip: remember to carry over values greater than 9 to the next digit.
    pass
`,
    optimalSolution: `def add_two_numbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    # dummy anchor node to build the result list
    dummy = ListNode()
    tail = dummy
    carry = 0

    # Loop while either list has digits remaining or there is a leftover carry
    while l1 is not None or l2 is not None or carry != 0:
        # Extract digit from l1 if available, otherwise 0
        val1 = l1.val if l1 is not None else 0
        # Extract digit from l2 if available, otherwise 0
        val2 = l2.val if l2 is not None else 0

        # Sum the digits plus previous carry
        total = val1 + val2 + carry
        # Compute carry for the next column (0 or 1)
        carry = total // 10
        # The single digit to store at the current position
        digit = total % 10

        # Attach the new digit node to the result list
        tail.next = ListNode(digit)
        tail = tail.next

        # Advance l1 if not at the end
        if l1 is not None:
            l1 = l1.next
        # Advance l2 if not at the end
        if l2 is not None:
            l2 = l2.next

    # Result begins after the dummy node
    return dummy.next
`,
    bruteForceSolution: `def add_two_numbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    # Convert l1 into an integer
    num1 = 0
    multiplier1 = 1
    curr = l1
    while curr is not None:
        num1 += curr.val * multiplier1
        multiplier1 *= 10
        curr = curr.next

    # Convert l2 into an integer
    num2 = 0
    multiplier2 = 1
    curr = l2
    while curr is not None:
        num2 += curr.val * multiplier2
        multiplier2 *= 10
        curr = curr.next

    # Add the numbers and convert sum back to a linked list
    total = num1 + num2
    dummy = ListNode()
    tail = dummy
    if total == 0:
        return ListNode(0)
    while total > 0:
        tail.next = ListNode(total % 10)
        tail = tail.next
        total //= 10
    return dummy.next
`,
    harness: {
      kind: "function",
      entry: "add_two_numbers",
      argTypes: { l1: "linked-list", l2: "linked-list" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { l1: [2, 4, 3], l2: [5, 6, 4] },
        expected: [7, 0, 8],
        description: "342 + 465 = 807, represented as [7, 0, 8].",
      },
      {
        input: { l1: [0], l2: [0] },
        expected: [0],
        description: "0 + 0 = 0.",
      },
      {
        input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
        expected: [8, 9, 9, 9, 0, 0, 0, 1],
        description: "Unequal lengths with cascading carries producing an extra high-order digit.",
      },
      { input: { l1: [9, 9], l2: [1] }, expected: [0, 0, 1], description: "99 + 1 = 100." },
      { input: { l1: [5], l2: [5] }, expected: [0, 1], description: "5 + 5 = 10." },
      { input: { l1: [1, 8], l2: [0] }, expected: [1, 8], description: "81 + 0 = 81." },
      { input: { l1: [2, 4, 9], l2: [5, 6, 4, 9] }, expected: [7, 0, 4, 0, 1] },
      { input: { l1: [1], l2: [9, 9, 9] }, expected: [0, 0, 0, 1] },
    ],
  },

  // ------------------------------------------------------------------ find-the-duplicate-number
  {
    id: "find-the-duplicate-number",
    summary:
      "Given an array of integers `nums` containing $n + 1$ integers where each integer is in the range $[1, n]$ inclusive. There is only **one repeated number** in `nums`, though it may appear two or more times. Return this duplicate number. You must solve the problem **without** modifying the array `nums` and using only $O(1)$ extra space.",
    constraints: [
      "1 ≤ n ≤ 100,000",
      "nums.length == n + 1",
      "1 ≤ nums[i] ≤ n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times",
      "Solve without modifying nums and using O(1) extra space",
    ],
    pattern: "Floyd's Tortoise and Hare (Cycle Detection on array indices)",
    timeComplexity: {
      bruteForce: "O(n²)",
      optimal: "O(n)",
      explanation:
        "Brute force compares every pair of indices with nested loops taking O(n²) time. Floyd's cycle detection jumps along indices: Phase 1 meets inside the cycle in at most n steps, and Phase 2 finds the cycle entrance in at most n steps, giving O(n) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "Only a few integer pointer variables (`slow`, `fast`, `slow2`) are used, using strictly O(1) extra memory.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "next_index = nums[current]",
        plainEnglishExplanation:
          "Using an array value as the index for your next step. Because every number in `nums` is between `1` and `n`, and indices go from `0` to `n`, each element can be viewed as a pointer to another slot in the array.",
        exampleSnippet:
          "nums = [1, 2, 0]\ncurr = 0\nnext_idx = nums[curr]\nprint(next_idx, nums[next_idx])",
        whyWeUseItHere:
          "Transforms the array into a virtual linked list without allocating any node objects.",
      },
      {
        keywordOrMethod: "while True: ... break",
        plainEnglishExplanation:
          "An infinite loop that repeats until an explicit `break` statement inside an `if` block executes, exiting the loop immediately.",
        exampleSnippet:
          "count = 0\nwhile True:\n    count += 1\n    if count == 3:\n        break\nprint(count)",
        whyWeUseItHere:
          "Allows `slow` and `fast` to take their initial steps before testing `if slow == fast`.",
      },
      {
        keywordOrMethod: "slow = nums[slow]  vs  fast = nums[nums[fast]]",
        plainEnglishExplanation:
          "`nums[slow]` jumps one step ahead. `nums[nums[fast]]` chains two lookups, jumping two steps ahead in the virtual linked list.",
        exampleSnippet:
          "nums = [2, 0, 1]\npos = 0\nprint(nums[pos])\nprint(nums[nums[pos]])",
        whyWeUseItHere:
          "Simulates the tortoise (1 step) and hare (2 steps) speeds.",
      },
      {
        keywordOrMethod: "slow2 = 0",
        plainEnglishExplanation:
          "Initializes a second pointer at index `0` to begin Floyd's Phase 2, finding the start of the cycle.",
        exampleSnippet:
          "slow2 = 0\nprint(slow2)",
        whyWeUseItHere:
          "The distance from index 0 to the cycle entrance equals the distance from the meeting point to the cycle entrance.",
      },
    ],
    visualizerType: "array-pointers",
    visualization: {
      input: { nums: [1, 3, 4, 2, 2] },
      pointers: { nums: ["slow", "fast"] },
    },
    intuitiveExplanation: {
      intuition:
        "Think of the array as a game of musical chairs where each chair has a label telling you which chair to walk to next: `current -> nums[current]`. Since index 0 is not in the range [1, n], no chair ever points back to index 0 (it is the starting entrance). However, because there are n + 1 chairs and only values 1 through n, at least two chairs must point to the same chair (the duplicate number). Having two pointers point to the same node creates a branch that merges into a cycle! Just like detecting a cycle in a linked list, a fast runner and a slow runner starting at chair 0 will eventually meet inside the loop. Once they meet, resetting one runner to 0 and walking both at speed 1 will cause them to collide exactly at the entrance of the cycle: the duplicate number!",
      edgeCases: [
        "The duplicate appears more than twice (e.g. `[2, 2, 2, 2, 2]`): multiple pointers lead into the cycle, and the algorithm still finds the entrance cleanly.",
        "Smallest possible array of length 2 (`[1, 1]`): `nums[0] = 1` and `nums[1] = 1`, cycle detected at 1.",
        "Duplicate is at the very beginning or end of the array: Floyd's algorithm depends only on values as pointers, not the physical array order.",
      ],
      stepByStepWalkthrough: [
        "Phase 1: Start `slow = 0` and `fast = 0`.",
        "Loop repeatedly: advance `slow = nums[slow]` by 1 step and `fast = nums[nums[fast]]` by 2 steps.",
        "When `slow == fast`, the pointers have met inside the cycle. Break out of Phase 1.",
        "Phase 2: Leave `slow` at the meeting point and set a new pointer `slow2 = 0`.",
        "Move both `slow` and `slow2` forward by 1 step at a time (`slow = nums[slow]`, `slow2 = nums[slow2]`).",
        "When `slow == slow2`, they have met at the cycle entrance.",
        "Return `slow` (the duplicate value).",
      ],
    },
    hints: {
      conceptual:
        "If you view each index i as a node that points to nums[i], why does a duplicate value guarantee that two different nodes point to the same node? What does that structure look like?",
      structural:
        "Use Floyd's tortoise and hare algorithm. In Phase 1, start both at 0 and move `slow = nums[slow]` and `fast = nums[nums[fast]]` until they match. In Phase 2, start `slow2 = 0` and advance both `slow` and `slow2` by 1 step until they meet.",
    },
    commonMistakes: [
      "Modifying the array (e.g. sorting with `nums.sort()` or marking visited numbers as negative), which violates the constraint 'without modifying the array'.",
      "Using a `set` to track seen numbers, which takes O(n) space and violates the 'O(1) extra space' requirement.",
      "Starting `slow2` at `slow` instead of `0` in Phase 2, or moving `fast` at double speed in Phase 2.",
    ],
    starterCode: `def find_duplicate(nums: list[int]) -> int:
    # Find the one duplicate number in nums without modifying the array and using O(1) space.
    # Tip: treat array values as pointers (i -> nums[i]) to detect a cycle.
    pass
`,
    optimalSolution: `def find_duplicate(nums: list[int]) -> int:
    # Step 1: Detect a cycle using Floyd's tortoise and hare pointers.
    # Both pointers start at index 0
    slow = 0
    fast = 0

    # Advance slow by 1 jump and fast by 2 jumps until they meet inside the cycle
    while True:
        # slow takes one step: jump to nums[slow]
        slow = nums[slow]
        # fast takes two steps: jump twice
        fast = nums[nums[fast]]
        # When they land on the same index, they have met inside the cycle
        if slow == fast:
            break

    # Step 2: Find the entrance of the cycle (the duplicate number).
    # Start a second slow pointer at index 0 and move both 1 step at a time.
    slow2 = 0
    while slow != slow2:
        # Advance both pointers by one step
        slow = nums[slow]
        slow2 = nums[slow2]

    # The meeting point is the cycle entrance, which corresponds to the duplicate value
    return slow
`,
    bruteForceSolution: `def find_duplicate(nums: list[int]) -> int:
    # Compare every pair of indices (O(n^2) time, O(1) space)
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return nums[i]
    return -1
`,
    harness: {
      kind: "function",
      entry: "find_duplicate",
    },
    testCases: [
      {
        input: { nums: [1, 3, 4, 2, 2] },
        expected: 2,
        description: "2 is the only repeated number.",
      },
      {
        input: { nums: [3, 1, 3, 4, 2] },
        expected: 3,
        description: "3 appears twice.",
      },
      {
        input: { nums: [3, 3, 3, 3, 3] },
        expected: 3,
        description: "Duplicate appears more than twice.",
      },
      { input: { nums: [1, 1] }, expected: 1, description: "Smallest possible input array of length 2." },
      { input: { nums: [1, 1, 2] }, expected: 1 },
      { input: { nums: [2, 5, 9, 6, 9, 3, 8, 9, 7, 1] }, expected: 9 },
      { input: { nums: [2, 2, 2, 2, 2] }, expected: 2 },
      { input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 3] }, expected: 3 },
    ],
  },

  // ------------------------------------------------------------------ lru-cache
  {
    id: "lru-cache",
    summary:
      "Design a data structure that implements a **Least Recently Used (LRU) Cache**.\nImplement the `LRUCache` class:\n- `LRUCache(capacity: int)`: Initializes the cache with a positive size `capacity`.\n- `get(key: int) -> int`: Returns the value of the `key` if it exists in the cache, otherwise returns `-1`. Accessing a key marks it as the most recently used.\n- `put(key: int, value: int) -> None`: Updates the value of the `key` if it exists. Otherwise, inserts the `key-value` pair. If adding the new pair causes the total number of keys to exceed `capacity`, evict the **least recently used** key.\nBoth `get` and `put` must run in **$O(1)$ average time complexity**.",
    constraints: [
      "1 ≤ capacity ≤ 3,000",
      "0 ≤ key ≤ 10,000",
      "0 ≤ value ≤ 100,000",
      "At most 200,000 calls will be made to get and put",
    ],
    pattern: "Hash map + Doubly Linked List with dummy head and tail",
    timeComplexity: {
      bruteForce: "O(capacity) per get and put",
      optimal: "O(1) per get and put",
      explanation:
        "Brute force using a Python list to track recency requires O(capacity) time to scan and rearrange elements. The optimal solution uses a hash map for O(1) node lookup and a doubly linked list for O(1) removal, insertion, and eviction.",
    },
    spaceComplexity: {
      optimal: "O(capacity)",
      explanation:
        "The cache stores at most `capacity` node objects in the doubly linked list and at most `capacity` entries in the hash map.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "class DListNode:",
        plainEnglishExplanation:
          "A doubly linked list node holding a `key`, `val`, a pointer to the previous node (`.prev`), and a pointer to the next node (`.next`).",
        exampleSnippet:
          "class Node:\n    def __init__(self, key, val):\n        self.key, self.val = key, val\n        self.prev, self.next = None, None\nn = Node(1, 10)\nprint(n.key, n.val)",
        whyWeUseItHere:
          "Doubly linked nodes can be removed from anywhere in the list in O(1) time if you hold a reference to the node.",
      },
      {
        keywordOrMethod: "self.head.next = self.tail / self.tail.prev = self.head",
        plainEnglishExplanation:
          "Creates two permanent 'sentinel' or dummy nodes at both ends. The least recently used node is always `self.head.next`, and the most recently used node is always `self.tail.prev`. They never get removed.",
        exampleSnippet:
          "class Sentinels:\n    def __init__(self):\n        self.head, self.tail = ListNode(0), ListNode(0)\n        self.head.next, self.tail.prev = self.tail, self.head\ns = Sentinels()\nprint(s.head.next is s.tail)",
        whyWeUseItHere:
          "Eliminates special boundary checks when adding or removing nodes at the head or tail.",
      },
      {
        keywordOrMethod: "self._remove(node) and self._insert(node)",
        plainEnglishExplanation:
          "Helper methods on `self`. `_remove` unlinks a node from its current neighbors. `_insert` splices a node right before `self.tail` (marking it most recently used).",
        exampleSnippet:
          "def unlink(node):\n    node.prev.next = node.next\n    node.next.prev = node.prev\nprint('unlinked in O(1)')",
        whyWeUseItHere:
          "Bundles the pointer manipulation into reusable O(1) building blocks.",
      },
      {
        keywordOrMethod: "del self.cache[lru.key]",
        plainEnglishExplanation:
          "`del dict[key]` removes a key and its associated value from a dictionary. If the key is not in the dictionary, it raises a `KeyError`.",
        exampleSnippet:
          "d = {'a': 1, 'b': 2}\ndel d['a']\nprint(d)",
        whyWeUseItHere:
          "Removes the evicted least recently used key from the hash map.",
      },
    ],
    visualizerType: "hash-map",
    visualization: {
      input: {
        operations: ["LRUCache", "put", "put", "get"],
        arguments: [[2], [1, 1], [2, 2], [1]],
      },
    },
    intuitiveExplanation: {
      intuition:
        "Think of an LRU cache like a bookshelf with room for only `capacity` books. Every time you read a book (`get`) or place a new book on the shelf (`put`), you pull that book out and place it at the far right end (Most Recently Used). When the shelf is completely full and a new book arrives, you throw away the book sitting at the far left end (Least Recently Used) to make room. A dictionary alone lets you find any book by title in O(1) time, but doesn't track which book was used least recently. A doubly linked list keeps books in perfect order, but finding a book by title takes O(n). Combining both gives superpowers: the dictionary finds the node in O(1), and the doubly linked list moves it to the front or ejects the back in O(1)!",
      edgeCases: [
        "Cache capacity of 1: each `put` immediately evicts the previous item upon adding another.",
        "`put` on a key that already exists: updates the value and moves the node to MRU without increasing the item count.",
        "`get` on a non-existent key: returns -1 and changes nothing.",
      ],
      stepByStepWalkthrough: [
        "Initialize `capacity`, an empty dictionary `self.cache`, and dummy nodes `self.head` and `self.tail` connected to each other.",
        "`get(key)`: If `key` is not in `self.cache`, return `-1`. Otherwise, remove the node from its position, re-insert it before `tail` (marking MRU), and return `node.val`.",
        "`put(key, value)`: If `key` is already in `self.cache`, update its value and move it to MRU.",
        "If `key` is new, create `new_node = DListNode(key, value)`, store it in `self.cache[key]`, and insert it before `tail`.",
        "If `len(self.cache) > self.capacity`, evict `lru = self.head.next`: remove it from the list and delete `self.cache[lru.key]`.",
      ],
    },
    hints: {
      conceptual:
        "A hash map provides O(1) lookup, but has no notion of ordering. A linked list provides O(1) node relocation, but O(n) lookup. How can you combine both to get O(1) for everything?",
      structural:
        "Use a `dict` mapping `key -> node` alongside a doubly linked list with sentinel `head` and `tail` nodes. Write two helper methods: `_remove(node)` to unlink a node, and `_insert(node)` to insert right before `tail`.",
    },
    commonMistakes: [
      "Using a single singly linked list: deleting a node in O(1) requires knowing its previous node, which singly linked lists cannot do.",
      "Forgetting to store `key` inside the node: when evicting the LRU node, you need `node.key` to delete it from the hash map (`del self.cache[node.key]`).",
      "Forgetting that `get` also counts as an access and must move the retrieved node to the MRU position.",
    ],
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        # Initialize LRUCache with given capacity.
        pass

    def get(self, key: int) -> int:
        # Return the value of key if it exists, otherwise -1.
        pass

    def put(self, key: int, value: int) -> None:
        # Update or insert key-value pair, evicting the least recently used if needed.
        pass
`,
    optimalSolution: `class DListNode:
    def __init__(self, key: int = 0, val: int = 0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        # Maximum number of items the cache can hold
        self.capacity = capacity
        # Map each key to its corresponding DListNode for O(1) lookup
        self.cache = {}

        # Sentinel dummy head and tail nodes to avoid edge cases when modifying ends
        self.head = DListNode()
        self.tail = DListNode()
        # Initially head points directly to tail and tail points back to head
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: DListNode) -> None:
        # Unlink node from its neighbors in O(1) time
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _insert(self, node: DListNode) -> None:
        # Insert node right before the tail (the most recently used position)
        prev_node = self.tail.prev
        prev_node.next = node
        node.prev = prev_node
        node.next = self.tail
        self.tail.prev = node

    def get(self, key: int) -> int:
        # If the key is not in cache, return -1
        if key not in self.cache:
            return -1

        # Find the node, move it to the MRU position (tail), and return its value
        node = self.cache[key]
        self._remove(node)
        self._insert(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        # If the key already exists, update its value and move to MRU position
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._remove(node)
            self._insert(node)
            return

        # Create a new node and add it to cache and doubly linked list
        new_node = DListNode(key, value)
        self.cache[key] = new_node
        self._insert(new_node)

        # If cache exceeded capacity, evict the LRU node (node right after head)
        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]
`,
    bruteForceSolution: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.order = []
        self.store = {}

    def get(self, key: int) -> int:
        if key not in self.store:
            return -1
        self.order.remove(key)
        self.order.append(key)
        return self.store[key]

    def put(self, key: int, value: int) -> None:
        if key in self.store:
            self.order.remove(key)
        elif len(self.order) >= self.capacity:
            lru_key = self.order.pop(0)
            del self.store[lru_key]
        self.store[key] = value
        self.order.append(key)
`,
    harness: { kind: "design", entry: "LRUCache" },
    testCases: [
      {
        input: {
          operations: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
          arguments: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        },
        expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
        description: "Classic test: capacity 2. Key 2 is evicted when key 3 is added, then key 1 is evicted when key 4 is added.",
      },
      {
        input: {
          operations: ["LRUCache", "put", "get", "put", "get", "get"],
          arguments: [[1], [2, 1], [2], [3, 2], [2], [3]],
        },
        expected: [null, null, 1, null, -1, 2],
        description: "Capacity 1 cache: each put evicts the existing element.",
      },
      {
        input: {
          operations: ["LRUCache", "put", "put", "get", "put", "get"],
          arguments: [[2], [1, 10], [1, 20], [1], [2, 30], [1]],
        },
        expected: [null, null, null, 20, null, 20],
        description: "Updating an existing key replaces its value without evicting other keys.",
      },
      {
        input: {
          operations: ["LRUCache", "get"],
          arguments: [[2], [5]],
        },
        expected: [null, -1],
      },
      {
        input: {
          operations: ["LRUCache", "put", "put", "put", "get", "put", "get", "get", "get"],
          arguments: [[3], [1, 1], [2, 2], [3, 3], [1], [4, 4], [2], [3], [4]],
        },
        expected: [null, null, null, null, 1, null, -1, 3, 4],
      },
      {
        input: {
          operations: ["LRUCache", "put", "put", "put", "put", "get", "get"],
          arguments: [[2], [1, 1], [2, 2], [3, 3], [4, 4], [1], [2]],
        },
        expected: [null, null, null, null, null, -1, -1],
      },
    ],
  },

  // ------------------------------------------------------------------ merge-k-sorted-lists
  {
    id: "merge-k-sorted-lists",
    summary:
      "You are given an array of $k$ linked lists `lists`, where each linked list is already sorted in ascending order. Merge all $k$ linked lists into **one** single sorted linked list and return its head.",
    constraints: [
      "k == lists.length",
      "0 ≤ k ≤ 10,000",
      "0 ≤ lists[i].length ≤ 500",
      "-10,000 ≤ lists[i][j] ≤ 10,000",
      "lists[i] is sorted in ascending order",
      "The sum of lists[i].length will not exceed 10,000",
    ],
    pattern: "Divide and Conquer (pairwise merging of lists)",
    timeComplexity: {
      bruteForce: "O(N log N)",
      optimal: "O(N log k)",
      explanation:
        "Brute force dumps all N values into a list, sorts them in O(N log N) time, and builds new nodes. Divide and conquer merges pairs of lists in O(N) time per round. With k lists, there are log2(k) rounds of merging, yielding O(N log k) total time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "The lists are re-linked in place using pointer adjustments; only a small array of list references is maintained between rounds.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "while len(lists) > 1:",
        plainEnglishExplanation:
          "Keeps looping until only one combined linked list remains in the `lists` array.",
        exampleSnippet:
          "items = [1, 2, 3, 4]\nwhile len(items) > 1:\n    items.pop()\nprint(items[0])",
        whyWeUseItHere:
          "Halves the number of lists in each round until a single fully merged list is left.",
      },
      {
        keywordOrMethod: "range(0, len(lists), 2)",
        plainEnglishExplanation:
          "Generates indices stepping by 2: `0, 2, 4, ...`. This allows taking elements in pairs `(i, i + 1)`.",
        exampleSnippet:
          "for i in range(0, 6, 2):\n    print(i, i + 1)",
        whyWeUseItHere:
          "Pairs up adjacent lists `lists[i]` and `lists[i + 1]` to merge them together.",
      },
      {
        keywordOrMethod: "l2 = lists[i + 1] if i + 1 < len(lists) else None",
        plainEnglishExplanation:
          "If the total number of lists is odd, the last list has no partner to pair with, so its partner is set to `None`.",
        exampleSnippet:
          "arr = ['a', 'b', 'c']\nfor i in range(0, len(arr), 2):\n    partner = arr[i + 1] if i + 1 < len(arr) else None\n    print(arr[i], partner)",
        whyWeUseItHere:
          "Safely handles lists with an odd count without an `IndexError`.",
      },
      {
        keywordOrMethod: "helper merge_two(l1, l2)",
        plainEnglishExplanation:
          "Defines an inner function that takes two sorted linked lists and stitches them into a single sorted list using a dummy node.",
        exampleSnippet:
          "dummy = ListNode()\ntail = dummy\ntail.next = ListNode(5)\nprint(dummy.next.val)",
        whyWeUseItHere:
          "Reuses the two-list merge algorithm as the core building block for merging k lists.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] },
      focus: ["lists", "merged"],
    },
    intuitiveExplanation: {
      intuition:
        "Merging k lists one-by-one in a row (merging list 1 with list 2, then merging that with list 3, etc.) is like a tournament where one player has to play every single match in a row: the combined list gets longer and longer, taking O(k * N) time. A tournament bracket (Divide and Conquer) is much smarter! In round 1, pair lists up: list 0 plays list 1, list 2 plays list 3, etc. Now you only have k/2 lists left. Repeat in round 2 to get k/4 lists, and so on. Every single node only participates in log2(k) merge rounds, drastically speeding up the overall merge to O(N log k).",
      edgeCases: [
        "`lists` is empty (`[]`): returns `None` immediately.",
        "`lists` contains only empty lists (`[[], []]`): merges cleanly into `None`.",
        "`lists` has length 1: returns the single list without any merging needed.",
        "Odd number of lists: the leftover unpaired list moves directly to the next round.",
      ],
      stepByStepWalkthrough: [
        "If `lists` is empty, return `None`.",
        "Define a helper function `merge_two(l1, l2)` that combines two sorted lists using the standard dummy node pattern.",
        "While `len(lists) > 1`, initialize an empty array `merged` for the winners of this round.",
        "Loop through `lists` with step 2: take `l1 = lists[i]` and `l2 = lists[i + 1]` (or `None` if `i + 1` is out of bounds).",
        "Merge the pair with `merge_two(l1, l2)` and append the result to `merged`.",
        "Set `lists = merged` and repeat until only one list remains.",
        "Return `lists[0]`.",
      ],
    },
    hints: {
      conceptual:
        "If you merge list 1 with list 2, then list 3, then list 4, you are repeatedly re-traversing the same nodes. How can a tournament bracket (merging in pairs) reduce the number of comparisons?",
      structural:
        "Write a helper `merge_two(l1, l2)`. In a `while len(lists) > 1:` loop, iterate with `for i in range(0, len(lists), 2):`, merge `lists[i]` with `lists[i + 1]`, and collect the merged lists into a new array.",
    },
    commonMistakes: [
      "Merging lists one by one iteratively (list 0 with 1, then with 2, then with 3...), which degrades to O(k * N) time and can time out on large inputs.",
      "Crashing when `lists` is empty (`[]`) or contains empty lists (`[[]]`).",
      "Using a min-heap without handling ties: `ListNode` does not support the `<` comparison operator, causing a `TypeError` when two nodes have identical values unless a unique tie-breaker index is provided.",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def merge_k_lists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    # Merge k sorted linked lists into one sorted linked list and return its head.
    # Tip: divide and conquer by repeatedly merging pairs of lists.
    pass
`,
    optimalSolution: `def merge_k_lists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    # Return None if the input array of lists is empty
    if not lists:
        return None

    # Helper function to merge two sorted lists using a dummy node
    def merge_two(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy
        while l1 is not None and l2 is not None:
            if l1.val <= l2.val:
                tail.next = l1
                l1 = l1.next
            else:
                tail.next = l2
                l2 = l2.next
            tail = tail.next
        # Attach any remaining nodes from either list
        tail.next = l1 if l1 is not None else l2
        return dummy.next

    # Divide and conquer: repeatedly merge adjacent pairs of lists
    while len(lists) > 1:
        merged = []
        # Iterate with step 2 to process pairs of lists
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            # If there is an odd list at the end, pair it with None
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge_two(l1, l2))
        # Replace lists with the halved merged lists
        lists = merged

    # Return the single merged list remaining
    return lists[0]
`,
    bruteForceSolution: `def merge_k_lists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    # Collect all values across every linked list
    values = []
    for head in lists:
        curr = head
        while curr is not None:
            values.append(curr.val)
            curr = curr.next

    # Sort the values and construct a new linked list
    values.sort()
    dummy = ListNode()
    tail = dummy
    for v in values:
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next
`,
    harness: {
      kind: "function",
      entry: "merge_k_lists",
      argTypes: { lists: "linked-list-array" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] },
        expected: [1, 1, 2, 3, 4, 4, 5, 6],
        description: "3 sorted lists merged into one combined sorted list.",
      },
      {
        input: { lists: [] },
        expected: [],
        description: "Empty list of lists merges into an empty list.",
      },
      {
        input: { lists: [[]] },
        expected: [],
        description: "A single empty list merges into an empty list.",
      },
      { input: { lists: [[], [1]] }, expected: [1], description: "One empty list and one list with 1 element." },
      { input: { lists: [[1], [0]] }, expected: [0, 1] },
      { input: { lists: [[-2, 1, 4], [-3, 2, 5], [-1, 0, 3]] }, expected: [-3, -2, -1, 0, 1, 2, 3, 4, 5] },
      { input: { lists: [[1, 2], [3, 4], [5, 6], [7, 8]] }, expected: [1, 2, 3, 4, 5, 6, 7, 8] },
      { input: { lists: [[5], [], [1, 3], [], [2]] }, expected: [1, 2, 3, 5] },
    ],
  },

  // ------------------------------------------------------------------ reverse-nodes-in-k-group
  {
    id: "reverse-nodes-in-k-group",
    summary:
      "Given `head`, the first node of a linked list, reverse the nodes of the list **$k$ at a time**, and return the modified list. $k$ is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of $k$, then the remaining nodes at the end should stay in their original order. You may not alter the values inside the nodes; only the nodes themselves (their `.next` pointers) may be changed.",
    constraints: [
      "The number of nodes in the list is n",
      "1 ≤ k ≤ n ≤ 5,000",
      "0 ≤ Node.val ≤ 1,000",
      "Only node pointers may be changed, not values",
    ],
    pattern: "Dummy node + group-by-group reversal with k-node check",
    timeComplexity: {
      bruteForce: "O(n)",
      optimal: "O(n)",
      explanation:
        "Brute force extracts all nodes into a Python list, reverses chunks of size k, and reconnects them. The optimal solution scans k nodes ahead, reverses each group in-place, and splices it back into the list. Every node is visited a constant number of times, giving O(n) time.",
    },
    spaceComplexity: {
      optimal: "O(1)",
      explanation:
        "All reversals are performed directly by rewiring `.next` pointers using a few reference variables (`dummy`, `group_prev`, `kth`, `curr`, `prev`), requiring O(1) auxiliary space.",
    },
    syntaxPrimers: [
      {
        keywordOrMethod: "def get_kth(curr, k):",
        plainEnglishExplanation:
          "A helper loop that steps `curr = curr.next` up to `k` times. If `curr` becomes `None` before completing `k` steps, it returns `None`, signaling that fewer than `k` nodes remain.",
        exampleSnippet:
          "def advance(node, k):\n    while node and k > 0:\n        node = node.next\n        k -= 1\n    return node\nhead = ListNode(1, ListNode(2))\nprint(advance(head, 1).val)\nprint(advance(head, 5))",
        whyWeUseItHere:
          "Determines whether there are enough nodes left to form a complete k-group before reversing.",
      },
      {
        keywordOrMethod: "group_prev pointer",
        plainEnglishExplanation:
          "A pointer that always points to the node directly preceding the current group of $k$ nodes. Starts at `dummy`.",
        exampleSnippet:
          "dummy = ListNode(0, ListNode(1))\ngroup_prev = dummy\nprint(group_prev.next.val)",
        whyWeUseItHere:
          "Needed so we can attach the newly reversed group to the preceding part of the list.",
      },
      {
        keywordOrMethod: "prev = group_next / curr = group_prev.next",
        plainEnglishExplanation:
          "When reversing, setting `prev` initially to `group_next` (the node after the k-group) ensures that the very first node reversed will automatically point to the rest of the list.",
        exampleSnippet:
          "a = ListNode(1)\nb = ListNode(2)\na.next = b\nprev = None\nprint(a.val, b.val)",
        whyWeUseItHere:
          "Saves an extra reconnection step after the reversal loop.",
      },
      {
        keywordOrMethod: "while curr != group_next:",
        plainEnglishExplanation:
          "Reverses only the nodes belonging to the current group, stopping as soon as `curr` reaches the first node of the *next* group.",
        exampleSnippet:
          "a = ListNode(1, ListNode(2, ListNode(3)))\nstop = a.next.next\ncurr = a\nwhile curr != stop:\n    curr = curr.next\nprint(curr.val)",
        whyWeUseItHere:
          "Confines the reversal to exactly $k$ nodes.",
      },
    ],
    visualizerType: "linked-list",
    visualization: {
      input: { head: [1, 2, 3, 4, 5], k: 2 },
      focus: ["group_prev", "kth"],
    },
    intuitiveExplanation: {
      intuition:
        "Think of a train with many passenger cars, and you are told to invert cars in groups of k. Before touching anything in the current group, you walk forward k cars to make sure there are actually k cars left to invert. If there are fewer than k cars left, you leave them alone and you're done! If there are at least k cars, you decouple the group from the train, flip the k cars around backwards, and couple the flipped segment back between the car in front (`group_prev`) and the car behind (`group_next`). Then you move your coupling tool to the end of the newly flipped group and repeat for the next group.",
      edgeCases: [
        "`k = 1`: reversing groups of 1 leaves the list completely unchanged.",
        "`k` equals the entire list length: reverses the whole list in one group.",
        "List length is not a multiple of `k`: the remaining nodes at the end stay untouched.",
        "Single node list (`[1]`, `k = 1`): returns the single node.",
      ],
      stepByStepWalkthrough: [
        "Create a `dummy` node before `head` and set `group_prev = dummy`.",
        "Find the $k$-th node after `group_prev` using `get_kth(group_prev, k)`.",
        "If fewer than $k$ nodes exist (`kth is None`), break out of the loop: the remaining nodes stay as they are.",
        "Save `group_next = kth.next`, the first node of the subsequent group.",
        "Reverse the $k$ nodes between `group_prev` and `group_next` using `prev` and `curr` pointers, starting `prev = group_next`.",
        "Connect `group_prev.next` to `kth` (the new front of the reversed group).",
        "Update `group_prev` to the old head of the group (which is now the tail of the group).",
        "Return `dummy.next`.",
      ],
    },
    hints: {
      conceptual:
        "Before reversing a group of k nodes, how can you check if there are at least k nodes available? If not enough remain, what should happen?",
      structural:
        "Use `dummy = ListNode(0, head)` and `group_prev = dummy`. In a loop, find `kth = get_kth(group_prev, k)`. If `kth is None`, break. Otherwise, reverse the k nodes bounded by `curr != group_next` where `group_next = kth.next`, link `group_prev.next = kth`, and advance `group_prev`.",
    },
    commonMistakes: [
      "Reversing the final group even when it contains fewer than k nodes. The problem specifically requires leaving leftover nodes in their original order.",
      "Losing the reference to the node following the k-group (`group_next`), severing the rest of the list.",
      "Forgetting to update `group_prev` to the *new tail* of the reversed group (which was `group_prev.next` before the flip).",
    ],
    starterCode: `${LIST_NODE_COMMENT}
def reverse_k_group(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # Reverse nodes of the list in groups of k.
    # Tip: verify that at least k nodes remain before reversing each group.
    pass
`,
    optimalSolution: `def reverse_k_group(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # Dummy node placed before head to simplify modifying the first group
    dummy = ListNode(0, head)
    # group_prev is the node immediately before the k-group currently being processed
    group_prev = dummy

    # Helper to advance curr by k steps and return the k-th node
    def get_kth(curr: Optional[ListNode], k: int) -> Optional[ListNode]:
        while curr is not None and k > 0:
            curr = curr.next
            k -= 1
        return curr

    while True:
        # Find the k-th node in the current group
        kth = get_kth(group_prev, k)
        # If there are fewer than k nodes left, leave them as-is and stop
        if kth is None:
            break

        # Save the node following this group to reconnect later
        group_next = kth.next

        # Reverse the k nodes in this group
        # prev starts as group_next so the new tail connects to the rest of the list
        prev = group_next
        curr = group_prev.next
        while curr != group_next:
            # Save next node before flipping the pointer
            next_node = curr.next
            # Flip pointer to point backwards
            curr.next = prev
            # Advance prev and curr
            prev = curr
            curr = next_node

        # Reconnect group_prev to the new front of the group (kth)
        new_group_prev = group_prev.next
        group_prev.next = kth
        # Move group_prev to the end of the reversed group
        group_prev = new_group_prev

    return dummy.next
`,
    bruteForceSolution: `def reverse_k_group(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # Collect all nodes in a list
    nodes = []
    curr = head
    while curr is not None:
        nodes.append(curr)
        curr = curr.next

    # Reverse each complete group of size k
    for i in range(0, len(nodes), k):
        if i + k <= len(nodes):
            nodes[i : i + k] = reversed(nodes[i : i + k])

    # Re-link all nodes
    dummy = ListNode()
    tail = dummy
    for node in nodes:
        tail.next = node
        tail = tail.next
    tail.next = None
    return dummy.next
`,
    harness: {
      kind: "function",
      entry: "reverse_k_group",
      argTypes: { head: "linked-list" },
      returnType: "linked-list",
    },
    testCases: [
      {
        input: { head: [1, 2, 3, 4, 5], k: 2 },
        expected: [2, 1, 4, 3, 5],
        description: "Reversing in groups of 2. The leftover node [5] remains in place.",
      },
      {
        input: { head: [1, 2, 3, 4, 5], k: 3 },
        expected: [3, 2, 1, 4, 5],
        description: "Reversing group of 3. The leftover nodes [4, 5] remain in place.",
      },
      {
        input: { head: [1, 2, 3, 4, 5], k: 1 },
        expected: [1, 2, 3, 4, 5],
        description: "Reversing in groups of 1 leaves the list unchanged.",
      },
      { input: { head: [1], k: 1 }, expected: [1], description: "Single node list." },
      { input: { head: [1, 2], k: 2 }, expected: [2, 1] },
      { input: { head: [1, 2, 3, 4, 5, 6], k: 2 }, expected: [2, 1, 4, 3, 6, 5] },
      { input: { head: [1, 2, 3, 4, 5, 6], k: 3 }, expected: [3, 2, 1, 6, 5, 4] },
      { input: { head: [1, 2, 3, 4, 5, 6, 7], k: 4 }, expected: [4, 3, 2, 1, 5, 6, 7] },
    ],
  },
];

export default problems;
