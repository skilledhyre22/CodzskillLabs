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
    public class RoleController(IRoleService roleService) : ControllerBase
    {
        [Authorize]
        [HttpGet("get-all-roles")]
        public async Task<Result<IEnumerable<RoleResponse>>> GetAllRoles()
        {
            return await roleService.GetAllRoles();
        }
    }
}
