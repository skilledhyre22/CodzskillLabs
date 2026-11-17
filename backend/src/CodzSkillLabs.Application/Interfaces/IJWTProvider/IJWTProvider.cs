using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IJWTProvider
{
    public interface IJWTProvider
    {
        string GenerateAuthToken(User user, List<string> roles);
    }
}
