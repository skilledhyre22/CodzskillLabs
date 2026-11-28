using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Features.Cohorts.Commands.CreateCohort;
using CodzSkillLabs.Application.Features.Cohorts.Commands.UpdateCohort;
using CodzSkillLabs.Application.Features.Cohorts.Commands.UpdateCohortSatus;
using CodzSkillLabs.Application.Features.Cohorts.Queries.GetAllCohorts;
using CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortByCourseId;
using CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortById;
using CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortBySpecificUser;
using CodzSkillLabs.Application.Features.Cohorts.Queries.GetPublishedCohorts;
using CodzSkillLabs.Application.Utility;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CohortController(ISender sender) : ControllerBase
    {
       [HttpPost("create-cohort")]
        public async Task<Result<CohortResponse>> CreateCohort(CohortRequest model)
        {
            return await sender.Send(new CreateCohortCommand(model));
        }

        [HttpPut("update-cohort/{id:guid}")]
        public async Task<Result<CohortResponse>> UpdateCohort(Guid id,[FromBody] CohortUpdateRequest model)
        {
            return await sender.Send(new UpdateCohortCommand(model));
        }

        [HttpPut("update-status/{id:guid}")]
        public async Task<Result<CohortResponse>> UpdateCohortStatus(Guid id,[FromBody] CohortUpdateStatus model)
        {
            return await sender.Send(new UpdateCohortStatusCommand(model));
        }

        [HttpGet("all-cohorts")]
        public async Task<Result<IEnumerable<CohortResponse>>> GetALLCohorts()
        {
            return await sender.Send(new GetAllCohortsQuery());
        }

        [HttpGet("cohort/{id:guid}")]
        public async Task<Result<CohortResponse>> GetCohortById(Guid id)
        {
            return await sender.Send(new GetCohortByIdQuery(id));
        }

        [HttpGet("course-id/{id:guid}")]
        public async Task<Result<IEnumerable<CohortResponse>>> GetCohortByCourseId(Guid id)
        {
            return await sender.Send(new GetCohortByCourseIdQuery(id));
        }

        [HttpGet("by-specific-user")]
        public async Task<Result<IEnumerable<CohortResponse>>> GetCohortBySpecificUser()
        {
            return await sender.Send(new GetCohortBySpecificUserQuery());
        }

        [HttpGet("published-cohorts")]
        public async Task<Result<IEnumerable<CohortResponse>>> GetPublishedCohorts()
        {
            return await sender.Send(new GetPublishedCohortsQuery());
        }


    }
}
