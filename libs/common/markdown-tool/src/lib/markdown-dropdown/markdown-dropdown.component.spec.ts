import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { MarkdownDropdownComponent } from './markdown-dropdown.component';

describe('MarkdownDropdownComponent', () => {
  let spectator: Spectator<MarkdownDropdownComponent>;
  const createComponent = createComponentFactory({
    component: MarkdownDropdownComponent,
    imports: [OverlayModule]
  });

  beforeEach(() => spectator = createComponent());

  it('should display the host component title', () => {
    expect(spectator.component).toBeTruthy();
  });
});
