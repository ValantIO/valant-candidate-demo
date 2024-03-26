import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import mazeApi from '../../external/maze-api';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
  @Output() uploaded = new EventEmitter();
  
  constructor(private http: HttpClient) {}  

  handleFileChange(event: Event) {
    let input = (<HTMLInputElement>event.target);

    if(!!input.files && !!input.files.length) {
      let file = input.files[0];
      let name = file.name.replace(".txt", "");

      const formData = new FormData();
      formData.append("FileName", name);
      formData.append("FormFile", file);

      this.http.post(mazeApi + "/api/Maze/upload", formData)
      .subscribe({next: (response) => {
        console.log(response);
        alert("Your Maze has been uploaded");
        this.uploaded.emit();
      }})
    }
  }
}
