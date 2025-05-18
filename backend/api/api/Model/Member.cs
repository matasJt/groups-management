using System.ComponentModel.DataAnnotations;
using api.Model.Dto;

namespace api.Model;

public class Member
{
    public Guid Id { get; set; }
    public string Name{ get; set; }
    public decimal Owe { get; set; }
    public decimal Owed { get; set; }
    public bool Settled { get; set; }
    public Group Group { get; set; }

    public MemberDto ToDto()
    {
        GroupDto groupDto = new GroupDto(Group.Id, Group.Name, Group.TotalOwe, Group.TotalOwed);
        return new MemberDto(Id, Name, groupDto, Owe,Owed, Settled);
    }
}