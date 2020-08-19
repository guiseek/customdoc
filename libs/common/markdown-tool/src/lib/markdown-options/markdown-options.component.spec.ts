import { Component } from '@angular/core';
import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';

import { MarkdownOptionsComponent } from './markdown-options.component';

describe('MarkdownOptionsComponent', () => {
  let spectator: Spectator<MarkdownOptionsComponent>;
  const createComponent = createComponentFactory(MarkdownOptionsComponent);

  beforeEach(() => spectator = createComponent());

  it('should display the host component title', () => {
    expect(spectator).toBeTruthy();
  });
});
