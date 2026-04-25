using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs;

public class SetlistDto
{
    public int Id { get; set; }
    public int BandId { get; set; }
    public string Name { get; set; } = null!;
    public DateOnly? ShowDate { get; set; }
    public string? Venue { get; set; }
    public string? Notes { get; set; }
    public SetlistStatus Status { get; set; }
    public List<SetlistTrackDto> Tracks { get; set; } = [];
}

public class CreateSetlistDto
{
    [Required]
    public int BandId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = null!;

    public DateOnly? ShowDate { get; set; }

    [MaxLength(200)]
    public string? Venue { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }

    public SetlistStatus Status { get; set; } = SetlistStatus.Draft;
}

public class UpdateSetlistDto
{
    [MaxLength(200)]
    public string? Name { get; set; }
    public DateOnly? ShowDate { get; set; }

    [MaxLength(200)]
    public string? Venue { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }
    public SetlistStatus? Status { get; set; }
}