using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    [Table("Maze")]
    public class Maze
    {
        [Key]
        [Column("MazeId")]
        public int Id { get; set; }

        public string? Content { get; set; }

        public string? Name { get; set; }
    }
}
