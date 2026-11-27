using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Features.Cohorts.Commands.CreateCohort;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class CohortController(ISender sender) : ControllerBase
    {
        [HttpPost("create-cohort")]
        public async Task<CohortResponse> AddCohort(CohortRequest model)
        {
            return await sender.Send(new CreateCohortCommand(model));
        }
    }
}
