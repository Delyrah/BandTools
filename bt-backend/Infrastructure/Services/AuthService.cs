using BandTools.Infrastructure.Persistence;

namespace BandTools.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<RefreshToken> _refreshTokenRepository;
    private readonly ITokenService _tokenService;

    public AuthService(
        IRepository<User> userRepository,
        IRepository<RefreshToken> refreshTokenRepository,
        ITokenService tokenService)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _tokenService = tokenService;
    }

    public async Task<Result<AuthResponseDto>> RegisterAsync(RegisterDto dto, CancellationToken ct = default)
    {
        var emailTaken = await _userRepository.Query()
            .AnyAsync(u => u.Email == dto.Email, ct);

        if (emailTaken)
            return Result<AuthResponseDto>.Failure("Email is already registered.");

        var user = new User
        {
            Email = dto.Email.ToLowerInvariant(),
            DisplayName = dto.DisplayName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.Member,
            IsActive = true
        };

        await _userRepository.AddAsync(user, ct);
        await _userRepository.SaveChangesAsync(ct);

        return await IssueTokensAsync(user, ct);
    }

    public async Task<Result<AuthResponseDto>> LoginAsync(LoginDto dto, CancellationToken ct = default)
    {
        var user = await _userRepository.Query()
            .FirstOrDefaultAsync(u => u.Email == dto.Email.ToLowerInvariant(), ct);

        // Use a constant-time compare message to avoid leaking whether
        // the email exists via response timing differences
        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Result<AuthResponseDto>.Failure("Invalid email or password.");

        if (!user.IsActive)
            return Result<AuthResponseDto>.Failure("Account is disabled.");

        return await IssueTokensAsync(user, ct);
    }

    public async Task<Result<AuthResponseDto>> RefreshAsync(string refreshToken, CancellationToken ct = default)
    {
        var storedToken = await _refreshTokenRepository.Query()
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken, ct);

        if (storedToken is null || !storedToken.IsActive)
            return Result<AuthResponseDto>.Failure("Invalid or expired refresh token.");

        // Rotate the refresh token — revoke the old one and issue a new one.
        // This means a stolen refresh token can only be used once before
        // it's invalidated by the legitimate user's next refresh.
        storedToken.RevokedAt = DateTime.UtcNow;
        _refreshTokenRepository.Update(storedToken);
        await _refreshTokenRepository.SaveChangesAsync(ct);

        return await IssueTokensAsync(storedToken.User, ct);
    }

    public async Task<Result> RevokeAsync(string refreshToken, CancellationToken ct = default)
    {
        var storedToken = await _refreshTokenRepository.Query()
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken, ct);

        if (storedToken is null || !storedToken.IsActive)
            return Result.Failure("Invalid or expired refresh token.");

        storedToken.RevokedAt = DateTime.UtcNow;
        _refreshTokenRepository.Update(storedToken);
        await _refreshTokenRepository.SaveChangesAsync(ct);

        return Result.Success();
    }

    // Shared logic between Register and Login —
    // creates a refresh token, saves it, returns both tokens
    private async Task<Result<AuthResponseDto>> IssueTokensAsync(User user, CancellationToken ct)
    {
        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshTokenValue = _tokenService.GenerateRefreshToken();
        var accessTokenExpiry = DateTime.UtcNow.AddMinutes(15);

        var refreshToken = new RefreshToken
        {
            Token = refreshTokenValue,
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };

        await _refreshTokenRepository.AddAsync(refreshToken, ct);
        await _refreshTokenRepository.SaveChangesAsync(ct);

        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshTokenValue,
            AccessTokenExpiry = accessTokenExpiry,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                AvatarUrl = user.AvatarUrl,
                Role = user.Role
            }
        });
    }
}