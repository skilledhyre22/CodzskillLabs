using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using CodzSkillLabs.Application.DTOs.Auth;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Mappings
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<SignUpRequest, User>().ReverseMap();
            CreateMap<SignUpResponse, User>().ReverseMap();
        }
    }
}
