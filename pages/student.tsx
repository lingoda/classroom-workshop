import { Slide } from "../src/slide/components";

import {
  subscribeChangeSlideEvent,
  useSlideNavigation,
} from "../src/slide/hooks";

subscribeChangeSlideEvent();

export const Student = () => {
  const { currentSlideIndex } = useSlideNavigation();

  return (
    <>
      <Slide slideIndex={currentSlideIndex} isTeacher={false} />
    </>
  );
};
export default Student;
