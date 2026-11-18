using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs
{
    public class SuperAdminUpdateUserRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        //public bool IsActive { get; set; }
    }
}
