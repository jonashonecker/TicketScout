import axios, { AxiosResponse } from "axios";
import { NewTicket, Ticket, UpdateTicket } from "../../types/Ticket.ts";
import { User } from "../../types/User.ts";

export default class ApiUtils {
  static getUser(): Promise<AxiosResponse<User>> {
    return axios.get("/api/auth/me");
  }

  static getAllTickets(): Promise<AxiosResponse<Ticket[]>> {
    return axios.get("/api/ticket");
  }

  static createNewTicket(data: NewTicket): Promise<AxiosResponse<Ticket>> {
    return axios.post("/api/ticket", data);
  }

  static updateTicket(data: UpdateTicket): Promise<AxiosResponse<Ticket>> {
    return axios.put("/api/ticket", data);
  }
}
