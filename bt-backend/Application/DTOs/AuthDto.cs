namespace BandTools.Application.DTOs;

// DTOs/Auth/RegisterDto.cs
public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string DisplayName { get; set; } = null!;
}

// DTOs/Auth/LoginDto.cs
public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}

// DTOs/Auth/AuthResponseDto.cs
public class AuthResponseDto
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTime AccessTokenExpiry { get; set; }
    public UserDto User { get; set; } = null!;
}

// DTOs/Auth/UserDto.cs
public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public UserRole Role { get; set; }
}