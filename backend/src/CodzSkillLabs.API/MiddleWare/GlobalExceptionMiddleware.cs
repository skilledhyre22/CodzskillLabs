using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Domain.Entitites;
using Microsoft.AspNetCore.Diagnostics;

public sealed class GlobalExceptionMiddleware(
    IServiceScopeFactory scopeFactory,
    ILogger<GlobalExceptionMiddleware> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        
        logger.LogError(
            exception,
            "An unhandled exception occurred. TraceId: {TraceId}",
            httpContext.TraceIdentifier);

        var errorLog = new ErrorLog
        {
            Message = exception.Message,
            StackTrace = exception.StackTrace,
            RequestPath = httpContext.Request.Path,
            InnerException = exception.InnerException?.ToString(),
            Source = exception.Source,
            RequestMethod = httpContext.Request.Method,
            TraceId = httpContext.TraceIdentifier,
            StatusCode = StatusCodes.Status500InternalServerError
        };

        await using var scope = scopeFactory.CreateAsyncScope();

        var repository = scope.ServiceProvider
            .GetRequiredService<IErrorLogRepository>();

        var unitOfWork = scope.ServiceProvider
            .GetRequiredService<IUnitOfWork>();

        await repository.AddAsync(errorLog);
        await unitOfWork.SaveChangesAsync();

        httpContext.Response.StatusCode = 500;

        await httpContext.Response.WriteAsJsonAsync(new
        {
            message = "Something went wrong. Please try again later.",
            traceId = httpContext.TraceIdentifier
        }, cancellationToken);

        return true;
    }
}