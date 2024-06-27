import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { SidepanelStatus } from "../../types/SidepanelStatus.ts";

type TicketTitleInputProps = {
  titleError: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
  sidePanelStatus: SidepanelStatus;
};

export default function TicketTitleInput({
  titleError,
  setTitle,
  sidePanelStatus,
}: TicketTitleInputProps) {
  return (
    <TextField
      fullWidth
      label="Title"
      id="outlined-size-small"
      size="small"
      value={sidePanelStatus.ticket ? sidePanelStatus.ticket.title : ""}
      required
      error={titleError}
      helperText={titleError ? "Title is required" : "Enter ticket title"}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  );
}
