import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import mazeApi from './external/maze-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MazeDemo';
  mazes: any[] = [];
  currentMazeContent:string[][] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMazes();
  }

  getMazes() {
    this.http.get(mazeApi + "/api/Maze/Get")
    .subscribe({next: (response:any) => {
      this.mazes = response;
      if(!!this.mazes.length) {
        this.getMaze(this.mazes[0].id);
      }
    }})
  }

  handleMazeChange($event:any) {
    const mazeId = $event.target.value;

    this.getMaze(mazeId)
  }

  getMaze(mazeId: number) {
    this.http.get(`${mazeApi}/api/Maze/Get/${mazeId}`)
    .subscribe({next: (response:any) => {
      this.currentMazeContent = response;
    }})
  }

  handleUploaded() {
    this.getMazes();
  }
}
