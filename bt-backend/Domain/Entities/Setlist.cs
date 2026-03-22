namespace BandTools.Domain.Entities
{
    public class Setlist : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateOnly? ShowDate { get; set; }
        public string? Venue { get; set; }
        public string? Notes { get; set; }
        public SetlistStatus Status { get; set; } = SetlistStatus.Draft;

        public int BandId { get; set; }
        public Band Band { get; set; } = null!;

        // Navigation
        public ICollection<SetlistTrack> SetlistTracks { get; set; } = [];
    }
}
