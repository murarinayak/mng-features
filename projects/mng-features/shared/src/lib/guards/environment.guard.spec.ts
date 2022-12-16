import { TestBed } from '@angular/core/testing';

import { EnvironmentGuard } from './environment.guard';

describe('EnvironmentGuard', () => {
  let guard: EnvironmentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnvironmentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
