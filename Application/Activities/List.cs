﻿using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {
        public class Query:IRequest<List<Activity>>
        {

        }
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context,ILogger<List> logger)
            {
                _context = context;
                _logger = logger;
            }
             async Task<List<Activity>> IRequestHandler<Query, List<Activity>>.Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    for (int i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"Task {i} is completed");

                    }

                }
                catch (Exception ex) when( ex is TaskCanceledException)
                {

                    _logger.LogWarning("Task was cancelled"); ;
                }
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
