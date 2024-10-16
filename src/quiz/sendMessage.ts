import { sendMessage } from "../webSocket";
import { getQuestionDataByIndex } from "./questionsLib";
import { saveNewQuestion } from "./store";

let currentQuestionIndex = 0;

export const startNextQuizQuestion = () => {
  startQuizQuestion(currentQuestionIndex);
  currentQuestionIndex++;
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

const sendQuizMessage = (message: QuizEventUnion) => {
  sendMessage(JSON.stringify(message));
};
