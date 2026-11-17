using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;


namespace CodzSkillLabs.Application.Utility
{
    public class Result<T>
    {
        public T? Data { get; set; }

        public string Message { get; set; } = string.Empty;

        public int StatusCode { get; set; }

        public Microsoft.AspNetCore.Mvc.ProblemDetails ProblemDetails { get; set; }

        public bool IsSuccess => ProblemDetails is null;

        public Result(T? data = default, int statusCode = Microsoft.AspNetCore.Http.StatusCodes.Status200OK)
        {
            Data = data;
            StatusCode = statusCode;
        }

        public Result(ProblemDetails problemDetails)
        {
            ProblemDetails = problemDetails;
        }

        //Success

        public static Result<T> Success(T? data, string message, int statusCode)
        {
            return new Result<T>
            {
                Data = data,
                Message = message,
                StatusCode = statusCode
            };
        }

        public static Result<T> Success(T? data, int statusCode)
        {
            return new Result<T>
            {
                Data = data,
                StatusCode = statusCode
            };
        }

        public static Result<T> Success(T? data, string message)
        {
            return new Result<T>
            {
                Data = data,
                Message = message
            };
        }

        public static Result<T> Success(string message)
        {
            return new Result<T>
            {

                Message = message
            };
        }

        //Failure

        public static Result<T> Failure(ProblemDetails problemDetails)
        {
            var details = new ProblemDetails
            {
                Status = problemDetails.Status,
                Detail = problemDetails.Detail,
                Instance = problemDetails.Instance,
                Title = problemDetails.Title,
                Type = problemDetails.Type,
            };
            return new Result<T>(details);
        }

        public static Result<T> Failure(string message, int statusCode)
        {
            var details = new ProblemDetails
            {
                Title = message,
                Status = statusCode
            };

            return new Result<T>(details);
        }

    }
}
