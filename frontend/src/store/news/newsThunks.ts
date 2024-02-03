import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { AppDispatch } from "../../app/store";
import { FullNewsType, News, NewsMutation } from "../../types";

export const fetchNews = createAsyncThunk<
  News[],
  undefined,
  { dispatch: AppDispatch }
>("news/fetchAll", async () => {
  const newsResponse = await axiosApi.get<News[]>("/news");
  const news = newsResponse.data;
  return news;
});

export const fetchOneNews = createAsyncThunk<
  FullNewsType,
  string,
  { dispatch: AppDispatch }
>("news/fetchOne", async (id: string) => {
  const newsResponse = await axiosApi.get<FullNewsType>(`/news/${id}`);
  const news = newsResponse.data;
  return news;
});

export const createNews = createAsyncThunk(
  "news/create",
  async (newsData: NewsMutation) => {
    const formData = new FormData();
    formData.append("content", newsData.content);
    formData.append("title", newsData.title);
    if (newsData.image) {
      formData.append("image", newsData.image);
    }

    const response = await axiosApi.post("/news", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
);


export const deleteNews = createAsyncThunk<
  void,
  { newsId: string },
  { dispatch: AppDispatch }
>("comments/deleteComment", async ({ newsId }, thunkAPI) => {
  try {
    await axiosApi.delete(`/news/${newsId}`);
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error deleting news");
  }
});
