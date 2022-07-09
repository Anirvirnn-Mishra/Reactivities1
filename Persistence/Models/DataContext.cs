using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Domain;
namespace Persistence.Models
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)

        {

        }
        public DbSet<Activity> Activities { get; set; }

    }
}
