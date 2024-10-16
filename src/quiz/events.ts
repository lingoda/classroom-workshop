import { sendMessage, subscribeToSocket } from "../webSocket";
import { getQuestionDataByIndex } from "./questionsLib";
import { saveNewQuestion } from "./store";

export const sendQuizMessage = (message: QuizEventUnion) => {
  sendMessage(JSON.stringify(message));
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

export const initStudentQuizClient = async () => {
  await subscribeStartQuestionEvent();
};

export const initTeacherQuizClient = async () => {
  await subscribeStartQuestionEvent();
};

const subscribeStartQuestionEvent = () => {
  return subscribeToSocket({
    callback: (message) => {
      if (!assertStartQuestionEvent(message)) return;
      saveNewQuestion(message.payload.question, message.payload.answers);
    },
  });
};

function assertStartQuestionEvent(event: unknown): event is StartQuestionEvent {
  return (
    event !== null &&
    typeof event === "object" &&
    (event as any).type === "start_question"
  );
}
