import { useEffect } from "react";
import { initStudentQuizClient, QuizStudentLayer } from "../src/quiz";

export const Student = () => {
  useQuiz();

  return (
    <>
      <QuizStudentLayer />
    </>
  );
};

const useQuiz = () => {
  useEffect(() => {
    initStudentQuizClient();
  }, []);
};

export default Student;
