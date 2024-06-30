import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Config } from "../../types/Config.ts";

type ApiStatusSnackbarProps = {
  snackbarStatus: Config;
  setSnackbarStatus: Dispatch<SetStateAction<Config>>;
};

export default function ApiStatusSnackbar({
  snackbarStatus,
  setSnackbarStatus,
}: Readonly<ApiStatusSnackbarProps>) {
  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarStatus({ ...snackbarStatus, open: false });
  };

  return (
    <div>
      <Snackbar
        open={snackbarStatus.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarStatus.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
