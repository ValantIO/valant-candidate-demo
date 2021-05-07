import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stuff } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  constructor(private httpClient: HttpClient) {}

  public getStuff(): Observable<Stuff[]> {
    return this.httpClient.get<Stuff[]>('/api/stuff');
  }
}
