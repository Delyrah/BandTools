namespace BandTools.Application.Mapping;

public static class SetlistMapper
{
    public static SetlistDto ToDto(this Setlist setlist) => new()
    {
        Id = setlist.Id,
        BandId = setlist.BandId,
        Name = setlist.Name,
        ShowDate = setlist.ShowDate,
        Venue = setlist.Venue,
        Notes = setlist.Notes,
        Status = setlist.Status,
        Tracks = setlist.SetlistTracks?
            .OrderBy(st => st.Position)
            .Select(st => st.ToDto())
            .ToList() ?? []
    };

    public static SetlistTrackDto ToDto(this SetlistTrack st) => new()
    {
        TrackId = st.TrackId,
        Title = st.Track?.Title ?? string.Empty,
        Position = st.Position,
        Notes = st.Notes,
        DurationSeconds = st.Track?.DurationSeconds
    };
}