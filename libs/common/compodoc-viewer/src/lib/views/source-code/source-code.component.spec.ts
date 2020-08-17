import { createMockFor } from '@customdoc/util/testing';
import { SourceCodeComponent } from './index';

describe('SourceCodeComponent', () => {
  let component: SourceCodeComponent;

  beforeEach(() => {
    component = createMockFor(SourceCodeComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
