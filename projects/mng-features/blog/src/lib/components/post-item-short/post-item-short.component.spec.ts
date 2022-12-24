import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemShortComponent } from './post-item-short.component';

describe('PostItemShortComponent', () => {
  let component: PostItemShortComponent;
  let fixture: ComponentFixture<PostItemShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostItemShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
