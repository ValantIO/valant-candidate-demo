using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using ValantDemoApi.Model;

namespace ValantDemoApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class MazeController : ControllerBase
  {
    private readonly ILogger<MazeController> _logger;
    private const string IncompatibleFormat = "Incompatible Format";

    private static List<Maze> mazes = new List<Maze>();

    public MazeController(ILogger<MazeController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Maze> GetNextAvailableMoves()
    {
      return mazes;
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    public ActionResult<string> UploadMaze([FromForm] IFormFile file)
    {
      string json = string.Empty;
      try
      {
        var streams = file.OpenReadStream();
        string fileExtension = Path.GetExtension(file.FileName);

        using (StreamReader reader = new StreamReader(streams))
        {
          var maze = reader.ReadToEnd();
          Console.WriteLine(maze);
          json = maze;
        }


        if (json.Length > 0)
        {
          var maze = new Maze();
          maze.Id = mazes.Count + 1;
          maze.Content = json;
          mazes.Add(maze);
          return Ok(maze.Content);
        }
        else
        {
          _logger.Log(LogLevel.Warning, message: IncompatibleFormat, args: file);
          return BadRequest(IncompatibleFormat);
        }
      }
      catch (Exception ex)
      {
        _logger.Log(LogLevel.Critical, ex, ex.Message, file);
        return BadRequest(new { ex.Message });
      }
    }
  }
}
