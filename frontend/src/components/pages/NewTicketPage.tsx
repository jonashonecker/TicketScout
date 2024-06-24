import NavBar from "../navbar/NavBar.tsx";
import { User } from "../../types/User.ts";
import { Button, Container, Stack, TextField } from "@mui/material";
import StatusChip from "../chips/StatusChip.tsx";
import Divider from "@mui/material/Divider";
import RichTextEditor from "../richtexteditor/RichTextEditor.tsx";

type NewTicketPageProps = {
  user: User | null | undefined;
};

export default function NewTicketPage({ user }: NewTicketPageProps) {
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
        />
        <Stack direction="row" sx={{ my: 1 }}>
          <StatusChip ticketStatus={"OPEN"} />
        </Stack>
        <Divider />
        <RichTextEditor user={user} />
        <Stack
          direction="row"
          justifyContent={"end"}
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Button
            variant="outlined"
            size={"small"}
            sx={{
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
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
