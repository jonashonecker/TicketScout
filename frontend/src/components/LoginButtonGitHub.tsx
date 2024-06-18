import { Button } from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledButton = styled(Button)({
  textTransform: "none",
  fontWeight: "bold",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
});

function login() {
  const host =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;
  window.open(host + "/oauth2/authorization/github", "_self");
}

export default function LoginButtonGitHub() {
  return (
    <StyledButton
      variant="contained"
      fullWidth={true}
      size={"large"}
      startIcon={<GitHubIcon />}
      onClick={login}
    >
      Continue with GitHub
    </StyledButton>
  );
}
