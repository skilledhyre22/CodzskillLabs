using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class RoleRepository(CodzSkillLabsDbContext context) : BaseRepository<Role>(context), IRoleRepository
    {
        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await context.Roles.ToListAsync();
        }
    }
}
