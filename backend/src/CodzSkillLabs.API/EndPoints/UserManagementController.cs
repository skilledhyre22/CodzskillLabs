using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController(IAuthService authService,IRoleService roleService) : ControllerBase
    {
        [Authorize]
        [HttpGet("all-users")]
        public async Task<Result<IEnumerable<UserListResponse>>> GetAllUsers()
        {
            return await authService.GetAllUsers();
        }

        [Authorize]
        [HttpGet("get-user/{id:guid}")]
        public async Task<Result<UserListResponse>> GetUserById(Guid id)
        {
            return await authService.GetUserById(id);
        }

        [Authorize]
        [HttpPut("update-user/{id:guid}")]
        public async Task<Result<UserListResponse>> UpdateUser(Guid id, SuperAdminUpdateUserRequest model)
        {
            return await authService.UpdateUser(id, model);
        }

        [Authorize]
        [HttpDelete("delete-user/{id:guid}")]
        public async Task<Result<bool>> DeleteUser(Guid id)
        {
            return await authService.DeleteUser(id);
        }


        [Authorize()]
        [HttpPatch("restore-user/{id:guid}")]
        public async Task<Result<bool>> RestoreUser(Guid id)
        {
            return await authService.RestoreUser(id);
        }

        [Authorize]
        [HttpPatch("update-status/{id:guid}")]
        public async Task<Result<bool>> ChangeUserStatus(Guid id, UpdateUserStatusRequest model)
        {
            return await authService.ChangeUserStatus(id, model);
        }

        [HttpGet("search")]
        [Authorize]
        public async Task<Result<IEnumerable<UserListResponse>>> SearchUser([FromQuery] string? name,[FromQuery] string? email)
        {
            return await authService.SearchUser(name, email);
        }

        [HttpGet("pagination")]
        [Authorize]
        public async Task<Result<IEnumerable<UserListResponse>>> GetUsersPagination([FromQuery] int pageNumber,[FromQuery] int pageSize)
        {
            return await authService.GetUsers(pageNumber, pageSize);
        }

        [Authorize]
        [HttpGet("filter")]
        public async Task<Result<IEnumerable<UserListResponse>>> FilterUsers([FromQuery] string? role,[FromQuery] bool? isActive,[FromQuery] bool? isDeleted)
        {
            return await authService.FilterUsers(role, isActive, isDeleted);
        }

        [HttpPatch("assign-role")]
        [Authorize]
        public async Task<Result<bool>> AssignRole(AssignRoleRequest model)
        {
            return await authService.AssignRole(model);
        }

        
    }


}
    