using Application.Interfaces;
using Application.Services;
using Infrastructure.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Web;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddScoped<GroupService>();
        builder.Services.AddScoped<IGroupRepository, GroupRepository>();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<DataDbContext>(options =>
            options.UseInMemoryDatabase(builder.Configuration.GetConnectionString("GroupDatabase") ??
                                        throw new InvalidOperationException()));
        builder.Services.AddCors(policy => policy.AddDefaultPolicy(options =>
            options.WithOrigins("http://localhost:3001").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors();

        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}