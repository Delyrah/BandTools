using BandTools.Infrastructure.Persistence;

namespace BandTools.Application.Services;

public class GearService : IGearService
{
    private readonly IRepository<Gear> _gearRepository;

    public GearService(IRepository<Gear> gearRepository)
    {
        _gearRepository = gearRepository;
    }

    public async Task<Result<Gear>> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var gear = await _gearRepository.Query()
            .FirstOrDefaultAsync(a => a.Id == id, ct);

        if (gear is null)
            return Result<Gear>.Failure($"Gear with id {id} not found.");

        return Result<Gear>.Success(gear);
    }

    public async Task<Result<IReadOnlyList<Gear>>> GetByBandAsync(int bandId, CancellationToken ct = default)
    {
        var gears = await _gearRepository.Query()
            .Where(a => a.BandId == bandId)
            .AsNoTracking()
            .ToListAsync(ct);

        return Result<IReadOnlyList<Gear>>.Success(gears);
    }

    public async Task<Result<Gear>> CreateAsync(CreateGearDto dto, CancellationToken ct = default)
    {
        var bandExists = await _gearRepository.Query()
            .AnyAsync(a => a.BandId == dto.BandId, ct);

        // Check via track repository instead — album repo won't have bands
        var gear = new Gear
        {
            BandId = dto.BandId,
            OwnerId = dto.OwnerId,
            Name = dto.Name,
            Type = dto.Type,
            Brand = dto.Brand,
            Model = dto.Model,
            SerialNumber = dto.SerialNumber,
            Value = dto.Value,
            PhotoUrl = dto.PhotoUrl,
            Notes = dto.Notes,
            Weight = dto.Weight,
            Dimensions = dto.Dimensions
        };

        await _gearRepository.AddAsync(gear, ct);
        await _gearRepository.SaveChangesAsync(ct);

        return Result<Gear>.Success(gear);
    }

    public async Task<Result<Gear>> UpdateAsync(int id, UpdateGearDto dto, CancellationToken ct = default)
    {
        var gear = await _gearRepository.GetByIdAsync(id, ct);

        if (gear is null)
            return Result<Gear>.Failure($"Gear with id {id} not found.");

        gear.OwnerId = dto.OwnerId ?? gear.OwnerId;
        gear.Name = dto.Name ?? gear.Name;
        gear.Type = dto.Type ?? gear.Type;
        gear.Brand = dto.Brand ?? gear.Brand;
        gear.Model = dto.Model ?? gear.Model;
        gear.SerialNumber = dto.SerialNumber ?? gear.SerialNumber;
        gear.Value = dto.Value ?? gear.Value;
        gear.PhotoUrl = dto.PhotoUrl ?? gear.PhotoUrl;
        gear.Notes = dto.Notes ?? gear.Notes;
        gear.Weight = dto.Weight ?? gear.Weight;
        gear.Dimensions = dto.Dimensions ?? gear.Dimensions;

        _gearRepository.Update(gear);
        await _gearRepository.SaveChangesAsync(ct);

        return Result<Gear>.Success(gear);
    }

    public async Task<Result> DeleteAsync(int id, CancellationToken ct = default)
    {
        var gear = await _gearRepository.GetByIdAsync(id, ct);

        if (gear is null)
            return Result.Failure($"Gear with id {id} not found.");

        _gearRepository.Delete(gear);
        await _gearRepository.SaveChangesAsync(ct);

        return Result.Success();
    }
}