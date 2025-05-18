using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Model;
using api.Model.Dto;
using api.Properties;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly GroupsDbContext _context;
        private readonly Tasks _tasks;

        public TransactionController(GroupsDbContext context, Tasks tasks)
        {
            _context = context;
            _tasks = tasks;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<List<Transaction>> GetTransaction()
        {
            return await _context.Transactions
                .Include(t => t.Payer)
                .Include(t => t.Group)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<List<Transaction>> GetTransaction(Guid id)
        {
            return await _context.Transactions.Where(t => t.Group.Id == id).Include(x => x.Payer).ToListAsync();
        }
        
        // POST: api/T
        [HttpPost("/Group/{groupId:guid}/Transaction")]
        public async Task<ActionResult<Transaction>> PostTransaction(Guid groupId,TransactionCreateDto dto)
        {
           
            var group = _context.Groups.FirstOrDefaultAsync(x=> x.Id == groupId).Result;
           
            
            if (group == null)
            {
                return BadRequest();
            }
            

            var payer = await _context.Members.FindAsync(dto.Payer.Id);
            
            if (payer == null)
            {
                return NotFound("Payer not found");
            }

            var count = _context.Members.Count(x => x.Group.Id == groupId) + 1;
            var groups = _context.Groups.ToList();
            var members = _context.Members.Where(x=> x.Group.Id == groupId).ToList();
            decimal sum = 0;
            if (count > 0)
            {
                var owe = _tasks.SplitValue(dto.Amount, count);
                foreach (var member in members)
                {
                    if (member.Id == dto.Payer.Id)
                    {
                        sum += owe;
                        member.Owe += owe;
                    }
                }

                foreach (var g in groups)
                {
                    if (group.Id == g.Id)
                    {
                        group.TotalOwe += sum;
                    }
                }
            }
            
            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                Payer = payer,
                Group = group,
                Amount = dto.Amount,
                Split = dto.Split
            };
            _context.Transactions.Add(transaction);
            _context.Members.UpdateRange(members);
            _context.Groups.UpdateRange(groups);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaction", new { id = transaction.Id }, transaction);
        }
        private bool TransactionExists(Guid id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }
    }
}
