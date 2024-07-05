import MainNavBar from "../navbars/MainNavBar.tsx";
import { User } from "../../types/User.ts";
import { Ticket } from "../../types/Ticket.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { Box, Container } from "@mui/material";
import SearchForm from "../forms/SearchForm.tsx";
import TicketForm from "../forms/TicketForm.tsx";
import ApiStatusSnackbar from "../snackbar/ApiStatusSnackbar.tsx";
import { SnackbarConfig, SidepanelConfig } from "../../types/Config.ts";
import Sidepanel from "../sidepanel/Sidepanel.tsx";
import TicketCardsGrid from "../layout/TicketCardsGrid.tsx";
import ConfirmDeletionDialogue from "../dialogues/ConfirmDeletionDialogue.tsx";

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
  const [sidepanelConfig, setSidepanelConfig] = useState<SidepanelConfig>({
    open: false,
    formType: "NewTicket",
  });
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    open: false,
    severity: "error",
    message: "Initial value",
  });
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<boolean>(false);

  return (
    <>
      <MainNavBar
        user={user}
        setSidepanelConfig={setSidepanelConfig}
        loadingTickets={loadingTickets}
      />
      <Container fixed sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <SearchForm
            setSearchResults={setSearchResults}
            setSnackbarConfig={setSnackbarConfig}
            setLoadingTickets={setLoadingTickets}
          />
        </Box>
        <TicketCardsGrid
          searchResults={searchResults}
          setSidepanelConfig={setSidepanelConfig}
        />
      </Container>
      <Sidepanel
        sidepanelConfig={sidepanelConfig}
        setSidepanelConfig={setSidepanelConfig}
      >
        <Container sx={{ p: 3 }}>
          <TicketForm
            user={user}
            sidePanelConfig={sidepanelConfig}
            setSidepanelConfig={setSidepanelConfig}
            setSnackbarConfig={setSnackbarConfig}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setConfirmDeletion={setConfirmDeletion}
            pendingRequest={pendingRequest}
            setPendingRequest={setPendingRequest}
          />
        </Container>
      </Sidepanel>
      <ApiStatusSnackbar
        snackbarConfig={snackbarConfig}
        setSnackbarConfig={setSnackbarConfig}
      />
      <ConfirmDeletionDialogue
        confirmDeletion={confirmDeletion}
        setConfirmDeletion={setConfirmDeletion}
        sidePanelConfig={sidepanelConfig}
        setSidepanelConfig={setSidepanelConfig}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setSnackbarConfig={setSnackbarConfig}
        pendingRequest={pendingRequest}
        setPendingRequest={setPendingRequest}
      />
    </>
  );
}
