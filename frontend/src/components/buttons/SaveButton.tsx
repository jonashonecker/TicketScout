import { Box, Button, CircularProgress } from "@mui/material";

type SaveButtonProps = {
  onClick: () => void;
  pendingRequest: boolean;
};

export default function SaveButton({
  onClick,
  pendingRequest,
}: Readonly<SaveButtonProps>) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={onClick}
        variant="contained"
        size={"small"}
        disabled={pendingRequest}
        sx={{ fontWeight: "bold" }}
      >
        Save
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
