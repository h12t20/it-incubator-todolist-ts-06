import { RootState } from "../app/store";
import { AnyAction, createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>;
  rejectValue: null;
}>();
