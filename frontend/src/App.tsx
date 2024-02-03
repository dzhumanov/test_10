import { Route, Routes } from "react-router-dom";
import ToolbarHome from "./components/ToolbarHome/ToolbarHome";
import Home from "./containers/Home/Home";
import FullNews from "./containers/FullNews/FullNews";
import NewsForm from "./components/NewsForm/NewsForm";

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
            element={<h1 className="text-center">Not Found!</h1>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
