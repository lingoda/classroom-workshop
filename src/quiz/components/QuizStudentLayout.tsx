import { QuestionTitle } from "./uiBlocks"
import { Stack } from "@mui/material"
import { UserHeader } from "./uiBlocks"
import { AnswersGrid } from "./AnswersGrid"
import { QuestionState, selectMyAnswersResultResults, useQuizStore, saveMyAnswerResult } from "../store";
import { submitQuestionAnswer } from "../sendMessage";
import { StudentProgressBar } from "./StudentProgressBar";
import { totalQuestionsAmount } from "../questionsLib";

interface Props {
    userName: string;
    currentQuestion: QuestionState | undefined;
}

export const QuizStudentLayout = ({ userName, currentQuestion }: Props) => {
    const myAnswers = useQuizStore(selectMyAnswersResultResults)

    if (!currentQuestion) {
        return "Waiting for the quiz to start...";
    }

    return <>
        <Stack spacing={2} flexDirection="column" alignItems="center">
        <StudentProgressBar
            totalQuestionsAmount={totalQuestionsAmount}
            answers={myAnswers}
        />
        <UserHeader>Student: {userName}</UserHeader>
            <QuestionTitle>{currentQuestion.question}</QuestionTitle>
            <AnswersGrid
                answerOptions={currentQuestion.answerOptions}
                correctAnswer={currentQuestion.correctAnswer}
                questionStatus={currentQuestion.status}
                onSubmit={answer => {
                    saveMyAnswerResult(answer === currentQuestion.correctAnswer)
                    submitQuestionAnswer(userName, currentQuestion.question, answer)
                    console.log('answer', answer)
                    console.log('currentQuestion.correctAnswer', currentQuestion.correctAnswer)
                }}
            />
        </Stack>
    </>
}