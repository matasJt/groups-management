using api.Data;
using api.Model;
using api.Model.Dto;
using Microsoft.EntityFrameworkCore;

namespace api.Properties;

public interface ITasks
{
    decimal SplitValue(decimal amount, int memberCount);
}
public class Tasks : ITasks
{
    public decimal SplitValue(decimal amount,int memberCount)
    {
        return amount / memberCount;
    }

    public bool IsSettled(Member member)
    {
        return member.Owed == 0;
    }
}