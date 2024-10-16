import { Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "@emotion/styled";
import { QuizParticipant } from "../store";

interface Props {
  answerOptions: string[];
  correctAnswer: string | null;
  participants: QuizParticipant[];
}

export const ResultsGrid = ({
  answerOptions,
  correctAnswer,
  participants,
}: Props) => {
  return (
    <ResultsStack spacing={1}>
      {answerOptions.map((answerOption, index) => {
        const isCorrect = correctAnswer === answerOption;

        return (
          <ResultOptions key={index}>
            {isCorrect ? <CheckCircleIcon /> : <CancelIcon />}{" "}
            <span>{answerOption}:</span>
            <span>
              {getAnswerOptionsParticipants(answerOption, participants)}
            </span>
          </ResultOptions>
        );
      })}
    </ResultsStack>
  );
};

const ResultsStack = styled(Stack)`
  width: 100%;
`;

const ResultOptions = styled(Box)`
  padding: 16px;
  border: 1px solid #153bff;
  border-radius: 4px;
  color: #153bff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

function getAnswerOptionsParticipants(
  answerOption: string,
  participants: QuizParticipant[]
) {
  return participants
    .filter((participant) => participant.submittedAnswer === answerOption)
    .map((participant) => participant.user)
    .join(", ");
}
