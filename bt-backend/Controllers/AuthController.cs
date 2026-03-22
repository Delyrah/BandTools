using BandTools.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;

namespace BandTools.Controllers;

public class AuthController : BaseController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // POST api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto, CancellationToken ct)
    {
        var result = await _authService.RegisterAsync(dto, ct);
        return CreatedOrBadRequest(result, nameof(Register), null);
    }

    // POST api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto, CancellationToken ct)
    {
        var result = await _authService.LoginAsync(dto, ct);

        if (!result.IsSuccess)
            return Unauthorized(new { error = result.Error });

        return Ok(result.Value);
    }

    // POST api/auth/refresh
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] string refreshToken, CancellationToken ct)
    {
        var result = await _authService.RefreshAsync(refreshToken, ct);

        if (!result.IsSuccess)
            return Unauthorized(new { error = result.Error });

        return Ok(result.Value);
    }

    // POST api/auth/revoke
    [Authorize]
    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke([FromBody] string refreshToken, CancellationToken ct)
    {
        var result = await _authService.RevokeAsync(refreshToken, ct);
        return OkOrBadRequest(result);
    }
}