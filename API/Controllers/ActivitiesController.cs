using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController
    {

        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query() );
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            return await Mediator.Send(new Details.Query { Id=Id });
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok( await Mediator.Send(new Create.Command { Activity = activity })) ;
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> CreateActivity(Guid Id,Activity activity)
        {
            activity.Id = Id;
            return Ok( await Mediator.Send(new Edit .Command { Activity = activity })) ;
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id)
        {
            return  Ok(await Mediator.Send(new Delete.Command { Id = Id }));
        }



    }
}
