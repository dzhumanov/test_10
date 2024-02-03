import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ToolbarHome = () => {
  return (
    <Box sx={{ width: '50%', mx:"auto", display:"flex", justifyContent:"space-between"}}>
      <Button component={Link} to="/">
        News
      </Button>
      <Button component={Link} to="/create">
        Создать новость
      </Button>
    </Box>
  );
};

export default ToolbarHome;
