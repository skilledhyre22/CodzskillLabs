using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using MediatR;
using static Google.Apis.Requests.BatchRequest;

namespace CodzSkillLabs.Application.Features.Cohorts.Commands.UpdateCohort
{
    public class UpdateCourseHandler(ICohortRepository cohortRepository,IMapper mapper,IUnitOfWork unitOfWork) : IRequestHandler<UpdateCohortCommand, Result<CohortResponse>>
    {
        public async Task<Result<CohortResponse>> Handle(UpdateCohortCommand request, CancellationToken cancellationToken)
        {
            var cohort = await cohortRepository.GetByIdAsync(request.model.Id);
            if(cohort is null)
            {
                return Result<CohortResponse>.Failure("No Course Found", 400);
            }
            mapper.Map(request.model, cohort);
            await cohortRepository.UpdateAsync(cohort);
           var returnValue = await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                var response = mapper.Map<CohortResponse>(cohort);
                return Result<CohortResponse>.Success(response, "Cohort Updated Successfully");
            }
            return Result<CohortResponse>.Failure("Cohort cannot be Updated this time",400);
        }
    }
}
