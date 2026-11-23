using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Mappings
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<SignUpRequest, User>().ReverseMap();
            CreateMap<SignUpResponse, User>().ReverseMap();
            CreateMap<UserProfileResponse, User>().ReverseMap();
            CreateMap<UserUpdateRequest, User>().ReverseMap();
            CreateMap<UserListResponse, User>().ReverseMap();
        }
    }

    public class RoleProfile:Profile
    {
        public RoleProfile()
        {
            CreateMap<RoleResponse, Role>().ReverseMap();
        }
    }
    public class TrainerProfile : Profile
    {
        public TrainerProfile()
        {
            CreateMap<TrainerRequest, Trainer>().ReverseMap();
            CreateMap<Trainer, TrainerResponse>().ReverseMap();
            CreateMap<UpdateTrainerStatusRequest, Trainer>().ReverseMap();
        }
    }
}
