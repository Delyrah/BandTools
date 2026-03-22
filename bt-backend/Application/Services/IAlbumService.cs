namespace BandTools.Application.Services;

public interface IAlbumService
{
    Task<Result<Album>> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Result<IReadOnlyList<Album>>> GetByBandAsync(int bandId, CancellationToken ct = default);
    Task<Result<Album>> CreateAsync(CreateAlbumDto dto, CancellationToken ct = default);
    Task<Result<Album>> UpdateAsync(int id, UpdateAlbumDto dto, CancellationToken ct = default);
    Task<Result> DeleteAsync(int id, CancellationToken ct = default);
    Task<Result<Album>> AddTrackAsync(int albumId, AddAlbumTrackDto dto, CancellationToken ct = default);
    Task<Result<Album>> RemoveTrackAsync(int albumId, int trackId, CancellationToken ct = default);
}