import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCollectionComponent } from './color-collection.component';

describe('ColorCollectionComponent', () => {
  let component: ColorCollectionComponent;
  let fixture: ComponentFixture<ColorCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
