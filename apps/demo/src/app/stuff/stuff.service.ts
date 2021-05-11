import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getStuff(): Observable<string[]> {
    return this.httpClient.maze();
  }
}
