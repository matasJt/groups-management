using System;
using System.Collections.Generic;
using System.Linq;
using Application.Dto;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
namespace Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupController(GroupService groupService) : ControllerBase
{
    [HttpGet("{groupId}")]
    public async Task<IReadOnlyList<Member>?> GetGroupMembers(Guid groupId)
    {
        var group = await groupService.GetGroup(groupId);
        return group?.Members;
    }
    
    [HttpGet]
    public async Task<IEnumerable<Group>> GetGroups()
    {
        return await groupService.GetAllGroups();
    }

    [HttpPost]
    public async Task<IActionResult> PostGroup(CreateGroupDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var newGroup = await groupService.AddGroup(dto);
        
        return Created(newGroup.Id.ToString(), newGroup);
    }

    [HttpPost("{groupId:Guid}/Member")]
    public async Task<IActionResult> PostMember(MemberCreateDto dto,Guid groupId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var member = await groupService.AddMemberToGroup(dto, groupId);
        return Created($"/api/groups/{groupId}/members/{member.Id}", member);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteMultiple([FromBody] List<Guid> selectedGroupsId)
    {
        var isDeleted = await groupService.DeleteMultipleGroups(selectedGroupsId);
        if (!isDeleted)
        {
            return BadRequest(new { message = "Only groups which have no debts can be deleted" });
        }
        return NoContent();
    }
}