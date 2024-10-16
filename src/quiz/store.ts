import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface QuestionState {
  question: string;
  answerOptions: string[];
  correctAnswer: string | null;
  status: QuestionStatus;
  // Teacher panel:
  participants: Array<QuizParticipant>;
}

export type QuestionStatus = "active" | "completed";

export interface QuizParticipant {
  user: string;
  submittedAnswer: string | null;
}

interface QuizState {
  questions: QuestionState[];
  currentQuestionIndex: number;
}

const defaultState: QuizState = {
  questions: [],
  currentQuestionIndex: -1,
};

interface QuizStore extends QuizState {
  saveNewQuestion: (
    question: string,
    answers: string[],
    correctAnswer?: string
  ) => void;
  joinQuestionParticipant: (question: string, user: string) => void;
  saveSubmittedAnswer: (question: string, user: string, answer: string) => void;
  saveCorrectAnswer: (question: string, answer: string) => void;
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
              currentQuestionIndex: state.currentQuestionIndex + 1,
              questions: state.questions.concat({
                question,
                answerOptions: answers,
                correctAnswer: correctAnswer || null,
                status: "active",
                participants: [],
              }),
            };
          },
          false,
          "quiz/saveNewQuestion"
        );
      },
      joinQuestionParticipant: (question, user) => {
        return set(
          (state) => {
            return {
              ...state,
              questions: state.questions.map((currentQuestion) => {
                if (currentQuestion.question !== question)
                  return currentQuestion;

                return {
                  ...currentQuestion,
                  participants: [
                    ...currentQuestion.participants,
                    { user, submittedAnswer: null },
                  ],
                };
              }),
            };
          },
          false,
          "quiz/joinQuestionParticipant"
        );
      },
      saveSubmittedAnswer: (question, user, answer) => {
        return set(
          (state) => {
            return {
              ...state,
              questions: state.questions.map((currentQuestion) => {
                if (currentQuestion.question !== question)
                  return currentQuestion;

                return {
                  ...currentQuestion,
                  participants: currentQuestion.participants.map(
                    (participant) => {
                      if (participant.user !== user) return participant;

                      return {
                        ...participant,
                        submittedAnswer: answer,
                      };
                    }
                  ),
                };
              }),
            };
          },
          false,
          "quiz/saveSubmittedAnswer"
        );
      },
      saveCorrectAnswer: (question, answer) => {
        return set(
          (state) => {
            return {
              ...state,
              questions: state.questions.map((currentQuestion) => {
                if (currentQuestion.question !== question)
                  return currentQuestion;

                return {
                  ...currentQuestion,
                  correctAnswer: answer,
                  status: "completed",
                };
              }),
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
export const currentQuestionSelector = (
  state: QuizState
): QuestionState | undefined => {
  console.log('state', state);
  return state.questions[state.currentQuestionIndex]
};

export const currentQuestionIndexSelector = (state: QuizState) =>
  state.currentQuestionIndex;
