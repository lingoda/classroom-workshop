import { useEffect } from "react";
import { initStudentQuizClient } from "../src/quiz";

export const Student = () => {
  useQuiz();

  return <div>Student</div>;
};

const useQuiz = () => {
  useEffect(() => {
    initStudentQuizClient();
  }, []);
};

export default Student;
