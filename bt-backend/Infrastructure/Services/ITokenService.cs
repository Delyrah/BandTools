namespace BandTools.Infrastructure.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    // Returns the userId from an expired access token
    // Used during refresh so we know whose token we're refreshing
    int? GetUserIdFromExpiredToken(string token);
}