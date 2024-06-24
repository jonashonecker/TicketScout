import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../types/User.ts";

type ProtectedRouteProps = {
  user: User | undefined | null;
  isTargetLoginPage: boolean;
};

export default function ProtectedRoute({
  user,
  isTargetLoginPage,
}: Readonly<ProtectedRouteProps>) {
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  //When user is logged in, don't show login page
  if (isTargetLoginPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
