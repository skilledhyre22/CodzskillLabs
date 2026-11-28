using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Domain.Enums
{
    
    public enum CourseCategory:byte
    {
        Development=1,
        AI=2,
        CyberSecurity=3,
        MachineLearning=4
    }

    public enum CourseStatus:byte
    {
        Approved=1,
        Pending=2,
        Rejected=3
    }

    public enum CohortStatus:byte
    {
        Draft = 1,
        Published = 2,
        Ongoing = 3,
        Completed = 4,
        Cancelled = 5
    }



}

