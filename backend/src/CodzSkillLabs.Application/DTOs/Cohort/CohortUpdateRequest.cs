using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Cohort
{
    public class CohortUpdateRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string? Overview { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationWeeks { get; set; }

        public int ClassesPerWeek { get; set; }

        public int Capacity { get; set; }
    }
}
