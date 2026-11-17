using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface IAuthRepository:IBaseRepository<User>
    {
        Task<List<string>> GetRoles(Guid userId);
    }
}
