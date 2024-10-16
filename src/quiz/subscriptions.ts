import { subscribeToSocket } from "../webSocket";
import { joinQuizQuestion } from "./sendMessage";
import {
  joinQuestionParticipant,
  saveCorrectAnswer,
  saveNewQuestion,
  saveSubmittedAnswer,
} from "./store";
import { getRandomName } from "./utils";

export const initStudentQuizClient = async () => {
  await subscribeStartQuestionEvent();
  await subscribeCorrectAnswerEvent();
};

export const initTeacherQuizClient = async () => {
  await subscribeJoinQuestionEvent();
  await subscribeAnswerQuestionEvent();
};

function subscribeStartQuestionEvent() {
  return subscribeToSocket({
    callback: (message) => {
      if (!assertStartQuestionEvent(message)) return;
      saveNewQuestion(message.payload.question, message.payload.answers);
      const userName = getRandomName();
      joinQuizQuestion(userName, message.payload.question);
    },
  });
}
function assertStartQuestionEvent(event: unknown): event is StartQuestionEvent {
  return (
    event !== null &&
    typeof event === "object" &&
    (event as any).type === "start_question"
  );
}

function subscribeJoinQuestionEvent() {
  return subscribeToSocket({
    callback: (message) => {
      if (!assertJoinQuestionEvent(message)) return;
      joinQuestionParticipant(message.payload.question, message.payload.user);
    },
  });
}
function assertJoinQuestionEvent(event: unknown): event is JoinQuestionEvent {
  return (
    event !== null &&
    typeof event === "object" &&
    (event as any).type === "join_question"
  );
}

function subscribeAnswerQuestionEvent() {
  return subscribeToSocket({
    callback: (message) => {
      if (!assertAnswerQuestionEvent(message)) return;
      saveSubmittedAnswer(
        message.payload.question,
        message.payload.user,
        message.payload.answer
      );
    },
  });
}
function assertAnswerQuestionEvent(
  event: unknown
): event is AnswerQuestionEvent {
  return (
    event !== null &&
    typeof event === "object" &&
    (event as any).type === "answer_question"
  );
}

function subscribeCorrectAnswerEvent() {
  return subscribeToSocket({
    callback: (message) => {
      if (!assertCorrectAnswerEvent(message)) return;
      saveCorrectAnswer(message.payload.question, message.payload.answer);
    },
  });
}
function assertCorrectAnswerEvent(event: unknown): event is CorrectAnswerEvent {
  return (
    event !== null &&
    typeof event === "object" &&
    (event as any).type === "correct_answer"
  );
}
