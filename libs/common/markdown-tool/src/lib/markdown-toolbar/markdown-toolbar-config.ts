import { ConnectedPosition } from '@angular/cdk/overlay';
import { MarkdownToolbarConfig } from '../markdown.interfaces';

export const markdownToolbarConfig: MarkdownToolbarConfig = {
  hasBackdrop: true,
  backdropClass: 'markdown-toolbar-backdrop',
  panelClass: 'markdown-toolbar-panel',
};

export const markdownToolbarPositions: ConnectedPosition[] = [
  // bottom left
  {
    overlayX: 'start',
    overlayY: 'top',
    originX: 'center',
    originY: 'bottom',
    panelClass: ['top', 'left'],
  },
  // top left
  {
    overlayX: 'start',
    overlayY: 'bottom',
    originX: 'center',
    originY: 'top',
    panelClass: ['bottom', 'left'],
  },
  // top right
  {
    overlayX: 'end',
    overlayY: 'bottom',
    originX: 'center',
    originY: 'top',
    panelClass: ['bottom', 'right'],
  },

  // bottom right
  {
    overlayX: 'end',
    overlayY: 'top',
    originX: 'center',
    originY: 'bottom',
    panelClass: ['top', 'right'],
  },
];
