import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { selectNews, selectNewsLoading } from "../../store/news/newsSlice";
import { fetchNews } from "../../store/news/newsThunks";
import OneNews from "../../components/OneNews/OneNews";
import { Box } from "@mui/material";

const Home = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const newsLoading = useAppSelector(selectNewsLoading);

  useEffect(() => {
    void dispatch(fetchNews());
  }, [dispatch]);

  return (
    <Box sx={{ width: "50%", mx: "auto" }}>
      {news.map((newsone) => (
        <OneNews
          key={newsone.id}
          title={newsone.title}
          image={newsone.image}
          date={newsone.date}
          id={newsone.id}
        />
      ))}
    </Box>
  );
};

export default Home;
