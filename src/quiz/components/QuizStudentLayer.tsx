import { Box, Button, Grid2, Stack, styled } from "@mui/material";
import { currentQuestionSelector, useQuizStore } from "../store";
import { AnswersGrid } from "./AnswersGrid";
import { getRandomName } from "../utils";
import { QuestionTitle, QuizLayerContainer, UserHeader } from "./uiBlocks";
import { useUserPersistentName } from "../hooks";
import { submitQuestionAnswer } from "../sendMessage";

export const QuizStudentLayer = () => {
  const userName = useUserPersistentName();
  const currentQuestion = useQuizStore(currentQuestionSelector);

  if (!currentQuestion) {
    return null;
  }

  return (
    <QuizLayerContainer>
      <UserHeader>Student: {userName}</UserHeader>
      <Stack spacing={2}>
        <QuestionTitle>{currentQuestion.question}</QuestionTitle>
        <AnswersGrid
          answerOptions={currentQuestion.answerOptions}
          correctAnswer={currentQuestion.correctAnswer}
          questionStatus={currentQuestion.status}
          onSubmit={(answer) =>
            submitQuestionAnswer(userName, currentQuestion.question, answer)
          }
        />
      </Stack>
    </QuizLayerContainer>
  );
};
