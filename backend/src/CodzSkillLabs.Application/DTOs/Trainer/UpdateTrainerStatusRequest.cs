using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Trainer
{
    public class UpdateTrainerStatusRequest
    {
        public Guid Id { get; set; }

        public TrainerApplicationStatus Status {  get; set; }
    }
}
