import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

type SidepanelProps = {
  sidepanelStatus: boolean;
  setSidepanelStatus: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function Sidepanel({
  sidepanelStatus,
  setSidepanelStatus,
  children,
}: Readonly<SidepanelProps>) {
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
      open={sidepanelStatus}
      onClose={() => {
        setSidepanelStatus(false);
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
