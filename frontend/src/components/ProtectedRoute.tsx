import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/User.ts";

type ProtectedRouteProps = {
  user: User | undefined | null;
  target: "main" | "login";
};

export default function ProtectedRoute({ user, target }: ProtectedRouteProps) {
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (target === "main") {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }

  if (target === "login") {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
}
