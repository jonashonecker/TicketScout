import { Box, Button, CircularProgress } from "@mui/material";

type DeleteButtonProps = {
  onClick: () => void;
  pendingRequest: boolean;
};

export default function ConfirmDeleteButton({
  onClick,
  pendingRequest,
}: Readonly<DeleteButtonProps>) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={onClick}
        color={"error"}
        variant="contained"
        size={"small"}
        disabled={pendingRequest}
        sx={{
          fontWeight: "bold",
        }}
      >
        Delete
      </Button>
      {pendingRequest && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
