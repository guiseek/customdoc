import { createMockFor } from '@customdoc/util/testing';
import { MarkdownPreviewComponent } from './markdown-preview.component';

describe('MarkdownPreviewComponent', () => {
  let component: MarkdownPreviewComponent;
  function createComponent({
    mock = createMockFor(MarkdownPreviewComponent),
  } = {}) {
    return mock;
  }

  it('should create', () => {
    component = createComponent();
    expect(component).toBeTruthy();
  });
});
