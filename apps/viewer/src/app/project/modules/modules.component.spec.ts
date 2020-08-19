import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompodocViewerService } from '@customdoc/common/compodoc-viewer';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ModulesComponent } from './modules.component';

describe('ModulesComponent', () => {
  let spectator: SpectatorHost<ModulesComponent>;

  const createHost = createHostFactory({
    component: ModulesComponent,
    imports: [HttpClientTestingModule],
    providers: [
      CompodocViewerService,
      {
        provide: 'docs', useValue: []
      }
    ]
  });

  it('should create', () => {
    spectator = createHost(`<customdoc-modules title="Zippy title"></customdoc-modules>`);
    expect(spectator.component).toBeTruthy();
  });

});
