using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Application.Utility;

namespace CodzSkillLabs.Application.Interfaces.IService
{
    public interface ITrainerService
    {
        Task<Result<TrainerResponse>> AddTrainer(TrainerRequest model);

        Task<Result<IEnumerable<TrainerResponse>>> GetPendingApplications();
        Task<Result<TrainerResponse>> GetTrainerById(Guid id);

        Task<Result<TrainerResponse>> TrainerStatusUpdate(UpdateTrainerStatusRequest model);


    }
}
