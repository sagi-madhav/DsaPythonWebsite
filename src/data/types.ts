/**
 * Data contracts for every lesson and problem on the site.
 *
 * Problem *metadata* (title, difficulty, links) lives once in `problemList.ts`.
 * Problem *content* (explanations, code, tests) lives in `problems/<category>.ts`
 * and is merged with the metadata by id in `neetcodeProblems.ts`.
 *
 * Every reference solution is executed against its test cases with real Python by
 * `npm run check:problems`, so the content can't silently drift out of sync.
 */

export const CATEGORY_SLUGS = [
  "arrays-and-hashing",
  "two-pointers",
  "sliding-window",
  "stack",
  "binary-search",
  "linked-list",
  "trees",
  "tries",
  "heap-priority-queue",
  "backtracking",
  "graphs",
  "advanced-graphs",
  "1-d-dp",
  "2-d-dp",
  "greedy",
  "intervals",
  "math-and-geometry",
  "bit-manipulation",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type Difficulty = "Easy" | "Medium" | "Hard";

/** A plain-English explanation of one piece of Python syntax used in a solution. */
export interface SyntaxPrimer {
  /** e.g. "enumerate()", "dict.get()", "nums[::-1]" */
  keywordOrMethod: string;
  plainEnglishExplanation: string;
  /** A tiny, self-contained, runnable example (prints something). */
  exampleSnippet: string;
  whyWeUseItHere: string;
}

/**
 * One test case. `input` maps parameter name -> JSON value, in the same order as
 * the function's parameters (the harness passes them positionally).
 */
export interface TestCase {
  input: Record<string, unknown>;
  expected: unknown;
  /** Shown under the example. Explain *why* the answer is what it is. */
  description?: string;
}

/** How a JSON input value is turned into a Python object before the call. */
export type ArgType =
  | "json" // passed as-is (lists, numbers, strings, booleans, null -> None)
  | "linked-list" // [1,2,3] -> ListNode(1) -> ListNode(2) -> ListNode(3)
  | "linked-list-array" // [[1,4],[2,3]] -> [ListNode, ListNode]
  | "cycle-list" // {"values":[3,2,0,-4], "pos":1} -> list whose tail links to index pos (-1 = no cycle)
  | "random-list" // [[7,null],[13,0]] -> Node(val, next, random) list (Copy List with Random Pointer)
  | "tree" // LeetCode level-order: [3,9,20,null,null,15,7] -> TreeNode
  | "tree-node" // a value; becomes the node with that value in the first "tree" argument
  | "graph"; // adjacency list (1-indexed) -> Node(1) whose .neighbors link the graph (Clone Graph)

/** How the Python return value is turned back into JSON for comparison. */
export type ReturnType =
  | "json"
  | "linked-list"
  | "tree"
  | "tree-node-val" // returned TreeNode -> its .val
  | "random-list"
  | "graph";

export type CompareMode =
  | "exact" // deep equality (floats compared with 1e-5 tolerance)
  | "unordered" // outer list may be in any order
  | "unordered-nested" // outer list AND each inner list may be in any order
  | "one-of" // `expected` is a list of acceptable answers
  | "topo-order" // any valid course order (Course Schedule II)
  | "alien-order"; // any order consistent with the words (Alien Dictionary)

export interface HarnessConfig {
  /**
   * "function": call `entry(*input.values())`.
   * "design": `input` is {"operations": ["MinStack","push",...], "arguments": [[],[1],...]},
   *           expected is the list of outputs (null for the constructor / void methods).
   * "custom": a special runner (see `runner`).
   */
  kind: "function" | "design" | "custom";
  /** Function name (snake_case) or class name the learner implements. */
  entry: string;
  argTypes?: Record<string, ArgType>;
  returnType?: ReturnType;
  compare?: CompareMode;
  /** For in-place problems: the parameter whose final value is the answer (e.g. "matrix"). */
  inPlace?: string;
  /**
   * "encode-decode": learner writes encode(strs) and decode(s); we check decode(encode(strs)) == strs.
   * "codec-roundtrip": learner writes class Codec with serialize/deserialize; we check the round trip.
   */
  runner?: "encode-decode" | "codec-roundtrip";
}

export type VisualizerType =
  | "array-pointers"
  | "sliding-window"
  | "hash-map"
  | "linked-list"
  | "tree"
  | "grid"
  | "stack"
  | "heap"
  | "recursion";

/**
 * Tells the step-by-step visualizer how to draw the reference solution's variables.
 * The visualizer works for any code (it records every variable at every line), these
 * hints just make the important parts stand out.
 */
export interface VisualizationConfig {
  /** Small input for the demo run. Defaults to the first test case. Keep it tiny. */
  input?: Record<string, unknown>;
  /** Array/string variable -> integer variables that index into it. e.g. { nums: ["l", "r"] } */
  pointers?: Record<string, string[]>;
  /** Shade array[start..end] (inclusive) - for sliding windows. */
  windows?: { array: string; start: string; end: string }[];
  /** 2-D list variable -> [rowVar, colVar] pairs to highlight a cell. e.g. { grid: [["r", "c"]] } */
  gridPointers?: Record<string, [string, string][]>;
  /** List variables that hold a heapq heap - drawn as a binary tree as well as an array. */
  heaps?: string[];
  /** Variables to draw first / larger. */
  focus?: string[];
  /** Variables that are noise for this problem. */
  hide?: string[];
  /** Safety cap for the demo trace (default 400). */
  maxSteps?: number;
}

export interface ComplexityInfo {
  bruteForce: string;
  optimal: string;
  explanation: string;
}

/** Everything about a problem that isn't metadata. One of these per problem in problems/<category>.ts */
export interface ProblemContent {
  id: string;
  /** Plain-English restatement of the task (our own words - never copied from LeetCode). Markdown-lite: `code`, **bold**. */
  summary: string;
  /** Optional constraint bullets that matter for choosing an approach. */
  constraints?: string[];
  /** One-line name of the technique, e.g. "Hash map of complements". */
  pattern: string;
  timeComplexity: ComplexityInfo;
  spaceComplexity: { optimal: string; explanation: string };
  syntaxPrimers: SyntaxPrimer[];
  visualizerType: VisualizerType;
  visualization?: VisualizationConfig;
  intuitiveExplanation: {
    intuition: string;
    edgeCases: string[];
    stepByStepWalkthrough: string[];
  };
  hints: {
    /** Level 1: what to think about. No code. */
    conceptual: string;
    /** Level 2: which Python structure / shape of loop to use. */
    structural: string;
  };
  commonMistakes: string[];
  starterCode: string;
  /** Level 3 hint. Heavily commented: comments are shown as narration in the visualizer. */
  optimalSolution: string;
  bruteForceSolution?: string;
  harness: HarnessConfig;
  testCases: TestCase[];
}

/** Canonical metadata - the single source of truth for titles, difficulty, and links. */
export interface ProblemMeta {
  id: string;
  title: string;
  category: CategorySlug;
  difficulty: Difficulty;
  leetcodeUrl: string;
  neetcodeUrl: string;
  videoUrl: string;
  blind75: boolean;
}

/** The full problem as the workspace consumes it. */
export type ProblemData = ProblemMeta & ProblemContent;

export interface CategoryInfo {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  /** Category slugs that should be learned first (roadmap edges). */
  prerequisites: CategorySlug[];
  /** Fundamentals lessons that unlock this category. */
  fundamentals: string[];
  tagline: string;
  /** The everyday analogy that makes the pattern click. */
  mentalModel: string;
  /** "Reach for this pattern when..." */
  recognitionSignals: string[];
  /** A reusable Python template for the pattern. */
  template: string;
  /** Typical complexity of the pattern. */
  typicalComplexity: string;
  /** Roadmap layout position (column, row) on a 0-based grid. */
  position: { x: number; y: number };
}

// ---------------------------------------------------------------- fundamentals

export type LessonBlock =
  | { kind: "text"; markdown: string }
  /** Runnable snippet. Learners can Run it and Visualize it line by line. */
  | {
      kind: "code";
      code: string;
      caption?: string;
      /** Offer the step-by-step visualizer for this snippet (great for anything that mutates data). */
      visualize?: boolean;
      /** The snippet deliberately raises an error (to teach what the error means). */
      expectError?: boolean;
    }
  | { kind: "callout"; tone: "tip" | "warning" | "insight"; title: string; markdown: string }
  /** A comparison table, e.g. operation -> Big-O. */
  | { kind: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { kind: "quiz"; question: Quiz }
  | { kind: "exercise"; exercise: Exercise }
  | { kind: "bigOChart" };

export interface Quiz {
  prompt: string;
  /** Optional code the question is about. For "predict the output" questions, the check script runs it. */
  code?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  /** If true, the check script verifies that running `code` prints exactly options[answerIndex]. */
  predictsOutput?: boolean;
}

/** A tiny auto-graded coding challenge inside a lesson. */
export interface Exercise {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  solution: string;
  harness: HarnessConfig;
  testCases: TestCase[];
  hint?: string;
}

export interface Lesson {
  slug: string;
  title: string;
  /** One-sentence promise of what the learner will be able to do. */
  goal: string;
  estimatedMinutes: number;
  /** Lucide icon name (kebab-case), e.g. "list", "brackets". */
  icon: string;
  blocks: LessonBlock[];
}
