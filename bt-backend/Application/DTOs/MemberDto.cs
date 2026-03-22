using System.ComponentModel.DataAnnotations;

namespace BandTools.Application.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public string? Bio { get; set; }
    public int? LinkedUserId { get; set; }
}

// Used when listing members within a band response
public class BandMemberDto
{
    public int MemberId { get; set; }
    public string Name { get; set; } = null!;
    public string? Role { get; set; }
    public string? AvatarUrl { get; set; }
    public DateOnly? JoinDate { get; set; }
    public DateOnly? LeaveDate { get; set; }
    public bool IsActive { get; set; }
}

public class CreateMemberDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    [MaxLength(500)]
    public string? Bio { get; set; }

    public int? LinkedUserId { get; set; }

    // Optionally assign to a band immediately on creation
    public int? BandId { get; set; }

    [MaxLength(100)]
    public string? Role { get; set; }
    public DateOnly? JoinDate { get; set; }
}

public class UpdateMemberDto
{
    [MaxLength(100)]
    public string? Name { get; set; }
    public string? AvatarUrl { get; set; }

    [MaxLength(500)]
    public string? Bio { get; set; }
    public int? LinkedUserId { get; set; }
}