import { TestBed } from '@angular/core/testing';

import { MngFeaturesService } from './mng-features.service';

describe('MngFeaturesService', () => {
  let service: MngFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MngFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
