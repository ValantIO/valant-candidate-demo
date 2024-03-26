import { Shallow } from 'shallow-render/dist/lib/shallow';
import { MazeComponent } from './maze.component';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { LoggingService } from '../logging/logging.service';
import { SilentLogger } from '../logging/silent-logger';
import { StuffService } from '../stuff/stuff.service';
import { ValantDemoApiClient } from '../api-client/api-client';

const mockStuffService = { maze: jest.fn(() => of([])) };

HTMLCanvasElement.prototype.getContext = jest.fn();

describe('MazeComponent', () => {
  let component: Shallow<MazeComponent>;

  beforeEach(() => {
    component = new Shallow(MazeComponent, AppModule)
      .provideMock({ provide: ValantDemoApiClient.Client, useValue: mockStuffService })
      .provideMock({ provide: LoggingService, useClass: SilentLogger });
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should have as title "Valant demo"', async () => {
    const { instance } = await component.render();
    expect(instance.listofMazes).toHaveLength(0);
  });

  it('should render a banner message', async () => {
    const { find } = await component.render();
    expect(find('fileUpload').nativeElement.textContent).toBe('Upload File');
  });

  // it('gets stuff from the API on init', async () => {
  //   const spy = jest.spyOn(mockStuffService, 'maze');
  //   await component.render();
  //   const { instance } = await component.render();

  //   instance.ngOnInit();
  //   expect(spy).toBeCalled();
  // });

  // test('plays video', () => {

  //   const isPlaying = await component.render();

  //   expect(spy).toHaveBeenCalled();
  //   expect(isPlaying).toBe(true);
  // });
});
