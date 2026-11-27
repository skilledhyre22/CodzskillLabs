using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Features.Courses.Queries.GetAllCourses;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetAllCohorts
{
    public class GetAllCohortsHandler(ICohortRepository cohortRepository,IMapper mapper) : IRequestHandler<GetAllCohortsQuery, Result<IEnumerable<CohortResponse>>>
    {
        public async Task<Result<IEnumerable<CohortResponse>>> Handle(GetAllCohortsQuery request, CancellationToken cancellationToken)
        {
            var cohorts = await cohortRepository.GetAllCohorts();
            if (cohorts is not null && cohorts.Any())
            {
                return Result<IEnumerable<CohortResponse>>.Success(cohorts, "All Cohorts Fetched Successfully", 200); ;
            }
            return Result<IEnumerable<CohortResponse>>.Failure("No Cohorts Fetched Try Again later",500); ;
        }
    }
}
