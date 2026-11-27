using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Entitites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CodzSkillLabs.InfraStructure.Data
{
    public class CodzSkillLabsDbContext(DbContextOptions<CodzSkillLabsDbContext> options):DbContext(options)
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }


        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Cohort> Cohorts { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<ErrorLog> ErrorLogs { get; set; }

    }
}
