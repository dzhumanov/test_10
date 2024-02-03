import { createSlice } from "@reduxjs/toolkit";
import { FullNewsType, News } from "../../types";
import { fetchNews, fetchOneNews } from "./newsThunks";
import { RootState } from "../../app/store";

interface newsState {
  news: News[];
  newsLoading: boolean;
  fullNews: FullNewsType | null;
  oneNewsLoading: boolean;
}

const initialState: newsState = {
  news: [],
  newsLoading: false,
  fullNews: null,
  oneNewsLoading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.newsLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, { payload: items }) => {
      state.newsLoading = false;
      state.news = items;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.newsLoading = false;
    });
    builder.addCase(fetchOneNews.pending, (state) => {
      state.oneNewsLoading = true;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, { payload: items }) => {
      state.oneNewsLoading = false;
      state.fullNews = items;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.oneNewsLoading = false;
    });
  },
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.fullNews;
export const selectNewsLoading = (state: RootState) => state.news.newsLoading;
export const selectOneNewsLoading = (state: RootState) =>
  state.news.oneNewsLoading;
