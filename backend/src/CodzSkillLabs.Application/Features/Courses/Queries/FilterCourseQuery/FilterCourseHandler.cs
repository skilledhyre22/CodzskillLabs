using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.FilterCourseQuery
{
    public class FilterCourseHandler(ICourseRepository courseRepository,IMapper mapper,IHttpContextService httpContextService) : IRequestHandler<FilterCourseQuery, Result<IEnumerable<CourseResponse>>>
    {
        public async Task<Result<IEnumerable<CourseResponse>>> Handle(FilterCourseQuery request, CancellationToken cancellationToken)
        {
            var userId = httpContextService.GetUserId();
            var courses = await courseRepository.FilterMyCourse(request.Price,userId);
            if(courses is not null && courses.Any())
            {
                var response = mapper.Map<IEnumerable<CourseResponse>>(courses);
                return Result<IEnumerable<CourseResponse>>.Success(response, "Filtered Courses Fetched", 200);
            }
            return Result<IEnumerable<CourseResponse>>.Failure("Failed to Fetch Filtered Courses", 400);
        }
    }
}
