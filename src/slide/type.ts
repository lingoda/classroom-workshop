import { StaticImageData } from "next/image";

type Slide<T, P = undefined> = P extends undefined
  ? {
      type: T;
      payload: P;
    }
  : {
      type: T;
      payload: P;
    };

type ImageSlide = Slide<
  "image",
  { imageUrl: StaticImageData; teacherHint?: string }
>;

type GameSlide = Slide<"game">;

// type ImageSlide = {
//   type: "image";
//   payload: { imageUrl: StaticImageData; teacherHint?: string };
// };

// type GameSlide = {
//   type: "image";
// };

export type SlideUnion = ImageSlide | GameSlide;
