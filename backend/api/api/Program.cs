using api.Data;
using api.Model.Dto;
using api.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SharpGrip.FluentValidation.AutoValidation.Endpoints.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<GroupsService>();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GroupsDbContext>(options =>
    options.UseInMemoryDatabase(builder.Configuration.GetConnectionString("GroupDatabase") ??
                                throw new InvalidOperationException()));
builder.Services.AddCors(policy => policy.AddDefaultPolicy(options =>
    options.WithOrigins("http://localhost:3001").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
var app = builder.Build();


app.UseCors();

app.UseAuthorization();
app.MapControllers();

app.Run();