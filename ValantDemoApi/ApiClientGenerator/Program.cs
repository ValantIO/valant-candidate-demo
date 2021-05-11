using System;
using System.IO;
using System.Threading.Tasks;
using NJsonSchema.CodeGeneration.TypeScript;
using NSwag;
using NSwag.CodeGeneration.CSharp;
using NSwag.CodeGeneration.TypeScript;

namespace APIClientGenerator
{
  internal class Program
  {
    private static async Task Main(string[] args)
    {
      if (args.Length != 3)
      {
        throw new ArgumentException("Expecting 3 arguments: URL, generatePath, language");
      }

      var url = args[0];
      var generatePath = Path.Combine(Directory.GetCurrentDirectory(), args[1]);
      var language = args[2];

      if (language != "TypeScript" && language != "CSharp")
      {
        throw new ArgumentException("Invalid language parameter; valid values are TypeScript and CSharp");
      }

      if (language == "TypeScript")
      {
        await GenerateTypeScriptClient(url, generatePath);
      }
      else
      {
        await GenerateCSharpClient(url, generatePath);
      }
    }

    private static async Task GenerateTypeScriptClient(string url, string generatePath)
    {
      await GenerateClient(
        await OpenApiDocument.FromUrlAsync(url),
        generatePath,
        document =>
        {
          var settings = new TypeScriptClientGeneratorSettings();

          settings.TypeScriptGeneratorSettings.TypeStyle = TypeScriptTypeStyle.Interface;
          settings.TypeScriptGeneratorSettings.TypeScriptVersion = 3.5M;
          settings.TypeScriptGeneratorSettings.DateTimeType = TypeScriptDateTimeType.String;
          settings.Template = TypeScriptTemplate.Angular;
          settings.InjectionTokenType = InjectionTokenType.InjectionToken;
          settings.TypeScriptGeneratorSettings.ModuleName = "ValantDemoApiClient";

          var generator = new TypeScriptClientGenerator(document, settings);
          var code = generator.GenerateFile();

          return code;
        }
      );
    }

    private static async Task GenerateCSharpClient(string url, string generatePath)
    {
      await GenerateClient(
        await OpenApiDocument.FromUrlAsync(url),
        generatePath,
        document =>
        {
          var settings = new CSharpClientGeneratorSettings
          {
            UseBaseUrl = false
          };

          var generator = new CSharpClientGenerator(document, settings);
          var code = generator.GenerateFile();
          return code;
        }
      );
    }

    private static async Task GenerateClient(OpenApiDocument document, string generatePath, Func<OpenApiDocument, string> generateCode)
    {
      Console.WriteLine($"Generating {generatePath}...");

      var code = generateCode(document);

      await File.WriteAllTextAsync(generatePath, code);
    }
  }
}
