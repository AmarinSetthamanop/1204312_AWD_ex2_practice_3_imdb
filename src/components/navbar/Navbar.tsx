import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="warning"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              IMDB
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Outlet คือพื้นที่แสดงผลของ path ต่างๆ ที่อยู่ใน children ของ path หลักนั้นๆ*/}
      <Outlet />
    </>
  );
}

export default Navbar;
