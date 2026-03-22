namespace BandTools.Application.Services.Common;

public enum ErrorType
{
    None,
    NotFound,
    Conflict,
    Unauthorized,
    ValidationFailure,
    Failure
}

public class Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? Error { get; }
    public ErrorType ErrorType { get; }

    private Result(T value)
    { 
        IsSuccess = true; 
        Value = value; 
    }

    private Result(string error, ErrorType errorType)
    {
        IsSuccess = false;
        Error = error;
        ErrorType = errorType;
    }

    public static Result<T> Success(T value) => new(value);
    public static Result<T> Failure(string error) => new(error, ErrorType.Failure);
    public static Result<T> NotFound(string error) => new(error, ErrorType.NotFound);
    public static Result<T> Conflict(string error) => new(error, ErrorType.Conflict);
    public static Result<T> Unauthorized(string error) => new(error, ErrorType.Unauthorized);
}

// Non-generic version for operations that don't return a value
public class Result
{
    public bool IsSuccess { get; }
    public string? Error { get; }
    public ErrorType ErrorType { get; }

    private Result(bool success, string? error) { IsSuccess = success; Error = error; }
    private Result(bool success, string error, ErrorType errorType)
    {
        IsSuccess = false;
        Error = error;
        ErrorType = errorType;
    }

    public static Result Success() => new(true, null);
    public static Result Failure(string error) => new(false, error, ErrorType.Failure);
    public static Result NotFound(string error) => new(false, error, ErrorType.NotFound);
    public static Result Conflict(string error) => new(false, error, ErrorType.Conflict);
    public static Result Unauthorized(string error) => new(false, error, ErrorType.Unauthorized);
}