using BandTools.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BandTools.Controllers;

[Authorize]
public class TracksController : BaseController
{
    private readonly ITrackService _trackService;

    public TracksController(ITrackService trackService)
    {
        _trackService = trackService;
    }

    // GET api/tracks/5
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _trackService.GetByIdAsync(id, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    // GET api/tracks/band/5
    [HttpGet("band/{bandId:int}")]
    public async Task<IActionResult> GetByBand(int bandId, CancellationToken ct)
    {
        var result = await _trackService.GetByBandAsync(bandId, ct);
        return OkOrBadRequest(result);
    }

    // POST api/tracks
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTrackDto dto, CancellationToken ct)
    {
        var result = await _trackService.CreateAsync(dto, ct);
        return CreatedOrBadRequest(result, nameof(GetById), new { id = result.Value?.Id });
    }

    // PUT api/tracks/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTrackDto dto, CancellationToken ct)
    {
        var result = await _trackService.UpdateAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }

    // DELETE api/tracks/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _trackService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }
}