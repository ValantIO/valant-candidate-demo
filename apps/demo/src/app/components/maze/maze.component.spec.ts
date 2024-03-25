import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeComponent } from './maze.component';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as endGame 'false'`, () => {
    const fixture = TestBed.createComponent(MazeComponent);
    const app = fixture.componentInstance;
    expect(app.endGame).toEqual(false);
  });

});
