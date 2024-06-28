import { Ticket } from "./Ticket.ts";

type NewTicketStatus = {
  formType: "NewTicket";
  open: boolean;
};

type UpdateTicketStatus = {
  formType: "UpdateTicket";
  open: boolean;
  ticket: Ticket;
};

export type SidepanelStatus = NewTicketStatus | UpdateTicketStatus;
