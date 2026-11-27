using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Utility;
using MediatR;

namespace CodzSkillLabs.Application.Features.Cohorts.Queries.GetCohortById
{
    public class GetCohortByIdHandler(ICohortRepository cohortRepository) : IRequestHandler<GetCohortByIdQuery, Result<CohortResponse>>
    {
        public async Task<Result<CohortResponse>> Handle(GetCohortByIdQuery request, CancellationToken cancellationToken)
        {
            var cohort = await cohortRepository.GetCohortById(request.id);
            if(cohort is not null)
            {
                return Result<CohortResponse>.Success(cohort, "Specific Cohort Fetched", 200);
            }
            return Result<CohortResponse>.Failure("No Specific Cohort Fetched",400);

        }
    }
}
