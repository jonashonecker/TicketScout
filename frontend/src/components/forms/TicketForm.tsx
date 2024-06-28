import { Stack } from "@mui/material";
import TicketStatusChip from "../chip/TicketStatusChip.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../types/User.ts";
import { SnackbarStatus } from "../../types/SnackbarStatus.ts";
import CancelButton from "../buttons/CancelButton.tsx";
import SaveButton from "../buttons/SaveButton.tsx";
import TicketTitleInput from "../inputs/TicketTitleInput.tsx";
import TicketDescriptionInput from "../inputs/TicketDescriptionInput.tsx";
import ApiUtils from "../utils/ApiRequests.tsx";
import Validation from "../utils/Validation.tsx";
import { SidepanelStatus } from "../../types/SidepanelStatus.ts";
import UpdateButton from "../buttons/UpdateButton.tsx";
import { Ticket } from "../../types/Ticket.ts";

type TicketFormProps = {
  user: User | null | undefined;
  sidePanelStatus: SidepanelStatus;
  setSidepanelStatus: Dispatch<SetStateAction<SidepanelStatus>>;
  setSnackbarStatus: Dispatch<SetStateAction<SnackbarStatus>>;
  searchResults: Ticket[] | undefined;
  setSearchResults: Dispatch<SetStateAction<Ticket[] | undefined>>;
};

export default function TicketForm({
  user,
  sidePanelStatus,
  setSidepanelStatus,
  setSnackbarStatus,
  searchResults,
  setSearchResults,
}: Readonly<TicketFormProps>) {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [initialDescription, setInitialDescription] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  useEffect(() => {
    if (sidePanelStatus.formType == "UpdateTicket") {
      setTitle(sidePanelStatus.ticket.title);
      setDescription(sidePanelStatus.ticket.description);
      setInitialDescription(sidePanelStatus.ticket.description);
    } else {
      setTitle("");
      setDescription("");
      setInitialDescription("");
    }
  }, [sidePanelStatus]);

  function cancel() {
    setSidepanelStatus({ ...sidePanelStatus, open: false });
  }

  function save() {
    const [isTitleError, isDescriptionError] = validateTitleAndDescription();

    if (!isTitleError && !isDescriptionError) {
      ApiUtils.createNewTicket({ title: title, description: description })
        .then(() => {
          setSnackbarStatus({
            open: true,
            severity: "success",
            message: "Ticket created successfully!",
          });
          setSidepanelStatus({ ...sidePanelStatus, open: false });
        })
        .catch((error) => {
          setSnackbarStatus({
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
      ApiUtils.updateTicket({
        id:
          sidePanelStatus.formType == "UpdateTicket"
            ? sidePanelStatus.ticket.id
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
          setSnackbarStatus({
            open: true,
            severity: "success",
            message: "Ticket updated successfully!",
          });
          setSidepanelStatus({ ...sidePanelStatus, open: false });
        })
        .catch((error) => {
          setSnackbarStatus({
            open: true,
            severity: "error",
            message: error.response.data.error,
          });
        });
    }
  }

  function validateTitleAndDescription() {
    const isTitleError = !title.trim();
    const isDescriptionError = !Validation.checkIfHtmlContainsText(description);

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
        <CancelButton onClick={cancel} />
        {sidePanelStatus.formType == "NewTicket" && (
          <SaveButton onClick={save} />
        )}
        {sidePanelStatus.formType == "UpdateTicket" && (
          <UpdateButton onClick={update} />
        )}
      </Stack>
    </>
  );
}
