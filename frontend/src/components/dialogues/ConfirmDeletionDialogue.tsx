import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CancelButton from "../buttons/CancelButton.tsx";
import { Dispatch, SetStateAction } from "react";
import { SnackbarConfig, SidepanelConfig } from "../../types/Config.ts";
import { deleteTicket } from "../utils/ApiRequests.tsx";
import { Ticket } from "../../types/Ticket.ts";
import ConfirmDeleteButton from "../buttons/ConfirmDeleteButton.tsx";

type ConfirmDeletionDialogueProps = {
  confirmDeletion: boolean;
  setConfirmDeletion: Dispatch<SetStateAction<boolean>>;
  sidePanelConfig: SidepanelConfig;
  setSidepanelConfig: Dispatch<SetStateAction<SidepanelConfig>>;
  searchResults: Ticket[] | undefined;
  setSearchResults: Dispatch<SetStateAction<Ticket[] | undefined>>;
  setSnackbarConfig: Dispatch<SetStateAction<SnackbarConfig>>;
  pendingRequest: boolean;
  setPendingRequest: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmDeletionDialogue({
  confirmDeletion,
  setConfirmDeletion,
  sidePanelConfig,
  setSidepanelConfig,
  searchResults,
  setSearchResults,
  setSnackbarConfig,
  pendingRequest,
  setPendingRequest,
}: Readonly<ConfirmDeletionDialogueProps>) {
  if (sidePanelConfig.formType !== "UpdateTicket") {
    return;
  }

  const handleDelete = () => {
    setPendingRequest(true);
    deleteTicket(sidePanelConfig.ticket.id)
      .then(() => {
        setPendingRequest(false);
        setSearchResults(
          searchResults?.filter((ticket) => {
            return ticket.id !== sidePanelConfig.ticket.id;
          }),
        );
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "Ticket successfully deleted!",
        });
        setConfirmDeletion(false);
        setSidepanelConfig({ ...sidePanelConfig, open: false });
      })
      .catch((error) => {
        setPendingRequest(false);
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: error.response.data.error,
        });
      });
  };

  const handleClose = () => {
    setConfirmDeletion(false);
  };

  return (
    <Dialog
      open={confirmDeletion}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to delete this ticket?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose} />
        <ConfirmDeleteButton
          onClick={handleDelete}
          pendingRequest={pendingRequest}
        />
      </DialogActions>
    </Dialog>
  );
}
