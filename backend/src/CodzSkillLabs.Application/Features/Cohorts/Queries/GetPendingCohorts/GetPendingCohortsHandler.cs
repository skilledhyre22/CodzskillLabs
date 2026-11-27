using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetPendingCohorts
{
    public class GetPendingCohortsHandler(ICohortRepository cohortRepository) : IRequestHandler<GetPendingCohortsQuery, Result<IEnumerable<CohortResponse>>>
    {
        public async Task<Result<IEnumerable<CohortResponse>>> Handle(GetPendingCohortsQuery request, CancellationToken cancellationToken)
        {
            var cohort = await cohortRepository.GetPendingCohorts();
            if(cohort is not null)
            {
                return Result<IEnumerable<CohortResponse>>.Success(cohort, "Pending Cohorts Fetched", 200);
            }
            return Result<IEnumerable<CohortResponse>>.Failure("No Pending Courses Fetched",400);
        }
    }
}
