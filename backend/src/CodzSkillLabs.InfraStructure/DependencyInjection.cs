using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IAppEncryption;
using CodzSkillLabs.Application.Interfaces.IJWTProvider;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.InfraStructure.Data;
using CodzSkillLabs.InfraStructure.Identity;
using CodzSkillLabs.InfraStructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CodzSkillLabs.InfraStructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistanceService(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<CodzSkillLabsDbContext>(options =>
            {
                options.UseSqlServer(
                    configuration.GetConnectionString(
                        nameof(CodzSkillLabsDbContext)));
            });

            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IAppEncryption, AppEncryption.AppEncryption>();
            services.AddScoped<IHttpContextService, HttpContextService>();
            services.AddScoped<IJWTProvider, JWTProvider.JWTProvider>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ITrainerRepository, TrainerRepository>();

            return services;
        }
    }
}
