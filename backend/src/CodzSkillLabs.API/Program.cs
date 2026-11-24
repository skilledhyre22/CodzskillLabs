using Carter;
using CodzSkillLabs.API;
using CodzSkillLabs.API.MiddleWare;
using CodzSkillLabs.Application;
using CodzSkillLabs.InfraStructure;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddApiService(builder.Configuration);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCustomMiddleWare();