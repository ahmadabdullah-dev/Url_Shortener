namespace DataAccess.Interfaces;
public interface IClickRepository
{
    Task AddAsync(Click click);
    Task<int> GetClicksCountAsync(string urlId);
}
