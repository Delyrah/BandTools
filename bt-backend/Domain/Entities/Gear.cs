namespace BandTools.Domain.Entities
{
    public class Gear : AuditableEntity
    {
        public int Id { get; set; }

        public int BandId { get; set; }
        public Band Band { get; set; } = null!;

        public int? OwnerId { get; set; }
        public Member Owner { get; set; } = null!;

        [RegularExpression(@"^[a-zA-Z0-9\s\-]+$",
            ErrorMessage = "prefab-regex-characters-numbers-minus")]
        public string Name { get; set; } = string.Empty;

        public string? Type { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? SerialNumber { get; set; }
        
        public string? PhotoUrl { get; set; }
        public string? Notes { get; set; }

        public decimal? Value { get; set; }
        public string? ValueCurrency { get; set; }
        public decimal? Weight { get; set; }
        public string? WeightUnit { get; set; }
        public string? Dimensions { get; set; }
    }
}