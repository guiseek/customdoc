import { createMockFor } from '@customdoc/util/testing';
import { MarkdownContentComponent } from './markdown-content.component';

describe('MarkdownContentComponent', () => {
  let component: MarkdownContentComponent;
  function createComponent({
    mock = createMockFor(MarkdownContentComponent),
  } = {}) {
    return mock;
  }

  it('should create', () => {
    component = createComponent();
    expect(component).toBeTruthy();
  });
});
