import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maze-matrix',
  templateUrl: './maze-matrix.component.html',
  styleUrl: './maze-matrix.component.css'
})
export class MazeMatrixComponent {

  currentPosition = [0,0]

  @Input() mazeContent: string[][] = [];

  get hasMaze():boolean {
    return this.mazeContent.length > 0;
  }

  getActive(col:number, row:number) {
    const [currentCol, currentRow] = this.currentPosition;

    return currentCol == col && currentRow == row;
  }

  print(event:string) {
    switch(event) {
      case 'LEFT':
        this.moveX(-1);
        break;
      case 'RIGHT':
        this.moveX(1);
        break;
      case 'UP':
        this.moveY(-1);
        break;
      case 'DOWN':
        this.moveY(1);
      break;
      default:
        return;
    }
  }

  moveX(col:number) {
    const [currentX, currentY] = this.currentPosition;
    const maxCol = this.mazeContent[currentY].length - 1;

    if(col == -1 && currentX == 0) {
      return;
    } else if (col == 1 && currentX == maxCol) {
      return;
    }

    this.verifyIfIsValidPath([currentX + col, currentY ]) && (this.currentPosition = [currentX + col, currentY ]);
  }

  moveY(row:number) {
    const [currentX, currentY] = this.currentPosition;
    const maxRow = this.mazeContent.length - 1;

    if(row == -1 && currentY == 0) {
      return;
    } else if (row == 1 && currentY == maxRow) {
      return;
    } 

    this.verifyIfIsValidPath([currentX, currentY + row ]) && (this.currentPosition = [currentX, currentY + row ])
  }

  verifyIfIsValidPath(position: Array<number>) {
    const [x,y] = position;

    const block = this.mazeContent[y][x];

    block === "E" && alert("You Won");

    return this.mazeContent[y][x] !== 'X';
  }
}
