import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SlideState {
  slideIndex: number;
}

const defaultState: SlideState = {
  slideIndex: 0,
};

interface SlideStore extends SlideState {
  setSlideIndex: (slideIndex: number) => void;
}

export const useSlideStore = create(
  devtools<SlideStore>(
    (set) => ({
      ...defaultState,
      setSlideIndex: (slideIndex) => {
        return set({ slideIndex });
      },
    }),
    { name: "slideStore", enabled: true }
  )
);
