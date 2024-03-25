using System.Collections.Generic;
using ValantDemoApi.Models;
using System.Threading.Tasks;

namespace ValantDemoApi.Data
{
    public interface IMazeRepository
    {
        public Task<List<MazeFormatModel>> Get();
        public Task<MazeFormatModel> GetById(string name);
        public Task<List<MazeFormatModel>> Create(MazeFormatModel format);
        public MazeFormatModel Update(MazeFormatModel format);
        
    }
}
