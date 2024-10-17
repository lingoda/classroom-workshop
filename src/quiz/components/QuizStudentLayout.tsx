import { QuestionTitle } from "./uiBlocks"
import { Stack } from "@mui/material"
import { UserHeader } from "./uiBlocks"
import { AnswersGrid } from "./AnswersGrid"
import { QuestionState } from "../store";
import { submitQuestionAnswer } from "../sendMessage";

interface Props {
    userName: string;
    currentQuestion: QuestionState | undefined;
}

export const QuizStudentLayout = ({ userName, currentQuestion }: Props) => {
    if (!currentQuestion) {
        return "Waiting for the quiz to start...";
    }

    return <>
        <UserHeader>Student: {userName}</UserHeader>
        <Stack spacing={2}>
            <QuestionTitle>{currentQuestion.question}</QuestionTitle>
            <AnswersGrid
                answerOptions={currentQuestion.answerOptions}
                correctAnswer={currentQuestion.correctAnswer}
                questionStatus={currentQuestion.status}
                onSubmit={answer => {
                    submitQuestionAnswer(userName, currentQuestion.question, answer)
                }}
            />
        </Stack>
    </>
}