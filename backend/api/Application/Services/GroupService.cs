using Application.Dto;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class GroupService(IGroupRepository groupRepository)
{
    public async Task<GroupDto> AddGroup(CreateGroupDto dto)
    {
        var group = new Group(Guid.NewGuid(), dto.Name!);
        await groupRepository.AddAsync(group);
        return GroupDto.From(group);
    }

    public async Task<bool> DeleteMultipleGroups(IEnumerable<Guid> ids)
    {
        var groups = await groupRepository.GetAllAsync();
        var groupsToDelete = groups.Where(g => ids.Contains(g.Id) && g is { TotalOwed: 0, TotalOwe: 0 }).ToList();
        if (ids.Count() != groupsToDelete.Count)
        {
            return false;
        }

        await groupRepository.DeleteMultipleAsync(groupsToDelete);
        return true;
    }

    public async Task<MemberDto?> AddMemberToGroup(MemberCreateDto dto, Guid groupId)
    {
        var group = await groupRepository.GetByIdAsync(groupId);
        var member = group.AddMember(dto.Name!);
        await groupRepository.AddGroupMemberAsync(member);
        await groupRepository.UpdateAsync(group);
        return MemberDto.From(member);
    }

    public async Task<IEnumerable<Group>> GetAllGroups()
    {
        return await groupRepository.GetAllAsync();
    }

    public async Task<Group?> GetGroup(Guid groupId)
    {
       return await groupRepository.GetByIdAsync(groupId);
    }
}