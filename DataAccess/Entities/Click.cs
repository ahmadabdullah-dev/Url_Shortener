namespace DataAccess.Entities;
public class Click
{
    public string ClickId { get; set; } = Guid.NewGuid().ToString();
    public string UrlId { get; set; } = null!;
    public DateTime ClickedAt { get; set; }
    public Url Url { get; set; } = null!;
}