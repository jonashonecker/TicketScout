import TicketScoutLogo from "../../assets/TicketScoutLogo.svg";
import { styled } from "@mui/system";

const StyledImage = styled("img")({
  height: "26px",
});

export default function Logo() {
  return <StyledImage src={TicketScoutLogo} alt="Telescope" />;
}
