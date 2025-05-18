using System.ComponentModel.DataAnnotations;
using api.Model.Dto;

namespace api.Model;

public class Group
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal TotalOwe { get; set; }
    public decimal TotalOwed { get; set; }

    public GroupDto ToDto()
    {
        return new GroupDto(Id, Name, TotalOwe, TotalOwed);
    }
}