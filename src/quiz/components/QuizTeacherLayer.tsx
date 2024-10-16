import {  QuizLayerContainer } from "./uiBlocks";
import {  startQuizQuestion } from "../sendMessage";
import { useTeacherSideQuiz } from "../hooks";
import { QuizTeacherLayout } from "./QuizTeacherLayout";

export const QuizTeacherLayer = () => {
  const { userName, currentQuestion, currentQuestionIndex, questionParticipantsAmount, submittedParticipantsAmount } = useTeacherSideQuiz();

  return (
    <QuizLayerContainer>
      <QuizTeacherLayout
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        questionParticipantsAmount={questionParticipantsAmount}
        submittedParticipantsAmount={submittedParticipantsAmount}
        startQuizQuestion={startQuizQuestion}
        userName={userName}
      />
    </QuizLayerContainer>
  );
};
