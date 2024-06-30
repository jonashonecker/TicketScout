import { AppBar, Box, Toolbar } from "@mui/material";
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
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function MainNavBar({
  user,
  setSidepanelConfig,
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
    </StyledAppBar>
  );
}
