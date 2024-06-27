import MainNavBar from "../navbars/MainNavBar.tsx";
import { User } from "../../types/User.ts";
import { Ticket } from "../../types/Ticket.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { Box, Container } from "@mui/material";
import SearchForm from "../forms/SearchForm.tsx";
import TicketForm from "../forms/TicketForm.tsx";
import ApiStatusSnackbar from "../snackbar/ApiStatusSnackbar.tsx";
import { SnackbarStatus } from "../../types/SnackbarStatus.ts";
import Sidepanel from "../sidepanel/Sidepanel.tsx";
import TicketCardsGrid from "../layout/TicketCardsGrid.tsx";

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
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatus>({
    open: false,
    severity: "error",
    message: "Initial value",
  });

  return (
    <>
      <MainNavBar user={user} setOpenDrawer={setOpenDrawer} />
      <Container fixed sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <SearchForm setSearchResults={setSearchResults} />
        </Box>
        <TicketCardsGrid searchResults={searchResults} />
      </Container>
      <Sidepanel openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
        <Container sx={{ p: 3 }}>
          <TicketForm
            user={user}
            setOpenDrawer={setOpenDrawer}
            setSnackbarStatus={setSnackbarStatus}
          />
        </Container>
      </Sidepanel>
      <ApiStatusSnackbar
        snackbarStatus={snackbarStatus}
        setSnackbarStatus={setSnackbarStatus}
      />
    </>
  );
}
