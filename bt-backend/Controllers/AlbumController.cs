using Microsoft.AspNetCore.Mvc;

namespace BandTools.Controllers;

[Authorize]
public class AlbumsController : BaseController
{
    private readonly IAlbumService _albumService;

    public AlbumsController(IAlbumService albumService)
    {
        _albumService = albumService;
    }

    // GET api/albums/5
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _albumService.GetByIdAsync(id, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    // GET api/albums/band/5
    [HttpGet("band/{bandId:int}")]
    public async Task<IActionResult> GetByBand(int bandId, CancellationToken ct)
    {
        var result = await _albumService.GetByBandAsync(bandId, ct);
        return OkOrBadRequest(result);
    }

    // POST api/albums
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAlbumDto dto, CancellationToken ct)
    {
        var result = await _albumService.CreateAsync(dto, ct);
        return CreatedOrBadRequest(result, nameof(GetById), new { id = result.Value?.Id });
    }

    // PUT api/albums/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAlbumDto dto, CancellationToken ct)
    {
        var result = await _albumService.UpdateAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }

    // DELETE api/albums/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _albumService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }

    // POST api/albums/5/tracks
    [HttpPost("{id:int}/tracks")]
    public async Task<IActionResult> AddTrack(int id, [FromBody] AddAlbumTrackDto dto, CancellationToken ct)
    {
        var result = await _albumService.AddTrackAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }

    // DELETE api/albums/5/tracks/2
    [HttpDelete("{id:int}/tracks/{trackId:int}")]
    public async Task<IActionResult> RemoveTrack(int id, int trackId, CancellationToken ct)
    {
        var result = await _albumService.RemoveTrackAsync(id, trackId, ct);
        return OkOrBadRequest(result);
    }
}