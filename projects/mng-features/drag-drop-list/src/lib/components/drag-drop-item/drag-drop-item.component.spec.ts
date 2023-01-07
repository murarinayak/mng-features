import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropItemComponent } from './drag-drop-item.component';

describe('DragDropItemComponent', () => {
  let component: DragDropItemComponent;
  let fixture: ComponentFixture<DragDropItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
