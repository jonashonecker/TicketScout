import { useCurrentEditor } from "@tiptap/react";
import ToggleButton from "@mui/material/ToggleButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import TitleIcon from "@mui/icons-material/Title";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Avatar,
  Box,
  Divider,
  styled,
  toggleButtonGroupClasses,
  useTheme,
} from "@mui/material";
import "@tiptap/starter-kit";
import { User } from "../../../types/User.ts";
import { AccountCircle } from "@mui/icons-material";

type MenuBarProps = {
  user: User | null | undefined;
};

export default function MenuBar({ user }: MenuBarProps) {
  const { editor } = useCurrentEditor();
  const theme = useTheme();

  if (!editor) {
    return null;
  }

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
      {
        marginLeft: -1,
        borderLeft: "1px solid transparent",
      },
    [`& .${toggleButtonGroupClasses.lastButton}`]: {
      marginRight: 0,
    },
  }));

  return (
    <div className="control-group">
      <div className="button-group">
        <Box
          sx={{
            display: "flex",
            borderBottom: `1px solid ${theme.palette.divider}`,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          {user ? (
            <Avatar
              sx={{ height: "30px", width: "30px" }}
              alt="User avatar picture"
              src={user.avatarUrl}
            />
          ) : (
            <AccountCircle />
          )}
          <StyledToggleButtonGroup size="small" aria-label="text formatting">
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <ToggleButton
              onMouseDown={(event) => {
                event.preventDefault(); // Prevents the editor losing focus
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }}
              value="heading"
              aria-label="heading"
              selected={editor.isActive("heading", { level: 3 })}
            >
              <TitleIcon />
            </ToggleButton>
            <ToggleButton
              onMouseDown={(event) => {
                event.preventDefault(); // Prevents the editor losing focus
                editor.chain().focus().toggleBold().run();
              }}
              value="bold"
              aria-label="bold"
              selected={editor.isActive("bold")}
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton
              onMouseDown={(event) => {
                event.preventDefault(); // Prevents the editor losing focus
                editor.chain().focus().toggleItalic().run();
              }}
              value="italic"
              aria-label="italic"
              selected={editor.isActive("italic")}
            >
              <FormatItalicIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Box>
      </div>
    </div>
  );
}
