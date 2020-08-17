import { createMockFor } from '@customdoc/util/testing';
import { OutputClassComponent } from './index';

describe('OutputClassComponent', () => {
  let component: OutputClassComponent;

  beforeEach(() => {
    component = createMockFor(OutputClassComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
