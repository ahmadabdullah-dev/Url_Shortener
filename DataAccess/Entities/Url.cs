namespace DataAccess.Entities;

public class Url
{
    public string UrlId { get; set; } = Guid.NewGuid().ToString();
    public string ShortCode { get; set; } = null!;
    public string LongUrl { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsActive { get; set; }

    public AppUser User { get; set; } = null!;
    public ICollection<Click> Cliks { get; set; } = new List<Click>(); 
}
