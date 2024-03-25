export class Cell {
    constructor(
        public row: number = 0,
        public col: number = 0,
        public char: string = ''
    ){}

    public drawCell(content:string, ctx: CanvasRenderingContext2D, size:number, backGroundColor: string ){
        ctx.fillStyle = backGroundColor;
        
        let x = this.col * size;
        let y = this.row * size;
        let width = (this.col + 1) * size;
        let height = (this.row + 1) * size;
        ctx.fillRect(x, y, width,height);
        ctx.fillStyle = '#666666';
        ctx.font = "15px Georgia";
        ctx.fillText(content, x, height );
    }

    public hasNeighbor(cell: Cell): boolean {
        if ( this.row === cell.row){
            if (this.col - 1 === cell.col){
                if (this.isValidToMove(cell)){
                    return true;
                }    
            }
            if (this.col + 1 === cell.col){
                if (this.isValidToMove(cell)){
                    return true;
                }     
            }
        }
        if(this.col === cell.col){
            if (this.row - 1 === cell.row){
                if (this.isValidToMove(cell)){
                    return true;
                }    
            }
            if (this.row + 1 === cell.row){
                if (this.isValidToMove(cell)){
                    return true;
                }     
            }
        }
        return false;
    }

    isValidToMove(cell: Cell){
        return cell.char.toUpperCase()=== 'O' || cell.char.toUpperCase()=== 'S' || cell.char.toUpperCase()=== 'E';
    }
    equals(next: Cell): boolean {
        return this.row === next.row && this.col === next.col;
    }
}