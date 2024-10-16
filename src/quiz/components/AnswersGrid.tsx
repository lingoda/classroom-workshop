import { Box, Button, Grid2, styled } from "@mui/material";
import { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { QuestionStatus } from "../store";

interface Props {
  answerOptions: string[];
  correctAnswer: string | null;
  questionStatus: QuestionStatus;
  onSubmit: (answer: string) => void;
}

export const AnswersGrid = ({
  answerOptions,
  correctAnswer,
  questionStatus,
  onSubmit,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <>
      <Grid2 container spacing={2}>
        {answerOptions.map((answerOption, index) => (
          <Grid2 key={index} size={{ xs: 12, md: 6 }}>
            <AnswerOptionButton
              fullWidth
              variant="outlined"
              color={
                questionStatus === "completed"
                  ? correctAnswer === answerOption
                    ? "success"
                    : "error"
                  : undefined
              }
              onClick={() => setSelectedAnswer(answerOption)}
              startIcon={
                selectedAnswer === answerOption ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )
              }
              sx={{
                pointerEvents: questionStatus === "completed" ? "none" : "auto",
              }}
            >
              {answerOption}
            </AnswerOptionButton>
          </Grid2>
        ))}
      </Grid2>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedAnswer || questionStatus === "completed"}
        onClick={() => selectedAnswer && onSubmit(selectedAnswer)}
      >
        Submit
      </Button>
    </>
  );
};

const AnswerOptionButton = styled(Button)`
  width: 100%;
  padding: 10px;
`;
