import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';
import { MazeModel } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getStuff(): Observable<MazeModel[]> {
    return this.httpClient.maze();
  }
}
