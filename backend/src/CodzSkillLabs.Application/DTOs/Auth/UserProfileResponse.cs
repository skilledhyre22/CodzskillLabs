using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Auth
{
    public class UserProfileResponse
    {
        public Guid  Id { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public List<string> Role { get; set; } = new();

        public bool IsActive { get; set; }
    }
}
