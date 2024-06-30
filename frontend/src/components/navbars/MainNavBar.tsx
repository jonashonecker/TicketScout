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
  setSidepanelStatus: Dispatch<SetStateAction<SidepanelConfig>>;
};

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

export default function MainNavBar({
  user,
  setSidepanelStatus,
}: Readonly<NavBarProps>) {
  return (
    <StyledAppBar position={"sticky"}>
      <Toolbar>
        {user && <MainMenuButton setSidepanelStatus={setSidepanelStatus} />}
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        {user && <UserMenuButton user={user} />}
      </Toolbar>
    </StyledAppBar>
  );
}
