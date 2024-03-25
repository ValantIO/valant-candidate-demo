import { Cell } from './cell';

/**
 * A rectangle maze generated based on "hunt-and-kill" algorithm.
 */
export class Maze {
  public readonly cells: Cell[][] = [];
  private readonly randomRowNumbers: number[];
  private readonly randomColNumbers: number[];
  private mazeMatrix: string[][];

  /**
   * Create a maze with <row> &times; <col> cells.
   * @param nRow number of rows
   * @param nCol number of columns
   */
  constructor(public nRow: number, public nCol: number, matrix: string[][]) {
    this.mazeMatrix = matrix;

    // initialize cells
    for (let i = 0; i < nRow; i++) {
      this.cells[i] = [];
      for (let j = 0; j < nCol; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
    // populate cell neighbors (an optimization)

    this.cells.forEach((row) => row.forEach((c) => this.mapNeighbors(c)));

    for (let i = 0; i < nRow; i++) {
      for (let j = 0; j < nCol; j++) {
        this.cells[i][j] = this.updateCell(this.cells[i][j], i, j);
      }
    }

    console.log('this.cells');
    console.log(this.cells);

    // generate maze
    // this.randomRowNumbers = Utils.shuffleArray([...Array(this.nRow).keys()]);
    // this.randomColNumbers = Utils.shuffleArray([...Array(this.nCol).keys()]);
    // this.huntAndKill();
  }

  private updateCell(cell: Cell, i: number, j: number): Cell {
    cell.type = this.mazeMatrix[i][j].toUpperCase();

    let up = '';
    let down = '';
    let left = '';
    let right = '';

    if (i - 1 > 0) {
      up = this.mazeMatrix[i - 1][j].toUpperCase();
    }

    if (i + 1 < this.nRow) {
      down = this.mazeMatrix[i + 1][j].toUpperCase();
    }

    if (j - 1 > 0) {
      left = this.mazeMatrix[i][j - 1].toUpperCase();
    }

    if (j + 1 < this.nCol) {
      right = this.mazeMatrix[i][j + 1].toUpperCase();
    }

    if (right == 'O') {
      const newCell: Cell = this.cells[i][j + 1];
      newCell.type = right;
      cell.connectTo(newCell);
    }

    if (left == 'O') {
      const newCell: Cell = this.cells[i][j - 1];
      newCell.type = left;
      cell.connectTo(newCell);
    }

    if (up == 'O') {
      const newCell: Cell = this.cells[i - 1][j];
      newCell.type = up;
      cell.connectTo(newCell);
    }

    if (down == 'O') {
      const newCell: Cell = this.cells[i + 1][j];
      newCell.type = down;
      cell.connectTo(newCell);
    }

    return cell;
  }
  get firstCell(): Cell {
    for (let i = 0; i < this.nRow; i++) {
      for (let j = 0; j < this.nCol; j++) {
        if (this.cells[i][j].type == 'S') {
          debugger;
          return this.cells[i][j];
        }
      }
    }
  }

  get lastCell(): Cell {
    for (let i = 0; i < this.nRow; i++) {
      for (let j = 0; j < this.nCol; j++) {
        if (this.cells[i][j].type == 'E') {
          debugger;
          return this.cells[i][j];
        }
      }
    }
  }

  get randomCell(): Cell {
    return this.cells[Utils.random(this.nRow)][Utils.random(this.nCol)];
  }

  /**
   * traverse the maze using depth-first algorithm
   */
  findPath(): Cell[] {
    this.cells.forEach((x) => x.forEach((c) => (c.traversed = false)));
    const path: Cell[] = [this.firstCell];

    while (1) {
      let current = path[0];
      current.traversed = true;

      if (current.equals(this.lastCell)) {
        break;
      }

      const traversableNeighbors = current.neighbors
        .filter((c) => c.isConnectedTo(current))
        .filter((c) => !c.traversed);
      if (traversableNeighbors.length) {
        path.unshift(traversableNeighbors[0]);
      } else {
        path.splice(0, 1);
      }
    }

    return path.reverse();
  }

  private huntAndKill() {
    let current = this.randomCell; // hunt-and-kill starts from a random Cell
    while (current) {
      this.kill(current);
      current = this.hunt();
    }
  }
  private kill(current: Cell) {
    while (current) {
      const next = current.neighbors.find((c) => !c.visited);
      if (next) {
        current.connectTo(next);
      }
      current = next;
    }
  }
  private hunt(): Cell {
    for (let huntRow of this.randomRowNumbers) {
      for (let huntColumn of this.randomColNumbers) {
        const cell = this.cells[huntRow][huntColumn];
        if (cell.visited) {
          continue;
        }
        const next = cell.neighbors.find((c) => c.visited);
        if (next) {
          cell.connectTo(next);
          return cell;
        }
      }
    }
  }

  private mapNeighbors(cell: Cell): void {
    if (cell.row - 1 >= 0) {
      cell.neighbors.push(this.cells[cell.row - 1][cell.col]);
    }
    if (cell.row + 1 < this.nRow) {
      cell.neighbors.push(this.cells[cell.row + 1][cell.col]);
    }
    if (cell.col - 1 >= 0) {
      cell.neighbors.push(this.cells[cell.row][cell.col - 1]);
    }
    if (cell.col + 1 < this.nCol) {
      cell.neighbors.push(this.cells[cell.row][cell.col + 1]);
    }
    //cell.neighbors = Utils.shuffleArray(cell.neighbors);
  }
}

class Utils {
  /**
   * The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
   */
  static shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const temp = ~~(Math.random() * (i + 1));
      [array[i], array[temp]] = [array[temp], array[i]];
    }
    return array;
  }

  /**
   * Generate a random index within a number `n`
   */
  static random(n: number): number {
    return ~~(Math.random() * n);
  }
}
