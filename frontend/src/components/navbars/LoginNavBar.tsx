import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../logo/Logo.tsx";

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function LoginNavBar() {
  return (
    <StyledAppBar position={"sticky"}>
      <Toolbar>
        <Logo />
      </Toolbar>
    </StyledAppBar>
  );
}
