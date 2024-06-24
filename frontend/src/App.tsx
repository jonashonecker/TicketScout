import LoginPage from "./components/pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./components/utils/ProtectedRoute.tsx";
import { User } from "./types/User.ts";
import Theme from "./components/theme/Theme.tsx";
import NewTicketPage from "./components/pages/NewTicketPage.tsx";

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
    <Theme>
      <Routes>
        <Route
          element={<ProtectedRoute user={user} isTargetLoginPage={true} />}
        >
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          element={<ProtectedRoute user={user} isTargetLoginPage={false} />}
        >
          <Route path="/" element={<MainPage user={user} />} />
        </Route>
        <Route
          element={<ProtectedRoute user={user} isTargetLoginPage={false} />}
        >
          <Route path="/newticket" element={<NewTicketPage />} />
        </Route>
      </Routes>
    </Theme>
  );
}
