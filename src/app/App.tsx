import React from "react";
import "./App.css";
import { TodolistList } from "features/TodolistList/TodolistList";
import { Header } from "features/header/Header";
import { ErrorSnackbar } from "components/errorsnachbar/ErrorSnackbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/login/Login";
import { CircularProgress } from "@mui/material";
import { useApp } from "./useApp";

export const App = () => {
  const { isInitialized } = useApp();
  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      <ErrorSnackbar />
      <div className="AppBar">
        <Header />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodolistList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
