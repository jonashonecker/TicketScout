import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SidepanelStatus } from "../../types/SidepanelStatus.ts";

type TicketTitleInputProps = {
  titleError: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
  sidePanelStatus: SidepanelStatus;
};

export default function TicketTitleInput({
  titleError,
  setTitle,
  title,
  sidePanelStatus,
}: TicketTitleInputProps) {
  useEffect(() => {
    setTitle(sidePanelStatus.ticket ? sidePanelStatus.ticket.title : "");
  }, [sidePanelStatus.ticket, setTitle]);
  return (
    <TextField
      fullWidth
      label="Title"
      id="outlined-size-small"
      size="small"
      required
      value={title}
      error={titleError}
      helperText={titleError ? "Title is required" : "Enter ticket title"}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  );
}
