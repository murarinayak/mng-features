import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngFeaturesComponent } from './mng-features.component';

describe('MngFeaturesComponent', () => {
  let component: MngFeaturesComponent;
  let fixture: ComponentFixture<MngFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
