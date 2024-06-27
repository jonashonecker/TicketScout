import { Stack } from "@mui/material";
import TicketStatusChip from "../chip/TicketStatusChip.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../types/User.ts";
import axios from "axios";
import { ApiResponseStatusSnackbar } from "../../types/Api.ts";
import CancelButton from "../buttons/CancelButton.tsx";
import SaveButton from "../buttons/SaveButton.tsx";
import TicketTitleInput from "../inputs/TicketTitleInput.tsx";
import TicketDescriptionInput from "../inputs/TicketDescriptionInput.tsx";

type NewTicketFormProps = {
  user: User | null | undefined;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  apiRequestStatusSnackbar: ApiResponseStatusSnackbar;
  setApiRequestStatusSnackbar: Dispatch<
    SetStateAction<ApiResponseStatusSnackbar>
  >;
};

export default function NewTicketForm({
  user,
  setOpenDrawer,
  setApiRequestStatusSnackbar,
}: Readonly<NewTicketFormProps>) {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  function cancel() {
    setOpenDrawer(false);
  }

  function save() {
    const isTitleError = !title.trim();
    const isDescriptionError = !checkIfHtmlContainsValue(description);

    setTitleError(isTitleError);
    setDescriptionError(isDescriptionError);

    if (!isTitleError && !isDescriptionError) {
      axios
        .post("/api/ticket", { title: title, description: description })
        .then(() => {
          setApiRequestStatusSnackbar({
            open: true,
            severity: "success",
            message: "Ticket created successfully!",
          });
          setOpenDrawer(false);
        })
        .catch((error) => {
          setApiRequestStatusSnackbar({
            open: true,
            severity: "error",
            message: error.response.data.error,
          });
        });
    }
  }

  function checkIfHtmlContainsValue(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const allElements = doc.querySelectorAll("*");
    for (const element of allElements) {
      if (element.textContent) {
        return true;
      }
    }
    return false;
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
