import NavBar from "../navbar/NavBar.tsx";
import { User } from "../../types/User.ts";
import { Container, Stack, TextField } from "@mui/material";
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
      </Container>
    </>
  );
}
