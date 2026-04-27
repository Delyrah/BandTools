using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs;

public class GearDto
{
    public int Id { get; set; }
    public int BandId { get; set; }
    public int? OwnerId { get; set; }

    public string Name { get; set; } = null!;
    public string? Type { get; set; }
    public string? Brand { get; set; }
    public string? Model { get; set; }
    public string? SerialNumber { get; set; }
    public decimal? Value { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Notes { get; set; }
    public decimal? Weight { get; set; }
    public string? WeightUnit { get; set; }
    public string? Dimensions { get; set; }
}

public class CreateGearDto
{
    [Required]
    public int BandId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = null!;

    public int? OwnerId { get; set; }
    public string? Type { get; set; }
    public string? Brand { get; set; }
    public string? Model { get; set; }
    public string? SerialNumber { get; set; }
    public decimal? Value { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Notes { get; set; }
    public decimal? Weight { get; set; }
    public string? WeightUnit { get; set; }
    public string? Dimensions { get; set; }
}

public class UpdateGearDto
{
    [MaxLength(200)]
    public string? Name { get; set; }
    public int? OwnerId { get; set; }
    public string? Type { get; set; }
    public string? Brand { get; set; }
    public string? Model { get; set; }
    public string? SerialNumber { get; set; }
    public decimal? Value { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Notes { get; set; }
    public decimal? Weight { get; set; }
    public string? WeightUnit { get; set; }
    public string? Dimensions { get; set; }
}