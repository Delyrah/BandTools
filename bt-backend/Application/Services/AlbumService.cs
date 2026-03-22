using BandTools.Infrastructure.Persistence;

namespace BandTools.Application.Services;

public class AlbumService : IAlbumService
{
    private readonly IRepository<Album> _albumRepository;
    private readonly IRepository<Track> _trackRepository;
    private readonly IRepository<AlbumTrack> _albumTrackRepository;

    public AlbumService(
        IRepository<Album> albumRepository,
        IRepository<Track> trackRepository,
        IRepository<AlbumTrack> albumTrackRepository)
    {
        _albumRepository = albumRepository;
        _trackRepository = trackRepository;
        _albumTrackRepository = albumTrackRepository;
    }

    public async Task<Result<Album>> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var album = await _albumRepository.Query()
            .Include(a => a.AlbumTracks)
                .ThenInclude(at => at.Track)
            .FirstOrDefaultAsync(a => a.Id == id, ct);

        if (album is null)
            return Result<Album>.Failure($"Album with id {id} not found.");

        return Result<Album>.Success(album);
    }

    public async Task<Result<IReadOnlyList<Album>>> GetByBandAsync(int bandId, CancellationToken ct = default)
    {
        var albums = await _albumRepository.Query()
            .Where(a => a.BandId == bandId)
            .Include(a => a.AlbumTracks)
                .ThenInclude(at => at.Track)
            .AsNoTracking()
            .ToListAsync(ct);

        return Result<IReadOnlyList<Album>>.Success(albums);
    }

    public async Task<Result<Album>> CreateAsync(CreateAlbumDto dto, CancellationToken ct = default)
    {
        var bandExists = await _albumRepository.Query()
            .AnyAsync(a => a.BandId == dto.BandId, ct);

        // Check via track repository instead — album repo won't have bands
        var album = new Album
        {
            BandId = dto.BandId,
            Title = dto.Title,
            ReleaseDate = dto.ReleaseDate,
            CoverImageUrl = dto.CoverImageUrl,
            Type = dto.Type,
            Description = dto.Description
        };

        await _albumRepository.AddAsync(album, ct);
        await _albumRepository.SaveChangesAsync(ct);

        return Result<Album>.Success(album);
    }

    public async Task<Result<Album>> UpdateAsync(int id, UpdateAlbumDto dto, CancellationToken ct = default)
    {
        var album = await _albumRepository.GetByIdAsync(id, ct);

        if (album is null)
            return Result<Album>.Failure($"Album with id {id} not found.");

        album.Title = dto.Title ?? album.Title;
        album.ReleaseDate = dto.ReleaseDate ?? album.ReleaseDate;
        album.CoverImageUrl = dto.CoverImageUrl ?? album.CoverImageUrl;
        album.Type = dto.Type ?? album.Type;
        album.Description = dto.Description ?? album.Description;

        _albumRepository.Update(album);
        await _albumRepository.SaveChangesAsync(ct);

        return Result<Album>.Success(album);
    }

    public async Task<Result> DeleteAsync(int id, CancellationToken ct = default)
    {
        var album = await _albumRepository.GetByIdAsync(id, ct);

        if (album is null)
            return Result.Failure($"Album with id {id} not found.");

        _albumRepository.Delete(album);
        await _albumRepository.SaveChangesAsync(ct);

        return Result.Success();
    }

    public async Task<Result<Album>> AddTrackAsync(int albumId, AddAlbumTrackDto dto, CancellationToken ct = default)
    {
        var album = await _albumRepository.GetByIdAsync(albumId, ct);

        if (album is null)
            return Result<Album>.Failure($"Album with id {albumId} not found.");

        var trackExists = await _trackRepository.Query()
            .AnyAsync(t => t.Id == dto.TrackId, ct);

        if (!trackExists)
            return Result<Album>.Failure($"Track with id {dto.TrackId} not found.");

        // Check that track number isn't already taken on this disc
        var slotTaken = await _albumTrackRepository.Query()
            .AnyAsync(at =>
                at.AlbumId == albumId &&
                at.TrackNumber == dto.TrackNumber &&
                at.DiscNumber == dto.DiscNumber, ct);

        if (slotTaken)
            return Result<Album>.Failure(
                $"Track number {dto.TrackNumber} on disc {dto.DiscNumber ?? 1} is already taken.");

        // Check track isn't already on this album
        var alreadyAdded = await _albumTrackRepository.Query()
            .AnyAsync(at => at.AlbumId == albumId && at.TrackId == dto.TrackId, ct);

        if (alreadyAdded)
            return Result<Album>.Failure("This track is already on the album.");

        var albumTrack = new AlbumTrack
        {
            AlbumId = albumId,
            TrackId = dto.TrackId,
            TrackNumber = dto.TrackNumber,
            DiscNumber = dto.DiscNumber
        };

        await _albumTrackRepository.AddAsync(albumTrack, ct);
        await _albumTrackRepository.SaveChangesAsync(ct);

        return await GetByIdAsync(albumId, ct);
    }

    public async Task<Result<Album>> RemoveTrackAsync(int albumId, int trackId, CancellationToken ct = default)
    {
        var albumTrack = await _albumTrackRepository.Query()
            .FirstOrDefaultAsync(at => at.AlbumId == albumId && at.TrackId == trackId, ct);

        if (albumTrack is null)
            return Result<Album>.Failure("Track is not on this album.");

        _albumTrackRepository.Delete(albumTrack);
        await _albumTrackRepository.SaveChangesAsync(ct);

        return await GetByIdAsync(albumId, ct);
    }
}