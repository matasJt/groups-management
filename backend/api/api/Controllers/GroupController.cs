using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Model;
using api.Model.Dto;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupController(GroupsDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
    {
        return await context.Groups.ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> PostGroup(CreateGroupDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var group = new Group
        (
            Guid.NewGuid(),
            dto.Name!
        );
        context.Groups.Add(group);
        await context.SaveChangesAsync();

        return Created("/api/Group", group.ToDto());
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteMultiple([FromBody] List<Guid> selectedGroupsId)
    {
        var groups = await context.Groups.Where(g => selectedGroupsId.Contains(g.Id)).ToListAsync();
        if (groups.IsNullOrEmpty())
        {
            return NotFound();
        }

        context.Groups.RemoveRange(groups);
        await context.SaveChangesAsync();

        return NoContent();
    }
}