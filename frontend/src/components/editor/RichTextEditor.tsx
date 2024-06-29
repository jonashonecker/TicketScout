import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import "./styles.css";
import MenuBar from "./menu/MenuBar.tsx";
import { User } from "../../types/User.ts";
import { Dispatch, SetStateAction, useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextEditorProps = {
  user: User | null | undefined;
  initialDescription: string;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

export default function RichTextEditor({
  user,
  initialDescription,
  setDescription,
  description,
}: Readonly<RichTextEditorProps>) {
  useEffect(() => {
    editor?.commands.setContent(initialDescription);
  }, [initialDescription]);

  const extensions = [
    StarterKit,
    Image.configure({ inline: true }),
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
