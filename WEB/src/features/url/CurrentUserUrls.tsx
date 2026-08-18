import { useState } from "react";
import type { PaginationParams } from "../../lib/types/common";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";

import { useCurrentUserUrls } from "../../lib/hooks/useUrl";
import { Shared } from "../../lib/shared";

export default function CurrentUserUrls() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 9,
  });

  const data = useCurrentUserUrls(pagination);

  if (data.isPending) {
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width={160} height={56} sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (data.isError) {
    return (
      <Alert severity="error" variant="outlined">
        {data.error.message}
      </Alert>
    );
  }

  if (!data.data) {
    return (
      <Alert severity="info" variant="outlined">
        No plans found.
      </Alert>
    );
  }

  const list = data.data;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Urls
      </Typography>

      {list.items.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No Urls found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {list.items.map((u) => (
            <Grid key={u.shortCode} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    {u.shortCode}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 1,
                      wordBreak: "break-all",
                    }}
                  >
                    {u.longUrl}
                  </Typography>

                  <Chip
                    label={u.isActive ? "Active" : "Inactive"}
                    color={u.isActive ? "success" : "default"}
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Created: {Shared.formatDate(u.createdAt)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Expires: {Shared.formatDate(u.expiresAt)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Clicks: {u.clickCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {list.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={list.totalPages}
            page={list.currentPage}
            onChange={(_, page) => setPagination((p) => ({ ...p, page }))}
          />
        </Box>
      )}
    </Box>
  );
}
