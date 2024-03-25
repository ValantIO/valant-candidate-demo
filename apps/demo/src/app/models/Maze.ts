import { Cell } from "./Cell";

export class Maze {
    public cells: Array<Array<Cell>> = [];
    private pathLineWidth:number = 4;
    private cellBackGround:string = '#FFFFFF'; 
    constructor(
        public rows: string [],
        public startX: number = 0,
        public startY: number = 0,
        public cellSize: number,
        public canvasContext: CanvasRenderingContext2D
    ){
        this.createMazeCells();
    }

    /**
     * Generate cells
     */
    createMazeCells(){
        for (let row = 0; row < this.rows.length; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.rows[row].length; col++) {
                this.cells[row][col] = new Cell(row,col,this.rows[row][col]);
            }
        }
    }

    /**
     * Draw the cells for the maze
     */
    drawMazeCells(){
        this.canvasContext.lineWidth = this.pathLineWidth;
        this.cells.forEach(element => {
            element.forEach((cell)=>{
                cell.drawCell(cell.char, this.canvasContext, this.cellSize, this.cellBackGround)
            })
        });        
        this.canvasContext.save();
    }
    /**
     * Draw maze path
     */
    drawMazePath(path: Cell[], pathColor = '#4080ff'){
        this.canvasContext.lineWidth = this.pathLineWidth;
        this.canvasContext.strokeStyle = pathColor;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo((this.startX + 0.5) * this.cellSize /2, (this.startY + 0.5) * this.cellSize /2 );
        path.forEach((element)=>{
            this.canvasContext.lineTo((element.col + 0.5) * this.cellSize, (element.row + 0.5) * this.cellSize);
        })
        this.canvasContext.stroke();
    }

    removePath(path: Cell[]){
        this.drawMazePath(path, this.cellBackGround);
    }
}