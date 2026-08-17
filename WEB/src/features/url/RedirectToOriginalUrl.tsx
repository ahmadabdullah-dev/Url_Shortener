import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import { useGetUrlByShortCodeAsync } from "../../lib/hooks/useUrl";

export default function RedirectToOriginalUrl() {
  const { shortCode } = useParams();
  const url = useGetUrlByShortCodeAsync(shortCode ?? "");

  useEffect(() => {
    if (url.data) {
      window.location.href = url.data.longUrl;
    }
  }, [url.data]);

  if (!shortCode) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="text.secondary">No short code provided.</Typography>
      </Box>
    );
  }

  if (url.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (url.isError || !url.data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="text.secondary">{url.error?.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <CircularProgress />
    </Box>
  );
}
