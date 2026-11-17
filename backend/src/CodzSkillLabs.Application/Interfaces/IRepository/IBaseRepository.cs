using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using CodzSkillLabs.Domain.Common;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface IBaseRepository<T> where T : BaseEntity, new()
    {
        #region async methods
        Task AddAsync(T model);

        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> expression);

        #endregion
    }
}
