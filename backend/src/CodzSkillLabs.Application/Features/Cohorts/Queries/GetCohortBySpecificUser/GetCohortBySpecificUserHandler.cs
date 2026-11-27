using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortBySpecificUser
{
    public class GetCohortBySpecificUserHandler(ICohortRepository cohortRepository,IHttpContextService httpContextService) : IRequestHandler<GetCohortBySpecificUserQuery, Result<IEnumerable<CohortResponse>>>
    {
        public async Task<Result<IEnumerable<CohortResponse>>> Handle(GetCohortBySpecificUserQuery request, CancellationToken cancellationToken)
        {
            var userid = httpContextService.GetUserId();
            var cohorts = await cohortRepository.GetCohortsByUserId(userid);
            if(cohorts is not null)
            {
                return Result<IEnumerable<CohortResponse>>.Success(cohorts, "Your Cohorts Fetched", 200);
            }
            return Result<IEnumerable<CohortResponse>>.Failure("No Cohorts Found", 500);
        }
    }
}
