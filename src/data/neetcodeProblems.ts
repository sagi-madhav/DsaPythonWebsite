/**
 * All NeetCode 150 problems: canonical metadata (problemList.ts) merged with the
 * hand-written content for each category (problems/*.ts).
 *
 * Import this only from Server Components / build scripts. It's large, and the
 * client should receive just the one problem it is rendering.
 */
import { PROBLEM_LIST } from "./problemList";
import type { CategorySlug, ProblemContent, ProblemData } from "./types";

import arraysAndHashing from "./problems/arrays-and-hashing";
import twoPointers from "./problems/two-pointers";
import slidingWindow from "./problems/sliding-window";
import stack from "./problems/stack";
import binarySearch from "./problems/binary-search";
import linkedList from "./problems/linked-list";
import trees from "./problems/trees";
import tries from "./problems/tries";
import heapPriorityQueue from "./problems/heap-priority-queue";
import backtracking from "./problems/backtracking";
import graphs from "./problems/graphs";
import advancedGraphs from "./problems/advanced-graphs";
import oneDDp from "./problems/1-d-dp";
import twoDDp from "./problems/2-d-dp";
import greedy from "./problems/greedy";
import intervals from "./problems/intervals";
import mathAndGeometry from "./problems/math-and-geometry";
import bitManipulation from "./problems/bit-manipulation";

const CONTENT: ProblemContent[] = [
  ...arraysAndHashing,
  ...twoPointers,
  ...slidingWindow,
  ...stack,
  ...binarySearch,
  ...linkedList,
  ...trees,
  ...tries,
  ...heapPriorityQueue,
  ...backtracking,
  ...graphs,
  ...advancedGraphs,
  ...oneDDp,
  ...twoDDp,
  ...greedy,
  ...intervals,
  ...mathAndGeometry,
  ...bitManipulation,
];

const contentById = new Map(CONTENT.map((c) => [c.id, c]));

/** Every problem that has content, in roadmap order. */
export const PROBLEMS: ProblemData[] = PROBLEM_LIST.flatMap((meta) => {
  const content = contentById.get(meta.id);
  return content ? [{ ...meta, ...content }] : [];
});

const problemsById = new Map(PROBLEMS.map((p) => [p.id, p]));

export function getProblem(id: string): ProblemData | undefined {
  return problemsById.get(id);
}

export function getProblemsByCategory(category: CategorySlug): ProblemData[] {
  return PROBLEMS.filter((p) => p.category === category);
}

/** Content ids that don't match a NeetCode 150 id (caught by `npm run check:problems`). */
export const ORPHAN_CONTENT_IDS = CONTENT.filter(
  (c) => !PROBLEM_LIST.some((m) => m.id === c.id),
).map((c) => c.id);
