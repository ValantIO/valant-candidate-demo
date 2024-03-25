import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'valant-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less']
})
export class UploadFileComponent implements OnInit {
  @Output() onSelectMazeFormat: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  fileDialogShouldOpen = false;

fileInputClick = (event) => {

    // Open file dialog
    if(this.fileDialogShouldOpen){
      return true;
    }
    // Do not open file dialog
    else{

      event.preventDefault();
      event.stopPropagation();
      return false;
    }
}
  private fileContent:String = '';
  public onChange (event:any): void {
    console.log(' onChange', event);
    
    const file = event.target.files[0];
    const name = file.name.split('.')[0];
    this.getFileData(file).subscribe((res)=> {
      this.onSelectMazeFormat.emit({key: 0, name: name, value: res});
    })
  }

  getFileData(file: any): Observable<any> {
    return new Observable<any>((observer: any) => {
        if (file) {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(file);
        }
    });
  }

}
