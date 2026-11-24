using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Course
{
    public class CourseUpdateStatus
    {
        public Guid Id {  get; set; }

        public CourseStatus Status { get; set; }
    }
}
