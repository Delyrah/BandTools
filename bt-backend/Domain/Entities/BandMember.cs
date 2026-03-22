namespace BandTools.Domain.Entities
{
    public class BandMember : AuditableEntity
    {
        public int Id { get; set; }

        public int BandId { get; set; }
        public Band Band { get; set; } = null!;

        public int MemberId { get; set; }
        public Member Member { get; set; } = null!;

        public string? Role { get; set; }  // e.g. "Lead Vocalist", "Drummer"
        public DateOnly? JoinDate { get; set; }
        public DateOnly? LeaveDate { get; set; }   // null = currently active
        public bool IsActive => LeaveDate == null;
    }
}
