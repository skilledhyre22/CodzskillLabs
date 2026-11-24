using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface ICourseRepository:IBaseRepository<Course>
    {
        Task<IEnumerable<Course>> GetPendingCourses();
        Task<IEnumerable<Course>> GetPublishedCourses();
        Task<IEnumerable<Course>> SearchCourse(string name);
        Task<IEnumerable<Course>> FilterCourse(decimal price);


    }
}
