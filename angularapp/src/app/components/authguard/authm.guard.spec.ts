import { TestBed } from '@angular/core/testing';

import { AuthmGuard } from './authm.guard';

describe('AuthmGuard', () => {
  let guard: AuthmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
