using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Commands.CreateCohort
{
    public record CreateCohortCommand(CohortRequest model):IRequest<Result<CohortResponse>>
    {
    }
}
