import { sendMessage } from "../webSocket";
import { getQuestionDataByIndex, totalQuestionsAmount } from "./questionsLib";
import {
  currentQuestionIndexSelector,
  saveNewQuestion,
  useQuizStore,
} from "./store";

export const startNextQuizQuestion = () => {
  const currentQuestionIndex = currentQuestionIndexSelector(
    useQuizStore.getState()
  );
  if (currentQuestionIndex === totalQuestionsAmount - 1) {
    return; // That was the last question
  }

  startQuizQuestion(currentQuestionIndex + 1);
};

export const startQuizQuestion = (questionIndex: number) => {
  const questionItem = getQuestionDataByIndex(questionIndex);
  saveNewQuestion(
    questionItem.text,
    questionItem.answers,
    questionItem.correctAnswer
  );
  sendQuizMessage({
    type: "start_question",
    payload: {
      question: questionItem.text,
      answers: questionItem.answers,
    },
  });
};

export const joinQuizQuestion = (user: string, question: string) => {
  sendQuizMessage({
    type: "join_question",
    payload: {
      user,
      question,
    },
  });
};

export const submitQuestionAnswer = (
  user: string,
  question: string,
  answer: string
) => {
  sendQuizMessage({
    type: "answer_question",
    payload: {
      user,
      question,
      answer,
    },
  });
};

export const sendCorrectAnswer = (question: string, answer: string) => {
  sendQuizMessage({
    type: "correct_answer",
    payload: {
      question,
      answer,
    },
  });
};

const sendQuizMessage = (message: QuizEventUnion) => {
  sendMessage(JSON.stringify(message));
};
