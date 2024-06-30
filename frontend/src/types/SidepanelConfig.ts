import { Ticket } from "./Ticket.ts";

type NewTicketConfig = {
  formType: "NewTicket";
  open: boolean;
};

type UpdateTicketConfig = {
  formType: "UpdateTicket";
  open: boolean;
  ticket: Ticket;
};

export type SidepanelConfig = NewTicketConfig | UpdateTicketConfig;
