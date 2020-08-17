import { createMockFor } from '@customdoc/util/testing';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  beforeEach(() => {
    component = createMockFor(ProjectComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

