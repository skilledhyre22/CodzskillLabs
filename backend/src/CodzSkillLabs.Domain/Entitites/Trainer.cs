using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using CodzSkillLabs.Domain.Common;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Domain.Entitites
{
    
        public class Trainer:BaseEntity
        {
            public Guid UserId { get; set; }

            [ForeignKey(nameof(UserId))]
            public User User { get; set; } = null!;

            public string PrimarySkill { get; set; } = string.Empty;

            public int YearsOfExperience { get; set; }

            public TrainerApplicationStatus Status { get; set; } = TrainerApplicationStatus.Pending;

        }
    }

