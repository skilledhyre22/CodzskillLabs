using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using CodzSkillLabs.Domain.Entitites;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace CodzSkillLabs.Application.Features.Courses.Commands.CreateCourse
{
    public class CreateCourseHandler(ICourseRepository courseRepository,IMapper mapper,IUnitOfWork unitOfWork,IAuthRepository authRepository,IHttpContextService httpContextService)
     : IRequestHandler<CreateCourseCommand, Result<CourseResponse>>
    {

        public async Task<Result<CourseResponse>> Handle(CreateCourseCommand model, CancellationToken cancellationToken=default)
        {
            var userId = httpContextService.GetUserId();
            var course = mapper.Map<Course>(model.model);
            course.UserId=userId;
           var user= await authRepository.GetByIdAsync(userId);
            await courseRepository.AddAsync(course);
           var returnValue= await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                
                var response = mapper.Map<CourseResponse>(course);
                response.UserId= userId;
                response.CourseCreatedBy = user.FirstName + " " + user.LastName;
                return Result<CourseResponse>.Success(response, "Course Created Successfully", 201);
            }
            return Result<CourseResponse>.Failure("Failed to Create Course", 400);
        }
    }
}
