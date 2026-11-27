using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using CodzSkillLabs.Domain.Entitites;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Commands.CreateCohort
{
    public class CreateCohortHandler(ICohortRepository cohortRepository,IMapper mapper,ICourseRepository courseRepository,IUnitOfWork unitOfWork) : IRequestHandler<CreateCohortCommand, Result<CohortResponse>>
    {
        public async Task<Result<CohortResponse>> Handle(CreateCohortCommand request, CancellationToken cancellationToken)
        {
            var cohort = mapper.Map<Cohort>(request.model);
            var course = await courseRepository.GetByIdAsync(cohort.CourseId);
            if(course is null)
            {
                return Result<CohortResponse>.Failure("No course found", 404);
            }
            await cohortRepository.AddAsync(cohort);
            var returnValue= await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                var response = mapper.Map<CohortResponse>(cohort);
                response.CourseName = course.Title;
                return Result<CohortResponse>.Success(response, "Cohort Created Successfully", 201);
            }
            return Result<CohortResponse>.Failure("Cohort cannot be created at this moment", 400);


        }
    }
}
