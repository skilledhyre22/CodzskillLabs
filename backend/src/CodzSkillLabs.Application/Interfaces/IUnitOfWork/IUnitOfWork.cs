using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace CodzSkillLabs.Application.Interfaces.IUnitOfWork
{
    public interface IUnitOfWork
    {
        IDbTransaction BeginTransaction();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken=default);
    }
}
