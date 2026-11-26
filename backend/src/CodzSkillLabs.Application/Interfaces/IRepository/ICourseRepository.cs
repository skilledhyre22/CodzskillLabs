using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Domain.Entitites;

namespace CodzSkillLabs.Application.Interfaces.IRepository
{
    public interface ICourseRepository:IBaseRepository<Course>
    {
        Task<IEnumerable<CourseResponse>> GetAllCourses();
        Task<IEnumerable<CourseResponse>> GetPublishedCourses(Guid userId);
        Task<IEnumerable<Course>> SearchMyCourse(string name,Guid userId);
        Task<IEnumerable<Course>> FilterMyCourse(decimal price,Guid userId);
        Task<IEnumerable<Course>> GetAllCourses(string? search, string? sortByPrice);

    }
}
