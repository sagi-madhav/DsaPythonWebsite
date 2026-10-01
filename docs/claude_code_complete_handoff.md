# PROJECT HANDOFF & DIRECTIVE: Interactive Python DSA & NeetCode 150 Platform

## 1. Executive Summary & Objective
Build an interactive, modern web application that guides a complete beginner with **zero Python knowledge** through learning Data Structures & Algorithms and solving all **NeetCode 150** problems.

### Core Guiding Principles:
1. **Zero-Syntax Assumption:** Never assume the learner understands Python idioms (`enumerate`, list slices `[::-1]`, `collections.defaultdict`, `zip()`, `heapq`, list comprehensions, or pass-by-reference). Every concept must be broken down visually and conceptually in plain English.
2. **Interactive & Visual-First:** Every data structure must feature an interactive visual representation (pointers sliding across arrays, linked-list nodes breaking/relinking, recursion call stacks growing/shrinking).
3. **In-Browser Execution:** Learners must be able to run and test Python code directly in the browser with zero backend installation or server setup, powered by **Pyodide** (WebAssembly).
4. **Pattern-Based Mastery:** Group problems by fundamental algorithmic paradigms (Two Pointers, Sliding Window, Monotonic Stack, Backtracking, etc.) rather than isolated LeetCode numbers.

---

## 2. Technology Stack & Dependencies

* **Framework:** Next.js (App Router, TypeScript)
* **Styling & UI:** Tailwind CSS, `shadcn/ui`, Lucide Icons
* **In-Browser Python Engine:** Pyodide (`pyodide.js` loaded via Web Worker)
* **Code Editor:** `@monaco-editor/react` (configured for Python syntax)
* **Animations & Visualizations:** Framer Motion, HTML5 Canvas / SVG
* **State Management & Persistence:** `zustand` with `localStorage` persistence

---

## 3. Terminal Setup & Quickstart Commands

Claude Code, run these commands to initialize and scaffold the workspace:

```bash
# 1. Initialize Next.js app with TypeScript, Tailwind, and App Router
npx create-next-app@latest neetcode-python-interactive --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

cd neetcode-python-interactive

# 2. Install core application dependencies
npm install @monaco-editor/react zustand framer-motion lucide-react canvas-confetti clsx tailwind-merge

# 3. Install developer types
npm install -D @types/canvas-confetti

# 4. Initialize shadcn/ui components (if needed)
npx shadcn@latest init -y
npx shadcn@latest add button card tabs badge dialog progress
```

---

## 4. Directory & Architecture Plan

```text
src/
├── app/
│   ├── layout.tsx                     # Root layout with navbar & sidebar
│   ├── page.tsx                       # Dashboard / progress overview
│   ├── fundamentals/                  # Module 0: Python for DSA Primer
│   │   ├── page.tsx                   # Interactive syntax playground
│   │   └── [topic]/page.tsx           # Deep dive (lists, dicts, pointers, etc.)
│   ├── roadmap/                       # Interactive NeetCode 150 pattern graph
│   │   └── page.tsx
│   ├── learn/
│   │   └── [category]/
│   │       ├── page.tsx               # Pattern overview & mental models
│   │       └── [problemId]/
│   │           └── page.tsx           # 3-Panel Problem Workspace
│   └── cheatsheet/                    # Big-O & Python DSA Cheat Sheet
│       └── page.tsx
├── components/
│   ├── editor/
│   │   ├── PythonEditor.tsx           # Monaco editor wrapper
│   │   └── TestRunnerPanel.tsx        # Pyodide execution output & tests
│   ├── visualizers/
│   │   ├── ArrayPointerVisualizer.tsx # Two pointers & sliding window
│   │   ├── LinkedListVisualizer.tsx   # Nodes & reference pointers
│   │   ├── TreeVisualizer.tsx         # SVG recursive binary tree
│   │   └── HashMapVisualizer.tsx      # Key-value bucket animator
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── ui/                            # Reusable buttons, cards, tags
├── hooks/
│   └── usePyodide.ts                  # WebWorker interface for Python execution
├── lib/
│   └── pyodideWorker.ts               # Background worker running Python code
├── store/
│   └── useProgressStore.ts            # Zustand store for completed problems
└── data/
    ├── fundamentalsData.ts            # Lessons on Python primitives & complexity
    └── neetcodeProblems.ts            # Typed definitions for all 150 problems
```

---

## 5. Core System Design & Specifications

### A. Pyodide Web Worker Integration
Python execution must run in a separate Web Worker to prevent UI lockups during long-running loops or recursion.

`src/lib/pyodideWorker.ts`:
```typescript
// Worker script to initialize Pyodide and execute code safely
import { loadPyodide } from "pyodide";

let pyodideInstance: any = null;

async function getPyodide() {
  if (!pyodideInstance) {
    pyodideInstance = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
    });
  }
  return pyodideInstance;
}

self.onmessage = async (event: MessageEvent) => {
  const { code, testCases } = event.data;
  try {
    const pyodide = await getPyodide();
    
    // Redirect standard output to capture print statements
    await pyodide.runPythonAsync(`
      import sys
      import io
      sys.stdout = io.StringIO()
    `);

    // Execute user code
    await pyodide.runPythonAsync(code);

    const stdout = await pyodide.runPythonAsync(`sys.stdout.getvalue()`);

    // Run test harness if provided
    let results = [];
    if (testCases && testCases.length > 0) {
      for (const tc of testCases) {
        const testCode = `solution(${JSON.stringify(tc.input)}) == ${JSON.stringify(tc.expected)}`;
        const passed = await pyodide.runPythonAsync(testCode);
        results.push({ input: tc.input, expected: tc.expected, passed: Boolean(passed) });
      }
    }

    self.postMessage({ success: true, stdout, results });
  } catch (err: any) {
    self.postMessage({ success: false, error: err.message });
  }
};
```

---

### B. Problem Data Model (`src/data/neetcodeProblems.ts`)
Each problem definition must include syntax primers, complexity breakdowns, and test cases:

```typescript
export interface TestCase {
  input: any;
  expected: any;
  description?: string;
}

export interface SyntaxPrimer {
  keywordOrMethod: string; // e.g. "enumerate()", "dict.get()"
  plainEnglishExplanation: string;
  exampleSnippet: string;
  whyWeUseItHere: string;
}

export interface ProblemData {
  id: string;
  title: string;
  category:
    | "arrays-and-hashing"
    | "two-pointers"
    | "sliding-window"
    | "stack"
    | "binary-search"
    | "linked-list"
    | "trees"
    | "tries"
    | "heap-priority-queue"
    | "backtracking"
    | "graphs"
    | "advanced-graphs"
    | "1-d-dp"
    | "2-d-dp"
    | "greedy"
    | "intervals"
    | "math-and-geometry"
    | "bit-manipulation";
  difficulty: "Easy" | "Medium" | "Hard";
  neetcodeUrl: string;
  timeComplexity: {
    bruteForce: string;
    optimal: string;
    explanation: string;
  };
  spaceComplexity: {
    optimal: string;
    explanation: string;
  };
  syntaxPrimers: SyntaxPrimer[];
  visualizerType: "array-pointers" | "sliding-window" | "linked-list" | "tree" | "hash-map";
  intuitiveExplanation: {
    intuition: string;
    edgeCases: string[];
    stepByStepWalkthrough: string[];
  };
  starterCode: string;
  optimalSolution: string;
  testCases: TestCase[];
}
```

---

### C. The 3-Panel Problem Workspace Design

When a user visits `/learn/[category]/[problemId]`, present a responsive 3-column split view:

1. **Left Panel: Guided Intuition & Python Syntax Spotlights**
   * **Problem Summary:** High-level objective in plain English.
   * **Python Syntax Cards:** Expandable tooltips explaining every unfamiliar syntax construct present in the solution (e.g., `for i, num in enumerate(nums):`).
   * **Complexity Breakdown:** Big-$O$ time and space analysis comparing Brute Force vs. Optimal.
   * **Hints Accordion:** 
     * Level 1: Conceptual hint (e.g., "Think about what complement number you need to reach target").
     * Level 2: Python structural hint (e.g., "Store `{number: index}` in a dictionary").
     * Level 3: Full annotated solution.

2. **Center Panel: Dynamic Step-by-Step Visualizer**
   * Displays the input data as interactive visual blocks.
   * Controls: `[Step Back]`, `[Play/Pause]`, `[Step Forward]`, `[Reset]`.
   * Pointers and data values highlight in sync with the step progression.
   * Live variable inspector (showing hash table contents, pointer values $L$ and $R$, current sum).

3. **Right Panel: Monaco Code Sandbox & Output Console**
   * Pre-loaded starter template with typing definitions.
   * "Run Code" button communicating with the Pyodide Web Worker.
   * Test results table displaying inputs, expected outputs, actual outputs, and pass/fail indicators.

---

### D. Module 0: Python Fundamentals for DSA (`/fundamentals`)

Before diving into NeetCode problems, create a set of micro-lessons covering:
1. **Lists & Slicing:** Zero-indexing, negative indices (`nums[-1]`), slicing `nums[start:stop:step]`, $O(1)$ amortized append vs $O(n)$ insert at index 0.
2. **Dictionaries (`dict`) & Sets:** Average $O(1)$ lookup, handling missing keys (`dict.get(key, default)`), set membership testing with `in`.
3. **Strings:** Immutability, why repeated string concatenation inside a loop is $O(n^2)$, and why `''.join(list)` is $O(n)$.
4. **Pointers & References:** Pass-by-object-reference, shallow copy (`nums[:]` or `nums.copy()`) vs deep copy.
5. **Deques & Heaps:** Why `collections.deque` is required for $O(1)$ left-side pops; `heapq` module basics (min-heaps vs. simulating max-heaps with negated numbers).

---

## 6. Phased Implementation Plan for Claude Code

Execute the project in the following strict order:

### Phase 1: Setup & Scaffolding
- [ ] Initialize Next.js project with Tailwind CSS, Lucide, Monaco Editor, and Zustand.
- [ ] Implement `src/lib/pyodideWorker.ts` and `src/hooks/usePyodide.ts`.
- [ ] Create layout shell: Navigation bar, sidebar with all 18 categories, and persistent theme support.

### Phase 2: Python Fundamentals Section
- [ ] Build `/fundamentals` with interactive code playgrounds explaining `list`, `dict`, `set`, and `deque`.
- [ ] Add an interactive Big-O comparator chart showing growth rates ($O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, $O(2^n)$).

### Phase 3: The Reference Problem Workspace
- [ ] Implement the 3-panel workspace on `/learn/arrays-and-hashing/two-sum`.
- [ ] Build `HashMapVisualizer.tsx` illustrating step-by-step insertions and target complement lookups.
- [ ] Implement `ArrayPointerVisualizer.tsx` on `/learn/two-pointers/valid-palindrome`.

### Phase 4: Full NeetCode 150 Dataset & Category Roadmaps
- [ ] Populate `src/data/neetcodeProblems.ts` with problem metadata, test cases, and beginner Python syntax explanations.
- [ ] Build the interactive visual roadmap at `/roadmap` showing prerequisites and category progression.
- [ ] Save user completion status and written code in `localStorage` via Zustand.