import { createMockFor } from '@customdoc/util/testing';
import { MarkdownToolbarComponent } from './markdown-toolbar.component';

describe('MarkdownToolbarComponent', () => {
  let component: MarkdownToolbarComponent;
  function createComponent({
    mock = createMockFor(MarkdownToolbarComponent),
  } = {}) {
    return mock;
  }

  it('should create', () => {
    component = createComponent();
    expect(component).toBeTruthy();
  });
});
