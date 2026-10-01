/**
 * Module 0: Python for DSA. One file per lesson in ./lessons, in learning order.
 */
import type { Lesson } from "./types";

import l_python_basics from "./lessons/python-basics";
import l_control_flow from "./lessons/control-flow";
import l_functions from "./lessons/functions";
import l_lists_and_slicing from "./lessons/lists-and-slicing";
import l_dicts_and_sets from "./lessons/dicts-and-sets";
import l_strings from "./lessons/strings";
import l_references from "./lessons/references";
import l_python_idioms from "./lessons/python-idioms";
import l_deques_and_heaps from "./lessons/deques-and-heaps";
import l_classes_and_nodes from "./lessons/classes-and-nodes";
import l_recursion from "./lessons/recursion";
import l_big_o from "./lessons/big-o";
import l_problem_solving from "./lessons/problem-solving";

export const LESSONS: Lesson[] = [
  l_python_basics,
  l_control_flow,
  l_functions,
  l_lists_and_slicing,
  l_dicts_and_sets,
  l_strings,
  l_references,
  l_python_idioms,
  l_deques_and_heaps,
  l_classes_and_nodes,
  l_recursion,
  l_big_o,
  l_problem_solving,
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}
