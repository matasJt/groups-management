using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Model;
using api.Services;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionController(GroupsDbContext context, GroupsService groupsService) : ControllerBase
{
}