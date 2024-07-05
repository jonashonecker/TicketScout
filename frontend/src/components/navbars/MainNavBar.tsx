import { AppBar, Box, Fade, LinearProgress, Toolbar } from "@mui/material";
import Logo from "../logo/Logo.tsx";
import UserMenuButton from "../buttons/UserMenuButton.tsx";
import MainMenuButton from "../buttons/MainMenuButton.tsx";
import { User } from "../../types/User.ts";
import { Dispatch, SetStateAction } from "react";
import { SidepanelConfig } from "../../types/Config.ts";

type NavBarProps = {
  user: User | null | undefined;
  setSidepanelConfig: Dispatch<SetStateAction<SidepanelConfig>>;
  pendingRequest: boolean;
};

export default function MainNavBar({
  user,
  setSidepanelConfig,
  pendingRequest,
}: Readonly<NavBarProps>) {
  return (
    <AppBar elevation={0} position={"sticky"}>
      <Toolbar>
        {user && <MainMenuButton setSidepanelConfig={setSidepanelConfig} />}
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        {user && <UserMenuButton user={user} />}
      </Toolbar>
      {pendingRequest && (
        <Fade in={pendingRequest}>
          <Box sx={{ position: "absolute", bottom: "-4px", width: "100%" }}>
            <LinearProgress />
          </Box>
        </Fade>
      )}
    </AppBar>
  );
}
