using BandTools.Application.Services.Common;
using Microsoft.AspNetCore.Mvc;

namespace BandTools.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected IActionResult OkOrBadRequest<T>(Result<T> result)
        => result.IsSuccess ? Ok(result.Value) : ErrorRequest(result.Error!, result.ErrorType);

    protected IActionResult OkOrBadRequest(Result result)
        => result.IsSuccess ? Ok() : ErrorRequest(result.Error!, result.ErrorType);

    protected IActionResult CreatedOrBadRequest<T>(Result<T> result, string actionName, object routeValues)
        => result.IsSuccess
            ? CreatedAtAction(actionName, routeValues, result.Value)
            : ErrorRequest(result.Error!, result.ErrorType);
    protected IActionResult ErrorRequest(string error, ErrorType errorType) => errorType switch
    {
        ErrorType.NotFound => NotFound(new { error }),
        ErrorType.Conflict => Conflict(new { error }),
        ErrorType.Unauthorized => Unauthorized(new { error }),
        ErrorType.ValidationFailure => BadRequest(new { error }),
        _ => BadRequest(new { error })
    };
}