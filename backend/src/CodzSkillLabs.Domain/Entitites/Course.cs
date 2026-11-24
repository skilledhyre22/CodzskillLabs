using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Common;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Domain.Entitites
{
    public class Course:BaseEntity
    {
            public string Title { get; set; } = string.Empty;

            public string? Description { get; set; } = string.Empty;

            public CourseCategory Category { get; set; }

            public decimal Price { get; set; }

            public string? BadgeLabel { get; set; }

            public CourseStatus Status { get; set; } = CourseStatus.Pending;
        }
    }

