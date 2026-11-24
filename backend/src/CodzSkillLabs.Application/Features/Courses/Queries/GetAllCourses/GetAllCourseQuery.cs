using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetAllCourses
{
    public record GetAllCourseQuery:IRequest<Result<IEnumerable<CourseResponse>>>
    {
    }
}
