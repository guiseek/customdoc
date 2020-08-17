import { createMockFor } from '@customdoc/util/testing';
import { ModuleComponent } from './index';

describe('ModuleComponent', () => {
  let component: ModuleComponent;

  beforeEach(() => {
    component = createMockFor(ModuleComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
