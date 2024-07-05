import { Box, Button, CircularProgress } from "@mui/material";

type UpdateButtonProps = {
  onClick: () => void;
  pendingRequest: boolean;
};

export default function UpdateButton({
  onClick,
  pendingRequest,
}: Readonly<UpdateButtonProps>) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={onClick}
        variant="contained"
        size={"small"}
        disabled={pendingRequest}
        sx={{
          fontWeight: "bold",
        }}
      >
        Update
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
