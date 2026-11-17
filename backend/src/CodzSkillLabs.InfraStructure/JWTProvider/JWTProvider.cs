using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CodzSkillLabs.Application.Interfaces.IJWTProvider;
using CodzSkillLabs.Domain.Entitites;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace CodzSkillLabs.InfraStructure.JWTProvider
{
    public class JWTProvider(IConfiguration configuration) : IJWTProvider
    {
            public string GenerateAuthToken(User user, List<string> roles)
            {
                var claims = new List<Claim>
        {
            new Claim(
                UserClaims.UserId,
                user.Id.ToString()
            ),

            new Claim(
                Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Email,user.Email
            )
        };

                foreach (var role in roles)
                {
                    claims.Add(
                        new Claim(
                            ClaimTypes.Role,
                            role
                        )
                    );
                }

                var descriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Audience = configuration["JWT:Audience"],
                    Issuer = configuration["JWT:Issuer"],
                    Expires = DateTime.UtcNow.AddDays(3),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]!)), SecurityAlgorithms.HmacSha384)
                };

                var tokenhandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = tokenhandler.CreateToken(descriptor);
                var token = tokenhandler.WriteToken(tokenDescriptor);
                return token;
            }
        }
    }
