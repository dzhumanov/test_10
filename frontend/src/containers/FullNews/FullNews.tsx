import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { fetchOneNews } from "../../store/news/newsThunks";
import { useParams } from "react-router-dom";
import { selectOneNews } from "../../store/news/newsSlice";
import dayjs from "dayjs";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

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
    let defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

    return(

        <Card sx={{mb: '15px', width: '50%', mx:'auto'}}>
            <CardMedia
              component="img"
              sx={{
                display: "block",
                width: "100%",
                height: "auto",
                maxWidth: "650px",
                mx: "auto",
              }}
              image={defaultImage}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {fullNews?.title}
                </Typography>
                <Typography variant="h6" component="div">
                    {formattedDate}
                </Typography>
                <Typography variant="h5" component="div">
                    {fullNews?.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default FullNews;