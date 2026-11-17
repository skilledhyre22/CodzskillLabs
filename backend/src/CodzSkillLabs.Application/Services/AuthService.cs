using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.Interfaces.IAppEncryption;
using CodzSkillLabs.Application.Interfaces.IJWTProvider;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Services
{
    public class AuthService(IAuthRepository authRepository,IMapper mapper,IUnitOfWork unitOfWork,IAppEncryption appEncryption,IRoleRepository roleRepository,IUserRoleRepository userRoleRepository,IJWTProvider jWTProvider) : IAuthService
    {
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
            await authRepository.AddAsync(User);
            var role = new Role
            {
                Name = "Candidate"
            };
            await roleRepository.AddAsync(role);
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
            return Result<SignUpResponse>.Failure("Their is an problem try again later",500);
        }
        
    }
}
