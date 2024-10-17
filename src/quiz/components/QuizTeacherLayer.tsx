import { QuizLayerContainer } from "./uiBlocks";
import { startQuizQuestion } from "../sendMessage";
import { useTeacherSideQuiz } from "../hooks";
import { QuizTeacherLayout } from "./QuizTeacherLayout";

export const QuizTeacherLayer = () => {
  const {
    userName,
    currentQuestion,
    currentQuestionIndex,
    questionParticipantsAmount,
    submittedParticipantsAmount,
    quizCompleted,
    isLastQuestion,
  } = useTeacherSideQuiz();

  if (quizCompleted) {
    return <QuizLayerContainer>Congratulations</QuizLayerContainer>;
  }

  return (
    <QuizLayerContainer>
      <QuizTeacherLayout
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        questionParticipantsAmount={1}
        submittedParticipantsAmount={submittedParticipantsAmount}
        startQuizQuestion={startQuizQuestion}
        userName={userName}
        quizCompleted={quizCompleted}
        isLastQuestion={isLastQuestion}
      />
    </QuizLayerContainer>
  );
};
