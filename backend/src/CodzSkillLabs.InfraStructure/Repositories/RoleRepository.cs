using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.InfraStructure.Data;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class RoleRepository(CodzSkillLabsDbContext context):BaseRepository<Role>(context),IRoleRepository
    {

    }
}
