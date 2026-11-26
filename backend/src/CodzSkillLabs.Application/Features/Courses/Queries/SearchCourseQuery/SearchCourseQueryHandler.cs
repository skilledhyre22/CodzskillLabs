using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.SearchCourseQuery
{
    public class SearchCourseQueryHandler(ICourseRepository courseRepository,IMapper mapper,IHttpContextService httpContextService) : IRequestHandler<SearchCourseQuery, Result<IEnumerable<CourseResponse>>>
    {
        public async Task<Result<IEnumerable<CourseResponse>>> Handle(SearchCourseQuery request,CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.name) ||
        request.name.Equals("null", StringComparison.OrdinalIgnoreCase))
            {
                return Result<IEnumerable<CourseResponse>>.Failure(
                    "Search keyword is required", 400);
            }
            var userId = httpContextService.GetUserId();
            var courses = await courseRepository.SearchMyCourse(request.name.Trim(),userId);

            if(courses is not null && courses.Any())
            {
                var response = mapper.Map<IEnumerable<CourseResponse>>(courses);
                return Result<IEnumerable<CourseResponse>>.Success(response,
                    "Searched Results fetched", 200);
            }
            return Result<IEnumerable<CourseResponse>>.Failure("No Courses Found to Fetch", 404);
        }
    }
}
