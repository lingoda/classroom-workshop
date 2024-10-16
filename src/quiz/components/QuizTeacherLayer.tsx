import { Box, Button, Grid2, Stack, styled } from "@mui/material";
import {
  currentQuestionIndexSelector,
  currentQuestionSelector,
  saveCorrectAnswer,
  useQuizStore,
} from "../store";
import { AnswersGrid } from "./AnswersGrid";
import { getRandomName } from "../utils";
import { QuestionTitle, QuizLayerContainer, UserHeader } from "./uiBlocks";
import { sendCorrectAnswer, startQuizQuestion } from "../sendMessage";
import { useUserPersistentName } from "../hooks";
import { ResultsGrid } from "./ResultsGrid";
import { useEffect } from "react";

export const QuizTeacherLayer = () => {
  const userName = useUserPersistentName();
  const currentQuestion = useQuizStore(currentQuestionSelector);
  const currentQuestionIndex = useQuizStore(currentQuestionIndexSelector);

  const questionParticipants = currentQuestion?.participants || [];
  const questionParticipantsAmount = currentQuestion?.participants.length ?? 0;
  const submittedParticipants = questionParticipants.filter(
    (participant) => participant.submittedAnswer !== null
  );
  const submittedParticipantsAmount = submittedParticipants.length;

  useEffect(() => {
    if (
      currentQuestion?.status === "active" &&
      questionParticipantsAmount > 0 &&
      submittedParticipantsAmount >= questionParticipantsAmount
    ) {
      if (!currentQuestion.correctAnswer) {
        throw new Error("Teacher is expected to have a correct answer");
      }
      saveCorrectAnswer(
        currentQuestion.question,
        currentQuestion.correctAnswer
      );
      sendCorrectAnswer(
        currentQuestion.question,
        currentQuestion.correctAnswer
      );
    }
  }, [
    currentQuestion,
    questionParticipantsAmount,
    submittedParticipantsAmount,
  ]);

  return (
    <QuizLayerContainer>
      <UserHeader>Teacher: {userName}</UserHeader>
      {currentQuestion && (
        <Stack spacing={2} width="100%">
          <QuestionTitle>{currentQuestion.question}</QuestionTitle>
          <ResultsGrid
            answerOptions={currentQuestion.answerOptions}
            correctAnswer={currentQuestion.correctAnswer}
            participants={currentQuestion.participants}
          />
          {currentQuestion.status === "active" && (
            <span>
              Receiving student answers... {submittedParticipantsAmount}{" "}
              submissions out of {questionParticipantsAmount}
            </span>
          )}
          {currentQuestion.status === "completed" && (
            <Button
              variant="contained"
              size="large"
              onClick={() => startQuizQuestion(currentQuestionIndex + 1)}
            >
              Next question
            </Button>
          )}
        </Stack>
      )}
      {!currentQuestion && (
        <Button
          variant="contained"
          size="large"
          onClick={() => startQuizQuestion(currentQuestionIndex + 1)}
        >
          Start quiz
        </Button>
      )}
    </QuizLayerContainer>
  );
};
