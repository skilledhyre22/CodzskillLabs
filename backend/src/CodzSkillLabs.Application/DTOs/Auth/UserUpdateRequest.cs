using System;
using System.Collections.Generic;
using System.Text;

namespace CodzSkillLabs.Application.DTOs.Auth
{
    using System.ComponentModel.DataAnnotations;

    public class UserUpdateRequest
    {
        [Required(ErrorMessage = "First name is required")]
        [StringLength(50, MinimumLength = 2,
            ErrorMessage = "First name must be between 2 and 50 characters")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(50, MinimumLength = 2,
            ErrorMessage = "Last name must be between 2 and 50 characters")]
        public string LastName { get; set; } = string.Empty;
    }
}
