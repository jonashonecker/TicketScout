import { Button } from "@mui/material";

type DeleteButtonProps = {
  onClick: () => void;
};

export default function DeleteButton({ onClick }: Readonly<DeleteButtonProps>) {
  return (
    <Button
      onClick={onClick}
      color={"error"}
      variant="contained"
      size={"small"}
      sx={{
        fontWeight: "bold",
      }}
    >
      Delete
    </Button>
  );
}
