import LoginPage from "./components/pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage.tsx";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/utils/ProtectedRoute.tsx";
import { User } from "./types/User.ts";
import Theme from "./components/theme/Theme.tsx";
import { Ticket } from "./types/Ticket.ts";
import { getUser } from "./components/utils/ApiRequests.tsx";

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<Ticket[] | undefined>(
    undefined,
  );

  const loadUser = () => {
    getUser()
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
          <Route
            path="/"
            element={
              <MainPage
                user={user}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            }
          />
        </Route>
      </Routes>
    </Theme>
  );
}
