using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Application.Utility;

namespace CodzSkillLabs.Application.Interfaces.IService
{
    public interface IRoleService
    {
        Task<Result<IEnumerable<RoleResponse>>> GetAllRoles();
    }
}
