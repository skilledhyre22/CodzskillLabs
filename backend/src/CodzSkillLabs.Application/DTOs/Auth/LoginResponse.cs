using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Primitives;

namespace CodzSkillLabs.Application.DTOs.Auth
{
    public class LoginResponse
    {
        public Guid UserId {  get; set; }

        public string Email { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;

        public List<string> Roles { get; set; } = new();
    }
}
