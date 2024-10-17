import { Box, LinearProgress } from "@mui/material";
import { useQuizStore } from "../store";
import { totalQuestionsAmount } from "../questionsLib";

export const TeacherProgressBar = () => {
    const { currentQuestionIndex, questions } = useQuizStore();
    const progress = ((currentQuestionIndex + 1) / totalQuestionsAmount) * 100;

    return (
        <Box width={400} height={20}>
            {questions.length > 0 && <LinearProgress  variant="determinate" value={progress} />}
        </Box>
    )
}