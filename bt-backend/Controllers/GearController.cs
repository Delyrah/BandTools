using BandTools.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BandTools.Controllers;

[Authorize]
public class GearController : BaseController
{
    private readonly IGearService _gearService;

    public GearController(IGearService gearService)
    {
        _gearService = gearService;
    }

    [HttpGet("for/{bandId:int}")]
    public async Task<IActionResult> GetAll(int bandId, CancellationToken ct)
    {
        var result = await _gearService.GetByBandAsync(bandId, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.Select(g => g.ToDto()));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _gearService.GetByIdAsync(id, ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });
        return Ok(result.Value!.ToDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateGearDto dto, CancellationToken ct)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await _gearService.CreateAsync(dto, ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return CreatedAtAction(nameof(GetById), new { id = result.Value!.Id }, result.Value!.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateGearDto dto, CancellationToken ct)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var result = await _gearService.UpdateAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _gearService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }
}