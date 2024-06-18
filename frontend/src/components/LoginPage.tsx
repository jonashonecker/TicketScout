import LoginNavBar from "./LoginNavBar.tsx";
import LoginButtonGitHub from "./LoginButtonGitHub.tsx";
import { Box, Container, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <>
      <LoginNavBar />
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 13,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold", // Make the text bold
            }}
          >
            Explore your tickets &#127757;
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            Login to your TicketScout account
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoginButtonGitHub />
        </Box>
      </Container>
    </>
  );
}
