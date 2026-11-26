using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetPublishedCourses
{
    public class GetPublishedCoursesHandler(ICourseRepository courseRepository,IMapper mapper,IHttpContextService httpContextService) : IRequestHandler<GetPublishedCoursesQuery, Result<IEnumerable<CourseResponse>>>
    {
        public async Task<Result<IEnumerable<CourseResponse>>> Handle(GetPublishedCoursesQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextService.GetUserId();
            var courses = await courseRepository.GetPublishedCourses(userId);
            if(courses is not null && courses.Any())
            {
                return Result<IEnumerable<CourseResponse>>.Success(courses, "Fetched Published Courses", 200);
            }
            return Result<IEnumerable<CourseResponse>>.Failure("Failed to fetch  published courses", 404);
        }
    }
}
