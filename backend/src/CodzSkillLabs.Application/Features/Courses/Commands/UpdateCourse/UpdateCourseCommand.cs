using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Commands.UpdateCourse
{
    public record UpdateCourseCommand(CourseUpdateRequest model):IRequest<Result<CourseResponse>>
    {
    }
}
