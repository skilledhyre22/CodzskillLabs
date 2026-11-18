using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Utility;

namespace CodzSkillLabs.Application.Interfaces.IService
{
    public interface IAuthService
    {
        Task<Result<SignUpResponse>> SignUp(SignUpRequest model);

        Task<Result<LoginResponse>> Login(LoginRequest model);

        Task<Result<UserProfileResponse>> GetMyProfile();

        Task<Result<UserProfileResponse>> UpdateProfile(UserUpdateRequest model);

        Task<Result<IEnumerable<UserListResponse>>> GetAllUsers();

        Task<Result<UserListResponse>> GetUserById(Guid id);

        Task<Result<UserListResponse>> UpdateUser(Guid id,SuperAdminUpdateUserRequest model);

        Task<Result<bool>> DeleteUser(Guid id);

        Task<Result<bool>> ChangeUserStatus(Guid id, UpdateUserStatusRequest model);

        Task<Result<IEnumerable<UserListResponse>>> SearchUser(string? name, string? email);
        Task<Result<IEnumerable<UserListResponse>>> GetUsers(int pageNo,int pageSize);
    }
}
