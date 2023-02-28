import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MNGAudioPlayerComponent } from './audio-player.component';

describe('MNGAudioPlayerComponent', () => {
  let component: MNGAudioPlayerComponent;
  let fixture: ComponentFixture<MNGAudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MNGAudioPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MNGAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
