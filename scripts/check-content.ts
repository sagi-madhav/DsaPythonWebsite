/**
 * Exports all lesson/problem content to JSON and validates it with real Python.
 *
 *   npm run check                        # everything
 *   npm run check -- --only two-sum      # one problem (or a category slug, or "lessons")
 *   npm run traces                       # also (re)write public/traces/*.json
 *
 * Set PYTHON=/path/to/python if `python3`/`python` isn't on your PATH.
 *
 * Content files are loaded one by one, so a file that fails to import (e.g. it is
 * mid-edit) only fails the check when it's in scope of --only.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { LESSON_SLUGS } from "../src/data/lessonOrder";
import { PROBLEM_LIST } from "../src/data/problemList";
import { CATEGORY_SLUGS, type Lesson, type ProblemContent } from "../src/data/types";

const root = path.resolve(__dirname, "..");
const cacheDir = path.join(root, ".cache");
// Unique per process: several checks may run at once.
const contentPath = path.join(cacheDir, `content-${process.pid}.json`);

const args = process.argv.slice(2);
const onlyIndex = args.indexOf("--only");
const only = new Set(
  onlyIndex >= 0 ? (args[onlyIndex + 1] ?? "").split(",").map((s) => s.trim()).filter(Boolean) : [],
);
const inScope = (...keys: string[]) => only.size === 0 || keys.some((k) => only.has(k));

async function load<T>(file: string): Promise<T> {
  const mod = await import(pathToFileURL(path.join(root, file)).href);
  return (mod.default?.default ?? mod.default) as T;
}

async function main() {
  const integrity: string[] = [];
  const problems: unknown[] = [];
  const knownIds = new Set(PROBLEM_LIST.map((p) => p.id));

  for (const slug of CATEGORY_SLUGS) {
    let content: ProblemContent[];
    try {
      content = await load<ProblemContent[]>(`src/data/problems/${slug}.ts`);
    } catch (err) {
      const msg = `could not import src/data/problems/${slug}.ts: ${(err as Error).message}`;
      if (inScope(slug)) integrity.push(msg);
      else console.warn(`(skipping ${slug}: it failed to import, probably mid-edit)`);
      continue;
    }
    const seen = new Set<string>();
    for (const c of content) {
      const meta = PROBLEM_LIST.find((m) => m.id === c.id);
      if (!knownIds.has(c.id)) integrity.push(`content id "${c.id}" in ${slug}.ts is not in problemList.ts`);
      else if (meta && meta.category !== slug)
        integrity.push(`"${c.id}" belongs to ${meta.category}, but is in ${slug}.ts`);
      if (seen.has(c.id)) integrity.push(`"${c.id}" appears twice in ${slug}.ts`);
      seen.add(c.id);
      if (meta) problems.push({ ...meta, ...c });
    }
  }

  const lessons: Lesson[] = [];
  for (const slug of LESSON_SLUGS) {
    try {
      const lesson = await load<Lesson>(`src/data/lessons/${slug}.ts`);
      if (lesson.slug !== slug) integrity.push(`lessons/${slug}.ts has slug "${lesson.slug}"`);
      lessons.push(lesson);
    } catch (err) {
      const msg = `could not import src/data/lessons/${slug}.ts: ${(err as Error).message}`;
      if (inScope(slug, "lessons")) integrity.push(msg);
      else console.warn(`(skipping lesson ${slug}: it failed to import)`);
    }
  }

  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(contentPath, JSON.stringify({ problems, lessons, integrity }));

  const result = spawnSync(
    findPython(),
    [path.join(root, "scripts", "pycheck.py"), "--content", contentPath, ...args],
    { stdio: "inherit", env: { ...process.env, PYTHONIOENCODING: "utf-8" } },
  );
  rmSync(contentPath, { force: true });
  process.exit(result.status ?? 1);
}

function findPython(): string {
  if (process.env.PYTHON) return process.env.PYTHON;
  for (const candidate of ["python3", "python"]) {
    const probe = spawnSync(candidate, ["-c", "import sys; print(sys.version_info >= (3, 10))"], {
      encoding: "utf8",
    });
    if (probe.status === 0 && probe.stdout.trim() === "True") return candidate;
  }
  console.error("Python 3.10+ not found. Install it or set PYTHON=/path/to/python.");
  process.exit(1);
}

main();
