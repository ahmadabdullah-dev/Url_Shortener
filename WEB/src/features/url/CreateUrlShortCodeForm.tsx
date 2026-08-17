import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCreateUrlShortCodeAsync } from "../../lib/hooks/useUrl";
import type { CreateUrlDto } from "../../lib/types/url";

export default function CreateUrlShortCodeForm() {
  const createUrlAsync = useCreateUrlShortCodeAsync();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUrlDto>();

  const onSubmit = (creds: CreateUrlDto) => {
    createUrlAsync.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Create a short URL code
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Url"
                fullWidth
                {...register("LongUrl", { required: "URL is required" })}
                error={!!errors.LongUrl}
                helperText={errors.LongUrl?.message}
                disabled={createUrlAsync.isPending}
              />

              <TextField
                label="Custom Code"
                fullWidth
                {...register("CustomShortCode")}
                disabled={createUrlAsync.isPending}
              />

              <Controller
                name="ExpiresAt"
                control={control}
                render={({ field, fieldState }) => (
                  <DateTimePicker
                    label="Planned Date & Time"
                    value={field.value ? dayjs(field.value as string) : null}
                    onChange={(newValue) =>
                      field.onChange(newValue ? newValue.toISOString() : "")
                    }
                    minDateTime={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        disabled: createUrlAsync.isPending,
                      },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={createUrlAsync.isPending}
              >
                {createUrlAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create"
                )}
              </Button>
              {createUrlAsync.error && (
                <Alert severity="error">{createUrlAsync.error.message}</Alert>
              )}
              {createUrlAsync.isSuccess && (
                <Alert severity="success">{createUrlAsync.data}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
