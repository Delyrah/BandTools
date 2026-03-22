using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs
{
    public class BandDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Genre { get; set; }
        public DateOnly? Founded { get; set; }
        public string? Bio { get; set; }
        public string? LogoUrl { get; set; }
        public List<BandMemberDto> Members { get; set; } = [];
    }

    public class CreateBandDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [MaxLength(50)]
        public string? Genre { get; set; }
        public DateOnly? Founded { get; set; }

        [MaxLength(1000)]
        public string? Bio { get; set; }
        public string? LogoUrl { get; set; }
    }

    public class UpdateBandDto
    {
        [MaxLength(100)]
        public string? Name { get; set; }

        [MaxLength(50)]
        public string? Genre { get; set; }
        public DateOnly? Founded { get; set; }

        [MaxLength(1000)]
        public string? Bio { get; set; }
        public string? LogoUrl { get; set; }
    }
}
