import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginDto, RegisterDto } from "../types/auth";
import agent from "../api/agent";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginAsync = useMutation({
    mutationFn: async (creds: LoginDto) => {
      const response = await agent.post("/auth/login", creds);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/dashboard");
    },
  });
  const logoutAsync = useMutation({
    mutationFn: async () => {
      await agent.post("/auth/logout");
    },
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
  });
  return {
    loginAsync,
    logoutAsync,
  };
};
export function useRegisterUser() {
  return useMutation({
    mutationFn: async (creds: RegisterDto) => {
      const response = await agent.post("/Auth/register", creds);
      return response;
    },
  });
}
export const useConfirmEmailAsync = () => {
  return useMutation({
    mutationFn: async (code: string) => {
     const response = await agent.patch("/auth/confirm-email", null, {
       params: { code },
     });
      return response.data;
    },
  });
};
export const useResendEmailConfirmationCodeAsync = () => {
 return useMutation({
  mutationFn: async () => {
    const response = await agent.post("/auth/resend-email-confirmation-code");
    return response.data;
  },
})
}