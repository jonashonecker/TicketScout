import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./components/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </React.Fragment>
  );
}
