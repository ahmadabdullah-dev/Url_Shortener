using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories;

public class UrlRepository : IUrlRepository
{
    private readonly ApplicationDbContext _dbContext;
    public UrlRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<string> AddAsync(Url url)
    {
        _dbContext.Urls.Add(url);
        await _dbContext.SaveChangesAsync();
        return url.UrlId;
    }
    public async Task<bool> IsUrlShortCodeExistsAsync(string shortCode)
    {
        return await _dbContext.Urls.AnyAsync
            (u => u.ShortCode == shortCode);
    }
    public async Task<Url?> GetUrlByUrlShortCodeAsync(string shortCode)
    {
        return await _dbContext.Urls.SingleOrDefaultAsync(u => u.ShortCode == shortCode);
    }
    public async Task<PagedList<UrlProjection>> GetUrlsByUserIdAsync(PaginationParams p, string userId)
    {
        var query = _dbContext.Urls
            .AsNoTracking()
            .Select(x => new UrlProjection
            {
           
                ShortCode = x.ShortCode,
                LongUrl = x.LongUrl,  
                IsActive = x.IsActive,
                CreatedAt = x.CreatedAt,
                ExpiresAt = x.ExpiresAt,

            });

       // Console.WriteLine(query.ToQueryString());
        return await PagedList<UrlProjection>.CreateAsync(query, p.Page, p.PageSize);
    }
  
}
