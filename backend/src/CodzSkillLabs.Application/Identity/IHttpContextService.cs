using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.Identity
{
    public interface IHttpContextService
    {
        Guid GetUserId();
    }
}
