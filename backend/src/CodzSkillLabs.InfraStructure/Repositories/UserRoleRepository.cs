using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class UserRoleRepository(CodzSkillLabsDbContext context) : BaseRepository<UserRole>(context), IUserRoleRepository
    {
        public async Task<UserRole?> GetUserRole(Guid userId)
        {
            return await context.UserRoles.FirstOrDefaultAsync(x=>x.UserId== userId);
        
        }
    }
}
