import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorToggleComponent } from './color-toggle.component';

describe('ColorToggleComponent', () => {
  let component: ColorToggleComponent;
  let fixture: ComponentFixture<ColorToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
