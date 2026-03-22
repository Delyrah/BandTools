namespace BandTools.Domain.Entities
{
    public class User : AuditableEntity
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string? AvatarUrl { get; set; }
        public UserRole Role { get; set; } = UserRole.Member;
        public bool IsActive { get; set; } = true;

        // Navigation
        public ICollection<BandMember> BandMemberships { get; set; } = [];
    }
}
