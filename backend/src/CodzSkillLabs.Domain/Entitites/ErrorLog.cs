using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Domain.Common;

namespace CodzSkillLabs.Domain.Entitites
{
    public class ErrorLog:BaseEntity
    {
        public string Message { get; set; } = string.Empty;
        public string? StackTrace { get; set; }
        public string? RequestPath { get; set; }
        public string? InnerException { get; set; }
        public string? Source { get; set; }
        public string? RequestMethod { get; set; }

        public string? TraceId { get; set; }

        public int StatusCode { get; set; }
    }
}
