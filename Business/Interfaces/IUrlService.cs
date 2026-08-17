namespace Business.Interfaces;

public interface IUrlService
{
    Task<Result<string>> CreateUrlShortCodeAsync(CreateUrlShortCodeDto dto);

}
