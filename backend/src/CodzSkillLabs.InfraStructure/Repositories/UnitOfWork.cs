using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class UnitOfWork(CodzSkillLabsDbContext context) : IUnitOfWork
    {
        public IDbTransaction BeginTransaction()
        {
            return context.Database.BeginTransaction().GetDbTransaction();
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken=default)
        {
           return await context.SaveChangesAsync(cancellationToken);
        }
    }
}
