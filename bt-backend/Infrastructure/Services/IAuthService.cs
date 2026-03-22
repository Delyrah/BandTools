namespace BandTools.Infrastructure.Services;

public interface IAuthService
{
    Task<Result<AuthResponseDto>> RegisterAsync(RegisterDto dto, CancellationToken ct = default);
    Task<Result<AuthResponseDto>> LoginAsync(LoginDto dto, CancellationToken ct = default);
    Task<Result<AuthResponseDto>> RefreshAsync(string refreshToken, CancellationToken ct = default);
    Task<Result> RevokeAsync(string refreshToken, CancellationToken ct = default);
}