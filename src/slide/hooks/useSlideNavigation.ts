import { sendMessage, subscribeToSocket } from "@/webSocket";
import { slides } from "..";
import { setSlideIndex, useSlideStore } from "../slideStore";

export const useSlideNavigation = () => {
  const currentSlideIndex = useSlideStore((state) => state.slideIndex);
  const min = 0;
  const max = slides.length - 1;

  const applyConstraints = (newIndex: number) => {
    const newIndexConstrained = Math.max(min, Math.min(max, newIndex));

    if (currentSlideIndex != newIndexConstrained) {
      const event: ChangeSlideEvent = {
        type: "change_slide",
        payload: {
          slideIndex: newIndexConstrained,
        },
      };

      setSlideIndex(newIndexConstrained);
      sendMessage(JSON.stringify(event));
    }
  };

  const goForward = () => {
    applyConstraints(currentSlideIndex + 1);
  };

  const goBackward = () => {
    applyConstraints(currentSlideIndex - 1);
  };

  return {
    currentSlideIndex,
    goForward,
    goBackward,
    forwardEnabled: currentSlideIndex < max,
    backwardEnabled: currentSlideIndex > min,
  };
};

export const subscribeChangeSlideEvent = () => {
  return subscribeToSocket({
    callback: (message) => {
      if (!assertChangeSlideEvent(message)) return;
      setSlideIndex(message.payload.slideIndex);
    },
  });
};

const assertChangeSlideEvent = (event: unknown): event is ChangeSlideEvent => {
  return (
    event !== null &&
    typeof event === "object" &&
    (event as any).type === "change_slide"
  );
};
