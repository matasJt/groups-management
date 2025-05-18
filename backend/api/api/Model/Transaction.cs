using api.Model.Dto;

namespace api.Model;

public class Transaction
{
    public Guid Id { get; set; }
    public Member Payer { get; set; }
    public Group Group { get; set; }
    public string Split { get; set; }
    public decimal Amount { get; set; }
    public bool IsOwner { get; set; } = false;
    
    public TransactionDto ToDto()
    {
        GroupDto groupDto = new GroupDto(Group.Id, Group.Name, Group.TotalOwe, Group.TotalOwed);
        MemberDto memberDto = new MemberDto(Payer.Id, Payer.Name, groupDto, Payer.Owe, Payer.Owed,Payer.Settled);
        return new TransactionDto(Id, Amount, memberDto, Split);
    }
}