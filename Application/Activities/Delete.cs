﻿using Domain;
using MediatR;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command:IRequest
        {
            public Guid Id{ get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task <Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Remove(await _context.Activities.FindAsync( request.Id));
                await  _context.SaveChangesAsync();

                return Unit.Value;  

            }
        }

    }
}
