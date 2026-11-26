using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;
using static Google.Apis.Requests.BatchRequest;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetAllCoursesForAdmin
{
    public class GetAllCoursesForAdminHandler(ICourseRepository courseRepository,IMapper mapper) : IRequestHandler<GetAllCoursesForAdminQuery, Result<IEnumerable<CourseResponse>>>
    {
        public async Task<Result<IEnumerable<CourseResponse>>> Handle(GetAllCoursesForAdminQuery request,CancellationToken cancellationToken)
        {
            var courses = await courseRepository.GetAllCourses(
                request.name,
                request.sortByPrice);

            if(courses is not null && courses.Any())
            {
                var response = mapper.Map<IEnumerable<CourseResponse>>(courses);

                return Result<IEnumerable<CourseResponse>>.Success(
                    response,
                    "Courses Fetched Successfully",
                    200);
            }
            return Result<IEnumerable<CourseResponse>>.Failure(
                   "No Courses Fetched",
                   400);


        }
    }
}
