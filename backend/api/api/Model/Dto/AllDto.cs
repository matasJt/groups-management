using System.ComponentModel.DataAnnotations;
using FluentValidation;
using static api.Model.Transaction;

namespace api.Model.Dto;

public record GroupDto(Guid Id, string Name,decimal TotalOwe,decimal TotalOwed);

public record CreateGroupDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(1)]
    public string? Name { get; init; }
}

public record MemberDto(Guid Id, string Name, GroupDto Group, decimal Owe, decimal Owed, bool Settled);

public record MemberCreateDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MinLength(1)]
    public string? Name { get; init; }
}

public record TransactionDto(Guid Id, decimal Amount,  MemberDto Member, string Split);

public record TransactionCreateDto
{
    [Required]
    public Member Payer {get; init;}
    [Required]
    public decimal Amount {get; init;}
    [Required]
    public string Split {get; init;}

    public bool IsOwner { get; init; }
}