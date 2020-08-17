import { createMockFor } from '@customdoc/util/testing';
import { DirectiveComponent } from './index';

describe('DirectiveComponent', () => {
  let component: DirectiveComponent;

  beforeEach(() => {
    component = createMockFor(DirectiveComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
