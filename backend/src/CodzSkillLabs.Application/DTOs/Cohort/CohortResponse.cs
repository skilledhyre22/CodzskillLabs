using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Cohort
{
    public class CohortResponse
    {
            public Guid Id { get; set; }

            public Guid CourseId { get; set; }

            public string CourseName { get; set; } = string.Empty;

            public string Name { get; set; } = string.Empty;

            public string? Overview { get; set; }

            public DateTime StartDate { get; set; }

            public DateTime EndDate { get; set; }

            public int DurationWeeks { get; set; }

            public int ClassesPerWeek { get; set; }

            public int Capacity { get; set; }

            public CohortStatus Status { get; set; }
        }
    }

