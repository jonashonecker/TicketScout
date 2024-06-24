import NavBar from "../navbar/NavBar.tsx";
import { User } from "../../types/User.ts";
import { Button, Container, Stack, TextField } from "@mui/material";
import StatusChip from "../chips/StatusChip.tsx";
import RichTextEditor from "../richtexteditor/RichTextEditor.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type NewTicketPageProps = {
  user: User | null | undefined;
};

export default function NewTicketPage({ user }: NewTicketPageProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function cancel() {
    navigate("/");
  }

  function save() {
    console.log(title);
    console.log(description);
  }

  return (
    <>
      <NavBar user={user} />
      <Container maxWidth={"xs"} sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Title"
          id="outlined-size-small"
          size="small"
          placeholder="Enter ticket title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <Stack direction="row" sx={{ mt: 2, mb: 1 }}>
          <StatusChip ticketStatus={"OPEN"} />
        </Stack>
        <RichTextEditor user={user} setDescription={setDescription} />
        <Stack
          direction="row"
          justifyContent={"end"}
          spacing={1}
          sx={{ mt: 2 }}
        >
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
      </Container>
    </>
  );
}
