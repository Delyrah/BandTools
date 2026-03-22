namespace BandTools.Domain.Entities
{
    public class Track : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int? DurationSeconds { get; set; }
        public int? BPM { get; set; }
        public string? Key { get; set; }         // e.g. "Am", "C#"
        public string? Lyrics { get; set; }
        public string? Notes { get; set; }
        public TrackStatus Status { get; set; } = TrackStatus.Demo;

        public int BandId { get; set; }
        public Band Band { get; set; } = null!;

        // Navigation
        public ICollection<AlbumTrack> AlbumTracks { get; set; } = [];
        public ICollection<SetlistTrack> SetlistTracks { get; set; } = [];
    }
}
