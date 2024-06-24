import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Box } from "@mui/material";
import "./styles.css";
import MenuBar from "./menu/MenuBar.tsx";
import { User } from "../../types/User.ts";

type RichTextEditorProps = {
  user: User | null | undefined;
};

const extensions = [StarterKit, Image];

const content = `
<p>Enter description here... </p>
`;

export default function RichTextEditor({ user }: RichTextEditorProps) {
  return (
    <>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <EditorProvider
          slotBefore={<MenuBar user={user} />}
          extensions={extensions}
          content={content}
        ></EditorProvider>
      </Box>
    </>
  );
}
