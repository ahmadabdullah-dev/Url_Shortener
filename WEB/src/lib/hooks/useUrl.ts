import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateUrlDto } from "../types/url";

export const useCreateUrlShortCodeAsync = () => {
  return useMutation({
    mutationFn: async (creds: CreateUrlDto) => {
      const response = await agent.post("/Url/create-url-short-code", creds);
      return response.data;
    },
  });
};
