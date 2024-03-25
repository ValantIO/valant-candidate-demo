using ValantDemoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ValantDemoApi.Data
{
    public class ValantDemoApiContext : DbContext
    {
        public ValantDemoApiContext(DbContextOptions<ValantDemoApiContext> options) : base(options)
        {

        }

        public DbSet<MazeFormatModel> MazeFormats { get; set; }

    }
}