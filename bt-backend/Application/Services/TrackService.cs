using BandTools.Application.Services.Common;
using BandTools.Infrastructure.Persistence;

namespace BandTools.Application.Services;

public class TrackService : ITrackService
{
    private readonly IRepository<Track> _trackRepository;
    private readonly IRepository<Band> _bandRepository;

    public TrackService(IRepository<Track> trackRepository, IRepository<Band> bandRepository)
    {
        _trackRepository = trackRepository;
        _bandRepository = bandRepository;
    }

    public async Task<Result<Track>> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var track = await _trackRepository.GetByIdAsync(id, ct);

        if (track is null)
            return Result<Track>.Failure($"Track with id {id} not found.");

        return Result<Track>.Success(track);
    }

    public async Task<Result<IReadOnlyList<Track>>> GetByBandAsync(int bandId, CancellationToken ct = default)
    {
        var bandExists = await _bandRepository.Query()
            .AnyAsync(b => b.Id == bandId, ct);

        if (!bandExists)
            return Result<IReadOnlyList<Track>>.Failure($"Band with id {bandId} not found.");

        var tracks = await _trackRepository.Query()
            .Where(t => t.BandId == bandId)
            .AsNoTracking()
            .ToListAsync(ct);

        return Result<IReadOnlyList<Track>>.Success(tracks);
    }

    public async Task<Result<Track>> CreateAsync(CreateTrackDto dto, CancellationToken ct = default)
    {
        var bandExists = await _bandRepository.Query()
            .AnyAsync(b => b.Id == dto.BandId, ct);

        if (!bandExists)
            return Result<Track>.Failure($"Band with id {dto.BandId} not found.");

        var track = new Track
        {
            BandId = dto.BandId,
            Title = dto.Title,
            DurationSeconds = dto.DurationSeconds,
            BPM = dto.BPM,
            Key = dto.Key,
            Lyrics = dto.Lyrics,
            Notes = dto.Notes,
            Status = dto.Status
        };

        await _trackRepository.AddAsync(track, ct);
        await _trackRepository.SaveChangesAsync(ct);

        return Result<Track>.Success(track);
    }

    public async Task<Result<Track>> UpdateAsync(int id, UpdateTrackDto dto, CancellationToken ct = default)
    {
        var track = await _trackRepository.GetByIdAsync(id, ct);

        if (track is null)
            return Result<Track>.Failure($"Track with id {id} not found.");

        track.Title = dto.Title ?? track.Title;
        track.DurationSeconds = dto.DurationSeconds ?? track.DurationSeconds;
        track.BPM = dto.BPM ?? track.BPM;
        track.Key = dto.Key ?? track.Key;
        track.Lyrics = dto.Lyrics ?? track.Lyrics;
        track.Notes = dto.Notes ?? track.Notes;
        track.Status = dto.Status ?? track.Status;

        _trackRepository.Update(track);
        await _trackRepository.SaveChangesAsync(ct);

        return Result<Track>.Success(track);
    }

    public async Task<Result> DeleteAsync(int id, CancellationToken ct = default)
    {
        var track = await _trackRepository.GetByIdAsync(id, ct);

        if (track is null)
            return Result.Failure($"Track with id {id} not found.");

        _trackRepository.Delete(track);
        await _trackRepository.SaveChangesAsync(ct);

        return Result.Success();
    }
}