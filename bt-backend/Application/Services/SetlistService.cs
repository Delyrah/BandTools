using BandTools.Infrastructure.Persistence;

namespace BandTools.Application.Services;

public class SetlistService : ISetlistService
{
    private readonly IRepository<Setlist> _setlistRepository;
    private readonly IRepository<Track> _trackRepository;
    private readonly IRepository<SetlistTrack> _setlistTrackRepository;

    public SetlistService(
        IRepository<Setlist> setlistRepository,
        IRepository<Track> trackRepository,
        IRepository<SetlistTrack> setlistTrackRepository)
    {
        _setlistRepository = setlistRepository;
        _trackRepository = trackRepository;
        _setlistTrackRepository = setlistTrackRepository;
    }

    public async Task<Result<Setlist>> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var setlist = await _setlistRepository.Query()
            .Include(s => s.SetlistTracks)
                .ThenInclude(st => st.Track)
            .FirstOrDefaultAsync(s => s.Id == id, ct);

        if (setlist is null)
            return Result<Setlist>.Failure($"Setlist with id {id} not found.");

        return Result<Setlist>.Success(setlist);
    }

    public async Task<Result<IReadOnlyList<Setlist>>> GetByBandAsync(int bandId, CancellationToken ct = default)
    {
        var setlists = await _setlistRepository.Query()
            .Where(s => s.BandId == bandId)
            .Include(s => s.SetlistTracks)
                .ThenInclude(st => st.Track)
            .OrderByDescending(s => s.ShowDate)
            .AsNoTracking()
            .ToListAsync(ct);

        return Result<IReadOnlyList<Setlist>>.Success(setlists);
    }

    public async Task<Result<Setlist>> CreateAsync(CreateSetlistDto dto, CancellationToken ct = default)
    {
        var setlist = new Setlist
        {
            BandId = dto.BandId,
            Name = dto.Name,
            ShowDate = dto.ShowDate,
            Venue = dto.Venue,
            Notes = dto.Notes,
            Status = dto.Status
        };

        await _setlistRepository.AddAsync(setlist, ct);
        await _setlistRepository.SaveChangesAsync(ct);

        return Result<Setlist>.Success(setlist);
    }

    public async Task<Result<Setlist>> UpdateAsync(int id, UpdateSetlistDto dto, CancellationToken ct = default)
    {
        var setlist = await _setlistRepository.GetByIdAsync(id, ct);

        if (setlist is null)
            return Result<Setlist>.Failure($"Setlist with id {id} not found.");

        setlist.Name = dto.Name ?? setlist.Name;
        setlist.ShowDate = dto.ShowDate ?? setlist.ShowDate;
        setlist.Venue = dto.Venue ?? setlist.Venue;
        setlist.Notes = dto.Notes ?? setlist.Notes;
        setlist.Status = dto.Status ?? setlist.Status;

        _setlistRepository.Update(setlist);
        await _setlistRepository.SaveChangesAsync(ct);

        return Result<Setlist>.Success(setlist);
    }

    public async Task<Result> DeleteAsync(int id, CancellationToken ct = default)
    {
        var setlist = await _setlistRepository.GetByIdAsync(id, ct);

        if (setlist is null)
            return Result.Failure($"Setlist with id {id} not found.");

        _setlistRepository.Delete(setlist);
        await _setlistRepository.SaveChangesAsync(ct);

        return Result.Success();
    }

    public async Task<Result<Setlist>> AddTrackAsync(int setlistId, AddSetlistTrackDto dto, CancellationToken ct = default)
    {
        var setlist = await _setlistRepository.GetByIdAsync(setlistId, ct);

        if (setlist is null)
            return Result<Setlist>.Failure($"Setlist with id {setlistId} not found.");

        var trackExists = await _trackRepository.Query()
            .AnyAsync(t => t.Id == dto.TrackId, ct);

        if (!trackExists)
            return Result<Setlist>.Failure($"Track with id {dto.TrackId} not found.");

        // Check position isn't already taken
        var positionTaken = await _setlistTrackRepository.Query()
            .AnyAsync(st => st.SetlistId == setlistId && st.Position == dto.Position, ct);

        if (positionTaken)
            return Result<Setlist>.Failure($"Position {dto.Position} is already taken in this setlist.");

        // Check track isn't already in this setlist
        var alreadyAdded = await _setlistTrackRepository.Query()
            .AnyAsync(st => st.SetlistId == setlistId && st.TrackId == dto.TrackId, ct);

        if (alreadyAdded)
            return Result<Setlist>.Failure("This track is already in the setlist.");

        var setlistTrack = new SetlistTrack
        {
            SetlistId = setlistId,
            TrackId = dto.TrackId,
            Position = dto.Position,
            Notes = dto.Notes
        };

        await _setlistTrackRepository.AddAsync(setlistTrack, ct);
        await _setlistTrackRepository.SaveChangesAsync(ct);

        return await GetByIdAsync(setlistId, ct);
    }

    public async Task<Result<Setlist>> RemoveTrackAsync(int setlistId, int trackId, CancellationToken ct = default)
    {
        var setlistTrack = await _setlistTrackRepository.Query()
            .FirstOrDefaultAsync(st => st.SetlistId == setlistId && st.TrackId == trackId, ct);

        if (setlistTrack is null)
            return Result<Setlist>.Failure("Track is not in this setlist.");

        _setlistTrackRepository.Delete(setlistTrack);
        await _setlistTrackRepository.SaveChangesAsync(ct);

        return await GetByIdAsync(setlistId, ct);
    }

    public async Task<Result<Setlist>> ReorderTracksAsync(int setlistId, List<AddSetlistTrackDto> dto, CancellationToken ct = default)
    {
        var setlist = await _setlistRepository.GetByIdAsync(setlistId, ct);

        if (setlist is null)
            return Result<Setlist>.Failure($"Setlist with id {setlistId} not found.");

        // Positions must be unique in the incoming list
        var positions = dto.Select(d => d.Position).ToList();
        if (positions.Distinct().Count() != positions.Count)
            return Result<Setlist>.Failure("Duplicate positions in reorder request.");

        var existingTracks = await _setlistTrackRepository.Query()
            .Where(st => st.SetlistId == setlistId)
            .ToListAsync(ct);

        // Every track in the request must already be in the setlist
        var incomingTrackIds = dto.Select(d => d.TrackId).ToHashSet();
        var existingTrackIds = existingTracks.Select(st => st.TrackId).ToHashSet();

        if (!incomingTrackIds.SetEquals(existingTrackIds))
            return Result<Setlist>.Failure(
                "Reorder request must include all tracks currently in the setlist — no additions or removals.");

        // Apply new positions
        foreach (var existingTrack in existingTracks)
        {
            var newPosition = dto.First(d => d.TrackId == existingTrack.TrackId).Position;
            existingTrack.Position = newPosition;
            _setlistTrackRepository.Update(existingTrack);
        }

        await _setlistTrackRepository.SaveChangesAsync(ct);

        return await GetByIdAsync(setlistId, ct);
    }
}