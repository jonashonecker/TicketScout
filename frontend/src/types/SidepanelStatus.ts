import { Ticket } from "./Ticket.ts";

export type SidepanelStatus = {
  open: boolean;
  newTicket: boolean;
  updateTicket: boolean;
  ticket?: Ticket;
};
