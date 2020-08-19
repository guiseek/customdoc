import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CompodocViewerService } from './compodoc-viewer.service';

describe('CompodocViewerService', () => {
  let spectator: SpectatorService<CompodocViewerService>;
  const createService = createServiceFactory({
    service: CompodocViewerService,
    imports: [HttpClientTestingModule],
    providers: [
      { provide: 'docs', useValue: [] }
    ]
  });

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});