import { TestBed } from '@angular/core/testing';

import { DocProjectGuard } from './doc-project.guard';

describe('DocProjectGuard', () => {
  let guard: DocProjectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocProjectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
