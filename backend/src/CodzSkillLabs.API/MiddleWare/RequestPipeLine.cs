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

            app.UseCors(options =>
            {
                options.SetIsOriginAllowed(_ => true).AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            });

            app.UseHttpsRedirection();

            app.UseRateLimiter();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseAuthorization();

            

            app.MapControllers();

            app.UseExceptionHandler();

            app.UseResultResponseMiddleware();

            app.Run();

            return app;
        }
    }
}
