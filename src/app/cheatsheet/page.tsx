import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { 
  FileText, 
  Sparkles, 
  Terminal, 
  Zap, 
  AlertTriangle,
  Lightbulb
} from "lucide-react";

export default function CheatsheetPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <FileText className="h-3.5 w-3.5" />
            <span>Python for DSA Quick Reference</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            DSA Python Cheat Sheet
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Everything you need on a single page: operation time complexities, standard library imports, syntax tricks, and common beginner pitfalls.
          </p>
        </div>

        {/* Big-O Hierarchy Table */}
        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span>Big-O Growth Rate Hierarchy (Fastest to Slowest)</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full border-collapse text-left text-xs font-mono">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                <tr>
                  <th className="p-2.5 font-semibold">Notation</th>
                  <th className="p-2.5 font-semibold">Name</th>
                  <th className="p-2.5 font-semibold">Typical Operation</th>
                  <th className="p-2.5 font-semibold">Max N (in 1 sec)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 bg-zinc-950 text-zinc-300">
                <tr>
                  <td className="p-2.5 font-bold text-emerald-400">O(1)</td>
                  <td className="p-2.5">Constant</td>
                  <td className="p-2.5">Hash map lookup, array index, append</td>
                  <td className="p-2.5 text-zinc-500">Virtually infinite</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-cyan-400">O(log n)</td>
                  <td className="p-2.5">Logarithmic</td>
                  <td className="p-2.5">Binary search, balanced BST lookup</td>
                  <td className="p-2.5 text-zinc-500">10¹⁸</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-blue-400">O(n)</td>
                  <td className="p-2.5">Linear</td>
                  <td className="p-2.5">Single loop, two pointers, sliding window</td>
                  <td className="p-2.5 text-zinc-500">10⁷ ~ 10⁸</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-amber-400">O(n log n)</td>
                  <td className="p-2.5">Linearithmic</td>
                  <td className="p-2.5">Merge sort, heap operations across n items</td>
                  <td className="p-2.5 text-zinc-500">10⁶</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-rose-400">O(n²)</td>
                  <td className="p-2.5">Quadratic</td>
                  <td className="p-2.5">Nested loops over all pairs, 2D grid DP</td>
                  <td className="p-2.5 text-zinc-500">10³ ~ 10⁴</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-purple-400">O(2ⁿ)</td>
                  <td className="p-2.5">Exponential</td>
                  <td className="p-2.5">Generating all subsets, branching recursion</td>
                  <td className="p-2.5 text-zinc-500">20 ~ 25</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-red-500">O(n!)</td>
                  <td className="p-2.5">Factorial</td>
                  <td className="p-2.5">Generating all permutations</td>
                  <td className="p-2.5 text-zinc-500">10 ~ 11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Python Data Structures Complexity */}
        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>Python Collections Time Complexities</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full border-collapse text-left text-xs font-mono">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                <tr>
                  <th className="p-2.5 font-semibold">Data Structure</th>
                  <th className="p-2.5 font-semibold">Append / Insert</th>
                  <th className="p-2.5 font-semibold">Pop / Delete</th>
                  <th className="p-2.5 font-semibold">Lookup / Search</th>
                  <th className="p-2.5 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 bg-zinc-950 text-zinc-300">
                <tr>
                  <td className="p-2.5 font-bold text-emerald-400">list</td>
                  <td className="p-2.5">O(1) append<br/><span className="text-rose-400">O(n) insert(0, x)</span></td>
                  <td className="p-2.5">O(1) pop()<br/><span className="text-rose-400">O(n) pop(0)</span></td>
                  <td className="p-2.5">O(1) by index<br/><span className="text-rose-400">O(n) with `in`</span></td>
                  <td className="p-2.5 text-zinc-400">Avoid pop(0) in loops! Use deque instead.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-cyan-400">deque</td>
                  <td className="p-2.5">O(1) append<br/>O(1) appendleft</td>
                  <td className="p-2.5">O(1) pop()<br/>O(1) popleft()</td>
                  <td className="p-2.5 text-rose-400">O(n) by index</td>
                  <td className="p-2.5 text-zinc-400">Ideal for BFS and sliding windows.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-blue-400">dict</td>
                  <td className="p-2.5">O(1) average</td>
                  <td className="p-2.5">O(1) average</td>
                  <td className="p-2.5">O(1) average with `in`</td>
                  <td className="p-2.5 text-zinc-400">Keys must be immutable (str, int, tuple).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-amber-400">set</td>
                  <td className="p-2.5">O(1) add</td>
                  <td className="p-2.5">O(1) remove / discard</td>
                  <td className="p-2.5">O(1) with `in`</td>
                  <td className="p-2.5 text-zinc-400">Elements must be hashable.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-purple-400">heapq</td>
                  <td className="p-2.5">O(log n) heappush</td>
                  <td className="p-2.5">O(log n) heappop</td>
                  <td className="p-2.5">O(1) heap[0] (min only)</td>
                  <td className="p-2.5 text-zinc-400">Min-heap by default. Negate numbers for max-heap.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Must-Know Standard Library Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* collections module */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
            <h3 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              from collections import defaultdict, Counter, deque
            </h3>
            <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre">
{`# 1. Frequency counting
counts = Counter(nums)
# counts[num] gives frequency, no KeyError!

# 2. Default dictionary
adj = defaultdict(list)
adj[u].append(v)  # auto-creates [] if missing

# 3. Double-ended queue for BFS
queue = deque([root])
curr = queue.popleft()  # O(1) time!`}
            </pre>
          </div>

          {/* heapq module */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
            <h3 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              import heapq
            </h3>
            <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre">
{`# 1. Convert list to min-heap in O(n)
heap = [3, 1, 4, 1, 5]
heapq.heapify(heap)

# 2. Push and Pop
heapq.heappush(heap, 2)
smallest = heapq.heappop(heap)

# 3. Max-Heap Trick: negate values
max_heap = []
heapq.heappush(max_heap, -val)
largest = -heapq.heappop(max_heap)`}
            </pre>
          </div>
        </div>

        {/* Critical DSA Python Idioms */}
        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Essential Python Idioms for DSA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-emerald-400 font-bold">2D Grid Directions:</span>
              <pre className="text-zinc-300 whitespace-pre">
{`for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
    nr, nc = r + dr, c + dc
    if 0 <= nr < ROWS and 0 <= nc < COLS:`}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-emerald-400 font-bold">Safe 2D Grid Initialization:</span>
              <pre className="text-zinc-300 whitespace-pre">
{`# CORRECT: independent rows
dp = [[0] * COLS for _ in range(ROWS)]

# WRONG (creates aliased copies!):
# dp = [[0] * COLS] * ROWS`}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-emerald-400 font-bold">Backtracking Snapshot Copy:</span>
              <pre className="text-zinc-300 whitespace-pre">
{`# Must append a copy of current path!
res.append(path[:])  # or list(path)
# NOT res.append(path)`}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-emerald-400 font-bold">Custom Sorting Keys:</span>
              <pre className="text-zinc-300 whitespace-pre">
{`# Sort intervals by start time:
intervals.sort(key=lambda x: x[0])

# Sort words by length descending:
words.sort(key=lambda x: -len(x))`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
