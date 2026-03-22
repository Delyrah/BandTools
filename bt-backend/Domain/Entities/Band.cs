namespace BandTools.Domain.Entities
{
    public class Band : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Genre { get; set; }
        public DateOnly? Founded { get; set; }
        public string? Bio { get; set; }
        public string? LogoUrl { get; set; }

        // Navigation
        public ICollection<BandMember> Members { get; set; } = [];
        public ICollection<Track> Tracks { get; set; } = [];
        public ICollection<Album> Albums { get; set; } = [];
        public ICollection<Setlist> Setlists { get; set; } = [];
    }
}
