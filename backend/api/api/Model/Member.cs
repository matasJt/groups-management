using System.ComponentModel.DataAnnotations;
using api.Model.Dto;

namespace api.Model;

public class Member(Guid id, string name, bool settled = false, decimal owed = 0, decimal owe = 0)
{
    public Guid Id { get; set; } = id;
    public string Name { get; set; } = name;
    public decimal Owe { get; set; } = owe;
    public decimal Owed { get; set; } = owed;
    public bool Settled { get; set; } = settled;
    public Group Group { get; set; } = null!;

    public MemberDto ToDto() =>
        new(
            Id,
            Name,
            new GroupDto(Group.Id, Group.Name, Group.TotalOwe, Group.TotalOwed),
            Owe,
            Owed,
            Settled
        );
}