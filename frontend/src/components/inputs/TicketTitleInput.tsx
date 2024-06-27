import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type TicketTitleInputProps = {
  titleError: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
};

export default function TicketTitleInput({
  titleError,
  setTitle,
}: TicketTitleInputProps) {
  return (
    <TextField
      fullWidth
      label="Title"
      id="outlined-size-small"
      size="small"
      required
      error={titleError}
      helperText={titleError ? "Title is required" : "Enter ticket title"}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  );
}
