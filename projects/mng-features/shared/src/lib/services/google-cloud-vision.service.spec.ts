import { TestBed } from '@angular/core/testing';

import { GoogleCloudVisionService } from './google-cloud-vision.service';

describe('GoogleCloudVisionService', () => {
  let service: GoogleCloudVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleCloudVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
