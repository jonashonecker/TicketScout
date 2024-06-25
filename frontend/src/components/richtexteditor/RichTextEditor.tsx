import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import "./styles.css";
import MenuBar from "./menu/MenuBar.tsx";
import { User } from "../../types/User.ts";
import { Dispatch, SetStateAction } from "react";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextEditorProps = {
  user: User | null | undefined;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

export default function RichTextEditor({
  user,
  setDescription,
  description,
}: RichTextEditorProps) {
  const extensions = [
    StarterKit,
    Image,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "What’s the section name?";
        }
        return "Can you add some further context?";
      },
    }),
  ];
  const content = description;
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <MenuBar user={user} editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
