type StartQuestionEvent = {
  type: "start_question";
  payload: {
    question: string;
    answers: string[];
  };
};

type AnswerQuestionEvent = {
  type: "answer_question";
  payload: {
    user: string;
    question: string;
    answer: string;
  };
};

type CorrectAnswerEvent = {
  type: "correct_answer";
  payload: {
    question: string;
    answer: string;
  };
};

type QuizEventUnion =
  | StartQuestionEvent
  | AnswerQuestionEvent
  | CorrectAnswerEvent;
