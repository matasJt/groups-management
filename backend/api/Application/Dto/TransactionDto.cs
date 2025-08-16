using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.Dto;

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