using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using CodzSkillLabs.Domain.Common;

namespace CodzSkillLabs.Domain.Entitites
{
        public class UserRole : BaseEntity
        {
            public Guid UserId { get; set; }

            [ForeignKey(nameof(UserId))]
            public User User { get; set; } = null!;

            public Guid RoleId { get; set; }

            [ForeignKey(nameof(RoleId))]
            public Role Role { get; set; } = null!;
        }
    }

