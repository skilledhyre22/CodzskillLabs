using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Enums;

namespace CodzSkillLabs.Application.DTOs.Course
{
    public class CourseResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description {  get; set; } = string.Empty;
        public string? BadgeLabel {  get; set; } = string.Empty;
        public decimal Price { get; set; }
        public CourseCategory Category { get; set; }
        public CourseStatus Status { get; set; }
    }
}
