import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoggingService } from './logging/logging.service';
import { StuffService } from './stuff/stuff.service';
import { environment } from '../environments/environment';
import { ValantDemoApiClient } from './api-client/api-client';
import { MazeComponent } from './maze/maze.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export function getBaseUrl(): string {
  return environment.baseUrl;
}

@NgModule({
  declarations: [AppComponent, MazeComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule,
    RouterModule.forRoot([    
    { path: 'maze', component: MazeComponent },
    { path: '**', redirectTo: '' },
  ]),],
  providers: [
    LoggingService,
    StuffService,
    ValantDemoApiClient.Client,
    { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
