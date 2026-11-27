using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using CodzSkillLabs.Application.DTOs.Cohort;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.Domain.Enums;
using CodzSkillLabs.InfraStructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class CohortRepository(CodzSkillLabsDbContext context) : BaseRepository<Cohort>(context), ICohortRepository
    {
        public async Task<IEnumerable<CohortResponse>> GetAllCohorts()
        {
            var result = await (
                from ct in context.Cohorts
                join c in context.Courses
                on ct.CourseId equals c.Id
                select new CohortResponse()
                {
                    Id = ct.Id,
                    CourseId = ct.CourseId,
                    CourseName = c.Title,
                    Name = ct.Name,
                    Overview = ct.Overview,
                    StartDate = ct.StartDate,
                    EndDate = ct.EndDate,
                    DurationWeeks = ct.DurationWeeks,
                    ClassesPerWeek = ct.ClassesPerWeek,
                    Capacity = ct.Capacity,
                    Status = ct.Status
                }
            ).ToListAsync();

            return result;
        }

        public async Task<CohortResponse> GetCohortById(Guid id)
        {
            var result = await (
                from ct in context.Cohorts
                join c in context.Courses
                on ct.CourseId equals c.Id
                where ct.Id == id

                select new CohortResponse()
                {
                    Id = ct.Id,
                    CourseId = ct.CourseId,
                    CourseName = c.Title,
                    Name = ct.Name,
                    Overview = ct.Overview,
                    StartDate = ct.StartDate,
                    EndDate = ct.EndDate,
                    DurationWeeks = ct.DurationWeeks,
                    ClassesPerWeek = ct.ClassesPerWeek,
                    Capacity = ct.Capacity,
                    Status = ct.Status
                }
            ).FirstOrDefaultAsync();

            return result!;
        }

        public async Task<IEnumerable<CohortResponse>> GetCohortsByCourseId(Guid courseId)
        {
            var result = await (
                from ct in context.Cohorts
                join c in context.Courses
                on ct.CourseId equals c.Id
                where ct.CourseId == courseId
                select new CohortResponse
                {
                    Id = ct.Id,
                    CourseId = ct.CourseId,
                    CourseName = c.Title,
                    Name = ct.Name,
                    Overview = ct.Overview,
                    StartDate = ct.StartDate,
                    EndDate = ct.EndDate,
                    DurationWeeks = ct.DurationWeeks,
                    ClassesPerWeek = ct.ClassesPerWeek,
                    Capacity = ct.Capacity,
                    Status = ct.Status
                }
            ).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<CohortResponse>> GetCohortsByUserId(Guid userId)
        {
            var result = await (
                from ct in context.Cohorts
                join c in context.Courses
                on ct.CourseId equals c.Id
                where c.UserId == userId
                select new CohortResponse
                {
                    Id = ct.Id,
                    CourseId = ct.CourseId,
                    CourseName = c.Title,
                    Name = ct.Name,
                    Overview = ct.Overview,
                    StartDate = ct.StartDate,
                    EndDate = ct.EndDate,
                    DurationWeeks = ct.DurationWeeks,
                    ClassesPerWeek = ct.ClassesPerWeek,
                    Capacity = ct.Capacity,
                    Status = ct.Status
                }
            ).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<CohortResponse>> GetPendingCohorts()
        {
            var result = await (
                from ct in context.Cohorts
                join c in context.Courses
                on ct.CourseId equals c.Id
                where ct.Status == CohortStatus.Draft
                select new CohortResponse
                {
                    Id = ct.Id,
                    CourseId = ct.CourseId,
                    CourseName = c.Title,
                    Name = ct.Name,
                    Overview = ct.Overview,
                    StartDate = ct.StartDate,
                    EndDate = ct.EndDate,
                    DurationWeeks = ct.DurationWeeks,
                    ClassesPerWeek = ct.ClassesPerWeek,
                    Capacity = ct.Capacity,
                    Status = ct.Status
                }
            ).ToListAsync();

            return result;
        }
        public async Task<IEnumerable<CohortResponse>> GetPublishedCohorts()
        {
            var result = await (
                 from ct in context.Cohorts
                 join c in context.Courses
                 on ct.CourseId equals c.Id
                 where ct.Status==CohortStatus.Published && c.Status==CourseStatus.Approved
                 select new CohortResponse()
                 {
                     Id = ct.Id,
                     CourseId = ct.CourseId,
                     CourseName = c.Title,
                     Name = ct.Name,
                     Overview = ct.Overview,
                     StartDate = ct.StartDate,
                     EndDate = ct.EndDate,
                     DurationWeeks = ct.DurationWeeks,
                     ClassesPerWeek = ct.ClassesPerWeek,
                     Capacity = ct.Capacity,
                     Status = ct.Status
                 }
             ).ToListAsync();

            return result;
        }
    }
}
