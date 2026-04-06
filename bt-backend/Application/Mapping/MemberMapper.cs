namespace BandTools.Application.Mapping;

public static class MemberMapper
{
    public static MemberDto ToDto(this Member member) => new()
    {
        Id = member.Id,
        Name = member.Name,
        AvatarUrl = member.AvatarUrl,
        Bio = member.Bio,
        LinkedUserId = member.LinkedUserId
    };
}