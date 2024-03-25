using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;
using ValantDemoApi.Controllers;
using ValantDemoApi.Model;

namespace ValantDemoApi.Tests
{
  [TestFixture]
  public class ValantDemoApiTests
  {
    private HttpClient client;

    [OneTimeSetUp]
    public void Setup()
    {
      var factory = new APIWebApplicationFactory();

      this.client = factory.WithWebHostBuilder(builder =>
      {
        builder.ConfigureTestServices(services =>
        {
          services.AddScoped<ControllerBase, MazeController>();
        });
      }).CreateClient();
    }

    [Test]
    public async Task ShouldReturnMazeList()
    {
      //Arrange
      MultipartFormDataContent form = ConfigureFileContent();

      var requestUri = "/Maze/upload";

      var mazeResponse = await this.client.PostAsync(requestUri, form);

      //Act
      var result = await this.client.GetAsync("/Maze");

      result.EnsureSuccessStatusCode();
      var content = JsonConvert.DeserializeObject<IEnumerable<Maze>>(await result.Content.ReadAsStringAsync());

      var maze = content.First();

      //Assert
      Assert.AreEqual(1, maze.Id);
      Assert.NotNull(maze.Content);
    }

    [Test]
    public async Task ShouldUploadMaze()
    {
      //Arrange
      MultipartFormDataContent form = ConfigureFileContent();

      var requestUri = "/Maze/upload";

      //Act
      var mazeResponse = await this.client.PostAsync(requestUri, form);

      //Assert
      Assert.AreEqual(HttpStatusCode.OK, mazeResponse.StatusCode);
    }


    private static MultipartFormDataContent ConfigureFileContent()
    {
      using (var file = new MultipartFormDataContent())
      {
        var fileName = Path.GetFileName("maze3.txt");
        byte[] bytes = System.IO.File.ReadAllBytes(fileName);



        MultipartFormDataContent form = new MultipartFormDataContent();

        form.Add(new ByteArrayContent(bytes, 0, bytes.Length), "file", "maze3.txt");



        return form;
      }
    }

  }
}
