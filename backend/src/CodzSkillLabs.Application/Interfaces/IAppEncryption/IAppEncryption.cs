using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.Interfaces.IAppEncryption
{
    public interface IAppEncryption
    {
        string GenerateSalt();
        string HashPassword(string password,string salt);
    }
}
