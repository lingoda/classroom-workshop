import { useEffect, useState } from 'react';
import { getRandomName } from './utils';
import { saveCorrectAnswer, useQuizStore } from './store';
import { currentQuestionIndexSelector } from './store';
import { currentQuestionSelector } from './store';
import { sendCorrectAnswer } from './sendMessage';

export const useUserPersistentName = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(getRandomName());
  }, []);

  return name;
};

export const useTeacherSideQuiz = () => {
  const userName = useUserPersistentName();
  const currentQuestion = useQuizStore(currentQuestionSelector);
  console.log('currentQuestion', currentQuestion);
  const currentQuestionIndex = useQuizStore(currentQuestionIndexSelector);
  console.log('currentQuestionIndex', currentQuestionIndex);
  const questionParticipants = currentQuestion?.participants || [];
  console.log('questionParticipants', questionParticipants);
  const questionParticipantsAmount = 1;
  console.log('questionParticipantsAmount', questionParticipantsAmount);
  const submittedParticipants = questionParticipants.filter(
    (participant) => participant.submittedAnswer !== null
  );
  const submittedParticipantsAmount = submittedParticipants.length;

  console.log('questionParticipantsAmount', questionParticipantsAmount);
  console.log('submittedParticipantsAmount', submittedParticipantsAmount);

  useEffect(() => {
    if (
      currentQuestion?.status === 'active' &&
      questionParticipantsAmount > 0 &&
      submittedParticipantsAmount >= questionParticipantsAmount
    ) {
      if (!currentQuestion.correctAnswer) {
        throw new Error('Teacher is expected to have a correct answer');
      }
      saveCorrectAnswer(
        currentQuestion.question,
        currentQuestion.correctAnswer
      );
      sendCorrectAnswer(
        currentQuestion.question,
        currentQuestion.correctAnswer
      );
    }
  }, [
    currentQuestion,
    questionParticipantsAmount,
    submittedParticipantsAmount,
  ]);

  return {
    userName,
    currentQuestion,
    currentQuestionIndex,
    questionParticipantsAmount,
    submittedParticipantsAmount,
  };
};
