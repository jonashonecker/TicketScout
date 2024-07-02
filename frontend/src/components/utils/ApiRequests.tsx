import axios, { AxiosResponse } from "axios";
import { NewTicket, Ticket, UpdateTicket } from "../../types/Ticket.ts";
import { User } from "../../types/User.ts";

export function getUser(): Promise<AxiosResponse<User>> {
  return axios.get("/api/auth/me");
}

export function getAllTickets(
  searchText?: string,
): Promise<AxiosResponse<Ticket[]>> {
  const url = searchText
    ? `/api/ticket?searchText=${encodeURIComponent(searchText)}`
    : "/api/ticket";
  return axios.get(url);
}

export function createNewTicket(
  data: NewTicket,
): Promise<AxiosResponse<Ticket>> {
  return axios.post("/api/ticket", data);
}

export function updateTicket(
  data: UpdateTicket,
): Promise<AxiosResponse<Ticket>> {
  return axios.put("/api/ticket", data);
}

export function deleteTicket(id: string) {
  return axios.delete("api/ticket/" + id);
}
