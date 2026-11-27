using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetPendingCohorts
{
    public record GetPendingCohortsQuery:IRequest<Result<IEnumerable<CohortResponse>>>
    {
    }
}
