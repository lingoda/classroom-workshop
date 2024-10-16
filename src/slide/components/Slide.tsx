import { Box } from '@mui/material';
import { slides } from '../const';
import { ImageSlide } from './ImageSlide';
import { initStudentQuizClient } from '@/quiz/subscriptions';
import { initTeacherQuizClient } from '@/quiz/subscriptions';
import { useEffect } from 'react';
import { QuizStudentLayer, QuizTeacherLayer } from '@/quiz';

type Props = {
  isTeacher: boolean;
  slideIndex: number;
};

export const Slide = ({ slideIndex, isTeacher }: Props) => {
  const slide = slides[slideIndex] || {};

  console.log('slide', { slide });

  switch (slide.type) {
    case 'image':
      return (
        <ImageSlide
          isTeacher={isTeacher}
          slideIndex={slideIndex}
          imageUrl={slide.payload.imageUrl.src}
          teacherHint={isTeacher ? slide.payload.teacherHint : undefined}
        />
      );

    case 'game':
      return <GameSlide isTeacher={isTeacher} />;

    default:
      return <EmptySlide />;
  }
};

const GameSlide = ({ isTeacher }: { isTeacher: boolean }) => {
  useEffect(() => {
    if (isTeacher) {
      initTeacherQuizClient();
    } else {
      initStudentQuizClient();
    }
  }, [isTeacher]);

  return isTeacher ? <QuizTeacherLayer /> : <QuizStudentLayer />;
};

const EmptySlide = () => {
  return <Box>Empty</Box>;
};
