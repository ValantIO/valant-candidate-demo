# MazeChallenge
Code Challenge

Steps to configure the Project:
1. Create a database called MazeDB and create a table Maze. The script is provided in the root of this repository "MazeDB.sql".
2. In the file MazeAPI/MazeAPI/appsettings.json open it, and in the connection string section modify the MazeConnection and change the server to your server name server="YourServerName"
   "MazeConnection": "server=DESKTOP-SERVER-NAME; database=MazeDB; trusted_connection=true; TrustServerCertificate=true"
3. Once the api is compiled and running verify the localhost port in case is different please change it on this root of the client project: MazeDemo\src\app\external\maze-api.ts
   currently it has the value "http://localhost:5084".
4. Once both projects are running first y you need to upload a file you can use the one that is in the root of this repository: SampleMazeFormat.txt
5. after that this maze is uploaded and saved into the database so a combobox is displayed to select any other maze in case there are more availables in the database.
