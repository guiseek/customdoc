import { createMockFor } from '@customdoc/util/testing';
import { SplitContentDirective } from './split-content.directive';

describe('SplitContentDirective', () => {
  let directive: SplitContentDirective;
  function createDirective({
    splitContent = createMockFor(SplitContentDirective),
  } = {}) {
    return splitContent;
  }

  it('should create an instance', () => {
    directive = createDirective();
    expect(directive).toBeTruthy();
  });
});
