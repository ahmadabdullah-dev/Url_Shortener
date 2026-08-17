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
}
