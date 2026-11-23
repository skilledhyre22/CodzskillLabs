using System;
using System.Collections.Generic;
using System.Text;
using CodzSkillLabs.Application.DTOs.Trainer;
using CodzSkillLabs.Application.Interfaces.IRepository;
using CodzSkillLabs.Domain.Entitites;
using CodzSkillLabs.InfraStructure.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace CodzSkillLabs.InfraStructure.Repositories
{
    public class TrainerRepository(CodzSkillLabsDbContext context) : BaseRepository<Trainer>(context), ITrainerRepository
    {
        public async Task<IEnumerable<TrainerResponse>> GetPendingApplication()
        {

            var query = $@"
                        SELECT
                        T.Id,
                        T.UserId,
                        U.FirstName + ' ' + U.LastName AS FullName,
                        U.Email,
                        T.PrimarySkill,
                        T.YearsOfExperience,
                        T.Status,
                        T.CreatedAt,
                        R.Name AS Role
                    FROM Trainers T
                    INNER JOIN Users U ON T.UserId = U.Id
                    LEFT JOIN UserRoles UR ON U.Id = UR.UserId
                    LEFT JOIN Roles R ON UR.RoleId = R.Id
                    WHERE T.Status = 1;
                ";
            return await QueryAsync<TrainerResponse>(query);


        }

        public async Task<TrainerResponse> GetTrainerById(Guid id)
        {

            var query = $@"
                        SELECT
                        T.Id,
                        T.UserId,
                        U.FirstName + ' ' + U.LastName AS FullName,
                        U.Email,
                        T.PrimarySkill,
                        T.YearsOfExperience,
                        T.Status,
                        T.CreatedAt,
                        R.Name AS Role
                    FROM Trainers T
                    INNER JOIN Users U ON T.UserId = U.Id
                    LEFT JOIN UserRoles UR ON U.Id = UR.UserId
                    LEFT JOIN Roles R ON UR.RoleId = R.Id
                        where T.id=@id"
                    ;
            return await FirstOrDefaultAsync<TrainerResponse>(query, new { id });


    }
    }
}

