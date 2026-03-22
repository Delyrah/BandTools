namespace BandTools.Application.Services;

public interface IBandService
{
    Task<Result<Band>> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Result<IReadOnlyList<Band>>> GetAllAsync(CancellationToken ct = default);
    Task<Result<Band>> CreateAsync(CreateBandDto dto, CancellationToken ct = default);
    Task<Result<Band>> UpdateAsync(int id, UpdateBandDto dto, CancellationToken ct = default);
    Task<Result> DeleteAsync(int id, CancellationToken ct = default);
}