import axios from "axios";
import { NewTicket, UpdateTicket } from "../../types/Ticket.ts";

export default class ApiUtils {
  static createNewTicket(data: NewTicket) {
    return axios.post("/api/ticket", data);
  }

  static updateTicket(data: UpdateTicket) {
    return axios.put("/api/ticket", data);
  }
}
