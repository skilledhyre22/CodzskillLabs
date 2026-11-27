using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortByCourseId
{
    public class GetCohortByCourseIdHandler(ICohortRepository cohortRepository,IHttpContextService httpContextService,ICourseRepository courseRepository) : IRequestHandler<GetCohortByCourseIdQuery, Result<IEnumerable<CohortResponse>>>
    {
        public async Task<Result<IEnumerable<CohortResponse>>> Handle(GetCohortByCourseIdQuery request, CancellationToken cancellationToken)
        {
            var course = await courseRepository.GetByIdAsync(request.id);

            if (course is null)
            {
                return Result<IEnumerable<CohortResponse>>.Failure("Course not found", 404);

            }
            if (course.UserId != httpContextService.GetUserId())
            {
                return Result<IEnumerable<CohortResponse>>.Failure("You are not authorized to access this course", 403);
            }
            var cohorts = await cohortRepository.GetCohortsByCourseId(course.Id);
            if(cohorts is not null)
            {
                return Result<IEnumerable<CohortResponse>>.Success(cohorts, "Cohorts By Courses Fetched", 200);
            }
            return Result<IEnumerable<CohortResponse>>.Failure("No Cohorts Found",500);
        }
    }
}
