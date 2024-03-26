import { Shallow } from 'shallow-render/dist/lib/shallow';
import { MazeComponent } from './maze.component';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { LoggingService } from '../logging/logging.service';
import { SilentLogger } from '../logging/silent-logger';
import { ValantDemoApiClient } from '../api-client/api-client';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export function getBaseUrl(): string {
  return 'http://localhost:5000/Maze';
}

HTMLCanvasElement.prototype.getContext = jest.fn();

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;
  let service: ValantDemoApiClient.Client;
  let httpClientSpy: any;

  /************************/
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
  /* **** */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MazeComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
