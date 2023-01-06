import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPaletteComponent } from './icon-palette.component';

describe('IconPaletteComponent', () => {
  let component: IconPaletteComponent;
  let fixture: ComponentFixture<IconPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPaletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
