import { useEffect } from "react";
import { initTeacherQuizClient, startQuizQuestion } from "../src/quiz";

export const Teacher = () => {
  useQuiz();

  return <div>Teacher</div>;
};

const useQuiz = () => {
  useEffect(() => {
    const onMount = async () => {
      await initTeacherQuizClient();
      await wait(500);
      startQuizQuestion(0);
    };

    onMount();
  }, []);
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default Teacher;
