using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Utility;

namespace CodzSkillLabs.Application.Interfaces.IService
{
    public interface IAuthService
    {
        Task<Result<SignUpResponse>> SignUp(SignUpRequest model);

        Task<Result<LoginResponse>> Login(LoginRequest model);
    }
}
