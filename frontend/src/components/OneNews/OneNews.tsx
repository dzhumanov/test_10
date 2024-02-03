import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../app/Hooks";
import { deleteNews, fetchNews } from "../../store/news/newsThunks";
import { apiURL } from "../../constants";

interface Props {
  title: string;
  image: string | null;
  date: Date;
  id: string;
}

const OneNews: React.FC<Props> = ({ title, image, date, id }) => {
  const dispatch = useAppDispatch();

  const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm");
  let defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

  if (image) {
    defaultImage = apiURL + "/" + image;
  }

  const handleNewsDelete = async () => {
    await dispatch(deleteNews({ newsId: id }));
    await dispatch(fetchNews());
  };

  return (
    <Card sx={{ mb: "15px" }}>
      <CardMedia
        component="img"
        sx={{
          display: "block",
          width: "100%",
          height: "auto",
          maxHeight: "500px",
          mx: "auto",
        }}
        image={defaultImage}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textTransform: "uppercase", fontWeight: "700" }}
        >
          {title}
        </Typography>
        <Typography variant="h6" component="div">
          {formattedDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ mr: "20px" }}>
          <NavLink
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
            to={`/news/${id}`}
          >
            Read Full post
          </NavLink>
        </Button>
        <Button
          onClick={handleNewsDelete}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default OneNews;
