import { currentQuestionSelector, useQuizStore } from "../store";
import { QuizLayerContainer } from "./uiBlocks";
import { useUserPersistentName } from "../hooks";
import { submitQuestionAnswer } from "../sendMessage";
import { QuizStudentLayout } from "./QuizStudentLayout";

export const QuizStudentLayer = () => {
  const userName = useUserPersistentName();
  const currentQuestion = useQuizStore(currentQuestionSelector);

  if (!currentQuestion) {
    return null;
  }

  return (
    <QuizLayerContainer>
      <QuizStudentLayout 
        userName={userName}
        currentQuestion={currentQuestion}
      />
    </QuizLayerContainer>
  );
};
