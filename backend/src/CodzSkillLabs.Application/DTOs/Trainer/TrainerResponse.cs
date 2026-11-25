using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Trainer
{

    public class TrainerResponse
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PrimarySkill { get; set; } = string.Empty;

        public int YearsOfExperience { get; set; }

        public string Role { get; set; } = string.Empty;

        public DateTimeOffset CreatedAt { get; set; }
    }

}
