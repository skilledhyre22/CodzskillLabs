using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.Identity;
using CodzSkillLabs.InfraStructure.JWTProvider;
using Microsoft.AspNetCore.Http;

namespace CodzSkillLabs.InfraStructure.Identity
{
    public class HttpContextService(IHttpContextAccessor httpContext) : IHttpContextService
    {
        public Guid GetUserId()
        {
            var strId = httpContext?.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == UserClaims.UserId)?.Value;
            if(Guid.TryParse(strId,out Guid userId)) return userId;
            return Guid.Empty;
        }

        public bool IsInRole(string role)
        {
            return httpContext.HttpContext?
                .User.IsInRole(role) ?? false;
        }
    }
}
