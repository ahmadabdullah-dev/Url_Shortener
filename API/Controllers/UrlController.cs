using DataAccess.Common;
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
    [Authorize]
    [HttpGet("short-code")]
    public async Task<IActionResult> GetUrlByUrlShortCode(string shortCode)
    {
        var result = await _urlService.GetUrlByUrlShortCodeAsync(shortCode);
        return HandleResult(result);
    }
    [Authorize]
    [HttpGet("current-user-urls")]
    public async Task<IActionResult> GetCurrentUserUrls([FromQuery] PaginationParams p)
    {
        var result = await _urlService.GetCurrentUserUrlsAsync(p);
        return HandleResult(result);
    }
    [HttpGet("retrieve-original-url-from-short-code")]
    public async Task<IActionResult> RetrieveOriginalUrlFromShortCodeAsync(string shortCode)
    {
        var result = await _urlService.RetrieveOriginalUrlFromShortCodeAsync(shortCode);
        return HandleResult(result);
    }
}
