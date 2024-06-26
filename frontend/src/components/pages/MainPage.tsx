import MainNavBar from "../navbars/MainNavBar.tsx";
import { User } from "../../types/User.ts";
import { Ticket } from "../../types/Ticket.ts";
import { Dispatch, SetStateAction, useState } from "react";
import TicketCard from "../card/TicketCard.tsx";
import { Box, Container, Grid, Grow } from "@mui/material";
import SearchForm from "../forms/SearchForm.tsx";
import NewTicketForm from "../forms/NewTicketForm.tsx";
import ApiStatusSnackbar from "../snackbar/ApiStatusSnackbar.tsx";
import { ApiResponseStatusSnackbar } from "../../types/Api.ts";
import Sidepanel from "../sidepanel/Sidepanel.tsx";

type MainPageProps = {
  user: User | null | undefined;
  searchResults: Ticket[] | undefined;
  setSearchResults: Dispatch<SetStateAction<Ticket[] | undefined>>;
};

export default function MainPage({
  user,
  searchResults,
  setSearchResults,
}: Readonly<MainPageProps>) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [apiRequestStatusSnackbar, setApiRequestStatusSnackbar] =
    useState<ApiResponseStatusSnackbar>({
      open: false,
      severity: "error",
      message: "Initial value",
    });

  return (
    <>
      <MainNavBar user={user} setOpenDrawer={setOpenDrawer} />
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
          {searchResults?.map((ticket, index) => (
            <Grow in={true} timeout={500 + index * 100} key={ticket.id}>
              <Grid item xs={1} sm={4} md={4} lg={3}>
                <TicketCard ticket={ticket} />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Container>
      <Sidepanel openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
        <Container sx={{ p: 3 }}>
          <NewTicketForm
            user={user}
            setOpenDrawer={setOpenDrawer}
            apiRequestStatusSnackbar={apiRequestStatusSnackbar}
            setApiRequestStatusSnackbar={setApiRequestStatusSnackbar}
          />
        </Container>
      </Sidepanel>
      <ApiStatusSnackbar
        apiRequestStatusSnackbar={apiRequestStatusSnackbar}
        setApiRequestStatusSnackbar={setApiRequestStatusSnackbar}
      />
    </>
  );
}
