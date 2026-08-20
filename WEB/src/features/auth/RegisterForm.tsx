import { useState } from "react";
import type { RegisterDto } from "../../lib/types/auth";
import {
  Container,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useRegisterUser } from "../../lib/hooks/useAuth";
import { useNavigate } from "react-router";
export default function RegisterForm() {
  const registerUser = useRegisterUser();
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<RegisterDto>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (creds: RegisterDto) => {
    registerUser.mutateAsync(creds, {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        resetField("Password");
      },
    });
  };
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box>
        <Paper sx={{ p: 4, width: "100%" }}>
          <Typography
            variant="h3"
            sx={{
              m: 2,
              textAlign: "center",
            }}
          >
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="FirstName"
                fullWidth
                {...register("FirstName", {
                  required: "FirstName is required",
                })}
                error={!!errors.FirstName}
                helperText={errors.FirstName?.message}
              />
              <TextField
                label="LastName"
                fullWidth
                {...register("LastName", { required: "LastName is required" })}
                error={!!errors.LastName}
                helperText={errors.LastName?.message}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("Email", { required: "Email is required" })}
                error={!!errors.Email}
                helperText={errors.Email?.message}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("Password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                })}
                error={!!errors.Password}
                helperText={errors.Password?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={registerUser.isPending}
              >
                {registerUser.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
              {registerUser.isSuccess && (
                <Alert severity="success">{registerUser.data.data}</Alert>
              )}
              {registerUser.error && (
                <Alert severity="error">{registerUser.error.message}</Alert>
              )}
              <Button
                variant="text"
                sx={{ border: 2, m: 1, width: "100%" }}
                onClick={() => navigate("/login")}
              >
                Already registered
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
