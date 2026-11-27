using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortById
{
    public record GetCohortByIdQuery(Guid id):IRequest<Result<CohortResponse>>
    {
    }
}
