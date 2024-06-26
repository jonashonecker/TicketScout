import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

type SidepanelProps = {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function Sidepanel({
  openDrawer,
  setOpenDrawer,
  children,
}: SidepanelProps) {
  const theme = useTheme();
  const isVeryLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function getDrawerWidth() {
    if (isVerySmallScreen) {
      return "100%";
    }
    return isVeryLargeScreen ? "50%" : "75%";
  }

  return (
    <Drawer
      anchor={isVerySmallScreen ? "bottom" : "right"}
      open={openDrawer}
      onClose={() => {
        setOpenDrawer(false);
      }}
      PaperProps={{
        sx: {
          width: getDrawerWidth(),
          height: isVerySmallScreen ? "75%" : "100%",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
