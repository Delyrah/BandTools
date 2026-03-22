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

    // GET api/bands
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var result = await _bandService.GetAllAsync(ct);
        return OkOrBadRequest(result);
    }

    // GET api/bands/5
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var result = await _bandService.GetByIdAsync(id, ct);

        if (!result.IsSuccess)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    // POST api/bands
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBandDto dto, CancellationToken ct)
    {
        var result = await _bandService.CreateAsync(dto, ct);
        return CreatedOrBadRequest(result, nameof(GetById), new { id = result.Value?.Id });
    }

    // PUT api/bands/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBandDto dto, CancellationToken ct)
    {
        var result = await _bandService.UpdateAsync(id, dto, ct);
        return OkOrBadRequest(result);
    }

    // DELETE api/bands/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var result = await _bandService.DeleteAsync(id, ct);
        return OkOrBadRequest(result);
    }
}