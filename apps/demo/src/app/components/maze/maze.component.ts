import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Maze } from '../../models/Maze';
import { Cell } from '../../models/Cell';

@Component({
  selector: 'valant-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.less']
})
export class MazeComponent implements OnInit {
  @Input() public mazeFormat: string = '';
  public endGame:boolean = false;
  private rows = this.mazeFormat.split('|');
  private cols = this.mazeFormat.split('|')[0];
  private startX: number = 0;
  private startY: number = 0;
  private maze: Maze;
  private htmlCanvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private mazePath: Cell[] = [];
  private currentCell: Cell;
  private cellSize = 30;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.htmlCanvas = <HTMLCanvasElement>document.getElementById('maze');
      this.canvasContext = this.htmlCanvas.getContext('2d');
      this.getStartPosition();
      this.createMaze();
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes['mazeFormat'] && this.mazeFormat){
      this.rows = this.mazeFormat.split('|');
      this.cols = this.mazeFormat.split('|')[0];
      this.htmlCanvas = <HTMLCanvasElement>document.getElementById('maze');
      this.canvasContext = this.htmlCanvas.getContext('2d');
      this.getStartPosition();
      this.createMaze();

    }
  }

  async getStartPosition(){
    for (let i = 0; i < this.rows.length; i++) {
      this.startY = i;
      const indexS = this.rows[i].toUpperCase().indexOf('S');
      if(indexS > -1){
        this.startX = indexS;
        return;
      }
      
    }
  }

  /**
   * Initialize path
   */
  start() {
    this.mazePath.length = 0;
    this.canvasContext.lineWidth = 4;
    this.canvasContext.strokeStyle = '#408077';
    this.canvasContext.beginPath();
    this.canvasContext.moveTo((this.startX + 0.5) * this.cellSize, (this.startY + 0.5) * this.cellSize);
    this.canvasContext.lineTo((this.startX + 0.5) * this.cellSize, (this.startY + 0.5) * this.cellSize);
    this.canvasContext.stroke();
    this.currentCell = this.maze.cells[this.startY][this.startX];
    this.mazePath.push(this.currentCell);
  }

  async createMaze(){
    this.maze = new Maze(this.rows, this.startX, this.startY, this.cellSize, this.canvasContext );    
    this.htmlCanvas.width = this.cols.length * this.cellSize;
    this.htmlCanvas.height = this.rows.length * this.cellSize;
    await this.maze.drawMazeCells();
    this.start();
  }

  move(direction: string){
    let nextCell: Cell;
    switch (direction) {
      case 'ArrowLeft':
        if(this.currentCell.col < 1) return;
        nextCell = this.maze.cells[this.currentCell.row][this.currentCell.col-1];
        break;
      case 'ArrowUp':
        if(this.currentCell.row < 1) return;
        nextCell = this.maze.cells[this.currentCell.row - 1][this.currentCell.col];
        break;
      case 'ArrowDown':
        if(this.currentCell.row + 1 >= this.rows.length) return;
        nextCell = this.maze.cells[this.currentCell.row + 1][this.currentCell.col];
        break;
      case 'ArrowRight':
        if(this.currentCell.col + 1 >= this.cols.length) return;
        nextCell = this.maze.cells[this.currentCell.row][this.currentCell.col+1];
        break;
      default:
        break;
    }
    if(this.currentCell.hasNeighbor(nextCell)){
        if (this.mazePath.length > 1 &&this.mazePath[this.mazePath.length - 2].equals(nextCell)) {
          //going back
          this.maze.removePath(this.mazePath);
          this.mazePath.pop();
          this.endGame = false;
        } else {
          this.mazePath.push(nextCell);
          if(nextCell.char === 'E') {
            this.endGame = true;
          }
        }
        this.maze.drawMazePath(this.mazePath);
        this.currentCell = nextCell;
    }
  }

}
