using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using CodzSkillLabs.Domain.Entitites;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Commands.CreateCourse
{
    public class CreateCourseHandler(ICourseRepository courseRepository,IMapper mapper,IUnitOfWork unitOfWork)
     : IRequestHandler<CreateCourseCommand, Result<CourseResponse>>
    {

        public async Task<Result<CourseResponse>> Handle(CreateCourseCommand model, CancellationToken cancellationToken=default)
        {
            var course = mapper.Map<Course>(model.model);
            await courseRepository.AddAsync(course);
           var returnValue= await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                var response = mapper.Map<CourseResponse>(course);
                return Result<CourseResponse>.Success(response, "Course Created Successfully", 201);
            }
            return Result<CourseResponse>.Failure("Failed to Create Course", 400);
        }
    }
}
