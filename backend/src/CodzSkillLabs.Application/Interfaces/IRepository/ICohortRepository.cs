using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface ICohortRepository:IBaseRepository<Cohort>
    {
        Task<IEnumerable<CohortResponse>> GetAllCohorts();
        Task<CohortResponse> GetCohortById(Guid id);

        Task<IEnumerable<CohortResponse>> GetPublishedCohorts(Guid userId);

        Task<IEnumerable<CohortResponse>> GetCohortsByUserId(Guid userId);

        Task<IEnumerable<CohortResponse>> GetCohortsByCourseId(Guid courseId,Guid userId);

        Task<IEnumerable<CohortResponse>> GetPendingCohorts();
    }
}
