using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.Application.Interfaces.IAppEncryption;
using CodzSkillLabs.Application.Interfaces.IJWTProvider;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using CodzSkillLabs.Domain.Entitites;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace CodzSkillLabs.Application.Services
{
    public class AuthService(IAuthRepository authRepository,IMapper mapper,IUnitOfWork unitOfWork,IAppEncryption appEncryption,IRoleRepository roleRepository,IUserRoleRepository userRoleRepository,IJWTProvider jWTProvider,IHttpContextService httpContextService,IConfiguration configuration) : IAuthService
    {
        public async Task<Result<bool>> AssignRole(AssignRoleRequest model)
        {
            if (model.UserId == Guid.Empty || model.RoleId == Guid.Empty)
                return Result<bool>.Failure("Invalid UserId or RoleId", 400);

            var user = await authRepository.GetByIdAsync(model.UserId);

            if (user is null)
                return Result<bool>.Failure("User not found", 404);

            if (user.IsDeleted)
                return Result<bool>.Failure("Deleted user cannot be assigned a role", 400);

            var role = await roleRepository.GetByIdAsync(model.RoleId);

            if (role is null)
                return Result<bool>.Failure("Role not found", 404);

            var userRole = await userRoleRepository.GetUserRole(model.UserId);

            if (userRole is null)
                return Result<bool>.Failure("User role mapping not found", 404);

            if (userRole.RoleId == model.RoleId)
                return Result<bool>.Failure("User already has this role", 400);

            userRole.RoleId = model.RoleId;

            await userRoleRepository.UpdateAsync(userRole);

            var result = await unitOfWork.SaveChangesAsync();

            if (result > 0)
                return Result<bool>.Success(true, $"User role changed to {role.Name} successfully", 200);

            return Result<bool>.Failure("Role assignment failed", 400);
        }


        public async Task<Result<bool>> ChangeUserStatus(Guid id,UpdateUserStatusRequest model)
        {
            var user = await authRepository.GetUserById(id);

            if (user is null)
                return Result<bool>.Failure("User not found", 404);

            if (user.IsDeleted)
                return Result<bool>.Failure("Deleted user cannot be activated or deactivated", 400);

            if (user.IsActive == model.IsActive)
                return Result<bool>.Failure("User already has this status", 400);

            user.IsActive = model.IsActive;

            await authRepository.UpdateAsync(user);
            var result = await unitOfWork.SaveChangesAsync();

            if (result > 0)
                return Result<bool>.Success(
                    true,
                    model.IsActive ? "User activated successfully" : "User deactivated successfully",
                    200);

            return Result<bool>.Failure("User status update failed", 400);
        }

        public async Task<Result<bool>> DeleteUser(Guid id)
        {
            var user = await authRepository.GetUserById(id);

            if (user is null)
                return Result<bool>.Failure("User not found", 404);

            if (user.IsDeleted)
                return Result<bool>.Failure("User already deleted", 400);

            user.IsDeleted = true;

            await authRepository.UpdateAsync(user);

            var result = await unitOfWork.SaveChangesAsync();

            if (result > 0)
                return Result<bool>.Success(true, "User deleted successfully", 200);

            return Result<bool>.Failure("User deletion failed", 400);
        }

        public async Task<Result<IEnumerable<UserListResponse>>> FilterUsers(
     string? role,
     bool? isActive,
     bool? isDeleted)
        {
            var users = await authRepository.FilterUsers(
                role, isActive, isDeleted);

            if (users is null || !users.Any())
            {
                return Result<IEnumerable<UserListResponse>>.Success(
                    Enumerable.Empty<UserListResponse>(),
                    "No users found",
                    200);
            }

            return Result<IEnumerable<UserListResponse>>.Success(
                users,
                "Users fetched successfully",
                200);
        }

            
        

        public async Task<Result<IEnumerable<UserListResponse>>> GetAllUsers()
        {
            var users = await authRepository.GetAllUsers();
            if(users is not null)
            {
                return Result<IEnumerable<UserListResponse>>.Success(users, "All Users Fetched", 200);
            }
            return Result<IEnumerable<UserListResponse>>.Failure("No Users Fetched Try again later...", 500);
        }

        public async Task<Result<UserProfileResponse>> GetMyProfile()
        {
            var UserId = httpContextService.GetUserId();
           var user= await authRepository.GetUserProfile(UserId);
            if(user is null)
            {
                return Result<UserProfileResponse>.Failure("No Profile Found", 400);
            }
            return Result<UserProfileResponse>.Success(user, "Your Profile Details", 200);

        }

        public async Task<Result<UserListResponse>> GetUserById(Guid id)
        {
           var users= await authRepository.GetUserByIdForSuperAdmin(id);
            if(users is not null)
            {
                return Result<UserListResponse>.Success(users, "Specific User Fetched", 200);
            }
            return Result<UserListResponse>.Failure("No user founded to fetch", 400);
        }

        public async Task<Result<IEnumerable<UserListResponse>>> GetUsers(int pageNo, int pageSize)
        {
            var users = await authRepository.GetUsersPagination(pageNo, pageSize);
            if(users is null)
            {
                return Result<IEnumerable<UserListResponse>>.Failure("Nothing to scroll try again later", 400);
                   
            }
            return Result<IEnumerable<UserListResponse>>.Success(users,"Users Fetched with Pagination",200);

        }


        public async Task<Result<LoginResponse>> GoogleLoginAsync(GoogleLoginRequest model)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(
                model.IdToken,
                new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[]
                    {
                     configuration["GoogleAuth:ClientId"]!
                    }
                });

            var email = payload.Email;
            var firstName = payload.GivenName;
            var lastName = payload.FamilyName;
            var googleId = payload.Subject;

            if (!payload.EmailVerified)
            {
                return Result<LoginResponse>.Failure(
                    "Google email is not verified", 400);
            }

            var user = await authRepository
                .FirstOrDefaultAsync(x => x.Email == email);

            if (user is null)
            {
                var role = await roleRepository
                    .FirstOrDefaultAsync(r => r.Name == "Candidate");

                if (role is null)
                {
                    return Result<LoginResponse>.Failure(
                        "Candidate role not found", 404);
                }

                var password = Guid.NewGuid().ToString();
                var salt = appEncryption.GenerateSalt();
                var passwordHash = appEncryption.HashPassword(password, salt);

                user = new User
                {
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    GoogleId = googleId,
                    PasswordHash = passwordHash,
                    Salt = salt,
                    IsActive = true,
                    IsDeleted = false
                };

                await authRepository.AddAsync(user);

                var userRole = new UserRole
                {
                    UserId = user.Id,
                    RoleId = role.Id
                };

                await userRoleRepository.AddAsync(userRole);

                await unitOfWork.SaveChangesAsync();
            }

            if (user.IsActive != true)
            {
                return Result<LoginResponse>.Failure(
                    "Your account is blocked contact admin", 400);
            }

            if (user.IsDeleted)
            {
                return Result<LoginResponse>.Failure(
                    "Account has been deleted", 403);
            }

            var roles = await authRepository.GetRoles(user.Id);

            var loginResponse = new LoginResponse
            {
                Email = user.Email,
                UserId = user.Id,
                Roles = roles,
                Token = jWTProvider.GenerateAuthToken(user, roles)
            };

            return Result<LoginResponse>.Success(
                loginResponse, "Google Login Successfully", 200);
        }


        public async Task<Result<LoginResponse>> Login(LoginRequest model)
        {
            var user = await authRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (user is null)
            {
                return Result<LoginResponse>.Failure("Email or Password is incorrect", 400);
            }
            var userPassword = user.PasswordHash;
            var hashPassword = appEncryption.HashPassword(model.Password, user.Salt);
            if (!hashPassword.Equals(user.PasswordHash))
            {
                return Result<LoginResponse>.Failure("Username or Password is Incorrect", 400);
            }
            if (user.IsActive != true)
            {
                return Result<LoginResponse>.Failure("Your account is blocked contact admin", 400);
            }
            if (user.IsDeleted)
            {
                return Result<LoginResponse>.Failure("Account has been deleted", 403);
            }

            var roles = await authRepository.GetRoles(user.Id);
            var loginResponse = new LoginResponse
            {
                Email = user.Email,
                UserId = user.Id,
                Roles = roles,
                Token = jWTProvider.GenerateAuthToken(user, roles)
            };
            return Result<LoginResponse>.Success(loginResponse, "Logged In Successfully", 200);
        }

        public async Task<Result<bool>> RestoreUser(Guid id)
        {

            var user = await authRepository.GetUserById(id);

            if (user is null)
                return Result<bool>.Failure("User not found", 404);

            if (!user.IsDeleted)
                return Result<bool>.Failure("User is not deleted", 400);

            user.IsDeleted = false;

            await authRepository.UpdateAsync(user);

            var result = await unitOfWork.SaveChangesAsync();

            if (result > 0)
                return Result<bool>.Success(true, "User restored successfully", 200);

            return Result<bool>.Failure("User restore failed", 400);
        }

        public async Task<Result<IEnumerable<UserListResponse>>> SearchUser(string? name, string? email)
        {
            var users = await authRepository.SearchUser(name, email);
            if(users is not null)
            {
                return Result<IEnumerable<UserListResponse>>.Success(users, "Users by Search fetched", 200);
            }
            return Result<IEnumerable<UserListResponse>>.Failure("No user fetched by search", 400);
        }

        public async Task<Result<SignUpResponse>> SignUp(SignUpRequest model)
        {
            using var transaction = unitOfWork.BeginTransaction();
            var user = await authRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (user is not null)
            {
                return Result<SignUpResponse>.Failure("Email Already Exists", 400);

            }
            var User = mapper.Map<User>(model);
            User.Salt = appEncryption.GenerateSalt();
            User.PasswordHash = appEncryption.HashPassword(model.Password, User.Salt);
            var role = await roleRepository.FirstOrDefaultAsync(r => r.Name == "Candidate");

            if (role is null)
            {
                return Result<SignUpResponse>.Failure("Candidate role not found", 404);
            }
            await authRepository.AddAsync(User);
            
            
            var userRole = new UserRole
            {
                UserId = User.Id,
                RoleId = role.Id,
            };
            await userRoleRepository.AddAsync(userRole);
            var returnVal = await unitOfWork.SaveChangesAsync();
           if(returnVal > 0)
            {
                transaction.Commit();
                var response = mapper.Map<SignUpResponse>(User);
                return Result<SignUpResponse>.Success(response, "Signed Up Successfully", 200);
            }
            transaction.Rollback();
            return Result<SignUpResponse>.Failure("Their is an problem try again later",500);
        }

        public async Task<Result<UserProfileResponse>> UpdateProfile(UserUpdateRequest model)
        {
            var userId = httpContextService.GetUserId();
            var user = await authRepository.GetUserById(userId);
            if(user is null)
            {
                return Result<UserProfileResponse>.Failure("User not found", 404);
            }
            mapper.Map(model, user);
            await authRepository.UpdateAsync(user);
           var returnValue= await unitOfWork.SaveChangesAsync();
            if(returnValue > 0)
            {
                var response = new UserProfileResponse
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

                return Result<UserProfileResponse>.Success(
                    response, "Your Profile is Updated", 200);
            }
            return Result<UserProfileResponse>.Failure("No changes were made", 400);
        }

        public async Task<Result<UserListResponse>> UpdateUser(Guid id,SuperAdminUpdateUserRequest model)
        {
            var user = await authRepository.GetUserById(id);

            if (user is null)
            {
                return Result<UserListResponse>
                    .Failure("User not found", 404);
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;

            await authRepository.UpdateAsync(user);

            var result = await unitOfWork.SaveChangesAsync();

            if (result > 0)
            {
                var response = mapper.Map<UserListResponse>(user);
                return Result<UserListResponse>
                    .Success(response, "User updated successfully", 200);
            }
            return Result<UserListResponse>.Failure("User update failed", 400);
        }
    }
}
