import { Stack } from "@mui/material";
import TicketStatusChip from "../chip/TicketStatusChip.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../types/User.ts";
import { SnackbarStatus } from "../../types/SnackbarStatus.ts";
import CancelButton from "../buttons/CancelButton.tsx";
import SaveButton from "../buttons/SaveButton.tsx";
import TicketTitleInput from "../inputs/TicketTitleInput.tsx";
import TicketDescriptionInput from "../inputs/TicketDescriptionInput.tsx";
import ApiUtils from "../utils/ApiRequests.tsx";
import Validation from "../utils/Validation.tsx";
import { SidepanelStatus } from "../../types/SidepanelStatus.ts";

type TicketFormProps = {
  user: User | null | undefined;
  sidePanelStatus: SidepanelStatus;
  setSidepanelStatus: Dispatch<SetStateAction<SidepanelStatus>>;
  setSnackbarStatus: Dispatch<SetStateAction<SnackbarStatus>>;
};

export default function TicketForm({
  user,
  sidePanelStatus,
  setSidepanelStatus,
  setSnackbarStatus,
}: Readonly<TicketFormProps>) {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  function cancel() {
    setSidepanelStatus({ ...sidePanelStatus, open: false });
  }

  function save() {
    const isTitleError = !title.trim();
    const isDescriptionError = !Validation.checkIfHtmlContainsText(description);

    setTitleError(isTitleError);
    setDescriptionError(isDescriptionError);

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

  return (
    <>
      <TicketTitleInput titleError={titleError} setTitle={setTitle} />
      <Stack direction="row" sx={{ mt: 2, mb: 1 }}>
        <TicketStatusChip ticketStatus={"OPEN"} />
      </Stack>
      <TicketDescriptionInput
        user={user}
        description={description}
        setDescription={setDescription}
        descriptionError={descriptionError}
      />
      <Stack direction="row" justifyContent={"end"} spacing={1} sx={{ mt: 2 }}>
        <CancelButton onClick={cancel} />
        <SaveButton onClick={save} />
      </Stack>
    </>
  );
}
