import { Box, FormHelperText } from "@mui/material";
import RichTextEditor from "../editor/RichTextEditor.tsx";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/User.ts";

type TicketDescriptionInputProps = {
  user: User | null | undefined;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  initialDescription: string;
  descriptionError: boolean;
};

export default function TicketDescriptionInput({
  user,
  initialDescription,
  description,
  setDescription,
  descriptionError,
}: Readonly<TicketDescriptionInputProps>) {
  return (
    <>
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
          initialDescription={initialDescription}
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
    </>
  );
}
