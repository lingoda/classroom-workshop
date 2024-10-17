import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { QuestionTitle, UserHeader } from "./uiBlocks";
import { ResultsGrid } from "./ResultsGrid";
import { QuestionState } from "../store";
import { useEffect } from "react";
import { TeacherProgressBar } from "./TeacherProgressBar";

interface Props {
  currentQuestion: QuestionState | undefined;
  currentQuestionIndex: number;
  questionParticipantsAmount: number;
  submittedParticipantsAmount: number;
  startQuizQuestion: (questionIndex: number) => void;
  editMode?: boolean;
  userName: string;
  quizCompleted: boolean;
  isLastQuestion: boolean;
}

export const QuizTeacherLayout = ({
  quizCompleted,
  currentQuestion,
  currentQuestionIndex,
  questionParticipantsAmount,
  submittedParticipantsAmount,
  startQuizQuestion,
  editMode,
  userName,
  isLastQuestion,
}: Props) => {
  useEffect(() => {
    if (editMode) {
      startQuizQuestion(currentQuestionIndex + 1);
    }
  }, []);

  if (quizCompleted) {
    return <Typography>Congratulations</Typography>;
  }

  return (
    <>
      <TeacherProgressBar />
      <UserHeader>Teacher: {userName}</UserHeader>
      {currentQuestion && (
        <Stack spacing={2} width="100%">
          <QuestionTitle>{currentQuestion.question}</QuestionTitle>
          <ResultsGrid
            answerOptions={currentQuestion.answerOptions}
            correctAnswer={currentQuestion.correctAnswer}
            participants={currentQuestion.participants}
          />
          {currentQuestion.status === "active" && !editMode && (
            <span>
              Receiving student answers... {submittedParticipantsAmount}{" "}
              submissions out of {questionParticipantsAmount}
            </span>
          )}
          {(currentQuestion.status === "completed" || editMode) && (
            <Button
              variant="contained"
              size="large"
              onClick={() => startQuizQuestion(currentQuestionIndex + 1)}
            >
              {isLastQuestion ? "Finish quiz" : "Next question"}
            </Button>
          )}
          {/* {} */}
          {/*  TODO: FIX GOING BACKWARDS  */}
          {/* {editMode && currentQuestionIndex > 0 && (
          <Button
            variant="contained"
            size="large"
            onClick={() => startQuizQuestion(currentQuestionIndex - 1)}
          >
            Previous question
          </Button>
        )} */}
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
    </>
  );
};
