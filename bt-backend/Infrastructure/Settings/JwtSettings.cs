namespace BandTools.Infrastructure.Settings;

public class JwtSettings
{
    public string Secret { get; set; } = null!;
    public int AccessTokenExpiryMinutes { get; set; }
    public int RefreshTokenExpiryDays { get; set; }
    public string Issuer { get; set; } = null!;
    public string Audience { get; set; } = null!;
}