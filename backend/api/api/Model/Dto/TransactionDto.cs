using System.ComponentModel.DataAnnotations;

namespace api.Model.Dto;

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