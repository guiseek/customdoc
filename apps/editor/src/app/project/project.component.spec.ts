import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let spectator: Spectator<ProjectComponent>;
  const createComponent = createComponentFactory(ProjectComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
