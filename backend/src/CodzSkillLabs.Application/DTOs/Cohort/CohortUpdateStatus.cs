using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Cohort
{
    public class CohortUpdateStatus
    {
        public Guid Id { get; set; }
        public CohortStatus Status { get; set; }
    }
}
