using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Auth
{
    public class AssignRoleRequest
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
    }
}
