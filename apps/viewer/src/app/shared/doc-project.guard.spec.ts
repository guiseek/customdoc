import { createMockFor } from '@customdoc/util/testing';
import { DocProjectGuard } from './doc-project.guard';

describe('DocProjectGuard', () => {
  let guard: DocProjectGuard;

  beforeEach(() => {
    guard = createMockFor(DocProjectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
