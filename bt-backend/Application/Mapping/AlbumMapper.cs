namespace BandTools.Application.Mapping;

public static class AlbumMapper
{
    public static AlbumDto ToDto(this Album album) => new()
    {
        Id = album.Id,
        BandId = album.BandId,
        Title = album.Title,
        ReleaseDate = album.ReleaseDate,
        CoverImageUrl = album.CoverImageUrl,
        Type = album.Type,
        Description = album.Description,
        Tracks = album.AlbumTracks?
            .OrderBy(at => at.DiscNumber)
            .ThenBy(at => at.TrackNumber)
            .Select(at => at.ToDto())
            .ToList() ?? []
    };

    public static AlbumTrackDto ToDto(this AlbumTrack at) => new()
    {
        TrackId = at.TrackId,
        Title = at.Track?.Title ?? string.Empty,
        TrackNumber = at.TrackNumber,
        DiscNumber = at.DiscNumber,
        DurationSeconds = at.Track?.DurationSeconds
    };
}