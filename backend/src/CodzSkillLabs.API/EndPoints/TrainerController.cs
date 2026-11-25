using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerController(ITrainerService trainerService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<Result<TrainerResponse>> AddTrainer(TrainerRequest model)
        {
            return await trainerService.AddTrainer(model);
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<Result<TrainerResponse>> GetTrainerById(Guid id)
        {
            return await trainerService.GetTrainerById(id);
        }

        [Authorize]
        [HttpGet("all-trainers")]
        public async Task<Result<IEnumerable<TrainerResponse>>> GetAllTrainers()
        {
            return await trainerService.GetAllTrainers();
        }

        [Authorize]
        [HttpPut("update-trainer")]
        public async Task<Result<TrainerResponse>> UpdateTrainer(TrainerUpdateRequest model)
        {
            return await trainerService.UpdateTrainer(model);
        }

    }
}
