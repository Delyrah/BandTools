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

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _albumService.GetByIdAsync(id, ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });
        return Ok(result.Value!.ToDto());
    }

    [HttpGet("band/{bandId:int}")]
    public async Task<IActionResult> GetByBand(int bandId, CancellationToken ct)
    {
        var result = await _albumService.GetByBandAsync(bandId, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.Select(a => a.ToDto()));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAlbumDto dto, CancellationToken ct)
    {
        var result = await _albumService.CreateAsync(dto, ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return CreatedAtAction(nameof(GetById), new { id = result.Value!.Id }, result.Value!.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAlbumDto dto, CancellationToken ct)
    {
        var result = await _albumService.UpdateAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _albumService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }

    [HttpPost("{id:int}/tracks")]
    public async Task<IActionResult> AddTrack(int id, [FromBody] AddAlbumTrackDto dto, CancellationToken ct)
    {
        var result = await _albumService.AddTrackAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}/tracks/{trackId:int}")]
    public async Task<IActionResult> RemoveTrack(int id, int trackId, CancellationToken ct)
    {
        var result = await _albumService.RemoveTrackAsync(id, trackId, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }
}