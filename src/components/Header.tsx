import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            boxShadow: "none",
            backgroundColor: "#f1f2f7",
            color: "#282828",
          }}
        >
          <Toolbar sx={{ padding: 0 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              今日のTodo
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
