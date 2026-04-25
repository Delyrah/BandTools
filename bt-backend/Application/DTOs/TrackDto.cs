using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs;

public class TrackDto
{
    public int Id { get; set; }
    public int BandId { get; set; }
    public string Title { get; set; } = null!;
    public int? DurationSeconds { get; set; }
    public int? BPM { get; set; }
    public string? Key { get; set; }
    public string? Lyrics { get; set; }
    public string? Notes { get; set; }
    public TrackStatus Status { get; set; }
}

public class CreateTrackDto
{
    [Required]
    public int BandId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;

    [Range(1, 7200)] // max 2 hours
    public int? DurationSeconds { get; set; }

    [Range(20, 300)]
    public int? BPM { get; set; }

    [MaxLength(10)]
    public string? Key { get; set; }

    public string? Lyrics { get; set; }
    public string? Notes { get; set; }
    public TrackStatus Status { get; set; } = TrackStatus.Demo;
}

public class UpdateTrackDto
{
    [MaxLength(200)]
    public string? Title { get; set; }

    [Range(1, 7200)]
    public int? DurationSeconds { get; set; }

    [Range(20, 300)]
    public int? BPM { get; set; }

    [MaxLength(10)]
    public string? Key { get; set; }

    public string? Lyrics { get; set; }
    public string? Notes { get; set; }
    public TrackStatus? Status { get; set; }
}