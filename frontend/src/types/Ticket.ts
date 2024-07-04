import { User } from "./User.ts";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "REJECTED" | "CLOSED";

export type Ticket = {
  id: string;
  projectName: string;
  title: string;
  description: string;
  status: TicketStatus;
  author: User;
};

export type TicketRequestDTO = {
  title: string;
  description: string;
};
