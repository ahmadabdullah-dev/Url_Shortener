namespace Business.Dtos;

public class CreateUrlShortCodeDto
{
    public required string LongUrl { get; set; }
    public string? CustomShortCode { get; set; }
    public DateTime? ExpiresAt { get; set; }
}