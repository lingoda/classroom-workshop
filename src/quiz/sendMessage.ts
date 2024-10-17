import { sendMessage } from "../webSocket";
import { getQuestionDataByIndex, totalQuestionsAmount } from "./questionsLib";
import {
  currentQuestionIndexSelector,
  saveNewQuestion,
  setQuizCompleted,
  useQuizStore,
} from "./store";
import mockedQuestions from "./mock.json";

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
  if (questionIndex > mockedQuestions.quiz.length - 1) {
    setQuizCompleted(true);

    sendQuizMessage({
      type: "quiz_completed",
    });

    return;
  }

  const questionItem = getQuestionDataByIndex(questionIndex);

  if (!questionItem) {
    return;
  }

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
