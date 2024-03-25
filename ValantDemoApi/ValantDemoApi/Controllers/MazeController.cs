using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using ValantDemoApi.Models;
using ValantDemoApi.Data;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MazeController : ControllerBase
    {
        private readonly IMazeRepository _repo;
        private readonly ILogger<MazeController> _logger;

        public MazeController(ILogger<MazeController> logger
                            ,IMazeRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<string> GetNextAvailableMoves()
        {
          return new List<string> {"Up", "Down", "Left", "Right"};
        }

                [HttpPost]
        public async Task<ActionResult<List<MazeFormatModel>>> AddMaze(MazeFormatModel data)
        {
            var formats = await _repo.Create(data);
            return Ok(formats);
        }

        [HttpGet("Formats")]
        public async Task<ActionResult<List<MazeFormatModel>>> Get()
        {
            var formats = await _repo.Get();
            return Ok(formats);
        } 
    }
}
