using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("sign-up")]
        public async Task<Result<SignUpResponse>> SignUp(SignUpRequest model)
        {
            return await authService.SignUp(model);
        }


        [HttpPost("login")]
        public async Task<Result<LoginResponse>> Login(LoginRequest model)
        {
            return await authService.Login(model);
        }
    }
}
