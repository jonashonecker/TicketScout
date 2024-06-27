import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import StatusChip from "../chip/StatusChip.tsx";
import { Ticket } from "../../types/Ticket.ts";

type TicketCardProps = {
  ticket: Ticket;
};

export default function TicketCard({ ticket }: Readonly<TicketCardProps>) {
  return (
    <Card variant={"elevation"} sx={{ height: "100%" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {ticket.projectName}
          </Typography>
          <Avatar
            sx={{ height: "22px", width: "22px" }}
            alt="User avatar picture"
            src={ticket.author.avatarUrl}
          />
        </Stack>
        <Typography variant="body2" sx={{ mb: 1.5, flexGrow: 1 }}>
          {ticket.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <StatusChip ticketStatus={ticket.status} />
        </Stack>
      </CardContent>
    </Card>
  );
}