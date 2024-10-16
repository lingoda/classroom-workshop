import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QuestionState {
  question: string;
  answerOptions: string[];
  correctAnswer: string | null;
  status: "active" | "completed";
  // Teacher panel:
  participants: Array<{ user: string }>;
  submittedAnswers: Array<{
    user: string;
    answer: string;
  }>;
}

interface QuizState {
  currentQuestion: QuestionState | null;
}

const defaultState: QuizState = {
  currentQuestion: null,
};

interface QuizStore extends QuizState {
  saveNewQuestion: (
    question: string,
    answers: string[],
    correctAnswer?: string
  ) => void;
}

export const useQuizStore = create(
  devtools<QuizStore>(
    (set) => ({
      ...defaultState,
      saveNewQuestion: (question, answers, correctAnswer) => {
        return set(
          (state) => {
            return {
              ...state,
              currentQuestion: {
                question,
                answerOptions: answers,
                correctAnswer: correctAnswer || null,
                status: "active",
                participants: [],
                submittedAnswers: [],
              },
            };
          },
          false,
          "quiz/saveNewQuestion"
        );
      },
    }),
    { name: "quizStore", enabled: true }
  )
);

// Actions:
export const { saveNewQuestion } = useQuizStore.getState();

// Selectors:
export const currentQuestionSelector = (state: QuizState) =>
  state.currentQuestion;
