using api.Data;
using api.Model;
using api.Model.Dto;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class GroupsService(GroupsDbContext context)
{
    public decimal SplitValue(decimal amount, int memberCount)
    {
        return amount / memberCount;
    }

    private bool IsSettled(Member member)
    {
        return member.Owed == 0;
    }

    public async Task<bool> DeleteMemberAsync(Guid guid)
    {
        var member = await context.Members.FindAsync(guid);
        if (member == null || !IsSettled(member))
            return false;
        context.Members.Remove(member);
        await context.SaveChangesAsync();
        return true;
    }
}