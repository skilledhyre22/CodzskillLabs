using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Trainer
{
    public class TrainerUpdateRequest
    {
        public Guid Id { get; set; }

        public string PrimarySkill { get; set; } = string.Empty;

        public int YearsOfExperience { get; set; }
    }
}
