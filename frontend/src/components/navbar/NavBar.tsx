import { AppBar, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../logos/Logo.tsx";
import UserMenuButton from "../buttons/UserMenuButton.tsx";
import MainMenuButton from "../buttons/MainMenuButton.tsx";
import { User } from "../../types/User.ts";

type NavBarProps = {
  user?: User | null;
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function NavBar({ user }: Readonly<NavBarProps>) {
  return (
    <StyledAppBar position={"sticky"}>
      <Toolbar>
        {user && <MainMenuButton />}
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        {user && <UserMenuButton user={user} />}
      </Toolbar>
    </StyledAppBar>
  );
}
