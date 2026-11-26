using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetAllCourses
{
    public class GetAllCoursesHandler(ICourseRepository courseRepository,IMapper mapper,IAuthRepository authRepository) : IRequestHandler<GetAllCourseQuery, Result<IEnumerable<CourseResponse>>>
    {
        public async Task<Result<IEnumerable<CourseResponse>>> Handle(GetAllCourseQuery request, CancellationToken cancellationToken)
        {
            var courses = await courseRepository.GetAllCourses();
            
            if(courses is not null && courses.Any())
            {
                
                return Result<IEnumerable<CourseResponse>>.Success(courses, "Courses Fetched Successfully", 200);
            }
            return Result<IEnumerable<CourseResponse>>.Failure("Failed to Fetch Courses", 500);

        }
    }
}
