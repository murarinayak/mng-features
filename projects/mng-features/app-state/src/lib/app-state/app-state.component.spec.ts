import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MNGAppStateComponent } from './app-state.component';

describe('MNGAppStateComponent', () => {
  let component: MNGAppStateComponent;
  let fixture: ComponentFixture<MNGAppStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MNGAppStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MNGAppStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
