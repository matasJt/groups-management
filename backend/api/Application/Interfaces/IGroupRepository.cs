using Domain.Entities;

namespace Application.Interfaces;

public interface IGroupRepository
{
    Task<Group?> GetByIdAsync(Guid id);
    Task<IEnumerable<Group>> GetAllAsync();
    Task AddAsync(Group group);
    Task UpdateAsync(Group group);
    Task RemoveAsync(Group group);
    
    Task AddGroupMemberAsync(Member member);
    Task RemoveGroupMemberAsync(Member member);
    Task UpdateGroupMemberAsync(Member member);
    Task DeleteMultipleAsync(IEnumerable<Group> groups);
}