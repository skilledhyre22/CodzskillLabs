using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using CodzSkillLabs.Domain.Common;

namespace CodzSkillLabs.Domain.Entitites
{
    public class Candidate:BaseEntity
    {
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
    }
}
