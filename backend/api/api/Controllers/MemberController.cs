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
using api.Services;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController(GroupsDbContext context,GroupsService groupsService) : ControllerBase
    {
        [HttpGet("Group/{groupId}")]
        public async Task<List<MemberDto>> GetMembersInGroup(Guid groupId)
        {
            var members = await context.Members
                .Include(x => x.Group)
                .Where(m => m.Group.Id == groupId) 
                .ToListAsync();

            return members.Select(x => x.ToDto()).ToList();
        }
        
        // POST: api/Member/Group/1
        [HttpPost("Group/{groupId:Guid}")]
        public async Task<IActionResult> PostMember(MemberCreateDto dto,Guid groupId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var group = await context.Groups.FirstOrDefaultAsync(x=> x.Id == groupId);
            if (group == null)
            {
                return NotFound("Group not found");
            }

            var member = new Member
            (
                Guid.NewGuid(),
                dto.Name!
            )
            {
                Group = group
            };
           
            
            context.Members.Add(member);
            await context.SaveChangesAsync();

            return Created($"/api/member/{member.Id}", member.ToDto());
        }

        // DELETE: api/Member/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(Guid id)
        {
            var isDeleted = await groupsService.DeleteMemberAsync(id);
            return isDeleted ? NoContent() : BadRequest(new {message ="Cannot be deleted not settled with all members"});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(Guid id)
        {
            var member = await context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            member.Owe = 0;
            member.Owed = 50;
            member.Settled = true;
            context.Members.Update(member);
            await context.SaveChangesAsync();
            return Ok(member);
        }
    }
}
