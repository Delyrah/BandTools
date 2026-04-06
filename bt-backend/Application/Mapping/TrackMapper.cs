namespace BandTools.Application.Mapping;

public static class TrackMapper
{
    public static TrackDto ToDto(this Track track) => new()
    {
        Id = track.Id,
        BandId = track.BandId,
        Title = track.Title,
        DurationSeconds = track.DurationSeconds,
        BPM = track.BPM,
        Key = track.Key,
        Lyrics = track.Lyrics,
        Notes = track.Notes,
        Status = track.Status
    };
}