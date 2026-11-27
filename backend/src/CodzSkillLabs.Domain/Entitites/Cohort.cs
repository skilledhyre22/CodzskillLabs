using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using CodzSkillLabs.Domain.Common;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Domain.Entitites
{
    public class Cohort : BaseEntity
    {
        public Guid CourseId { get; set; }

        [ForeignKey(nameof(CourseId))]
        public Course Course { get; set; } = null!;

        public string Name { get; set; } = string.Empty;

        public string? Overview { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationWeeks { get; set; }

        public int ClassesPerWeek { get; set; }

        public int Capacity { get; set; }

        public CohortStatus Status { get; set; } = CohortStatus.Draft;
    }
}
