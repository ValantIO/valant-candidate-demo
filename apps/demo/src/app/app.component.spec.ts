import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { SilentLogger } from './logging/silent-logger';
import { StuffService } from './stuff/stuff.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MazeService } from './services/maze.service';
import { ValantDemoApiClient } from './api-client/api-client';

const mockStuffService = { getStuff: jest.fn(() => of([])) };

describe('AppComponent', () => {
  let component: Shallow<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ValantDemoApiClient,
      ],
      providers: [
        ValantDemoApiClient.Client,
      ],
    });
    component = new Shallow(AppComponent, AppModule)
      .provideMock({ provide: StuffService, useValue: mockStuffService })
      .provideMock({ provide: LoggingService, useClass: SilentLogger })
      .provideMock({ provide: MazeService, useClass: MazeService })
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should have as title "Valant demo"', async () => {
    const { instance } = await component.render();
    expect(instance.title).toBe('Valant demo');
  });

  it('should render a banner message', async () => {
    const { find } = await component.render();
    expect(find('h1').nativeElement.textContent).toBe('Welcome to Valant demo');
  });

  it('gets stuff from the API on init', async () => {
    await component.render();
    expect(mockStuffService.getStuff).toHaveBeenCalledTimes(1);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render file upload component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    const fileUpload = debugElement.query(By.css('app-file-upload'));
    expect(fileUpload).toBeTruthy();
  });

  it('should render app-maze component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const { debugElement } = fixture;
    const fileUpload = debugElement.query(By.css('app-maze'));
    expect(fileUpload).toBeTruthy();
  });

});

