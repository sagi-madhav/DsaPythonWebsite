import type { Lesson } from "../types";

const lesson: Lesson = {
  slug: "deques-and-heaps",
  title: "Deques & Heaps",
  goal: "Use collections.deque for O(1) queue operations and heapq for priority management and min/max heap patterns.",
  estimatedMinutes: 25,
  icon: "layers",
  blocks: [
    {
      kind: "text",
      markdown:
        "### The problem with standard lists\nStandard Python lists are fast for adding or removing items at the **very end**: `nums.append(x)` and `nums.pop()` run in instant $O(1)$ time.\n\nBut what happens when you need to remove an item from the **front** of a list using `nums.pop(0)`? Python has to physically shift every single remaining item in memory one spot to the left! If your list has 100,000 items, doing this in a loop will bring your program to a crawl and fail with **Time Limit Exceeded**.\n\nIn this lesson, we will meet two specialized data structures: `collections.deque` for instant operations on both ends of a sequence, and `heapq` for instant priority tracking.",
    },
    {
      kind: "text",
      markdown:
        "### 1. `collections.deque`: The Double-Ended Queue\nA **deque** (pronounced *\"deck\"*) stands for **d**ouble-**e**nded **que**ue. Think of it like a clear tube where you can push and pop items from either side with zero effort.\n\nKey operations:\n- `append(x)`: push to the right end — $O(1)$\n- `appendleft(x)`: push to the left end — $O(1)$\n- `pop()`: remove and return from the right end — $O(1)$\n- `popleft()`: remove and return from the left end — $O(1)$",
    },
    {
      kind: "code",
      caption: "Press Visualize to see how items join and leave either end of the deque without shifting other elements.",
      visualize: true,
      code: `from collections import deque

# Create a deque with starting items
queue = deque(["Alice", "Bob", "Charlie"])
print("Initial:", queue)

# Add to the end (normal queue behavior)
queue.append("Diana")

# Add to the front (priority or prepend)
queue.appendleft("VIP-Zara")
print("After arrivals:", queue)

# Serve the first person in line in O(1) time
served = queue.popleft()
print("Served:", served)
print("Remaining in line:", queue)
`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Never use list.pop(0) in a loop",
      markdown:
        "In interviews, using `my_list.pop(0)` inside a `while` loop is an immediate red flag. Popping $n$ items from the front of a standard list takes $O(n^2)$ time. Switching to `collections.deque` and using `popleft()` drops the total time to $O(n)$ ($O(1)$ per pop).",
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `from collections import deque
q = deque([10, 20])
q.append(30)
q.appendleft(5)
first = q.popleft()
last = q.pop()
print(first, last)`,
        options: ["5 30", "10 30", "5 20", "10 20"],
        answerIndex: 0,
        explanation:
          "`q.appendleft(5)` makes 5 the front element, so `q.popleft()` returns 5. `q.append(30)` puts 30 at the end, so `q.pop()` returns 30.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 2. What is a Heap?\nImagine a hospital Emergency Room. Patients don't get treated in the order they arrived; they get treated based on **urgency**. The most critical patient is always seen first.\n\nIn computer science, this is called a **priority queue**, and it is implemented using a **heap**.\n\nPython provides the built-in `heapq` module. A heap is just a normal Python list organized so that:\n- The **smallest item is always at index 0**: `heap[0]` is an instant $O(1)$ lookup.\n- Adding a new item (`heapq.heappush`) takes only $O(\\log n)$ time.\n- Removing the smallest item (`heapq.heappop`) takes only $O(\\log n)$ time.",
    },
    {
      kind: "code",
      caption: "Python heaps are min-heaps by default: `heappop()` always extracts the smallest item.",
      code: `import heapq

# A heap is backed by a standard Python list
min_heap = []

# Push items: heapq maintains the heap order automatically
heapq.heappush(min_heap, 50)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 30)

# The smallest item is always sitting at index 0
print("Smallest element peek:", min_heap[0])

# Extract the smallest items one by one
print("First popped:", heapq.heappop(min_heap))
print("Second popped:", heapq.heappop(min_heap))
print("Remaining in heap:", min_heap)
`,
    },
    {
      kind: "text",
      markdown:
        "### 3. `heapify()`: Turn a List into a Heap in $O(n)$\nIf you already have a list of numbers, you don't need to create an empty list and call `heappush` $n$ times (which would take $O(n \\log n)$).\n\nInstead, call `heapq.heapify(nums)`. It rearranges the list in-place into a valid heap in $O(n)$ time!",
    },
    {
      kind: "code",
      caption: "`heapify()` rearranges elements in-place in linear time.",
      code: `import heapq

numbers = [45, 12, 89, 7, 33]
print("Before heapify:", numbers)

heapq.heapify(numbers)
print("After heapify:", numbers)
print("Smallest element is at index 0:", numbers[0])
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `import heapq
h = [8, 3, 5, 1]
heapq.heapify(h)
print(heapq.heappop(h), h[0])`,
        options: ["1 3", "1 5", "1 8", "8 3"],
        answerIndex: 0,
        explanation:
          "`heapify` moves the minimum (1) to the front. `heappop(h)` pops 1. The next smallest number (3) moves to the front, so `h[0]` is 3.",
        predictsOutput: true,
      },
    },
    {
      kind: "text",
      markdown:
        "### 4. The Max-Heap Trick: Negate the Numbers!\nPython only provides a **min-heap**. There is no built-in `max_heap` class in Python's standard library.\n\nSo how do you repeatedly extract the **largest** number?\n\n**The negation trick**: multiply numbers by `-1` when pushing, and multiply by `-1` again when popping!\n\nBecause `-99 < -10`, the number 99 becomes the \"smallest\" negative number, rising to the top of the min-heap. When you pop it, `-(-99)` gives you back `99`.",
    },
    {
      kind: "code",
      caption: "Negating numbers lets you simulate a max-heap using Python's min-heap implementation.",
      code: `import heapq

scores = [15, 85, 42, 99, 60]

# Push negated values into a min-heap
max_heap = []
for score in scores:
    heapq.heappush(max_heap, -score)

# Pop largest values by negating what heappop returns
highest = -heapq.heappop(max_heap)
second = -heapq.heappop(max_heap)

print("Highest score:", highest)
print("Second highest:", second)
`,
    },
    {
      kind: "quiz",
      question: {
        prompt: "What does this print?",
        code: `import heapq
max_h = []
for x in [4, 9, 2]:
    heapq.heappush(max_h, -x)
print(-heapq.heappop(max_h))`,
        options: ["9", "4", "2", "-9"],
        answerIndex: 0,
        explanation:
          "The pushed values are `[-4, -9, -2]`. The min-heap puts the smallest negative value (`-9`) at the top. Popping `-9` and negating it gives `-(-9) = 9`.",
        predictsOutput: true,
      },
    },
    {
      kind: "table",
      caption: "When to use lists vs deques vs heaps",
      headers: ["Structure", "Peek Smallest", "Add Element", "Remove Front / Min", "Remove End"],
      rows: [
        ["list", "O(n) search", "O(1) append()", "O(n) pop(0) - SLOW", "O(1) pop()"],
        ["collections.deque", "O(n) search", "O(1) append() / appendleft()", "O(1) popleft() - FAST", "O(1) pop()"],
        ["heapq (min-heap)", "O(1) heap[0]", "O(log n) heappush()", "O(log n) heappop()", "O(n)"],
      ],
    },
    {
      kind: "exercise",
      exercise: {
        id: "heaps-k-smallest",
        title: "K Smallest Numbers",
        prompt:
          "Given a list of integers `nums` and an integer `k` (where `0 <= k <= len(nums)`), return the `k` smallest numbers in **ascending order** using `heapq`.",
        starterCode: `import heapq

def k_smallest(nums: list[int], k: int) -> list[int]:
    # Use heapify and heappop to gather the k smallest values
    return []
`,
        solution: `import heapq

def k_smallest(nums: list[int], k: int) -> list[int]:
    # Make a copy so we don't mutate the original input
    heap = list(nums)
    heapq.heapify(heap)
    result = []
    for _ in range(k):
        result.append(heapq.heappop(heap))
    return result
`,
        harness: { kind: "function", entry: "k_smallest" },
        testCases: [
          { input: { nums: [7, 10, 4, 3, 20, 15], k: 3 }, expected: [3, 4, 7], description: "The 3 smallest numbers are 3, 4, and 7." },
          { input: { nums: [5, 1, 9], k: 1 }, expected: [1], description: "Single smallest number." },
          { input: { nums: [1, 2, 3], k: 0 }, expected: [], description: "k=0 returns an empty list." },
          { input: { nums: [8, 8, 2, 2], k: 2 }, expected: [2, 2], description: "Handles duplicate values properly." },
          { input: { nums: [42], k: 1 }, expected: [42] },
        ],
        hint: "Turn `heap = list(nums)` into a heap with `heapq.heapify(heap)`. Then loop `k` times and append `heapq.heappop(heap)` to your result list.",
      },
    },
    {
      kind: "exercise",
      exercise: {
        id: "deques-recent-counter",
        title: "Process Tasks with Deque",
        prompt:
          "Given a list of customer names `requests`, simulate serving them in First-In-First-Out (FIFO) order using `collections.deque`. Return the list of served customers in the order they were processed.",
        starterCode: `from collections import deque

def serve_all(requests: list[str]) -> list[str]:
    # Create a deque and popleft each item until empty
    return []
`,
        solution: `from collections import deque

def serve_all(requests: list[str]) -> list[str]:
    queue = deque(requests)
    served = []
    while queue:
        served.append(queue.popleft())
    return served
`,
        harness: { kind: "function", entry: "serve_all" },
        testCases: [
          { input: { requests: ["Alice", "Bob", "Charlie"] }, expected: ["Alice", "Bob", "Charlie"], description: "FIFO order preserved." },
          { input: { requests: ["Solo"] }, expected: ["Solo"] },
          { input: { requests: [] }, expected: [], description: "Empty request list returns empty." },
          { input: { requests: ["Task1", "Task2", "Task3", "Task4"] }, expected: ["Task1", "Task2", "Task3", "Task4"] },
        ],
        hint: "Initialize `queue = deque(requests)`. While `queue` is not empty, use `served.append(queue.popleft())`.",
      },
    },
    {
      kind: "text",
      markdown:
        "### Where you'll use this\nDeques and heaps unlock essential problem categories on NeetCode:\n\n- **Binary Tree Level Order Traversal** & **Rotting Oranges**: Breadth-First Search (BFS) explores graphs and trees level-by-level using `collections.deque`.\n- **Sliding Window Maximum**: Uses a deque to keep track of useful candidate maximums in $O(n)$ time.\n- **Kth Largest Element in an Array**: Keeps a min-heap of size $k$ to quickly find large elements.\n- **Find Median from Data Stream**: Maintains a max-heap and a min-heap together to report the median in $O(1)$ time.\n- **Merge K Sorted Lists**: Uses a min-heap of node values to merge $k$ lists efficiently.",
    },
  ],
};

export default lesson;
