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

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _trackService.GetByIdAsync(id, ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });
        return Ok(result.Value!.ToDto());
    }

    [HttpGet("band/{bandId:int}")]
    public async Task<IActionResult> GetByBand(int bandId, CancellationToken ct)
    {
        var result = await _trackService.GetByBandAsync(bandId, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.Select(t => t.ToDto()));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTrackDto dto, CancellationToken ct)
    {
        var result = await _trackService.CreateAsync(dto, ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return CreatedAtAction(nameof(GetById), new { id = result.Value!.Id }, result.Value!.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTrackDto dto, CancellationToken ct)
    {
        var result = await _trackService.UpdateAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _trackService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }
}