using System.Text;
using System.Threading.RateLimiting;
using Carter;
using CodzSkillLabs.API.MiddleWare;
using CodzSkillLabs.Application;
using CodzSkillLabs.InfraStructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CodzSkillLabs.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApiService(this IServiceCollection services,IConfiguration configuration)
        {
           services.AddCarter();
            services.AddCors();
            services.AddControllers();
            services.AddExceptionHandler<GlobalExceptionMiddleware>();
            services.AddProblemDetails();
            services.AddRateLimiter(options =>
            {
                
                options.AddPolicy("RegisterPolicy", httpContext =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                        factory: _ => new FixedWindowRateLimiterOptions
                        {
                            PermitLimit = 3,
                            Window = TimeSpan.FromSeconds(2),
                            QueueLimit = 0,
                            AutoReplenishment = true
                        }));

                
                options.AddPolicy("LoginPolicy", httpContext =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                        factory: _ => new FixedWindowRateLimiterOptions
                        {
                            PermitLimit = 3,
                            Window = TimeSpan.FromSeconds(2),
                            QueueLimit = 0,
                            AutoReplenishment = true
                        }));

                
                options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

                options.OnRejected = async (context, cancellationToken) =>
                {
                    context.HttpContext.Response.ContentType = "application/json";

                    await context.HttpContext.Response.WriteAsJsonAsync(
                        new
                        {
                            statusCode = 429,
                            message = "Too many requests. Please try again later."
                        },
                        cancellationToken);
                };
            });

            services.AddOpenApi();
           services.AddHttpContextAccessor();
           services.AddPersistanceService(configuration).AddApplicationService();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme= JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:Audience"],
                    ValidateIssuer= true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["JWT:Key"]!)),
                };
            }).AddGoogle(options =>
            {
                options.ClientId = configuration["GoogleAuth:ClientId"]!;
                options.ClientSecret = configuration["GoogleAuth:ClientSecret"]!;
            });
            services.AddAuthorization();
            
            return services;
        }
    }
}
