using System.ComponentModel.DataAnnotations;
using api.Model.Dto;

namespace api.Model;

public class Group(Guid id, string name, decimal totalOwe=0, decimal totalOwed=0)
{
    public Guid Id { get; set; } = id;
    public string Name { get; set; } = name;
    public decimal TotalOwe { get; set; } = totalOwe;
    public decimal TotalOwed { get; set; } = totalOwed;

    public GroupDto ToDto() => new(Id, Name, TotalOwe, TotalOwed);
    
}