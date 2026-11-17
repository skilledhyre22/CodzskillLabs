using Carter;
using InstituteMigSystem.Api.MiddleWare.ResultResponseMiddleWare;

namespace CodzSkillLabs.API.MiddleWare
{
    public static class RequestPipeLine
    {
        public static WebApplication UseCustomMiddleWare(this WebApplication app)
        {

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.MapCarter();

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.UseResultResponseMiddleware();

            app.Run();

            return app;
        }
    }
}
