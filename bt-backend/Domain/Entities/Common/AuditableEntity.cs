namespace BandTools.Domain.Entities.Common
{
    public abstract class AuditableEntity
    {
        public DateTime CreatedAt { get; set; }
        public int CreatedByUserId { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedByUserId { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
        public int? DeletedByUserId { get; set; }
    }
}
