import NavBar from "../navbar/NavBar.tsx";
import { User } from "../../types/User.ts";
import { Ticket } from "../../types/Ticket.ts";
import { useState } from "react";
import TicketCard from "../cards/TicketCard.tsx";
import { Box, Container, Grid } from "@mui/material";
import SearchForm from "../inputs/SearchForm.tsx";

type MainPageProps = {
  user: User | null | undefined;
};

export default function MainPage({ user }: Readonly<MainPageProps>) {
  const [searchResults, setSearchResults] = useState<Ticket[] | undefined>(
    undefined,
  );

  return (
    <>
      <NavBar navbarContext={"main"} user={user} />
      <Container maxWidth="xl" sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <SearchForm setSearchResults={setSearchResults} />
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12, lg: 12 }}
          alignItems="stretch"
        >
          {searchResults?.map((ticket) => (
            <Grid key={ticket.id} item xs={1} sm={4} md={4} lg={3}>
              <TicketCard ticket={ticket} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
