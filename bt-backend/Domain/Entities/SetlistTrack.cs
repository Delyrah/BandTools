namespace BandTools.Domain.Entities
{
    public class SetlistTrack : AuditableEntity
    {
        public int Id { get; set; }

        public int SetlistId { get; set; }
        public Setlist Setlist { get; set; } = null!;

        public int TrackId { get; set; }
        public Track Track { get; set; } = null!;

        public int Position { get; set; }
        public string? Notes { get; set; }    // e.g. "extended outro", "key change to Bm"
    }
}
