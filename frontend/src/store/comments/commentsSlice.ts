import { createSlice } from "@reduxjs/toolkit";
import { Comments } from "../../types";
import { fetchComments } from "./commentsThunks";
import { RootState } from "../../app/store";

interface commentsState {
  comments: Comments[];
  commentsLoading: boolean;
}

const initialState: commentsState = {
  comments: [],
  commentsLoading: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload: items }) => {
      state.commentsLoading = false;
      state.comments = items;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.commentsLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.commentsLoading;