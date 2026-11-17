using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class AuthRepository(CodzSkillLabsDbContext context) : BaseRepository<User>(context), IAuthRepository
    {
        public async Task<List<string>> GetRoles(Guid userId)
        {
            return await context.UserRoles
        .Where(x => x.UserId == userId)
        .Select(x => x.Role!.Name).ToListAsync();

        }
    }
}
