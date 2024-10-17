import { useState } from "react";
import { currentQuestionSelector, QuizTeacherLayer, startQuizQuestion, submitQuestionAnswer, useTeacherSideQuiz } from "@/quiz";
import { QuizTeacherLayout } from "@/quiz/components/QuizTeacherLayout";
import { Box, Button, Switch, FormControlLabel, Typography, Divider } from "@mui/material";
import { QuizStudentLayout } from "@/quiz/components/QuizStudentLayout";

export const QuizContent = () => {
    const [mode, setMode] = useState<'teacher' | 'student'>('teacher');
    const { currentQuestion, currentQuestionIndex, questionParticipantsAmount, submittedParticipantsAmount } = useTeacherSideQuiz();

    return (
        <Box sx={{ width: "100%", height: "100%", position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => setMode(mode === 'teacher' ? 'student' : 'teacher')}
                    sx={{ ml: 2 }}
                >
                    Switch to {mode === 'teacher' ? 'Student' : 'Teacher'} View
                </Button>

            </Box>
            <Box>
                {mode === 'teacher' ? (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Teacher View</Typography>
                        <QuizTeacherLayout
                            currentQuestion={currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            questionParticipantsAmount={questionParticipantsAmount}
                            submittedParticipantsAmount={submittedParticipantsAmount}
                            startQuizQuestion={startQuizQuestion}
                            editMode={true}
                            userName="Editor"
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Student View</Typography>
                        <QuizStudentLayout
                            currentQuestion={currentQuestion}
                            userName="Editor"
                        />
                    </>
                )}
            </Box>

        </Box>
    );
};
