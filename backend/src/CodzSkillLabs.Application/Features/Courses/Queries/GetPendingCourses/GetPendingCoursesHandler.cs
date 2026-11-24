using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;
using static Google.Apis.Requests.BatchRequest;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetPendingCourses
{
    public class GetPendingCoursesHandler(ICourseRepository courseRepository,IMapper mapper) : IRequestHandler<GetPendingCoursesQuery, Result<IEnumerable<CourseResponse>>>
    {
        public async Task<Result<IEnumerable<CourseResponse>>> Handle(GetPendingCoursesQuery request, CancellationToken cancellationToken)
        {
            var courses = await courseRepository.GetPendingCourses();
            if(courses is not null && courses.Any())
            {
                var response = mapper.Map<IEnumerable<CourseResponse>>(courses);
                return Result<IEnumerable<CourseResponse>>.Success(response, "Pending Courses Fetched", 200);
            }
            return Result<IEnumerable<CourseResponse>>.Failure("Failed to Fetch Pending Courses",500);

        }
    }
}
