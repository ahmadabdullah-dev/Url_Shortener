export type CreateUrlDto = {
  LongUrl: string;
  CustomShortCode: string;
  ExpiresAt: string;
};
export type UrlDto = {
  shortCode: string;
  longUrl: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string
};
