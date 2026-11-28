using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortByCourseId;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

public class GetCohortByCourseIdHandler(
    ICohortRepository cohortRepository,
    IHttpContextService httpContextService,
    ICourseRepository courseRepository)
    : IRequestHandler<GetCohortByCourseIdQuery, Result<IEnumerable<CohortResponse>>>
{
    public async Task<Result<IEnumerable<CohortResponse>>> Handle(
        GetCohortByCourseIdQuery request,
        CancellationToken cancellationToken)
    {
        var userId = httpContextService.GetUserId();

        var course = await courseRepository.GetByIdAsync(request.id);

        if (course is null)
        {
            return Result<IEnumerable<CohortResponse>>.Failure(
                "Course not found", 404);
        }

     
        if (!httpContextService.IsInRole("SuperAdmin") &&
            course.UserId != userId)
        {
            return Result<IEnumerable<CohortResponse>>.Failure(
                "You are not authorized to access this course", 403);
        }

        var cohorts = await cohortRepository.GetCohortsByCourseId(
            course.Id, userId);

        return Result<IEnumerable<CohortResponse>>.Success(
            cohorts, "Cohorts By Course Fetched", 200);
    }
}