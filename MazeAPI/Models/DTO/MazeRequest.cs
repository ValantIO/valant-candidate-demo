using Microsoft.AspNetCore.Http;

namespace Models.DTO
{
    public class MazeRequest
    {
        public string? FileName { get; set; }
        public IFormFile? FormFile { get; set; }
    }
}
