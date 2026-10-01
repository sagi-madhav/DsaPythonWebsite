/** Fundamentals lessons in the order a complete beginner should take them. */
export const LESSON_SLUGS = [
  "python-basics",
  "control-flow",
  "functions",
  "lists-and-slicing",
  "dicts-and-sets",
  "strings",
  "references",
  "python-idioms",
  "deques-and-heaps",
  "classes-and-nodes",
  "recursion",
  "big-o",
  "problem-solving",
] as const;

export type LessonSlug = (typeof LESSON_SLUGS)[number];
