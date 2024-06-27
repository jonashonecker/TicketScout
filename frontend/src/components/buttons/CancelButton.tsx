import { Button } from "@mui/material";

type CancelButtonProps = {
  onClick: () => void;
};

export default function CancelButton({ onClick }: CancelButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      size={"small"}
      sx={{
        fontWeight: "bold",
      }}
    >
      Cancel
    </Button>
  );
}
