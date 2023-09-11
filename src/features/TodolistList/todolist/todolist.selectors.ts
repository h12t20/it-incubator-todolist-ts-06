import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const tasksSelectorCreator = (id: string) =>
  createSelector(
    () => id,
    (state: RootState) => state.tasks,
    (id, tasks) => tasks[id],
  );
