type StartQuestionEvent = {
  type: "start_question";
  payload: {
    question: string;
    answers: string[];
  };
};

type JoinQuestionEvent = {
  type: "join_question";
  payload: {
    question: string;
    user: string;
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

type ChangeSlideEvent = {
  type: "change_slide";
  payload: {
    slideIndex: number;
  };
};

type QuizEventUnion =
  | StartQuestionEvent
  | JoinQuestionEvent
  | AnswerQuestionEvent
  | CorrectAnswerEvent
  | ChangeSlideEvent;
