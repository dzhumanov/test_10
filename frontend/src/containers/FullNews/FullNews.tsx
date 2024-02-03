import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { FullNewsType } from "../../types";
import { fetchOneNews } from "../../store/news/newsThunks";
import { useParams } from "react-router-dom";
import { selectOneNews } from "../../store/news/newsSlice";
import dayjs from "dayjs";

const FullNews = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id?: string }>();
    const fullNews = useAppSelector(selectOneNews);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneNews(id));
        }
    }, [dispatch, id])

    const formattedDate = dayjs(fullNews?.date).format('YYYY-MM-DD');

    return(
        <div>
            <h1>{fullNews?.title}</h1>
            <p>{fullNews?.content}</p>
            <p>{formattedDate}</p>
            {fullNews && fullNews.image && <img src={fullNews.image} alt="" />}
        </div>
    )
}

export default FullNews;