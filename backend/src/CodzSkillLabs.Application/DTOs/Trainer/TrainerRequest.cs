using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Trainer
{
   

        public class TrainerRequest
        {
            public string FullName { get; set; } = string.Empty;

            public string Email { get; set; } = string.Empty;

            public string Password { get; set; } = string.Empty;

            public string PrimarySkill { get; set; } = string.Empty;

            public int YearsOfExperience { get; set; }
        }

    }

