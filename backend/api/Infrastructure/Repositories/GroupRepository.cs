using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class GroupRepository(DataDbContext dbContext) : IGroupRepository
{
    public async Task DeleteMultipleAsync(IEnumerable<Group> groups)
    {
        dbContext.Groups.RemoveRange(groups);
        await dbContext.SaveChangesAsync();
    }
    public async Task<Group?> GetByIdAsync(Guid id)
    {
        return await dbContext.Groups.Include(g=> g.Members).FirstOrDefaultAsync(g=> g.Id == id);
    }

    public async Task<IEnumerable<Group>> GetAllAsync()
    {
        return await dbContext.Groups.Include(g=> g.Members).ToListAsync();
    }

    public async Task AddAsync(Group group)
    {
        dbContext.Groups.Add(group);
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Group group)
    {
        dbContext.Groups.Update(group);
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Group group)
    {
        dbContext.Groups.Remove(group);
        await dbContext.SaveChangesAsync();
    }

    public async Task AddGroupMemberAsync(Member member)
    {
        dbContext.Members.Add(member);
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveGroupMemberAsync(Member member)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateGroupMemberAsync(Member member)
    {
        throw new NotImplementedException();
    }
}