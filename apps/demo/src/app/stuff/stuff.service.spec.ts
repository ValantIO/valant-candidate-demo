import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StuffService } from './stuff.service';

describe('StuffService', () => {
  let service: StuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
