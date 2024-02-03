import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comments } from "../../types";
import axiosApi from "../../axiosApi";
import { AppDispatch } from "../../app/store";

export const fetchComments = createAsyncThunk<
  Comments[],
  string | undefined,
  { dispatch: AppDispatch }
>("comments/fetchAll", async (news_id) => {
  const commentsResponse = await axiosApi.get<Comments[]>(
    `/comments?news_id=${news_id}`
  );
  const comments = commentsResponse.data;
  return comments;
});
