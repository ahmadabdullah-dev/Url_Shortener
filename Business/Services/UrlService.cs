
namespace Business.Services;
public class UrlService : IUrlService
{
    private readonly IUrlRepository _urlRepository;
    private readonly IUserService _userService;

    public UrlService(IUrlRepository urlRepository,
        IUserService userService
        )
    {
        _urlRepository = urlRepository;
        _userService = userService;
    }
    public async Task<Result<string>> CreateUrlShortCodeAsync(CreateUrlShortCodeDto dto)
    {
        var currentUserId = _userService.GetCurrentUserId();

        if (currentUserId == null)
            return Result<string>.Failure("Unauthorized", 403);

        if (!ServiceHelper.IsUrl(dto.LongUrl))
            return Result<string>.Failure("Invalid URL", 409);

        string shortCode;

        if (!string.IsNullOrEmpty(dto.CustomShortCode))
        {
            if (await _urlRepository.IsUrlShortCodeExistsAsync(dto.CustomShortCode))
                return Result<string>.Failure($"'{dto.CustomShortCode}': Short code already exists", 400);

            shortCode = dto.CustomShortCode;
        }
        else
        {
            shortCode = await GenerateUniqueUrlShortCodeAsync();
        }

        var expiresAt = dto.ExpiresAt ?? DateTime.UtcNow.AddDays(14);

        var url = new Url
        {
            ShortCode = shortCode,
            LongUrl = dto.LongUrl,
            UserId = currentUserId,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = expiresAt,
            IsActive = true,
        };

        var createdUrlId = await _urlRepository.AddAsync(url);

        return Result<string>.Success($"Short code created successfully. Code is: '{shortCode}'");
    }
    public async Task<Result<UrlDto>> GetUrlByUrlShortCodeAsync(string shortCode)
    {
        var entity = await _urlRepository.GetUrlByUrlShortCodeAsync(shortCode);

        if (entity == null)
            return Result<UrlDto>.Failure("Url not found", 404);

        var dto = new UrlDto
        {
            LongUrl = entity.LongUrl,
            ShortCode = entity.ShortCode,
            CreatedAt = entity.CreatedAt,
            IsActive = entity.IsActive,
            ExpiresAt = entity.ExpiresAt   
        };

        return Result<UrlDto>.Success(dto);

    }
    public async Task<Result<PagedList<UrlDto>>> GetCurrentUserUrlsAsync(PaginationParams p)
    {
        var userId = _userService.GetCurrentUserId();
        
        if (userId == null)
            return Result<PagedList<UrlDto>>.Failure("Unauthorized", 401);

        var urls = await _urlRepository.GetUrlsByUserIdAsync(p, userId);
        var dtos = new PagedList<UrlDto>
        {
            Items = urls.Items.Select(x => new UrlDto
            {
                ShortCode = x.ShortCode,
                LongUrl = x.LongUrl,
                IsActive = x.IsActive,
                CreatedAt = x.CreatedAt,
                ExpiresAt = x.ExpiresAt


            }).ToList(),

            CurrentPage = urls.CurrentPage,
            TotalCount = urls.TotalCount,
            TotalPages = urls.TotalPages

        };
       return Result<PagedList<UrlDto>>.Success(dtos);   
    }
    private async Task<string> GenerateUniqueUrlShortCodeAsync()
    {
        for (int attempted = 0; attempted < 5; attempted++)
        {
            var code = ServiceHelper.GenerateShortCode(5);

            if (!await _urlRepository.IsUrlShortCodeExistsAsync(code))
                return code;

        }
        throw new InvalidOperationException("Could not generate a unique short code. Try again.");
    }
}
