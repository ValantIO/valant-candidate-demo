import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cell } from './models/cell';
import { keyboardMap } from './models/keyboard-map';
import { Maze } from './models/maze';
import { ValantDemoApiClient } from '../api-client/api-client';
import { Subscription } from 'rxjs';
import { MazeModel } from '../app.model';

@Component({
  selector: 'valant-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css'],
})
export class MazeComponent implements OnInit, AfterViewInit {
  private readonly defaultSize = 0;
  row = this.defaultSize;
  col = this.defaultSize;
  private maze: Maze;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private readonly cellSize = 20; // length of cell edge
  private readonly cellEdgeThickness = 2; // thickness of cell edge
  private readonly cellBackground = '#FFFFFF';
  private readonly solutionPathColor = '#FF7575';
  private readonly myPathColor = '#4080FF';
  private readonly myPathThickness = 10;
  private readonly solutionPathThickness = 3;
  private gameOver = false;
  private myPath: Cell[] = [];
  private currentCell: Cell;
  private mazeMatrix: string[][];
  showTestButton = false;
  busy = false;
  subscriptions: Subscription[];

  fileName: string | undefined = undefined;
  jsonString: string = '';
  selectedMaze: MazeModel;

  selectedId: number;
  listofMazes: MazeModel[] = [];

  constructor(public mazeService: ValantDemoApiClient.Client) {
    if (!environment.production) {
      this.showTestButton = true;
    }

    this.mazeMatrix = [];
    this.subscriptions = [];
    this.selectedMaze = {} as MazeModel;
    this.selectedId = 0;
  }

  ngOnInit() {
    this.mazeService.maze().subscribe({
      next: (mazes) => {
        console.log('response from api');
        console.log(mazes);
        this.listofMazes = mazes;
        if (this.listofMazes.length > 0) {
          this.selectedMaze = this.listofMazes[0];
          this.drawMaze();
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d');
  }

  prettyfied(json: string) {
    const obj = JSON.parse(json);
    console.log(obj);
    this.jsonString = JSON.stringify(obj, undefined, 4);
  }

  drawMaze() {
    this.busy = true;

    console.log('Drawing maze id' + this.selectedMaze.id);
    console.log('maze' + this.selectedMaze);

    this.mazeMatrix = this.createMazeFromResponse(this.selectedMaze.content);

    const nRows = this.mazeMatrix.length;
    if (this.mazeMatrix.length > 0) {
      const nCols = this.mazeMatrix[0].length;
      this.col = nCols;
    }

    this.row = nRows;

    this.validateInputs();
    // initialize cells

    if (this.row <= 0 || this.col <= 0) return;

    this.maze = new Maze(this.row, this.col, this.mazeMatrix);
    this.canvas.width = this.col * this.cellSize;
    this.canvas.height = this.row * this.cellSize;

    // open the first and last cells to show the entrance and exit
    this.maze.firstCell.westEdge = false;
    this.maze.lastCell.eastEdge = false;

    // draw the cells
    this.ctx.lineWidth = this.cellEdgeThickness;
    this.ctx.fillStyle = this.cellBackground;

    this.maze.cells.forEach((x) => x.forEach((c) => this.draw(c)));

    this.initPlay();
    this.busy = false;
  }

  initPlay() {
    this.gameOver = false;
    this.myPath.length = 0;
    this.currentCell = this.maze.firstCell; // reset myPath position
    this.myPath.push(this.currentCell);

    // draw the initial step of myPath in the first Cell as entrance
    this.ctx.lineWidth = this.myPathThickness;
    this.ctx.strokeStyle = this.myPathColor;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.cellSize / 2);
    this.ctx.lineTo(this.cellSize / 2, this.cellSize / 2);
    this.ctx.stroke();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.gameOver) return;
    const direction = keyboardMap[event.key];
    if (direction) {
      this.move(direction);
      event.preventDefault();
    }
  }

  move(direction: 'Left' | 'Right' | 'Up' | 'Down') {
    let nextCell: Cell;
    if (direction === 'Left') {
      if (this.currentCell.col < 1) return;
      nextCell = this.maze.cells[this.currentCell.row][this.currentCell.col - 1];
    }
    if (direction === 'Right') {
      if (this.currentCell.col + 1 >= this.col) return;
      nextCell = this.maze.cells[this.currentCell.row][this.currentCell.col + 1];
    }
    if (direction === 'Up') {
      if (this.currentCell.row < 1) return;
      nextCell = this.maze.cells[this.currentCell.row - 1][this.currentCell.col];
    }
    if (direction === 'Down') {
      if (this.currentCell.row + 1 >= this.row) return;
      nextCell = this.maze.cells[this.currentCell.row + 1][this.currentCell.col];
    }

    if (this.currentCell.isConnectedTo(nextCell)) {
      if (this.myPath.length > 1 && this.myPath[this.myPath.length - 2].equals(nextCell)) {
        // this is a step back; reverse the step by erasing the original path
        this.drawPath(this.myPath, this.cellBackground);
        this.myPath.pop();
      } else {
        this.myPath.push(nextCell);
        if (nextCell.equals(this.maze.lastCell)) {
          this.drawSolution(this.myPathColor, this.myPathThickness);
          this.winner();
          return;
        }
      }

      this.drawPath(this.myPath);
      this.currentCell = nextCell;
    }
  }

  drawSolution(color = this.solutionPathColor, lineThickness = this.solutionPathThickness) {
    this.gameOver = true;
    this.drawPath(this.maze.findPath(), color, lineThickness, true);
  }

  private drawPath(path: Cell[], color = this.myPathColor, lineThickness = this.myPathThickness, drawSolution = false) {
    this.ctx.lineWidth = lineThickness;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.cellSize / 2);

    path.forEach((x) => this.ctx.lineTo((x.col + 0.5) * this.cellSize, (x.row + 0.5) * this.cellSize));
    if (drawSolution) {
      this.ctx.lineTo(this.col * this.cellSize, (this.row - 0.5) * this.cellSize);
    }
    this.ctx.stroke();
  }

  private draw(cell: Cell) {
    this.ctx.fillRect(
      cell.col * this.cellSize,
      cell.row * this.cellSize,
      (cell.col + 1) * this.cellSize,
      (cell.row + 1) * this.cellSize
    );

    if (cell.type == 'X') {
      cell.northEdge = true;
      cell.southEdge = true;
      cell.eastEdge = true;
      cell.westEdge = true;
    }

    if (cell.northEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo(cell.col * this.cellSize, cell.row * this.cellSize);
      this.ctx.lineTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
      this.ctx.stroke();
    }
    if (cell.eastEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
      this.ctx.lineTo((cell.col + 1) * this.cellSize, (cell.row + 1) * this.cellSize);
      this.ctx.stroke();
    }
    if (cell.southEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo((cell.col + 1) * this.cellSize, (cell.row + 1) * this.cellSize);
      this.ctx.lineTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
      this.ctx.stroke();
    }
    if (cell.westEdge) {
      this.ctx.beginPath();
      this.ctx.moveTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
      this.ctx.lineTo(cell.col * this.cellSize, cell.row * this.cellSize);
      this.ctx.stroke();
    }
  }

  private winner() {
    alert('You Win'); //impl toaster
  }

  private validateInputs() {
    if (isNaN(this.row) || this.row < 1) {
      alert('Please enter a positive number for #Rows.');
    }
    if (isNaN(this.col) || this.col < 1) {
      alert('Please enter a positive number for #Columns.');
    }
    if (this.row > 500 || this.col > 500) {
      alert('Size too large. You may crash the browser...');
    }
    this.row = ~~this.row;
    this.col = ~~this.col;
  }

  test() {
    this.busy = true;
    const cellsHaveFourEdges: Cell[] = [];
    let hasLoop = false;
    const size = 50;
    for (let i = 0; i < 100; i++) {
      const maze = new Maze(this.mazeMatrix.length, this.mazeMatrix[0].length, this.mazeMatrix);
      maze.cells.forEach((row) =>
        row.forEach((c) => {
          if (c.nEdges === 4) {
            cellsHaveFourEdges.push(c);
          }
          if (c.col < size - 1 && c.row < size - 1) {
            if (!c.eastEdge && !c.southEdge) {
              const cellOnTheRight = maze.cells[c.row][c.col + 1];
              if (!cellOnTheRight.southEdge) {
                const cellBelow = maze.cells[c.row + 1][c.col];
                if (!cellBelow.eastEdge) {
                  hasLoop = true;
                }
              }
            }
          }
        })
      );

      if (hasLoop) {
        alert('open loop');
        break;
      }
    }

    console.log(`testing has finished`);
    this.busy = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());

    console.log('Unsubscribed');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);

      const subscription = this.mazeService.mazeUpload(formData).subscribe({
        next: (uploaded: string) => {
          this.jsonString = uploaded;
          alert('success');
          this.ngOnInit();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
      this.subscriptions.push(subscription);
    }
  }

  createMazeFromResponse(json: string): string[][] {
    let matrix: string[][] = [];
    this.mazeMatrix = [];

    // Split the string on \n or \r characters
    var separateLines = json?.split(/\r?\n|\r|\n/g);

    for (let i = 0; i < separateLines?.length; i++) {
      matrix[i] = [];
      let line = separateLines[i];
      for (let j = 0; j < line.length; j++) {
        matrix[i][j] = line[j];
      }
    }

    this.mazeMatrix = matrix;
    return matrix;
  }

  onChange(event) {
    const val = event.target.value;

    this.selectedMaze = this.listofMazes.find((x) => x.id == this.selectedId);

    this.drawMaze();
  }
}
