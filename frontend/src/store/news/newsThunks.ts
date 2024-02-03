import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { AppDispatch } from "../../app/store";
import { FullNewsType, News } from "../../types";

export const fetchNews = createAsyncThunk<
  News[],
  undefined,
  { dispatch: AppDispatch }
>("news/fetchAll", async () => {
    const newsResponse = await axiosApi.get<News[]>('/news');
    const news = newsResponse.data;
    return news;
});

export const fetchOneNews = createAsyncThunk<FullNewsType, string, {dispatch: AppDispatch}>("news/fetchOne", async(id:string) => {
    const newsResponse = await axiosApi.get<FullNewsType>(`/news/${id}`);
    const news = newsResponse.data;
    return news;
})