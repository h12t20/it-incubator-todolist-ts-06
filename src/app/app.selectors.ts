import { RootState } from "app/store";

export const isInitializedSelector = (state: RootState) => state.app.isInitialized;
export const errorSelector = (state: RootState) => state.app.error;
export const statusSelector = (state: RootState) => state.app.status;
