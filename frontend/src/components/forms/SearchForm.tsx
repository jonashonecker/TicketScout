import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Ticket } from "../../types/Ticket.ts";
import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import { getAllTickets } from "../utils/ApiRequests.tsx";
import { SnackbarConfig } from "../../types/Config.ts";

type SearchFormProps = {
  setSearchResults: Dispatch<SetStateAction<Ticket[] | undefined>>;
  setSnackbarConfig: Dispatch<SetStateAction<SnackbarConfig>>;
  setPendingRequest: Dispatch<SetStateAction<boolean>>;
};

export default function SearchForm({
  setSearchResults,
  setSnackbarConfig,
  setPendingRequest,
}: Readonly<SearchFormProps>) {
  function searchTickets(event: FormEvent) {
    event.preventDefault();
    setPendingRequest(true);
    getAllTickets(searchText)
      .then((response) => {
        setPendingRequest(false);
        setSearchResults(response.data);
      })
      .catch((error) => {
        setPendingRequest(false);
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: error.response.data.error,
        });
      });
  }

  const [searchText, setSearchText] = useState<string>("");

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search your tickets"
        inputProps={{ "aria-label": "search TicketScout" }}
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={searchTickets}
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
