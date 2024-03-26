import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeMatrixComponent } from './maze-matrix.component';

describe('MazeMatrixComponent', () => {
  let component: MazeMatrixComponent;
  let fixture: ComponentFixture<MazeMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MazeMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MazeMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
