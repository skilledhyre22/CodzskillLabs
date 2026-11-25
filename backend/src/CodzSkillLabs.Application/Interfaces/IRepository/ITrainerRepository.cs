using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface ITrainerRepository:IBaseRepository<Trainer>
    {
        Task<IEnumerable<TrainerResponse>> GetAllTrainers();

        Task<TrainerResponse> GetTrainerById(Guid id);
        
    }
}
