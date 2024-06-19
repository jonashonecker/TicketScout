import { AppBar, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "./Logo.tsx";
import UserMenuButton from "./UserMenuButton.tsx";
import MainMenuButton from "./MainMenuButton.tsx";

type NavBarProps = {
  navbarContext: "login" | "main";
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function NavBar(props: NavBarProps) {
  if (props.navbarContext === "login") {
    return (
      <StyledAppBar position={"sticky"}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </StyledAppBar>
    );
  }
  if (props.navbarContext === "main") {
    return (
      <StyledAppBar position={"sticky"}>
        <Toolbar>
          <MainMenuButton />
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>
          <UserMenuButton />
        </Toolbar>
      </StyledAppBar>
    );
  }
}
