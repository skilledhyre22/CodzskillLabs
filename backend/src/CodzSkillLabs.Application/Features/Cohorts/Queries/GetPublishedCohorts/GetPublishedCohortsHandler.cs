using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetPublishedCohorts
{
    public class GetPublishedCohortsHandler : IRequestHandler<GetPublishedCohortsQuery, Result<IEnumerable<CohortResponse>>>
    {
        public Task<Result<IEnumerable<CohortResponse>>> Handle(GetPublishedCohortsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
