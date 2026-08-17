import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { CreateUrlDto, UrlDto } from "../types/url";
import type { PaginatedList, PaginationParams } from "../types/common";

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
      agent
        .get<UrlDto>("/Url/short-code", { params: { shortCode } })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
    enabled: !!shortCode,
  });
export function useCurrentUserUrls(pagination: PaginationParams) {
  return useQuery({
    queryKey: ["current-user-urls", pagination],
    queryFn: async () => {
      const response = await agent.get<PaginatedList<UrlDto>>(
        "Url/current-user-urls",
        { params: pagination },
      );
      return response.data;
    },
    retry: false,
  });
}
export function useRetrieveOriginalUrlFromShortCodeAsync(shortCode: string) {
  return useQuery({
    queryKey: ["retrieve-original-url-from-short-code", shortCode],
    queryFn: async () => {
      const response = await agent.get<string>(
        "Url/retrieve-original-url-from-short-code",
        { params: { shortCode } }, 
      );
      return response.data;
    },
    enabled: !!shortCode,
    retry: false,
  });
}