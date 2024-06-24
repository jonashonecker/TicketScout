import NavBar from "../navbar/NavBar.tsx";
import { User } from "../../types/User.ts";

type NewTicketPageProps = {
  user: User | null | undefined;
};

export default function NewTicketPage({ user }: NewTicketPageProps) {
  return <NavBar user={user} />;
}
