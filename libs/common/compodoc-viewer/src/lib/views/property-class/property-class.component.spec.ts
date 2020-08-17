import { createMockFor } from '@customdoc/util/testing';
import { PropertyClassComponent } from './index';

describe('PropertyClassComponent', () => {
  let component: PropertyClassComponent;

  beforeEach(() => {
    component = createMockFor(PropertyClassComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
