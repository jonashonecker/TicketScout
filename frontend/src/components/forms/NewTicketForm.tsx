import { Button, Stack, TextField } from "@mui/material";
import StatusChip from "../chips/StatusChip.tsx";
import RichTextEditor from "../richtexteditor/RichTextEditor.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../types/User.ts";

type NewTicketFormProps = {
  user: User | null | undefined;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};

export default function NewTicketForm({
  user,
  setOpenDrawer,
}: NewTicketFormProps) {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  function cancel() {
    setOpenDrawer(false);
  }

  function save() {
    if (!title.trim()) {
      setTitleError(true);
    } else {
      console.log(title);
      console.log(description);
      setTitleError(false);
    }
  }

  return (
    <>
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
      <Stack direction="row" sx={{ mt: 2, mb: 1 }}>
        <StatusChip ticketStatus={"OPEN"} />
      </Stack>
      <RichTextEditor user={user} setDescription={setDescription} />
      <Stack direction="row" justifyContent={"end"} spacing={1} sx={{ mt: 2 }}>
        <Button
          onClick={cancel}
          variant="outlined"
          size={"small"}
          sx={{
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={save}
          variant="contained"
          size={"small"}
          sx={{ fontWeight: "bold" }}
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
