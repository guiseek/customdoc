import { createMockFor } from '@customdoc/util/testing';
import { InterfaceComponent } from './index';

describe('InterfaceComponent', () => {
  let component: InterfaceComponent;

  beforeEach(() => {
    component = createMockFor(InterfaceComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
