import { Chip, useTheme } from "@mui/material";
import { TicketStatus } from "../../types/Ticket.ts";
import { ThemeStatusKey } from "../../types/Theme.ts";

type StatusChipProps = {
  ticketStatus: TicketStatus;
};

const statusStyles: Record<
  TicketStatus,
  { label: string; statusKey: ThemeStatusKey }
> = {
  OPEN: { label: "Open", statusKey: "open" },
  CLOSED: { label: "Closed", statusKey: "closed" },
  REJECTED: { label: "Rejected", statusKey: "rejected" },
  IN_PROGRESS: { label: "In Progress", statusKey: "inProgress" },
};

export default function StatusChip({ ticketStatus }: StatusChipProps) {
  const theme = useTheme();
  const { label, statusKey } = statusStyles[ticketStatus];

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: theme.status[statusKey].backgroundColor,
        color: theme.status[statusKey].textColor,
      }}
    />
  );
}
