import Box from "@mui/material/Box";
import "./LoadingSpinner.css";

export function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "3rem",
      }}
    >
      <span className="loader"></span>
    </Box>
  );
}
