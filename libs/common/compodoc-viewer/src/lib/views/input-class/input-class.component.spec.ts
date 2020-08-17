import { createMockFor } from '@customdoc/util/testing';
import { InputClassComponent } from './index';

describe('InputClassComponent', () => {
  let component: InputClassComponent;

  beforeEach(() => {
    component = createMockFor(InputClassComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
