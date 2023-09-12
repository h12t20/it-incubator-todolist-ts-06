import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import s from "./Header.module.css";
import { useHeader } from "./useHeader";

export const Header = React.memo(() => {
  const { status, isLoggedIn, onLogOutHandler } = useHeader();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div>
          <Toolbar style={{ height: "6vh" }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todolist
            </Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={onLogOutHandler}>
                Logout
              </Button>
            )}
          </Toolbar>
        </div>
        <div className={s.toolbar}>
          <div className={s.loader}>{status === "loading" && <LinearProgress />}</div>
        </div>
      </AppBar>
    </Box>
  );
});
