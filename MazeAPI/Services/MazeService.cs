using Data;
using Microsoft.EntityFrameworkCore;
using Models.DTO;
using Models.Models;
using System.Reflection.Metadata.Ecma335;

namespace Services
{
    public class MazeService
    {
        private readonly MazeDbContext _context;

        public MazeService(MazeDbContext context)
        {
            _context = context;
        }

        private List<List<char>> FormatResponse(string content)
        {
            var result = new List<List<char>>();
            var lines = content.Split("\r\n");

            foreach (var line in lines)
            {
                result.Add(line.ToCharArray().ToList());
            }

            return result;
        }

        public async Task<int> CreateMaze(MazeRequest request)
        {
            string content;
            using (var reader = new StreamReader(request.FormFile.OpenReadStream()))
            {
                content = await reader.ReadToEndAsync();
            };

            var newMaze = new Maze
            {
                Content = content,
                Name = request.FileName
            };

            _context.Mazes.Add(newMaze);
            return _context.SaveChanges();
        }

        public async Task<IEnumerable<MazeResponse>> GetMaze()
        {
            var mazes = await _context.Mazes.ToListAsync();
            var result = mazes.Select(m => new MazeResponse { 
                Id = m.Id,
                Name = m.Name
            });

            return result;
        }

        public List<List<char>> GetMaze(int id)
        {
            var maze = _context.Mazes.Where(m => m.Id == id).FirstOrDefault();

            if (maze == null)
            {
                throw new Exception($"Maze not found {id}");
            }

            return FormatResponse(maze?.Content ?? "");
        }

    }
}
