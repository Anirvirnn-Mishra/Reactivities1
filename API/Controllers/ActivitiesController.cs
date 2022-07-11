﻿using Domain;
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
        private readonly DataContext _dataContext;
        public ActivitiesController(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _dataContext.Activities.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _dataContext.Activities.FindAsync(id);
        }

    }
}
