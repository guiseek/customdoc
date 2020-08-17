import { createMockFor } from '@customdoc/util/testing';
import { ClassComponent } from './class.component';

describe('ClassComponent', () => {
  let component: ClassComponent;

  beforeEach(() => {
    component = createMockFor(ClassComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
