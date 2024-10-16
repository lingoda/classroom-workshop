import { Slide, SlideNavigation } from '../src/slide/components';

import {
  subscribeChangeSlideEvent,
  useSlideNavigation,
} from '../src/slide/hooks';

subscribeChangeSlideEvent();

export const Student = () => {
  const { currentSlideIndex } = useSlideNavigation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Slide slideIndex={currentSlideIndex} isTeacher={false} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <SlideNavigation />
      </div>
    </div>
  );
};
export default Student;
