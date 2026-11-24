using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Commands.UpdateCourse
{
    public class UpdateCourseHandler(ICourseRepository courseRepository,IMapper mapper,IUnitOfWork unitOfWork
        ) : IRequestHandler<UpdateCourseCommand, Result<CourseResponse>>
    {
        public async Task<Result<CourseResponse>> Handle(UpdateCourseCommand request, CancellationToken cancellationToken)
        {
            var course = await courseRepository.GetByIdAsync(request.model.Id);
            if(course is null)
            {
                return Result<CourseResponse>.Failure("No Course Found", 400);
            }
            mapper.Map(request.model, course);
            await courseRepository.UpdateAsync(course);
           var returnValue= await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {

                var response=mapper.Map<CourseResponse>(course);
                return Result<CourseResponse>.Success(response, "Course Updated Successfully", 201);
            }
            return Result<CourseResponse>.Failure("Failed to Update Course", 400);

        }
    }
}
