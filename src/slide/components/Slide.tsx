import { Box } from '@mui/material';
import { slides } from '../const';
import { ImageSlide } from './ImageSlide';

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
          teacherHint={slide.payload.teacherHint}
        />
      );

    case 'game':
      return <GameSlide />;

    default:
      return <EmptySlide />;
  }
};

const GameSlide = () => {
  return <Box>Game</Box>;
};

const EmptySlide = () => {
  return <Box>Empty</Box>;
};
