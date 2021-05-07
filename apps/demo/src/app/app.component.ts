import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public title = 'Valant demo';

  ngOnInit() {
    console.log('Welcome to the AppComponent');
  }
}
