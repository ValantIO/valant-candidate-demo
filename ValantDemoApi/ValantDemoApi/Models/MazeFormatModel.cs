using System.ComponentModel.DataAnnotations;
namespace ValantDemoApi.Models
{
    public class MazeFormatModel
    {
        public int Key {get; set;}
        [Key]
        public string Name {get; set;}
        public string Value {get; set;}
    }
}