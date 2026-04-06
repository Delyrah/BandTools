using BandTools.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BandTools.Controllers;

[Authorize]
public class BandsController : BaseController
{
    private readonly IBandService _bandService;

    public BandsController(IBandService bandService)
    {
        _bandService = bandService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var result = await _bandService.GetAllAsync(ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.Select(b => b.ToDto()));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _bandService.GetByIdAsync(id, ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });
        return Ok(result.Value!.ToDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBandDto dto, CancellationToken ct)
    {
        var result = await _bandService.CreateAsync(dto, ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return CreatedAtAction(nameof(GetById), new { id = result.Value!.Id }, result.Value!.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBandDto dto, CancellationToken ct)
    {
        var result = await _bandService.UpdateAsync(id, dto, ct);
        if (!result.IsSuccess) return OkOrBadRequest(result);
        return Ok(result.Value!.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _bandService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }
}