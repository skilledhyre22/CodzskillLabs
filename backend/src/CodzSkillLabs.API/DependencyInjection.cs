using System.Text;
using Carter;
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
            services.AddControllers();
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
            });
            services.AddAuthorization();
            
            return services;
        }
    }
}
