import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QuestionState {
  question: string;
  answerOptions: string[];
  correctAnswer: string | null;
  status: "active" | "completed";
  // Teacher panel:
  participants: Array<{ user: string; submittedAnswer: string | null }>;
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
  joinQuestionParticipant: (user: string) => void;
  saveSubmittedAnswer: (user: string, answer: string) => void;
  saveCorrectAnswer: (answer: string) => void;
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
              },
            };
          },
          false,
          "quiz/saveNewQuestion"
        );
      },
      joinQuestionParticipant: (user) => {
        return set(
          (state) => {
            if (!state.currentQuestion) {
              return state;
            }

            return {
              ...state,
              currentQuestion: {
                ...state.currentQuestion,
                participants: [
                  ...state.currentQuestion.participants,
                  { user, submittedAnswer: null },
                ],
              },
            };
          },
          false,
          "quiz/joinQuestionParticipant"
        );
      },
      saveSubmittedAnswer: (user, answer) => {
        return set((state) => {
          if (!state.currentQuestion) {
            return state;
          }

          const updatedParticipants = state.currentQuestion.participants.map(
            (participant) => {
              if (participant.user === user) {
                return {
                  ...participant,
                  submittedAnswer: answer,
                };
              }

              return participant;
            }
          );

          return {
            ...state,
            currentQuestion: {
              ...state.currentQuestion,
              participants: updatedParticipants,
            },
          };
        });
      },
      saveCorrectAnswer: (answer) => {
        return set(
          (state) => {
            if (!state.currentQuestion) {
              return state;
            }

            return {
              ...state,
              currentQuestion: {
                ...state.currentQuestion,
                correctAnswer: answer,
                status: "completed",
              },
            };
          },
          false,
          "quiz/saveCorrectAnswer"
        );
      },
    }),
    { name: "quizStore", enabled: true }
  )
);

// Actions:
export const {
  saveNewQuestion,
  joinQuestionParticipant,
  saveSubmittedAnswer,
  saveCorrectAnswer,
} = useQuizStore.getState();

// Selectors:
export const currentQuestionSelector = (state: QuizState) =>
  state.currentQuestion;
