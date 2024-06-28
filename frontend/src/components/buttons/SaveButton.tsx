import { Button } from "@mui/material";

type SaveButtonProps = {
  onClick: () => void;
};

export default function SaveButton({ onClick }: Readonly<SaveButtonProps>) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size={"small"}
      sx={{ fontWeight: "bold" }}
    >
      Save
    </Button>
  );
}
