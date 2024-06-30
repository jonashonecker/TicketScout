import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CancelButton from "../buttons/CancelButton.tsx";
import { Dispatch, SetStateAction } from "react";
import DeleteButton from "../buttons/DeleteButton.tsx";
import { SidepanelStatus } from "../../types/SidepanelStatus.ts";

type ConfirmDeletionDialogueProps = {
  confirmDeletion: boolean;
  setConfirmDeletion: Dispatch<SetStateAction<boolean>>;
  sidePanelStatus: SidepanelStatus;
};

export default function ConfirmDeletionDialogue({
  confirmDeletion,
  setConfirmDeletion,
  sidePanelStatus,
}: ConfirmDeletionDialogueProps) {
  if (sidePanelStatus.formType !== "UpdateTicket") {
    return;
  }

  const deleteTicket = () => {
    console.log("Deleting ticket " + sidePanelStatus.ticket.id);
  };

  const handleClose = () => {
    setConfirmDeletion(false);
  };

  return (
    <>
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
          <DeleteButton onClick={deleteTicket} />
        </DialogActions>
      </Dialog>
    </>
  );
}
