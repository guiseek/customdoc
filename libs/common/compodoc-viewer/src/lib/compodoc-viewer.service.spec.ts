import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CompodocViewerService } from './compodoc-viewer.service';

describe('CompodocViewerService', () => {
  let spectator: SpectatorService<CompodocViewerService>;
  const createService = createServiceFactory(CompodocViewerService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});