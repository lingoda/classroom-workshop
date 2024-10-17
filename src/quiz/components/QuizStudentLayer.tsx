import { currentQuestionSelector, useQuizStore } from "../store";
import { QuizLayerContainer } from "./uiBlocks";
import { useUserPersistentName } from "../hooks";
import { submitQuestionAnswer } from "../sendMessage";
import { QuizStudentLayout } from "./QuizStudentLayout";
import { Typography } from "@mui/material";
import Quiz from "@mui/icons-material/Quiz";

export const QuizStudentLayer = () => {
  const userName = useUserPersistentName();
  const currentQuestion = useQuizStore(currentQuestionSelector);
  const quizCompleted = useQuizStore((state) => state.quizCompleted);

  if (quizCompleted) {
    return <QuizLayerContainer>
      <Typography>Congratulations</Typography>
    </QuizLayerContainer>;
  }

  if (!currentQuestion) {
    return (
      <QuizLayerContainer>
        <Typography>Waiting for the teacher to start the quiz...</Typography>
      </QuizLayerContainer>
    );
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
