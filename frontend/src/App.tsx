import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./components/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export default function App() {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  const loadUser = () => {
    axios
      .get("/api/auth/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        <Route element={<ProtectedRoute user={user} target={"main"} />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<ProtectedRoute user={user} target={"login"} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}
