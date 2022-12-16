import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoginMatIconComponent } from './google-login-mat-icon.component';

describe('GoogleLoginMatIconComponent', () => {
  let component: GoogleLoginMatIconComponent;
  let fixture: ComponentFixture<GoogleLoginMatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleLoginMatIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleLoginMatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
