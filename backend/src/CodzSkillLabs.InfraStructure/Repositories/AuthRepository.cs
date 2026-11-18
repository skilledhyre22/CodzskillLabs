using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class AuthRepository(CodzSkillLabsDbContext context) : BaseRepository<User>(context), IAuthRepository
    {
        public async Task<IEnumerable<UserListResponse>> GetAllUsers()
        {
            return await context.Users
                .Select(u => new UserListResponse
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    IsActive = u.IsActive,
                    IsDeleted = u.IsDeleted,
                    Role = u.UserRoles
                        .Select(ur => ur.Role.Name)
                        .ToList()
                })
                .ToListAsync();
        }

        public async Task<List<string>> GetRoles(Guid userId)
        {
            return await context.UserRoles
        .Where(x => x.UserId == userId)
        .Select(x => x.Role!.Name).ToListAsync();

        }

        public async Task<User> GetUserById(Guid id)
        {
            return (await context.Users
        .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(x => x.Id == id))!; ;
        }

        public async Task<UserListResponse?> GetUserByIdForSuperAdmin(Guid id)
        {
            return await context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserListResponse
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Role = u.UserRoles
                        .Select(ur => ur.Role.Name)
                        .ToList(),
                    IsActive = u.IsActive,
                    IsDeleted = u.IsDeleted
                })
                .FirstOrDefaultAsync();
        }

        public async Task<UserProfileResponse> GetUserProfile(Guid id)
        {
            var user = await context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null)
            {
                return null;

            }
            else
            {
                return new UserProfileResponse
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Role = user.UserRoles
                   .Select(ur => ur.Role.Name)
                   .ToList(),
                    IsActive = user.IsActive
                };
            }

           
        }

        public async Task<IEnumerable<UserListResponse>> GetUsersPagination(
    int pageNumber, int pageSize)
        {
            return await context.Users
                .Where(u => !u.IsDeleted)
                .OrderBy(u => u.FirstName)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new UserListResponse
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Role = u.UserRoles
                        .Select(ur => ur.Role.Name)
                        .ToList(),
                    IsActive = u.IsActive,
                    IsDeleted = u.IsDeleted
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<UserListResponse>> SearchUser(string? name, string? email)
        {
            var query = @"EXEC SpSearchUsers 
                  @FirstName = @Name,
                  @Email = @Email";

            var users = await QueryAsync<UserSearchResult>(query,new {name,email});

            var result = users
                .GroupBy(u => u.Id)
                .Select(g => new UserListResponse
                {
                    Id = g.First().Id,
                    FirstName = g.First().FirstName,
                    LastName = g.First().LastName,
                    Email = g.First().Email,

                    Role = g.Where(x => x.Role != null)
                            .Select(x => x.Role!)
                            .Distinct()
                            .ToList(),

                    IsActive = g.First().IsActive,
                    IsDeleted = g.First().IsDeleted
                });

            return result;
        }
    }
}
