import { atom } from "recoil";

export const exerciseState = atom({
  key: "exercises",
  default: [],
});

export const exerciseImageState = atom({
  key: "exerciseImages",
  default: [],
});

export const workoutState = atom({
  key: "workout",
  default: [],
});
