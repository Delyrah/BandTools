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

    // GET api/setlists/5
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _setlistService.GetByIdAsync(id, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    // GET api/setlists/band/5
    [HttpGet("band/{bandId:int}")]
    public async Task<IActionResult> GetByBand(int bandId, CancellationToken ct)
    {
        var result = await _setlistService.GetByBandAsync(bandId, ct);
        return OkOrBadRequest(result);
    }

    // POST api/setlists
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSetlistDto dto, CancellationToken ct)
    {
        var result = await _setlistService.CreateAsync(dto, ct);
        return CreatedOrBadRequest(result, nameof(GetById), new { id = result.Value?.Id });
    }

    // PUT api/setlists/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSetlistDto dto, CancellationToken ct)
    {
        var result = await _setlistService.UpdateAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }

    // DELETE api/setlists/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _setlistService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }

    // POST api/setlists/5/tracks
    [HttpPost("{id:int}/tracks")]
    public async Task<IActionResult> AddTrack(int id, [FromBody] AddSetlistTrackDto dto, CancellationToken ct)
    {
        var result = await _setlistService.AddTrackAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }

    // DELETE api/setlists/5/tracks/2
    [HttpDelete("{id:int}/tracks/{trackId:int}")]
    public async Task<IActionResult> RemoveTrack(int id, int trackId, CancellationToken ct)
    {
        var result = await _setlistService.RemoveTrackAsync(id, trackId, ct);
        return OkOrBadRequest(result);
    }

    // PUT api/setlists/5/tracks/reorder
    // Accepts a list of { trackId, position } to reorder the whole setlist at once
    [HttpPut("{id:int}/tracks/reorder")]
    public async Task<IActionResult> ReorderTracks(int id, [FromBody] List<AddSetlistTrackDto> dto, CancellationToken ct)
    {
        var result = await _setlistService.ReorderTracksAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }
}