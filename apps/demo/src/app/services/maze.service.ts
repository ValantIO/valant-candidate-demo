import { Injectable, InjectionToken } from '@angular/core';
import { ValantDemoApiClient } from '../api-client/api-client';
import { Observable } from 'rxjs';
import { MazeFormats } from '../models/MazeFormats';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class MazeService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getFormats(): Observable<MazeFormats[]> {
    return this.httpClient.mazeFormats();
  }
  public addFormat(data: string): Observable<MazeFormats[]> {
    return this.httpClient.addMaze(data);
  }

}
