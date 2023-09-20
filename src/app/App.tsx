import React from "react";
import s from "app/App.module.scss";
import { TodolistList } from "features/TodolistList/TodolistList";
import { Header } from "features/header/Header";
import { ErrorSnackbar } from "common/components/errorsnachbar/ErrorSnackbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/login/Login";
import { CircularProgress } from "@mui/material";
import { useApp } from "./useApp";

export const App = () => {
  const { isInitialized } = useApp();
  if (!isInitialized) {
    return (
      <div className={s.CircularProgress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={s.App}>
      <ErrorSnackbar />
      <div className={s.AppBar}>
        <Header />
      </div>
      <div className={s.Body}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodolistList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};
