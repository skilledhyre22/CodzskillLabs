using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.DTOs.Role;
using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Application.Services;
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

    public class CohortProfile : Profile
    {
        public CohortProfile()
        {
            CreateMap<CohortRequest, Cohort>().ReverseMap();
            CreateMap<CohortUpdateRequest, Cohort>().ReverseMap();
            CreateMap<CohortResponse, Cohort>().ReverseMap();
            CreateMap<CohortUpdateStatus, Cohort>().ReverseMap();
        }
    }
    public class TrainerProfile : Profile
    {
        public TrainerProfile()
        {
            CreateMap<TrainerRequest, Course>().ReverseMap();
            CreateMap<Trainer, TrainerResponse>().ReverseMap();
            CreateMap<TrainerUpdateRequest, Trainer>().ReverseMap();
        }
    }
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            CreateMap<CourseRequest, Course>().ReverseMap();
            CreateMap<CourseResponse, Course>().ReverseMap();
            CreateMap<CourseUpdateRequest, Course>().ReverseMap();
        }
    }
}
