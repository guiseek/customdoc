import { createMockFor } from '@customdoc/util/testing';
import { MarkdownToolbarTriggerDirective } from './markdown-toolbar-trigger.directive';

describe('MarkdownToolbarTriggerDirective', () => {
  let directive: MarkdownToolbarTriggerDirective;
  function createDirective({
    splitContent = createMockFor(MarkdownToolbarTriggerDirective),
  } = {}) {
    return splitContent;
  }

  it('should create an instance', () => {
    directive = createDirective();
    expect(directive).toBeTruthy();
  });
});
