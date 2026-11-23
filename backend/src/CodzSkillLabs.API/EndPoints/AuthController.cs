using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [EnableRateLimiting("RegisterPolicy")]
        [HttpPost("sign-up")]
        public async Task<Result<SignUpResponse>> SignUp(SignUpRequest model)
        {
            return await authService.SignUp(model);
        }


        [EnableRateLimiting("LoginPolicy")]
        [HttpPost("login")]
        public async Task<Result<LoginResponse>> Login(LoginRequest model)
        {
            return await authService.Login(model);
        }


        [HttpPost("google-login")]
        public async Task<Result<LoginResponse>> GoogleLoginAsync(GoogleLoginRequest model)
        {
            return await authService.GoogleLoginAsync(model);
        }


        [Authorize]
        [HttpGet("my-profile")]
        public async Task<Result<UserProfileResponse>> GetMyProfile()
        {
            return await authService.GetMyProfile();
        }

        [Authorize]
        [HttpPut("update-profile")]
        public async Task<Result<UserProfileResponse>> UpdateProfile(UserUpdateRequest model)
        {
            return await authService.UpdateProfile(model);
        }
    }
}
