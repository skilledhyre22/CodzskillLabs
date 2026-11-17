using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Common;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class BaseRepository<T>(CodzSkillLabsDbContext context) : IBaseRepository<T> where T : BaseEntity, new()
    {
        #region async methods
        public async Task AddAsync(T model)
        {
            await context.Set<T>().AddAsync(model);
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> expression)
        {
            return (await context.Set<T>().FirstOrDefaultAsync(expression))!;
        }

        #endregion
    }
}
