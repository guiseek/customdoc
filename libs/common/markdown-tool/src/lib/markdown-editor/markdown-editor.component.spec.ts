import { createMockFor } from '@customdoc/util/testing';
import { MarkdownEditorComponent } from './markdown-editor.component';

describe('MarkdownEditorComponent', () => {
  let component: MarkdownEditorComponent;
  function createComponent({
    mock = createMockFor(MarkdownEditorComponent),
  } = {}) {
    return mock;
  }

  it('should create', () => {
    component = createComponent();
    expect(component).toBeTruthy();
  });
});
