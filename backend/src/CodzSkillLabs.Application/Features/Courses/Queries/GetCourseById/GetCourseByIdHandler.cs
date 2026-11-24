using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Queries.GetCourseById
{
    public class GetCourseByIdHandler(ICourseRepository courseRepository,IMapper mapper) : IRequestHandler<GetCourseByIdQuery, Result<CourseResponse>>
    {
        public async Task<Result<CourseResponse>> Handle(GetCourseByIdQuery request, CancellationToken cancellationToken)
        {
            var course = await courseRepository.GetByIdAsync(request.id);
            if(course is not null)
            {
                var response = mapper.Map<CourseResponse>(course);
                return Result<CourseResponse>.Success(response, "Course Fetched", 200);
            }
            return Result<CourseResponse>.Failure("No Courses Fetched", 400);
        }
    }
}
