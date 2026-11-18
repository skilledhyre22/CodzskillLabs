using System;
using System.Collections.Generic;
using System.Data;
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

        Task UpdateAsync(T model);

        Task<IEnumerable<TEntity>> SQLQueryAsync<TEntity>(FormattableString query, CancellationToken cancellationToken = default);

        Task<IEnumerable<TEntity>> QueryAsync<TEntity>(string sql, object? param = default, CommandType commandType = CommandType.Text, IDbTransaction? transaction = null);

        Task<IEnumerable<T>> GetAllAsync(int pageNo, int pageSize);
        #endregion
    }
}
