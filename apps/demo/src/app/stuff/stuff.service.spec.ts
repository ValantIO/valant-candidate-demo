import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StuffService } from './stuff.service';
import { ValantDemoApiClient } from '../api-client/api-client';

export function getBaseUrl(): string {
  return 'http://localhost:5000/Maze';
}
describe('StuffService', () => {
  let service: StuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
        { provide: ValantDemoApiClient.Client, useFactory: service },
      ],
    });
    service = TestBed.inject(StuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
