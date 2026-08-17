namespace DataAccess.Projections;
public class UrlProjection
{

    public string ShortCode { get; set; } = null!;
    public string LongUrl { get; set; } = null!;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; } 
    public DateTime ExpiresAt { get; set; } 
}
