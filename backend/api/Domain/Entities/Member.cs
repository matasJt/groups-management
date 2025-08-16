using System.Text.Json.Serialization;

namespace Domain.Entities;
public class Member(Guid id, string name)
{
    public Guid Id { get; set; } = id;
    public string Name { get; set; } = name;
    public decimal Owe { get; private set; }
    public decimal Owed { get; private set; }
    public bool Settled  => Owed == 0;
    [JsonIgnore]
    public Group Group { get; set; } = null!;
}