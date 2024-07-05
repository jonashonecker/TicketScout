import { Box, Stack } from "@mui/material";
import TicketStatusChip from "../chip/TicketStatusChip.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../types/User.ts";
import { SnackbarConfig, SidepanelConfig } from "../../types/Config.ts";
import CancelButton from "../buttons/CancelButton.tsx";
import SaveButton from "../buttons/SaveButton.tsx";
import TicketTitleInput from "../inputs/TicketTitleInput.tsx";
import TicketDescriptionInput from "../inputs/TicketDescriptionInput.tsx";
import { createNewTicket, updateTicket } from "../utils/ApiRequests.tsx";
import { checkIfHtmlContainsText } from "../utils/Validation.tsx";
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
  pendingRequest: boolean;
  setPendingRequest: Dispatch<SetStateAction<boolean>>;
};

export default function TicketForm({
  user,
  sidePanelConfig,
  setSidepanelConfig,
  setSnackbarConfig,
  searchResults,
  setSearchResults,
  setConfirmDeletion,
  pendingRequest,
  setPendingRequest,
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
      setPendingRequest(true);
      createNewTicket({ title: title, description: description })
        .then(() => {
          setPendingRequest(false);
          setSnackbarConfig({
            open: true,
            severity: "success",
            message: "Ticket created successfully!",
          });
          setSidepanelConfig({ ...sidePanelConfig, open: false });
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
  }

  function update() {
    const [isTitleError, isDescriptionError] = validateTitleAndDescription();

    if (sidePanelConfig.formType !== "UpdateTicket") {
      return;
    }

    if (!isTitleError && !isDescriptionError) {
      setPendingRequest(true);
      updateTicket(sidePanelConfig.ticket.id, {
        title: title,
        description: description,
      })
        .then((response) => {
          setPendingRequest(false);
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
          setPendingRequest(false);
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
        {sidePanelConfig.formType == "NewTicket" && (
          <TicketStatusChip ticketStatus={"OPEN"} />
        )}
        {sidePanelConfig.formType == "UpdateTicket" && (
          <TicketStatusChip ticketStatus={sidePanelConfig.ticket.status} />
        )}
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
          <SaveButton onClick={save} pendingRequest={pendingRequest} />
        )}
        {sidePanelConfig.formType == "UpdateTicket" && (
          <UpdateButton onClick={update} pendingRequest={pendingRequest} />
        )}
      </Stack>
    </>
  );
}
