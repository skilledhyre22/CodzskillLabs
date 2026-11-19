using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Auth
{
    public class GoogleLoginRequest
    {
        public string IdToken { get; set; } = string.Empty;
    }
}
