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

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly GroupsDbContext _context;

        public MemberController(GroupsDbContext context)
        {
            _context = context;
        }

        // GET: api/Member
        [HttpGet]
        public async Task<List<MemberDto>> GetMember()
        {
           var members = await _context.Members.Include(x=> x.Group).ToListAsync();
           return members.Select(x => x.ToDto()).ToList();
        }

        // GET: api/Member/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(Guid id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }
        
        //
        [HttpGet("/Group/{groupId}/Member")]
        public async Task<List<MemberDto>> GetMembersInGroup(Guid groupId)
        {
            var members = await _context.Members
                .Include(x => x.Group)
                .Where(m => m.Group.Id == groupId) 
                .ToListAsync();

            return members.Select(x => x.ToDto()).ToList();
        }
        
        // POST: api/Member/Group/1
        [HttpPost("/Group/{groupId:Guid}")]
        public async Task<IActionResult> PostMember(MemberCreateDto dto,Guid groupId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var group = await _context.Groups.FirstOrDefaultAsync(x=> x.Id == groupId);
            if (group == null)
            {
                return NotFound("Group not found");
            }

            var member = new Member
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Group = group
            };
            
            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            return Created($"/api/member/{member.Id}", member.ToDto());
        }

        // DELETE: api/Member/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(Guid id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            if (member.Owed == 0)
            {
                _context.Members.Remove(member);
            }
            
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(Guid id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            member.Owe = 0;
            member.Settled = true;
            _context.Members.Update(member);
            await _context.SaveChangesAsync();
            return Ok(member);
        }

        private bool MemberExists(Guid id)
        {
            return _context.Members.Any(e => e.Id == id);
        }
    }
}
