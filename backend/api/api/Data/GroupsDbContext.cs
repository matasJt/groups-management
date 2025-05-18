using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class GroupsDbContext(DbContextOptions<GroupsDbContext> options) : DbContext(options)
{
    public DbSet<Group> Groups { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Member> Members { get; set; }
    
}