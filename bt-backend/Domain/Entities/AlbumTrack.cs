namespace BandTools.Domain.Entities
{
    public class AlbumTrack : AuditableEntity
    {
        public int Id { get; set; }

        public int AlbumId { get; set; }
        public Album Album { get; set; } = null!;

        public int TrackId { get; set; }
        public Track Track { get; set; } = null!;

        public int TrackNumber { get; set; }
        public int? DiscNumber { get; set; }  // useful for double albums
    }
}
