import { RootState } from "app/store";

export const todolistsSelector = (state: RootState) => state.todolists;
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
