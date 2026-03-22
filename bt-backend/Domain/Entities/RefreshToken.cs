namespace BandTools.Domain.Entities;

public class RefreshToken : AuditableEntity
{
    public int Id { get; set; }
    public string Token { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
    public bool IsRevoked => RevokedAt != null;
    public bool IsActive => !IsExpired && !IsRevoked;

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}