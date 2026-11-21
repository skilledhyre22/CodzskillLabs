using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Utility;

namespace CodzSkillLabs.Application.Services
{
    public class RoleService(IRoleRepository roleRepository,IMapper mapper) : IRoleService
    {
        public async Task<Result<IEnumerable<RoleResponse>>> GetAllRoles()
        {
            var roles= await roleRepository.GetAllRoles();
            if(roles is not null)
            {
                var response = mapper.Map<IEnumerable<RoleResponse>>(roles);
                return Result<IEnumerable<RoleResponse>>.Success(response, "All Roles Fetched", 200);
            }
            return Result<IEnumerable<RoleResponse>>.Failure("No Roles Found to be Fetched", 400);
        }
    }
}
