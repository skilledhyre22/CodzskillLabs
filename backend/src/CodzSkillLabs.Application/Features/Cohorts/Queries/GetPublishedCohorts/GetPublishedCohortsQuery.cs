using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetPublishedCohorts
{
    public record GetPublishedCohortsQuery:IRequest<Result<IEnumerable<CohortResponse>>>
    {
    }
}
