using Microsoft.AspNetCore.Mvc;

namespace BandTools.Controllers;

[Authorize]
public class SetlistsController : BaseController
{
    private readonly ISetlistService _setlistService;

    public SetlistsController(ISetlistService setlistService)
    {
        _setlistService = setlistService;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _setlistService.GetByIdAsync(id, ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });
        return Ok(result.Value!.ToDto());
    }

    [HttpGet("band/{bandId:int}")]
    public async Task<IActionResult> GetByBand(int bandId, CancellationToken ct)
    {
        var result = await _setlistService.GetByBandAsync(bandId, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.Select(s => s.ToDto()));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSetlistDto dto, CancellationToken ct)
    {
        var result = await _setlistService.CreateAsync(dto, ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return CreatedAtAction(nameof(GetById), new { id = result.Value!.Id }, result.Value!.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSetlistDto dto, CancellationToken ct)
    {
        var result = await _setlistService.UpdateAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _setlistService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }

    [HttpPost("{id:int}/tracks")]
    public async Task<IActionResult> AddTrack(int id, [FromBody] AddSetlistTrackDto dto, CancellationToken ct)
    {
        var result = await _setlistService.AddTrackAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}/tracks/{trackId:int}")]
    public async Task<IActionResult> RemoveTrack(int id, int trackId, CancellationToken ct)
    {
        var result = await _setlistService.RemoveTrackAsync(id, trackId, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpPut("{id:int}/tracks/reorder")]
    public async Task<IActionResult> ReorderTracks(int id, [FromBody] List<AddSetlistTrackDto> dto, CancellationToken ct)
    {
        var result = await _setlistService.ReorderTracksAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }
}