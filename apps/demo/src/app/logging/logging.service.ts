import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  public log(...args): void {
    console.log(...args);
  }
  public error(...args): void {
    console.error(...args);
  }
}
