import React from "react";
import s from "app/App.module.scss";
import { TodolistList } from "features/TodolistList/TodolistList";
import { Header } from "features/header/Header";
import { ErrorSnackbar } from "common/components/errorsnachbar/ErrorSnackbar";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/login/Login";
import { CircularProgress } from "@mui/material";
import { useApp } from "./useApp";
import { Sidebar } from "../features/Sidebar/Sidebar";

export const App = () => {
  document.title = "Todolist";
  const { isInitialized, theme, open, mouseMoveHandler, handleOpenSwitch } = useApp();
  if (!isInitialized) {
    return (
      <div className={s.CircularProgress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div
      className={s.App}
      style={theme === "Dark" ? { backgroundColor: "rgb(36, 53, 66)", color: "white" } : {}}
      onMouseMove={mouseMoveHandler}
    >
      <Sidebar open={open} theme={theme} handleClose={handleOpenSwitch} />
      <ErrorSnackbar />
      <div className={s.AppBar}>
        <Header theme={theme} handleOpen={handleOpenSwitch} />
      </div>
      <div className={s.Body}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<TodolistList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};
