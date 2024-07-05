import { AppBar, Box, Fade, LinearProgress, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../logo/Logo.tsx";
import UserMenuButton from "../buttons/UserMenuButton.tsx";
import MainMenuButton from "../buttons/MainMenuButton.tsx";
import { User } from "../../types/User.ts";
import { Dispatch, SetStateAction } from "react";
import { SidepanelConfig } from "../../types/Config.ts";

type NavBarProps = {
  user: User | null | undefined;
  setSidepanelConfig: Dispatch<SetStateAction<SidepanelConfig>>;
  loadingTickets: boolean;
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function MainNavBar({
  user,
  setSidepanelConfig,
  loadingTickets,
}: Readonly<NavBarProps>) {
  return (
    <StyledAppBar position={"sticky"}>
      <Toolbar>
        {user && <MainMenuButton setSidepanelConfig={setSidepanelConfig} />}
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        {user && <UserMenuButton user={user} />}
      </Toolbar>
      {loadingTickets && (
        <Fade in={loadingTickets}>
          <Box sx={{ position: "absolute", bottom: "-4px", width: "100%" }}>
            <LinearProgress />
          </Box>
        </Fade>
      )}
    </StyledAppBar>
  );
}
