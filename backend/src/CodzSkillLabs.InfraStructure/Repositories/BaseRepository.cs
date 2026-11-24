using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Common;
using CodzSkillLabs.InfraStructure.Data;
using Dapper;
using Microsoft.Data.SqlClient;
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

        public async Task UpdateAsync(T model)
        {
            await Task.Run(() => context.Set<T>().Update(model));
        }

       public async Task<IEnumerable<TEntity>> SQLQueryAsync<TEntity>(FormattableString query, CancellationToken cancellationToken = default)
        {
            return await context.Database.SqlQuery<TEntity>(query).ToListAsync(cancellationToken);

        }

        public async Task<IEnumerable<TEntity>> QueryAsync<TEntity>(string sql, object? param = null, CommandType commandType = CommandType.Text, IDbTransaction? transaction = null)
        {
            SqlConnection connection = new(context.Database.GetConnectionString());
            return await connection.QueryAsync<TEntity>(sql, param, transaction, null, commandType);
        }

        public async Task<IEnumerable<T>> GetAllAsync(int pageNo, int pageSize)
        {
            var res = pageNo - 1 * pageSize;
            return await context.Set<T>().Skip(res).Take(pageSize).ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<int> ExecuteAsync<TEntity>(string sql, object? param = null, CommandType commandType = CommandType.Text, IDbTransaction? transaction = null)
        {
            SqlConnection connection = new(context.Database.GetConnectionString());
            return await connection.ExecuteAsync(sql, param, transaction,null, commandType);
        }

        public async Task<TEntity> FirstOrDefaultAsync<TEntity>(string sql, object? param = null, CommandType commandType = CommandType.Text, IDbTransaction? transaction = null)
        {
            SqlConnection connection = new(context.Database.GetConnectionString());
            return (await connection.QueryFirstOrDefaultAsync<TEntity>(sql, param, transaction, null, commandType))!;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await context.Set<T>().ToListAsync();
        }



        #endregion
    }
}
