using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Services;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetPendingCourses
{
    public class GetPendingCoursesQuery:IRequest<Result<IEnumerable<CourseResponse>>>
    {

    }
}
