import mockedQuestions from "./mock.json";

type QuestionItem = {
  text: string;
  answers: string[];
  correctAnswer: string;
};

export const totalQuestionsAmount = mockedQuestions.quiz.length;

export const getQuestionDataByIndex = (index: number): QuestionItem => {
  const matchedQuestion = mockedQuestions.quiz[index];

  if (!matchedQuestion) {
    throw new Error(`Question with index ${index} not found`);
  }

  const correctAnswerItem = Object.entries(matchedQuestion.answers).find(
    ([answer, isCorrect]) => isCorrect === true
  );
  if (!correctAnswerItem) {
    throw new Error(
      `Correct answer for question "${matchedQuestion.question}" not found`
    );
  }
  const correctAnswer = correctAnswerItem[0];

  return {
    text: matchedQuestion.question,
    answers: Object.keys(matchedQuestion.answers),
    correctAnswer,
  };
};
