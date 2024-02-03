import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ToolbarHome = () => {
  return (
    <div>
      <Button component={Link} to="/">
        News
      </Button>
      <Button component={Link} to="/create">
        Создать новость
      </Button>
    </div>
  );
};

export default ToolbarHome;
