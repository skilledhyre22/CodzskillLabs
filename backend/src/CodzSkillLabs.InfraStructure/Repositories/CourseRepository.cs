using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.Domain.Enums;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class CourseRepository(CodzSkillLabsDbContext context) : BaseRepository<Course>(context), ICourseRepository
    {
        public async Task<IEnumerable<Course>> FilterCourse(decimal price)
        {
            return await context.Courses
               .Where(x => x.Price <= price &&
                           x.Status == CourseStatus.Approved)
               .OrderBy(x => x.Price)
               .ToListAsync();
        }


        public async Task<IEnumerable<Course>> GetPendingCourses()
        {
            return await context.Courses.Where(x => x.Status == Domain.Enums.CourseStatus.Pending).ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetPublishedCourses()
        {
            return await context.Courses.Where(x => x.Status == Domain.Enums.CourseStatus.Approved).ToListAsync();
        }

        public async Task<IEnumerable<Course>> SearchCourse(string name)
        {
            return await context.Courses.Where(x => x.Title.Contains(name)).ToListAsync();
        }
    }
}
