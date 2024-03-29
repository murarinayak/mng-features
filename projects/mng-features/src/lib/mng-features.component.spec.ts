import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MNGFeaturesComponent } from './mng-features.component';

describe('MNGFeaturesComponent', () => {
  let component: MNGFeaturesComponent;
  let fixture: ComponentFixture<MNGFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MNGFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MNGFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
