import { ConnectedPosition, ConnectionPositionPair, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { MarkdownToolbarConfig } from '../markdown.interfaces';

export const markdownToolbarConfig: MarkdownToolbarConfig = {
  hasBackdrop: true,
  backdropClass: 'markdown-toolbar-backdrop',
  panelClass: 'markdown-toolbar-panel',
  arrowOffset: 20,
  arrowSize: 15,
};
export type valueof<T> = T[keyof T];
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
// export type 
export function getMarkdownToolbarPositions(
  arrowOffset: number,
  panelOffset: number
): ConnectionPositionPair[] {
  return [
    // bottomCenter:
    {
      overlayX: 'center',
      overlayY: 'top',
      originX: 'center',
      originY: 'bottom',
      panelClass: ['top', 'center'],
      offsetY: panelOffset,
    },
    // topCenter:
    {
      overlayX: 'center',
      overlayY: 'bottom',
      originX: 'center',
      originY: 'top',
      panelClass: ['bottom', 'center'],
      offsetY: -1 * panelOffset,
    },
    // topLeft:
    {
      overlayX: 'start',
      overlayY: 'bottom',
      originX: 'center',
      originY: 'top',
      panelClass: ['bottom', 'left'],
      offsetX: -1 * arrowOffset,
      offsetY: -1 * panelOffset,
    },
    // topRight:
    {
      overlayX: 'end',
      overlayY: 'bottom',
      originX: 'center',
      originY: 'top',
      panelClass: ['bottom', 'right'],
      offsetX: arrowOffset,
      offsetY: -1 * panelOffset,
    },
    // bottomLeft:
    {
      overlayX: 'start',
      overlayY: 'top',
      originX: 'center',
      originY: 'bottom',
      panelClass: ['top', 'left'],
      offsetX: -1 * arrowOffset,
      offsetY: panelOffset,
    },
    // bottomRight:
    {
      overlayX: 'end',
      overlayY: 'top',
      originX: 'center',
      originY: 'bottom',
      panelClass: ['top', 'right'],
      offsetX: arrowOffset,
      offsetY: panelOffset,
    },
  // }
  ];
}