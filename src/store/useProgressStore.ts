"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProgressState {
  completedProblems: string[];
  userCode: Record<string, string>;
  completedLessons: string[];
  lessonQuizAnswers: Record<string, Record<number, number>>; // lessonSlug -> { questionIdx: optionIdx }
  
  // Actions
  toggleProblemCompleted: (problemId: string) => void;
  markProblemCompleted: (problemId: string, completed?: boolean) => void;
  setUserCode: (problemId: string, code: string) => void;
  getUserCode: (problemId: string, defaultCode: string) => string;
  markLessonCompleted: (lessonSlug: string, completed?: boolean) => void;
  setQuizAnswer: (lessonSlug: string, questionIdx: number, optionIdx: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedProblems: [],
      userCode: {},
      completedLessons: [],
      lessonQuizAnswers: {},

      toggleProblemCompleted: (problemId: string) => {
        set((state) => {
          const exists = state.completedProblems.includes(problemId);
          return {
            completedProblems: exists
              ? state.completedProblems.filter((id) => id !== problemId)
              : [...state.completedProblems, problemId],
          };
        });
      },

      markProblemCompleted: (problemId: string, completed = true) => {
        set((state) => {
          const exists = state.completedProblems.includes(problemId);
          if (completed && !exists) {
            return { completedProblems: [...state.completedProblems, problemId] };
          }
          if (!completed && exists) {
            return { completedProblems: state.completedProblems.filter((id) => id !== problemId) };
          }
          return state;
        });
      },

      setUserCode: (problemId: string, code: string) => {
        set((state) => ({
          userCode: {
            ...state.userCode,
            [problemId]: code,
          },
        }));
      },

      getUserCode: (problemId: string, defaultCode: string) => {
        return get().userCode[problemId] ?? defaultCode;
      },

      markLessonCompleted: (lessonSlug: string, completed = true) => {
        set((state) => {
          const exists = state.completedLessons.includes(lessonSlug);
          if (completed && !exists) {
            return { completedLessons: [...state.completedLessons, lessonSlug] };
          }
          if (!completed && exists) {
            return { completedLessons: state.completedLessons.filter((s) => s !== lessonSlug) };
          }
          return state;
        });
      },

      setQuizAnswer: (lessonSlug: string, questionIdx: number, optionIdx: number) => {
        set((state) => ({
          lessonQuizAnswers: {
            ...state.lessonQuizAnswers,
            [lessonSlug]: {
              ...(state.lessonQuizAnswers[lessonSlug] || {}),
              [questionIdx]: optionIdx,
            },
          },
        }));
      },

      resetProgress: () => {
        set({
          completedProblems: [],
          userCode: {},
          completedLessons: [],
          lessonQuizAnswers: {},
        });
      },
    }),
    {
      name: "neetcode-python-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
