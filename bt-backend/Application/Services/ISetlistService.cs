namespace BandTools.Application.Services;

public interface ISetlistService
{
    Task<Result<Setlist>> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Result<IReadOnlyList<Setlist>>> GetByBandAsync(int bandId, CancellationToken ct = default);
    Task<Result<Setlist>> CreateAsync(CreateSetlistDto dto, CancellationToken ct = default);
    Task<Result<Setlist>> UpdateAsync(int id, UpdateSetlistDto dto, CancellationToken ct = default);
    Task<Result> DeleteAsync(int id, CancellationToken ct = default);
    Task<Result<Setlist>> AddTrackAsync(int setlistId, AddSetlistTrackDto dto, CancellationToken ct = default);
    Task<Result<Setlist>> RemoveTrackAsync(int setlistId, int trackId, CancellationToken ct = default);
    Task<Result<Setlist>> ReorderTracksAsync(int setlistId, List<AddSetlistTrackDto> dto, CancellationToken ct = default);
}