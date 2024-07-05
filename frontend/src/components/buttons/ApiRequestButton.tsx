import { Box, Button, CircularProgress } from "@mui/material";

type ApiRequestButtonProps = {
  onClick: () => void;
  pendingRequest: boolean;
  color: "primary" | "error";
  label: "Save" | "Update" | "Delete";
};

export default function ApiRequestButton({
  onClick,
  pendingRequest,
  color,
  label,
}: Readonly<ApiRequestButtonProps>) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={onClick}
        color={color}
        variant="contained"
        size={"small"}
        disabled={pendingRequest}
        sx={{
          fontWeight: "bold",
        }}
      >
        {label}
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
