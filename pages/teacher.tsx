import { useEffect } from "react";
import {
  initTeacherQuizClient,
  QuizTeacherLayer,
  startQuizQuestion,
} from "../src/quiz";

export const Teacher = () => {
  useQuiz();

  return (
    <>
      <QuizTeacherLayer />
    </>
  );
};

const useQuiz = () => {
  useEffect(() => {
    initTeacherQuizClient();
  }, []);
};

export default Teacher;
