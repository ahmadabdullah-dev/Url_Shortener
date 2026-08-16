namespace DataAccess.Entities;
public class Click
{
    public string ClickId { get; set; } = Guid.NewGuid().ToString();
    public string UrlId { get; set; } = null!;
    public DateTime ClickedAt { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? Referrer { get; set; }
    public string? Country { get; set; }

    public Url Url { get; set; } = null!;
}