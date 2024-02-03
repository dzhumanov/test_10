import { Route, Routes } from "react-router-dom";
import ToolbarHome from "./components/ToolbarHome/ToolbarHome";
import Home from "./containers/Home/Home";

function App() {
  return (
    <>
      <ToolbarHome />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Home />} />

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
