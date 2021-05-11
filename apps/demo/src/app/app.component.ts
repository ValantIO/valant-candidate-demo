import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging/logging.service';
import { StuffService } from './stuff/stuff.service';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public title = 'Valant demo';
  public data: string[];

  constructor(private logger: LoggingService, private stuffService: StuffService) {}

  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
    this.getStuff();
  }

  private getStuff(): void {
    this.stuffService.getStuff().subscribe({
      next: (response: string[]) => {
        this.data = response;
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }
}
