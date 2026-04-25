namespace BandTools.Application.Services;

public interface IGearService
{
    Task<Result<Gear>> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Result<IReadOnlyList<Gear>>> GetByBandAsync(int bandId, CancellationToken ct = default);
    Task<Result<Gear>> CreateAsync(CreateGearDto dto, CancellationToken ct = default);
    Task<Result<Gear>> UpdateAsync(int id, UpdateGearDto dto, CancellationToken ct = default);
    Task<Result> DeleteAsync(int id, CancellationToken ct = default);
}