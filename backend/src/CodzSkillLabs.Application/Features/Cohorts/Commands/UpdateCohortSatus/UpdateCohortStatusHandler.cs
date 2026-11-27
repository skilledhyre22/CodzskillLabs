using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Commands.UpdateCohortSatus
{
    public class UpdateCohortStatusHandler(ICohortRepository cohortRepository,IMapper mapper,IUnitOfWork unitOfWork) : IRequestHandler<UpdateCohortStatusCommand, Result<CohortResponse>>
    {
        public async Task<Result<CohortResponse>> Handle(UpdateCohortStatusCommand request, CancellationToken cancellationToken)
        {
            var cohort = await cohortRepository.GetByIdAsync(request.model.Id);
            if(cohort is null)
            {
                return Result<CohortResponse>.Failure("No Cohort Found", 400);
            }
            cohort.Status = request.model.Status;
            await cohortRepository.UpdateAsync(cohort);
           var returnValue= await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                var response = mapper.Map<CohortResponse>(cohort);
                return Result<CohortResponse>.Success(response, "Cohort Status Updated Successfully",201);
            }
            return Result<CohortResponse>.Failure("Failed to Update Status Try Again later..",400);
        }
    }
}
