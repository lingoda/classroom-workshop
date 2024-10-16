import { slides } from "..";
import { useSlideStore } from "../slideStore";

let currentSlideIndexStored = 0;

export const useSlideNavigation = () => {
  const currentSlideIndex = useSlideStore((state) => state.slideIndex);
  const setCurrentSlideIndex = useSlideStore((state) => state.setSlideIndex);

  const min = 0;
  const max = slides.length - 1;

  const applyWithConstraints = (newIndex: number) => {
    const newIndexConstrained = Math.max(min, Math.min(max, newIndex));
    currentSlideIndexStored = newIndexConstrained;

    setCurrentSlideIndex(newIndexConstrained);
  };

  const goForward = () => {
    applyWithConstraints(currentSlideIndex + 1);
  };

  const goBackward = () => {
    applyWithConstraints(currentSlideIndex - 1);
  };

  return {
    currentSlideIndex,
    goForward,
    goBackward,
    forwardEnabled: currentSlideIndex < max,
    backwardEnabled: currentSlideIndex > min,
  };
};
