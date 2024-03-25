using ValantDemoApi.Models;
using Microsoft.EntityFrameworkCore;
using ValantDemoApi.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ValantDemoApi
{
    public class MazeRepository : IMazeRepository
    {
        private readonly ValantDemoApiContext _context;
        public MazeRepository(ValantDemoApiContext context)
        {
            _context = context;
            //     var mazeFormat = new MazeFormatModel
            //         {
            //             Key=0, 
            //             Name= "First", 
            //             Value= "SOXXXXXXXX|OOOXXXXXXX|OXOOOXOOOO|XXXXOXOXXO|OOOOOOOXXO|OXXOXXXXXO|OOOOXXXXXE"
            //         };
                
            //     _context.MazeFormats.Add(mazeFormat);
            //     _context.SaveChanges();

        }
        public async Task<List<MazeFormatModel>> Get()
        {

            return  _context.MazeFormats
                .ToList();

        }
        public async Task<List<MazeFormatModel>> Create(MazeFormatModel data)
        {
            var found = await this.GetById(data.Name);
            if(found == null){
                var mazeFormat = new MazeFormatModel
                        {
                            Key=0, 
                            Name= data.Name, 
                            Value= data.Value
                        };
                _context.MazeFormats.Add(mazeFormat);
                _context.SaveChanges();
            }
            return _context.MazeFormats
                    .ToList();
        }

        public async Task<MazeFormatModel> GetById(string name)
        {
            var list = _context.MazeFormats.ToList();
            return  _context.MazeFormats.Where(x=> x.Name == name).FirstOrDefault();
        }

        public MazeFormatModel Update(MazeFormatModel data)
        {
            return new MazeFormatModel{Key=0, Name= "First", Value= "SOXXXXXXXX|OOOXXXXXXX|OXOOOXOOOO|XXXXOXOXXO|OOOOOOOXXO|OXXOXXXXXO|OOOOXXXXXE"};
        }

    }
}