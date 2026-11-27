using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetAllCohorts
{
    public record GetAllCohortsQuery:IRequest<Result<IEnumerable<CohortResponse>>>
    {
    }
}
