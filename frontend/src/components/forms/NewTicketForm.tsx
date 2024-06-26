import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material";
import StatusChip from "../chips/StatusChip.tsx";
import RichTextEditor from "../richtexteditor/RichTextEditor.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../types/User.ts";
import axios from "axios";
import { ApiResponseStatusSnackbar } from "../../types/Api.ts";

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
      <TextField
        fullWidth
        label="Title"
        id="outlined-size-small"
        size="small"
        required
        error={titleError}
        helperText={titleError ? "Title is required" : "Enter ticket title"}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <Stack direction="row" sx={{ mt: 2, mb: 1 }}>
        <StatusChip ticketStatus={"OPEN"} />
      </Stack>
      <Box
        sx={{
          border: (theme) =>
            descriptionError
              ? `1px solid ${theme.palette.error.main}`
              : `1px solid ${theme.palette.divider}`,
        }}
      >
        <RichTextEditor
          user={user}
          description={description}
          setDescription={setDescription}
        />
      </Box>
      {descriptionError && (
        <FormHelperText
          sx={{
            mt: 0.5,
            mx: 1.75,
            position: "absolute",
          }}
          error
        >
          A description is required
        </FormHelperText>
      )}
      <Stack direction="row" justifyContent={"end"} spacing={1} sx={{ mt: 2 }}>
        <Button
          onClick={cancel}
          variant="outlined"
          size={"small"}
          sx={{
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={save}
          variant="contained"
          size={"small"}
          sx={{ fontWeight: "bold" }}
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
