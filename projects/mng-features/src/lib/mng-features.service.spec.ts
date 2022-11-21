import { TestBed } from '@angular/core/testing';

import { MNGFeaturesService } from './mng-features.service';

describe('MNGFeaturesService', () => {
  let service: MNGFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MNGFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
