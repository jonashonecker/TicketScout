import NavBar from "./NavBar.tsx";
import { User } from "../types/User.ts";

type MainPageProps = {
  user: User | null | undefined;
};

export default function MainPage({ user }: Readonly<MainPageProps>) {
  return (
    <>
      <NavBar navbarContext={"main"} user={user} />
    </>
  );
}
