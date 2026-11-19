using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface IAuthRepository:IBaseRepository<User>
    {
        Task<List<string>> GetRoles(Guid userId);

        Task<UserProfileResponse> GetUserProfile(Guid id);

        Task<User> GetUserById(Guid id);

        Task<IEnumerable<UserListResponse>> GetAllUsers();

        Task<UserListResponse?> GetUserByIdForSuperAdmin(Guid id);

        Task<IEnumerable<UserListResponse>> SearchUser(string? name, string? email);

        Task<IEnumerable<UserListResponse>> GetUsersPagination(int pageNumber, int pageSize);
        Task<IEnumerable<UserListResponse>> FilterUsers(string? role,bool? isActive,bool? isDeleted);

    }
}