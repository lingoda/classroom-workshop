import { Slide, SlideNavigation } from '../src/slide/components';
import { useSlideNavigation } from '../src/slide/hooks';

export const Teacher = () => {
  const { currentSlideIndex } = useSlideNavigation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Slide slideIndex={currentSlideIndex} isTeacher />
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <SlideNavigation />
      </div>
    </div>
  );
};

export default Teacher;
