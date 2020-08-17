import { createMockFor } from '@customdoc/util/testing';
import { ComponentComponent } from './component.component';

describe('ComponentComponent', () => {
  let component: ComponentComponent;

  beforeEach(() => {
    component = createMockFor(ComponentComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
