import { createMockFor } from '@customdoc/util/testing';
import { MarkdownService } from './markdown.service';

describe('MarkdownService', () => {
  let directive: MarkdownService;
  function createService({
    splitContent = createMockFor(MarkdownService),
  } = {}) {
    return splitContent;
  }

  it('should create an instance', () => {
    directive = createService();
    expect(directive).toBeTruthy();
  });
});
