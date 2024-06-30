import { Box, Stack } from "@mui/material";
import TicketStatusChip from "../chip/TicketStatusChip.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../types/User.ts";
import { SnackbarConfig } from "../../types/Config.ts";
import CancelButton from "../buttons/CancelButton.tsx";
import SaveButton from "../buttons/SaveButton.tsx";
import TicketTitleInput from "../inputs/TicketTitleInput.tsx";
import TicketDescriptionInput from "../inputs/TicketDescriptionInput.tsx";
import { createNewTicket, updateTicket } from "../utils/ApiRequests.tsx";
import { checkIfHtmlContainsText } from "../utils/Validation.tsx";
import { SidepanelConfig } from "../../types/Config.ts";
import UpdateButton from "../buttons/UpdateButton.tsx";
import { Ticket } from "../../types/Ticket.ts";
import DeleteButton from "../buttons/DeleteButton.tsx";

type TicketFormProps = {
  user: User | null | undefined;
  sidePanelConfig: SidepanelConfig;
  setSidepanelConfig: Dispatch<SetStateAction<SidepanelConfig>>;
  setSnackbarConfig: Dispatch<SetStateAction<SnackbarConfig>>;
  searchResults: Ticket[] | undefined;
  setSearchResults: Dispatch<SetStateAction<Ticket[] | undefined>>;
  setConfirmDeletion: Dispatch<SetStateAction<boolean>>;
};

export default function TicketForm({
  user,
  sidePanelConfig,
  setSidepanelConfig,
  setSnackbarConfig,
  searchResults,
  setSearchResults,
  setConfirmDeletion,
}: Readonly<TicketFormProps>) {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [initialDescription, setInitialDescription] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  useEffect(() => {
    if (sidePanelConfig.formType == "UpdateTicket") {
      setTitle(sidePanelConfig.ticket.title);
      setDescription(sidePanelConfig.ticket.description);
      setInitialDescription(sidePanelConfig.ticket.description);
    } else {
      setTitle("");
      setDescription("");
      setInitialDescription("");
    }
  }, [sidePanelConfig]);

  function cancel() {
    setSidepanelConfig({ ...sidePanelConfig, open: false });
  }

  function save() {
    const [isTitleError, isDescriptionError] = validateTitleAndDescription();

    if (!isTitleError && !isDescriptionError) {
      createNewTicket({ title: title, description: description })
        .then(() => {
          setSnackbarConfig({
            open: true,
            severity: "success",
            message: "Ticket created successfully!",
          });
          setSidepanelConfig({ ...sidePanelConfig, open: false });
        })
        .catch((error) => {
          setSnackbarConfig({
            open: true,
            severity: "error",
            message: error.response.data.error,
          });
        });
    }
  }

  function update() {
    const [isTitleError, isDescriptionError] = validateTitleAndDescription();

    if (!isTitleError && !isDescriptionError) {
      updateTicket({
        id:
          sidePanelConfig.formType == "UpdateTicket"
            ? sidePanelConfig.ticket.id
            : "",
        title: title,
        description: description,
      })
        .then((response) => {
          setSearchResults(
            searchResults?.map((ticket) => {
              if (ticket.id === response.data.id) {
                return response.data;
              } else {
                return ticket;
              }
            }),
          );
          setSnackbarConfig({
            open: true,
            severity: "success",
            message: "Ticket updated successfully!",
          });
          setSidepanelConfig({ ...sidePanelConfig, open: false });
        })
        .catch((error) => {
          setSnackbarConfig({
            open: true,
            severity: "error",
            message: error.response.data.error,
          });
        });
    }
  }

  function validateTitleAndDescription() {
    const isTitleError = !title.trim();
    const isDescriptionError = !checkIfHtmlContainsText(description);

    setTitleError(isTitleError);
    setDescriptionError(isDescriptionError);

    return [isTitleError, isDescriptionError];
  }

  return (
    <>
      <TicketTitleInput
        titleError={titleError}
        setTitle={setTitle}
        title={title}
      />
      <Stack direction="row" sx={{ mt: 2, mb: 1 }}>
        <TicketStatusChip ticketStatus={"OPEN"} />
      </Stack>
      <TicketDescriptionInput
        user={user}
        initialDescription={initialDescription}
        description={description}
        setDescription={setDescription}
        descriptionError={descriptionError}
      />
      <Stack direction="row" justifyContent={"end"} spacing={1} sx={{ mt: 2 }}>
        {sidePanelConfig.formType == "UpdateTicket" && (
          <Box sx={{ flexGrow: 1 }}>
            <DeleteButton
              onClick={() => {
                setConfirmDeletion(true);
              }}
            />
          </Box>
        )}
        <CancelButton onClick={cancel} />
        {sidePanelConfig.formType == "NewTicket" && (
          <SaveButton onClick={save} />
        )}
        {sidePanelConfig.formType == "UpdateTicket" && (
          <UpdateButton onClick={update} />
        )}
      </Stack>
    </>
  );
}
