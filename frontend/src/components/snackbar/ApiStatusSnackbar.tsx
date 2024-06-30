import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { SnackbarConfig } from "../../types/Config.ts";

type ApiStatusSnackbarProps = {
  snackbarConfig: SnackbarConfig;
  setSnackbarConfig: Dispatch<SetStateAction<SnackbarConfig>>;
};

export default function ApiStatusSnackbar({
  snackbarConfig,
  setSnackbarConfig,
}: Readonly<ApiStatusSnackbarProps>) {
  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  return (
    <div>
      <Snackbar
        open={snackbarConfig.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarConfig.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarConfig.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
