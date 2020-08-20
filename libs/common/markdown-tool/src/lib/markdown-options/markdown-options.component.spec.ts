import { OverlayModule } from '@angular/cdk/overlay';
import { createComponentFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { MarkdownDropdownComponent } from '../markdown-dropdown/markdown-dropdown.component';

import { MarkdownOptionsComponent } from './markdown-options.component';

describe('MarkdownOptionsComponent', () => {
  let spectator: Spectator<MarkdownOptionsComponent>;
  const createComponent = createComponentFactory({
    component: MarkdownOptionsComponent,
    imports: [OverlayModule],
    declarations: [
      MarkdownDropdownComponent
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should display the host component title', () => {
    expect(spectator.component).toBeTruthy();
  });
});
