using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UrlController : BaseApiController
{
    private readonly IUrlService _urlService;
    public UrlController(IUrlService urlService)
    {
        _urlService = urlService;
    }
    [Authorize]
    [HttpPost("create-url-short-code")]
    public async Task<IActionResult> CreateUrlShortCodeAsync(CreateUrlShortCodeDto dto)
    {
        var result = await _urlService.CreateUrlShortCodeAsync(dto);
        return HandleResult(result);
    }
    [HttpGet("short-code")]
    public async Task<IActionResult> GetUrlByUrlShortCode(string shortCode)
    {
        var result = await _urlService.GetUrlByUrlShortCodeAsync(shortCode);
        return HandleResult(result);
    }
}
