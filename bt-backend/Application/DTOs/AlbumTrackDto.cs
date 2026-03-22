using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs;

public class AlbumTrackDto
{
    public int TrackId { get; set; }
    public string Title { get; set; } = null!;
    public int TrackNumber { get; set; }
    public int? DiscNumber { get; set; }
    public int? DurationSeconds { get; set; }
}

// DTOs/AlbumTrack/AddAlbumTrackDto.cs
public class AddAlbumTrackDto
{
    [Required]
    public int TrackId { get; set; }

    [Required]
    [Range(1, 100)]
    public int TrackNumber { get; set; }

    [Range(1, 10)]
    public int? DiscNumber { get; set; }
}

// DTOs/SetlistTrack/SetlistTrackDto.cs
public class SetlistTrackDto
{
    public int TrackId { get; set; }
    public string Title { get; set; } = null!;
    public int Position { get; set; }
    public string? Notes { get; set; }
    public int? DurationSeconds { get; set; }
}

// DTOs/SetlistTrack/AddSetlistTrackDto.cs
public class AddSetlistTrackDto
{
    [Required]
    public int TrackId { get; set; }

    [Required]
    [Range(1, 200)]
    public int Position { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }
}