using CodzSkillLabs.Application.DTOs.Course;
using CodzSkillLabs.Application.Features.Courses.Commands.CreateCourse;
using CodzSkillLabs.Application.Features.Courses.Commands.UpdateCourse;
using CodzSkillLabs.Application.Features.Courses.Commands.UpdateCourseStatus;
using CodzSkillLabs.Application.Features.Courses.Queries.FilterCourseQuery;
using CodzSkillLabs.Application.Features.Courses.Queries.GetAllCourses;
using CodzSkillLabs.Application.Features.Courses.Queries.GetAllCoursesForAdmin;
using CodzSkillLabs.Application.Features.Courses.Queries.GetCourseById;
using CodzSkillLabs.Application.Features.Courses.Queries.GetPublishedCourses;
using CodzSkillLabs.Application.Features.Courses.Queries.SearchCourseQuery;
using CodzSkillLabs.Application.Utility;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodzSkillLabs.API.EndPoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController(ISender sender) : ControllerBase
    {
        [Authorize]
        [HttpPost("create-course")]
        public async Task<Result<CourseResponse>> CreateCourse(CourseRequest model)
        {
            return await sender.Send(new CreateCourseCommand(model));
        }

        [Authorize]
        [HttpGet("all-courses")]
        public async Task<Result<IEnumerable<CourseResponse>>> GetAllCourses()
        {
            return await sender.Send(new GetAllCourseQuery());
        }

        [Authorize]
        [HttpGet("{id:guid}")]
        public async Task<Result<CourseResponse>> GetCourseById(Guid id)
        {
            return await sender.Send(new GetCourseByIdQuery(id));
        }

        [Authorize]
        [HttpPut("update-course/{id:guid}")]
        public async Task<Result<CourseResponse>> UpdateCourse(CourseUpdateRequest model)
        {
            return await sender.Send(new UpdateCourseCommand(model));
        }

        [Authorize]
        [HttpPut("update-status/{id:guid}")]
        public async Task<Result<CourseResponse>> ChangeCourseStatus([FromRoute] Guid id,[FromBody]CourseUpdateStatus model)
        {
            return await sender.Send(new UpdateCourseStatusCommand(id,model));
        }


        [Authorize]
        [HttpGet("published-courses")]
        public async Task<Result<IEnumerable<CourseResponse>>> GetPublishedCourses()
        {
            return await sender.Send(new GetPublishedCoursesQuery());
        }

        [Authorize]
        [HttpGet("search-course")]
        public async Task<Result<IEnumerable<CourseResponse>>> SearchCourse([FromQuery] string name)
        {
                return await sender.Send(new SearchCourseQuery(name));
        }

        [Authorize]
        [HttpGet("filter-course")]
        public async Task<Result<IEnumerable<CourseResponse>>> FilterCourse([FromQuery] decimal Price)
        {
            return await sender.Send(new FilterCourseQuery(Price));
        }

        [Authorize]
        [HttpGet("super-admin/all-courses")]
        public async Task<Result<IEnumerable<CourseResponse>>> GetCourseForAdmin([FromQuery] string ? name, [FromQuery] string? sortByPrice)
        {
            return await sender.Send(new GetAllCoursesForAdminQuery(name,sortByPrice));
        }

    }
}
