import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../types/User.ts";
import { AppBar, Skeleton, Toolbar } from "@mui/material";

type ProtectedRouteProps = {
  user: User | undefined | null;
  isTargetLoginPage: boolean;
};

export default function ProtectedRoute({
  user,
  isTargetLoginPage,
}: Readonly<ProtectedRouteProps>) {
  if (user === undefined) {
    return (
      <AppBar elevation={0} position={"sticky"}>
        <Toolbar>
          <Skeleton variant={"rectangular"} width={"100%"} height={26} />
        </Toolbar>
      </AppBar>
    );
  }

  //When user is logged in, don't show login page
  if (isTargetLoginPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
