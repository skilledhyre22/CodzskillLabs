using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetPublishedCohorts
{
    public class GetPublishedCohortsHandler(IHttpContextService httpContextService,ICohortRepository cohortRepository) : IRequestHandler<GetPublishedCohortsQuery, Result<IEnumerable<CohortResponse>>>
    {
        public async Task<Result<IEnumerable<CohortResponse>>> Handle(
      GetPublishedCohortsQuery request,
      CancellationToken cancellationToken)
        {
            var userId = httpContextService.GetUserId();

            var cohorts = await cohortRepository.GetPublishedCohorts(userId);

            if(cohorts is not null)
            {
                return Result<IEnumerable<CohortResponse>>.Success(cohorts, "Cohorts Fetched", 200);
            }
            return Result<IEnumerable<CohortResponse>>.Failure("No cohorts fetched", 400);
            
        }
    }
}
