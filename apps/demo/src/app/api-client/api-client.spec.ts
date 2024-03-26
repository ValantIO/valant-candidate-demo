import { TestBed } from '@angular/core/testing';
import { ValantDemoApiClient } from './api-client';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

export function getBaseUrl(): string {
  return 'http://localhost:5000/Maze';
}
describe('api-client-service', () => {
  let service: ValantDemoApiClient.Client;
  let httpClientSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
        { provide: ValantDemoApiClient.Client, useFactory: service },
      ],
    });
  });

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      Headers: {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          Accept: 'text/plain',
        }),
      },
    };
    service = new ValantDemoApiClient.Client(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test get maze list', () => {
    const res = { id: 1, content: 'uw8988w9' };
    const url = '/Maze';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
    };
    debugger;
    service.maze().subscribe((data) => {
      debugger;
      console.log(data);
    });
    debugger;

    expect(httpClientSpy.get).toBeCalledTimes(1);
  });
});
