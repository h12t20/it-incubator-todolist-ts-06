import { RootState } from "app/store";

export const tasksSelectorCreator = (id: string) => (state: RootState) => state.tasks[id];
