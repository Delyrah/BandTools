using BandTools.Application.Services.Common;
using BandTools.Infrastructure.Persistence;

namespace BandTools.Application.Services;

public class BandService : IBandService
{
    private readonly IBandRepository _bandRepository;

    public BandService(IBandRepository bandRepository)
    {
        _bandRepository = bandRepository;
    }

    public async Task<Result<Band>> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var band = await _bandRepository.GetByIdWithDetailsAsync(id, ct);

        if (band is null)
            return Result<Band>.Failure($"Band with id {id} not found.");

        return Result<Band>.Success(band);
    }

    public async Task<Result<IReadOnlyList<Band>>> GetAllAsync(CancellationToken ct = default)
    {
        var bands = await _bandRepository.GetAllWithMembersAsync(ct);
        return Result<IReadOnlyList<Band>>.Success(bands);
    }

    public async Task<Result<Band>> CreateAsync(CreateBandDto dto, CancellationToken ct = default)
    {
        // Check for duplicate name
        var exists = await _bandRepository.Query()
            .AnyAsync(b => b.Name == dto.Name, ct);

        if (exists)
            return Result<Band>.Failure($"A band named '{dto.Name}' already exists.");

        var band = new Band
        {
            Name = dto.Name,
            Genre = dto.Genre,
            Founded = dto.Founded,
            Bio = dto.Bio,
            LogoUrl = dto.LogoUrl
        };

        await _bandRepository.AddAsync(band, ct);
        await _bandRepository.SaveChangesAsync(ct);

        return Result<Band>.Success(band);
    }

    public async Task<Result<Band>> UpdateAsync(int id, UpdateBandDto dto, CancellationToken ct = default)
    {
        var band = await _bandRepository.GetByIdAsync(id, ct);

        if (band is null)
            return Result<Band>.Failure($"Band with id {id} not found.");

        band.Name = dto.Name ?? band.Name;
        band.Genre = dto.Genre ?? band.Genre;
        band.Founded = dto.Founded ?? band.Founded;
        band.Bio = dto.Bio ?? band.Bio;
        band.LogoUrl = dto.LogoUrl ?? band.LogoUrl;

        _bandRepository.Update(band);
        await _bandRepository.SaveChangesAsync(ct);

        return Result<Band>.Success(band);
    }

    public async Task<Result> DeleteAsync(int id, CancellationToken ct = default)
    {
        var band = await _bandRepository.GetByIdAsync(id, ct);

        if (band is null)
            return Result.Failure($"Band with id {id} not found.");

        _bandRepository.Delete(band);
        await _bandRepository.SaveChangesAsync(ct);

        return Result.Success();
    }
}