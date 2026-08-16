import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useCurrentUser } from "../../lib/hooks/useUser";

interface ProfileFieldProps {
  label: string;
  value?: string | number | null;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || "—"}
      </Typography>
    </Box>
  );
}



export default function MyProfile() {

  const user = useCurrentUser();

  console.log(user)
  if (user.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user.isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="error">
          Failed to load profile. Please try again.
        </Typography>
      </Box>
    );
  }

  const data = user.data;

  if (!data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="text.secondary">No profile data found.</Typography>
      </Box>
    );
  }

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Stack
        spacing={1.5}
        sx={{ alignItems: "center", textAlign: "center", mb: 4 }}
      >
        

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {fullName}
          </Typography>
        </Box>

      
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2.5, sm: 4 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ flex: 1 }}>
          <ProfileField label="Email" value={data.email} />
        </Box>      
      </Stack>
    </Box>
  );
}
