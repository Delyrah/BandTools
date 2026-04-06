namespace BandTools.Application.Mapping;

public static class BandMapper
{
    public static BandDto ToDto(this Band band) => new()
    {
        Id = band.Id,
        Name = band.Name,
        Genre = band.Genre,
        Founded = band.Founded,
        Bio = band.Bio,
        LogoUrl = band.LogoUrl,
        Members = band.Members?
            .Select(bm => bm.ToDto())
            .ToList() ?? []
    };

    public static BandMemberDto ToDto(this BandMember bm) => new()
    {
        MemberId = bm.MemberId,
        Name = bm.Member?.Name ?? string.Empty,
        Role = bm.Role,
        AvatarUrl = bm.Member?.AvatarUrl,
        JoinDate = bm.JoinDate,
        LeaveDate = bm.LeaveDate,
        IsActive = bm.IsActive
    };
}