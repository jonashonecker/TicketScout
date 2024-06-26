import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { ApiResponseStatusSnackbar } from "../../types/Api.ts";

type ApiStatusSnackbarProps = {
  apiRequestStatusSnackbar: ApiResponseStatusSnackbar;
  setApiRequestStatusSnackbar: Dispatch<
    SetStateAction<ApiResponseStatusSnackbar>
  >;
};

export default function ApiStatusSnackbar({
  apiRequestStatusSnackbar,
  setApiRequestStatusSnackbar,
}: Readonly<ApiStatusSnackbarProps>) {
  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setApiRequestStatusSnackbar({ ...apiRequestStatusSnackbar, open: false });
  };

  return (
    <div>
      <Snackbar
        open={apiRequestStatusSnackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={apiRequestStatusSnackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {apiRequestStatusSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
