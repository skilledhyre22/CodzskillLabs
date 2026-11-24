using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Course
{
    public class CourseUpdateRequest
    {
        public Guid Id {  get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public CourseCategory Category { get; set; }

        public decimal Price { get; set; }

        public string? BadgeLabel { get; set; }

    }
}
