import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { SidepanelConfig } from "../../types/Config.ts";

type SidepanelProps = {
  sidepanelConfig: SidepanelConfig;
  setSidepanelConfig: Dispatch<SetStateAction<SidepanelConfig>>;
  children: ReactNode;
};

export default function Sidepanel({
  sidepanelConfig,
  setSidepanelConfig,
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
      open={sidepanelConfig.open}
      onClose={() => {
        setSidepanelConfig({ ...sidepanelConfig, open: false });
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
