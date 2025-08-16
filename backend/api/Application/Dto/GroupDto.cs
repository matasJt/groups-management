using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.Dto;

public record GroupDto(Guid Id, string Name, decimal TotalOwe, decimal TotalOwed)
{
    public static GroupDto From(Group group) =>
        new(group.Id, group.Name, group.TotalOwe, group.TotalOwed);
}

public record CreateGroupDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(1)]
    [MaxLength(15)]
    public string? Name { get; init; }
}