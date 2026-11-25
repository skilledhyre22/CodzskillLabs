using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Commands.UpdateCourseStatus
{
    public record UpdateCourseStatusCommand(Guid id,CourseUpdateStatus model):IRequest<Result<CourseResponse>>
    {

    }
}
