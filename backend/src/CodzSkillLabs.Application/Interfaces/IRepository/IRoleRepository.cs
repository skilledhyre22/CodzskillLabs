using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface IRoleRepository:IBaseRepository<Role>
    {
        Task<IEnumerable<Role>> GetAllRoles();
    }
}
