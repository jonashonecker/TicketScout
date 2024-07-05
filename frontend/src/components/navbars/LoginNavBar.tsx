import { AppBar, Toolbar } from "@mui/material";
import Logo from "../logo/Logo.tsx";

export default function LoginNavBar() {
  return (
    <AppBar elevation={0} position={"sticky"}>
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
}
