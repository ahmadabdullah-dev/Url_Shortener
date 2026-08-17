namespace Business.Dtos;

public class CreateUrlShortCodeDto
{
    public required string LongUrl { get; set; }
    public string? CustomShortCode { get; set; }
    public DateTime? ExpiresAt { get; set; }
}
public class UrlDto
{
    public string LongUrl { get; set; } = null!;
    public string ShortCode { get; set; } = null!;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
}