import { RootState } from "../app/store";
import { createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: ThunkDispatch<any, any, any>;
  rejectValue: null;
}>();
