using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.Dto;

public record MemberDto(Guid Id, string Name, GroupDto Group, decimal Owe, decimal Owed, bool Settled)
{
    public static MemberDto From(Member member) =>
        new(member.Id,
            member.Name,
            GroupDto.From(member.Group),
            member.Owe,
            member.Owed,
            member.Settled);
}

public record MemberCreateDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(1)]
    [MaxLength(15)]
    public string? Name { get; init; }
}