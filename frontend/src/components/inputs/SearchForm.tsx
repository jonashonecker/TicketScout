import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Ticket } from "../../types/Ticket.ts";
import { Dispatch, SetStateAction, FormEvent } from "react";
import axios from "axios";

type SearchFormProps = {
  setSearchResults: Dispatch<SetStateAction<Ticket[] | undefined>>;
};

export default function SearchForm({
  setSearchResults,
}: Readonly<SearchFormProps>) {
  function searchTickets(event: FormEvent) {
    event.preventDefault();
    axios
      .get("/api/ticket")
      .then((response) => setSearchResults(response.data));
  }

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search your tickets"
        inputProps={{ "aria-label": "search google maps" }}
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
