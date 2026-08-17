import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateUrlDto, UrlDto } from "../types/url";

export const useCreateUrlShortCodeAsync = () => {
  return useMutation({
    mutationFn: async (creds: CreateUrlDto) => {
      const response = await agent.post("/Url/create-url-short-code", creds);
      return response.data;
    },
  });
};
export const useGetUrlByShortCodeAsync = (shortCode: string) =>
  useQuery<UrlDto>({
    queryKey: ["urls", shortCode],
    queryFn: () =>
      agent.get<UrlDto>("/Url/short-code", { params: { shortCode } })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
    enabled :!!shortCode
  });