import { notFound } from "next/navigation";
import { getLesson, LESSONS } from "@/data/fundamentalsData";
import { LESSON_SLUGS } from "@/data/lessonOrder";
import { LessonReaderClient } from "./LessonReaderClient";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LESSONS.map((l) => ({
    slug: l.slug,
  }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  const currentIndex = LESSON_SLUGS.indexOf(slug as any);
  const prevSlug = currentIndex > 0 ? LESSON_SLUGS[currentIndex - 1] : null;
  const nextSlug = currentIndex < LESSON_SLUGS.length - 1 ? LESSON_SLUGS[currentIndex + 1] : null;
  const prevLesson = prevSlug ? getLesson(prevSlug) : null;
  const nextLesson = nextSlug ? getLesson(nextSlug) : null;

  return (
    <LessonReaderClient
      lesson={lesson}
      prevLesson={prevLesson ? { slug: prevLesson.slug, title: prevLesson.title } : null}
      nextLesson={nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : null}
    />
  );
}
