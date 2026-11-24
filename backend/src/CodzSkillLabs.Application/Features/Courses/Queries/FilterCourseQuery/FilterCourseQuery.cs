using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.FilterCourseQuery
{
    public record FilterCourseQuery(decimal Price):IRequest<Result<IEnumerable<CourseResponse>>>
    {
    }
}
