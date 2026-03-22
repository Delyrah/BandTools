namespace BandTools.Domain.Entities
{
    public class Member : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? AvatarUrl { get; set; }
        public string? Bio { get; set; }

        // Linked user account (optional — a member may not have a login)
        public int? LinkedUserId { get; set; }
        public User? LinkedUser { get; set; }

        // Navigation
        public ICollection<BandMember> BandMemberships { get; set; } = [];
    }
}
