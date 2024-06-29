import { Button } from "@mui/material";

type UpdateButtonProps = {
  onClick: () => void;
};

export default function UpdateButton({ onClick }: Readonly<UpdateButtonProps>) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size={"small"}
      sx={{
        fontWeight: "bold",
      }}
    >
      Update
    </Button>
  );
}
