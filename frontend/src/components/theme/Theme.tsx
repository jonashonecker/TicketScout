import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { blue, green, grey, red } from "@mui/material/colors";
import { ThemeStatus } from "../../types/Theme.ts";

declare module "@mui/material/styles" {
  interface Theme {
    status: ThemeStatus;
  }
  interface ThemeOptions {
    status?: ThemeStatus;
  }
}

const themeLight = createTheme({
  status: {
    open: {
      backgroundColor: green[100],
      textColor: green[700],
    },
    closed: {
      backgroundColor: grey[100],
      textColor: grey[700],
    },
    rejected: {
      backgroundColor: red[100],
      textColor: red[700],
    },
    inProgress: {
      backgroundColor: blue[100],
      textColor: blue[700],
    },
  },
  palette: {
    background: {
      default: "#fafbfb",
    },
  },
});

export default function Theme({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
