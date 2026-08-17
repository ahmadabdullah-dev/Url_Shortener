import { useState } from "react";
import { useGetUrlByShortCodeAsync } from "../../lib/hooks/useUrl";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { Shared } from "../../lib/shared";

export default function ReadUrlByShortCodeForm() {
  const [shortCode, setShortCode] = useState("");
  const [searchedCode, setSearchedCode] = useState("");

  const getUrl = useGetUrlByShortCodeAsync(searchedCode);

  const handleSearch = () => {
    if (shortCode.trim()) setSearchedCode(shortCode.trim());
  };

  return (
    <div style={{ maxWidth: 480, margin: "32px auto" }}>
      <Typography variant="h5" gutterBottom>
        Find a URL information
      </Typography>

      <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          label="Short code"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!shortCode.trim() || getUrl.isFetching}
          sx={{ height: 40 }}
        >
          Search
        </Button>
      </Stack>

      {getUrl.isFetching && (
        <div style={{ textAlign: "center", padding: 16 }}>
          <CircularProgress size={28} />
        </div>
      )}

      {getUrl.isError && (
        <Alert severity="error">Couldn't find that short code.</Alert>
      )}

      {getUrl.data && (
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Stack spacing={2}>
              <Box
                sx={{
                  bgcolor: "action.hover",
                  borderRadius: 1,
                  px: 1.5,
                  py: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Original Url
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href={getUrl.data.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    wordBreak: "break-all",
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {getUrl.data.longUrl}
                </Typography>
              </Box>

              <Divider />

              <Stack direction="row" spacing={4}>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body2">
                    {Shared.formatDate(getUrl.data.createdAt)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption" color="text.secondary">
                    Expires
                  </Typography>
                  <Typography variant="body2">
                    {Shared.formatDate(getUrl.data.expiresAt)}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
