import { notFound } from "next/navigation";
import { getProblem } from "@/data/neetcodeProblems";
import { PROBLEM_LIST } from "@/data/problemList";
import { CATEGORY_INFO } from "@/data/categories";
import type { CategorySlug } from "@/data/types";
import { ProblemWorkspaceClient } from "./ProblemWorkspaceClient";

interface PageProps {
  params: Promise<{
    category: string;
    problemId: string;
  }>;
}

export async function generateStaticParams() {
  return PROBLEM_LIST.map((p) => ({
    category: p.category,
    problemId: p.id,
  }));
}

export default async function ProblemPage({ params }: PageProps) {
  const { category, problemId } = await params;
  const problem = getProblem(problemId);

  if (!problem || problem.category !== category) {
    notFound();
  }

  const categoryInfo = CATEGORY_INFO[category as CategorySlug];

  return (
    <ProblemWorkspaceClient
      problem={problem}
      categoryInfo={categoryInfo}
    />
  );
}
