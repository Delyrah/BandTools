namespace BandTools.Domain.Entities
{
    public class Album : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateOnly? ReleaseDate { get; set; }
        public string? CoverImageUrl { get; set; }
        public AlbumType Type { get; set; } = AlbumType.LP;
        public string? Description { get; set; }

        public int BandId { get; set; }
        public Band Band { get; set; } = null!;

        // Navigation
        public ICollection<AlbumTrack> AlbumTracks { get; set; } = [];
    }
}
