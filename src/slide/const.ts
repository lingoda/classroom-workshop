import student1 from "./assets/img_1_student.png";
import student2 from "./assets/img_2_student.png";
import student3 from "./assets/img_3_student.png";
import student4 from "./assets/img_4_student.png";
import student5 from "./assets/img_5_student.png";
// import teacher1 from "./assets/img_1_teacher.png";
// import teacher2 from "./assets/img_2_teacher.png";
// import teacher3 from "./assets/img_3_teacher.png";
// import teacher4 from "./assets/img_4_teacher.png";
// import teacher5 from "./assets/img_5_teacher.png";
import { SlideUnion } from "./type";

export const slides: SlideUnion[] = [
  {
    type: "image",
    payload: {
      imageUrl: student1,
    },
  },
  {
    type: "image",
    payload: {
      imageUrl: student2,
      teacherHint: "Hint: Ask each student to introduce himself",
    },
  },
  {
    type: "image",
    payload: {
      imageUrl: student3,
      teacherHint: "Hint: give a few examples",
    },
  },
  {
    type: "game",
    payload: undefined,
  },
  {
    type: "image",
    payload: {
      imageUrl: student4,
    },
  },
  {
    type: "image",
    payload: {
      imageUrl: student5,
    },
  },
];
