import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./components/pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./components/utils/ProtectedRoute.tsx";
import { User } from "./types/User.ts";

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

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
          <Route path="/" element={<MainPage user={user} />} />
        </Route>
        <Route element={<ProtectedRoute user={user} target={"login"} />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}
