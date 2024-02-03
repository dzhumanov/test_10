import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { fetchOneNews } from "../../store/news/newsThunks";
import { useParams } from "react-router-dom";
import { selectOneNews } from "../../store/news/newsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { selectComments } from "../../store/comments/commentsSlice";
import {
  deleteComment,
  fetchComments,
} from "../../store/comments/commentsThunks";
import OneComment from "../../components/OneComment/OneComment";

const FullNews = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const fullNews = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNews(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
    console.log(comments);
  }, [dispatch, id]);

  const formattedDate = dayjs(fullNews?.date).format("YYYY-MM-DD");
  let defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

  const handleCommentDelete = async (commentId: string) => {
    await dispatch(deleteComment({ commentId: commentId }));
    await dispatch(fetchComments(id));
  };

  let commentsBox = (
    <Typography variant="h3" sx={{ textAlign: "center" }}>
      No comments available
    </Typography>
  );

  if (comments.length > 0) {
    commentsBox = (
      <Box sx={{ width: "50%", mx: "auto" }}>
        {comments.map((comment) => (
          <OneComment
            key={comment.id}
            author={comment.author}
            content={comment.content}
            onDelete={() => handleCommentDelete(comment.id)}
          />
        ))}
      </Box>
    );
  }

  return (
    <>
      <Card sx={{ mb: "15px", width: "50%", mx: "auto" }}>
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
      {commentsBox}
    </>
  );
};

export default FullNews;
