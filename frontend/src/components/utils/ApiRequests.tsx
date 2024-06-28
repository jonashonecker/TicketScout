import axios from "axios";
import { NewTicket, UpdateTicket } from "../../types/Ticket.ts";

export default class ApiUtils {
  static getUser() {
    return axios.get("/api/auth/me");
  }

  static getAllTickets() {
    return axios.get("/api/ticket");
  }

  static createNewTicket(data: NewTicket) {
    return axios.post("/api/ticket", data);
  }

  static updateTicket(data: UpdateTicket) {
    return axios.put("/api/ticket", data);
  }
}
