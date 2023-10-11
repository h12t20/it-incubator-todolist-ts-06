import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const isInitializedSelector = (state: RootState) => state.app.isInitialized;
export const errorSelector = (state: RootState) => state.app.error;
export const statusSelector = (state: RootState) => state.app.status;
export const sortSelector = (state: RootState) => state.app.sortType;
export const themeSelector = (state: RootState) => state.app.theme;
export const todolistsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.todolists,
);
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
export const captchaURLSelector = (state: RootState) => state.auth.captchaURL;
export const tasksSelectorCreator = (id: string) =>
  createSelector(
    () => id,
    (state: RootState) => state.tasks,
    (id, tasks) => tasks[id],
  );
