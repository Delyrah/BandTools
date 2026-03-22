namespace BandTools.Application.Services;

public interface ITrackService
{
    Task<Result<Track>> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Result<IReadOnlyList<Track>>> GetByBandAsync(int bandId, CancellationToken ct = default);
    Task<Result<Track>> CreateAsync(CreateTrackDto dto, CancellationToken ct = default);
    Task<Result<Track>> UpdateAsync(int id, UpdateTrackDto dto, CancellationToken ct = default);
    Task<Result> DeleteAsync(int id, CancellationToken ct = default);
}