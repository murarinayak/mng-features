import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTransparentComponent } from './header-transparent.component';

describe('HeaderTransparentComponent', () => {
  let component: HeaderTransparentComponent;
  let fixture: ComponentFixture<HeaderTransparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTransparentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
