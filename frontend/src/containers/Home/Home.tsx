import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { selectNews, selectNewsLoading } from "../../store/news/newsSlice";
import { fetchNews } from "../../store/news/newsThunks";
import OneNews from "../../components/OneNews/OneNews";
import { Box, Typography, CircularProgress } from "@mui/material";

const Home = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const newsLoading = useAppSelector(selectNewsLoading);

  useEffect(() => {
    void dispatch(fetchNews());
  }, [dispatch]);

  return (
    <Box sx={{ width: "50%", mx: "auto", mt: "20px" }}>
      {newsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : news.length > 0 ? (
        news
          .slice(0)
          .reverse()
          .map((newsone) => (
            <OneNews
              key={newsone.id}
              title={newsone.title}
              image={newsone.image}
              date={newsone.date}
              id={newsone.id}
            />
          ))
      ) : (
        <Typography variant="h4" align="center">
          No available news
        </Typography>
      )}
    </Box>
  );
};

export default Home;
