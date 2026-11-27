using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Commands.UpdateCohortSatus
{
    public record UpdateCohortStatusCommand(CohortUpdateStatus model):IRequest<Result<CohortResponse>>
    {
    }
}
