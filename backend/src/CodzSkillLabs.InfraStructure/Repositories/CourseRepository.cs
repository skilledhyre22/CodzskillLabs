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
        public async Task<IEnumerable<Course>> SearchMyCourse(string name,Guid userId)
        {
            return await context.Courses
                .Include(x => x.User)
                .Where(x => x.UserId == userId &&
                            x.Status == CourseStatus.Approved &&
                            x.Title.Contains(name))
                .ToListAsync();
        }


        public async Task<IEnumerable<CourseResponse>> GetAllCourses()
        {
            return await (
                from course in context.Courses
                join user in context.Users
                    on course.UserId equals user.Id
                select new CourseResponse
                {
                    Id = course.Id,
                    Title = course.Title,
                    Description = course.Description,
                    BadgeLabel = course.BadgeLabel,
                    Price = course.Price,
                    UserId = course.UserId,
                    CourseCreatedBy = user.FirstName + " " + user.LastName,
                    Category = course.Category,
                    Status = course.Status
                }
            ).ToListAsync();
        }

        public async Task<IEnumerable<CourseResponse>> GetPublishedCourses(Guid userId)
        {
            return await (
                from course in context.Courses
                join user in context.Users
                    on course.UserId equals user.Id
                where course.UserId == userId &&
                      course.Status == CourseStatus.Approved
                select new CourseResponse
                {
                    Id = course.Id,
                    Title = course.Title,
                    Description = course.Description,
                    BadgeLabel = course.BadgeLabel,
                    Price = course.Price,
                    UserId = course.UserId,
                    CourseCreatedBy = user.FirstName + " " + user.LastName,
                    Category = course.Category,
                    Status = course.Status
                }
            ).ToListAsync();
        }

        public async Task<IEnumerable<Course>> FilterMyCourse(
     decimal price,
     Guid userId)
        {
            return await context.Courses
                .Include(x => x.User)
                .Where(x => x.UserId == userId &&
                            x.Price <= price &&
                            x.Status == CourseStatus.Approved)
                .OrderBy(x => x.Price)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetAllCourses(
    string? search,
    string? sortByPrice)
        {
            var query = context.Courses
                .Include(x => x.User)
                .Where(x => string.IsNullOrWhiteSpace(search) ||
                            x.Title.Contains(search));

            query = sortByPrice?.ToLower() switch
            {
                "low" => query.OrderBy(x => x.Price),
                "high" => query.OrderByDescending(x => x.Price),
                _ => query
            };

            return await query.ToListAsync();
        }
    }
}
