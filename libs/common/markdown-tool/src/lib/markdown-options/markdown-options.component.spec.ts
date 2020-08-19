import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { MarkdownOptionsComponent } from './markdown-options.component';

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('MarkdownOptionsComponent', () => {
  let host: SpectatorHost<MarkdownOptionsComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: MarkdownOptionsComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
