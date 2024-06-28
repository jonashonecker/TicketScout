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
import { SidepanelStatus } from "../../types/SidepanelStatus.ts";

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
  const [sidepanelStatus, setSidepanelStatus] = useState<SidepanelStatus>({
    open: false,
    formType: "NewTicket",
  });
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatus>({
    open: false,
    severity: "error",
    message: "Initial value",
  });

  return (
    <>
      <MainNavBar user={user} setSidepanelStatus={setSidepanelStatus} />
      <Container fixed sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <SearchForm setSearchResults={setSearchResults} />
        </Box>
        <TicketCardsGrid
          searchResults={searchResults}
          setSidepanelStatus={setSidepanelStatus}
        />
      </Container>
      <Sidepanel
        sidepanelStatus={sidepanelStatus}
        setSidepanelStatus={setSidepanelStatus}
      >
        <Container sx={{ p: 3 }}>
          <TicketForm
            user={user}
            sidePanelStatus={sidepanelStatus}
            setSidepanelStatus={setSidepanelStatus}
            setSnackbarStatus={setSnackbarStatus}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
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
