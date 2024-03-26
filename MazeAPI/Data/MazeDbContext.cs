using Microsoft.EntityFrameworkCore;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class MazeDbContext : DbContext
    {
        public MazeDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Maze> Mazes { get; set; }
    }
}
