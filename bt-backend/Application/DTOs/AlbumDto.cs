using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs;

// DTOs/Album/AlbumDto.cs
public class AlbumDto
{
    public int Id { get; set; }
    public int BandId { get; set; }
    public string Title { get; set; } = null!;
    public DateOnly? ReleaseDate { get; set; }
    public string? CoverImageUrl { get; set; }
    public AlbumType Type { get; set; }
    public string? Description { get; set; }
    public List<AlbumTrackDto> Tracks { get; set; } = [];
}

// DTOs/Album/CreateAlbumDto.cs
public class CreateAlbumDto
{
    [Required]
    public int BandId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;

    public DateOnly? ReleaseDate { get; set; }
    public string? CoverImageUrl { get; set; }
    public AlbumType Type { get; set; } = AlbumType.LP;

    [MaxLength(1000)]
    public string? Description { get; set; }
}

// DTOs/Album/UpdateAlbumDto.cs
public class UpdateAlbumDto
{
    [MaxLength(200)]
    public string? Title { get; set; }
    public DateOnly? ReleaseDate { get; set; }
    public string? CoverImageUrl { get; set; }
    public AlbumType? Type { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }
}