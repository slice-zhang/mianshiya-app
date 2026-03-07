import { Question } from "@/api/question/type";

export const difficultyMap: Record<Question["difficulty"], any> = {
  1: {
    text: "简单",
    color: "green",
  },
  2: {
    text: "中等",
    color: "orange",
  },
  3: {
    text: "困难",
    color: "red",
  },
};
