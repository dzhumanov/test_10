import { Route, Routes } from "react-router-dom";
import ToolbarHome from "./components/ToolbarHome/ToolbarHome";
import Home from "./containers/Home/Home";
import FullNews from "./containers/FullNews/FullNews";
import NewsForm from "./components/NewsForm/NewsForm";
import { Typography } from "@mui/material";

function App() {
  return (
    <>
      <ToolbarHome />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<FullNews />} />
          <Route path="/create" element={<NewsForm />} />

          <Route
            path="*"
            element={<Typography variant="h1">Not found! 404</Typography>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
