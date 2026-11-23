using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Entitites;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Data
{
    public class CodzSkillLabsDbContext(DbContextOptions<CodzSkillLabsDbContext> options):DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Trainer> Trainers { get; set; }

    }
}
