import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const todolistsSelector = createSelector(
  (state: RootState) => state,
  (state) => state.todolists,
);
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
