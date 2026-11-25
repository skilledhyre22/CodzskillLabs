using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Application.Interfaces.IAppEncryption;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Application.Interfaces.IService;
using CodzSkillLabs.Application.Interfaces.IUnitOfWork;
using CodzSkillLabs.Application.Utility;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.Domain.Enums;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;

namespace CodzSkillLabs.Application.Services
{
    public class TrainerService(IAuthRepository authRepository,IMapper mapper,ITrainerRepository trainerRepository,IUnitOfWork unitOfWork,IAppEncryption appEncryption,IRoleRepository roleRepository,IUserRoleRepository userRoleRepository) : ITrainerService
    {
        public async Task<Result<TrainerResponse>> AddTrainer(TrainerRequest model)
        {
            using var transaction = unitOfWork.BeginTransaction();

            var existingUser = await authRepository
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (existingUser is not null)
            {
                return Result<TrainerResponse>.Failure(
                    "Email already exists. Please login to apply as Trainer.",
                    400);
            }

            var role = await roleRepository
                .FirstOrDefaultAsync(r => r.Name == "Candidate");

            if (role is null)
            {
                return Result<TrainerResponse>.Failure(
                    "Candidate role not found", 404);
            }

            var nameParts = model.FullName.Trim()
                .Split(' ', 2);

            if (nameParts.Length == 0)
            {
                return Result<TrainerResponse>.Failure(
                    "Full name is required", 400);
            }
            var salt = appEncryption.GenerateSalt();


            var user = new User
            {
                FirstName = nameParts[0],
                LastName = nameParts.Length > 1 ? nameParts[1] : string.Empty,
                Email = model.Email,
                Salt = salt,
                PasswordHash = appEncryption.HashPassword(model.Password, salt)
            };

            await authRepository.AddAsync(user);

            var userRole = new UserRole
            {
                UserId = user.Id,
                RoleId = role.Id
            };

            await userRoleRepository.AddAsync(userRole);

            var trainer = new Trainer
            {
                UserId = user.Id,
                PrimarySkill = model.PrimarySkill,
                YearsOfExperience = model.YearsOfExperience,
            };

            await trainerRepository.AddAsync(trainer);

            var result = await unitOfWork.SaveChangesAsync();

            if (result > 0)
            {
                transaction.Commit();

                var response = mapper.Map<TrainerResponse>(trainer);
                response.Email = user.Email;
                response.FullName = user.FirstName + " " + user.LastName;
                response.Role = role.Name;
                return Result<TrainerResponse>.Success(
                    response,
                    "Trainer application submitted successfully. Awaiting approval.",
                    200);
            }

            transaction.Rollback();

            return Result<TrainerResponse>.Failure(
                "Something went wrong. Please try again later.",
                500);
        }

        public async  Task<Result<IEnumerable<TrainerResponse>>> GetAllTrainers()
        {
            var trainers = await trainerRepository.GetAllTrainers();
            if(trainers is not null)
            {
                return Result<IEnumerable<TrainerResponse>>.Success(trainers, "All Trainers Fetched", 200);
            }
            return Result<IEnumerable<TrainerResponse>>.Failure("No trainer found", 400);

        }

        public async Task<Result<TrainerResponse>> GetTrainerById(Guid id)
        {
            var trainer = await trainerRepository.GetTrainerById(id);

            if (trainer is null)
            {
                return Result<TrainerResponse>.Failure("No Trainer Found", 404);
            }

            var user = await authRepository.GetByIdAsync(trainer.UserId);

            if (user is null)
            {
                return Result<TrainerResponse>.Failure("No User Found", 404);
            }

            var response = mapper.Map<TrainerResponse>(trainer);

            response.FullName = user.FirstName + " " + user.LastName;
            response.Email = user.Email;

            var userRole = await userRoleRepository
                .FirstOrDefaultAsync(x => x.UserId == user.Id);

            if (userRole is not null)
            {
                var role = await roleRepository.GetByIdAsync(userRole.RoleId);
                response.Role = role?.Name ?? string.Empty;
            }

            return Result<TrainerResponse>.Success(
                response,
                "Trainer Fetched",
                200
            );
        }

        public async Task<Result<TrainerResponse>> UpdateTrainer(TrainerUpdateRequest model)
        {
            var trainer = await trainerRepository.GetByIdAsync(model.Id);

            if (trainer is null)
            {
                return Result<TrainerResponse>.Failure("No Trainer Found", 404);
            }

            mapper.Map(model, trainer);

            await trainerRepository.UpdateAsync(trainer);
            await unitOfWork.SaveChangesAsync();

            var updatedTrainer = await GetTrainerById(model.Id);

            if (!updatedTrainer.IsSuccess)
            {
                return Result<TrainerResponse>.Failure(
                    updatedTrainer.Message, updatedTrainer.StatusCode);
            }

            return Result<TrainerResponse>.Success(
                updatedTrainer.Data,
                "Trainer Updated Successfully",
                200);
        }
    }
}
