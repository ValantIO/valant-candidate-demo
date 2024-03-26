using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.DTO;
using Models.Models;
using Services;

namespace MazeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MazeController : ControllerBase
    {
        private readonly MazeService _mazeService;

        public MazeController(MazeService mazeService)
        {
            _mazeService = mazeService;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> Upload([FromForm] MazeRequest request)
        {
            var result = await _mazeService.CreateMaze(request);

            if(result > 0)
                return Ok(result);
            
            return BadRequest(result);
        }

        [HttpGet("Get")]
        public async Task<IEnumerable<MazeResponse>> GetMazes()
        {
            return await _mazeService.GetMaze();
        }

        [HttpGet("Get/{id}")]
        public List<List<char>> GetMaze([FromRoute] int id)
        {
            return _mazeService.GetMaze(id);
        }
    }
}
