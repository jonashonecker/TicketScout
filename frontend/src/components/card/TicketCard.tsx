import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import TicketStatusChip from "../chip/TicketStatusChip.tsx";
import { Ticket } from "../../types/Ticket.ts";
import { Dispatch, SetStateAction } from "react";
import { SidepanelConfig } from "../../types/Config.ts";

type TicketCardProps = {
  ticket: Ticket;
  setSidepanelStatus: Dispatch<SetStateAction<SidepanelConfig>>;
};

export default function TicketCard({
  ticket,
  setSidepanelStatus,
}: Readonly<TicketCardProps>) {
  return (
    <Card variant={"elevation"} sx={{ height: "100%" }}>
      <CardActionArea
        onClick={() =>
          setSidepanelStatus({
            open: true,
            formType: "UpdateTicket",
            ticket: ticket,
          })
        }
      >
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
            <TicketStatusChip ticketStatus={ticket.status} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
