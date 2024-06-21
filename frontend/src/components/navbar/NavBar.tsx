import { AppBar, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../logos/Logo.tsx";
import UserMenuButton from "../buttons/UserMenuButton.tsx";
import MainMenuButton from "../buttons/MainMenuButton.tsx";
import { User } from "../../types/User.ts";

type NavBarProps = {
  navbarContext: "login" | "main";
  user?: User | null | undefined;
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function NavBar({ navbarContext, user }: Readonly<NavBarProps>) {
  if (navbarContext === "login") {
    return (
      <StyledAppBar position={"sticky"}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </StyledAppBar>
    );
  }
  if (navbarContext === "main") {
    return (
      <StyledAppBar position={"sticky"}>
        <Toolbar>
          <MainMenuButton />
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>
          <UserMenuButton user={user} />
        </Toolbar>
      </StyledAppBar>
    );
  }
}