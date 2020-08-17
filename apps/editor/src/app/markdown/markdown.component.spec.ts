import { createMockFor } from '@customdoc/util/testing';
import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  let component: MarkdownComponent;
  beforeEach(() => {
    component = createMockFor(MarkdownComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
