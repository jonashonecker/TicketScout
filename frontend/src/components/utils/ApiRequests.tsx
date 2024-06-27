import axios from "axios";

type NewTicket = {
  title: string;
  description: string;
};

export default class ApiUtils {
  static createNewTicket(data: NewTicket) {
    return axios.post("/api/ticket", data);
  }
}
