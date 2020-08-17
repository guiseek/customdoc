import { createMockFor } from '@customdoc/util/testing';
import { MethodClassComponent } from './index';

describe('MethodClassComponent', () => {
  let component: MethodClassComponent;

  beforeEach(() => {
    component = createMockFor(MethodClassComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
