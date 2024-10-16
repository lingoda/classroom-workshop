import { ImageSlide } from '../src/ImageSlide';

export const Teacher = () => {
  return (
    <>
      <ImageSlide
        isTeacher
        slideIndex={1}
        imageUrl="/presentation/student/img_2.png"
        teacherHint="This is the first slide"
      />
    </>
  );
};

export default Teacher;
