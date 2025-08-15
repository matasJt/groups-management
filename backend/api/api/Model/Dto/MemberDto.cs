using System.ComponentModel.DataAnnotations;

namespace api.Model.Dto;

public record MemberDto(Guid Id, string Name, GroupDto Group, decimal Owe, decimal Owed, bool Settled);

public record MemberCreateDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(1)]
    [MaxLength(15)]
    public string? Name { get; init; }
}