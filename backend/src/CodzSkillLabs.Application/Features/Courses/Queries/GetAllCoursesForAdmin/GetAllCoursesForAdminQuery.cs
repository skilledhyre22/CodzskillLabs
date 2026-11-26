using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetAllCoursesForAdmin
{
    public record  GetAllCoursesForAdminQuery(string? name, string? sortByPrice) :IRequest<Result<IEnumerable<CourseResponse>>>
    {
    }
}
