using System.ComponentModel.DataAnnotations;

namespace api.Model.Dto;

public record GroupDto(Guid Id, string Name,decimal TotalOwe,decimal TotalOwed);

public record CreateGroupDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(1)]
    [MaxLength(15)]
    public string? Name { get; init; }
}