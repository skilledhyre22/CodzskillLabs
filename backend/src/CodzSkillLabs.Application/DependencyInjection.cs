using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CodzSkillLabs.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg => { },typeof(AssemblyMarker.AssemblyMarker));
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<ITrainerService, TrainerService>();
            return services;
        }
    }
}
