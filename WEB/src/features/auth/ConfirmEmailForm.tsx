import { useState, useEffect } from "react";
import { useConfirmEmailAsync, useResendEmailConfirmationCodeAsync } from "../../lib/hooks/useAuth";
import { useCurrentUser } from "../../lib/hooks/useUser";
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function ConfirmEmailForm() {
  const  currentUser =  useCurrentUser();
  const confirmEmailAsync = useConfirmEmailAsync();
  const resendEmailConfirmationCodeAsync = useResendEmailConfirmationCodeAsync();
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

 const {
   register,
   handleSubmit,
   reset,
   resetField,
   formState: { errors },
 } = useForm<{ email: string; code: string }>({
   values: { email: currentUser.data?.email ?? "", code: "" },
 });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

 const onSubmit = (data: { email: string; code: string }) => {
   confirmEmailAsync.mutateAsync(data.code, {
     onSuccess: () => {
       reset();
     },
     onError: () => {
       resetField("code");
     },
   });
 };
const handleResend = () => {
  resendEmailConfirmationCodeAsync.mutateAsync(undefined, {
    onSuccess: (res) => {
      setResendMessage(res?.message);
      setCooldown(30);
    },
    onError: () => {
      setResendMessage("Failed to resend code. Please try again.");
    },
  });
};

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 4, width: "100%" }}>
          <Typography variant="h3" sx={{ m: 2, textAlign: "center" }}>
            Confirm Email
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Confirmation Code"
                fullWidth
                {...register("code", { required: "Code is required" })}
                error={!!errors.code}
                helperText={errors.code?.message}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={confirmEmailAsync.isPending}
              >
                {confirmEmailAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirm Email"
                )}
              </Button>

              {confirmEmailAsync.error && (
                <Alert severity="error">{confirmEmailAsync.error.message}</Alert>
              )}

              <Button
                variant="outlined"
                fullWidth
                disabled={resendEmailConfirmationCodeAsync.isPending || cooldown > 0}
                onClick={handleResend}
              >
                {resendEmailConfirmationCodeAsync.isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : cooldown > 0 ? (
                  `Resend available in ${cooldown}s`
                ) : (
                  "Resend Confirmation Code"
                )}
              </Button>

              {resendMessage && (
                <Alert severity={resendEmailConfirmationCodeAsync.isError ? "error" : "success"}>
                  {resendMessage}
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}