import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCanvasComponent } from './color-canvas.component';

describe('ColorCanvasComponent', () => {
  let component: ColorCanvasComponent;
  let fixture: ComponentFixture<ColorCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
