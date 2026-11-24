using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Courses.Commands.UpdateCourseStatus
{
    public class UpdateCourseStatusHandler(ICourseRepository courseRepository,IUnitOfWork unitOfWork,IMapper mapper) : IRequestHandler<UpdateCourseStatusCommand, Result<CourseResponse>>
    {
        public async Task<Result<CourseResponse>> Handle(UpdateCourseStatusCommand request, CancellationToken cancellationToken)
        {
            var course = await courseRepository.GetByIdAsync(request.model.Id);
            if(course is null)
            {
                return Result<CourseResponse>.Failure("No Course Found", 404);
            }
            course.Status = request.model.Status;
            await courseRepository.UpdateAsync(course);
            var returnValue=await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                var response = mapper.Map<CourseResponse>(course);
                return Result<CourseResponse>.Success(response, "Course Status Updated Successfully", 200);
            }
            return Result<CourseResponse>.Failure("Failed to Update Status", 400);
        }
    }
}
