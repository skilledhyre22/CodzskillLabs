using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Common;

namespace CodzSkillLabs.Domain.Entitites
{
    public class Role : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();


    }
}
