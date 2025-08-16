namespace Domain.Entities;

public class Group(Guid id, string name)
{
    private readonly List<Member> _members = new();
    public Guid Id { get; init; } = id;
    public string Name { get; init; } = name;
    public IReadOnlyList<Member> Members => _members.AsReadOnly();

    public decimal TotalOwe => _members.Sum(m => m.Owe);
    public decimal TotalOwed => _members.Sum(m => m.Owed);
    
    public Member AddMember(string name)
    {
        if (_members.Any(m => m.Name == name))
            throw new InvalidOperationException("Member already exists");
        Member member = new Member(Guid.NewGuid(), name) { Group = this };
        _members.Add(member);
        return member;
    }
}